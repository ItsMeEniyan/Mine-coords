import React from "react";
import Worldlist from "./components/Worldlist";
import Coordlist from "./components/Coordlist";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { browserHistory } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import UseSaveQueryParamsToken from "./stores/useSaveQueryParamsToken";

Modal.setAppElement("#root");

export default function App() {

  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }

  // const query = useQuery();
  // const jwtTok =query.get("jwtTok")

  // localStorage.setItem("jwtTok", jwtTok);

  
  UseSaveQueryParamsToken();

  return (
    <div className="app-body" >
    <div>
    <Navbar/>
    <Router /*history={browserHistory}*/>
      <div>
        <Switch>
          <Route path="/coords/:id">
            <Coordlist />
          </Route>
          <Route path="/">
            <Worldlist />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    </div>
  );
}
