import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { PRODUCT, PRODUCTS } from "../../Api/Api";
import TableShow from "../../Components/Dashboard/TableShow";

export default function Products() {
  const [products, setProducts] = useState([]);

  //Get All Products
  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  // handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white w-100 p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Products Page</h1>
          <Link className="btn btn-primary" to="/dashboard/product/add">
            Add Product
          </Link>
        </div>
        <TableShow header={header} data={products} delete={handleDelete} />
      </div>
    </>
  );
}
