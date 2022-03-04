import { Container, Row, Col } from "react-bootstrap";
import ProfileCss from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

// img/icons
import Edit from "../../public/icons/edit.png";

export default function ContentPhoto(props) {
  const { user } = props;
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/home/edit-profile", { state: user });
  };

  return (
    <Row className={ProfileCss.ContentImg}>
      <Col className={ProfileCss.Photo}>
        <div className={ProfileCss.CirclePhoto}>
          <img src={user.image} className={ProfileCss.ProfileImg} />
        </div>
        <img src={Edit} className={ProfileCss.Icon} onClick={goToEditProfile} />
      </Col>
    </Row>
  );
}
