import React from "react";

import { Route, Switch, Redirect } from "react-router";

import Dashboard from "../pages/admin/Dashboard/Dashboard";

import Customers from "../pages/admin/Customers/Customers";

import Categorys from "../pages/admin/Category/Category";
import AddCategory from "../pages/admin/Category/AddCategory";
import EditCategory from "../pages/admin/Category/EditCategory";

import Activities from "../pages/admin/Activities/Activities";
import AddActivites from "../pages/admin/Activities/AddActivites";
import EditActivities from "../pages/admin/Activities/EditActivities";

import RegisterActivities from "../pages/admin/RegisterActivities/RegisterActivities";
import RegisterActivitiesDetail from "../pages/admin/RegisterActivities/RegisterActivitiesDetail";

const RoutersAdmin = () => {
  return (
    <Switch>
      <Route exact={true} path="/admin/doahboard" component={Dashboard} />
      <Route exact={true} path="/admin/customer" component={Customers} />
      <Route exact={true} path="/admin/category" component={Categorys} />
      <Route exact={true} path="/admin/category-add" component={AddCategory} />
      <Route
        exact={true}
        path="/admin/category-edit/:id"
        component={EditCategory}
      />
      <Route exact={true} path="/admin/activity" component={Activities} />
      <Route exact={true} path="/admin/activity-add" component={AddActivites} />
      <Route
        exact={true}
        path="/admin/activity-edit/:id"
        component={EditActivities}
      />
      register-activity-detail
      <Route
        exact={true}
        path="/admin/register-activity"
        component={RegisterActivities}
      />
      <Route
        exact={true}
        path="/admin/register-activity-detail/:id"
        component={RegisterActivitiesDetail}
      />
      <Redirect from="/admin" to="/admin/doahboard" />
    </Switch>
  );
};

export default RoutersAdmin;
