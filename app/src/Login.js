import './index.css'
import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom"
import NavBar from './NavBar';

const Login = () => {
    const navigate = useNavigate()

    const [pin, setPin] = useState('')
    const [pintwo, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:8000/login', {pin, pintwo})
        .then(response => {
            console.log(response.data)
            if(response.data.sucess === "true") {
                navigate('/user/' + pin)
            }
            
        })
    }

    return ( 
        <div>
            <NavBar/>
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Pin</label>
                    <input type="text" name="pin" value={pin} onChange={(e) => setPin(e.target.value)} required />                
                </div>
                <div className="input-container">
                    <label>Senha</label>
                    <input type="password" name="pass" value={pintwo} onChange={e => setPassword(e.target.value)}  required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
        </div>
     );
}
 
export default Login;