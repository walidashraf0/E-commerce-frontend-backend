import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/Axios";
import Err403 from "../Errors/err403.css";

export default function RequireAuth({ allowedRole }) {
  const navigate = useNavigate();

  //User
  const [user, setUser] = useState("");
  console.log(user);

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      })
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
