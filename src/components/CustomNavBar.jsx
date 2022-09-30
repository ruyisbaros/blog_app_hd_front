import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import blogImage from "../images/blogImage.png";
import avatar from "../images/default-user.png";

const CustomNavBar = ({ token }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("a@a.com");
  const [profileImage, setProfileImage] = useState("");
  const [roles, setRoles] = useState([]);

  const handleLogout = async () => {};

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
                <span className="dropdown-item">Logout</span>
                <span className="dropdown-item">Logout</span>
                <span className="dropdown-item">Logout</span>
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
              <div className="dropdown-menu">
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
