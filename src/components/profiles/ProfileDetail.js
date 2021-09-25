import React, { useContext, useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { ProfileContext, ProfileProvider } from "./ProfileProvider";


export const ProfileDetail = props => {
  debugger
  const { profiles, deleteProfile } = useContext(ProfileContext)
  const history = useHistory()

  const [ profile, setProfile ] = useState({ profile: {} })

  const handleRelease = () => {
    deleteProfile(props.profile.id)
    .then(() => {
      history.push("/profiles")
    })
  }

  const { profileId } = useParams();
 useEffect(() => {
   const thisProfile = profiles.find(profile => profile.id === parseInt(profileId)) || { user: {} }
   setProfile(thisProfile)
 }, [profileId])

  return (
    <>
      <button onClick={handleRelease}>Delete Your Profile!!!</button>
      <button onClick={() => {
        history.push(`/profiles/edit/${props.profile.id}`)
      }}>Edit Your Profile</button>
        <h3 className="profile__picture"> { props.profile.picture } </h3>
        <div className="profile__quote"> { props.profile.quote } </div>
    </>
  )

}