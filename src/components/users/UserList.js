import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "./UserProvider";
import { UserDetail } from "./UserDetail";
import "./User.css"

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