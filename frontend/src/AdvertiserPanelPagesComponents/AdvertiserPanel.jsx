import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MainDashboard from "./RealDashBoard";
import Summary from "./Summary";
import OttReport from "./OttReport";
import AdWidget from "./Advertise";
import VideoReport from "./NewVideoReport";
// VideoReport
// AdWidget
// SummaryReport
// MainDashboard
// MainDashBoard

const AdvertiserPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploads, setUploads] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // Dummy Analytics Data
  const performanceData = [
    { date: "2025-10-01", views: 5800, clicks: 45, revenue: 120 },
    { date: "2025-10-02", views: 7900, clicks: 58, revenue: 200 },
    { date: "2025-10-03", views: 9200, clicks: 70, revenue: 270 },
    { date: "2025-10-04", views: 6000, clicks: 40, revenue: 140 },
  ];

  // Dummy Pie (earnings breakdown)
  const pieData = [
    { name: "Video Ads", value: 600 },
    { name: "Banners", value: 300 },
    { name: "Affiliate", value: 150 },
  ];
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  // Load from localStorage
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("publisherUploads")) || [];
    const storedFeedback = JSON.parse(localStorage.getItem("publisherFeedback")) || [];
    setUploads(storedUploads);
    setFeedback(storedFeedback);
  }, []);

  useEffect(() => {
    localStorage.setItem("publisherUploads", JSON.stringify(uploads));
    localStorage.setItem("publisherFeedback", JSON.stringify(feedback));
  }, [uploads, feedback]);

  // Upload new video
  const handleUpload = () => {
    const name = prompt("Enter Video Name:");
    if (!name) return;
    const newUpload = {
      id: Date.now(),
      name,
      date: new Date().toLocaleDateString(),
      status: "Pending Approval",
    };
    setUploads([...uploads, newUpload]);
  };

  // Remove upload
  const handleDelete = (id) => setUploads(uploads.filter((u) => u.id !== id));

  // Add feedback
  const handleFeedback = () => {
    const text = prompt("Enter feedback or query:");
    if (!text) return;
    const newFb = {
      id: Date.now(),
      text,
      date: new Date().toLocaleDateString(),
    };
    setFeedback([...feedback, newFb]);
  };

  // Render active tab
  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div style={styles.card}>
<Summary></Summary>
          </div>
        );

      case "OTT":
        return (
          <div style={styles.card}>
        <OttReport></OttReport>
          </div>
        );

      case "uploads":
        return (
          <div style={styles.card}>
        <MainDashboard></MainDashboard>
          </div>
        );

      case "Ad Widget":
        return (
          <div style={styles.card}>
          <AdWidget></AdWidget>
          </div>
        );

      case "Video Report":
        return (
          <div style={styles.card}>
          <VideoReport></VideoReport>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={{ color: "#fff", marginBottom: 20 }}>Advertiser Panel</h2>
        {[ "overview","OTT", "uploads", "Video Report", "Ad Widget"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.navBtn,
              background: activeTab === tab ? "#00C49F" : "transparent",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </aside>

      <main style={styles.main}>{renderTab()}</main>
    </div>
  );
};

// 🎨 Internal CSS
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "80vw",
    height: "100vh",
    background: "#f4f6f8",
    overflow: "hidden",
  },
  sidebar: {
    width: "240px",
    background: "#002b36",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
  },
  main: {
    // marginLeft: "240px",
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  navBtn: {
    color: "#fff",
    border: "none",
    background: "transparent",
    padding: "10px 12px",
    borderRadius: "8px",
    textAlign: "left",
    width: "100%",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  btnPrimary: {
    background: "#00C49F",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  btnDanger: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdvertiserPanel;
