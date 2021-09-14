import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { PeopleContext } from "./PeopleProvider";
import { PeopleDetail } from "./PeopleDetail";
import "./People.css"

export const PeopleList = () => {
  const { peoples, getPeoples, searchTerms } = useContext(PeopleContext)

  const [ filteredPeoples, setFiltered ] = useState([])
  const history = useHistory()

  useEffect(() => {
    getPeoples()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = peoples.filter(people => people.firstName.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(peoples)
    }
  }, [searchTerms, peoples])

  return(
    <>
      <h1>People</h1>

      <button onClick={
        () => history.push("/peoples/create")}>
        Create Your Person
      </button>

      <div className="peoples">
        {
          filteredPeoples.map(people => {
            return <PeopleDetail key={people.id} people={people} />
          })
        }
      </div>
    </>
  )
}