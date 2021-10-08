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
      // const subsetPeople = peoples.filter(person =>{person.date.includes(searchTerms)}) || ([])
      // const subsetMemory = memories.filter(memory => {memory.date.includes(searchTerms)}) || ([])
      const subsetMemory = memories.filter(memory => {return memory.date === (searchTerms)}) || ([])
      const subsetPeople = peoples.filter(people =>{return people.date === (searchTerms)}) || ([])
      
      setFilteredDates(subsetPeople.concat(subsetMemory))
    } else {
      setFilteredDates([])
    }
  })
  }, [searchTerms])

  // useEffect (() => {
  //   getPeoples(parseInt(localStorage.getItem("captured_user"))).then(getMemories)
  // })
  console.log(filteredDates)
  return (
    <>
    {/* <div className="dateSearch">
    <button onClick={() => history.push("/homePage/results")}>Search:</button>
    </div> */}
    <div className="dates">
      {
      filteredDates.map(date => {
        if (date.memory) {
          return (
          <MemoryDetail key={date.id} memory={date} />
          )
        } 
        else {
          return (
          <PeopleDetail key={date.id} people={date} />
      )}
    })
      }
    </div>
    </>
  )
}