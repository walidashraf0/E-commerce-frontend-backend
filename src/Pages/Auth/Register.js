import axios from "axios";
import { useState } from "react";
import { baseUrl, REGISTER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import "../../Css/components/google.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // States
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error Message
  const [err, setErr] = useState("");

  // Cookie
  const cookie = Cookie();

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, form);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      navigate("/login", { replace: true });
      // window.location.pathname = "/login";
      setLoading(false);
      console.log("Success");
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server Error");
      }
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name..."
                  required
                />
                <Form.Label>Name:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2">
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput3">
                <Form.Control
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password..."
                  minLength={8}
                  required
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>

              {/* <div className="form-control mb-3">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name..."
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control mb-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email..."
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-control mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password..."
                  minLength={8}
                  required
                />
                <label htmlFor="password">Password</label>
              </div> */}
              <button type="submit" className="btn btn-primary">
                Register Now
              </button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911"
                      alt="Sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" ? <span className="error">{err}</span> : ""}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
