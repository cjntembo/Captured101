import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";
import "./Profile.css"
import { useState } from "react";

export const ProfileList = () => {
  const { getProfileById } = useContext(ProfileContext)
  const [ profile, setProfile ] = useState([])

  const history = useHistory()

  useEffect(() => {
    getProfileById(localStorage.getItem("captured_user"))
    .then((data) => {
      setProfile(data[0])
    })
  }, [])

  return (
    <>
    
      <h1>Your Profile</h1>
      <button onClick={() => history.push("/profiles/create")}>
        Create Profile
      </button>
      <div className="profiles">
      <section className="profiles">
              <div className="profile" >
                <img src={profile.picture} className="profile__picture" width="300px" height="350px"/> 
                <div className="profile__quote">
                  {profile.quote}
                </div>
              </div>
      </section>
      </div>
    </>
  )

}