import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { LATESTPRO } from "../../../../Api/Api";
import Product from "./SaleProducts";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LATESTPRO}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  //   const imagesShow = products.map((res) => console.log(res.images[0].image));

  // console.log(products.images);
  const productsShow = products.map((product, key) => (
    <Product
      key={key}
      price={product.price}
      title={product.title}
      desc={product.description}
      discount={product.discount}
      //   img={product.images[0].image}
      rating={product.rating}
      id={product.id}
      col="3"
    />
  ));

  return (
    <>
      <Container className="mt-4">
        <h1>Latest Sale Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mt-3 mb-5">
          {loading ? (
            <SkeletonShow
              length="4"
              height="300px"
              baseColor="white"
              classes="col-lg-3 col-md-6 col-12"
            />
          ) : (
            productsShow
          )}
        </div>
      </Container>
    </>
  );
}
