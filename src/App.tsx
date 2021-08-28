import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { Search } from "./components/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/search">
          <Search />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export { App };
