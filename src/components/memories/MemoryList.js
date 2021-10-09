import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { MemoryContext } from "./MemoryProvider";
import { MemoryDetail } from "./MemoryDetail";
import "./Memory.css"

export const MemoryList = () => {
  const { memories, getMemories, searchTerms } = useContext(MemoryContext)

  const [ filteredMemories, setFilteredMemories ] = useState([])
  const history = useHistory()

  useEffect(() => {
    getMemories(parseInt(localStorage.getItem("captured_user"))).then(() => {
      setFilteredMemories(memories) 
    })
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = memories.filter(memory => memory.memory.toLowerCase().includes(searchTerms))
      setFilteredMemories(subset)
    } else {
      setFilteredMemories(memories)
    }
  }, [searchTerms, memories])

  return(
    <>
      <h1>Memories</h1>
      <div className="make_mems">
      <button className="make_mem" onClick={() => history.push("/memories/create")}>
        Make Memory
      </button>
      </div>
      <div className="memories">
        {
          filteredMemories.map(memory => {
            return<MemoryDetail key={memory.id} memory={memory} />
          })
        }
      </div>
    </>
  )
}