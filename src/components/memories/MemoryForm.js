import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MemoryContext } from "./MemoryProvider";
import { UserContext } from "../users/UserProvider";
import "./Memory.css"

export const MemoryForm = () => {
  const { memories, addMemory, getMemories, getMemoryById, updateMemory } = useContext(MemoryContext)
  const { users, getUsers} = useContext(UserContext)
  const [ isLoading, setIsLoading ] = useState(false);

  const [ memory, setMemory ] = useState({
    memory: "",
    date: "",
    notes: "",
    usersId: localStorage.getItem("captured_user")
  });

  const {memoryId} = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newMemory = { ...memory }
    newMemory[event.target.id] = event.target.value
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
          usersId: parseInt(memory.usersId)
        })
        .then(() => history.push("/memories"))
      } else {
        addMemory({
          memory: memory.memory,
          date: memory.date,
          notes: memory.notes,
          usersId: parseInt(memory.usersId)
        })
        .then(()=> history.push("/memories"))
      }
    }
  }

  
  useEffect(() => {
    const userId = localStorage.getItem("captured_user")
    getMemories(parseInt(userId)).then(() => {
      if(memoryId){
        getMemoryById(memoryId)
        .then(memory => {
          setMemory(memory)
        })
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
           <input type="date" id="date" name="date" required autoFocus className="form-control" placeholder="Date of Memory" defaultValue={memory.date} onChange={handleControlledInputChange} />
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
      {memoryId ? <>Save My Memory</> : <>Add Memory</>}</button>
    </form>
  )

  // return (
  //   <>
  //     <section>
  //       {
  //         memories.map(memory => {
  //           return (
  //             <Row xs={1} md={2} className="g-4">
  //               {Array.from({ length: 1 }).map((_, idx) => (
  //                 <Col>
  //                   <Card border="primary" style={{ width: '18rem' }}>
  //                     <Card.Img className="top" src="holder.js/100px180" />
  //                     <Card.Body>
  //                       <Card.Title>My Memory</Card.Title>
  //                       <Card.Text onChange={handleControlledInputChange}>
  //                         {memory.memory}
  //                       </Card.Text>
  //                       <Card.Text onChange={handleControlledInputChange}>
  //                         {memory.date}
  //                       </Card.Text>
  //                       <Card.Text onChange={handleControlledInputChange}>
  //                         {memory.notes}
  //                       </Card.Text>
  //                       <Button className="primary" onClick={event => {
  //                         event.preventDefault()
  //                         handleSaveMemory()
  //                       }}>{memoryId ? <>Save My Memory</> : <>Add Memory</>}</Button>
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               ))}
  //             </Row>
  //           )
  //         })
  //       }
  //     </section>
  //   </>

  // )
}