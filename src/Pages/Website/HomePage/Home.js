import "./home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";
import { Container } from "react-bootstrap";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";

export default function Home() {
  return (
    <>
      <Landing />
      <LatestSaleProducts />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </>
  );
}
