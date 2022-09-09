import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const getMealByNameUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm,setSearchTerm] = useState('')

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

    useEffect(() => {
        fetchMeals(`${getMealByNameUrl}${searchTerm}`)
    }, [searchTerm])

    return <AppContext.Provider value={{ meals, loading ,setSearchTerm,fetchRandomMeal}}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }