import React, { useContext } from "react"
import { MemoryContext } from "./MemoryProvider"
import "./Memory.css"

export const MemorySearch = () => {
  const { setSearchTerms } = useContext(MemoryContext)

  return (
    <>
    <div className="memSearch">
      Memory search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for A Memory's... " />
    </div>
    </>
  )
}