import React from "react";

import AdminPrivateRoute from "./AdminPrivateRoute";

import PublicRoute from "./PublicRoute";

import Login from "./pages/client/Login/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <AdminPrivateRoute path="/admin" />
        {/* <Route path="/admin" component={MasterLayout} /> */}
        <Route path="/login">
          {localStorage.getItem("auth_token") ? <Redirect to="/" /> : <Login />}
        </Route>

        <PublicRoute path="/" />
      </Switch>
    </Router>
  );
};

export default App;
