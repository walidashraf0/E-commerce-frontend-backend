import { Navigate, Outlet, replace } from "react-router-dom";
import Cookie from "cookie-universal";

export default function RequireAuth() {
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return <>{token ? <Outlet /> : <Navigate to={"/login"} replace={true} />}</>;
}
