import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "./UserProvider";
import "./User.css"


export const UserDetail = props => {

  const {users, deleteUser} = useContext(UserContext)
  const history = useHistory()

  const [ user, setUser ] = useState({ user: {} })

  const handleRelease = () => {
    deleteUser(props.user.id)
      .then(() => {
        history.push("/users")
      })
  }

  const { userId } = useParams();

  useEffect(() => {
    const thisUser = users.find(user => user.id === parseInt(userId)) || { user: {} }
    setUser(thisUser)
  }, [userId])

  return (
    <section className="user">
      <button onClick={handleRelease}>Delete User</button>
      <button onClick={() => {
        history.push(`/users/edit/${props.user.id}`)
      }}>Edit</button>
      <h3 className="user__firstName">{props.user.firstName}</h3>
      <h3 className="user__lastName">{props.user.lastName}</h3>
      <div className="user__dateOfBirth">{props.user.dateOfBirth}</div>
      <div className="user__email">{props.user.email}</div>
    </section>
  )

}