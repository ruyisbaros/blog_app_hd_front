import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.currentUser);

  const [passType, setPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);
  const [errText, setErrText] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  });
  const { email, password, name, cf_password } = user;

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="fullName"
            placeholder="Enter Full Name"
            required
            value={name}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address</label>
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
            style={{
              backgroundColor: errText.split(" ").includes("email") && "red",
            }}
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
        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password</label>
          <div className="pass">
            <input
              type={confPassType ? "text" : "password"}
              name="cf_password"
              className="form-control"
              id="cf_password"
              placeholder="Confirm Password"
              required
              value={cf_password}
              onChange={handleInput}
            />
            <small
              style={{ color: confPassType ? "red" : "teal" }}
              onClick={() => setConfPassType(!confPassType)}
            >
              {confPassType ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <button
          style={{
            backgroundColor:
              errText.split(" ").includes("email", "username", "passwords") &&
              "red",
          }}
          type="submit"
          className="btn w-50"
          disabled={email && password && name && cf_password ? false : true}
        >
          Register
        </button>

        <p className="my-3">
          Do you have already an account? <Link to="/login">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;