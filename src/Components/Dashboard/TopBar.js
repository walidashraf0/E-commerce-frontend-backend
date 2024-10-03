import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";
import Loading from "../Loading/Loading";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const navigate = useNavigate();

  //User
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Cookie
  const cookie = Cookie();

  const token = cookie.get("e-commerce");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* {loading ? <Loading /> : ""} */}
      <div className="topbar">
        <div className="d-flex align-items-center justify-content-between h-100">
          <div className="d-flex align-items-center gap-5">
            <h3>WEGO</h3>
            <FontAwesomeIcon
              onClick={() => setIsOpen((prev) => !prev)}
              cursor={"pointer"}
              icon={faBars}
            />
          </div>
          <div>
            <DropdownButton id="dropdown-basic-button" title={name}>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </>
  );
}
