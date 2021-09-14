import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { PeopleContext } from "./PeopleProvider";
import "./People.css"

export const PeopleForm = () => {
  const { addPeople, getPeoples, getPeopleById, updatePeople } = useContext(PeopleContext)
  const [ isLoading, setIsLoading ] = useState(false);

  const [ people, setPeople ] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    notes: "",
    date: "",
    dateType: "",
    userId: localStorage.getItem("captured_user")
  });

  const {peopleId} = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newPeople = { ...people }
    newPeople[event.target.id] = event.target.value
    setPeople(newPeople)
  }

  const handleSaveUser = () => {
    if (parseInt(peopleId) === 0) {
      window.alert("Please Add Your Person")
    } else {
      setIsLoading(true);
      if (peopleId) {
        updatePeople({
          id: people.id,
          firstName: people.firstName,
          lastName: people.lastName,
          relationship: people.relationship,
          notes: people.notes,
          date: people.date,
          dateType: people.dateType,
          userId: parseInt(people.userId)
        })
        .then(() => history.push(`/peoples`))
      } else {
        addPeople({
          firstName: people.firstName,
          lastName: people.lastName,
          relationship: people.relationship,
          notes: people.notes,
          date: people.date,
          dateType: people.dateType,
          userId: people.userId
        })
        .then(() => history.push("/peoples"))
      }
    }
  }

  useEffect(() => {
    getPeoples().then(() => {
      if(peopleId){
        getPeopleById(peopleId)
        .then(people => {
          setPeople(people)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <form className="peopleForm">
      <h2 className="peopleForm__title">My People</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="firstName"> First Name: </label>
          <input type="text" id="firstName" name="firstName" required autoFocus className="form-control"
          placeholder="First Name"
          onChange={handleControlledInputChange}
          defaultValue={people.firstName}/>
        </div>
      </fieldset>
      <fieldset>
         <div className="form-group">
           <label htmlFor="lastName"> Last Name: </label>
           <input type="text" id="lastName" name="lastName" required autoFocus className="form-control" placeholder="Last Name" defaultValue={people.lastName} onChange={handleControlledInputChange} />
         </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="relationship"> Relationship: </label>
          <input type="text" id="relationship" name="relationship" required autoFocus className="form-control" placeholder="Relationship" defaultValue={people.relationship} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date"> Date to Remember: </label>
          <input type="date" id="date" name="date" required autoFocus className="form-control" placeholder="Date to Remember" defaultValue={people.date} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="dateType"> Date Type: </label>
          <input type="text" id="dateType" name="dateType" required autoFocus className="form-control" placeholder="Date Type" defaultValue={people.dateType} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes"> Notes: </label>
          <input type="text" id="notes" name="notes" required autoFocus className="form-control" placeholder="notes" defaultValue={people.notes} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveUser()
        }}>{peopleId ? <>Save Person</> : <>Add Person</>}</button>
    </form>
  )



}