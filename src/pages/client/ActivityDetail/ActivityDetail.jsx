import React, { useState, useEffect } from "react";

import {
  Table,
  Tag,
  Button,
  Input,
  notification,
  Spin,
  Breadcrumb,
} from "antd";
import {
  CheckCircleTwoTone,
  HomeOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";
import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";
import registerActivityApi from "../../../api/registerActivityApi";
import authApi from "../../../api/authApi";

const { Column } = Table;

const ActivityDetail = () => {
  const [categorys, setCategorys] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(true);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerActivityApi.getActivityUser().then((res) => {
      const newCategorys = res.data.registerActivity;
      console.log(newCategorys);
      setCategorys(newCategorys);
      setLoading(false);
      setIsDelete(false);
    });
  }, [isDelete]);

  useEffect(() => {
    if (localStorage.getItem("auth_token") != null) {
      authApi.getUser().then((res) => {
        const newUser = res.data.user;
        console.log(newUser);
        setUser(newUser);
      });
    }
  }, []);

  useEffect(() => {
    const newsearchList = categorys.filter((category) => {
      return category.activity.title
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, categorys]);

  const handleDelete = (id_user, id_activity) => {
    const data = {
      id_user: id_user,
      id_activity: id_activity,
    };
    console.log(data);
    registerActivityApi.Delete(data).then((res) => {
      if (res.data.status === 200) {
        setIsDelete(true);
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
      }
    });
  };
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
    <div className="container">
      <Breadcrumb separator="">
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Trang Chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/">
            <AntDesignOutlined /> Thông Tin Hoạt Động
          </Link>
        </Breadcrumb.Item>
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
          <Table
            dataSource={searchList}
            bordered={true}
            rowKey="created_atx"
            pagination={{ pageSize: 5 }}
          >
            <Column
              title="STT"
              key="STT"
              render={(item, record, index) => index + 1}
            />
            <Column
              title="Mã Hoạt Động"
              key="idActivity"
              render={(item) => `HD00${item.id_activity}`}
            />
            <Column
              width="35rem"
              title="Tên Hoạt Động"
              render={(item) => item.activity.title}
              key="title"
            />
            <Column
              title="Điểm Tích Lũy"
              key="point"
              render={(item) => item.activity.point}
            />
            <Column
              title="Người Duyệt"
              key="approver_full_name"
              render={(item) =>
                item.approver !== null ? item.approver.full_name : ""
              }
            />

            <Column
              title="Thời Gian Ghi"
              key="point"
              render={(item) =>
                dateFormat(item.created_at, "dd/mm/yyyy h:MM TT")
              }
            />

            <Column
              title="Trạng Thái"
              key="roles"
              render={(item) =>
                item.status === 1 ? (
                  <Tag color="green" key={item.status}>
                    ĐÃ DUYỆT
                  </Tag>
                ) : (
                  <Tag color="red" key={item.status}>
                    CHƯA DUYỆT
                  </Tag>
                )
              }
            />
            <Column
              title="Action"
              key="action"
              render={(item) =>
                item.status === 1 ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <Button
                    type="primary"
                    danger
                    onClick={() =>
                      handleDelete(item.id_user.id, item.id_activity)
                    }
                  >
                    HỦY ĐĂNG KÝ
                  </Button>
                )
              }
            />
          </Table>
          <h2>Tổng điểm đạt được: {user !== null ? user.point : 0}</h2>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default ActivityDetail;
