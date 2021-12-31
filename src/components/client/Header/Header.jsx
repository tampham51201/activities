import React, { useEffect, useState } from "react";
import logo from "../../../assets/image/banner.jpg";
import { Link, useHistory } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

import { notification } from "antd";
import { DownCircleFilled } from "@ant-design/icons";
import axiosClient from "../../../api/axiosClient";

import "./header.scss";
import authApi from "../../../api/authApi";

const Header = () => {
  let authBtn = "";
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("auth_token") != null) {
      authApi.getUser().then((res) => {
        const newUser = res.data.user;

        setUser(newUser);
      });
    }
  }, []);

  const handleLogout = () => {
    axiosClient.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        history.push("login");
        notification.success({
          message: `Success`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
      }
    });
  };

  if (localStorage.getItem("auth_token") !== null) {
    authBtn = (
      <li className="header__navbar__item">
        {user.full_name} <DownCircleFilled />
        <ul className="header__navbar__item__list">
          <li className="header__navbar__item__list__item">
            <Link to="/profile">Thông Tin Cá Nhân</Link>
          </li>
          <li className="header__navbar__item__list__item">
            <Link to="/activityDetail">Thông Tin Hoạt Động</Link>
          </li>
          {user.role_as === 0 ? (
            <li className="header__navbar__item__list__item">
              <Link to="/admin">Trang Quản Trị</Link>
            </li>
          ) : (
            ""
          )}
          <li className="header__navbar__item__list__item">
            <Link to="/profile">Thay Đổi Mật Khẩu</Link>
          </li>

          <li
            className="header__navbar__item__list__item"
            onClick={handleLogout}
          >
            <Link to="/profile">Đăng Suất</Link>
          </li>
        </ul>
      </li>
    );
  } else {
    authBtn = (
      <li className="header__navbar__item">
        <Link to="/login">Đăng Nhập</Link>
      </li>
    );
  }

  useEffect(() => {
    categoryApi.getSatus().then((res) => {
      const newCategorys = res.data.categorys;
      setCategorys(newCategorys);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="header ">
      <div className="container">
        <div className="header__banner">
          <img src={logo} alt="" />
        </div>

        <ul className="header__navbar">
          <li className="header__navbar__item">
            <Link to="/">Trang Chủ</Link>
          </li>
          <li className="header__navbar__item">
            Hoạt Động Ngoại Khóa <DownCircleFilled />
            <ul className="header__navbar__item__list">
              {categorys.map((item, index) => (
                <li className="header__navbar__item__list__item" key={index}>
                  <Link to={`/categoryActivity/${item.id}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="header__navbar__item">
            <Link to="/">Hướng Dẫn Sử Dụng Hệ Thống</Link>
          </li>
          <li className="header__navbar__item">
            <Link to="/contact">Liên Hệ Quản Trị</Link>
          </li>
          {authBtn}
        </ul>
      </div>
    </div>
  );
};

export default Header;
