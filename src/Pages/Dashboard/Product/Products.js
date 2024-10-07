import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);


  //Get All Products
  useEffect(() => {
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
        console.log(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // console.log(products);

  const header = [
    { key: "images", name: "Images" },
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
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
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
        <TableShow
          setPage={setPage}
          page={page}
          limit={limit}
          setLimit={setLimit}
          header={header}
          data={products}
          delete={handleDelete}
          loading={loading}
          total={total}
          search="title"
          searchLink={PRODUCT}
        />
      </div>
    </>
  );
}
