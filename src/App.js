import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashbord";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
