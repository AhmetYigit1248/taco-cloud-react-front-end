import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { getMyOrders, deleteOrder } from '../../api/orderApi';
import './OrderListPage.css';

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(Array.isArray(data) ? data : []);  // Direkt array
        } catch (error) {
            console.log('Siparişler yüklenemedi');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
            await deleteOrder(orderId);
            loadOrders();
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="order-list-page"><p>Yükleniyor...</p></div>;
    }

    return (
        <div className="order-list-page">
            <h2>Order List</h2>

            <div className="actions-top">
                <Link to="/design" className="btn new-taco-btn">
                    + Yeni Taco Oluştur
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="alert-warning">No orders found.</div>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="order-card">
                        <div className="order-header">
                            <strong>Order ID: </strong>
                            <span>{order.key?.orderId}</span>
                        </div>
                        <div className="order-body">
                            <p>
                                <strong>Placed at: </strong>
                                <span>{formatDate(order.key?.placedAt)}</span>
                            </p>
                            <p>
                                <strong>User: </strong>
                                <span>{order.user?.username}</span>
                            </p>
                            <ul className="order-tacos">
                                {order.tacos?.map((taco, i) => (
                                    <li key={i}>{taco.name}</li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => handleDelete(order.key?.orderId)}
                                className="delete-btn"
                            >
                                Siparişi Sil
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderListPage;