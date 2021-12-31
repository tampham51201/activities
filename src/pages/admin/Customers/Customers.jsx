import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import authApi from "../../../api/authApi";

import { Table, Tag, Space, Button, Input, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const { Column } = Table;

const Customers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getAll().then((res) => {
      const newUsers = res.data.users;
      setUsers(newUsers);
      setLoading(false);
    });
  }, []);

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
          <h3>Tài Khoản</h3>
          <ContainerHeaderRight>
            <Input.Search
              allowClear
              style={{
                width: "24rem",
                marginRight: "2rem",
              }}
              placeholder="Search by username"
            />
            <Link to="/admin/add-user">
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
            dataSource={users}
            bordered={true}
            rowKey="masv"
            pagination={{ pageSize: 5 }}
          >
            <Column
              title="STT"
              key="STT"
              render={(item, record, index) => index + 1}
            />
            {/* <Column title="ID" key="id" dataIndex="id" /> */}
            <Column title="Mã Sinh Viên" dataIndex="masv" key="masv" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Họ Và Tên" dataIndex="full_name" key="full_name" />
            <Column title="Điểm Tích Lũy" dataIndex="point" key="point" />
            <Column
              title="Quyền"
              key="roles"
              render={(item) =>
                item.role_as === 0 ? (
                  <Tag color="green" key={item.role_as}>
                    ADMIN
                  </Tag>
                ) : (
                  <Tag color="blue" key={item.role_as}>
                    CUSTOMER
                  </Tag>
                )
              }
            />
            <Column
              title="Trạng Thái"
              key="status"
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
                  <Button type="primary">
                    <i className="bx bx-edit"></i>
                  </Button>
                  <Button type="primary" danger>
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

export default Customers;
