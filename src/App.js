import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Err403 from "./Pages/Auth/Err403";
import Viewer from "./Pages/Dashboard/Viewer";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        {/* Protected Routes */}
        {/* <Route element={<RequireAuth />}> */}
          <Route path="dashboard" element={<Dashboard />}>
            {/* <Route path="403" element={<Err403 />} /> */}
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1992", "1995"]} />}>
              <Route path="viewer" element={<Viewer />} />
            </Route>
          </Route>
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
