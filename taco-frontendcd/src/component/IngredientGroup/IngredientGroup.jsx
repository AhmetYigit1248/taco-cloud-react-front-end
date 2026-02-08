import './IngredientGroup.css';

function IngredientGroup({ title, ingredients, selected, onChange }) {
    
    const handleCheck = (ingredient) => {
        const isSelected = selected.some(i => i.id === ingredient.id);
        
        if (isSelected) {
            // Kaldır
            onChange(selected.filter(i => i.id !== ingredient.id));
        } else {
            // Ekle
            onChange([...selected, ingredient]);
        }
    };

    return (
        <div className="ingredient-group">
            <h3>{title}</h3>
            {ingredients.map(ingredient => (
                <div key={ingredient.id} className="ingredient-item">
                    <input
                        type="checkbox"
                        id={ingredient.id}
                        checked={selected.some(i => i.id === ingredient.id)}
                        onChange={() => handleCheck(ingredient)}
                    />
                    <label htmlFor={ingredient.id}>{ingredient.name}</label>
                </div>
            ))}
        </div>
    );
}

export default IngredientGroup;