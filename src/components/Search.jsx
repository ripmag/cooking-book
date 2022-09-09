import { useState } from "react";
import { useGlobalContext } from "../context";


const Search = () => {
    const { fetchRandomMeal, setSearchTerm } = useGlobalContext()
    const [ text, setText ] = useState('')
    
    const handleChange = (e) => {
        console.log(e.target.value)
        setText(e.target.value)
    }
    const handleSubmit = (e) => {        
        e.preventDefault()
        if(text){
            setSearchTerm(text)
            setText('')
        }        
    }
    const handleRandomMeal = () => {
        setText('')
        setSearchTerm('')
        fetchRandomMeal()
    }


    return (
        <header className="search-container">
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="input name of dish"
                        value={text}
                        onChange={handleChange}
                    ></input>
                </div>
                <div><button className="btn" type="submit">Search</button> </div>
                <div><button className="btn btn-hipster" type="button" onClick={() => handleRandomMeal()}>Random dish</button> </div> 
                

            </form>
        </header>
    );
};

export default Search;