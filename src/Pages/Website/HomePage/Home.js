import "./home.css";
import Landing from "../Landing/Landing";
import Product from "../Product/Product";
import LatestSaleProducts from "../Product/LatestSaleProducts";

export default function Home() {
  return (
    <>
      <Landing />
      <LatestSaleProducts />
    </>
  );
}
