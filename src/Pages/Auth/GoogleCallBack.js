import axios from "axios";
import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const cookie = Cookie();

  const location = useLocation();

  useEffect(() => {
    const googleCall = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    };
    googleCall();
  }, []);

  return (
    <>
      <h1>Google Callback</h1>
    </>
  );
}
