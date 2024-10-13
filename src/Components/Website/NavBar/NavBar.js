import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import "./navbar.css";
import StringSlice from "../../../Helpers/StringSlice";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios.get(`${CATEGORIES}/`).then((res) =>
      setCategories(res.data.slice(-8))
    );
  }, []);

  const categoriesShow = categories.map((category, key) => (
    <p key={key}>
      {StringSlice(category.title, 15)}
    </p>
  ));
  return (
    <>
      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../Assets/Logo.png")}
                alt="logo"
              />
            </Link>
            <div className="col-12 col-md-6 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search Product"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <Link to="/cart">
                <img
                  width="30px"
                  src={require("../../../Assets/cart.png")}
                  alt="Cart"
                />
              </Link>
              <Link to="/profile">
                <img
                  width="35px"
                  src={require("../../../Assets/user.png")}
                  alt="Profile"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-start gap-5">
              {categoriesShow}
              <Link className="text-black category-title" to="/categories">
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
