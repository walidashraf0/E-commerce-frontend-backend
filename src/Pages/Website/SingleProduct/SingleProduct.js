import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { Axios } from "../../../Api/Axios";
import { useParams } from "react-router-dom";
import { CART, PRODUCT } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import SkeletonShow from "../../../Components/Website/Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const { id } = useParams();

  const { setIsChange } = useContext(Cart);

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} color="gold" icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={faStar} />
  ));

  // console.log(product)

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter(item => item.id!== id)?.[0]?.count;
      // console.log(productCount);
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img, key) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  // console.log(product);
  const handleSaveProduct = async () => {
    const check = await checkStock();
    if (check) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);

      console.log(productExist);
      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }
      // console.log(getItems);
      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div className="d-flex align-items-start flex-wrap row-gap-5">
          {loading ? (
            <>
              <div className="col-lg-4 col-md-6 col-12">
                <SkeletonShow length="1" height="250px" classes="col-12" />
                <div className="col-12 d-flex mt-1">
                  <SkeletonShow length="1" height="50px" classes="col-4" />
                  <SkeletonShow length="1" height="50px" classes="col-4" />
                  <SkeletonShow length="1" height="50px" classes="col-4" />
                </div>
              </div>

              <div className="col-lg-8 col-md-6 col-12">
                <div className="ms-lg-5">
                  <SkeletonShow length="1" height="50px" classes="col-8" />
                  <SkeletonShow
                    length="1"
                    height="210px"
                    classes="col-lg-8 col-12 mt-2"
                  />
                  <hr className="col-lg-8 col-12" />
                  <div className="d-flex justify-content-between align-items-center col-lg-8 col-12">
                    <SkeletonShow
                      length="1"
                      height="20px"
                      classes="col-4 mt-1"
                    />
                    <SkeletonShow
                      length="1"
                      height="20px"
                      classes="col-4 mt-1"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-4 col-md-6 col-12">
                <ImageGallery items={productImages} />
              </div>
              <div className="col-lg-8 col-md-6 col-12">
                <div className="ms-5">
                  <h1>{product.title}</h1>
                  <p style={{ color: "gray" }}>{product.About}</p>
                  <h3 className="fw-normal">{product.description}</h3>

                  <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                    <div>
                      {product.stock === 1 ? (
                        <p className="text-danger">There is only 1 left</p>
                      ) : (
                        ""
                      )}
                      {showGoldStars}
                      {showEmptyStars}
                      <div className="d-flex align-items-center gap-3">
                        <h5 className="m-0 text-primary">
                          {product.price - product.discount}$
                        </h5>
                        <h6
                          className="m-0"
                          style={{
                            color: "gray",
                            textDecoration: "line-through",
                          }}>
                          {product.price}$
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={handleSaveProduct}
                        className="border p-2 rounded">
                        {loadingCart ? (
                          "Loading"
                        ) : (
                          <img
                            src={require("../../../Assets/cart.png")}
                            alt="cart"
                            width="20px"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
