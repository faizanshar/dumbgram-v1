import FeedCss from "./feed.module.css";
import Masonry from "react-masonry-css";
import { Container, Col, Row } from "react-bootstrap";
import { API } from "../../config/api";
import { userContext } from "../../Context/userContext";
import { useContext, useState, useEffect } from "react";

// components
import HeaderFeed from "../Header/HeaderFeed";
import CartContent from "./CartContent";

// dumi
import data from "../../datadumi/data";

export default function ExploreComp(props) {
  const { feeds, handleModalFeed } = props;
  const breakpoints = {
    default: 3,
    1100: 1,
    700: 2,
    500: 1,
  };

  return (
    <div className={FeedCss.Container}>
      <HeaderFeed />
      <Container className="mt-2">
        <h4 style={{ color: "white" }}>Explore</h4>
      </Container>
      <Container className={FeedCss.Container2}>
        <Row>
          <Masonry
            breakpointCols={breakpoints}
            className={FeedCss.masonryGrid}
            columnClassName={FeedCss.masonryGridColumn}
          >
            {feeds?.map((item, index) => {
              return (
                <CartContent handleModalFeed={handleModalFeed} data={item} />
              );
            })}
          </Masonry>
        </Row>
      </Container>
    </div>
  );
}
