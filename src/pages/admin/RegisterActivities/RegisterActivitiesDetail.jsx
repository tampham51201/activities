import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import registerActivityApi from "../../../api/registerActivityApi";

import { Table, Tag, Space, Button, Input, notification, Spin } from "antd";
import dateFormat from "dateformat";

import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

const { Column } = Table;

const RegisterActivitiesDetail = (props) => {
  const [registerList, setRegisterList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = props.match.params.id;
    registerActivityApi.getId(id).then((res) => {
      const newRegisterList = res.data.register_list;
      console.log(newRegisterList);
      setRegisterList(newRegisterList);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    const newsearchList = registerList.filter((register) => {
      return register.id_user.full_name
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [search, registerList]);

  const handleCheck = (id_activity, id_user, status) => {
    const data = {
      id_activity: id_activity,
      id_user: id_user,
      status: status,
    };
    console.log(data);
    registerActivityApi.updateStatus(data);
    setLoading(true);
  };

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
          <h3>Danh Sách Sinh Viên Đăng Ký Hoạt Động</h3>
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
            <Link to="/admin/register-activity">
              <Button
                type="primary"
                // icon={<PlusOutlined />}
                style={{ fontWeight: 600 }}
              >
                Quay Lại
              </Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table
            dataSource={searchList}
            bordered={true}
            pagination={{ pageSize: 5 }}
            rowKey="created_at"
          >
            <Column
              title="STT"
              key="STT"
              render={(item, record, index) => index + 1}
            />
            <Column
              title="Mã Sinh Viên"
              key="masv"
              render={(item) => item.id_user.masv}
            />
            <Column
              title="Họ Tên"
              key="full_name"
              render={(item) => item.id_user.full_name}
            />
            <Column
              title="Lớp"
              key="class"
              render={(item) => item.id_user.class}
            />
            <Column
              title="Thời Gian Đăng Ký"
              key="time"
              //   render={(item) =>
              //     `${item.created_at.slice(0, 10)}  ${item.created_at.slice(
              //       11,
              //       16
              //     )}`
              //   }
              render={(item) => {
                var d = new Date(item.created_at);
                return dateFormat(d, "dd/mm/yyyy h:MM TT");
              }}
            />

            <Column
              title="Trạng Thái"
              key="status"
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
              title="Người Duyệt"
              key="roles"
              render={(item) =>
                item.approver === null ? "" : item.approver.full_name
              }
            />

            <Column
              title="Action"
              key="action"
              render={(item) => (
                <Space size="middle">
                  {item.status === 0 ? (
                    <Button
                      type="primary"
                      style={{ backGround: "blue" }}
                      onClick={() =>
                        handleCheck(
                          item.id_activity,
                          item.id_user.id,
                          item.status
                        )
                      }
                    >
                      DUYỆT
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      onClick={() =>
                        handleCheck(
                          item.id_activity,
                          item.id_user.id,
                          item.status
                        )
                      }
                    >
                      HỦY DUYỆT
                    </Button>
                  )}

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

export default RegisterActivitiesDetail;
