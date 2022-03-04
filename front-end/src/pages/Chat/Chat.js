import { useContext, useEffect, useState } from "react";
import ChatCss from "./Chat.module.css";
import { API } from "../../config/api";
import { userContext } from "../../Context/userContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

// components
import ListChat from "../../components/ListChat/ListChat";
import RoomChat from "../../components/RoomChat/RoomChat";

let socket;

export default function Chat() {
  const [contact, setContact] = useState([]);
  const [isSelect, setIsSelect] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();
  const [state, dispatch] = useContext(userContext);

  console.log(state.user.id);

  const getContact = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/contact", config);
      setContact(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectChat = async (id) => {
    setIsSelect(true);
    setUserId(id);
  };

  const getChatById = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get(`/message-user/${userId}`, config);
      console.log("ini respon get");
      console.log(response.data.data.Message);
      setMessages(response.data.data.Message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket = io('http://localhost:5000')
    // code here
    getContact();
    getChatById()

    return () => {
        socket.disconnect()
    }
  }, [userId]);

  return (
    <div className={ChatCss.Container}>
      <ListChat contact={contact} selectChat={selectChat} />
      <RoomChat
        getChatById={getChatById}
        messages={messages}
        userId={userId}
        id={state.user.id}
        isSelect={isSelect}
      />
    </div>
  );
}
