import React, { useContext } from "react";
import { MemoryContext } from "../memories/MemoryProvider";
import { People } from "../peoples/People";
import { PeopleContext } from "../peoples/PeopleProvider";
import "./HomePage.css"
import { HomePageContext } from "./HomePageProvider";

export const HomePageSearch= () => {
  const { setSearchTerms } = useContext( MemoryContext)

  return(
    <>
    <div className="dateSearch">
    <input type="date" className="input--wide" onChange={(event) => setSearchTerms(event.target.value)} placeholder="Search by Date" />
    </div>
    </>
  )
}

