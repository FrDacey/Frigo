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

  //------------------------------------------------------------//
  //                  Initialisation Imports                    //
  //------------------------------------------------------------//

  import React, { useState } from 'react';
  import "../App.css";
  import data from "../inventory.json"
  import ReadOnlyRow from "../components/ReadOnlyRow"
  import {nanoid} from 'nanoid'
  import { Link } from 'react-router-dom';
  
  
  /* Chronologie Organisation Code : 
  1er-States
  2nd-UseEffect()
  3rd-Mini / Fonction
  */
  
  const App = () => {
    //------------------------------------------------------------//
    //                  Initialisation States                     //
    //------------------------------------------------------------//
    const [aliments, setaliments] = useState(data); // copie du master 
    const [renderAliments, setRenderAliments] = useState(data) // Celui afficher
    const [errorFindAliment, setErrorFindAliment] = useState(false) // permet de rien afficher :> 
    const [search, setSearch] = useState("");
    

    const increaseQuantity = (alimentId) => {
    
      const newAliments =[...aliments];
  
      const index = newAliments.findIndex((aliment)=> aliment.id === alimentId)
      
      newAliments[index].nombre += 1
      
      setaliments(newAliments)
      setRenderAliments(newAliments)
      }
  
  
    const decreaseQuantity = (alimentId) => {
  
      const newAliments =[...aliments];
      const index = aliments.findIndex((aliment)=> aliment.id === alimentId)
  
        if(newAliments[index].nombre > 1){
  
          newAliments[index].nombre -= 1
        setaliments(newAliments)
        setRenderAliments(newAliments)
        }
        else
        {
          handleDeleteClick(alimentId)
          //console.log("Should be deleted")
  
        } 
      
  }
  
  
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

    return (
  
  
      <div className="App">
  
        <h1>Frigo</h1>
        <form className="search-form" onSubmit={handleSubmitSearch}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">
            Rechercher
          </button>
        </form>
        {errorFindAliment &&
          <h2>Aucun résultat</h2>
        }
      <form>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
            <th>Nombre</th>
            <th>Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {
            renderAliments.map((aliment)=> (
              <ReadOnlyRow key={aliment.id.toString()} aliment={aliment} // That help react identifying row as unique
              handleDeleteClick={handleDeleteClick}
              increaseQuantity={increaseQuantity} 
              decreaseQuantity={decreaseQuantity}/>
            ))}  
          </tbody>
        </table>
        
        </form> 
        
          <h1>Ajouter Un Aliment</h1>
          <Link to="/Formulaire">Ajout Aliment</Link>
      </div>
      
    );
  }
  
  export default App