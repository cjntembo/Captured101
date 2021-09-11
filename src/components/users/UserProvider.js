import React, { createContext, useState } from "react";
import "./User.css"

export const UserContext = createContext()
const url = 'http://localhost:8088'

export const UserProvider = (props) => {
  const [users, setUsers] = useState([])
  const [searchTerms, setSearchTerms] = useState("")

  const getUsers = () => {
    return fetch = (`${url}/users`)
    .then(res => res.json())
    .then(setUsers)
  }

  const addUser = user => {
    return fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
  }

  const getUserById = userId => {
    return fetch(`${url}/users/${userId}`
    )
    .then(res =>res.json())
  }

  const deleteUser = userId => {
    return fetch(`${url}/users/${userId}`, {
      method: "DELETE"
    })
    .then(getUsers)
  }

  const updateUser = user => {
    return fetch(`${url}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(getUsers)
  }

  return(
    <UserContext.Provider value={{
      users, getUsers, addUser, deleteUser, getUserById, updateUser, searchTerms, setSearchTerms
    }}>
      {props.children}
    </UserContext.Provider>
  )
}  