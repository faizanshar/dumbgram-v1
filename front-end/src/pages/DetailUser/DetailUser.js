import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../Context/userContext";
import { API, setAuthToken } from "../../config/api";
import { useNavigate, useLocation } from "react-router-dom";
import DetailCss from "./Detail.module.css";

// components
import DetailProfile from "../../components/Profile/DetailProfile";
import FeedDetail from "../../components/Feed/FeedDetail";

export default function DetailUser() {
  const { state } = useLocation();
  const [feeds, setFeeds] = useState([]);
  const [user, setUser] = useState({});

  const getFeeds = async () => {
    try {
      const response = await API.get(`/feed-user/${state}`);
      setFeeds(response.data.data.feed);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await API.get(`detail-user/${state}`);
      console.log(response);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('ini detaiil');
  // console.log(state);

  useEffect(() => {
    getUser();
    getFeeds();
  }, [state]);

  return (
    <div className={DetailCss.Container}>
      <DetailProfile user={user} />
      <FeedDetail feeds={feeds} user={user} />
    </div>
  );
}
