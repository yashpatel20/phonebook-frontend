import React from "react";
import "./Notification.css";

const Notification = props => {
  let style = "";
  if (props.message == null) return null;
  if (props.message[0]) style = "successful";
  else style = "unsuccessful";
  return <div className={style}>{props.message[1]}</div>;
};

export default Notification;
