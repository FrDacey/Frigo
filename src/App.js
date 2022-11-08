import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Legume from './screens/Legume'


const App = () => {

  return(
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/legume" element={<Legume />} />
    </Routes>
  )
}

export default App