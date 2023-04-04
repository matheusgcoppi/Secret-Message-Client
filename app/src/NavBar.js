import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css"
import {  useNavigate } from "react-router-dom"
import { UserContext } from './UserContext';

const NavBar = () => {
  const navigate = useNavigate()
  let userInfo = JSON.parse(localStorage.getItem('user-info'))
  

  const logout = () => {
    localStorage.clear();
    navigate(`/`)

  }
  
    return ( 
      <nav className="navbar">
        <div className="container">
          <div className="logo">
          </div>
          <div className="nav-elements">
            <ul>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
              
              </li>
              <li>
                <NavLink to="/">Registre-se</NavLink>
              </li>
            </ul>
          </div>
          {userInfo && userInfo.name && (
          <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        { userInfo.name }
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        )}
        </div>
      </nav>      
     );
}
 
export default NavBar;