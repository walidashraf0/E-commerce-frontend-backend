import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, CATEGORY } from "../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../Components/Dashboard/TableShow";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  //Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => {
        setCategories(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <div className="bg-white w-100 p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories</h1>
          <Link className="btn btn-primary" to="/dashboard/category/add">
            Add Category
          </Link>
        </div>
        <TableShow header={header} data={categories} delete={handleDelete} />
      </div>
    </>
  );
}
