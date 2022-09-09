import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const getMealByNameUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([])

    const fetchMeals = async (url) => {
        try {
            const response = await axios.get(url)                        
            setMeals(response.data.meals)
            //console.log(response.data.meals)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])    

    return <AppContext.Provider value={{meals }}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }