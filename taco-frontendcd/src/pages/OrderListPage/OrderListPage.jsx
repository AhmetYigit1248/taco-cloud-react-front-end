import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, deleteOrder } from '../../api/orderApi';
import './OrderListPage.css';

function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null); 

    const loadOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMyOrders();
            console.log("Gelen Sipariş Verisi:", data);
            
            if (Array.isArray(data)) {
                const uniqueOrders = data.reduce((acc, order) => {
                    const orderId = order.key?.orderId || order.id;
                    if (!acc.some(o => (o.key?.orderId || o.id) === orderId)) {
                        acc.push(order);
                    }
                    return acc;
                }, []);
                
                setOrders(uniqueOrders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Siparişler yüklenemedi:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                loadOrders();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [loadOrders]);

    const handleDelete = async (orderId) => {
        console.log("Silinmek istenen Order ID:", orderId);

        if (!orderId) {
            alert("Hata: Sipariş ID bulunamadı!");
            return;
        }

        if (window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
            setDeleting(orderId); 
            
            try {
                await deleteOrder(orderId);
                console.log("Silme isteği başarılı!");

                setOrders(prevOrders => 
                    prevOrders.filter(order => {
                        const currentOrderId = order.key?.orderId || order.id;
                        return currentOrderId !== orderId;
                    })
                );
                
            } catch (error) {
                console.error("Silme işleminde hata:", error);
                alert("Silinemedi. API bağlantısını kontrol edin.");
                await loadOrders();
            } finally {
                setDeleting(null); 
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
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
                <button 
                    onClick={loadOrders} 
                    className="btn refresh-btn"
                    disabled={loading}
                >
                    🔄 Yenile
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="alert-warning">No orders found.</div>
            ) : (
                orders.map((order) => {
                    const orderId = order.key?.orderId || order.id;
                    const isDeleting = deleting === orderId;
                    
                    return (
                        <div 
                            key={orderId} 
                            className={`order-card ${isDeleting ? 'deleting' : ''}`}
                        >
                            <div className="order-header">
                                <strong>Order ID: </strong>
                                <span>{orderId}</span>
                            </div>
                            <div className="order-body">
                                <p>
                                    <strong>Placed at: </strong>
                                    <span>{formatDate(order.key?.placedAt || order.placedAt)}</span>
                                </p>
                                <p>
                                    <strong>User: </strong>
                                    <span>{order.user?.username}</span>
                                </p>
                                <ul className="order-tacos">
                                    {order.tacos?.map((taco, i) => (
                                        <li key={`${orderId}-taco-${i}`}>{taco.name}</li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => handleDelete(orderId)}
                                    className="delete-btn"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Siliniyor...' : 'Siparişi Sil'}
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default OrderListPage;