import PostCss from "./Post.module.css";
import { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();
export default function FormPost() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    caption: "",
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
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("caption", form.caption);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await API.post("/feed", formData, config);
      console.log(response);
      toast.success("success!");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-4">
        {image ? <img src={image} className={PostCss.image} /> : <div></div>}
        <label htmlFor="formFile"> Upload Photos or Video</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          id="formFile"
          hidden
        />
        <Form.Control
          className={PostCss.input}
          as="textarea"
          placeholder="caption"
          name="caption"
          rows={5}
          onChange={handleChange}
          value={form.caption}
        />
        <div className={PostCss.GroupButton}>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Container>
  );
}
