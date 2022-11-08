import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Page Home</h1>
        <Link to="/login">Aller à la page Login</Link>
        <br />
        <Link to="/register">Aller à la page Register</Link>
        <br />
        <Link to="/legume">Aller à la page Légume</Link>
    </div>
    
  )
}

export default Home