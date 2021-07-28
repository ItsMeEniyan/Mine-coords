import React from 'react'
import "./Home.css";
import Login from './components/Login';
import Minelogo from './static/Mine Coords logo.svg'
import Github from './static/github.svg'
// import UseSaveQueryParamsToken from "./stores/useSaveQueryParamsToken";

export default function Home() {
  // UseSaveQueryParamsToken();
    return (
        <div className="home">
            <div className="logo">
            
            <img src={Minelogo} alt="Logo of Minecoords"></img>
        </div>
        <div className="home-tag">Minecraft coordinates Made Easy</div>
            <Login/>
        <div className="home-footer"><span><img src={Github} alt="Logo of Github"></img></span> <span>An open source project</span></div>
        </div>
    )
}
