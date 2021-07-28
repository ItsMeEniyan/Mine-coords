import React from 'react'
import Minelogo from '../static/Mine Coords logo.svg'
import "./Navbar.css";

function Navbar() {
    return (
        <>
        <div className="navbar">
        <div className="navbar-logo">
            <img src={Minelogo} alt="Logo of Minecoords"></img>
        </div>
        <div className="navbar-sign-out">
            <div >Sign out</div>
        </div>
        </div>
        </>
    )
}

export default Navbar
