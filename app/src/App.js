import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import Main from './Main'
import NotFound from './NotFound'
import React from 'react';

function App() {
 

  

  return (
    <Router>
      
    <div className="app">
      <Routes>
        <Route exact path= "/" element= {<SignUp/>}></Route>
        <Route exact path= "/login" element= {<Login/>}></Route>
        <Route exact path= "/user/:pin" element= {<Main/>}></Route>
        <Route path= "*" element= {<NotFound/>}></Route>
      </Routes>
    </div>
      
    </Router>
  );
}

export default App;
