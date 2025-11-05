// // // // // Bro gimme RealTime Related Comps About Publishers
// // // // // import React, { useState, useEffect } from "react";
// // // // // import {
// // // // //   ResponsiveContainer,
// // // // //   LineChart,
// // // // //   Line,
// // // // //   CartesianGrid,
// // // // //   XAxis,
// // // // //   YAxis,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // // } from "recharts";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const AdvertiserPanel = () => {
// // // // //   const [activeTab, setActiveTab] = useState("dashboard");
// // // // //   const [campaigns, setCampaigns] = useState([]);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const storedCampaigns = JSON.parse(localStorage.getItem("campaigns")) || [
// // // // //       { id: 1, name: "Campaign 1", platform: "YouTube", budget: 5000, spend: 3500 },
// // // // //       { id: 2, name: "Campaign 2", platform: "Instagram", budget: 4000, spend: 2200 },
// // // // //       { id: 3, name: "Campaign 3", platform: "OTT", budget: 6000, spend: 4250 },
// // // // //     ];
// // // // //     setCampaigns(storedCampaigns);
// // // // //   }, []);

// // // // //   const chartData = [
// // // // //     { date: "2025-10-01", impressions: 15838, clicks: 5, spend: 79 },
// // // // //     { date: "2025-10-02", impressions: 7286, clicks: 1, spend: 36 },
// // // // //     { date: "2025-10-03", impressions: 9990, clicks: 2, spend: 45 },
// // // // //     { date: "2025-10-04", impressions: 5000, clicks: 4, spend: 50 },
// // // // //   ];

// // // // //   const renderTab = () => {
// // // // //     switch (activeTab) {
// // // // //       case "dashboard":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>📈 Campaign Performance Overview</h3>
// // // // //             <ResponsiveContainer width="100%" height={350}>
// // // // //               <LineChart data={chartData}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="date" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Legend />
// // // // //                 <Line type="monotone" dataKey="impressions" stroke="#00C49F" name="Impressions" />
// // // // //                 <Line type="monotone" dataKey="spend" stroke="#ff6113" name="Spend ($)" />
// // // // //                 <Line type="monotone" dataKey="clicks" stroke="#002fff" name="Clicks" />
// // // // //               </LineChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>
// // // // //         );

// // // // //       case "campaigns":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>🎯 My Campaigns</h3>
// // // // //             <div style={styles.campaignGrid}>
// // // // //               {campaigns.map((c) => (
// // // // //                 <div key={c.id} style={styles.campaignCard} onClick={() => navigate(`/`)}>
// // // // //                   <h4>{c.name}</h4>
// // // // //                   <p>Platform: {c.platform}</p>
// // // // //                   <p>Budget: ${c.budget}</p>
// // // // //                   <p>Spent: ${c.spend}</p>
// // // // //                   <button style={styles.btnPrimary}>View Campaign</button>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         );

// // // // //       case "reports":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>📊 Reports & Insights</h3>
// // // // //             <p>Download campaign performance reports and audience insights here.</p>
// // // // //             <button style={styles.btnPrimary}>Download PDF Report</button>
// // // // //           </div>
// // // // //         );

// // // // //       case "settings":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>⚙️ Settings</h3>
// // // // //             <p>Manage your account, notifications, and billing preferences.</p>
// // // // //           </div>
// // // // //         );

// // // // //       default:
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.wrapper}>
// // // // //       <aside style={styles.sidebar}>
// // // // //         <h2 style={{ color: "#fff", marginBottom: "20px" }}>Advertiser Panel</h2>
// // // // //         {["dashboard", "campaigns", "reports", "settings"].map((tab) => (
// // // // //           <button
// // // // //             key={tab}
// // // // //             style={{
// // // // //               ...styles.navBtn,
// // // // //               background: activeTab === tab ? "#00C49F" : "transparent",
// // // // //             }}
// // // // //             onClick={() => setActiveTab(tab)}
// // // // //           >
// // // // //             {tab.charAt(0).toUpperCase() + tab.slice(1)}
// // // // //           </button>
// // // // //         ))}
// // // // //       </aside>

// // // // //       <main style={styles.main}>{renderTab()}</main>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // 💎 Internal CSS
// // // // // const styles = {
// // // // //   wrapper: {
// // // // //     display: "flex",
// // // // //     flexDirection: "row",
// // // // //     height: "100vh",
// // // // //     width: "80vw",
// // // // //     background: "#f4f6f8",
// // // // //     overflowX: "hidden",
// // // // //   },
// // // // //   sidebar: {
// // // // //     width: "240px",
// // // // //     background: "#002b36",
// // // // //     color: "#fff",
// // // // //     display: "flex",
// // // // //     flexDirection: "column",
// // // // //     alignItems: "flex-start",
// // // // //     padding: "20px",
// // // // //     position: "fixed",
// // // // //     left: 0,
// // // // //     top: 0,
// // // // //     bottom: 0,
// // // // //     boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
// // // // //   },
// // // // //   main: {
// // // // //     // marginLeft: "240px",
// // // // //     flex: 1,
// // // // //     padding: "30px",
// // // // //     overflowY: "auto",
// // // // //   },
// // // // //   navBtn: {
// // // // //     color: "#fff",
// // // // //     border: "none",
// // // // //     background: "transparent",
// // // // //     padding: "10px 12px",
// // // // //     borderRadius: "8px",
// // // // //     textAlign: "left",
// // // // //     width: "100%",
// // // // //     fontSize: "16px",
// // // // //     cursor: "pointer",
// // // // //     transition: "0.3s",
// // // // //   },
// // // // //   card: {
// // // // //     background: "#fff",
// // // // //     padding: "20px",
// // // // //     borderRadius: "12px",
// // // // //     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
// // // // //   },
// // // // //   campaignGrid: {
// // // // //     display: "grid",
// // // // //     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// // // // //     gap: "20px",
// // // // //     marginTop: "20px",
// // // // //   },
// // // // //   campaignCard: {
// // // // //     background: "#fff",
// // // // //     border: "1px solid #eee",
// // // // //     borderRadius: "10px",
// // // // //     padding: "15px",
// // // // //     boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
// // // // //     transition: "0.3s",
// // // // //     cursor: "pointer",
// // // // //   },
// // // // //   btnPrimary: {
// // // // //     background: "#00C49F",
// // // // //     color: "#fff",
// // // // //     border: "none",
// // // // //     padding: "8px 12px",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     marginTop: "10px",
// // // // //   },
// // // // // };

// // // // // export default AdvertiserPanel;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import {
// // // // //   ResponsiveContainer,
// // // // //   LineChart,
// // // // //   Line,
// // // // //   CartesianGrid,
// // // // //   XAxis,
// // // // //   YAxis,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // // } from "recharts";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const PublisherPanel = () => {
// // // // //   const [activeTab, setActiveTab] = useState("dashboard");
// // // // //   const [uploads, setUploads] = useState([]);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const storedUploads = JSON.parse(localStorage.getItem("publisherUploads")) || [
// // // // //       { id: 1, name: "Video Ad 1", platform: "YouTube", status: "Approved", revenue: 450 },
// // // // //       { id: 2, name: "Banner Placement 2", platform: "Website", status: "Pending", revenue: 300 },
// // // // //       { id: 3, name: "OTT Clip 3", platform: "OTT", status: "Running", revenue: 600 },
// // // // //     ];
// // // // //     setUploads(storedUploads);
// // // // //   }, []);

// // // // //   const chartData = [
// // // // //     { date: "2025-10-01", views: 5800, clicks: 45, revenue: 120 },
// // // // //     { date: "2025-10-02", views: 7900, clicks: 58, revenue: 200 },
// // // // //     { date: "2025-10-03", views: 9200, clicks: 70, revenue: 270 },
// // // // //     { date: "2025-10-04", views: 6000, clicks: 40, revenue: 140 },
// // // // //   ];

// // // // //   const renderTab = () => {
// // // // //     switch (activeTab) {
// // // // //       case "dashboard":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>📊 Performance Overview</h3>
// // // // //             <ResponsiveContainer width="100%" height={350}>
// // // // //               <LineChart data={chartData}>
// // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // //                 <XAxis dataKey="date" />
// // // // //                 <YAxis />
// // // // //                 <Tooltip />
// // // // //                 <Legend />
// // // // //                 <Line type="monotone" dataKey="views" stroke="#00C49F" name="Views" />
// // // // //                 <Line type="monotone" dataKey="clicks" stroke="#002fff" name="Clicks" />
// // // // //                 <Line type="monotone" dataKey="revenue" stroke="#ff6113" name="Revenue ($)" />
// // // // //               </LineChart>
// // // // //             </ResponsiveContainer>
// // // // //           </div>
// // // // //         );

// // // // //       case "uploads":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>🎥 My Uploads</h3>
// // // // //             <div style={styles.campaignGrid}>
// // // // //               {uploads.map((u) => (
// // // // //                 <div key={u.id} style={styles.campaignCard}>
// // // // //                   <h4>{u.name}</h4>
// // // // //                   <p>Platform: {u.platform}</p>
// // // // //                   <p>Status: {u.status}</p>
// // // // //                   <p>Earnings: ${u.revenue}</p>
// // // // //                   <button
// // // // //                     style={styles.btnPrimary}
// // // // //                     onClick={() => navigate(`/publisher/upload/${u.id}`)}
// // // // //                   >
// // // // //                     View Details
// // // // //                   </button>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         );

// // // // //       case "earnings":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>💰 Earnings Report</h3>
// // // // //             <p>View your total earnings from ads and placements.</p>
// // // // //             <table style={styles.table}>
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Date</th>
// // // // //                   <th>Platform</th>
// // // // //                   <th>Revenue ($)</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {chartData.map((d, i) => (
// // // // //                   <tr key={i}>
// // // // //                     <td>{d.date}</td>
// // // // //                     <td>{["YouTube", "OTT", "Web"][i % 3]}</td>
// // // // //                     <td>{d.revenue}</td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>
// // // // //         );

// // // // //       case "settings":
// // // // //         return (
// // // // //           <div style={styles.card}>
// // // // //             <h3>⚙️ Settings</h3>
// // // // //             <p>Manage your account, notifications, and withdrawal preferences.</p>
// // // // //           </div>
// // // // //         );

// // // // //       default:
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.wrapper}>
// // // // //       <aside style={styles.sidebar}>
// // // // //         <h2 style={{ color: "#fff", marginBottom: "20px" }}>Publisher Panel</h2>
// // // // //         {["dashboard", "uploads", "earnings", "settings"].map((tab) => (
// // // // //           <button
// // // // //             key={tab}
// // // // //             style={{
// // // // //               ...styles.navBtn,
// // // // //               background: activeTab === tab ? "#00C49F" : "transparent",
// // // // //             }}
// // // // //             onClick={() => setActiveTab(tab)}
// // // // //           >
// // // // //             {tab.charAt(0).toUpperCase() + tab.slice(1)}
// // // // //           </button>
// // // // //         ))}
// // // // //       </aside>

// // // // //       <main style={styles.main}>{renderTab()}</main>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // 💎 Internal CSS
// // // // // const styles = {
// // // // //   wrapper: {
// // // // //     display: "flex",
// // // // //     flexDirection: "row",
// // // // //     height: "100vh",
// // // // //     width: "100vw",
// // // // //     background: "#f4f6f8",
// // // // //     overflowX: "hidden",
// // // // //   },
// // // // //   sidebar: {
// // // // //     width: "240px",
// // // // //     background: "#002b36",
// // // // //     color: "#fff",
// // // // //     display: "flex",
// // // // //     flexDirection: "column",
// // // // //     alignItems: "flex-start",
// // // // //     padding: "20px",
// // // // //     position: "fixed",
// // // // //     left: 0,
// // // // //     top: 0,
// // // // //     bottom: 0,
// // // // //     boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
// // // // //   },
// // // // //   main: {
// // // // //     marginLeft: "240px",
// // // // //     flex: 1,
// // // // //     padding: "30px",
// // // // //     overflowY: "auto",
// // // // //   },
// // // // //   navBtn: {
// // // // //     color: "#fff",
// // // // //     border: "none",
// // // // //     background: "transparent",
// // // // //     padding: "10px 12px",
// // // // //     borderRadius: "8px",
// // // // //     textAlign: "left",
// // // // //     width: "100%",
// // // // //     fontSize: "16px",
// // // // //     cursor: "pointer",
// // // // //     transition: "0.3s",
// // // // //   },
// // // // //   card: {
// // // // //     background: "#fff",
// // // // //     padding: "20px",
// // // // //     borderRadius: "12px",
// // // // //     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
// // // // //   },
// // // // //   campaignGrid: {
// // // // //     display: "grid",
// // // // //     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// // // // //     gap: "20px",
// // // // //     marginTop: "20px",
// // // // //   },
// // // // //   campaignCard: {
// // // // //     background: "#fff",
// // // // //     border: "1px solid #eee",
// // // // //     borderRadius: "10px",
// // // // //     padding: "15px",
// // // // //     boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
// // // // //     transition: "0.3s",
// // // // //     cursor: "pointer",
// // // // //   },
// // // // //   btnPrimary: {
// // // // //     background: "#00C49F",
// // // // //     color: "#fff",
// // // // //     border: "none",
// // // // //     padding: "8px 12px",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     marginTop: "10px",
// // // // //   },
// // // // //   table: {
// // // // //     width: "100%",
// // // // //     borderCollapse: "collapse",
// // // // //     marginTop: "20px",
// // // // //   },
// // // // // };

// // // // // export default PublisherPanel;


// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   ResponsiveContainer,
// // // //   LineChart,
// // // //   Line,
// // // //   CartesianGrid,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   Legend,
// // // // } from "recharts";

// // // // const PublisherPanel = () => {
// // // //   const [activeTab, setActiveTab] = useState("dashboard");
// // // //   const [uploads, setUploads] = useState([]);
// // // //   const [activeUsers, setActiveUsers] = useState([]);

// // // //   useEffect(() => {
// // // //     setUploads([
// // // //       { id: 1, name: "YouTube Ad 1", platform: "YouTube", status: "Running", revenue: 420 },
// // // //       { id: 2, name: "Banner Ad 2", platform: "Website", status: "Pending", revenue: 310 },
// // // //       { id: 3, name: "OTT Spot 3", platform: "OTT", status: "Approved", revenue: 580 },
// // // //     ]);

// // // //     setActiveUsers([
// // // //       { id: 1, username: "john_publisher", lastActive: "2 mins ago", status: "Active" },
// // // //       { id: 2, username: "mediahub_pro", lastActive: "15 mins ago", status: "Idle" },
// // // //       { id: 3, username: "videozone", lastActive: "1 hour ago", status: "Active" },
// // // //     ]);
// // // //   }, []);

// // // //   const chartData = [
// // // //     { date: "Nov 1", views: 5600, clicks: 60, revenue: 180 },
// // // //     { date: "Nov 2", views: 6800, clicks: 70, revenue: 210 },
// // // //     { date: "Nov 3", views: 7200, clicks: 65, revenue: 190 },
// // // //     { date: "Nov 4", views: 8000, clicks: 90, revenue: 260 },
// // // //   ];

// // // //   const renderTab = () => {
// // // //     switch (activeTab) {
// // // //       case "dashboard":
// // // //         return (
// // // //           <div style={styles.card}>
// // // //             <h3>📊 Performance Overview</h3>
// // // //             <ResponsiveContainer width="100%" height={350}>
// // // //               <LineChart data={chartData}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="date" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Line type="monotone" dataKey="views" stroke="#00C49F" name="Views" />
// // // //                 <Line type="monotone" dataKey="clicks" stroke="#007BFF" name="Clicks" />
// // // //                 <Line type="monotone" dataKey="revenue" stroke="#FF6B35" name="Revenue ($)" />
// // // //               </LineChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         );

// // // //       case "uploads":
// // // //         return (
// // // //           <div style={styles.card}>
// // // //             <h3>🎬 Uploaded Campaigns</h3>
// // // //             <table style={styles.table}>
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>Name</th>
// // // //                   <th>Platform</th>
// // // //                   <th>Status</th>
// // // //                   <th>Revenue ($)</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {uploads.map((u) => (
// // // //                   <tr key={u.id}>
// // // //                     <td>{u.name}</td>
// // // //                     <td>{u.platform}</td>
// // // //                     <td>{u.status}</td>
// // // //                     <td>{u.revenue}</td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         );

// // // //       case "earnings":
// // // //         return (
// // // //           <div style={styles.card}>
// // // //             <h3>💰 Earnings Summary</h3>
// // // //             <table style={styles.table}>
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>Date</th>
// // // //                   <th>Platform</th>
// // // //                   <th>Revenue ($)</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {chartData.map((d, i) => (
// // // //                   <tr key={i}>
// // // //                     <td>{d.date}</td>
// // // //                     <td>{["YouTube", "OTT", "Website"][i % 3]}</td>
// // // //                     <td>{d.revenue}</td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         );

// // // //       case "users":
// // // //         return (
// // // //           <div style={styles.card}>
// // // //             <h3>👥 Active Users Log</h3>
// // // //             <table style={styles.table}>
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>Username</th>
// // // //                   <th>Last Active</th>
// // // //                   <th>Status</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {activeUsers.map((user) => (
// // // //                   <tr key={user.id}>
// // // //                     <td>{user.username}</td>
// // // //                     <td>{user.lastActive}</td>
// // // //                     <td style={{ color: user.status === "Active" ? "green" : "orange" }}>
// // // //                       {user.status}
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //         );

// // // //       default:
// // // //         return



// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   ResponsiveContainer,
// // //   LineChart,
// // //   Line,
// // //   CartesianGrid,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // // } from "recharts";

// // // const PublisherPanel = () => {
// // //   const [activeTab, setActiveTab] = useState("dashboard");
// // //   const [uploads, setUploads] = useState([]);
// // //   const [settings, setSettings] = useState({
// // //     notifications: true,
// // //     darkMode: false,
// // //     payoutThreshold: 100,
// // //   });

// // //   useEffect(() => {
// // //     setUploads([
// // //       { id: 1, name: "YouTube Ad 1", platform: "YouTube", status: "Running", revenue: 420 },
// // //       { id: 2, name: "Banner Ad 2", platform: "Website", status: "Pending", revenue: 310 },
// // //       { id: 3, name: "OTT Spot 3", platform: "OTT", status: "Approved", revenue: 580 },
// // //     ]);
// // //   }, []);

// // //   const chartData = [
// // //     { date: "Nov 1", views: 5600, clicks: 60, revenue: 180 },
// // //     { date: "Nov 2", views: 6800, clicks: 70, revenue: 210 },
// // //     { date: "Nov 3", views: 7200, clicks: 65, revenue: 190 },
// // //     { date: "Nov 4", views: 8000, clicks: 90, revenue: 260 },
// // //   ];

// // //   const handleSettingChange = (field) => {
// // //     setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
// // //   };

// // //   const renderTab = () => {
// // //     switch (activeTab) {
// // //       case "dashboard":
// // //         return (
// // //           <div style={styles.card}>
// // //             <h3>📊 Performance Overview</h3>
// // //             <ResponsiveContainer width="100%" height={350}>
// // //               <LineChart data={chartData}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="date" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Line type="monotone" dataKey="views" stroke="#00C49F" name="Views" />
// // //                 <Line type="monotone" dataKey="clicks" stroke="#007BFF" name="Clicks" />
// // //                 <Line type="monotone" dataKey="revenue" stroke="#FF6B35" name="Revenue ($)" />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         );

// // //       case "uploads":
// // //         return (
// // //           <div style={styles.card}>
// // //             <h3>🎬 Uploaded Campaigns</h3>
// // //             <table style={styles.table}>
// // //               <thead>
// // //                 <tr>
// // //                   <th>Campaign</th>
// // //                   <th>Platform</th>
// // //                   <th>Status</th>
// // //                   <th>Revenue ($)</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {uploads.map((u) => (
// // //                   <tr key={u.id}>
// // //                     <td>{u.name}</td>
// // //                     <td>{u.platform}</td>
// // //                     <td>{u.status}</td>
// // //                     <td>{u.revenue}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         );

// // //       case "earnings":
// // //         return (
// // //           <div style={styles.card}>
// // //             <h3>💰 Earnings Summary</h3>
// // //             <table style={styles.table}>
// // //               <thead>
// // //                 <tr>
// // //                   <th>Date</th>
// // //                   <th>Platform</th>
// // //                   <th>Revenue ($)</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {chartData.map((d, i) => (
// // //                   <tr key={i}>
// // //                     <td>{d.date}</td>
// // //                     <td>{["YouTube", "OTT", "Website"][i % 3]}</td>
// // //                     <td>{d.revenue}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         );

// // //       case "settings":
// // //         return (
// // //           <div style={styles.card}>
// // //             <h3>⚙️ Account Settings</h3>
// // //             <div style={styles.settingRow}>
// // //               <label>Enable Notifications</label>
// // //               <input
// // //                 type="checkbox"
// // //                 checked={settings.notifications}
// // //                 onChange={() => handleSettingChange("notifications")}
// // //               />
// // //             </div>
// // //             <div style={styles.settingRow}>
// // //               <label>Dark Mode</label>
// // //               <input
// // //                 type="checkbox"
// // //                 checked={settings.darkMode}
// // //                 onChange={() => handleSettingChange("darkMode")}
// // //               />
// // //             </div>
// // //             <div style={styles.settingRow}>
// // //               <label>Payout Threshold ($)</label>
// // //               <input
// // //                 type="number"
// // //                 value={settings.payoutThreshold}
// // //                 onChange={(e) =>
// // //                   setSettings({ ...settings, payoutThreshold: e.target.value })
// // //                 }
// // //                 style={styles.input}
// // //               />
// // //             </div>
// // //             <button style={styles.saveBtn}>Save Settings</button>
// // //           </div>
// // //         );

// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.wrapper}>
// // //       <aside style={styles.sidebar}>
// // //         <h2 style={styles.logo}>Publisher Panel</h2>
// // //         {["dashboard", "uploads", "earnings", "settings"].map((tab) => (
// // //           <button
// // //             key={tab}
// // //             style={{
// // //               ...styles.navBtn,
// // //               background: activeTab === tab ? "#00C49F" : "transparent",
// // //             }}
// // //             onClick={() => setActiveTab(tab)}
// // //           >
// // //             {tab.charAt(0).toUpperCase() + tab.slice(1)}
// // //           </button>
// // //         ))}
// // //       </aside>

// // //       <main style={styles.main}>{renderTab()}</main>
// // //     </div>
// // //   );
// // // };

// // // // Internal Styles
// // // const styles = {
// // //   wrapper: {
// // //     display: "flex",
// // //     flexDirection: "row",
// // //     height: "100vh",
// // //     background: "#f4f6f8",
// // //     overflowX: "hidden",
// // //   },
// // //   sidebar: {
// // //     width: "240px",
// // //     background: "#002b36",
// // //     color: "#fff",
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     alignItems: "flex-start",
// // //     padding: "20px",
// // //     position: "fixed",
// // //     left: 0,
// // //     top: 0,
// // //     bottom: 0,
// // //   },
// // //   main: {
// // //     marginLeft: "240px",
// // //     flex: 1,
// // //     padding: "30px",
// // //     overflowY: "auto",
// // //   },
// // //   logo: {
// // //     color: "#fff",
// // //     marginBottom: "20px",
// // //     fontSize: "20px",
// // //   },
// // //   navBtn: {
// // //     color: "#fff",
// // //     border: "none",
// // //     background: "transparent",
// // //     padding: "10px 12px",
// // //     borderRadius: "8px",
// // //     textAlign: "left",
// // //     width: "100%",
// // //     fontSize: "16px",
// // //     cursor: "pointer",
// // //     marginBottom: "8px",
// // //     transition: "0.3s",
// // //   },
// // //   card: {
// // //     background: "#fff",
// // //     padding: "20px",
// // //     borderRadius: "12px",
// // //     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //     marginTop: "15px",
// // //   },
// // //   th: {
// // //     background: "#f0f0f0",
// // //   },
// // //   td: {
// // //     border: "1px solid #ddd",
// // //     padding: "10px",
// // //     textAlign: "center",
// // //   },
// // //   settingRow: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     borderBottom: "1px solid #ddd",
// // //     padding: "10px 0",
// // //   },
// // //   input: {
// // //     padding: "6px",
// // //     borderRadius: "6px",
// // //     border: "1px solid #ccc",
// // //     width: "80px",
// // //   },
// // //   saveBtn: {
// // //     background: "#00C49F",
// // //     color: "#fff",
// // //     border: "none",
// // //     padding: "10px 18px",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     marginTop: "15px",
// // //   },
// // // };

// // // export default PublisherPanel;

// // import React, { useState } from "react";

// // const PublisherPanel = () => {
// //   const [activeTab, setActiveTab] = useState("dashboard");

// //   const earnings = [
// //     { date: "Nov 1", platform: "YouTube", revenue: 180 },
// //     { date: "Nov 2", platform: "OTT", revenue: 210 },
// //     { date: "Nov 3", platform: "Website", revenue: 190 },
// //     { date: "Nov 4", platform: "YouTube", revenue: 260 },
// //   ];

// //   const uploads = [
// //     { name: "Tech Trends", views: "12,000", clicks: "320", ctr: "2.6%", revenue: "$850" },
// //     { name: "FinanceWall", views: "9,800", clicks: "210", ctr: "2.1%", revenue: "$620" },
// //     { name: "Foodies Hub", views: "15,000", clicks: "480", ctr: "3.1%", revenue: "$1020" },
// //   ];

// //   const renderTable = (data, columns) => (
// //     <div style={styles.tableWrapper}>
// //       <table style={styles.table}>
// //         <thead>
// //           <tr>
// //             {columns.map((col) => (
// //               <th key={col}>{col}</th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((row, i) => (
// //             <tr key={i}>
// //               {Object.values(row).map((cell, j) => (
// //                 <td key={j}>{cell}</td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case "dashboard":
// //         return (
// //           <div style={styles.card}>
// //             <h3>📊 Publisher Performance</h3>
// //             {renderTable(uploads, ["Publisher", "Views", "Clicks", "CTR (%)", "Revenue ($)"])}
// //           </div>
// //         );

// //       case "uploads":
// //         return (
// //           <div style={styles.card}>
// //             <h3>📁 Uploaded Campaigns</h3>
// //             {renderTable(uploads, ["Campaign", "Views", "Clicks", "CTR (%)", "Revenue ($)"])}
// //           </div>
// //         );

// //       case "earnings":
// //         return (
// //           <div style={styles.card}>
// //             <h3>💰 Earnings Summary</h3>
// //             {renderTable(earnings, ["Date", "Platform", "Revenue ($)"])}
// //           </div>
// //         );

// //       case "settings":
// //         return (
// //           <div style={styles.card}>
// //             <h3>⚙️ Settings</h3>
// //             <p>Manage preferences, notifications, and payouts.</p>
// //           </div>
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div style={styles.wrapper}>
// //       <aside style={styles.sidebar}>
// //         <h2 style={styles.logo}>Publisher Panel</h2>
// //         {["dashboard", "uploads", "earnings", "settings"].map((tab) => (
// //           <button
// //             key={tab}
// //             style={{
// //               ...styles.navBtn,
// //               background: activeTab === tab ? "#00C49F" : "transparent",
// //             }}
// //             onClick={() => setActiveTab(tab)}
// //           >
// //             {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //           </button>
// //         ))}
// //       </aside>

// //       <main style={styles.main}>{renderContent()}</main>
// //     </div>
// //   );
// // };

// // const styles = {
// //   wrapper: {
// //     display: "flex",
// //     height: "100vh",
// //     margin: 0,
// //     background: "#f5f7fa",
// //     fontFamily: "Inter, sans-serif",
// //   },
// //   sidebar: {
// //     width: "240px",
// //     background: "#012b36",
// //     color: "#fff",
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "flex-start",
// //     padding: "20px",
// //     position: "fixed",
// //     top: 0,
// //     bottom: 0,
// //   },
// //   logo: {
// //     fontSize: "20px",
// //     marginBottom: "25px",
// //   },
// //   navBtn: {
// //     color: "#fff",
// //     border: "none",
// //     background: "transparent",
// //     padding: "10px 15px",
// //     borderRadius: "6px",
// //     textAlign: "left",
// //     width: "100%",
// //     fontSize: "15px",
// //     cursor: "pointer",
// //     marginBottom: "8px",
// //     transition: "0.3s",
// //   },
// //   main: {
// //     marginLeft: "240px",
// //     flex: 1,
// //     padding: "40px",
// //     overflowY: "auto",
// //   },
// //   card: {
// //     background: "#fff",
// //     padding: "25px",
// //     borderRadius: "12px",
// //     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
// //   },
// //   tableWrapper: {
// //     overflowX: "auto",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     marginTop: "15px",
// //     border: "1px solid #ddd",
// //   },
// //   th: {
// //     background: "#f1f1f1",
// //     textAlign: "left",
// //     padding: "12px",
// //     border: "1px solid #ddd",
// //   },
// //   td: {
// //     padding: "12px",
// //     border: "1px solid #ddd",
// //     textAlign: "left",
// //   },
// //   "@media (max-width: 768px)": {
// //     sidebar: {
// //       width: "100%",
// //       height: "auto",
// //       flexDirection: "row",
// //       justifyContent: "space-around",
// //       position: "relative",
// //     },
// //     main: {
// //       marginLeft: 0,
// //       padding: "20px",
// //     },
// //   },
// // };

// // export default PublisherPanel;


// import React, { useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const PublisherPanel = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const COLORS = ["#00C49F", "#FFBB28", "#0088FE"];

//   const performanceData = [
//     { name: "Tech Trends", views: 12000, clicks: 320, ctr: 2.6, revenue: 850 },
//     { name: "FinanceWall", views: 9800, clicks: 210, ctr: 2.1, revenue: 620 },
//     { name: "Foodies Hub", views: 15000, clicks: 480, ctr: 3.1, revenue: 1020 },
//   ];

//   const earningsData = [
//     { date: "Nov 1", platform: "YouTube", revenue: 180 },
//     { date: "Nov 2", platform: "OTT", revenue: 210 },
//     { date: "Nov 3", platform: "Website", revenue: 190 },
//     { date: "Nov 4", platform: "YouTube", revenue: 260 },
//   ];

//   const renderDashboard = () => (
//     <div style={styles.dashboardGrid}>
//       <div style={styles.card}>
//         <h3>📊 Publisher Performance</h3>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Publisher</th>
//               <th>Views</th>
//               <th>Clicks</th>
//               <th>CTR (%)</th>
//               <th>Revenue ($)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {performanceData.map((row, i) => (
//               <tr key={i}>
//                 <td>{row.name}</td>
//                 <td>{row.views.toLocaleString()}</td>
//                 <td>{row.clicks}</td>
//                 <td>{row.ctr}</td>
//                 <td>${row.revenue}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={styles.chartRow}>
//         <div style={{ ...styles.card, flex: 1 }}>
//           <h3>💰 Revenue Distribution</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={performanceData}
//                 dataKey="revenue"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label
//               >
//                 {performanceData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div style={{ ...styles.card, flex: 1 }}>
//           <h3>📈 Views vs Clicks</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="views" fill="#0088FE" />
//               <Bar dataKey="clicks" fill="#00C49F" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );

//   const renderUploads = () => (
//     <div style={styles.card}>
//       <h3>📁 Uploaded Campaigns</h3>
//       {renderTable(performanceData, ["Campaign", "Views", "Clicks", "CTR (%)", "Revenue ($)"])}
//     </div>
//   );

//   const renderEarnings = () => (
//     <div style={styles.card}>
//       <h3>💰 Earnings Summary</h3>
//       {renderTable(earningsData, ["Date", "Platform", "Revenue ($)"])}
//     </div>
//   );

//   const renderSettings = () => (
//     <div style={styles.card}>
//       <h3>⚙️ Settings</h3>
//       <p>Manage preferences, notifications, and payout methods here.</p>
//     </div>
//   );

//   const renderTable = (data, columns) => (
//     <div style={styles.tableWrapper}>
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i}>
//               {Object.values(row).map((cell, j) => (
//                 <td key={j}>{cell}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div style={styles.wrapper}>
//       <aside style={styles.sidebar}>
//         <h2 style={styles.logo}>Publisher Panel</h2>
//         {["dashboard", "uploads", "earnings", "settings"].map((tab) => (
//           <button
//             key={tab}
//             style={{
//               ...styles.navBtn,
//               background: activeTab === tab ? "#00C49F" : "transparent",
//             }}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </aside>

//       <main style={styles.main}>
//         {activeTab === "dashboard" && renderDashboard()}
//         {activeTab === "uploads" && renderUploads()}
//         {activeTab === "earnings" && renderEarnings()}
//         {activeTab === "settings" && renderSettings()}
//       </main>
//     </div>
//   );
// };

// const styles = {
//   wrapper: {
//     display: "flex",
//     height: "100vh",
//     background: "#f4f6f8",
//     margin: 0,
//     fontFamily: "Inter, sans-serif",
//   },
//   sidebar: {
//     width: "240px",
//     background: "#002b36",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: "20px",
//     position: "fixed",
//     top: 0,
//     bottom: 0,
//   },
//   logo: {
//     fontSize: "20px",
//     marginBottom: "25px",
//   },
//   navBtn: {
//     color: "#fff",
//     border: "none",
//     background: "transparent",
//     padding: "10px 15px",
//     borderRadius: "6px",
//     textAlign: "left",
//     width: "100%",
//     fontSize: "15px",
//     cursor: "pointer",
//     marginBottom: "8px",
//     transition: "0.3s",
//   },
//   main: {
//     marginLeft: "240px",
//     flex: 1,
//     padding: "30px",
//     overflowY: "auto",
//   },
//   dashboardGrid: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//   },
//   chartRow: {
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap",
//   },
//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
//     flex: 1,
//   },
//   tableWrapper: {
//     overflowX: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "15px",
//   },
//   th: {
//     border: "1px solid #ddd",
//     background: "#f8f8f8",
//     padding: "10px",
//     textAlign: "left",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     textAlign: "left",
//   },
// };

// export default PublisherPanel;


import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PublisherPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const COLORS = ["#00C49F", "#FFBB28", "#0088FE"];

  const performanceData = [
    { name: "Tech Trends", views: 12000, clicks: 320, ctr: 2.6, revenue: 850 },
    { name: "FinanceWall", views: 9800, clicks: 210, ctr: 2.1, revenue: 620 },
    { name: "Foodies Hub", views: 15000, clicks: 480, ctr: 3.1, revenue: 1020 },
  ];

  const earningsData = [
    { date: "Nov 1", platform: "YouTube", revenue: 180 },
    { date: "Nov 2", platform: "OTT", revenue: 210 },
    { date: "Nov 3", platform: "Website", revenue: 190 },
    { date: "Nov 4", platform: "YouTube", revenue: 260 },
  ];

  const renderDashboard = () => (
    <div style={styles.dashboardGrid}>
      <div style={styles.card}>
        <h3>📊 Publisher Performance</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Publisher</th>
              <th>Views</th>
              <th>Clicks</th>
              <th>CTR (%)</th>
              <th>Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.views.toLocaleString()}</td>
                <td>{row.clicks}</td>
                <td>{row.ctr}</td>
                <td>${row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.chartRow}>
        <div style={{ ...styles.card, flex: 1 }}>
          <h3>💰 Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={performanceData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...styles.card, flex: 1 }}>
          <h3>📈 Views vs Clicks</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#0088FE" />
              <Bar dataKey="clicks" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderUploads = () => (
    <div style={styles.card}>
      <h3>📁 Uploaded Campaigns</h3>
      {renderTable(performanceData, ["Campaign", "Views", "Clicks", "CTR (%)", "Revenue ($)"])}
    </div>
  );

  const renderEarnings = () => (
    <div style={styles.card}>
      <h3>💰 Earnings Summary</h3>
      {renderTable(earningsData, ["Date", "Platform", "Revenue ($)"])}
    </div>
  );

  const renderSettings = () => (
    <div style={styles.card}>
      <h3>⚙️ Settings</h3>
      <p>Manage preferences, notifications, and payout methods here.</p>
    </div>
  );

  const renderTable = (data, columns) => (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Publisher Panel</h2>
        {["dashboard", "uploads", "earnings", "settings"].map((tab) => (
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

      <main style={styles.main}>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "uploads" && renderUploads()}
        {activeTab === "earnings" && renderEarnings()}
        {activeTab === "settings" && renderSettings()}
      </main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    background: "#f4f6f8",
    margin: 0,
    fontFamily: "Inter, sans-serif",
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
    top: 0,
    bottom: 0,
  },
  logo: {
    fontSize: "20px",
    marginBottom: "25px",
  },
  navBtn: {
    color: "#fff",
    border: "none",
    background: "transparent",
    padding: "10px 15px",
    borderRadius: "6px",
    textAlign: "left",
    width: "100%",
    fontSize: "15px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  },
  main: {
    marginLeft: "240px",
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  dashboardGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  chartRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    flex: 1,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  th: {
    border: "1px solid #ddd",
    background: "#f8f8f8",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
};

export default PublisherPanel;
