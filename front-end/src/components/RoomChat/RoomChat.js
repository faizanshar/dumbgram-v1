import { useState } from "react";
import RoomCss from "./Room.module.css";
import { Container } from "react-bootstrap";

// components
import HeaderFeed from "../Header/HeaderFeed";
import { API } from "../../config/api";

export default function RoomChat(props) {
  const { messages, isSelect, id, userId, getChatById } = props;
  const [data, setData] = useState({
    message: "",
  });

  // console.log("ini messages");
  // console.log(messages);

  // console.log("ini isSelect");
  // console.log(userId);

  const patch = "http://localhost:5000/uploads/";

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };
      // const body = JSON.stringify(data);
      const response = await API.post(`/message/${userId}`, data, config);
      console.log(response);
      getChatById()
      setData({
        message:''
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={RoomCss.Container}>
      <HeaderFeed />
      {isSelect ? (
        <IsMessage
          messages={messages}
          handleChange={handleChange}
          data={data}
          id={id}
          patch={patch}
          handleSubmit={handleSubmit}
        />
      ) : (
        <NoMessage />
      )}
    </div>
  );
}

function IsMessage(props) {
  const { messages, id, patch, handleChange, data, handleSubmit } = props;
  return (
    <div className={RoomCss.ContainerChat}>
      {messages.map((item) => {
        if (item.userSend == id) {
          return (
            <div className={RoomCss.Message2}>
              <div className={RoomCss.Chat2}>{item.message}</div>
              <div className={RoomCss.Profile}>
                <img src={patch + item.usersend.image} />
              </div>
            </div>
          );
        } else {
          return (
            <div className={RoomCss.Message}>
              <div className={RoomCss.Profile}>
                <img src={patch + item.usersend.image} />
              </div>
              <div className={RoomCss.Chat}>{item.message}</div>
            </div>
          );
        }
      })}
      <div className={RoomCss.Block}></div>
      {/* <div className={RoomCss.ContainerInput}> */}
      <form onSubmit={handleSubmit} className={RoomCss.ContainerInput}>
        <input
          type="text"
          name="message"
          value={data.message}
          onChange={handleChange}
          placeholder="Send Messages"
        />
      </form>
      {/* </div> */}
    </div>
  );
}

function NoMessage() {
  return (
    <div className={RoomCss.ContainerChat2}>
      <h1>No Message</h1>
    </div>
  );
}
