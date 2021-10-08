import React, { useContext, useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileProvider";


export const ProfileDetail = props => {
  
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
   const thisProfile = profiles.find(profile => profile.id === parseInt(profileId)) || { profile: {} }
   setProfile(thisProfile)
 }, [profileId])

  return (
    <>
      <div className="profiles">
      <button onClick={handleRelease}>Delete Your Profile!!!</button>
      <button onClick={() => {
        history.push(`/profiles/edit/${props.profile.id}`)
      }}>Edit Your Profile</button>
        <img src={profile.picture} className="profile__picture" width="300px" height="350px" />
        <div className="profile__quote"> { props.profile.quote } </div>
        </div>
    </>
  )

}