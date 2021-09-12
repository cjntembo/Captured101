import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { MemoryContext } from "./MemoryProvider";
import { MemoryDetail } from "./MemoryDetail";
import "./Memory.css"

export const MemoryList = () => {
  const { memories, getMemories, searchTerms } = useContext(MemoryContext)

  const [ filteredMemories, setFiltered ] = useState([])
  const history = useHistory()

  useEffect(() => {
    getMemories()
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = memories.filter(memory => memory.memory.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      setFiltered(memories)
    }
  }, [searchTerms, memories])

  return(
    <>
      <h1>Memories</h1>

      <button onClick={() => history.push("/memories/create")}>
        Make Memory
      </button>

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