import './index.css'
import { useState } from 'react';
import axios from 'axios';
const Login = () => {

    const [pin, setPin] = useState('')
    const [pintwo, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:8000/login', {pin, pintwo})
        .then(response => {
            console.log(response)
        })
    }

    return ( 
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
     );
}
 
export default Login;