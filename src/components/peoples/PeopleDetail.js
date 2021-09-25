import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PeopleContext } from "./PeopleProvider";
import "./People.css"


export const PeopleDetail = props => {

  const {peoples, deletePeople} = useContext(PeopleContext)
  const history = useHistory()

  const [ people, setPeople ] = useState({ people: {} })

  const handleRelease = () => {
    deletePeople(props.people.id)
      .then(() => {
        history.push("/peoples")
      })
  }

  const { peopleId } = useParams();

  useEffect(() => {
    const thisPeople = peoples.find(people => people.id === parseInt(peopleId)) || { people: {} }
    setPeople(thisPeople)
  }, [peopleId])

  return (
    <>
    <div className="peoples">
    <fieldset className="peoples">
      <section className="people">
        <button onClick={handleRelease}>Delete Person</button>
        <button onClick={() => {
          history.push(`/peoples/edit/${props.people.id}`)
        }}>Edit</button>
        <h3 className="people__firstName">{props.people.firstName}</h3>
        <h3 className="people__lastName">{props.people.lastName}</h3>
        <div className="people__date">{props.people.date}</div>
        <div className="people__dateType">{props.people.dateType}</div>
        <div className="people__relationship">{props.people.relationship}</div>
        <div className="people__notes">{props.people.notes}</div>
      </section>
    </fieldset>
    </div>
    </>
  )

}