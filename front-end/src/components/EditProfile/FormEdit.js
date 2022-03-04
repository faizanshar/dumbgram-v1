import { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";
import EditCss from "./Edit.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



if (localStorage.token) {
  setAuthToken(localStorage.token);
}
toast.configure()
export default function FormEdit(props) {
  const { state } = props;
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [saveImage, setSaveImage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
    console.log(e.target.type);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      console.log(form.image);
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      // formData.set("image",form.image)
      formData.set("fullName", form.fullName);
      formData.set("username", form.username);
      formData.set("bio", form.bio);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await API.patch(`/user/${state.id}`, formData, config);
      console.log(response);
      toast.success("success!")
      navigate("/home")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setForm({
      fullName: state.fullName,
      username: state.username,
      bio: state.bio,
    });
    setImage(state.image);
    console.log(form.image);
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-4">
        {image ? <img src={image} className={EditCss.image} /> : <div></div>}
        <label htmlFor="formFile"> Upload Photos or Video</label>
        <input type="file" name="image" onChange={handleChange} id="formFile" hidden />
        <Form.Control
          className={EditCss.input}
          type="text"
          placeholder="Name"
          name="fullName"
          onChange={handleChange}
          value={form.fullName}
        />
        <Form.Control
          className={EditCss.input}
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <Form.Control
          className={EditCss.input}
          as="textarea"
          placeholder="Bio"
          name="bio"
          rows={3}
          onChange={handleChange}
          value={form.bio}
        />
        <div className={EditCss.GroupButton}>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Container>
  );
}
