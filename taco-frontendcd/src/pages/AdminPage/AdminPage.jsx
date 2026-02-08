import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, getAllRoles, addRoleToUser, removeRoleFromUser, deleteUser } from '../../api/adminApi';
import './AdminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            console.log('Loading data...');
            const [usersData, rolesData] = await Promise.all([
                getAllUsers(),
                getAllRoles()
            ]);
            console.log('Users:', usersData);
            console.log('Roles:', rolesData);
            setUsers(usersData);
            setRoles(rolesData);
        } catch (err) {
            console.error('Error:', err);
            setError('Veriler yüklenemedi. Admin yetkisi gerekli.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async (userId, roleId) => {
        const success = await addRoleToUser(userId, roleId);
        if (success) {
            setMessage('Rol eklendi');
            loadData();
        } else {
            setError('Rol eklenemedi');
        }
    };

    const handleRemoveRole = async (userId, roleId) => {
        if (!window.confirm('Bu rolü kaldırmak istediğinizden emin misiniz?')) {
            return;
        }
        const success = await removeRoleFromUser(userId, roleId);
        if (success) {
            setMessage('Rol kaldırıldı');
            loadData();
        } else {
            setError('Rol kaldırılamadı');
        }
    };

    const handleDeleteUser = async (userId, username) => {
        if (!window.confirm(`"${username}" kullanıcısını silmek istediğinizden emin misiniz?`)) {
            return;
        }
        const success = await deleteUser(userId);
        if (success) {
            setMessage('Kullanıcı silindi');
            loadData();
        } else {
            setError('Kullanıcı silinemedi');
        }
    };

    const getRoleId = (roleName) => {
        const role = roles.find(r => r.name === roleName);
        return role ? role.id : null;
    };

    if (loading) {
        return <div className="admin-page"><p>Yükleniyor...</p></div>;
    }

    if (error && users.length === 0) {
        return (
            <div className="admin-page">
                <h1>🔒 Admin Panel</h1>
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <h1>🔒 Admin Panel</h1>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <h2>Kullanıcılar ({users.length})</h2>
            
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Roller</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>
                                {user.roles && user.roles.map(role => (
                                    <span key={role} className="role-badge">
                                        {role.replace('ROLE_', '')}
                                        <button 
                                            onClick={() => handleRemoveRole(user.id, getRoleId(role))}
                                            className="remove-role-btn"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <select 
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                handleAddRole(user.id, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        defaultValue=""
                                    >
                                        <option value="">+ Rol Ekle</option>
                                        {roles
                                            .filter(role => !user.roles || !user.roles.includes(role.name))
                                            .map(role => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name.replace('ROLE_', '')}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    
                                    <button 
                                        onClick={() => handleDeleteUser(user.id, user.username)}
                                        className="delete-btn"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;