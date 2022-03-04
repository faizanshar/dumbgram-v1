import React from "react";
import ListCss from "./List.module.css";
import { Container, Row, Col } from "react-bootstrap";

// components
import HeaderLogo from "../Header/HeaderLogo";

export default function ListChat(props) {
  const { contact, selectChat } = props;
  console.log("ini contak");
  console.log(contact);
  return (
    <div className={ListCss.Container}>
      <HeaderLogo />
      <div className={ListCss.Space}></div>
      {contact.map((item) => {
        return <CartContact selectChat={selectChat} item={item} />;
      })}
    </div>
  );
}

const CartContact = (props) => {
  const { item, selectChat } = props;
  return (
    <Container>
      <div className={ListCss.CartContact} onClick={() => selectChat(item.id)}>
        <div className={ListCss.Circle}>
          <img className={ListCss.ImgUser} src={item.image} />
        </div>
        {item.fullName}
      </div>
    </Container>
  );
};
