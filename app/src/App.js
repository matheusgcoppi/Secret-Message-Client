import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import Main from './Main'
import NotFound from './NotFound'
import React, { useState, useMemo } from 'react';
import { UserContext } from './UserContext'

function App() {
  const [user, setUser] = useState(null)

  const value = useMemo(() => ({ user, setUser }), [user, setUser]); //because we'll modify the user multiple times

  return (
    <Router>
      <UserContext.Provider value={value}>
    <div className="app">
      <Routes>
        <Route exact path= "/" element= {<SignUp/>}></Route>
        <Route exact path= "/login" element= {<Login/>}></Route>
        <Route exact path= "/user/:pin" element= {<Main/>}></Route>
        <Route path= "*" element= {<NotFound/>}></Route>
      </Routes>
    </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
