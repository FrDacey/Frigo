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
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Legume from './screens/Frigo'
import Formulaire from './screens/Formulaire';


const App = () => {

  return(
    <Routes>
        <Route path="/" element={<Legume />} />
        <Route path="/formulaire" element={<Formulaire/>}/>
    </Routes>
  )
}// création des routes pour changer de pages 

export default App