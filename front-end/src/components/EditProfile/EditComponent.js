import React from "react";
import EditCss from "./Edit.module.css";
import { Container, Col, Row } from "react-bootstrap";

// components
import HeaderFeed from "../Header/HeaderFeed";
import FormEdit from "./FormEdit";

export default function EditComponent(props) {
  const {state} = props;


  return (
    <div className={EditCss.Container}>
      <HeaderFeed />
      <Container className="mt-2">
        <h4 style={{ color: "white" }}>Edit Profile</h4>
      </Container>
      <FormEdit state={state} />
    </div>
  );
}
