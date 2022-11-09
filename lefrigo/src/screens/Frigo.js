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

  import React, { useEffect, useState } from 'react';
  import "../App.css";
  import data from "../inventory.json"
  import ReadOnlyRow from "../components/ReadOnlyRow"
  import { useNavigate, useLocation } from 'react-router-dom';
  
  
  /* Chronologie Organisation Code : 
  1er-States
  2nd-UseEffect()
  3rd-Mini / Fonction
  */
  
  const App = () => {
    //------------------------------------------------------------//
    //                  Initialisation States                     //
    //------------------------------------------------------------//
    const location=useLocation();
    
    
    const [aliments, setaliments] = useState(data); // copie du master 
    const [renderAliments, setRenderAliments] = useState(data) // Celui afficher
    const [errorFindAliment, setErrorFindAliment] = useState(false) // permet de rien afficher 
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    useEffect(() =>{ //Permet d'eviter de faire une loop infini et donc de faire planter le site et l'affichage.
      if(location.state){
        setaliments(location.state.master)
        setRenderAliments(location.state.master)
      //console.log(location)
      }
    },[location.state])
  

    const increaseQuantity = (alimentId) => { // Ajoute 1 à la l'élément concercer 
    
      const newAliments =[...aliments];
      const index = newAliments.findIndex((aliment)=> aliment.id === alimentId)
      newAliments[index].nombre += 1
      
      setaliments(newAliments)
      setRenderAliments(newAliments)
      }
    

    const decreaseQuantity = (alimentId) => { // Enleve 1 à l'élément concerner, si celui si descend en dessous de 1 il est supprimer
  
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
        //console.log("Logiquement Supprimer")
      } 
    }
  
  
    const handleDeleteClick = (alimentId) => { // Permet la suppresion d'une ligne de tableau.
      
      const newAliments =[...aliments];
      const index = renderAliments.findIndex((aliment)=> aliment.id === alimentId);
      newAliments.splice(index, 1); //suppresion de l'élément
    
      /* on met a jour le state pour le render mais également le state Master */
      setRenderAliments(newAliments);
      setaliments(newAliments)
    }

    const updateSearch = e => {// A la suppression de tous les caractères, on ré injecte le master dans le state render
      if(!e.target.value){
        setRenderAliments(aliments)
        setErrorFindAliment(false)
      }
      setSearch(e.target.value);
    }
  

    const handleSubmitSearch = (e) => { // Permet d'effectuer la recherche dans le tableau.
        e.preventDefault() // On stop le rafraichissement de la page (comportement par défault du submit)
        const aliment = aliments.find(elt => elt.nom.toLowerCase() === search.toLowerCase()) // On recherche dans le Master l'element en fonction du texte de l'input (Et on met les string en minuscule)
        if(aliment){ // Si il y a un résultat, on injecte l'element dans le State Render, si non on peut ajouter une erreur avec un else
          setRenderAliments([aliment])
          setErrorFindAliment(false)
        }
        else{
          setErrorFindAliment(true)
        }
    }

    return (
  
  
    <div className="App">
  {/*Ceci est un commentaire*/}
      <h1>Frigo</h1>
        <form className="search-form" onSubmit={handleSubmitSearch}> 
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit"> {/*Création du bouton et de la barre de recherche*/}
            Rechercher
          </button>
        </form>
        {errorFindAliment && 
          <h2>Aucun résultat</h2>
        }{/*Affichage d'aucun résultat si true. */}
      <form>
        <table>{/*Création du tableau*/}
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
              <ReadOnlyRow key={aliment.id.toString()} aliment={aliment} // Permet d'identifier les lignes avec une clé unique. (Tous différent)
              handleDeleteClick={handleDeleteClick}
              increaseQuantity={increaseQuantity} 
              decreaseQuantity={decreaseQuantity}/> 
            ))}  {/*Envoie en props des élément concernant le tableau*/}
          </tbody>
        </table>
      </form> 
      <h1>Ajouter Un Aliment</h1>
      <button onClick={() => navigate('/Formulaire',{ state : { master : aliments , replace : true}})}>Ajouter un Aliment</button>{/*Lors de la pression du bouton, Envoie sur la page Formulaire, la Data permettant ducoup de pouvoir modifier la donnée et la renvoyé*/}
    </div>
      
    );
  }
  
  export default App