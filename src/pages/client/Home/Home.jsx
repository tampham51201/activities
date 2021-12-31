import React, { useState, useEffect } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Row, Col, Spin } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import activityApi from "../../../api/activityApi";
import ActivityItem from "../../../components/client/ActivityItem/ActivityItem";
import authApi from "../../../api/authApi";
import registerActivityApi from "../../../api/registerActivityApi";

const Home = () => {
  const [registerList, setRegisterList] = useState([]);
  const [activity, setActivity] = useState([]);

  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activityApi.getAll().then((res) => {
      const newActivity = res.data.activities;
      setActivity(newActivity);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("auth_token") != null) {
      authApi.getUser().then((res) => {
        const newUser = res.data.user;

        setUser(newUser);
      });
    }
  }, []);

  useEffect(() => {
    registerActivityApi.getAllActivity().then((res) => {
      const newRegisterList = res.data.registerActivity;

      setRegisterList(newRegisterList);

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const newsearchList = activity.filter((register) => {
      return register.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, activity]);
  if (loading) {
    return (
      <Spin
        style={{
          width: "100%",
          marginTop: "10rem",
          marginBottom: "10rem",
        }}
        tip="Loading..."
      ></Spin>
    );
  }
  return (
    <div className="home container">
      <Breadcrumb separator="">
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Trang Chủ
          </Link>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Trang Chủ
          </Link>
        </Breadcrumb.Item> */}
      </Breadcrumb>

      <div className="home__content">
        <h2>Hoạt Động Mới Nhất</h2>
        <Row gutter={[20, 20]}>
          {searchList.map((item, index) => (
            <Col key={index} span={24} md={12} xl={8}>
              <ActivityItem
                id={item.id}
                img={`http://localhost:8000/${item.img}`}
                title={item.title}
                time_start={item.time_start_activity}
                time_end={item.time_end_activity}
                description={item.description}
                quantity={item.quantity}
                quantity_register={item.quantity_register}
                point={item.point}
                category={item.category.name}
                user={user.id || 0}
                data={registerList}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
