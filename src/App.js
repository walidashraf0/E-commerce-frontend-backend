import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Components/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="users" element={<Users />} />
      <Route path="/auth/google/callback" element={<GoogleCallBack />} />
    </Routes>
  </div>;
}

export default App;
