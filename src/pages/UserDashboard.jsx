import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchFinish, fetchStart } from "../redux/authSlicer";

const UserDashboard = ({ token }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  //console.log(id);

  const fetchUser = async () => {
    try {
      dispatch(fetchStart());
      const { data } = await axios.get(`/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchFinish());
      console.log(data);
      console.log("user is fetched");
      setUser(data);
    } catch (error) {
      toast.error(toast.error(error.response.data.message));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user);
  return (
    <div className="user_dashboard">
      <h2 className="text-center">Welcome {user.name}</h2>
      <div className="user_container">
        <div className="surround">
          <div className="surround_left">
            <div className="sorround_left-image">
              <img className="user_image" src={user?.image?.imageUrl} alt="" />
            </div>
            <div className="sorround_left-about">{user?.about}</div>
            <button className="btn btn-secondary my_posts">Edit Profile</button>
          </div>
          <div className="surround_right">
            <div className="user_info">
              <span>Name:</span>
              {user?.name}
            </div>
            <div className="user_info">
              <span>Email:</span>
              {user?.email}
            </div>
            <button className="btn btn-warning my_posts">My Posts</button>
            <Link to="/add_post" className="link_class">
              <button className="btn btn-danger my_posts">Create Post</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
