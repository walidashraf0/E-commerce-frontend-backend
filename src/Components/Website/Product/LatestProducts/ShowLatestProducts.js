import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { LATEST, TOPRATED } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import Product from "../SaleProducts/SaleProducts";

export default function ShowLatestProducts(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LATEST}`)
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
      col="6"
    />
  ));

  return (
    <>
      <div className={`col-md-6 col-12`}>
        <div className="ms-md-3" style={{ border: "2px solid #0D6EFD" }}>
          <h1 className="text-center m-0 p-3 bg-primary text-white">
            Latest Products
          </h1>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2 mt-3 mb-5">
            {loading ? (
              <SkeletonShow
                length="4"
                height="300px"
                baseColor="white"
                classes="col-md-6 col-12"
              />
            ) : (
              productsShow
            )}
          </div>
        </div>
      </div>
    </>
  );
}
