import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function RequireAuth() {
  const navigate = useNavigate();

  //User
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/${USER}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
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
