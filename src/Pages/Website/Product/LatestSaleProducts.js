import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LATESTPRO } from "../../../Api/Api";
import Product from "./Product";
import { Container } from "react-bootstrap";

export default function LatestSaleProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LATESTPRO}`).then((res) => setProducts(res.data));
  }, []);

  //   const imagesShow = products.map((res) => console.log(res.images[0].image));

  console.log(products.images);
  const productsShow = products.map((product, key) => (
    <Product
      key={key}
      price={product.price}
      title={product.title}
      desc={product.description}
      discount={product.discount}
    //   img={product.images[0].image}
      rating={product.rating}
    />
  ));

  return (
    <>
      <Container>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mt-3">
          {productsShow}
        </div>
      </Container>
    </>
  );
}
