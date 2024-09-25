import axios from "axios";
import { baseUrl, LOGOUT } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function Logout() {
  // Cookie
  const cookie = Cookie();

  const token = cookie.get("e-commerce");
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}/${LOGOUT}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res);
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
    </>
  );
}
