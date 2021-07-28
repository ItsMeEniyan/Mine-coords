import React from 'react'
import "./Login.css";
import Google from "../static/google.svg"
// import UseSaveQueryParamsToken from "./stores/useSaveQueryParamsToken";

export default function Login() {
  // UseSaveQueryParamsToken();
    return (
        <div>
            <form action={`${process.env.REACT_APP_SERVER_URL}/auth/google`}>
          <button type="submit" className="google-button">
          <span className="google-logo">
            <img src={Google} alt="Logo of Google"></img>
        </span>
            <span className="google-button__text">Sign in with Google</span>
          </button>
        </form>
        </div>
    )
}
