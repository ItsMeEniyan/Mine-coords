import React from 'react'
import Minelogo from '../static/Mine Coords logo.svg'
import { useHistory } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    let history = useHistory();
    
    return (
        <>
        <div className="navbar">
        <div className="navbar-logo">
            <img src={Minelogo} alt="Logo of Minecoords"></img>
        </div>
        <div className="navbar-sign-out">
            <div onClick={()=>{
                localStorage.removeItem("jwtTok");
                history.push("/");
            }}>Sign out</div>
        </div>
        </div>
        </>
    )
}

export default Navbar
