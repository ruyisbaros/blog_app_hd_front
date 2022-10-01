import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import blogImage from "../images/blogImage.png";
import avatar from "../images/default-user.png";

const CustomNavBar = ({ token }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.currentUser);
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
    if (localStorage.getItem("profileImage")) {
      setProfileImage(localStorage.getItem("profileImage"));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    /* localStorage.removeItem("roles"); */
    localStorage.removeItem("profileImage");
    localStorage.removeItem("name");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="nav_box">
      <nav className="nav_custom navbar navbar-expand-lg bg-dark navbar-dark">
        <Link className="link_class" to="">
          <img className="logo_image" src={blogImage} alt="Logo" />
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#topNavBar"
        >
          {" "}
          <span className="navbar-toggler-icon bg-dark "></span>
        </button>
        <div className="collapse navbar-collapse" id="topNavBar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="link_class nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="link_class nav-link">
                Blogs
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                data-toggle="dropdown"
                className="more_drop nav-link dropdown-toggle"
              >
                More
              </span>
              <div className="dropdown-menu">
                <Link to="/services" className="link_class">
                  <span className="dropdown-item">Services</span>
                </Link>
                <Link to="/contact" className="link_class">
                  <span className="dropdown-item">Contact Us</span>
                </Link>
                <Link to="/linkedin" className="link_class">
                  <span className="dropdown-item">Linkedin</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
        {token ? (
          <ul className="logged_user_info">
            <li className="nav-item">
              <img
                className="logged_user_image"
                src={profileImage ? profileImage : avatar}
                alt=""
              />
            </li>
            <li className="nav-item">
              <span className="logged_user_email">{email} </span>
            </li>
            <li className="nav-item dropdown">
              <span
                data-toggle="dropdown"
                className="logged_user_email dropdown-toggle"
              ></span>
              <div
                style={{ marginLeft: "-100px", marginTop: "20px" }}
                className="dropdown-menu drop_ui"
              >
                <span onClick={handleLogout} className="dropdown-item">
                  Logout
                </span>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="link_class nav-link" to="/register">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link_class nav-link " to="/login">
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default CustomNavBar;
