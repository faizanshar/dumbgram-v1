import React from "react";
import HeaderCss from "./Header.module.css";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// img or icons
import Search from "../../public/icons/search.png";
import Bell from "../../public/icons/bell.png";
import Paper from "../../public/icons/paper.png";

export default function HeaderFeed() {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate("/home/post");
  };

  const goToChat = () => {
    navigate("/home/chat");
  };

  return (
    <Container className={HeaderCss.Container2}>
      <Col sm={5} className={HeaderCss.Col}>
        <img src={Search} />
        <input className={HeaderCss.Input} placeholder="Search" />
      </Col>
      <Col sm={2}></Col>
      <Col sm={5} className={HeaderCss.Col2}>
        <Dropdown>
          <Dropdown.Toggle
            className={HeaderCss.BtnBell}
            style={{ backgroundColor: "transparent", border: "none" }}
            bsPrefix="p-0"
            id="dropdown-basic"
          >
            <img src={Bell} />
          </Dropdown.Toggle>

          {/* <Dropdown.Menu className={HeaderCss.DropMenu}>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </Dropdown.Menu> */}
        </Dropdown>
        <a style={{ cursor: "pointer" }} onClick={goToChat}>
          <img src={Paper} />
        </a>
        <button className={HeaderCss.BtnPost} onClick={goToPost}>
          <div>+</div>
          Create Post
        </button>
      </Col>
    </Container>
  );
}
