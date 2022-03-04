import React from "react";
import ProfileCss from "./Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";

export default function ContentName(props) {
  const {user} = props;
  return (
    <Col className={ProfileCss.ContentName}>
      <Col className={ProfileCss.Name}>{user.fullName}</Col>
      <Col className={ProfileCss.Name2}>{user.email}</Col>
    </Col>
  );
}
