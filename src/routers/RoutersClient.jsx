import React from "react";

import { Route, Switch, Redirect } from "react-router";

import Home from "../pages/client/Home/Home";

import Profile from "../pages/client/Profile/Profile";
import ActivityDetail from "../pages/client/ActivityDetail/ActivityDetail";
import CategoryActivity from "../pages/client/CategoryActivity/CategoryActivity";

const RoutersClient = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/activityDetail">
        {!localStorage.getItem("auth_token") ? (
          <Redirect to="/login" />
        ) : (
          <ActivityDetail />
        )}
      </Route>

      <Route path="/profile">
        {!localStorage.getItem("auth_token") ? (
          <Redirect to="/login" />
        ) : (
          <Profile />
        )}
      </Route>
      <Route path="/categoryActivity/:id">
        {!localStorage.getItem("auth_token") ? (
          <Redirect to="/login" />
        ) : (
          <CategoryActivity />
        )}
      </Route>
    </Switch>
  );
};

export default RoutersClient;
