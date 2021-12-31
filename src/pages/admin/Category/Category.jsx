import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

import { Table, Tag, Space, Button, Input, notification, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const { Column } = Table;

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryApi.getAll().then((res) => {
      const newCategorys = res.data.users;
      setCategorys(newCategorys);
      setLoading(false);
      setIsDelete(false);
    });
  }, [isDelete]);

  useEffect(() => {
    const newsearchList = categorys.filter((category) => {
      return category.name.toLowerCase().includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, categorys]);

  const handleDelete = (id) => {
    categoryApi.Delete(id).then((res) => {
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
          <h3>Đơn Vị Tổ Chức</h3>
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
            {/* <Column title="ID" key="id" dataIndex="id" /> */}
            <Column title="Tên Đơn Vị" dataIndex="name" key="name" />
            <Column title="Mô Tả" dataIndex="description" key="description" />
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
                  <Link to={`/admin/category-edit/${item.id}`}>
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

export default Category;
