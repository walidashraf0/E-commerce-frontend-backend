import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function User() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);

  // ID
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  useEffect(() => {
    Axios.get(`/${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
      })
      .then(() => {
        setDisable(false);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
      });
      navigate("/dashboard/users");
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
          <h1>Edit User</h1>
          <Form.Group className="mb-3" controlId="exampleForm.ControlText1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="name..."
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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
