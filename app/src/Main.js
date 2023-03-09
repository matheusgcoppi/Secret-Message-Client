import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';
import useFetchTwo from "./useFetchTwo";

const Main = () => {
    const { pin } = useParams();
    const { data } = useFetch('http://localhost:8000/user/' + pin)
    const { dataTwo } = useFetchTwo('http://localhost:8000/user/' + pin + '/show')
    const [ text, setText ] = useState('')

    console.log(dataTwo.show)

    const sendText = (e) => {
        axios
        .post('http://localhost:8000/user/' + pin, {text})
        .then(response => {
            console.log(response.data)         
        })
    }

    return ( 

        <div className="main"> 

            {Object.entries(data).map(([key, user], i) => (
    <li  key={i}>
        <p> Olá {user.name} </p>

        <form onSubmit={sendText}>
            <label>
        Escreva Algo para {user.name}
                <input type="text" name="name" value={text}  onChange={(e) => setText(e.target.value)} required/>
            </label>
        <input type="submit" value="Submit" />
        </form>   
    </li>
))}         
            <div className="mainTwo">
                
            </div>          
            {Object.entries(dataTwo).map(([key, user], i) => {
            return (
            <div key={i}>
            {user.map((item, j) => (
            <p key={`${i}-${j}`}>{item.text}</p>
            ))}
    </div>
  );
})} 
        
        </div>  
        
        
        
     );
}
 
export default Main;