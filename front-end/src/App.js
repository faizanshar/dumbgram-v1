import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css//bootstrap.min.css";
import { useEffect } from "react";

// components
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "../src/pages/Home/Home";
import EditProfile from "../src/pages/EditProfile/EditProfile";
import Post from "./pages/Post/Post";
import Explore from "./pages/Explore/Explore";
import Chat from "./pages/Chat/Chat";
import DetailUser from "./pages/DetailUser/DetailUser";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/edit-profile" element={<EditProfile />} />
      <Route path="/home/post" element={<Post />} />
      <Route path="/home/explore" element={<Explore />} />
      <Route path="/home/chat" element={<Chat />} />
      <Route path="/home/detail-user" element={<DetailUser />} />

    </Routes>
  );
}

export default App;
