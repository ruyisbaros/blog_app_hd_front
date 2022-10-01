import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Loading from "./utils/Loading";
import NavBar from "./components/CustomNavBar";
import { useEffect, useState } from "react";
import UserDashboard from "./pages/UserDashboard";

function App() {
  //const navigate = useNavigate();
  const { authFetching } = useSelector((store) => store.currentUser);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      {authFetching && <Loading />}
      <div className="App">
        <div className="main">
          <NavBar token={token} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<UserDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
