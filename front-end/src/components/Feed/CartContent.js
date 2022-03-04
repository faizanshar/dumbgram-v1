import { useState,useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import FeedCss from "./feed.module.css";

// img or icons
import Heart from "../../public/icons/heart.png";
import Chat from "../../public/icons/chat.png";
import Paper from "../../public/icons/paper.png";

export default function CartContent(props) {
  const { data, handleModalFeed, addLike } = props;
  const [checkLike, setCheckLike] = useState()
  const patch = "http://localhost:5000/uploads/";

  const Check = () => {
    console.log('ini data function');
    console.log(data);
    data.likes.map((item) => {
      if(item.userId == data.user.id && item.feedId == data.id){
        return(
          <h6>AN</h6>
        )
      }else {
        <h6>b</h6>
      }
    })
  }

  useEffect(() => {
   Check()
  }, [data]);



  return (
    <Col>
      <Card
        style={{
          width: "17rem",
          backgroundColor: "transparent",
          marginTop: "10px",
        }}
      >
        <Card.Img
          onClick={() => handleModalFeed(data)}
          variant="top"
          style={{ cursor: "pointer" }}
          src={data.image}
        />
        <div className={FeedCss.DetailFeed}>
          <div className={FeedCss.ProfileFeed}>
            {(() => {
              if (data.user.image) {
                return (
                  <div>
                    <img src={patch + data.user.image} />
                  </div>
                );
              } else {
                return <div></div>;
              }
            })()}

            {data.user.fullName}
          </div>
          <div className={FeedCss.EksFeed}>
            <div className={FeedCss.EksBtn}>
              {/* {Check()}
              {
                data.likes.map((item) => {
                  if(item.userId == data.user.id && item.feedId == data.id){
                    return <h6>S</h6>
                  }else{
                    return <h6>B</h6>
                  }
                })
              } */}
              <img onClick={() => addLike(data.id)} src={Heart} />
              <img src={Chat} />
              <img src={Paper} />
            </div>
            {data.likes !== 0 ? (
              <div>{data.likes.length} Like</div>
            ) : (
              <div>0 Like</div>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
}
