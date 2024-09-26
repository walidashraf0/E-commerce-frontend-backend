import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  console.log(windowSize);

  const isOpen = menu.isOpen;

  return (
    <>
      <div
        className="sidebar pt-3"
        style={{ width: isOpen ? "240px" : "fit-content", left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0, transition: "0.4s" }}>
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
          to={"products"}
          className="d-flex align-items-center gap-2 sidebar-link">
          <FontAwesomeIcon
            icon={faUsers}
            style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            Products
          </p>
        </NavLink>
        <NavLink
          to={"anything"}
          className="d-flex align-items-center gap-2 sidebar-link">
          <FontAwesomeIcon
            icon={faUsers}
            style={{ padding: isOpen ? "10px 15px" : "10px 13px" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            Anything
          </p>
        </NavLink>
      </div>
    </>
  );
}
