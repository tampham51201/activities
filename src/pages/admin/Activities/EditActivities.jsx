import React, { useState, useEffect } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";
import dateFormat from "dateformat";
import {
  Form,
  Input,
  Button,
  Switch,
  notification,
  Select,
  Upload,
  DatePicker,
  Spin,
} from "antd";

import { UploadOutlined, FieldTimeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import activityApi from "../../../api/activityApi";
import categoryApi from "../../../api/categoryApi";

const EditActivites = (props) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const [categorys, setSategorys] = useState([]);
  const [activity, setActivity] = useState({});

  useEffect(() => {
    categoryApi.getSatus().then((res) => {
      const newCategorys = res.data.categorys;
      setSategorys(newCategorys);
    });
  }, []);

  useEffect(() => {
    const idActivity = props.match.params.id;

    activityApi.getId(idActivity).then((res) => {
      if (res.data.status === 200) {
        const newActiviy = res.data.activity;
        setActivity(newActiviy);
        console.log(newActiviy);

        form.setFieldsValue({
          title: newActiviy.title,
          description: newActiviy.description,
          quantity: newActiviy.quantity,
          point: newActiviy.point,
          category_id: newActiviy.category_id,

          time_start: newActiviy.time_start,
          time_end: newActiviy.time_end,

          status: newActiviy.status === 1 ? true : false,
        });

        setLoading(false);
      }
    });
  }, [loading]);

  const onFinish = (fieldsValue) => {
    const data = {
      ...fieldsValue,
      time_start:
        fieldsValue["time_start"] !== undefined
          ? fieldsValue["time_start"].format("YYYY-MM-DD HH:mm:ss")
          : activity.time_start_activity,
      time_end:
        fieldsValue["time_end"] !== undefined
          ? fieldsValue["time_end"].format("YYYY-MM-DD HH:mm:ss")
          : activity.time_end_activity,

      time_register_start:
        fieldsValue["time_register_start"] !== undefined
          ? fieldsValue["time_register_start"].format("YYYY-MM-DD HH:mm:ss")
          : activity.time_start_register,

      time_register_end:
        fieldsValue["time_register_end"] !== undefined
          ? fieldsValue["time_register_end"].format("YYYY-MM-DD HH:mm:ss")
          : activity.time_end_register,
      img:
        fieldsValue["img"] !== undefined
          ? fieldsValue["img"].fileList[0].originFileObj
          : activity.img,
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
    formData.append("point", data.point);
    formData.append("category_id", data.category_id);

    formData.append("time_start", data.time_start);
    formData.append("time_end", data.time_end);

    formData.append("time_register_start", data.time_register_start);
    formData.append("time_register_end", data.time_register_end);
    formData.append("img", data.img);

    formData.append("status", data.status);

    const idActivity = props.match.params.id;
    activityApi.Update(idActivity, formData).then((res) => {
      if (res.data.status === 200) {
        notification.success({
          message: `Th??nh C??ng`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        // form.resetFields();
        setLoading(true);
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
          <ContainerTitle>
            Ch???nh S???a Ho???t ?????ng
            <ContainerDescription>
              Ch???nh s???a th??ng tin v?? ho???t ?????ng.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/activity">
              <Button type="primary" style={{ fontWeight: 600 }} size="large">
                Quay L???i
              </Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Form
            name="category_add"
            className="category_add"
            size="large"
            form={form}
            layout="vertical"
            style={{ width: "100%", marginTop: "3rem" }}
            color="primary"
            initialValues={{ status: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Ti??u ????? Ho???t ?????ng"
              name="title"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Nh???p Tr?????ng N??y!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="H??nh ???nh" name="img" valuePropName="filelist">
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Ch???n ???nh</Button>
              </Upload>
            </Form.Item>
            <span>
              <img
                style={{
                  border: ".3rem solid #a37cfd",
                  height: "12rem",
                  marginTop: "-1rem",
                  marginBottom: "1rem",
                }}
                src={`http://localhost:8000/${activity.img}`}
                alt=""
              />
            </span>

            <Form.Item label="M?? T???" name="description" hasFeedback>
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="????n V??? T??? Ch???c"
              name="category_id"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Ch???n Tr?????ng N??y!",
                },
              ]}
              hasFeedback
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {categorys.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="??i???m T??ch L??y"
              name="point"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Nh???p Tr?????ng N??y!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="S??? L?????ng (Nh???p 0 n???u kh??ng gi???i h???n s??? l?????ng)"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Nh???p Tr?????ng N??y!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Th???i Gian B???t ?????u Ho???t ?????ng"
              name="time_start"
              style={{
                display: "inline-block",
                width: "30rem",
                marginRight: "5rem",
              }}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
              />
              <span
                style={{
                  display: "block",
                  fontSize: "1.7rem",
                  height: "2.3rem",
                }}
              >
                <FieldTimeOutlined />
                {dateFormat(
                  new Date(activity.time_start_activity),
                  "dd/mm/yyyy h:MM  TT"
                )}
              </span>
            </Form.Item>
            <Form.Item
              label="Th???i Gian K???t Th??c Ho???t ?????ng"
              style={{ display: "inline-block", width: "auto" }}
              name="time_end"
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
              />
              <span
                style={{
                  display: "block",
                  fontSize: "1.7rem",
                  height: "2.3rem",
                }}
              >
                <FieldTimeOutlined />
                {dateFormat(
                  new Date(activity.time_end_activity),
                  "dd/mm/yyyy h:MM  TT"
                )}
              </span>
            </Form.Item>
            <Form.Item name="time">
              <Form.Item
                label="Th???i Gian M??? ????ng K??"
                name="time_register_start"
                style={{
                  display: "inline-block",
                  width: "30rem",
                  marginRight: "5rem",
                }}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                />
                <span
                  style={{
                    display: "block",
                    fontSize: "1.7rem",
                    height: "2.3rem",
                  }}
                >
                  <FieldTimeOutlined />
                  {dateFormat(
                    new Date(activity.time_start_register),
                    "dd/mm/yyyy h:MM TT"
                  )}
                </span>
              </Form.Item>
              <Form.Item
                name="time_register_end"
                label="Th???i Gian ????ng ????ng K??"
                style={{ display: "inline-block", width: "max-content" }}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                />
                <span
                  style={{
                    display: "block",
                    fontSize: "1.7rem",
                    height: "2.3rem",
                  }}
                >
                  <FieldTimeOutlined />{" "}
                  {dateFormat(
                    new Date(activity.time_end_register),
                    "dd/mm/yyyy h:MM TT"
                  )}
                </span>
              </Form.Item>
            </Form.Item>

            <Form.Item label="Tr???ng Th??i" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "10rem" }}
              >
                L??u
              </Button>
            </Form.Item>
          </Form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditActivites;
