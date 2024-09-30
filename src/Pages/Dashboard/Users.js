import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, USERS } from "../../Api/Api";
import Cookie from "cookie-universal";
import { Table } from "react-bootstrap";
export default function Users() {
  const [users, setUsers] = useState([]);

  // Cookie
  const cookie = Cookie();

  const token = cookie.get("e-commerce");

  useEffect(() => {
    // const token = res.data.token;
    axios
      .get(`${baseUrl}/${USERS}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Display Users
  const displayUsers = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>Delete & Edit</td>
    </tr>
  ));

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
          <tbody>{displayUsers}</tbody>
        </Table>
      </div>
    </>
  );
}
