import React from "react";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const { id } = useParams();
  return <div className="user_dashboard">UserDashboard</div>;
};

export default UserDashboard;
