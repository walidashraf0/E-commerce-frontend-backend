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
import Viewer from "./Pages/Dashboard/Viewer";
import Err404 from "./Pages/Auth/Err404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import Category from "./Pages/Dashboard/Category";
import Test from "./Pages/Website/Test";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route element={<RequireBack />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1992"]} />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="categories/:id" element={<Category />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1992", "1995"]} />}>
              <Route path="viewer" element={<Viewer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
