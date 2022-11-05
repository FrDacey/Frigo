import React, { useState } from 'react';
import aliments from '../App'
const ReadOnlyRow = ({ aliment, handleDeleteClick}) => {

const [quantity, setQuantity] = useState(aliment.nombre);

const increaseQuantity = () => {
    setQuantity(prevCount => prevCount + 1);
}

const decreaseQuantity = () => {
    if(quantity > 1){
        setQuantity(prevCount => prevCount - 1);
    }
    else
    {
        handleDeleteClick(aliment.id)
    }
    
}
    return (
        <tr>
            <td>{aliment.nom}</td>
            <td>{quantity} </td>
            <td>
                <button type="button" onClick={()=> increaseQuantity(aliment.id)}>+</button>
                <button type="button" onClick={()=> handleDeleteClick(aliment.id)}>Supprimer</button>
                <button type="button" onClick={()=> decreaseQuantity(aliment.id)}>-</button>
            </td>
        </tr> 
    )
}

export default ReadOnlyRow