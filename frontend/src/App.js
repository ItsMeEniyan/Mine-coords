import React from "react";
import Worldlist from "./components/Worldlist";
import Coordlist from "./components/Coordlist";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { browserHistory } from "react-router";
import "./App.css";

Modal.setAppElement("#root");

export default function App() {
  return (
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
  );
}
