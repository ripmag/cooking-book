import { useGlobalContext } from "../context";

const Meals = () => {
    const context = useGlobalContext()
    console.log(context)
    return (
        
        <h1>Meals com</h1>
    );
};

export default Meals;