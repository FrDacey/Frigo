import React, { useState, useEffect } from 'react';
const ReadOnlyRow = ({ aliment, handleDeleteClick, increaseQuantity, decreaseQuantity}) => {

const [quantity, setQuantity] = useState(0);

useEffect(() => {

    setQuantity(aliment.nombre)
})
    return (
        
        <tr key={aliment.id.toString()}>
            <td>{aliment.nom}</td>
            <td>{quantity}</td>
            <td>
                <button type="button" onClick={()=> increaseQuantity(aliment.id)}>+</button>
                <button type="button" onClick={()=> handleDeleteClick(aliment.id)}>Supprimer</button>
                <button type="button" onClick={()=> decreaseQuantity(aliment.id)}>-</button>
            </td>
        </tr> 
    )
}

export default ReadOnlyRow

