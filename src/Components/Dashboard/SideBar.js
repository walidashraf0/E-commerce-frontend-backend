import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="sidebar pt-3">
        <NavLink to={"users"} className="d-flex align-items-center gap-2 sidebar-link">
          <FontAwesomeIcon icon={faUsers} />
          <p className="m-0">Users</p>
        </NavLink>
        <NavLink to={"products"} className="d-flex align-items-center gap-2 sidebar-link">
          <FontAwesomeIcon icon={faUsers} />
          <p className="m-0">Products</p>
        </NavLink>
        <NavLink to={"anything"} className="d-flex align-items-center gap-2 sidebar-link">
          <FontAwesomeIcon icon={faUsers} />
          <p className="m-0">Anything</p>
        </NavLink>
      </div>
    </>
  );
}
