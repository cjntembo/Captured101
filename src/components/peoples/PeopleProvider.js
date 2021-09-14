import React, { createContext, useState } from "react";
import "./People.css"

export const PeopleContext = createContext()
const url = 'http://localhost:8088'

export const PeopleProvider = (props) => {
  const [peoples, setPeoples] = useState([])
  const [searchTerms, setSearchTerms] = useState("")

  const getPeoples = () => {
    return fetch(`${url}/peoples?_expand=user.id`)
      .then(res => res.json())
      .then(setPeoples)
  }

  const addPeople = people => {
    return fetch(`${url}/peoples`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(people)
    })
    .then(res => res.json())
  }

  const getPeopleById = peopleId => {
    return fetch(`${url}/peoples/${peopleId}`
    )
    .then(res =>res.json())
  }

  const deletePeople = peopleId => {
    return fetch(`${url}/peoples/${peopleId}`, {
      method: "DELETE"
    })
    .then(getPeoples)
  }

  const updatePeople = people => {
    return fetch(`${url}/peoples/${people.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(people)
    })
    .then(getPeoples)
  }

  return(
    <PeopleContext.Provider value={{
      peoples, getPeoples, addPeople, deletePeople, getPeopleById, updatePeople, searchTerms, setSearchTerms
    }}>
      {props.children}
    </PeopleContext.Provider>
  )
}