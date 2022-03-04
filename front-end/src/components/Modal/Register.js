import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCss from "./Modal.module.css";

toast.configure();
export default function Register(dataProps) {
  const { show, handleCloseRegister, handleShowLogin, setShow } = dataProps;
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

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
      const response = await API.post("/register", body, config);
      if (response.data.status) {
        toast.success("Success!");
        setForm("");
        setShow(false);
      }else{
        toast.error(response.data.error.message)
      }
    } catch (error) {
      console.log("ini Error");
      console.log(error);
    }
  };

  return (
    <Modal centered show={show} onHide={handleCloseRegister}>
      <Modal.Header className={ModalCss.ModalHeader}>
        <Modal.Title style={{ color: "white" }}>Register</Modal.Title>
      </Modal.Header>
      <FormRegister
        handleShowLogin={handleShowLogin}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
      />
    </Modal>
  );
}

function FormRegister(dataProps) {
  const { handleShowLogin, handleChange, form, handleSubmit } = dataProps;

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
          placeholder="Name"
          onChange={handleChange}
          value={form.fullName}
          name="fullName"
          className={ModalCss.input}
        />{" "}
        <Form.Control
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          name="username"
          className={ModalCss.input}
        />{" "}
        <Form.Control
          type="text"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          name="password"
          className={ModalCss.input}
        />
        <Button type="submit">Register</Button>
        <div>
          Don't have an account ? Klik <a onClick={handleShowLogin}>Here</a>
        </div>
      </Form>
    </Modal.Body>
  );
}
