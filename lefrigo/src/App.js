import React, { useState } from 'react';
import "./App.css";
import data from "./inventory.json"
import ReadOnlyRow from "./components/ReadOnlyRow"
import {nanoid} from 'nanoid'


/* Chronologie Organisation Code : 
1er-States
2nd-UseEffect()
3rd-Mini / Fonction
*/

const App = () => {

  const [aliments, setaliments] = useState(data); // copie du master 

  const [renderAliments, setRenderAliments] = useState(data) // Celui afficher

  const [errorFindAliment, setErrorFindAliment] = useState(false) // permet de rien afficher :> 

  const [search, setSearch] = useState("");
  


  const handleDeleteClick = (alimentId) => {
    
    const newAliments =[...aliments];
    
    const index = renderAliments.findIndex((aliment)=> aliment.id === alimentId);

    newAliments.splice(index, 1);


    /* on met a jour le state pour le render mais également le state Master */
    setRenderAliments(newAliments);
    setaliments(newAliments)
    }

    const updateSearch = e => {

      // A la suppression de tous les caractères, on ré injecte le master dans le state render
      if(!e.target.value){
        setRenderAliments(aliments)
        setErrorFindAliment(false)
      }
      setSearch(e.target.value);
    }

    const handleSubmitSearch = (e) => {

      // On stop le rafraichissement de la page (comportement par défault du submit)
      e.preventDefault()
  
      // On recherche dans le Master l'element en fonction du texte de l'input (Et on met les string en minuscule)
      const aliment = aliments.find(elt => elt.nom.toLowerCase() === search.toLowerCase())
  
      // Si il y a un résultat, on injecte l'element dans le State Render, si non on peut ajouter une erreur avec un else ...
      if(aliment){
        setRenderAliments([aliment])
        setErrorFindAliment(false)
      }
      else{
        setErrorFindAliment(true)
      }
  
    }

  const [addFormData, setAddFormData] = useState({
    nom: '',
    nombre: ''
  })
  

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const found = aliments.find(element => {
      return element.id === addFormData.nom;
    });

    if ( found = true )// Verification de l'existance de l'aliment, si vrai alors ajout des valeurs dans alimentDejaExistant  // Si il existe alors il faut rajouter les nouvelles valeurs a alimentDejaExistant sinon il y a création de l'aliment
    {

      //aliments.nom(addFormData.nom) = event.nombre(addFormData.nom) + addFormData.nombre
      /*const Temporary = aliments(addFormData.nom,addFormData.nombre)
      const RealTemporary = aliments(addFormData.nom === aliments.nom,addFormData.nombre === aliments.nombre)
      aliments(aliments.nom).nombre =  aliments(aliments.nom).nombre + Temporary.nombre
      alimentDejaExistant = alimentDejaExistant + alimentCreer */
      
       
        
    }
    else
    {
      const newAliment = {
        id: nanoid(),
        nom: addFormData.nom,
        nombre: addFormData.nombre
    }
    const newAliments = [...aliments, newAliment];
    setaliments(newAliments);
    };

    
  };

  return (
    <div className="App">
      <h1>Frigo</h1>
      <form className="search-form" onSubmit={handleSubmitSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Rechercher
        </button>
      {errorFindAliment &&
        <h2>Aucun résultat</h2>
      }
      </form>
    <form>
      <table>
        <thead>
          <th>Nom</th>
          <th>Nombre</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            renderAliments.map((aliment)=> (
            <ReadOnlyRow key={aliment.id.toString()} aliment={aliment} // That help react identifying row as unique
            handleDeleteClick={handleDeleteClick}/>
          ))}

        </tbody>
      </table>
      
      </form> 
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
    
  );
}

export default App;

