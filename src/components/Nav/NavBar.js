import React from "react";
import { Link, useHistory } from "react-router-dom"
import { Nav, Button } from "react-bootstrap";
import "./NavBar.css"

export const NavBar = (props) => {

  const history = useHistory();

  const  logout = () => {
    localStorage.clear();
    history.push("/Login")
  }

  return (
    <Nav defaultActiveKey="/home" className="justify-content-center">
      {/* <img src="src/components/auth/logo.png" alt="memory loss by Gan Khoon Lay from the Noun Project" /> */}
      <Nav.Link href="/">Captured</Nav.Link>
      <Nav.Link href="/profiles">My Profile</Nav.Link>
      <Nav.Link href="/peoples">My People</Nav.Link>
      <Nav.Link href="/memories">My Memories</Nav.Link>
      <Button variant="primary" onClick={logout} size="sm">Log Out</Button>
    </Nav>
  )
}