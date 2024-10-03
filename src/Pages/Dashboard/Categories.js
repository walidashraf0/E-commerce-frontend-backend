import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import { CATEGORIES } from "../../Api/Api";
import { useEffect, useState } from "react";

export default function Categories() {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [noUsers, setNoUsers] = useState(false);


  //Get All Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setUsers(data.data))
      .then(() => setNoUsers(true))
      .catch((err) => console.log(err));
  }, [deleted]);

  // //Filter Current User
  // const userFilter = users.filter((user) => user.id !== currentUser.id);

  // Display Users
  const displayUsers = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>
        {/* {user.name === currentUser.name ? user.name + " (You)" : user.name}
      </td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "Admin"
          : user.role === "2001"
          ? "User"
          : user.role === "1999"
          ? "Product Manger"
          : "Viewer"} */}
      </td>
      <td style={{ textAlign: "center" }}>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              color="blue"
              icon={faPenToSquare}
            />
          </Link>
          {/* {user.name === currentUser.name ? (
            ""
          ) : (
            <FontAwesomeIcon
              onClick={() => handleDelete(user.id)}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
              cursor={"pointer"}
            />
          )} */}
        </div>
      </td>
    </tr>
  ));

  // const handleDelete = async (id) => {
  //   if (currentUser.id !== id) {
  //     try {
  //       const res = await Axios.delete(`${CATEGORIES}/${id}`);
  //       setDeleted((prev) => !prev);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  return(
    <>
      <div className="bg-white w-100 p-2">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Categories</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">
            Add User
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td className="text-center" colSpan={12}>
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 && noUsers === true ? (
              <tr>
                <td className="text-center" colSpan={12}>
                  Users Not Found
                </td>
              </tr>
            ) : (
              displayUsers
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
