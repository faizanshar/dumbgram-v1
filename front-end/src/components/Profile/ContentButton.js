import React from "react";
import ProfileCss from "./Profile.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

// img or icons
import Home from "../../public/icons/home.png";
import Compas from "../../public/icons/compas.png";
import Exit from "../../public/icons/exit.png";

export default function ContentButton(props) {
  const navigate = useNavigate();
  const {logOut} = props

  const goToExplore = () => {
    navigate("/home/explore")
  }

  const goToHome = () => {
    navigate("/home")
  }

  return (
    <Col className={ProfileCss.ContentButton}>
      <Col className={ProfileCss.ContentBtn}>
        <Button onClick={goToHome}>
          <img src={Home} />
          Home
        </Button>
        <Button onClick={goToExplore}>
          <img src={Compas} />
          Explore
        </Button>
      </Col>
      <Button onClick={logOut}>
        <img src={Exit} />
        Logout
      </Button>
    </Col>
  );
}
