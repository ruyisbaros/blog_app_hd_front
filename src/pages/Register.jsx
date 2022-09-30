import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loggingFail, loggingStart, loggingSuccess } from "../redux/authSlicer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.currentUser);

  const [passType, setPassType] = useState(false);
  const [confPassType, setConfPassType] = useState(false);
  const [errText, setErrText] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    roles: ["User"],
    imageId: "pw4gq42vstslcyqzi81o",
    cf_password: "",
  });
  const { email, password, name, about, roles, imageId, cf_password } = user;
  // console.log(roles);

  useEffect(() => {
    if (password !== cf_password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  }, [cf_password]);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === cf_password) {
      try {
        dispatch(loggingStart());
        const { data } = await axios.post("/api/v1/auth/register", {
          email,
          password,
          name,
          about,
          roles,
          imageId,
        });
        console.log(data);
        setPasswordsMatch(true);
        dispatch(loggingSuccess());
        toast.success("You have been registered successufully...");
      } catch (error) {
        dispatch(loggingFail());
        //console.log(error);
        //console.log(error.response.data.message);
        toast.error(error.response.data.message);
        setErrText(error.response.data.message);
        //console.log(errText.split(" "));
      }
    } else {
      dispatch(loggingFail());
      toast.error("Passwords don't match!");
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-capitalize text-center my-2">
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
          <label htmlFor="email">Email Address</label>
          <input
            style={{
              backgroundColor: errText.split(" ").includes("email:") && "red",
            }}
            type="email"
            name="email"
            className="form-control"
            id="email"
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
          <label htmlFor="about">About :</label>
          <textarea
            type="text"
            name="about"
            className="text_area"
            id="about"
            aria-describedby="emailHelp"
            placeholder="Tell us about yourself..."
            value={about}
            onChange={handleInput}
          ></textarea>
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
              style={{
                backgroundColor:
                  password && cf_password
                    ? !passwordsMatch
                      ? "red"
                      : "green"
                    : "inherit",
              }}
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

        <button type="submit" className="btn btn-primary w-50">
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
