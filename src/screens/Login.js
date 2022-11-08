import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()


  return (
    <div>
        <h1>Page Login</h1>
        <button onClick={() => navigate(-1)}>Retourner en arrière dans l'historique</button>
        <button onClick={() => navigate('/register')}>Aller vers la page register</button>
    </div>
    
  )
}

export default Login