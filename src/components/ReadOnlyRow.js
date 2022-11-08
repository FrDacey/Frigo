import React, { useState, useEffect } from 'react';
const ReadOnlyRow = ({ aliment, handleDeleteClick}) => {


const [quantity, setQuantity] = useState(0);


useEffect(() => {

    setQuantity(aliment.nombre)

}, [aliment.nombre])

const increaseQuantity = () => {

    setQuantity(quantity + 1);
}

const decreaseQuantity = () => {
    if(quantity > 1){
        setQuantity(quantity - 1);
    }
    else
    {
        handleDeleteClick(aliment.id)
    }
}
    return (
        
        <tr key={aliment.id.toString()}>
            <td>{aliment.nom}</td>
            <td>{quantity}</td>
            <td>
                <button type="button" onClick={()=> increaseQuantity()}>+</button>
                <button type="button" onClick={()=> handleDeleteClick(aliment.id)}>Supprimer</button>
                <button type="button" onClick={()=> decreaseQuantity()}>-</button>
            </td>
        </tr> 
    )
}

export default ReadOnlyRow

