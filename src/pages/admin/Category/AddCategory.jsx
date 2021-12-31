import React, { useState } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

import { Form, Input, Button, Switch, notification } from "antd";

import { Link } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

const AddCategory = () => {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
    categoryApi.addCategory(value).then((res) => {
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
  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            Tạo Đơn Vị Tổ Chức Mới
            <ContainerDescription>
              Thêm thông tin và đơn vị tổ chức mới.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/category">
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
              label="Tên Đơn Vị"
              name="name"
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

            <Form.Item label="Mô Tả" name="description" hasFeedback>
              <Input.TextArea />
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

export default AddCategory;
