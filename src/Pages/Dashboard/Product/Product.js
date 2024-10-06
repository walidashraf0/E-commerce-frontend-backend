import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { Button, Form } from "react-bootstrap";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";

export default function Product() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    rating: "",
  });

  const [images, setImages] = useState([]);
  const [imagesGet, setImagesGet] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [idsGet, setIdsGet] = useState([]);
  const { id } = useParams();
  //   const [sent, setSent] = useState(false);

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

  const progress = useRef([]);
  const ids = useRef([]);

  //Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => {
        setCategories(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get Product Data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCT}/${id}`)
      .then((data) => {
        // console.log(data.data[0])
        setForm(data.data[0]);
        setImagesGet(data.data[0].images);
        setLoading(false);
      })
      .catch(() => navigate("/dashboard/user/Err404", { replace: true }));
  }, []);

  // handle Delete Image
  const handleImageDelete = async (id, img) => {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
      console.log(ids);
    } catch (err) {
      console.log(err);
    }
  };

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const handleDeleteTwo = async (id) => {
    setImagesGet((prev) => prev.filter((img) => img.id !== id));
    setIdsGet((prev) => {
      return [...prev, id];
    });
  };

  const imagesEditShow = imagesGet.map((item, key) => (
    <div key={key} className="border p-2 my-2 position-relative col-2">
      <div className="d-flex align-items-center justify-content-start gap-2">
        {/* <span>{item.name}</span> */}
        <img className="m-1 w-100" src={item.image} alt="image-products" />
      </div>
      <div
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
        style={{ cursor: "pointer" }}>
        <p className="py-1 px-2 m-0" onClick={() => handleDeleteTwo(item.id)}>
          X
        </p>
      </div>
    </div>
  ));


  const imagesShow = images.map((item, key) => (
    <div key={key} className="w-100 border p-2 my-2">
      <div className="d-flex align-items-center justify-content-between">
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
        <Button onClick={() => handleImageDelete(key, item)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"></span>
      </div>
    </div>
  ));

  // handle Edit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      for (let i = 0; i < idsGet.length; i++) {
        await Axios.delete(`product-img/${idsGet[i]}`).then((data) => {
          console.log(data);
        });
      }
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
      setLoading(false);
      navigate("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // setSent(true);
  };

  const j = useRef(-1);
  // handle Image change
  const handleImagesChange = async (e) => {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    // For Sending Image
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 20 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form className="bg-white w-100 px-4 py-3 rounded shadow-sm" onSubmit={handleSubmit}>
          <h1>Edit Product Info</h1>
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
              //   disabled={!sent}
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
              //   disabled={!sent}
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
              //   disabled={!sent}
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
              //   disabled={!sent}
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
              //   disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="text"
              name="rating"
              value={form.rating}
              required
              onChange={handleChange}
              placeholder="rating..."
              //   disabled={!sent}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control
              ref={openImage}
              hidden
              multiple
              type="file"
              //   disabled={!sent}
              onChange={handleImagesChange}
            />
          </Form.Group>

          <div
            onClick={handleUploadImages}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
            style={{
              border: "2px dashed #80ACFE",
              cursor: "pointer",
            }}>
            <img
              width="100px"
              src={require("../../../Assets/upload.png")}
              alt="upload-image"
            />
            <p className="fw-bold mb-0" style={{ color: "#80ACFE" }}>
              Upload Images
            </p>
          </div>

          <div className="d-flex align-items-start flex-wrap gap-2">
            {imagesEditShow}
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
