import { useGlobalContext } from "../context";

const Modal = () => {
    const { showModal, selectedMeal, closeModal } = useGlobalContext()

    const {
        strMealThumb: image,
        strMeal: title,
        strInstructions: text,
        strSource: source } = selectedMeal
    return (
        <aside className="modal-overlay">
            <div className="modal-conteiner">
                <img src={image} alt={title} className='img modal-img'></img>
                <div className="modal-content">
                    <h2>{title}</h2>
                    <p><h3>Cooking instruction</h3></p>
                    <p>{text}</p>
                    <p><a href={source}>Original source</a></p>

                </div>

                <button className='btn btn-hipster close-btn' type="button" onClick={closeModal}>Close</button>
            </div>

        </aside>
    );
};

export default Modal;