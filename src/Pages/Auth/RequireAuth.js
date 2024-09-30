import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../Api/Axios";

export default function RequireAuth() {
  const navigate = useNavigate();

  //User
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return (
    <>
      {token ? (
        user === "" ? (
          <Loading />
        ) : (
          <Outlet />
        )
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}
