import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const getMealByNameUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorites, setFavorites] = useState([])

    const fetchMeals = async (url) => {
        try {
            setLoading(true)
            const { data } = await axios.get(url)
            if (data.meals)
                setMeals(data.meals)
            else
                setMeals([])
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }
    const closeModal = () => {
        setModal(false)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        console.log(idMeal)
        let meal;
        meal = meals.find(meal => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setModal(true)
    }
    const addFavoriteMeal = (idMeal) => {        
        let isInFavorite = favorites.find(meal => meal.idMeal === idMeal)
        if (isInFavorite) return
        let meal = meals.find(meal => meal.idMeal === idMeal)
        setFavorites([...favorites, meal])

        //if (!favorites) {setFavorites([meal]);return}



    }
    const removeFavoriteMeal = (idMeal) => {
        let updateFavorites = favorites.filter(meal => meal.idMeal!==idMeal)
        setFavorites(updateFavorites);

    }

    useEffect(() => {
        fetchMeals(`${getMealByNameUrl}`)
    }, [])


    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${getMealByNameUrl}${searchTerm}`)
    }, [searchTerm])

    return <AppContext.Provider value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        setSelectedMeal,
        selectedMeal,
        selectMeal,
        showModal,
        closeModal,
        addFavoriteMeal,
        removeFavoriteMeal,
        favorites
    }}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }