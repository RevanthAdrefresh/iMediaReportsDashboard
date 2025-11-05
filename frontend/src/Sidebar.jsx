import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Calendar, PlayCircle, LayoutDashboard, Monitor } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Upload", path: "/main", icon: <LayoutDashboard size={20} /> },
      { name: "Overview", path: "/overall", icon: <Monitor size={20} /> },
    { name: "OTT", path: "/daily", icon: <Calendar size={20} /> },
    { name: "Video Ads", path: "/video", icon: <PlayCircle size={20} /> },
    { name: "Widget Report", path: "/adw", icon: <BarChart3 size={20} /> },
  
  ];

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#000000ff",
        color: "white",
        height: "100vh",
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30, fontWeight: "bold" }}>📊 Analytics</h2>

      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 15px",
            borderRadius: "8px",
            color: isActive ? "#000000ff" : "white",
            backgroundColor: isActive ? "white" : "transparent",
            textDecoration: "none",
            marginBottom: "10px",
            transition: "all 0.2s",
          })}
        >
          {item.icon} <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
