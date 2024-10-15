import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { TOPRATED } from "../../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TOPRATED}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  //   const imagesShow = products.map((res) => console.log(res.images[0].image));

  // console.log(products.images);
  const topRatedShow = products.map((product, key) => (
    <TopRated
      key={key}
      price={product.price}
      title={product.title}
      desc={product.description}
      discount={product.discount}
      //   img={product.images[0].image}
      rating={product.rating}
      id={product.id}
    />
  ));

  return (
    <>
      <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD" }}>
        <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
        <div className="p-5">
          {loading ? (
            <SkeletonShow
              length="6"
              width="500px"
              height="300px"
              baseColor="white"
              classes="col-md-6 col-12"
            />
          ) : (
            topRatedShow
          )}
        </div>
      </div>
    </>
  );
}
