import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";

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
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
