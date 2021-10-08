import React, { useContext, useEffect, useState } from "react";
import { MemoryDetail } from "../memories/MemoryDetail";
import { MemoryContext } from "../memories/MemoryProvider";
import { PeopleDetail } from "../peoples/PeopleDetail";
import "./HomePage.css"
import { HomePageContext } from "./HomePageProvider";





export const HomePageForm = () => {

  const { fetchMemories, fetchPeoples, homePageMemories, homePagePeoples } = useContext(HomePageContext)
  const [ homePageData, setHomePage ] = useState([])
  

  useEffect(() => {
    const userId = localStorage.getItem("captured_user")
    fetchMemories(parseInt(userId)).then(fetchPeoples)
  }, [])

  useEffect (() => {
    // debugger
      setHomePage(homePageMemories.concat(homePagePeoples))
    
  },[homePageMemories, homePagePeoples])

  return (
    <>
    <div className="data">
      {
      homePageData.map(data => {
        if (data.memory) {
          return (
          <MemoryDetail key={data.id} memory={data} />
          )
        } 
        else {
          return (
          <PeopleDetail key={data.id} people={data} />
      )}
    })
      }
    </div>
    </>
  )
} 

