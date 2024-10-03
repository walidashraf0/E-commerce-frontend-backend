import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function Test() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, [])
//   console.log(focus.current);

  // handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <Form>
            <div>
              <h1 className="mb-5">Register</h1>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  placeholder="Enter Your Name..."
                  required
                  ref={focus}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  placeholder="Enter Your Email..."
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="Enter Your Password..."
                  required
                  minLength={"8"}
                />
              </Form.Group>

              <button className="btn btn-primary mt-4">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
