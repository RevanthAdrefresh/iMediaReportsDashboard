import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../ThemeSettings/ThemeContext";
import UserManagement from "./UserManagement";
import UploadedReports from "./UploadedReports";
import Settings from "./AdminSettings";
import AdminAnalytics from "./AdminAnalytics";
import SecurityInsights from "./AdminSecurityInsights";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const { theme } = useContext(ThemeContext);

  const renderTab = () => {
    switch (activeTab) {
      case "Analytics":
        return <AdminAnalytics />;
      case "users":
        return <UserManagement />;
      case "uploaded Reports":
        return <UploadedReports />;
      case "settings":
        return <Settings />;
         case "security insights":
        return <SecurityInsights/>
      default:
        return null;
    }
  };

  const colors = {
    wrapperBg: theme === "dark" ? "#0f172a" : "#f4f6f8",
    sidebarBg: theme === "dark" ? "#1e293b" : "#002b36",
    mainText: theme === "dark" ? "#e2e8f0" : "#111",
    navInactive: theme === "dark" ? "#334155" : "transparent",
  };

  return (
    <div
      style={{
        ...styles.wrapper,
        background: colors.wrapperBg,
        color: colors.mainText,
      }}
    >
      {/* ✅ Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          background: colors.sidebarBg,
        }}
      >
        <h2 style={styles.sidebarTitle}>Admin Panel</h2>

        {["users", "Analytics", "uploaded Reports","security insights", "settings"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.navBtn,
              background: activeTab === tab ? "#00C49F" : colors.navInactive,
              color: "#fff",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      {/* ✅ Main View */}
      <main style={styles.main}>{renderTab()}</main>
    </div>
  );
};

const styles = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    overflowX: "hidden",
    overflowY: "hidden",
  },

  sidebar: {
    width: "240px",
    padding: "20px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    overflowY: "auto", // ✅ scroll only inside sidebar
    boxSizing: "border-box",
    scrollbarWidth: "thin",
  },

  sidebarTitle: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "30px",
  },

  main: {
    marginLeft: "240px",
    width: "calc(100% - 240px)",
    padding: "20px",
    boxSizing: "border-box", // ✅ prevents stretching
    overflowY: "auto",
  },

  navBtn: {
    color: "#fff",
    padding: "12px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
    width: "100%",
    transition: "0.25s ease",
    fontWeight: "500",
    letterSpacing: "0.3px",
  },
};

export default AdminPanel;
