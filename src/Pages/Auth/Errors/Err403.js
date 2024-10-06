import { Link } from "react-router-dom";
import "./err403.css";

export default function Err403({ role }) {
  return (
    <>
      <div className="text-wrapper">
        <div className="title" data-content={404}>
          403 - ACCESS DENIED
        </div>
        <div className="subtitle">
          Oops, You don't have permission to access this page.
          <Link
            className="d-block text-center btn btn-primary"
            to={role === "1992" ? "/dashboard/viewer" : "/"}>
            {role === "1992" ? "Go To Viewer Page" : "Go To Home Page"}
          </Link>
        </div>
      </div>
    </>
  );
}
