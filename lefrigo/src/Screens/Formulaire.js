  //------------------------------------------------------------//
  //                        Information                         //
  //------------------------------------------------------------//
  //  Nom Projet : Frigo                                        //
  //  Objectif : Afficher des aliments du frigo.                //
  //             Modification et ajout d'aliments possible      //
  //                                                            //
  //  Date Création : 05/11/2022                                //
  //  Créateur : Samuel ADAMEK                                  //
  //------------------------------------------------------------//
import React , {useState} from 'react'
import {nanoid} from 'nanoid'
import { useNavigate, useLocation } from 'react-router-dom'
import "../App.css";

function Formulaire(){
    const location=useLocation();
    //console.log(location)
    const [aliments, setaliments] = useState(location.state.master); // copie du master 
    //console.log(aliments)
    const navigate = useNavigate();
    const [addFormData, setAddFormData] = useState({
        nom: '',
        nombre: ''
      }) // Sauvegarde le nouvelle Element Creer sous cette forme
    

    const handleAddFormSubmit = (event) => { // Permet l'ajout ou pas d'un élément dans le tableau.
        event.preventDefault(); //On stop le rafraichissement de la page (comportement par défault du submit)
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
              //console.log(elt.nombre)
              return elt
            } else {
              return elt
            }})
          //setaliments(copyMaster)
            navigate('/', { state : { master:copyMaster}, replace : true})
        }
        else
        {
          const newAliments = [...aliments, newAliment];
          //setaliments(newAliments); // Ajout aliment
          navigate('/', { state : { master:newAliments}, replace : true})
        };
        //navigate("/")
        
      };

      const handleAddFormChange = (event) => { 
        event.preventDefault(); // On stop le rafraichissement de la page (comportement par défault du submit)
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
        
      }

    return (
      
    <div>
      <h2>Ajouter un aliment  </h2>
      <form onSubmit={handleAddFormSubmit}> {/*Création de l'affichage du formulaire.*/}
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
        <button type="submit" onClick={handleAddFormSubmit}>Ajouter</button>
      </form>
    </div>
    
    )
    }

export default Formulaire