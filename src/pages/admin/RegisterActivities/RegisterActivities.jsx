import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import registerActivityApi from "../../../api/registerActivityApi";

import { Table, Tag, Space, Button, Input, notification, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import dateFormat from "dateformat";

import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const { Column } = Table;

const RegisterActivities = () => {
  const [registerList, setRegisterList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerActivityApi.getAll().then((res) => {
      const newRegisterList = res.data.register_list;
      console.log(newRegisterList);
      setRegisterList(newRegisterList);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const newsearchList = registerList.filter((register) => {
      return register.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, registerList]);

  const handleDelete = (id) => {
    registerActivityApi.Delete(id).then((res) => {
      if (res.data.status === 200) {
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
    <div>
      <Container>
        <ContainerHeader>
          <h3>Danh Sách Đăng Ký </h3>
          <ContainerHeaderRight>
            <Input.Search
              allowClear
              style={{
                width: "24rem",
                marginRight: "2rem",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="Tìm kiếm theo tên"
            />
            <Link to="/admin/category-add">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ fontWeight: 600 }}
              >
                Thêm
              </Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table
            dataSource={searchList}
            bordered={true}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          >
            <Column
              title="STT"
              key="STT"
              render={(item, record, index) => index + 1}
            />
            <Column
              title="Mã Hoạt Động"
              key="idActivity"
              render={(item) => `HD00${item.id}`}
            />
            <Column
              width="35rem"
              title="Tên Hoạt Động"
              key="title"
              render={(item) => item.title}
            />
            <Column
              title="Thời Gian Diễn Ra"
              key="time"
              render={(item) => {
                var time_start = new Date(item.time_start_activity);
                var time_end = new Date(item.time_end_activity);

                return `${dateFormat(
                  time_start,
                  "dd/mm/yyyy h:MM TT"
                )} - ${dateFormat(time_end, "dd/mm/yyyy h:MM TT")}`;
              }}
            />
            <Column
              title="Số Lượng Tối Đa"
              key="category.name"
              render={(item) =>
                item.quantity <= 0 ? (
                  <Tag color="green" key={item.status}>
                    KHÔNG GIỚI HẠN
                  </Tag>
                ) : (
                  item.quantity
                )
              }
            />
            <Column
              title="Số Lượng Đã Đăng Ký"
              dataIndex="quantity_register"
              key="quantity_register"
            />
            <Column
              title="Trạng Thái"
              key="roles"
              render={(item) =>
                item.status === 1 ? (
                  <Tag color="green" key={item.status}>
                    ACTIVE
                  </Tag>
                ) : (
                  <Tag color="red" key={item.status}>
                    INACTIVE
                  </Tag>
                )
              }
            />

            <Column
              title="Action"
              key="action"
              render={(item) => (
                <Space size="middle">
                  <Link to={`/admin/register-activity-detail/${item.id}`}>
                    <Button type="primary">
                      {/* <i className="bx bx-edit"></i> */}
                      XEM DANH SÁCH
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </Button>
                </Space>
              )}
            />
          </Table>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default RegisterActivities;
