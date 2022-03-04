import React from "react";
import PostCss from "./Post.module.css"
import { Container, Col, Row } from "react-bootstrap";

// components
import HeaderFeed from "../Header/HeaderFeed";
import FormPost from "./FormPost";

export default function PostComponent() {
  return (
    <div className={PostCss.Container}>
      <HeaderFeed/>
      <Container className="mt-2">
        <h4 style={{ color: "white" }}>Post</h4>
      </Container>
      <FormPost/>
    </div>
  );
}
