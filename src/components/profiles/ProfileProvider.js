import React, { useState, createContext } from "react";
import "./Profile.css"


export const ProfileContext = createContext()
  const url = 'http://localhost:8088'

export const ProfileProvider = props => {
  const [ profiles, setProfiles ] = useState([])

  const getProfiles = () => {
    return fetch(`${url}/profiles`)
    .then(res => res.json())
    .then(setProfiles)
  }

  const addProfile = profile => {
    return fetch(`${url}/profiles`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
    .then(res => res.json())
  }

  const getProfileById = (profileId) => {
    return fetch(`${url}/profiles?usersId=${profileId}`
    )
    .then(res => res.json())
  }

  const deleteProfile = (profileId) => {
    return fetch(`${url}/profiles/${profileId}`, {
      method: "DELETE"
    })
    .then(getProfiles)
  }

  const updateProfile = profile => {
    return fetch(`${url}/profiles/${profile.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
    .then(getProfiles)
  }

  return (
    <ProfileContext.Provider value={{
      profiles, getProfiles, addProfile, deleteProfile, getProfileById, updateProfile
    }}>
      {props.children}
    </ProfileContext.Provider>
  )

}