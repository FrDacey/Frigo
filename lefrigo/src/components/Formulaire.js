import React , {useState} from 'react'
import {nanoid} from 'nanoid'
import {addFormData} from '../App'
import data from "../inventory.json"

function Formulaire(){

    const [aliments, setaliments] = useState(data); // copie du master 

    const [renderAliments, setRenderAliments] = useState(data) // Celui afficher

    const [addFormData, setAddFormData] = useState({
        nom: '',
        nombre: ''
      })

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
    
        
      const newAliment = {
        id: nanoid(),
        nom: addFormData.nom,
        nombre: Number(addFormData.nombre)
        }
    
        //const newAliments = [...aliments, newAliment]; // initialiser trop tot pour rien ! -> dans le else c'est mieux :> 
    
        const found = aliments.find(aliment => {
          return aliment.nom === addFormData.nom;
        });
        
    
        
        if (found)// Verification de l'existance de l'aliment, si vrai alors ajout des valeurs dans alimentDejaExistant  // Si il existe alors il faut rajouter les nouvelles valeurs a alimentDejaExistant sinon il y a création de l'aliment
        {
          
          const copyMaster = [...aliments].map(elt => {
            if(elt.nom === addFormData.nom){
              elt.nombre = Number(elt.nombre) + Number(addFormData.nombre)
              console.log(elt.nombre)
              return elt
            } else {
              return elt
            }})
    
            
          setaliments(copyMaster)
          setRenderAliments(copyMaster) 
          console.log(copyMaster)
        }
        else
        {
          const newAliments = [...aliments, newAliment];
          
          setaliments(newAliments); // Ajout aliment
          setRenderAliments(newAliments); // on ré injecte le master dans le state render
        };
        
      };

      const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
        
      }

    return (
    <div>
      <h2>Add Aliment </h2>
        <form onSubmit={handleAddFormSubmit}>
          <input 
          type ="text" 
          name="nom" 
          required="required" 
          placeholder="Entrer un Aliment" 
          onChange={handleAddFormChange}/>

          <input 
          type ="number" 
          name="nombre" 
          required="required" 
          min ="1"
          placeholder="Entrer un Nombre"
          onChange={handleAddFormChange}/>

          <button type="submit">Ajouter</button>
        </form>
    </div>
    )
}

export default Formulaire