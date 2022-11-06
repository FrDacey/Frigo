import React, { useState } from 'react';
import "./App.css";
import data from "./inventory.json"
import ReadOnlyRow from "./components/ReadOnlyRow"
import {nanoid} from 'nanoid'

const App = () => {

  const [aliments, setaliments] = useState(data);
  
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

    const newAliment = {
      id: nanoid(),
      nom: addFormData.nom,
      nombre: addFormData.nombre
    };

    const newAliments = [...aliments, newAliment];
    setaliments(newAliments);
  };

  const handleDeleteClick = (alimentId) => {
    const newAliments =[...aliments];
    
    const index = aliments.findIndex((aliment)=> aliment.id === alimentId);

    newAliments.splice(index, 1);

    setaliments(newAliments);
}


const [search, setSearch] = useState("");

const updateSearch = e => {
  setSearch(e.target.value);
}

  return (
    <div className="App">
      <h1>Frigo</h1>
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Rechercher
        </button>

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
            aliments.filter((value)=>{
              if (search === ""){
                return value;
                } else if (value.nom.toLowerCase().includes(search.toLowerCase())){
                return value;
                }
              }).map((aliment)=> (
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
          placeholder="Entrer un Nombre"
          onChange={handleAddFormChange}/>

          <button type="submit">Ajouter</button>
        </form>
    </div>
    
  );
}

export default App;

