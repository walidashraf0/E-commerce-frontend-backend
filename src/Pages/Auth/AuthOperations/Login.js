import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, LOGIN } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import "../../../Css/components/google.css";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const focus = useRef("");
  // handle Focus With Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

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
      const res = await axios.post(`${baseUrl}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "viewer";
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
      // console.log("Success");
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
      } else {
        setErr("Internal Server Error");
      }
    }
  };

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login Now</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  ref={focus}
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2">
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

              <button type="submit" className="btn btn-primary">
                Login
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
