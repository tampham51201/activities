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
          message: `Thành Công`,
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
            Tạo Hoạt Động
            <ContainerDescription>
              Thêm thông tin và hoạt động mới.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/activity">
              <Button type="primary" style={{ fontWeight: 600 }} size="large">
                Quay Lại
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
              label="Tiêu Đề Hoạt Động"
              name="title"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Nhập Trường Này!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hình Ảnh"
              name="img"
              hasFeedback
              valuePropName="filelist"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Nhập Trường Này!",
                },
              ]}
            >
              <Upload listType="picture">
                <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Mô Tả" name="description" hasFeedback>
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Đơn Vị Tổ Chức"
              name="category_id"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Chọn Trường Này!",
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
              label="Điểm Tích Lũy"
              name="point"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Nhập Trường Này!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số Lượng (Nhập 0 nếu không giới hạn số lượng)"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Nhập Trường Này!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thời Gian Bắt Đầu Hoạt Động"
              name="time_start"
              style={{
                display: "inline-block",
                width: "30rem",
                marginRight: "5rem",
              }}
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Chọn Trường Này!",
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
              label="Thời Gian Kết Thúc Hoạt Động"
              style={{ display: "inline-block", width: "auto" }}
              name="time_end"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng Chọn Trường Này!",
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
                label="Thời Gian Mở Đăng Kí"
                name="time_register_start"
                style={{
                  display: "inline-block",
                  width: "30rem",
                  marginRight: "5rem",
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Chọn Trường Này!",
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
                label="Thời Gian Đóng Đăng Kí"
                style={{ display: "inline-block", width: "max-content" }}
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Chọn Trường Này!",
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

            <Form.Item label="Trạng Thái" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "10rem" }}
              >
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddActivites;
