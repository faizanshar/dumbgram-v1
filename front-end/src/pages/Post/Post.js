import { useState, useContext, useEffect } from "react";
import PostCss from "./Post.module.css";
import { userContext } from "../../Context/userContext";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

// components
import Profile from "../../components/Profile/Profile";
import PostComponent from "../../components/Post/PostComponent";

export default function Post() {
  const [state2, dispatch] = useContext(userContext);
  const [user, setUser] = useState({});

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
    // navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={PostCss.Container}>
      <Profile user={user} logOut={logOut} />
      <PostComponent />
    </div>
  );
}
