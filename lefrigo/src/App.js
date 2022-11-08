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
}

export default App