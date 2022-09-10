import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const getMealByNameUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppContext = React.createContext()

const getFavoritesFromLocalStorage = () => {
 
    let favorites = localStorage.getItem('favorites');
    if (favorites)
        favorites = JSON.parse(localStorage.getItem('favorites'))
    else
        favorites = []
    return favorites
}

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

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

    const selectMeal = (idMeal, fromFavoriteMeal) => {
        let meal;
        if (fromFavoriteMeal)
            meal = favorites.find(meal => meal.idMeal === idMeal)
        else
            meal = meals.find(meal => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setModal(true)
    }
    const addFavoriteMeal = (idMeal) => {
        let isInFavorite = favorites.find(meal => meal.idMeal === idMeal)
        if (isInFavorite) return
        let meal = meals.find(meal => meal.idMeal === idMeal)
        let updateFavorites = [...favorites, meal]
        setFavorites(updateFavorites)
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))

    }
    const removeFavoriteMeal = (idMeal) => {
        let updateFavorites = favorites.filter(meal => meal.idMeal !== idMeal)
        setFavorites(updateFavorites);
        localStorage.setItem('favorites', JSON.stringify(updateFavorites))
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