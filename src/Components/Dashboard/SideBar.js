import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";

export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  console.log(windowSize);
  const isOpen = menu.isOpen;

  //User
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}></div>
      <div
        className="sidebar pt-3"
        style={{
          width: isOpen ? "240px" : "fit-content",
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          transition: "0.4s",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}>
        {user.role === "1995" ? (
          <>
            <NavLink
              to={"users"}
              className="d-flex align-items-center gap-2 sidebar-link">
              <FontAwesomeIcon
                icon={faUsers}
                style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
              />
              <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
                Users
              </p>
            </NavLink>

            <NavLink
              to={"/dashboard/user/add"}
              className="d-flex align-items-center gap-2 sidebar-link">
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
              />
              <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
                Add User
              </p>
            </NavLink>

            <NavLink
              to={"/dashboard/viewer"}
              className="d-flex align-items-center gap-2 sidebar-link">
              <FontAwesomeIcon
                icon={faUsers}
                style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
              />
              <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
                Viewer
              </p>
            </NavLink>
          </>
        ) : user.role === "1992" ? (
          <NavLink
            to={"/dashboard/viewer"}
            className="d-flex align-items-center gap-2 sidebar-link">
            <FontAwesomeIcon
              icon={faUsers}
              style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
            />
            <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
              Viewer
            </p>
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
