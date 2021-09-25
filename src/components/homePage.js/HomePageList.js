import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MemoryDetail } from "../memories/MemoryDetail";
import { MemoryContext } from "../memories/MemoryProvider";
import { PeopleDetail } from "../peoples/PeopleDetail";
import { PeopleContext } from "../peoples/PeopleProvider";
import "./HomePage.css"
import { HomePageContext } from "./HomePageProvider";

export const HomePageList = () => {
  
  const { peoples, getPeoples } = useContext(PeopleContext)
  const { memories, getMemories, searchTerms } = useContext(MemoryContext)
  const history = useHistory()
  const [ filteredDates, setFilteredDates ] = useState([])
  const userId = parseInt(localStorage.getItem("captured_user"))
  

  useEffect(() => {
    getPeoples(userId).then(getMemories(userId)).then(() => {
    if (searchTerms !== "") {
      const subsetPeople = peoples.filter(person =>{person.date.includes(searchTerms)})
      const subsetMemory = memories.filter(memory => {memory.date.includes(searchTerms)})
      setFilteredDates(subsetPeople.concat(subsetMemory))
    }
  })
  }, [searchTerms])

  // useEffect (() => {
  //   getPeoples(parseInt(localStorage.getItem("captured_user"))).then(getMemories)
  // })

  return (
    <>
    {/* <div className="dateSearch">
    <button onClick={() => history.push("/homePage/results")}>Search:</button>
    </div> */}
    <div className="dates">
      {
      filteredDates.map(date => {
        return (
          <>
          <PeopleDetail key={peoples.id} peoples={peoples} />
          <MemoryDetail key={memories.id} memories={memories} />
          </>
      )})
      }
    </div>
    </>
  )
}