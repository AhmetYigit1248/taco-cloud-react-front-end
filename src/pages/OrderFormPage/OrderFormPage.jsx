import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../../api/orderApi';
import './OrderFormPage.css';

function OrderFormPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [tacos, setTacos] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // DesignPage'den gelen taco'yu ekle
        if (location.state?.newTaco) {
            setTacos(prev => [...prev, location.state.newTaco]);
        }
    }, [location.state]);

    const handleSubmitOrder = async () => {
        if (tacos.length === 0) {
            setMessage('Sipariş için en az bir taco ekleyin!');
            return;
        }

        try {
            await createOrder({ tacos });
            setMessage('Sipariş oluşturuldu!');
            
            // 1 saniye sonra OrderListPage'e yönlendir
            setTimeout(() => {
                navigate('/orders');
            }, 1000);
            
        } catch (error) {
            setMessage('Sipariş oluşturulamadı: ' + error.message);
        }
    };

    const handleRemoveTaco = (index) => {
        setTacos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="order-form-page">
            <h1>Order your taco creations!</h1>
            <img src="/images/Capture.png" alt="Taco Cloud" />

            {message && <p className="message">{message}</p>}

            <div className="tacos-section">
                <h3>Your tacos in this order:</h3>
                
                {tacos.length === 0 ? (
                    <p className="no-tacos">Henüz taco eklenmedi</p>
                ) : (
                    <ul className="taco-list">
                        {tacos.map((taco, index) => (
                            <li key={index} className="taco-item">
                                <span>{taco.name}</span>
                                <button 
                                    onClick={() => handleRemoveTaco(index)}
                                    className="remove-btn"
                                >
                                    Kaldır
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="actions">
                <Link to="/design" className="btn design-btn">
                    Design another taco
                </Link>
                
                <button 
                    onClick={handleSubmitOrder} 
                    className="btn submit-btn"
                    disabled={tacos.length === 0}
                >
                    Submit Order
                </button>
            </div>

            <Link to="/orders" className="orders-link">
                View My Orders
            </Link>
        </div>
    );
}

export default OrderFormPage;