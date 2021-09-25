import react, { createContext, useState } from "react";
import "./HomePage.css"


export const HomePageContext = createContext()
  const url = 'http://localhost:8088'

export const HomePageProvider = props => {
  const [ homePage, setHomePage ] = useState([])
  const [ searchTerms, setSearchTerms] = useState("")

  const getHomePage = () => {
    return fetch(`$(url)/homepage`)
    .then(res => res.json())
    .then(setHomePage)
  }

  return (
    <HomePageContext.Provider value={{
      homePage, getHomePage, searchTerms, setSearchTerms
    }}>
      {props.children}
    </HomePageContext.Provider>
  )

}
