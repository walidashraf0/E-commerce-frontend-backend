import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { CATEGORY } from "../../../Api/Api";

export default function AddCategory() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = useRef("");
  // handle Focus With Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // For Sending Image
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form).then(() =>
        setLoading(false)
      );
      navigate("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
          <h1>Add Category</h1>
          <Form.Group className="mb-3" controlId="exampleForm.ControlText1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title..."
              ref={focus}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              //   value={image}
              //   required
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </Form.Group>

          <button
            disabled={title.length > 1 ? false : true}
            className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
