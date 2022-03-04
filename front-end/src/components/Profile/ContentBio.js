import React from "react";
import ProfileCss from "./Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";

export default function ContentBio(props) {
  const { user } = props;
  return <Col className={ProfileCss.ContentBio}>{user.bio}</Col>;
}
