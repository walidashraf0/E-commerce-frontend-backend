import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  //Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
        console.log(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  // handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">
            Add Category
          </Link>
        </div>
        <TableShow
          setPage={setPage}
          page={page}
          limit={limit}
          setLimit={setLimit}
          header={header}
          data={categories}
          delete={handleDelete}
          loading={loading}
          total={total}
        />
      </div>
    </>
  );
}
