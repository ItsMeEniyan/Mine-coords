import React from "react";
import Worldlist from "./components/Worldlist";
import Coordlist from "./components/Coordlist";
import Modal from "react-modal";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

Modal.setAppElement("#root");

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/coord">
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
