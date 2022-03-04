import React from "react";
import ProfileCss from "./Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { API } from "../../config/api";

export default function ContentFollow(props) {
  const { user, followers  } = props;
  const [following, setFollowing] = useState();
  const [feeds, setFeeds] = useState([])

  const Following = async () => {
    try {
      const response = await API.get(`/following/${user.id}`);
      // console.log(response.data.count);
      setFollowing(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  
  const countFeed = async () => {
    try {
      const response = await API.get(`/feed-user/${user.id}`);
      console.log(response);
      setFeeds(response.data.data.feed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Following();
    countFeed();
  }, [user.id]);

  return (
    <Row className={ProfileCss.ContentFollow}>
      <Col sm={3} className={ProfileCss.Follow}>
        <div className={ProfileCss.title}>Post</div>
        <div className={ProfileCss.field}>{feeds.length}</div>
      </Col>
      <Col sm={6} className={ProfileCss.Followers}>
        <div className={ProfileCss.title}>Followers</div>
        <div className={ProfileCss.field}>{followers}</div>
      </Col>
      <Col sm={3} className={ProfileCss.Follow}>
        <div className={ProfileCss.title}>Following</div>
        <div className={ProfileCss.field}>{following}</div>
      </Col>
    </Row>
  );
}
