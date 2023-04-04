import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom"
import "./signup.css"
import NavBar from "./NavBar"
import { UserContext } from './UserContext';
import React, {useContext, useEffect} from 'react'

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [pintwo, setPintwo] = useState('')
    const {user, setUser} = useContext(UserContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:8000/register`, {name, pintwo})
        .then((response) => {
            console.log(response.data)
            setUser(response.data)
            localStorage.setItem('accessToken', response.data.accessToken)         
            localStorage.setItem('refreshToken', response.data.refreshToken) 
            
            if(response.data.pinEncrypted.pin) {
                navigate(`/user/${response.data.pinEncrypted.pin}` )
                console.log(response.data.pinEncrypted.pin)                 
                console.log(localStorage) 
                         
            }
        })
        .catch((error) => {
            console.log(error)
        })
      
    }

    return ( 
        <div className="main-sign "> 
        <NavBar/>
    <div className="container-sign">
        
    <form onSubmit={handleSubmit}>
        
        <div className='form-sign'>
        <label>Nome</label>
        <input type="text" placeholder="Seu Nome" value={name}  onChange={(e) => setName(e.target.value)} required/>

        <label>Senha</label>
        <input type="text" placeholder="Seu Nome" value={pintwo}  onChange={(e) => setPintwo(e.target.value)} required/>
        </div>
  
  <button className="button-sign" type="submit">
    Submit
  </button>
  
</form>
    </div>
        </div>
      
      );
    }
 
export default SignUp;