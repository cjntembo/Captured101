import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./Nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Captured.css"




export const Captured = () => {
  return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("captured_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
  )
}


// export const Captured = () => (
//   <>
//     <h2>Captured</h2>
//     <small>Capturing the Small, yet Important Dates.</small>
//     <contact>
//       <div>cjntembo@gmail.com</div>
//     </contact>
//   </>
// )