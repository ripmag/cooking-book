import React, {useContext, useEffect} from "react";

const AppContext = React.createContext()

const AppProvider = ({children}) =>{
    useEffect( () => {
        console.log('fetch data')
    }, [])

    return <AppContext.Provider value={{name:'Jon',asd:'ssss'}}>
        {children}
        </AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}
export {AppContext, AppProvider}