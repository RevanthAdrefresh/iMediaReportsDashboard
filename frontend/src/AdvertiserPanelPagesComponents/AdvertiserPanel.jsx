import React, { useState, useEffect } from "react";
import MainDashboard from "./RealDashBoard";
import Summary from "./Summary";
import OttReport from "./OttReport";
import AdWidget from "./Advertise";
import VideoReport from "./NewVideoReport";
import AdvertiserDisplayData from "../DisplayData";
import DailyReports from "../DailyReportsofAll";

const AdvertiserPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <Summary />;

      case "Daily Report":
        return <DailyReports />;

      case "OTT":
        return <OttReport />;

      case "uploads":
        return <MainDashboard />;

      case "Display Report":
        return <AdvertiserDisplayData />;

      case "Video Report":
        return <VideoReport />;

      case "Ad Widget":
        return <AdWidget />;

      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* ✅ FIXED SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Advertiser Panel</h2>

        {[
          "overview",
          "Daily Report",
          "OTT",
          "uploads",
          "Display Report",
          "Video Report",
          "Ad Widget",
        ].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.navBtn,
              background: activeTab === tab ? "#00C49F" : "transparent",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* ✅ MAIN CONTENT WITH FIXED SPACING */}
      <main style={styles.main}>{renderTab()}</main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    width: "100vw",   // ✅ FIXED
    minHeight: "100vh",
    background: "#f4f6f8",
    overflowX: "hidden", // ✅ Fix horizontal scroll
  },

  sidebar: {
    width: "240px",
    background: "#002b36",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "fixed", // stays fixed
    left: 0,
    top: 0,
    height: "100vh",
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
  },

  logo: {
    marginBottom: 20,
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },

  main: {
    marginLeft: "240px", // ✅ MUST be added for fixed sidebar
    width: "calc(100% - 240px)",
    padding: "30px",
    overflowY: "auto",
    overflowX: "hidden",
  },

  navBtn: {
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "8px",
    fontSize: "16px",
  },
};

export default AdvertiserPanel;
