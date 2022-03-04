import React from "react";
import ProfileCss from "./Profile.module.css";
import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API } from "../../config/api";

export default function ContentBtnFollow(props) {
  const { user, Followers } = props;
  const [follow, setFollow] = useState([]);

  const CheckFollow = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get(`/check-follow/${user.id}`, config);
      console.log(response.data.checkfollow);
      setFollow(response.data.checkfollow);
    } catch (error) {
      console.log(error);
    }
  };

  const addFollow = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.post(`/follow/${user.id}`, config);
      // console.log(response);
      CheckFollow();
      Followers();
    } catch (error) {
      console.log(error);
    }
  };

  const unFollow = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.delete(`/unfollow/${user.id}`, config);
      console.log(response);
      CheckFollow();
      Followers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CheckFollow();
  }, [user.id]);

  return (
    <Row className={ProfileCss.BtnGroup}>
      <Button className={ProfileCss.Btn}>Message</Button>
      {follow.length > 0 ? (
        <Button onClick={unFollow} className={ProfileCss.Btn2}>
          Unfollow
        </Button>
      ) : (
        <Button onClick={addFollow} className={ProfileCss.Btn}>
          Follow
        </Button>
      )}
    </Row>
  );
}
