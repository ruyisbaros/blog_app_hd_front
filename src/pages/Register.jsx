import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchStart, loggingFail, loggingSuccess } from "../redux/authSlicer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, currentUser } = useSelector((store) => store.currentUser);
  console.log(token + " and " + currentUser.name);

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

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === cf_password) {
      try {
        dispatch(fetchStart());
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
        dispatch(loggingSuccess({ token: data[0], currentUser: data[1] }));
        localStorage.setItem("token", data[0]);
        localStorage.setItem("currentUser", JSON.stringify(data[1]));
        toast.success("You have been registered successufully...");
        navigate("/home");
      } catch (error) {
        dispatch(loggingFail());
        //console.log(error);
        //console.log(error.response.data.message);
        toast.error(error.response.data.message);
        setErrText(error.response.data.message);
        //console.log(errText);
        //console.log(errText.split(" ").includes("email:"));
      }
    } else {
      dispatch(loggingFail());
      toast.error("Passwords don't match!");
    }
  };
  console.log(errText);
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

        <div className="form-group email_box">
          <label htmlFor="email">Email Address</label>
          <input
            /* style={{
              background:
                errText && errText.split(" ").includes("email:")
                  ? "red"
                  : "inherit",
            }}*/
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            value={email}
            onChange={handleInput}
            //onInvalid={errText.split(" ").includes("email:")}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          {errText && errText.split(" ").includes("email:") && (
            <i className="fa-solid fa-circle-exclamation icon_red warn_icon"></i>
          )}
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
                      ? "orange"
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
