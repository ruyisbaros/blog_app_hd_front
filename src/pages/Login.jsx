import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loggingFail,
  loggingFinish,
  loggingStart,
  loggingSuccess,
} from "../redux/authSlicer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passType, setPassType] = useState(false);
  //const [errText, setErrText] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loggingStart());
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(data);
      dispatch(loggingFinish());
      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("email", data.email);

      localStorage.setItem("profileImage", data.profileImage.imageUrl);
      localStorage.setItem("name", data.name);
      toast.success("You logged in successufully");
      navigate("/");
    } catch (error) {
      dispatch(loggingFail());
      //console.log(error);
      //console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-capitalize text-center mb-5">
          Welcome to <br />
          <span style={{ color: "blue", fontWeight: "bold" }}>
            Blogging <br />
          </span>{" "}
          Page
        </h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            value={email}
            onChange={handleInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={passType ? "text" : "password"}
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              value={password}
              onChange={handleInput}
            />
            <small
              style={{ color: passType ? "red" : "teal" }}
              onClick={() => setPassType(!passType)}
            >
              {passType ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-50">
          Login
        </button>

        <p className="my-4">
          Don't you have an account? <Link to="/register">Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
