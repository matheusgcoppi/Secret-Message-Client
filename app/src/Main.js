import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from 'react';
import useFetchTwo from "./useFetchTwo";
import NavBar from "./NavBar";


const Main = () => {
    const { pin } = useParams();
    const { data } = useFetch('http://localhost:8000/user/' + pin);
    const { dataTwo } = useFetchTwo('http://localhost:8000/user/' + pin + '/show');
    const [ text, setText ] = useState('');

    const sendText = (e) => {
        axios
        .post('http://localhost:8000/user/' + pin, {text}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            console.log(response.data.accessToken)                       
        })
    }
    

    

    return ( 
        <div className="navBar">
        <NavBar/>

        <div className="main"> 

            {Object.entries(data).map(([key, user], i) => (
    <div key={i} >
        Olá {user.name} 

        <form onSubmit={sendText}>
            <label>
                Escreva Algo para {user.name}:
                <textarea className="input-type" type="text" name="name" value={text} onChange={(e) => setText(e.target.value)} required />
            </label>
            <input type="submit" value="Submit" />
        </form>   
    </div>
))}        

            <div className="blog-list">
                <h2>Anonymous Message Timeline</h2>
                
            </div>          
            {Object.entries(dataTwo).map(([key, user], i) => {
            return (
            <div key={i} className="blog-preview">
            {user.map((item, j) => (

            <div className="blog-text">
                
            <p key={`${i}-${j}`}>escrito por: {item.author}</p>
            <p>{item.text}</p>
            <hr />
                
            </div>

            ))}
    </div>
  );
})}      
        </div>       
        </div>       
     );
}
 
export default Main;