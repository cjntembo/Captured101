import React, { createContext, useState } from "react";
import "./Memory.css"

export const MemoryContext = createContext()
const url = 'http://localhost:8088'

export const MemoryProvider = (props) => {
  const [memories, setMemories] = useState([])
  const [searchTerms, setSearchTerms] = useState("")

  const getMemories = (id) => {
    return fetch(`${url}/memories?_expand=users&usersId=${id}`)
      .then(res => res.json())
      .then(setMemories)
  }

  const addMemory = memory => {
    return fetch(`${url}/memories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memory)
    })
    .then(res => res.json())
  }

  const getMemoryById = memoryId => {
    return fetch(`${url}/memories/${memoryId}`
    )
    .then(res =>res.json())
  }

  const deleteMemory = memoryId => {
    return fetch(`${url}/memories/${memoryId}`, {
      method: "DELETE"
    })
    .then(getMemories)
  }

  const updateMemory = memory => {
    return fetch(`${url}/memories/${memory.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memory)
    })
    .then(getMemories)
  }

  return(
    <MemoryContext.Provider value={{
      memories, getMemories, addMemory, deleteMemory, getMemoryById, updateMemory, searchTerms, setSearchTerms
    }}>
      {props.children}
    </MemoryContext.Provider>
  )
}