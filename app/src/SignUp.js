import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {  useNavigate } from "react-router-dom"


const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [pintwo, setPintwo] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:8000/register`, {name, pintwo})
        .then((response) => {
            console.log(response.data)
            if(response.data.pinEncrypted.pin) {
                navigate(`/user/${response.data.pinEncrypted.pin}` )
                console.log(response.data.pinEncrypted.pin)
                localStorage.setItem('accessToken', response.data.accessToken)         
                localStorage.setItem('refreshToken', response.data.refreshToken)         
                console.log(localStorage)    
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    return ( 

        <div className="all "> 
        <div>
      
    </div>
    <div className="container d-flex justify-content-center">
        
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Seu Nome" value={name}  onChange={(e) => setName(e.target.value)} required/>

        <Form.Label>Senha</Form.Label>
        <Form.Control type="text" placeholder="Seu Nome" value={pintwo}  onChange={(e) => setPintwo(e.target.value)} required/>
    </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  
</Form>
    </div>
        </div>
    );
}
 
export default SignUp;