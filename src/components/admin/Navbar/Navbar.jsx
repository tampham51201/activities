import React, { useRef, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import { notification } from "antd";
import axiosClient from "../../../api/axiosClient";

import "./navbar.scss";
// import swal from "sweetalert";
// import axiosClient from "../../api/axiosClient";

const Topnav = () => {
  const refAuth = useRef(null);
  const authBtn = useRef(null);
  const history = useHistory();

  let authButton = "";

  useEffect(() => {
    const handleNav = (e) => {
      if (!authBtn.current.contains(e.target)) {
        refAuth.current.classList.remove("active");
      }
    };
    document.addEventListener("mousedown", handleNav);

    return () => {
      document.removeEventListener("mousedown", handleNav);
    };
  }, []);

  const handleLogout = () => {
    axiosClient.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        history.push("/");
        notification.success({
          message: `Success`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
      }
    });
  };

  const handleAuth = () => {
    refAuth.current.classList.add("active");
  };

  if (localStorage.getItem("auth_token")) {
    authButton = (
      <ul className="navbar__right__auth" ref={refAuth}>
        <Link to="/profile">
          <li className="navbar__right__auth__item">
            <i className="bx bx-user"></i>Profile
          </li>
        </Link>
        <Link to="/">
          <li className="navbar__right__auth__item">
            <i className="bx bx-log-in"></i>Home
          </li>
        </Link>
        <li className="navbar__right__auth__item" onClick={handleLogout}>
          <i className="bx bx-log-out"></i>Logout
        </li>
      </ul>
    );
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar__search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything" />
        </div>
        <div className="navbar__right">
          <div className="navbar__right__item">
            <i className="bx bxs-bell"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div className="navbar__right__item">
            <i className="bx bxs-envelope"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div
            className="navbar__right__profile"
            ref={authBtn}
            onClick={authButton !== "" ? handleAuth : null}
          >
            <div className="navbar__right__profile__logo">
              <i className="bx bx-user"></i>
            </div>
            {/* {users === null ? "tamm" : users.data.user.username} */}
            tamm
            <i className="bx bx-chevron-down"></i>
            {authButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
