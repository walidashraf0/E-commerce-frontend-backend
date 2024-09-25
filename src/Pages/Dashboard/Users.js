import axios from "axios";
import { useEffect } from "react";
import { baseUrl, USERS } from "../../Api/Api";
import Cookie from "cookie-universal";
import Logout from "../Auth/Logout";

export default function Users() {
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
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Users Page</h1>
      <Logout />
    </>
  );
}
