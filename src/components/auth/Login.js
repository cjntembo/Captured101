import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom"
import { Captured } from "../Captured";
import "./Login.css"

const url = 'http://localhost:8088'

export const Login = props => {
  const email = useRef()
  const password = useRef()
  const existDialog = useRef()
  const history = useHistory()

  const existingUserCheck = () => {
    return fetch(`${url}/users?email=${email.current.value}`)
    .then(res => res.json())
    .then(user => user.length ? user[0] : false)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    existingUserCheck()
    .then(exists => {
      if (exists) {
        localStorage.setItem("captured_user", exists.id)
        history.push("/")
      } else {
        existDialog.current.showModal()
      }
    })
  }

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User Does Not Exist</div>
        <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Captured</h1>
          <h2>Please Sign In</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email Address </label>
            <input ref={email} type="email" id="email" className="form-control" placeholder="Email Address" required autoFocus/>
          </fieldset>
          <fieldset>
            <button type="submit">
              Sign In
            </button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a Member Yet?</Link>
      </section>
    </main>
  )

}