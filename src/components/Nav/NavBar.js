import React from "react";
import { Link, useHistory } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.main.css"

export const NavBar = (props) => {

  const history = useHistory();

  const  logout = () => {
    localStorage.clear();
    history.push("/Login")
  }

  return (
      <ul className="navbar nav-pills nav-fill">
        <li className="navbar__item active">
          <Link className="navbar__link" to="/">Captured</Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/peoples">My People</Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/memories">My Memories</Link>
        </li>
        <li className="navbar__item">
          <button className="navbar__link" onClick={logout}>Log Out</button>
        </li>
      </ul>
  )
}