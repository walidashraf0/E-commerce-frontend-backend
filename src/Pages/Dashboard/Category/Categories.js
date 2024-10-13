import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/Dashboard/TableShow";
import { Form } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");


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
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const getSearchData = async () => {
    try {
      const res = await Axios.post(`${CATEGORY}/search?title=${search}`);
      // setSearch(e.target.value);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      getSearchData();
    }, 800);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <>
      <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">
            Add Category
          </Link>
        </div>

        {/* <button onClick={getSearchData}>Get Data</button> */}

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
          search="title"
          searchLink={CATEGORY}
        />
      </div>
    </>
  );
}
