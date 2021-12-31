import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import "./sidebar.scss";

const sidebar = [
  {
    display: "Tổng Quan",
    path: "/admin/doahboard",
    icon: "bx bx-line-chart",
  },
  {
    display: "Quản Lý Tài Khoản",
    path: "/admin/customer",
    icon: "bx bxs-user-account",
  },
  {
    display: "Đơn Vị Tổ Chức",
    path: "/admin/category",
    icon: "bx bx-category",
  },
  {
    display: "Hoạt Động",
    path: "/admin/activity",
    icon: "bx bx-grid-alt",
  },
  {
    display: "DS Đăng Kí Hoạt Động",
    path: "/admin/register-activity",
    icon: "bx bx-basket",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">ADMIN MASTER</div>
      <div className="sidebar__list">
        {sidebar.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className={`sidebar__list__item  ${
                location.pathname.includes(item.path) ? "active" : ""
              }`}
              // className="sidebar__list__item"
            >
              <i className={item.icon}></i>
              {item.display}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
