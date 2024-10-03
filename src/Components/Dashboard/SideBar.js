import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLink";

export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  // console.log(windowSize);
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
        {links.map((link, key) =>
          link.role.includes(user.role) ? (
            <NavLink
              key={key}
              to={link.path}
              className="d-flex align-items-center gap-2 sidebar-link">
              <FontAwesomeIcon
                icon={link.icon}
                style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
              />
              <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
                {link.name}
              </p>
            </NavLink>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}
