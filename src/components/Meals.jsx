import { useGlobalContext } from "../context";
import {GoBookmark} from 'react-icons/go'

const Meals = () => {
    const { meals } = useGlobalContext()
    console.log(meals)
    return (
        <section className="section-center">
            {meals.map(meal => {
                const { idMeal, strMeal: title, strMealThumb: image } = meal
                return <articel key={idMeal} className='single-meal'>
                    <img src={image} className='img' />
                    <footer>
                        <h4>{title}</h4>
                        <button className="like-btn"><GoBookmark /></button>
                    </footer>

                    <div />
                </articel>
            })}
        </section>
    )
};

export default Meals;