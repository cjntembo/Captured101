import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MemoryContext } from "./MemoryProvider";
import { Card, Button } from "react-bootstrap";
import "./Memory.css"


export const MemoryDetail = props => {

  const {memories, deleteMemory} = useContext(MemoryContext)
  const history = useHistory()

  // const [ memory, setMemory ] = useState({ memory: {} })
  const { memory } = props

  const handleRelease = () => {
    deleteMemory(props.memory.id)
      .then(() => {
        history.push("/memories")
      })
  }


  // const { memoryId } = useParams();

  // useEffect(() => {
  //   const thisMemory = memories.find(memory => memory.id === parseInt(memoryId)) || { memory: {} }
  //   setMemory(thisMemory)
  // }, [memoryId])

  return (
    <>
    {/* <div className="memories">
    <fieldset className="memories">
    <section className="memory">
      <button onClick={handleRelease}>Delete Memory</button>
      <button onClick={() => {
        history.push(`/memories/edit/${props.memory.id}`)
      }}>Edit</button>
      <h3 className="memory__memory">{props.memory.memory}</h3>
      <h3 className="memory__date">{props.memory.date}</h3>
      <div className="memory__notes">{props.memory.notes}</div>
    </section>
    </fieldset>
    </div> */}

    <div className="memories">
    <fieldset className="memories">
    <section className="memory">
      <h3 className="memory__memory">{memory.memory}</h3>
      <h3 className="memory__date">{memory.date}</h3>
      <div className="memory__notes">{memory.notes}</div>
      <button onClick={() => {
        history.push(`/memories/edit/${memory.id}`)
      }}>Edit</button>
      <button onClick={handleRelease}>Delete Memory</button>
    </section>
    </fieldset>
    </div>
    </>
  )

}