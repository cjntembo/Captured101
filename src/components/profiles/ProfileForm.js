import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { UserContext } from "../users/UserProvider";
import { ProfileContext } from "./ProfileProvider";
import "./Profile.css"


export const ProfileForm = () => {
  const { addProfile, getProfiles, getProfileById, updateProfile } = useContext(ProfileContext)
  const { users, getUsers } = useContext(UserContext)

  const [ profile, setProfile ] = useState({
    picture: "",
    quote: "",
    usersId: parseInt(localStorage.getItem("captured_user"))
  });

  const {profileId} = useParams()
  const history = useHistory()

  const handleControlledInputChange = (event) => {
    const newProfile = { ...profile }
    newProfile[event.target.id] = event.target.value
    setProfile(newProfile)
  }

  const handleSaveProfile = () => {
    if (parseInt(profile.usersId) === 0) {
      window.alert("Please Create Your Profile!!")
    } else {
      if(profile.usersId){
        updateProfile({
          id: profile.id,
          picture: profile.picture,
          quote: profile.quote,
          usersId: profile.usersId
        })
        .then(() => history.push(`/profiles`))
      } else {
        addProfile({
          picture: profile.picture,
          quote: profile.quote,
          usersId: profile.usersId
        })
        .then(() => history.push("/profiles"))
      }
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("captured_user")
    getProfiles(parseInt(userId)).then(() => {
      if(profile.usersId){
        getProfileById(profile.usersId)
        .then(profile => {
          setProfile(profile)
        })
      }
    })
  }, [])

  return (
    <form className="profileForm">
      <h2 className="profileForm__title">Profile</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="picture"> Picture: </label>
          <input type="text" id="picture" name="picture" required autoFocus className="form-control" placeholder="Please Add Your Picture" defaultValue={profile.picture} onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="quote"> Quote: </label>
          <input type="text" id="quote" name="quote" required autoFocus className="form-control" placeholder="Quote Yourself or Someone Else" defaultValue={profile.quote} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
      onClick={event => {
        event.preventDefault()
        handleSaveProfile()
      }}>
        {profileId ? <>Save Profile</> : <>Add Profile</>}
      </button>
    </form>
  )
}