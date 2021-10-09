import React, { useContext } from "react"
import { PeopleContext } from "./PeopleProvider"
import "./People.css"

export const PeopleSearch = () => {
  const { setSearchTerms } = useContext(PeopleContext)

  return (
    <>
    <div className="peopleSearch">
      Person search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for A Person's... " />
    </div>
    </>
  )
}