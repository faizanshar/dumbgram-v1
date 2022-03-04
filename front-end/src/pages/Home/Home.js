import HomeCss from "./Home.module.css";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../Context/userContext";
import { API, setAuthToken } from "../../config/api";
import { useNavigate } from "react-router-dom";

// components
import Profile from "../../components/Profile/Profile";
import Feed from "../../components/Feed/Feed";
import ModalFeed from "../../components/Modal/ModalFeed";

export default function HomePage() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(userContext);
  const [user, setUser] = useState({});
  const [feeds, setFeeds] = useState([]);
  const [modalFeed, setModalFeed] = useState(false);
  const [tempModalFeed, setTempModalFeed] = useState(null);

  const handleModalFeed = (data) => {
    setTempModalFeed(data);
    return setModalFeed(true);
  };

  const handleCloseModalFeed = () => {
    setModalFeed(false);
  };

  const getFeeds = async () => {
    try {
      const response = await API.get(`/feed/${state.user.id}`);
      setFeeds(response.data.data.feed);
      console.log(response.data.data.feed);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/user", config);
      setUser(response.data.data);
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const addLike = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.post(`/like/${id}`, config);
      console.log('respon like');
      console.log(response);
      getFeeds()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getFeeds();
  }, [localStorage.token, state.user.id]);

  return (
    <div className={HomeCss.Container}>
      <Profile user={user} logOut={logOut} />
      <Feed feeds={feeds} addLike={addLike} handleModalFeed={handleModalFeed} />
      {modalFeed ? (
        <ModalFeed
          tempModalFeed={tempModalFeed}
          show={modalFeed}
          handleCloseModalFeed={handleCloseModalFeed}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
