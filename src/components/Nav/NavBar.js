import React from "react";
import { Link } from "react-dom"
// import "bootstrap/dist/css/bootstrap.main.css"

export const NavBar = (props) => {

  const  logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }

  return (
    <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
      <ul className="nav nav-pills nav-fill">
        
        <li className="nav-item">
          <button className="nav-link" onClick={logout}>Log Out</button>
        </li>
        
      </ul>
    </nav>
  )
}