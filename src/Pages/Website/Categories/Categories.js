import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import StringSlice from "../../../Helpers/StringSlice";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES } from "../../../Api/Api";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`${CATEGORIES}/`).then((res) =>
      setCategories(res.data)
    );
  }, []);

//   console.log(categories);

  const categoriesShow = categories.map((category, key) => (
    <div
      key={key}
      className="col-lg-2 coli-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3" width="50px" src={category.image} alt="just-an-image" />
        <p>
          {StringSlice(category.title, 12)}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {/* <NavBar /> */}
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {categoriesShow}
          </div>
        </Container>
      </div>
    </>
  );
}