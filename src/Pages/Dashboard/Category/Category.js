import { Form } from "react-bootstrap";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";

export default function Category() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const focus = useRef("");
  // handle Focus With Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  // ID
  const { id } = useParams();
  // const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));

  // Get Category Data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORY}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        // setImage(data.data.image);
        setLoading(false);
      })
      .then(() => {
        setDisable(false);
        // setLoading(false);
      })
      .catch(() => navigate("/dashboard/categories/Err404", { replace: true }));
  }, []);

  // Submit New Data
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
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
        <Form className="bg-white w-100 px-4 py-3 rounded shadow-sm" onSubmit={handleSubmit}>
          <h1>Edit Category Info</h1>
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </Form.Group>

          <button disabled={disable} className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
