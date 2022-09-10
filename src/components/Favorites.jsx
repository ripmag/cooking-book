import { useGlobalContext } from "../context";


const Favorites = () => {
    const { favorites, removeFavoriteMeal,selectMeal } = useGlobalContext()
    return (
        <div className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {favorites.map(meal => {
                        const { idMeal, strMealThumb: image } = meal
                        return <div className="favorites-item">
                            <img src={image} onClick={() => selectMeal(idMeal,true)} className="favorites-img img" />
                            <button className="remove-btn" onClick={() => removeFavoriteMeal(idMeal)}>remove</button>
                        </div>
                    })
                    }
                </div>
            </div>
        </div>
    );
};

export default Favorites;