import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { PeopleContext } from "./PeopleProvider";
import { PeopleDetail } from "./PeopleDetail";
import "./People.css"

export const PeopleList = () => {
  const { peoples, getPeoples, searchTerms } = useContext(PeopleContext)

  const [ filteredPeoples, setFilteredPeoples ] = useState([])
  const history = useHistory()

  useEffect(() => {
    getPeoples(parseInt(localStorage.getItem("captured_user"))).then(() => {
      setFilteredPeoples(peoples)
    })
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = peoples.filter(people => people.firstName.toLowerCase().includes(searchTerms))
      setFilteredPeoples(subset)
    } else {
      setFilteredPeoples(peoples)
    }
  }, [searchTerms, peoples])

  return(
    <>
      <h1>People</h1>
      <div className="make_people">
      <button onClick={
        () => history.push("/peoples/create")}>
        Create Your Person
      </button>
      </div>
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