import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";
import "./Profile.css"
import { ProfileDetail } from "./ProfileDetail";


export const ProfileList = () => {
  const { getProfileById, getProfiles,} = useContext(ProfileContext)
  const [ profile, setProfile ] = useState([])
  const [ profiles ] = useState([])
  

  const history = useHistory()

  useEffect(() => {
    getProfileById(localStorage.getItem("captured_user"))
    .then((data) => {
      setProfile(data[0])
    })
  }, [])

  useEffect(() => {
    getProfiles()
  }, [])

  return (
    <>
      <button onClick={() => history.push("/profiles/create")}>
        Create Profile
      </button>
      <h1>Your Profile</h1>
      <div className="profiles">
        <section className="profile">
          {profiles.map(profile => {
          return<ProfileDetail key={profile.id} profile={profile}/> 
        })}
        </section>
        <section className="profile">
            <img src={profile.picture} className="profile__picture" width="300px" height="350px" />
            <div className="profile__quote">
              {profile.quote}
            </div>
        </section>
      </div>

    </>
  )

}