import { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"


const url = 'http://localhost:8088'

export const Register = props => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const verifyPassword = useRef()
  const conflictDialog = useRef()
  const history = useHistory()

  const existingUserCheck = () => {
    return fetch(`${url}/users?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => !!user.length)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    existingUserCheck()
      .then((userExists) => {
        if (!userExists) {
          fetch('${url}/customers', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: `${props.user.email.current.value}`,
              name: `${props.user.firstName.current.value} ${props.user.lastName.current.value}`,
              dob: `${props.user.dob.current.value}`
            })
          })
            .then(res => res.json())
            .then(createdUser => {
              if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("captured_user", createdUser.id)
                history.push("/")
              }
            })
        } else {
          conflictDialog.current.showModal()
        }
      })
  }

  return (
    <main style={{ textAlign: "center" }}>

      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that Email Address Already Exists!</div>
        <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Register for Captured</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input ref={props.user.firstName} type="text" name="firstName" className="form-control" placeholder="First Name" required autoFocus />
          <label htmlFor="lastName"> Last Name </label>
          <input ref={props.user.lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" required />
          <label htmlFor="inputEmail"> Email Address </label>
          <input ref={props.user.email} type="text" name="email" className="form-control" placeholder="Email Address" required />
          <label htmlFor="dateOfBirth"> Date of Birth </label>
          <input ref={props.user.dob} type="text" name="dob" className="form-control" placeholder="Date of Birth" required />
        </fieldset>
        <fieldset>
          <button type="submit"> Sign In </button>
        </fieldset>
      </form>

    </main>
  )
}
