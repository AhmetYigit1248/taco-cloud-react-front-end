import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllIngredients } from '../../api/ingredientApi';
import { createTaco } from '../../api/tacoApi';
import IngredientGroup from '../../component/IngredientGroup/IngredientGroup';
import './DesignPage.css';

function DesignPage() {
    const navigate = useNavigate();
    
    const [ingredients, setIngredients] = useState({
        wrap: [],
        protein: [],
        cheese: [],
        veggies: [],
        sauce: []
    });
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [tacoName, setTacoName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadIngredients();
    }, []);

    const loadIngredients = async () => {
        try {
            const data = await getAllIngredients();
            
            if (Array.isArray(data) && data.length > 0) {
                setIngredients({
                    wrap: data.filter(i => i.type === 'WRAP'),
                    protein: data.filter(i => i.type === 'PROTEIN'),
                    cheese: data.filter(i => i.type === 'CHEESE'),
                    veggies: data.filter(i => i.type === 'VEGGIES'),
                    sauce: data.filter(i => i.type === 'SAUCE')
                });
            }
        } catch (error) {
            setMessage('Malzemeler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tacoName.trim() || tacoName.length < 5) {
            setMessage('Taco adı en az 5 karakter olmalı!');
            return;
        }

        if (selectedIngredients.length === 0) {
            setMessage('En az bir malzeme seçin!');
            return;
        }

        try {
            const taco = {
                name: tacoName,
                ingredients: selectedIngredients
            };
            
            const createdTaco = await createTaco(taco);
            
            // OrderFormPage'e yönlendir ve taco bilgisini gönder
            navigate('/orderForm', { state: { newTaco: createdTaco } });
            
        } catch (error) {
            setMessage('Hata: ' + error.message);
        }
    };

    if (loading) {
        return <div className="design-page"><p>Yükleniyor...</p></div>;
    }

    return (
        <div className="design-page">
            <h1>Design your taco!</h1>
            <img src="/images/Capture.png" alt="Taco" className="taco-image" />

            {message && <p className="message">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <IngredientGroup
                        title="Designate your wrap:"
                        ingredients={ingredients.wrap}
                        selected={selectedIngredients}
                        onChange={setSelectedIngredients}
                    />
                    <IngredientGroup
                        title="Pick your protein:"
                        ingredients={ingredients.protein}
                        selected={selectedIngredients}
                        onChange={setSelectedIngredients}
                    />
                    <IngredientGroup
                        title="Choose your cheese:"
                        ingredients={ingredients.cheese}
                        selected={selectedIngredients}
                        onChange={setSelectedIngredients}
                    />
                    <IngredientGroup
                        title="Determine your veggies:"
                        ingredients={ingredients.veggies}
                        selected={selectedIngredients}
                        onChange={setSelectedIngredients}
                    />
                    <IngredientGroup
                        title="Select your sauce:"
                        ingredients={ingredients.sauce}
                        selected={selectedIngredients}
                        onChange={setSelectedIngredients}
                    />
                </div>

                <div className="name-section">
                    <h3>Name your taco creation:</h3>
                    <input
                        type="text"
                        value={tacoName}
                        onChange={(e) => setTacoName(e.target.value)}
                        placeholder="Taco adı (en az 5 karakter)..."
                    />
                    <button type="submit">Submit Your Taco</button>
                </div>
            </form>
        </div>
    );
}

export default DesignPage;