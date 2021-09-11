import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./User.css"
import { UserContext } from "./UserProvider";

export const UserList = () => {
  const { users, getUsers, searchTerms } = useContext(UserContext)

  const [ filteredUsers, setFiltered ] = useState([])
  const history = useHistory()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = users.filter(user => user.email.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(users)
    }
  }, [searchTerms, users])

  return(
    <>
      <h1>USERS</h1>

      <button onClick={() => history.push("/users/create")}>
        Make User
      </button>

      <div className="users">
        {
          filteredUsers.map(user => {
            return<UserDetail key={user.id} user={user} />
          })
        }
      </div>
    </>
  )
}