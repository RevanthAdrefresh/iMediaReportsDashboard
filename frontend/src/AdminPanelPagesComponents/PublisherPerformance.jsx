// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import {
// // // //   PieChart,
// // // //   Pie,
// // // //   Cell,
// // // //   ResponsiveContainer,
// // // //   BarChart,
// // // //   Bar,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   Legend,
// // // // } from "recharts";

// // // // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// // // // const PublisherPerformance = () => {
// // // //   const [data, setData] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// // // //         if (!token) return console.error("Missing token");
// // // //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });

// // // //         const allData = res.data || [];
// // // //         const grouped = {};

// // // //         // Group by publisher _id
// // // //         allData.forEach((item) => {
// // // //           const id = item._id || item.publisherId || "unknown";
// // // //           if (!grouped[id]) {
// // // //             grouped[id] = {
// // // //               name: item.publisherName || "Unknown Publisher",
// // // //               views: 0,
// // // //               clicks: 0,
// // // //               cpm: Number(item.CPM) || 0,
// // // //             };
// // // //           }
// // // //           grouped[id].views += Number(item.Impressions) || 0;
// // // //           grouped[id].clicks += Number(item.Clicks) || 0;
// // // //         });

// // // //         // Calculate CTR and Revenue (CPM based)
// // // //         const formatted = Object.values(grouped).map((pub) => {
// // // //           const ctr = pub.views ? ((pub.clicks / pub.views) * 100).toFixed(2) : 0;
// // // //           const revenue = (pub.views / 1000) * pub.cpm;
// // // //           return { ...pub, ctr, revenue: revenue.toFixed(2) };
// // // //         });

// // // //         setData(formatted);
// // // //       } catch (err) {
// // // //         console.error("Error fetching data:", err);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   return (
// // // //     <div style={styles.main}>
// // // //       <h2 style={styles.title}>Publisher Performance Dashboard</h2>
// // // //       <div style={styles.grid}>
// // // //         {/* Table */}
// // // //         <div style={styles.card}>
// // // //           <h3>📊 Publisher Performance</h3>
// // // //           <table style={styles.table}>
// // // //             <thead>
// // // //               <tr>
// // // //                 <th>Publisher</th>
// // // //                 <th>Views</th>
// // // //                 <th>Clicks</th>
// // // //                 <th>CTR (%)</th>
// // // //                 <th>Revenue ($)</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data.map((d, i) => (
// // // //                 <tr key={i}>
// // // //                   <td>{d.name}</td>
// // // //                   <td>{d.views.toLocaleString()}</td>
// // // //                   <td>{d.clicks.toLocaleString()}</td>
// // // //                   <td>{d.ctr}</td>
// // // //                   <td>${d.revenue}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>

// // // //         {/* Pie Chart */}
// // // //         <div style={styles.card}>
// // // //           <h3>💰 Revenue Distribution</h3>
// // // //           <div style={{ height: 300 }}>
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <PieChart>
// // // //                 <Pie
// // // //                   data={data}
// // // //                   dataKey="revenue"
// // // //                   nameKey="name"
// // // //                   cx="50%"
// // // //                   cy="50%"
// // // //                   innerRadius={60}
// // // //                   outerRadius={100}
// // // //                   label
// // // //                 >
// // // //                   {data.map((_, i) => (
// // // //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// // // //                   ))}
// // // //                 </Pie>
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //               </PieChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </div>

// // // //         {/* Bar Chart */}
// // // //         <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
// // // //           <h3>📈 Views vs Clicks</h3>
// // // //           <div style={{ height: 320 }}>
// // // //             <ResponsiveContainer width="100%" height="100%">
// // // //               <BarChart data={data}>
// // // //                 <XAxis dataKey="name" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Bar dataKey="views" fill="#0088FE" />
// // // //                 <Bar dataKey="clicks" fill="#00C49F" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const styles = {
// // // //   main: {
// // // //     padding: "40px",
// // // //     maxWidth: "1200px",
// // // //     margin: "auto",
// // // //     backgroundColor: "#f3f4f6",
// // // //     fontFamily: "Arial, sans-serif",
// // // //   },
// // // //   title: {
// // // //     fontSize: "26px",
// // // //     fontWeight: "bold",
// // // //     marginBottom: "25px",
// // // //     color: "#111827",
// // // //     textAlign: "center",
// // // //   },
// // // //   grid: {
// // // //     display: "grid",
// // // //     gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
// // // //     gap: "20px",
// // // //   },
// // // //   card: {
// // // //     backgroundColor: "#fff",
// // // //     borderRadius: "12px",
// // // //     padding: "20px",
// // // //     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// // // //     border: "1px solid #e5e7eb",
// // // //   },
// // // //   table: {
// // // //     width: "100%",
// // // //     borderCollapse: "collapse",
// // // //     fontSize: "14px",
// // // //   },
// // // //   th: {
// // // //     border: "1px solid #e5e7eb",
// // // //     padding: "10px",
// // // //     textAlign: "left",
// // // //     backgroundColor: "#f3f4f6",
// // // //   },
// // // //   td: {
// // // //     border: "1px solid #e5e7eb",
// // // //     padding: "10px",
// // // //   },
// // // // };

// // // // export default PublisherPerformance;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import {
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   ResponsiveContainer,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // // } from "recharts";

// // // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// // // const PublisherPerformance = () => {
// // //   const [data, setData] = useState([]);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// // //         if (!token) {
// // //           console.error("Missing token");
// // //           return;
// // //         }

// // //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });

// // //         const allData = Array.isArray(res.data?.data)
// // //           ? res.data.data
// // //           : Array.isArray(res.data)
// // //           ? res.data
// // //           : [];

// // //         const grouped = {};

// // //         allData.forEach((publisherBlock) => {
// // //           const publisherId = publisherBlock.uploadedBy || "unknown";
// // //           const publisherName =
// // //             publisherBlock.publisherName ||
// // //             publisherBlock.uploadedBy ||
// // //             "Unknown Publisher";

// // //           if (!grouped[publisherId]) {
// // //             grouped[publisherId] = {
// // //               name: publisherName,
// // //               views: 0,
// // //               clicks: 0,
// // //               totalCPM: 0,
// // //               totalRevenue: 0,
// // //               validEntries: 0,
// // //             };
// // //           }

// // //           (publisherBlock.data || []).forEach((row) => {
// // //             if (typeof row !== "object" || row === null) return;

// // //             const normalized = Object.fromEntries(
// // //               Object.entries(row).map(([key, value]) => [
// // //                 key.trim().toLowerCase(),
// // //                 value,
// // //               ])
// // //             );

// // //             const views =
// // //               parseFloat(normalized.impressions) ||
// // //               parseFloat(normalized["impression"]) ||
// // //               0;
// // //             const clicks =
// // //               parseFloat(normalized.clicks) ||
// // //               parseFloat(normalized["click"]) ||
// // //               0;
// // //             let cpm =
// // //               parseFloat(normalized.cpm) ||
// // //               parseFloat(normalized["cost per mille"]) ||
// // //               0;
// // //             let revenue =
// // //               parseFloat(normalized.revenue) ||
// // //               parseFloat(normalized["rev"]) ||
// // //               0;

// // //             // Fallback random CPM or CPC
// // //             if (!cpm) {
// // //               cpm = Math.random() * (10 - 1) + 1; // random $1-$10
// // //             }

// // //             if (!revenue) {
// // //               if (views > 0) {
// // //                 revenue = (views / 1000) * cpm;
// // //               } else if (clicks > 0) {
// // //                 const cpc = Math.random() * (1 - 0.1) + 0.1; // random $0.1-$1
// // //                 revenue = clicks * cpc;
// // //               }
// // //             }

// // //             grouped[publisherId].views += views;
// // //             grouped[publisherId].clicks += clicks;
// // //             grouped[publisherId].totalCPM += cpm;
// // //             grouped[publisherId].totalRevenue += revenue;
// // //             grouped[publisherId].validEntries += 1;
// // //           });
// // //         });

// // //         const formatted = Object.values(grouped).map((pub) => {
// // //           const avgCPM = pub.validEntries
// // //             ? pub.totalCPM / pub.validEntries
// // //             : 0;
// // //           const ctr = pub.views
// // //             ? ((pub.clicks / pub.views) * 100).toFixed(2)
// // //             : "0.00";
// // //           const revenue =
// // //             pub.totalRevenue ||
// // //             ((pub.views / 1000) * avgCPM * pub.validEntries) / 1;

// // //           return {
// // //             name: pub.name,
// // //             views: pub.views,
// // //             clicks: pub.clicks,
// // //             ctr,
// // //             revenue: parseFloat(revenue.toFixed(2)),
// // //           };
// // //         });

// // //         setData(formatted);
// // //       } catch (err) {
// // //         console.error("Error fetching data:", err);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   return (
// // //     <div style={styles.main}>
// // //       <h2 style={styles.title}>Publisher Performance Dashboard</h2>
// // //       <div style={styles.grid}>
// // //         {/* Table */}
// // //         <div style={styles.card}>
// // //           <h3>📊 Publisher Performance</h3>
// // //           <table style={styles.table}>
// // //             <thead>
// // //               <tr>
// // //                 <th style={styles.th}>Publisher</th>
// // //                 <th style={styles.th}>Views</th>
// // //                 <th style={styles.th}>Clicks</th>
// // //                 <th style={styles.th}>CTR (%)</th>
// // //                 <th style={styles.th}>Revenue ($)</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {data.length > 0 ? (
// // //                 data.map((d, i) => (
// // //                   <tr key={i}>
// // //                     <td style={styles.cell}>{d.name}</td>
// // //                     <td style={styles.cell}>{d.views.toLocaleString()}</td>
// // //                     <td style={styles.cell}>{d.clicks.toLocaleString()}</td>
// // //                     <td style={styles.cell}>{d.ctr}</td>
// // //                     <td style={styles.cell}>${d.revenue.toLocaleString()}</td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td colSpan="5" style={{ textAlign: "center" }}>
// // //                     No data available
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Pie Chart */}
// // //         <div style={styles.card}>
// // //           <h3>💰 Revenue Distribution</h3>
// // //           <div style={{ height: 300 }}>
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <PieChart>
// // //                 <Pie
// // //                   data={data}
// // //                   dataKey="revenue"
// // //                   nameKey="name"
// // //                   cx="50%"
// // //                   cy="50%"
// // //                   outerRadius={100}
// // //                   label
// // //                 >
// // //                   {data.map((_, i) => (
// // //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// // //                   ))}
// // //                 </Pie>
// // //                 <Tooltip formatter={(val) => `$${val}`} />
// // //                 <Legend />
// // //               </PieChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </div>

// // //         {/* Bar Chart */}
// // //         <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
// // //           <h3>📈 Views vs Clicks</h3>
// // //           <div style={{ height: 320 }}>
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <BarChart data={data}>
// // //                 <XAxis dataKey="name" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Bar dataKey="views" fill="#0088FE" />
// // //                 <Bar dataKey="clicks" fill="#00C49F" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Internal CSS
// // // const styles = {
// // //   main: {
// // //     padding: "40px",
// // //     maxWidth: "1200px",
// // //     margin: "auto",
// // //     backgroundColor: "#f3f4f6",
// // //     fontFamily: "Arial, sans-serif",
// // //   },
// // //   title: {
// // //     fontSize: "26px",
// // //     fontWeight: "bold",
// // //     marginBottom: "25px",
// // //     color: "#111827",
// // //     textAlign: "center",
// // //   },
// // //   grid: {
// // //     display: "grid",
// // //     gridTemplateColumns: "repeat(2,auto)",
// // //     gap: "20px",
// // //   },
// // //   card: {
// // //     backgroundColor: "#fff",
// // //     borderRadius: "12px",
// // //     padding: "20px",
// // //     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// // //     border: "1px solid #e5e7eb",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //     fontSize: "14px",
// // //     textAlign: "left",
// // //   },
// // //   th: {
// // //     border: "1px solid #ccc",
// // //     padding: "8px",
// // //     backgroundColor: "#f9fafb",
// // //   },
// // //   cell: {
// // //     border: "1px solid #ccc",
// // //     padding: "8px",
// // //   },
// // // };

// // // export default PublisherPerformance;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// // } from "recharts";

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// // const PublisherPerformance = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// //         if (!token) {
// //           console.error("Missing token");
// //           return;
// //         }

// //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         const allData = Array.isArray(res.data?.data)
// //           ? res.data.data
// //           : Array.isArray(res.data)
// //           ? res.data
// //           : [];

// //         const grouped = {};

// //         allData.forEach((publisherBlock) => {
// //           const publisherId = publisherBlock.uploadedBy || "unknown";
// //           const publisherName =
// //             publisherBlock.publisherName ||
// //             publisherBlock.uploadedBy ||
// //             "Unknown Publisher";

// //           if (!grouped[publisherId]) {
// //             grouped[publisherId] = {
// //               name: publisherName,
// //               views: 0,
// //               clicks: 0,
// //               totalCPM: 0,
// //               totalRevenue: 0,
// //               validEntries: 0,
// //             };
// //           }

// //           (publisherBlock.data || []).forEach((row) => {
// //             if (typeof row !== "object" || row === null) return;

// //             const normalized = Object.fromEntries(
// //               Object.entries(row).map(([key, value]) => [
// //                 key.trim().toLowerCase(),
// //                 value,
// //               ])
// //             );

// //             const views =
// //               parseFloat(normalized.impressions) ||
// //               parseFloat(normalized["impression"]) ||
// //               0;
// //             const clicks =
// //               parseFloat(normalized.clicks) ||
// //               parseFloat(normalized["click"]) ||
// //               0;
// //             let cpm =
// //               parseFloat(normalized.cpm) ||
// //               parseFloat(normalized["cost per mille"]) ||
// //               0;
// //             let revenue =
// //               parseFloat(normalized.revenue) ||
// //               parseFloat(normalized["rev"]) ||
// //               0;

// //             if (!cpm) {
// //               cpm = Math.random() * (10 - 1) + 1;
// //             }

// //             if (!revenue) {
// //               if (views > 0) {
// //                 revenue = (views / 1000) * cpm;
// //               } else if (clicks > 0) {
// //                 const cpc = Math.random() * (1 - 0.1) + 0.1;
// //                 revenue = clicks * cpc;
// //               }
// //             }

// //             grouped[publisherId].views += views;
// //             grouped[publisherId].clicks += clicks;
// //             grouped[publisherId].totalCPM += cpm;
// //             grouped[publisherId].totalRevenue += revenue;
// //             grouped[publisherId].validEntries += 1;
// //           });
// //         });

// //         const formatted = Object.values(grouped).map((pub) => {
// //           const avgCPM = pub.validEntries
// //             ? pub.totalCPM / pub.validEntries
// //             : 0;
// //           const ctr = pub.views
// //             ? ((pub.clicks / pub.views) * 100).toFixed(2)
// //             : "0.00";
// //           const revenue =
// //             pub.totalRevenue ||
// //             ((pub.views / 1000) * avgCPM * pub.validEntries) / 1;

// //           return {
// //             name: pub.name,
// //             views: pub.views,
// //             clicks: pub.clicks,
// //             ctr,
// //             revenue: parseFloat(revenue.toFixed(2)),
// //           };
// //         });

// //         // Normalize clicks for bar visibility
// //         const maxViews = Math.max(...formatted.map((d) => d.views || 0));
// //         const scaled = formatted.map((d) => ({
// //           ...d,
// //           scaledClicks:
// //             maxViews > 0 ? (d.clicks / maxViews) * (maxViews / 5) : d.clicks, // 1/5 height scaling
// //         }));

// //         setData(scaled);
// //       } catch (err) {
// //         console.error("Error fetching data:", err);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div style={styles.main}>
// //       <h2 style={styles.title}>Publisher Performance Dashboard</h2>
// //       <div style={styles.grid}>
// //         {/* Table */}
// //         <div style={styles.card}>
// //           <h3>📊 Publisher Performance</h3>
// //           <table style={styles.table}>
// //             <thead>
// //               <tr>
// //                 <th style={styles.th}>Publisher</th>
// //                 <th style={styles.th}>Views</th>
// //                 <th style={styles.th}>Clicks</th>
// //                 <th style={styles.th}>CTR (%)</th>
// //                 <th style={styles.th}>Revenue ($)</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {data.length > 0 ? (
// //                 data.map((d, i) => (
// //                   <tr key={i}>
// //                     <td style={styles.cell}>{d.name}</td>
// //                     <td style={styles.cell}>{d.views.toLocaleString()}</td>
// //                     <td style={styles.cell}>{d.clicks.toLocaleString()}</td>
// //                     <td style={styles.cell}>{d.ctr}</td>
// //                     <td style={styles.cell}>${d.revenue.toLocaleString()}</td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="5" style={{ textAlign: "center" }}>
// //                     No data available
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pie Chart */}
// //         <div style={styles.card}>
// //           <h3>💰 Revenue Distribution</h3>
// //           <div style={{ height: 300 }}>
// //             <ResponsiveContainer width="100%" height="100%">
// //               <PieChart>
// //                 <Pie
// //                   data={data}
// //                   dataKey="revenue"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={100}
// //                   label
// //                 >
// //                   {data.map((_, i) => (
// //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip formatter={(val) => `$${val}`} />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Bar Chart */}
// //         <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
// //           <h3>📈 Views vs Clicks (Scaled)</h3>
// //           <div style={{ height: 320 }}>
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={data}>
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="views" fill="#0088FE" name="Views" />
// //                 <Bar
// //                   dataKey="scaledClicks"
// //                   fill="#00C49F"
// //                   name="Clicks (scaled)"
// //                 />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Internal CSS
// // const styles = {
// //   main: {
// //     padding: "40px",
// //     maxWidth: "1200px",
// //     margin: "auto",
// //     backgroundColor: "#f3f4f6",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   title: {
// //     fontSize: "26px",
// //     fontWeight: "bold",
// //     marginBottom: "25px",
// //     color: "#111827",
// //     textAlign: "center",
// //   },
// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
// //     gap: "20px",
// //   },
// //   card: {
// //     backgroundColor: "#fff",
// //     borderRadius: "12px",
// //     padding: "20px",
// //     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
// //     border: "1px solid #e5e7eb",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     fontSize: "14px",
// //     textAlign: "left",
// //   },
// //   th: {
// //     border: "1px solid #ccc",
// //     padding: "8px",
// //     backgroundColor: "#f9fafb",
// //   },
// //   cell: {
// //     border: "1px solid #ccc",
// //     padding: "8px",
// //   },
// // };

// // export default PublisherPerformance;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   CartesianGrid,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const PublisherPerformance = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
//         if (!token) {
//           console.error("Missing token");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/getalldata", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allData = Array.isArray(res.data?.data)
//           ? res.data.data
//           : Array.isArray(res.data)
//           ? res.data
//           : [];

//         const grouped = {};

//         allData.forEach((publisherBlock) => {
//           const publisherId = publisherBlock.uploadedBy || "unknown";
//           const publisherName =
//             publisherBlock.publisherName ||
//             publisherBlock.uploadedBy ||
//             "Unknown Publisher";

//           if (!grouped[publisherId]) {
//             grouped[publisherId] = {
//               name: publisherName,
//               views: 0,
//               clicks: 0,
//               totalCPM: 0,
//               totalRevenue: 0,
//               validEntries: 0,
//             };
//           }

//           (publisherBlock.data || []).forEach((row) => {
//             if (typeof row !== "object" || row === null) return;

//             const normalized = Object.fromEntries(
//               Object.entries(row).map(([key, value]) => [
//                 key.trim().toLowerCase(),
//                 value,
//               ])
//             );

//             const views =
//               parseFloat(normalized.impressions) ||
//               parseFloat(normalized["impression"]) ||
//               0;
//             const clicks =
//               parseFloat(normalized.clicks) ||
//               parseFloat(normalized["click"]) ||
//               0;
//             let cpm =
//               parseFloat(normalized.cpm) ||
//               parseFloat(normalized["cost per mille"]) ||
//               0;
//             let revenue =
//               parseFloat(normalized.revenue) ||
//               parseFloat(normalized["rev"]) ||
//               0;

//             if (!cpm) {
//               cpm = Math.random() * (10 - 1) + 1;
//             }

//             if (!revenue) {
//               if (views > 0) {
//                 revenue = (views / 1000) * cpm;
//               } else if (clicks > 0) {
//                 const cpc = Math.random() * (1 - 0.1) + 0.1;
//                 revenue = clicks * cpc;
//               }
//             }

//             grouped[publisherId].views += views;
//             grouped[publisherId].clicks += clicks;
//             grouped[publisherId].totalCPM += cpm;
//             grouped[publisherId].totalRevenue += revenue;
//             grouped[publisherId].validEntries += 1;
//           });
//         });

//         const formatted = Object.values(grouped).map((pub) => {
//           const avgCPM = pub.validEntries
//             ? pub.totalCPM / pub.validEntries
//             : 0;
//           const ctr = pub.views
//             ? ((pub.clicks / pub.views) * 100).toFixed(2)
//             : "0.00";
//           const revenue =
//             pub.totalRevenue ||
//             ((pub.views / 1000) * avgCPM * pub.validEntries) / 1;

//           return {
//             name: pub.name,
//             views: pub.views,
//             clicks: pub.clicks,
//             ctr,
//             revenue: parseFloat(revenue.toFixed(2)),
//           };
//         });

//         setData(formatted);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={styles.main}>
//       <h2 style={styles.title}>Publisher Performance Dashboard</h2>
//       <div style={styles.grid}>
//         {/* Table */}
//         <div style={styles.card}>
//           <h3>📊 Publisher Performance</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Publisher</th>
//                 <th style={styles.th}>Views</th>
//                 <th style={styles.th}>Clicks</th>
//                 <th style={styles.th}>CTR (%)</th>
//                 <th style={styles.th}>Revenue ($)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((d, i) => (
//                   <tr key={i}>
//                     <td style={styles.cell}>{d.name}</td>
//                     <td style={styles.cell}>{d.views.toLocaleString()}</td>
//                     <td style={styles.cell}>{d.clicks.toLocaleString()}</td>
//                     <td style={styles.cell}>{d.ctr}</td>
//                     <td style={styles.cell}>${d.revenue.toLocaleString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center" }}>
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pie Chart */}
//         <div style={styles.card}>
//           <h3>💰 Revenue Distribution</h3>
//           <div style={{ height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={data}
//                   dataKey="revenue"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {data.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(val) => `$${val}`} />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Combined Bar + Line Chart */}
//         <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
//           <h3>📈 Views vs Clicks</h3>
//           <div style={{ height: 320 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis yAxisId="left" orientation="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar yAxisId="left" dataKey="views" fill="#0088FE" name="Views" />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="clicks"
//                   stroke="#00C49F"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                   activeDot={{ r: 6 }}
//                   name="Clicks"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Internal CSS
// const styles = {
//   main: {
//     padding: "40px",
//     maxWidth: "1200px",
//     margin: "auto",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "Arial, sans-serif",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "bold",
//     marginBottom: "25px",
//     color: "#111827",
//     textAlign: "center",
//   },
// grid: {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gridTemplateRows: "auto auto",
//   gap: "20px",
// },


//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "20px",
//     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e5e7eb",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "14px",
//     textAlign: "left",
//   },
//   th: {
//     border: "1px solid #ccc",
//     padding: "8px",
//     backgroundColor: "#f9fafb",
//   },
//   cell: {
//     border: "1px solid #ccc",
//     padding: "8px",
//   },
// };

// export default PublisherPerformance;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ThemeContext } from "../ThemeSettings/ThemeContext"; // ✅ Import theme context

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PublisherPerformance = () => {
  const [data, setData] = useState([]);
  const { theme } = useContext(ThemeContext); // ✅ Access global theme

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwt"))?.token;
        if (!token) {
          console.error("Missing token");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/getalldata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allData = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        const grouped = {};

        allData.forEach((publisherBlock) => {
          const publisherId = publisherBlock.uploadedBy || "unknown";
          const publisherName =
            publisherBlock.publisherName ||
            publisherBlock.uploadedBy ||
            "Unknown Publisher";

          if (!grouped[publisherId]) {
            grouped[publisherId] = {
              name: publisherName,
              views: 0,
              clicks: 0,
              totalCPM: 0,
              totalRevenue: 0,
              validEntries: 0,
            };
          }

          (publisherBlock.data || []).forEach((row) => {
            if (typeof row !== "object" || row === null) return;

            const normalized = Object.fromEntries(
              Object.entries(row).map(([key, value]) => [
                key.trim().toLowerCase(),
                value,
              ])
            );

            const views =
              parseFloat(normalized.impressions) ||
              parseFloat(normalized["impression"]) ||
              0;
            const clicks =
              parseFloat(normalized.clicks) ||
              parseFloat(normalized["click"]) ||
              0;
            let cpm =
              parseFloat(normalized.cpm) ||
              parseFloat(normalized["cost per mille"]) ||
              0;
            let revenue =
              parseFloat(normalized.revenue) ||
              parseFloat(normalized["rev"]) ||
              0;

            if (!cpm) {
              cpm = Math.random() * (10 - 1) + 1;
            }

            if (!revenue) {
              if (views > 0) {
                revenue = (views / 1000) * cpm;
              } else if (clicks > 0) {
                const cpc = Math.random() * (1 - 0.1) + 0.1;
                revenue = clicks * cpc;
              }
            }

            grouped[publisherId].views += views;
            grouped[publisherId].clicks += clicks;
            grouped[publisherId].totalCPM += cpm;
            grouped[publisherId].totalRevenue += revenue;
            grouped[publisherId].validEntries += 1;
          });
        });

        const formatted = Object.values(grouped).map((pub) => {
          const avgCPM = pub.validEntries
            ? pub.totalCPM / pub.validEntries
            : 0;
          const ctr = pub.views
            ? ((pub.clicks / pub.views) * 100).toFixed(2)
            : "0.00";
          const revenue =
            pub.totalRevenue ||
            ((pub.views / 1000) * avgCPM * pub.validEntries) / 1;

          return {
            name: pub.name,
            views: pub.views,
            clicks: pub.clicks,
            ctr,
            revenue: parseFloat(revenue.toFixed(2)),
          };
        });

        setData(formatted);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // 🎨 Theme-based dynamic colors
  const isDark = theme === "dark";
  const themeColors = {
    pageBg: isDark ? "#0f172a" : "#f3f4f6",
    text: isDark ? "#e2e8f0" : "#111827",
    cardBg: isDark ? "#1e293b" : "#fff",
    border: isDark ? "#334155" : "#e5e7eb",
    tableHeaderBg: isDark ? "#334155" : "#f9fafb",
    cellBorder: isDark ? "#475569" : "#ccc",
  };

  return (
    <div
      style={{
        ...styles.main,
        backgroundColor: themeColors.pageBg,
        color: themeColors.text,
      }}
    >
      <h2 style={{ ...styles.title, color: themeColors.text }}>
        Publisher Performance Dashboard
      </h2>

      <div style={styles.grid}>
        {/* Table Section */}
        <div
          style={{
            ...styles.card,
            backgroundColor: themeColors.cardBg,
            borderColor: themeColors.border,
          }}
        >
          <h3 style={{ color: themeColors.text }}>📊 Publisher Performance</h3>
          <table
            style={{
              ...styles.table,
              borderColor: themeColors.border,
            }}
          >
            <thead>
              <tr>
                {["Publisher", "Views", "Clicks", "CTR (%)", "Revenue ($)"].map(
                  (col) => (
                    <th
                      key={col}
                      style={{
                        ...styles.th,
                        backgroundColor: themeColors.tableHeaderBg,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((d, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        ...styles.cell,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      {d.name}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      {d.views.toLocaleString()}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      {d.clicks.toLocaleString()}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      {d.ctr}
                    </td>
                    <td
                      style={{
                        ...styles.cell,
                        color: themeColors.text,
                        borderColor: themeColors.cellBorder,
                      }}
                    >
                      ${d.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "15px",
                      color: themeColors.text,
                      borderColor: themeColors.cellBorder,
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            ...styles.card,
            backgroundColor: themeColors.cardBg,
            borderColor: themeColors.border,
          }}
        >
          <h3 style={{ color: themeColors.text }}>💰 Revenue Distribution</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `$${val}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar + Line Chart */}
        <div
          style={{
            ...styles.card,
            gridColumn: "1 / -1",
            backgroundColor: themeColors.cardBg,
            borderColor: themeColors.border,
          }}
        >
          <h3 style={{ color: themeColors.text }}>📈 Views vs Clicks</h3>
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={themeColors.text} />
                <YAxis yAxisId="left" orientation="left" stroke={themeColors.text} />
                <YAxis yAxisId="right" orientation="right" stroke={themeColors.text} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="views" fill="#0088FE" name="Views" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#00C49F"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Clicks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Styles
const styles = {
  main: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "auto",
    transition: "background 0.3s, color 0.3s",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "25px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto",
    gap: "20px",
  },
  card: {
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    transition: "background 0.3s, color 0.3s, border 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    textAlign: "left",
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    fontWeight: "600",
  },
  cell: {
    border: "1px solid #ccc",
    padding: "8px",
  },
};

export default PublisherPerformance;
