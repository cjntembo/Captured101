import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MemoryContext } from "./MemoryProvider";
import "./Memory.css"
import { UserContext } from "../users/UserProvider";

export const MemoryForm = () => {
  const { addMemory, getMemories, getMemoryById, updateMemory } = useContext(MemoryContext)
  const { users, getUsers} = useContext(UserContext)
  const [ isLoading, setIsLoading ] = useState(true);

  const [ memory, setMemory ] = useState({
    memory: "",
    date: "",
    notes: "",
    userId: 0
  });

  const {memoryId} = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newMemory = { ...memory }
    newMemory[event.target.memoryId] = event.target.value
    setMemory(newMemory)
  }

  const handleSaveMemory = () => {
    if (parseInt(memoryId) === 0) {
      window.alert("Please Select Your Memory!")
    } else {
      setIsLoading(true);
      if (memoryId) {
       updateMemory({
          id: memory.id,
          memory: memory.memory,
          date: memory.date,
          notes: memory.notes,
          userId: parseInt(memory.userId)
        })
        .then(() => history.push("/users"))
      } else {
        addMemory({
          memory: memory.memory,
          date: memory.date,
          notes: memory.notes,
          userId: memory.userId
        })
      }
    }
  }

  useEffect(() => {
    getMemories().then(getUsers).then(() => {
      if(memoryId){
        getMemoryById(memoryId)
        .then(memory => {
          setMemory(memory)
          setIsLoading(false)
        })
      } else {
        setIsLoading(true)
      }
    })
  }, [])

  return (
    <form className="userForm">
      <h2 className="userForm__title">Users</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="memory"> My Memory: </label>
          <input type="text" id="memory" name="memory" required autoFocus className="form-control"
          placeholder="My memory"
          onChange={handleControlledInputChange}
          defaultValue={memory.memory}/>
        </div>
      </fieldset>
      <fieldset>
         <div className="form-group">
           <label htmlFor="date"> Date: </label>
           <input type="text" id="date" name="date" required autoFocus className="form-control" placeholder="Date of Memory" defaultValue={memory.date} onChange={handleControlledInputChange} />
         </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes"> Notes: </label>
          <input type="text" id="notes" name="notes" required autoFocus className="form-control" placeholder="Notes" defaultValue={memory.notes} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveMemory()
        }}>
      memoryId ? <>Save My Memory</></button>
    </form>
  )



}