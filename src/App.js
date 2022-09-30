import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DraftPage from "./components/DraftPage";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Loading from "./utils/Loading";
import NavBar from "./components/CustomNavBar";

function App() {
  const { authFetching, token } = useSelector((store) => store.currentUser);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      {authFetching && <Loading />}
      <div className="App">
        <div className="main">
          <NavBar token={token} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
