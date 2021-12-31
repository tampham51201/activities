import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import activityApi from "../../../api/activityApi";

import { Table, Tag, Space, Button, Input, notification, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const { Column } = Table;

const Activities = () => {
  const [categorys, setCategorys] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activityApi.getAll().then((res) => {
      const newCategorys = res.data.activities;

      setCategorys(newCategorys);
      setLoading(false);
      setIsDelete(false);
    });
  }, [isDelete]);

  useEffect(() => {
    const newsearchList = categorys.filter((category) => {
      return category.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, categorys]);

  const handleDelete = (id) => {
    activityApi.Delete(id).then((res) => {
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
    <div>
      <Container>
        <ContainerHeader>
          <h3>Hoạt Động</h3>
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
            <Link to="/admin/activity-add">
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
            rowKey="id"
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
              render={(item) => `HD00${item.id}`}
            />
            <Column
              width="35rem"
              title="Tên Hoạt Động"
              dataIndex="title"
              key="name"
            />
            <Column
              title="Ảnh"
              key="img"
              render={(item) => (
                <img
                  key={item.img}
                  style={{ height: "5rem" }}
                  src={`http://localhost:8000/${item.img}`}
                ></img>
              )}
            />

            <Column
              title="Đơn Vị Tổ Chức"
              key="category.name"
              render={(item) => item.category.name}
            />
            <Column
              title="Số Lượng"
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
              title="Thời Gian Hoạt Động"
              key="time_start"
              render={(item) => {
                var time_start = new Date(item.time_start_activity);
                var time_end = new Date(item.time_end_activity);

                return `${dateFormat(
                  time_start,
                  "dd/mm/yyyy h:MM TT"
                )} - ${dateFormat(time_end, "dd/mm/yyyy h:MM TT")}`;
              }}
            />

            <Column title="Điểm Tích Lũy" dataIndex="point" key="name" />
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
                  <Link to={`/admin/activity-edit/${item.id}`}>
                    <Button type="primary">
                      <i className="bx bx-edit"></i>
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

export default Activities;
