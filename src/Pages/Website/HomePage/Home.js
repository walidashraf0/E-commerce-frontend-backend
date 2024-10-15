import "./home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import Product from "../../../Components/Website/Product/Product";
import LatestSaleProducts from "../../../Components/Website/Product/LatestSaleProducts";

export default function Home() {
  return (
    <>
      <Landing />
      <LatestSaleProducts />
    </>
  );
}
