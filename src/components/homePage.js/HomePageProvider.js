import react, { createContext, useState } from "react";
import "./HomePage.css"


export const HomePageContext = createContext()
  const url = 'http://localhost:8088'

export const HomePageProvider = props => {
  const [ homePage, setHomePage ] = useState([])
  const [ homePageMemories, setHomePageMemories ] = useState([])
  const [ homePagePeoples, setHomePagePeoples ] = useState([])
  const [ searchTerms, setSearchTerms] = useState("")

  const getHomePage = () => {
    return fetch(`${url}/homepage`)
    .then(res => res.json())
    .then(setHomePage)
  }

  const fetchPeoples = async() => {
    return fetch(`${url}/peoples?_sort=date&_order=desc&_limit=7`)
    .then(res => res.json())
    .then(setHomePagePeoples)
  };

  const fetchMemories = async() => {
    return fetch(`${url}/memories?_sort=date&_order=desc&_limit=7`)
    .then(res => res.json())
    .then(setHomePageMemories)
  };

  return (
    <HomePageContext.Provider value={{
      homePageMemories, homePagePeoples, getHomePage, searchTerms, setSearchTerms, fetchPeoples, fetchMemories
    }}>
      {props.children}
    </HomePageContext.Provider>
  )

}
