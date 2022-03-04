import ExploreCss from "./Explore.module.css";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../Context/userContext";
import { API, setAuthToken } from "../../config/api";
import { useNavigate } from "react-router-dom";

// components
import Profile from "../../components/Profile/Profile";
import ExploreComp from "../../components/Feed/ExploreComp";
import ModalFeed from "../../components/Modal/ModalFeed";

export default function Explore() {
  const [state, dispatch] = useContext(userContext);
  const [user, setUser] = useState({});
  const [feeds, setFeeds] = useState([]);
  const navigate = useNavigate();
  const [modalFeed, setModalFeed] = useState(false);
  const [tempModalFeed, setTempModalFeed] = useState(null);

  const handleModalFeed = (data) => {
    setTempModalFeed(data);
    console.log("ini TempDataFeed");
    return setModalFeed(true);
  };

  const handleCloseModalFeed = () => {
    setModalFeed(false);
  };

  console.log(state.user.id);
  console.log(feeds);
  const getFeeds = async () => {
    try {
      const response = await API.get("/feeds");
      console.log(response.data.data.feed);
      setFeeds(response.data.data.feed);
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

  useEffect(() => {
    getUser();
    getFeeds();
  }, [localStorage.token, state.user.id]);

  return (
    <div className={ExploreCss.Container}>
      <Profile user={user} logOut={logOut} />
      <ExploreComp feeds={feeds} handleModalFeed={handleModalFeed} />
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
