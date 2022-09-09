import { useGlobalContext } from "../context";
import { GoBookmark } from 'react-icons/go'
import { BsDownload } from 'react-icons/bs'

const Meals = () => {
    const { meals, loading } = useGlobalContext()
    if (loading) {
        return <section className="section">
            <h2>Loading... <BsDownload /></h2>
        </section>
    }
    if (meals.length < 1) {
        return <section className="section-center">
            <h2 className="">Nothing similar found</h2>
        </section>
    }

    //console.log(meals)
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