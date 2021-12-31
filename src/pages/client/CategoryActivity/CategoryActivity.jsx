import React, { useState, useEffect } from "react";
import "../Home/home.scss";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Row, Col, Spin, Input } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import activityApi from "../../../api/activityApi";
import ActivityItem from "../../../components/client/ActivityItem/ActivityItem";
import authApi from "../../../api/authApi";
import registerActivityApi from "../../../api/registerActivityApi";

import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const CategoryActivity = (props) => {
  const [registerList, setRegisterList] = useState([]);
  const [activity, setActivity] = useState([]);

  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  const idCategory = props.match.parmas.id;
  useEffect(() => {
    activityApi.getAll().then((res) => {
      const newActivity = res.data.activities;
      console.log(newActivity);
      //   newActivityCategory =newActivity.filter(item=>{
      //       return item.category
      //   })
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
      <Container>
        <ContainerHeader>
          <h3>Hoạt Động Đã Đăng Ký</h3>
          <ContainerHeaderRight>
            <Input.Search
              allowClear
              style={{
                width: "24rem",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Tìm kiếm theo tên"
            />
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
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
        </ContainerBody>
      </Container>
    </div>
  );
};

export default CategoryActivity;
