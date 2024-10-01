import { useEffect, useState } from "react";
import { USER, USERS } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [deleted]);

  useEffect(() => {
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data));
  }, []);

  const userFilter = users.filter((user) => user.id !== currentUser.id);

  // Display Users
  const displayUsers = userFilter.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              color="blue"
              icon={faPenToSquare}
            />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            fontSize={"19px"}
            color="red"
            icon={faTrash}
            cursor={"pointer"}
          />
        </div>
      </td>
    </tr>
  ));

  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setDeleted((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-white w-100 p-2">
        <h1>Users Page</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
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
            ) : (
              displayUsers
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
