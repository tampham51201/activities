import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer container">
      <Row gutter="2rem">
        <Col span={24} md={12} className="footer__item">
          <span>
            <b> Hệ Thống Quản Lý Hoạt Động Ngoại Khóa</b>
          </span>
          <span>
            <b> Trường Đại Sư Phạm Kỹ Thuật - ĐHĐN</b>
          </span>
          <span>
            Địa chỉ: <b> số 48 Cao Thắng, TP. Đà Nẵng</b>
          </span>

          <span>
            Số Điện Thoại : <b> (0236) 3530590</b>
          </span>
          <span>
            Email : <b> utemediaonline@ute.udn.vn</b>
          </span>
        </Col>
        <Col span={24} md={12} className="footer__item">
          <span>
            Bản Quyền Thuộc
            <Link to="/">
              <b> Tâm AHIHI</b>
            </Link>
          </span>

          <span>
            Số Điện Thoại : <b> 0339045945</b>
          </span>
          <span>
            Email : <b> 1911505310251@sv.ute.udn.vn</b>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
