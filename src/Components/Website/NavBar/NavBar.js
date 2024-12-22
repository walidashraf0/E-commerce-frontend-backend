import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";
import "./navbar.css";
import StringSlice from "../../../Helpers/StringSlice";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtn from "../Btns/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(5);

  const { isChange } = useContext(Cart);
  //console.log(isChange);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}/`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  //console.log(products);

  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
    //console.log(filterProduct);
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
    // console.log(findProduct);
  };

  const productsCartShow = products?.map((product, key) => (
    <div key={key} className="mb-4 position-relative">
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}>
        <FontAwesomeIcon icon={faXmark} width={"10px"} />
      </div>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <img
          style={{ objectFit: "cover" }}
          height={"80px"}
          src={product.images[0].image}
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gary", textDecoration: "line-through" }}>
              {product.price}$
            </h6>
          </div>
        </div>
        <PlusMinusBtn
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  const categoriesShow = categories.map((category, key) => (
    <p key={key}>{StringSlice(category.title, 15)}</p>
  ));
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsCartShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>

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
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
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
              <div onClick={handleShow}>
                <img
                  width="30px"
                  src={require("../../../Assets/cart.png")}
                  alt="Cart"
                />
              </div>
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
              {loading ? (
                <>
                  <SkeletonShow
                    height="30px"
                    width="70px"
                    length="8"
                    classes="col-2"
                  />
                </>
              ) : (
                categoriesShow
              )}
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
