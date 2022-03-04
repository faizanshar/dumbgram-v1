import React from "react";
import EditCss from "./Edit.module.css";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../Context/userContext";
import { API, setAuthToken } from "../../config/api";
import { useNavigate, useLocation } from "react-router-dom";

// components
import Profile from "../../components/Profile/Profile";
import EditComponent from "../../components/EditProfile/EditComponent";

export default function EditProfile() {
  const [state2, dispatch] = useContext(userContext);
  const [user, setUser] = useState({});

  // react-router-dom
  const navigate = useNavigate();
  const { state } = useLocation();

  // function
  const getUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/user", config);
      console.log("ini GETUSER");
      console.log(response.data.data);
      setUser(response.data.data);
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
  }, []);

  return (
    <div className={EditCss.Container}>
      <Profile user={user} logOut={logOut} />
      <EditComponent state={state} />
    </div>
  );
}
