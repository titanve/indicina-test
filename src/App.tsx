import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { Search } from "./components/Search";
import { Results } from "./components/Results";

const NoMatch = () => (
  <div className="App-no-match">
    <div className="App-no-match-arrange">
      <p>No route match</p>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <PrivateRoute path="/search">
        <Search />
      </PrivateRoute>
      <PrivateRoute path="/results">
        <Results />
      </PrivateRoute>

      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
}

export { App };
