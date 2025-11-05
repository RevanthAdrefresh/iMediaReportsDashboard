
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";
import axios from "axios";
import UserManagement from "./UserManagement";
import UploadedReports from "./UploadedReports";
import Settings from "./AdminSettings";
import AdminAnalytics from "./AdminAnalytics";
// AdminAnalytics
// UploadedReports
// UserManagement
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [newUser, setNewUser] = useState({ password:"",name: "", email: "", role: "publisher" });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [
      { id: 1, name: "John", email: "john@gmail.com", role: "publisher" },
      { id: 2, name: "Emma", email: "emma@ads.com", role: "advertiser" },
    ];
    const storedUploads = JSON.parse(localStorage.getItem("uploads")) || [];
    setUsers(storedUsers);
    setUploads(storedUploads);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("uploads", JSON.stringify(uploads));
  }, [users, uploads]);

  const chartData = [
    { date: "2025-10-01", impressions: 15838, clicks: 5, spend: 79 },
    { date: "2025-10-02", impressions: 7286, clicks: 1, spend: 36 },
    { date: "2025-10-03", impressions: 9990, clicks: 2, spend: 45 },
    { date: "2025-10-04", impressions: 5000, clicks: 4, spend: 50 },
  ];

  const handleAddUser = async() => {
   try {
    const userAdded=await axios.post("http://localhost:5000/api/signup",{
      name:newUser.name,
      password:newUser.password,
      role:newUser.role,
      email:newUser.email
    })
    console.log(userAdded);
    
   } catch (error) {
    console.log(error);
    
   }
  }

  const handleDeleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const handleUpload = () => {
    const name = prompt("Enter upload name:");
    if (name)
      setUploads([...uploads, { id: Date.now(), name, date: new Date().toLocaleDateString() }]);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Analytics":
        return (
          <div >
    <AdminAnalytics></AdminAnalytics>
          </div>
        );

      case "users":
        return (
          <div style={styles.card}>
            <h3>👥 User Management</h3>
            <div style={styles.formRow}>
             <UserManagement></UserManagement>
            </div>
          </div>
        );

      case "uploaded Reports":
        return (
          <div style={styles.card}>
           <UploadedReports></UploadedReports>
          </div>
        );

      case "moderation":
        return (
          <div style={styles.card}>
            <h3>📰 Content Moderation</h3>
            <p>Here you can approve or reject publisher uploads.</p>
            <ul>
              <li>
                Video 1 —{" "}
                <button style={styles.btnPrimary}>Approve</button>{" "}
                <button style={styles.btnDanger}>Reject</button>
              </li>
              <li>
                Video 2 —{" "}
                <button style={styles.btnPrimary}>Approve</button>{" "}
                <button style={styles.btnDanger}>Reject</button>
              </li>
            </ul>
          </div>
        );

      case "settings":
        return (
          
          <div >
            <div style={{marginBottom:"20%"}}>
           
           <Settings></Settings>
           </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <h2 style={{ color: "#fff", marginBottom: "20px" }}>Admin Panel</h2>
          {[ "users", "Analytics","uploaded Reports", "settings"].map((tab) => (
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
    </div>
  );
};

const styles = {
  wrapper: {
    width: "80vw",
    height: "100vh",
    padding: 0,
    // overflow: "hidden",
    background: "#f4f6f8",
  },
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "stretch",
  },
  sidebar: {
    width: "240px",
    background: "#002b36",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
  },
  main: {

    flex: 1,
    padding: "20px",
    // overflowY: "hidden",
  },
  navBtn: {
    color: "#fff",
    padding: "10px",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "8px",
    width: "100%",
    transition: "all 0.3s",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  formRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};

export default AdminPanel;
