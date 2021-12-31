import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./activity-item.scss";
import { Button, notification } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import { Link, useHistory } from "react-router-dom";
import registerActivityApi from "../../../api/registerActivityApi";

const ActivityItem = (props) => {
  const history = useHistory();
  const refRegister = useRef(null);

  const quantity_register = useRef(null);

  let activityBtn = "";
  const da = new Date();
  const time_start = new Date(props.time_start);
  const time_end = new Date(props.time_end);
  // console.log(props.data);
  // console.log(props.id.toString());
  // console.log(typeof props.user + "");

  var searchRegister = props.data.filter((register) => {
    return (
      register.id_activity.toString().includes(props.id.toString()) &&
      register.id_user.id.toString().includes(props.user.toString())
    );
  });

  const handleRegister = (id) => {
    if (props.user === 0) {
      history.push("/login");
    } else {
      registerActivityApi.addActivity(id).then((res) => {
        if (res.data.status === 200) {
          notification.success({
            message: `Thành Công`,
            description: res.data.message,
            duration: 2,
            placement: "topRight",
          });
          refRegister.current.classList.add("activity-item__btn-active");
          refRegister.current.innerText = "ĐÃ ĐĂNG KÝ";
          quantity_register.current.innerText = props.quantity_register + 1;

          // style={{ backgroundColor: "green", borderColor: "green" }}

          // type="primary"
          // size="large"
          // style={{ backgroundColor: "red", borderColor: "red" }}
          // className="activity-item__btn"
        }
      });
    }
  };
  console.log(searchRegister.length);
  if (searchRegister.length > 0) {
    activityBtn = (
      <Button
        type="primary"
        size="large"
        style={{ backgroundColor: "green", borderColor: "green" }}
        className="activity-item__btn"
      >
        Đã Đăng Kí
      </Button>
    );
  } else {
    if (props.quantity_register >= props.quantity && props.quantity !== 0) {
      activityBtn = (
        <Button className="activity-item__btn">Đã Đủ Số Lượng</Button>
      );
    } else {
      if (time_start.getTime() > da.getTime()) {
        activityBtn = (
          <Button
            ref={refRegister}
            type="primary"
            size="large"
            className="activity-item__btn"
            onClick={() => {
              handleRegister(props.id);
            }}
          >
            Đăng Ký
          </Button>
        );
      } else {
        if (da.getTime() > time_end.getTime()) {
          activityBtn = (
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "red", borderColor: "red" }}
              className="activity-item__btn"
            >
              Đã Kết Thúc
            </Button>
          );
        } else {
          activityBtn = (
            <Button
              type="primary"
              size="large"
              style={{ backGround: "red" }}
              className="activity-item__btn"
            >
              Đang Diễn Ra
            </Button>
          );
        }
      }
    }
  }

  return (
    <div className="activity-item">
      <div className="activity-item__img">
        <img src={props.img} alt="" />
      </div>
      <div className="activity-item__container">
        <h3 className="activity-item__title">{props.title}</h3>
        <div className="activity-item__content">
          <span>
            Số lượng tham gia:{" "}
            <b>{props.quantity === 0 ? "Không Giới Hạn" : props.quantity}</b>
          </span>
          <span>
            Số điểm tích lũy: <b>{props.point}</b>
          </span>
          <span>
            Số lượng đã đăng ký:{" "}
            <b ref={quantity_register}> {props.quantity_register}</b>
          </span>
          <span>
            Đơn Vị Tổ Chức: <b> {props.category}</b>
          </span>
        </div>

        <p className="activity-item__description">{props.description}</p>
        <div className="activity-item__time">
          Thời Gian:{" "}
          <span>{dateFormat(props.time_start, "dd/mm/yyyy h:MM TT")}</span>
          <SwapRightOutlined style={{ margin: "0 .5rem" }} />
          <span>{dateFormat(props.time_end, "dd/mm/yyyy h:MM TT")}</span>
        </div>
        {activityBtn}
      </div>
    </div>
  );
};

ActivityItem.propTypes = {
  img: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  time_start: PropTypes.string,
  time_end: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
  quantity: PropTypes.number,
  quantity_register: PropTypes.number,
  point: PropTypes.number,
  user: PropTypes.number,
  data: PropTypes.array,
};

export default ActivityItem;
