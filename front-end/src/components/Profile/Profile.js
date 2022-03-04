import { useState, useEffect } from "react";
import ProfileCss from "./Profile.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../config/api";


// components
import HeaderLogo from "../Header/HeaderLogo";
import ContentPhoto from "./ContentPhoto";
import ContentName from "./ContentName";
import ContentFollow from "./ContentFollow";
import ContentBio from "./ContentBio";
import ContentButton from "./ContentButton";

export default function Profile(props) {
  const { user, logOut } = props;
  const [followers, setFollowers] = useState();

  const Followers = async () => {
    try {
      const response = await API.get(`/followers/${user.id}`);
      // console.log(response);
      setFollowers(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Followers();
  }, [user.id]);

  return (
    <Container className={ProfileCss.Container} fluid="md">
      <HeaderLogo />
      <ContentPhoto user={user} />
      <ContentName user={user} />
      <ContentFollow followers={followers} user={user} />
      <ContentBio user={user} />
      <ContentButton logOut={logOut} />
    </Container>
  );
}
