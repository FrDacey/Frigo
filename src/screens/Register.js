import React from 'react'
import { useNavigate } from 'react-router-dom'


function Register() {

    const navigate = useNavigate()


  return (
    <div>
        <h1>Page Register</h1>
        <button onClick={() => navigate(-1)}>Retourner en arrière dans l'historique -1</button>
        <button onClick={() => navigate(-2)}>Retourner en arrière dans l'historique -2</button>
        <button onClick={() => navigate('/legume')}>Aller vers la page legume</button>
    </div>
  )
}

export default Register