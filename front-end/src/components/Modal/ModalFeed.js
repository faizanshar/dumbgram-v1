import { Modal, Button, Form, Container, Col, Row } from "react-bootstrap";
import ModalCss from "./Modal.module.css";
import { useState, useEffect } from "react";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

// img/icons
import X from "../../public/icons/X.png";
import Heart from "../../public/icons/heart.png";
import Chat from "../../public/icons/chat.png";
import Paper from "../../public/icons/paper.png";

export default function ModalFeed(dataProps) {
  const navigate = useNavigate();
  const { show, handleCloseModalFeed, tempModalFeed } = dataProps;
  const [comments, setComments] = useState([]);
  const [formComment, setFormComment] = useState({
    idFeed: tempModalFeed.id,
    comment: "",
  });
  const patch = "http://localhost:5000/uploads/";

  const getComments = async () => {
    try {
      const response = await API.get(`/comments/${tempModalFeed.id}`);
      setComments(response.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormComment({
      ...formComment,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };
      // console.log(formComment );
      const body = JSON.stringify(formComment);
      const response = await API.post("/comment", body, config);
      console.log(response);
      getComments();
      setFormComment({
        idFeed: tempModalFeed.id,
        comment: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goToDetail = (id) => {
    navigate("/home/detail-user", { state: id });
  };

  useEffect(() => {
    getComments();
  }, [tempModalFeed.id, localStorage.token]);

  return (
    <Modal
      centered
      show={show}
      size="lg"
      onHide={handleCloseModalFeed}
      dialogClassName="modal-90w"
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <div className={ModalCss.Content}>
        <div className={ModalCss.ContentPhoto}>
          <img src={tempModalFeed.image} />
        </div>
        <div className={ModalCss.ContentComment}>
          <Group1
            tempModalFeed={tempModalFeed}
            handleCloseModalFeed={handleCloseModalFeed}
            patch={patch}
            goToDetail={goToDetail}
          />
          <Group2 comments={comments} patch={patch} />
          <MakeComment
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formComment={formComment}
          />
        </div>
      </div>
    </Modal>
  );
}

const Group1 = (props) => {
  const { tempModalFeed, handleCloseModalFeed, patch, goToDetail } = props;
  return (
    <Container className={ModalCss.Group1}>
      <div className={ModalCss.Close}>
        <img src={X} onClick={handleCloseModalFeed} />
      </div>
      <div className={ModalCss.Owner}>
        <div className={ModalCss.Profile}>
          {(() => {
            if (tempModalFeed.user.image) {
              return (
                <div
                  className={ModalCss.Circle}
                  onClick={() => goToDetail(tempModalFeed.user.id)}
                >
                  <img src={patch + tempModalFeed.user.image} />
                </div>
              );
            } else {
              return (
                <div
                  className={ModalCss.Circle}
                  onClick={() => goToDetail(tempModalFeed.user.id)}
                ></div>
              );
            }
          })()}

          {tempModalFeed.user.fullName}
        </div>
        <div className={ModalCss.Caption}>
          <p>{tempModalFeed.caption}</p>
        </div>
      </div>
    </Container>
  );
};

const Group2 = (props) => {
  const { comments, patch } = props;
  console.log(comments);
  return (
    <div>
      {comments.map((item, index) => {
        return (
          <Container className={ModalCss.Group2}>
            <div className={ModalCss.Owner}>
              <div className={ModalCss.Profile}>
                {(() => {
                  if (item.user.image) {
                    return (
                      <div className={ModalCss.Circle}>
                        <img src={patch + item.user.image} />
                      </div>
                    );
                  } else {
                    return <div className={ModalCss.Circle}></div>;
                  }
                })()}

                {item.user.fullName}
              </div>
              <div className={ModalCss.Comment}>
                <p>{item.comment}</p>
              </div>
            </div>
          </Container>
        );
      })}
    </div>
  );
};

const MakeComment = (props) => {
  const { handleChange, handleSubmit, formComment } = props;
  return (
    <Container className={ModalCss.ContentMakeComment}>
      <Col className={ModalCss.GroupBtn}>
        <img src={Heart} />
        <img src={Chat} />
        <img src={Paper} />
      </Col>
      <Col className={ModalCss.ContentLikes}>120.000 like</Col>
      <Col className={ModalCss.AddComment}>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            onChange={handleChange}
            name="comment"
            className={ModalCss.CommentInput}
            value={formComment.comment}
            type="text"
            placeholder="comment"
          />
        </Form>
      </Col>
    </Container>
  );
};
