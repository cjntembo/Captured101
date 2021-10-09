import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { Nav, Button } from "react-bootstrap";
import "./NavBar.css"
import { ProfileContext } from "../profiles/ProfileProvider";

export const NavBar = (props) => {
  // const { getProfileById, getProfiles } = useContext(ProfileContext)
  const [ profile, setProfile ] = useState([])
  
  const history = useHistory();

  const  logout = () => {
    localStorage.clear();
    history.push("/Login")
  }

  // useEffect(() => {
  //   getProfileById(localStorage.getItem("captured_user"))
  //   .then((data) => {
  //     setProfile(data[0])
  //   })
  // }, [])

  // useEffect(() => {
  //   getProfiles()
  // }, [])

  return (
    <Nav defaultActiveKey="/home" className="justify-content-center">
      <img href={profile.picture}  className="profile__picture" width="50px" height="55px" />
      <Nav.Link href="/">Captured</Nav.Link>
      <Nav.Link href="/profiles">My Profile</Nav.Link>
      <Nav.Link href="/peoples">My People</Nav.Link>
      <Nav.Link href="/memories">My Memories</Nav.Link>
      <Button variant="primary" onClick={logout} size="sm">Log Out</Button>
    </Nav>
  )
}