import React, { useState, useEffect } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container/Container";

import { Form, Input, Button, Switch, notification, Spin } from "antd";

import { Link } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

const EditCategory = (props) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idCategory = props.match.params.id;

    categoryApi.getId(idCategory).then((res) => {
      if (res.data.status === 200) {
        const newCategory = res.data.category;
        console.log(newCategory);
        form.setFieldsValue({
          name: newCategory.name,
          description: newCategory.description,
          status: newCategory.status === 1 ? true : false,
        });
        setLoading(false);
      }
    });
  }, []);

  const onFinish = (value) => {
    const idCategory = props.match.params.id;
    categoryApi.Update(idCategory, value).then((res) => {
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
          <ContainerTitle>
            Chỉnh Sửa Đơn Vị Tổ Chức
            <ContainerDescription>
              Chỉnh Sửa thông tin và đơn vị tổ chức.
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
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditCategory;
