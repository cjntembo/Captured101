import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./User.css"
import { UserContext } from "./UserProvider";

export const UserForm = () => {
  const { getUsers, getUserById, updateUser } = useContext(UserContext)
  const [ isLoading, setIsLoading ] = useState(false);

  const [ user, setUser ] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: ""
  });

  const {usersId} = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newUser = { ...user }
    newUser[event.target.id] = event.target.value
    setUser(newUser)
  }

  const handleSaveUser = () => {
    if (parseInt(usersId) === 0) {
      window.alert("Please Select a User")
    } else {
      setIsLoading(true);
      if (usersId) {
        updateUser({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth
        })
        .then(() => history.push("/users"))
      }
    }
  }

  useEffect(() => {
    getUsers().then(() => {
      if(usersId){
        getUserById(usersId)
        .then(user => {
          setUser(user)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <form className="userForm">
      <h2 className="userForm__title">Users</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="firstName"> First Name: </label>
          <input type="text" id="firstName" name="firstName" required autoFocus className="form-control"
          placeholder="First Name"
          onChange={handleControlledInputChange}
          defaultValue={user.firstName}/>
        </div>
      </fieldset>
      <fieldset>
         <div className="form-group">
           <label htmlFor="lastName"> Last Name: </label>
           <input type="text" id="lastName" name="lastName" required autoFocus className="form-control" placeholder="Last Name" defaultValue={user.lastName} onChange={handleControlledInputChange} />
         </div>
      </fieldset>
      <fieldset>
         <div className="form-group">
           <label htmlFor="email"> Email: </label>
           <input type="email" id="email" name="email" required autoFocus className="form-control" placeholder="Email Address" defaultValue={user.email} onChange={handleControlledInputChange} />
         </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="dateOfBirth"> Date of Birth: </label>
          <input type="text" id="dateOfBirth" name="dateOfBirth" required autoFocus className="form-control" placeholder="Date of Birth" defaultValue={user.dateOfBirth} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveUser()
        }}>
      {usersId ? <>Save User</> : <>Add User</>}</button>
    </form>
  )



}