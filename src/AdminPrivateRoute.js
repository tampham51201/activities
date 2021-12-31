import React, { useEffect, useState } from "react";
import MasterLayout from "./components/admin/MasterLayout/MasterLayout";

import { Route, Redirect, useHistory } from "react-router";

import { notification } from "antd";

import axiosClient from "./api/axiosClient";

const AdminPrivateRoute = ({ ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axiosClient.get("/api/checkingAuthenticated").then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setLoading(false);
    });
    return () => {
      setAuthenticated(false);
    };
  }, []);

  axiosClient.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
       
        notification.warning({
          message: `Warning`,
          description: err.response.data.message,
          duration: 2,
          placement: "topRight",
        });

        history.push("/");
      }
      return Promise.reject(err);
    }
  );

  axiosClient.interceptors.response.use(
    function (respone) {
      return respone;
    },
    function (err) {
      if (err.response.status === 403) {
        //Access Denied
        // swal("Forbedden", err.response.data.message, "warning");
        notification.warning({
          message: `Forbedden`,
          description: err.response.data.message,
          duration: 2,
          placement: "topRight",
        });

        history.push("/");
      } else {
        if (err.response.status === 404) {
          //Page Not Found
          //   swal("404 Erorr", "Url/Page Not Found", "warning");
          notification.warning({
            message: `404 Erorr"`,
            description: "Url/Page Not Found",
            duration: 2,
            placement: "topRight",
          });
          history.push("/page404");
        }
      }
      return Promise.reject(err);
    }
  );
  if (loading) {
    return <div className="loading">loading</div>;
  }

  return (
    <Route
      {...rest}
      render={(props, location) =>
        authenticated ? (
          <MasterLayout {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
export default AdminPrivateRoute;
