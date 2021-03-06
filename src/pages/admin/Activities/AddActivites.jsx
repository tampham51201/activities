import React, { useState, useEffect } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

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

import { UploadOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import activityApi from "../../../api/activityApi";
import categoryApi from "../../../api/categoryApi";

const AddActivites = () => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const [categorys, setSategorys] = useState([]);

  useEffect(() => {
    categoryApi.getSatus().then((res) => {
      const newCategorys = res.data.categorys;
      setSategorys(newCategorys);
      setLoading(false);
    });
  }, []);

  const onFinish = (fieldsValue) => {
    const data = {
      ...fieldsValue,
      time_start: fieldsValue["time_start"].format("YYYY-MM-DD HH:mm:ss"),
      time_end: fieldsValue["time_end"].format("YYYY-MM-DD HH:mm:ss"),

      time_register_start: fieldsValue["time_register_start"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),

      time_register_end: fieldsValue["time_register_end"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      img: fieldsValue["img"].fileList[0].originFileObj,
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

    activityApi.addActivity(formData).then((res) => {
      if (res.data.status === 200) {
        notification.success({
          message: `Th??nh C??ng`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        form.resetFields();
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
            T???o Ho???t ?????ng
            <ContainerDescription>
              Th??m th??ng tin v?? ho???t ?????ng m???i.
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
            <Form.Item
              label="H??nh ???nh"
              name="img"
              hasFeedback
              valuePropName="filelist"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Nh???p Tr?????ng N??y!",
                },
              ]}
            >
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Ch???n ???nh</Button>
              </Upload>
            </Form.Item>

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
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Ch???n Tr?????ng N??y!",
                },
              ]}
              hasFeedback
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item
              label="Th???i Gian K???t Th??c Ho???t ?????ng"
              style={{ display: "inline-block", width: "auto" }}
              name="time_end"
              rules={[
                {
                  required: true,
                  message: "Vui L??ng Ch???n Tr?????ng N??y!",
                },
              ]}
              hasFeedback
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="DD-MM-YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                label="Th???i Gian M??? ????ng K??"
                name="time_register_start"
                style={{
                  display: "inline-block",
                  width: "30rem",
                  marginRight: "5rem",
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
                hasFeedback
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                />
              </Form.Item>
              <Form.Item
                name="time_register_end"
                label="Th???i Gian ????ng ????ng K??"
                style={{ display: "inline-block", width: "max-content" }}
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
                hasFeedback
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                />
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
                Th??m
              </Button>
            </Form.Item>
          </Form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddActivites;
