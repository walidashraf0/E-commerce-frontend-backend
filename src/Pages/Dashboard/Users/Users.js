import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/TableShow";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);


  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data));
  }, []);

  //Get All Users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [deleted]);

  const header = [
    {
      key: "name",
      name: "User Name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];

  // //Filter Current User
  // const userFilter = users.filter((user) => user.id !== currentUser.id);

  // handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">
            Add User
          </Link>
        </div>
        <TableShow
          header={header}
          data={users}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          delete={handleDelete}
          currentUser={currentUser}
        />
      </div>
    </>
  );
}
