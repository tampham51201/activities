import React from "react";
import authApi from "../../../api/authApi";
import axiosClient from "../../../api/axiosClient";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { notification } from "antd";

import logo from "../../../assets/image/logo-truong-250.png";

import "./login.scss";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    axiosClient.get(`/sanctum/csrf-cookie`).then((response) => {
      authApi.postLogin(values).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          notification.success({
            message: `Success`,
            description: res.data.message,
            duration: 2,
            placement: "topRight",
          });

          history.push("/");
        } else {
          if (res.data.status === 401) {
          }
        }
      });
    });
  };
  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="login__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <h1>Đăng Nhập</h1>
        <p>Vui lòng đăng nhập để bắt đầu!</p>
        <Form.Item
          name="masv"
          rules={[
            {
              required: true,
              message: "Vui Lòng Nhập Mã Sinh Viên Của Bạn!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mã Sinh Viên"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui Lòng Nhập Mật Khẩu Của Bạn!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size="large"
            placeholder="Mật Khẩu"
          />
        </Form.Item>
        <Form.Item className="">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ Mật Khẩu</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Quên Mật Khẩu
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
          >
            ĐĂNG NHẬP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
