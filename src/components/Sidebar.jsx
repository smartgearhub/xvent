import React from "react";
import "./Sidebar.css";
import {
  FaUser,
  FaEdit,
  FaCalendarAlt,
  FaEnvelope,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/profile")}>
          <FaUser className="icon" />
          <span>My Profile</span>
        </li>
        <li onClick={() => navigate("/myposts")}>
          <FaEdit className="icon" />
          <span>My Posts</span>
        </li>
        <li onClick={() => navigate("/discover-events")}>
          <FaCalendarAlt className="icon" />
          <span>Discover Events</span>
        </li>
        <li onClick={() => navigate("/messages")}>
          <FaEnvelope className="icon" />
          <span>Messages</span>
        </li>
        <li onClick={() => navigate("/notifications")}>
          <FaBell className="icon" />
          <span>Notifications</span>
        </li>
        <li onClick={() => navigate("/settings")}>
          <FaCog className="icon" />
          <span>Settings</span>
        </li>
        <li onClick={() => navigate("/Signup")}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
