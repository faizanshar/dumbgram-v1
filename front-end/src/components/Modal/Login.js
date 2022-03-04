import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API,setAuthToken } from "../../config/api";
import "react-toastify/dist/ReactToastify.css";
import ModalCss from "./Modal.module.css";
import { userContext } from "../../Context/userContext";

toast.configure();
export default function Login(dataProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(userContext);
  const { show, handleCloseLogin, handleShowRegister } = dataProps;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log('ini USERCONTEXT DI login');
  console.log(state);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      console.log("ini response LOGIN");
      console.log(response);
      if (response.data.status) {
        toast.success("Success!");
        setForm("");
        navigate("/home");
        setAuthToken(response.data.data.user.token)
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user
        })
      } else {
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.log("ini error");
      console.log(error);
    }
  };

  return (
    <Modal centered show={show} onHide={handleCloseLogin}>
      <Modal.Header className={ModalCss.ModalHeader}>
        <Modal.Title style={{ color: "white" }}>Login</Modal.Title>
      </Modal.Header>

      <FormLogin
        handleShowRegister={handleShowRegister}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
      />
    </Modal>
  );
}

function FormLogin(dataProps) {
  const { handleShowRegister, handleChange, handleSubmit, form } = dataProps;

  return (
    <Modal.Body className={ModalCss.BodyModal}>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          name="email"
          className={ModalCss.input}
        />
        <Form.Control
          type="text"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          name="password"
          className={ModalCss.input}
        />
        <Button type="submit">Login</Button>
        <div>
          Don't have an account ? Klik <a onClick={handleShowRegister}>Here</a>
        </div>
      </Form>
    </Modal.Body>
  );
}
