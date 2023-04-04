import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useContext, useState } from 'react';
import useFetchTwo from "./useFetchTwo";
import NavBar from "./NavBar";

import React from 'react';
import { UserContext } from "./UserContext";

const Main = () => {
    const { pin } = useParams();
    const { data } = useFetch('http://localhost:8000/user/' + pin);
    const { dataTwo } = useFetchTwo('http://localhost:8000/user/' + pin + '/show');
    const [ text, setText ] = useState('');
    const [ error, setError ] = useState(false);
    const {user, setUser} = useContext(UserContext)   
   

  console.log(JSON.stringify(user))
    const sendText = (e) => {
      try {
        axios
        .post('http://localhost:8000/user/' + pin, {text}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => {
            console.log(response.data.accessToken)
            setUser(response.data) 
                                  
        })
        
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    
    return ( 
      
        <div className="navBar">
        <NavBar/>
        

        <div className="main"> 

            {Object.entries(data).map(([key, user], i) => (
    <div key={i} >
        Olá {user.name} 
        {localStorage.setItem("user-info", JSON.stringify(user))}

        <form onSubmit={sendText}>
            <label>
                Escreva Algo para {user.name}:
                <textarea className="input-type" type="text" name="name" value={text} onChange={(e) => setText(e.target.value)} required />
            </label>
            <input type="submit" value="Submit" />
        </form>   
    </div>
))}    

{error && (
  <span className="error-main">Alguma coisa deu errado</span>
)}

          <div className="blog-list">
            <h2>Anonymous Message Timeline</h2>
            {Object.entries(dataTwo).map(([key, user], i) => (
              <div key={i} className="blog-preview">
                {user.map((item, j) => (
                  <div key={`${i}-${j}`} className="blog-text">
                    <p>escrito por: {item.author}</p>
                    <p>{item.text}</p>
                    
                    <hr />
                  </div>
                ))}
              </div>
            ))}
          </div>
        
      </div>
    </div>
    
  );
};

export default Main;