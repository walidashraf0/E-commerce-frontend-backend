import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import Loading from "../../Components/Loading/Loading";

export default function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  // ID
  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
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
          <h1>Add User</h1>
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

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password..."
              minLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option disabled value={""}>
                Select Role
              </option>
              <option value={1995}>Admin</option>
              <option value={2001}>User</option>
              <option value={1992}>Viewer</option>
            </Form.Select>
          </Form.Group>
          <button
            disabled={
              name.length > 1 &&
              email.length > 1 &&
              password.length > 6 &&
              role !== ""
                ? false
                : true
            }
            className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
