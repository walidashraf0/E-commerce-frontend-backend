import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Form } from "react-bootstrap";
import { CATEGORIES, PRODUCT } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  // Ay Data
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);

  const focus = useRef("");
  // handle Focus With Ref
  useEffect(() => {
    focus.current.focus();
  }, []);

  const openImage = useRef(null);
  // handle Upload Images
  const handleUploadImages = () => {
    openImage.current.click();
  };

  //Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => {
        setCategories(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(categories);

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  // console.log(...images);

  const imagesShow = images.map((item, key) => (
    <div key={key} className="w-100 border p-2 my-2">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img
          className="m-1"
          width="100px"
          src={URL.createObjectURL(item)}
          alt="image-products"
        />
        <div>
          <p>{item.name}</p>
          <p>
            {item.size / 1024 < 900
              ? (item.size / 1024).toFixed(2) + " KB"
              : (item.size / (1024 * 1024)).toFixed(2) + " MB"}
          </p>
        </div>
      </div>
      <div className="custom-progress mt-3">
        <span percent={"50%"} className="inner-progress"></span>
      </div>
    </div>
  ));

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // For Sending Image
    const data = new FormData();
    data.append("category", form.category);
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("discount", form.discount);
    data.append("price", form.price);
    data.append("About", form.About);
    for (let i = 0; i < images.length; i++) {
      data.append("images[]", images[i]);
    }
    try {
      const res = await Axios.post(`${PRODUCT}/add`, data);
      setLoading(false);
      navigate("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // handle submit form
  const handleSubmitForm = async () => {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  // handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if(sent !== 1) {
      handleSubmitForm();
    }
  };
  // console.log(form);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
          <h1>Add Product</h1>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              required
              onChange={handleChange}
              placeholder="category..."
              ref={focus}>
              <option disabled>Select Category</option>
              {categoriesShow}
              {/* <option value={"5"}></option>
              <option value={"10"}>Category 2</option> */}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              required
              onChange={handleChange}
              placeholder="title..."
              disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={form.description}
              required
              onChange={handleChange}
              placeholder="description..."
              disabled={!sent}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="about">
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              name="About"
              value={form.About}
              required
              onChange={handleChange}
              placeholder="about..."
              disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="discount">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="text"
              name="discount"
              value={form.discount}
              required
              onChange={handleChange}
              placeholder="discount..."
              disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={form.price}
              required
              onChange={handleChange}
              placeholder="price..."
              disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control
              ref={openImage}
              hidden
              multiple
              type="file"
              disabled={!sent}
              onChange={(e) => setImages([...e.target.files])}
            />
          </Form.Group>

          <div
            onClick={handleUploadImages}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
            style={{
              border: !sent ? "2px dashed gray" : "2px dashed #80ACFE",
              cursor: "pointer",
            }}>
            <img
              width="100px"
              src={require("../../Assets/upload.png")}
              alt="upload-image"
              style={{ filter: !sent ? "grayscale(1)" : "" }}
            />
            <p
              className="fw-bold mb-0"
              style={{ color: !sent ? "gray" : "#80ACFE" }}>
              Upload Images
            </p>
          </div>

          <div className="d-flex align-items-start flex-column gap-2">
            {imagesShow}
          </div>

          <button
            disabled={form.title.length > 1 ? false : true}
            className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
