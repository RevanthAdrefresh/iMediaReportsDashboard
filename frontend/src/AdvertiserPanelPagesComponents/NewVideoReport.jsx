// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   ResponsiveContainer,
// // // //   ComposedChart,
// // // //   CartesianGrid,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   Legend,
// // // //   Bar,
// // // //   Line,
// // // //   PieChart,
// // // //   Pie,
// // // //   Cell,
// // // // } from "recharts";

// // // // const VideoReport = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [filtered, setFiltered] = useState([]);
// // // //   const [startDate, setStartDate] = useState("");
// // // //   const [endDate, setEndDate] = useState("");

// // // //   useEffect(() => {
// // // //     const stored = localStorage.getItem("uploadedSheets");
// // // //     if (stored) {
// // // //       const parsed = JSON.parse(stored);
// // // //       const sheet =
// // // //         parsed.find((s) => s.name === "VideoReport" || s.name === "Sheet2") || {};
// // // //       if (sheet.data) {
// // // //         const cleanedData = sheet.data.map((row) => {
// // // //           const cleanRow = {};
// // // //           for (let key in row) cleanRow[key.trim()] = row[key];

// // // //           // Convert Excel serial date → JS date
// // // //           if (!isNaN(cleanRow.Date)) {
// // // //             const excelBase = new Date(1899, 11, 30);
// // // //             const jsDate = new Date(excelBase.getTime() + cleanRow.Date * 86400000);
// // // //             cleanRow.Date = jsDate.toISOString().split("T")[0];
// // // //           }
// // // //           return cleanRow;
// // // //         });
// // // //         setData(cleanedData);
// // // //         setFiltered(cleanedData);
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   // ✅ Filter logic (runs every time start/end changes)
// // // //   useEffect(() => {
// // // //     if (!startDate && !endDate) {
// // // //       setFiltered(data);
// // // //       return;
// // // //     }
// // // //     const f = data.filter((row) => {
// // // //       const date = new Date(row.Date);
// // // //       const afterStart = startDate ? date >= new Date(startDate) : true;
// // // //       const beforeEnd = endDate ? date <= new Date(endDate) : true;
// // // //       return afterStart && beforeEnd;
// // // //     });
// // // //     setFiltered(f);
// // // //   }, [startDate, endDate, data]);

// // // //   const COLORS = ["#004c8fff", "#00997dff", "#ffae00ff", "#e04b00ff"];

// // // //   // ✅ Summary values
// // // //   const totalImpressions = filtered.reduce((a, b) => a + (b.Impressions || 0), 0);
// // // //   const totalClicks = filtered.reduce((a, b) => a + (b.Clicks || 0), 0);
// // // //   const totalSpend = filtered.reduce((a, b) => a + (b.Spend || 0), 0);

// // // //   const pieData = [
// // // //     { name: "Impressions", value: totalImpressions },
// // // //     { name: "Clicks", value: totalClicks },
// // // //     { name: "Spend", value: totalSpend },
// // // //   ];

// // // //   const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.title}>🎥 Video Report Dashboard</h2>

// // // //       {/* 📅 Date Filter (Always visible) */}
// // // //       <div style={styles.filterContainer}>
// // // //         <div>
// // // //           <label style={styles.label}>Start Date:</label>
// // // //           <input
// // // //             type="date"
// // // //             value={startDate}
// // // //             onChange={(e) => setStartDate(e.target.value)}
// // // //             style={styles.dateInput}
// // // //           />
// // // //         </div>
// // // //         <div>
// // // //           <label style={styles.label}>End Date:</label>
// // // //           <input
// // // //             type="date"
// // // //             value={endDate}
// // // //             onChange={(e) => setEndDate(e.target.value)}
// // // //             style={styles.dateInput}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* If no records → show message below filters */}
// // // //       {filtered.length === 0 ? (
// // // //         <h3 style={styles.noData}>No records available for this date range</h3>
// // // //       ) : (
// // // //         <>
// // // //           {/* 📊 Combo Chart */}
// // // //           <div style={styles.chartCard}>
// // // //             <h3>Impressions, Spend & Clicks Overview</h3>
// // // //             <ResponsiveContainer width="100%" height={380}>
// // // //               <ComposedChart data={filtered}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="Date" />
// // // //                 <YAxis yAxisId="left" />
// // // //                 <YAxis yAxisId="right" orientation="right" />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Bar
// // // //                   yAxisId="left"
// // // //                   dataKey="Impressions"
// // // //                   barSize={20}
// // // //                   fill="#00C49F"
// // // //                   name="Impressions"
// // // //                 />
// // // //                 <Bar
// // // //                   yAxisId="right"
// // // //                   dataKey="Spend"
// // // //                   barSize={20}
// // // //                   fill="#ff6113ff"
// // // //                   name="Spend"
// // // //                 />
// // // //                 <Line
// // // //                   yAxisId="right"
// // // //                   type="monotone"
// // // //                   dataKey="Clicks"
// // // //                   stroke="#002fffff"
// // // //                   strokeWidth={2.5}
// // // //                   dot={{ r: 3 }}
// // // //                   name="Clicks"
// // // //                 />
// // // //               </ComposedChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* 🍩 Donut Chart */}
// // // //           <div style={styles.chartCard}>
// // // //             <h3>Overall Summary</h3>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <PieChart>
// // // //                 <Pie
// // // //                   data={pieData}
// // // //                   dataKey="value"
// // // //                   nameKey="name"
// // // //                   cx="50%"
// // // //                   cy="50%"
// // // //                   outerRadius={100}
// // // //                   innerRadius={60}
// // // //                   label
// // // //                 >
// // // //                   {pieData.map((_, i) => (
// // // //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// // // //                   ))}
// // // //                 </Pie>
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //               </PieChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* 📋 Table */}
// // // //           <div style={styles.tableCard}>
// // // //             <h3>Detailed Report</h3>
// // // //             <div style={styles.tableWrapper}>
// // // //               <table style={styles.table}>
// // // //                 <thead>
// // // //                   <tr>
// // // //                     {headers.map((head, i) => (
// // // //                       <th key={i} style={styles.th}>
// // // //                         {head}
// // // //                       </th>
// // // //                     ))}
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {filtered.map((row, i) => (
// // // //                     <tr key={i}>
// // // //                       {headers.map((head, j) => (
// // // //                         <td key={j} style={styles.td}>
// // // //                           {row[head]}
// // // //                         </td>
// // // //                       ))}
// // // //                     </tr>
// // // //                   ))}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ✅ Styles
// // // // const styles = {
// // // //   container: {
// // // //     marginTop: "30px",
// // // //     backgroundColor: "#fff",
// // // //     borderRadius: "10px",
// // // //     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //     padding: "20px",
// // // //   },
// // // //   title: {
// // // //     textAlign: "center",
// // // //     color: "#2c3e50",
// // // //     marginBottom: "20px",
// // // //   },
// // // //   filterContainer: {
// // // //     display: "flex",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     gap: "20px",
// // // //     flexWrap: "wrap",
// // // //     marginBottom: "25px",
// // // //   },
// // // //   label: { marginRight: "8px", fontWeight: "bold", color: "#333" },
// // // //   dateInput: {
// // // //     padding: "6px 10px",
// // // //     borderRadius: "6px",
// // // //     border: "1px solid #ccc",
// // // //     fontSize: "14px",
// // // //   },
// // // //   chartCard: {
// // // //     marginBottom: "30px",
// // // //     background: "#f8f9fa",
// // // //     padding: "20px",
// // // //     borderRadius: "10px",
// // // //   },
// // // //   tableCard: {
// // // //     marginTop: "20px",
// // // //     padding: "20px",
// // // //     borderRadius: "10px",
// // // //     background: "#fafafa",
// // // //   },
// // // //   tableWrapper: { overflowX: "auto" },
// // // //   table: { width: "100%", borderCollapse: "collapse" },
// // // //   th: {
// // // //     border: "1px solid #ddd",
// // // //     padding: "8px",
// // // //     background: "#eaeaea",
// // // //     fontWeight: "bold",
// // // //   },
// // // //   td: { border: "1px solid #ddd", padding: "8px" },
// // // //   noData: {
// // // //     color: "#777",
// // // //     textAlign: "center",
// // // //     marginTop: "40px",
// // // //     fontSize: "16px",
// // // //   },
// // // // };

// // // // export default VideoReport;


// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import {
// // //   ResponsiveContainer,
// // //   ComposedChart,
// // //   CartesianGrid,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // //   Bar,
// // //   Line,
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // // } from "recharts";

// // // const VideoReport = () => {
// // //   const [data, setData] = useState([]);
// // //   const [filtered, setFiltered] = useState([]);
// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");

// // //   // ✅ Fetch from backend with token
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const user = JSON.parse(localStorage.getItem("jwt")); // assuming user info stored
// // //         const userToken = user?.token;

// // //         const response = await axios.get("http://localhost:5000/api/getallsheets", {
// // //           headers: {
// // //             Authorization: `Bearer ${userToken}`,
// // //           },
// // //         });

// // //         // Assuming response.data[0] contains your sheet data
// // //         const sheet = response.data[2].data;
// // //         console.log(sheet,"sheettt");
        
// // //         if (sheet?.data?.length) {
// // //           const cleanedData = sheet.data.map((row) => {
// // //             const cleanRow = {};
// // //             for (let key in row) cleanRow[key.trim()] = row[key];

// // //             // Convert Excel serial date → JS date
// // //             if (!isNaN(cleanRow.Date)) {
// // //               const excelBase = new Date(1899, 11, 30);
// // //               const jsDate = new Date(excelBase.getTime() + cleanRow.Date * 86400000);
// // //               cleanRow.Date = jsDate.toISOString().split("T")[0];
// // //             }
// // //             return cleanRow;
// // //           });

// // //           setData(cleanedData);
// // //           setFiltered(cleanedData);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching VideoReport data:", err);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   // ✅ Date Filter
// // //   useEffect(() => {
// // //     if (!startDate && !endDate) {
// // //       setFiltered(data);
// // //       return;
// // //     }
// // //     const f = data.filter((row) => {
// // //       const date = new Date(row.Date);
// // //       const afterStart = startDate ? date >= new Date(startDate) : true;
// // //       const beforeEnd = endDate ? date <= new Date(endDate) : true;
// // //       return afterStart && beforeEnd;
// // //     });
// // //     setFiltered(f);
// // //   }, [startDate, endDate, data]);

// // //   const COLORS = ["#004c8fff", "#00997dff", "#ffae00ff", "#e04b00ff"];

// // //   // ✅ Summary values
// // //   const totalImpressions = filtered.reduce((a, b) => a + (b.Impressions || 0), 0);
// // //   const totalClicks = filtered.reduce((a, b) => a + (b.Clicks || 0), 0);
// // //   const totalSpend = filtered.reduce((a, b) => a + (b.Spend || 0), 0);

// // //   const pieData = [
// // //     { name: "Impressions", value: totalImpressions },
// // //     { name: "Clicks", value: totalClicks },
// // //     { name: "Spend", value: totalSpend },
// // //   ];

// // //   const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.title}>🎥 Video Report Dashboard</h2>

// // //       {/* 📅 Date Filter */}
// // //       <div style={styles.filterContainer}>
// // //         <div>
// // //           <label style={styles.label}>Start Date:</label>
// // //           <input
// // //             type="date"
// // //             value={startDate}
// // //             onChange={(e) => setStartDate(e.target.value)}
// // //             style={styles.dateInput}
// // //           />
// // //         </div>
// // //         <div>
// // //           <label style={styles.label}>End Date:</label>
// // //           <input
// // //             type="date"
// // //             value={endDate}
// // //             onChange={(e) => setEndDate(e.target.value)}
// // //             style={styles.dateInput}
// // //           />
// // //         </div>
// // //       </div>

// // //       {filtered.length === 0 ? (
// // //         <h3 style={styles.noData}>No records available for this date range</h3>
// // //       ) : (
// // //         <>
// // //           {/* 📊 Combo Chart */}
// // //           <div style={styles.chartCard}>
// // //             <h3>Impressions, Spend & Clicks Overview</h3>
// // //             <ResponsiveContainer width="100%" height={380}>
// // //               <ComposedChart data={filtered}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="Date" />
// // //                 <YAxis yAxisId="left" />
// // //                 <YAxis yAxisId="right" orientation="right" />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Bar
// // //                   yAxisId="left"
// // //                   dataKey="Impressions"
// // //                   barSize={20}
// // //                   fill="#00C49F"
// // //                   name="Impressions"
// // //                 />
// // //                 <Bar
// // //                   yAxisId="right"
// // //                   dataKey="Spend"
// // //                   barSize={20}
// // //                   fill="#ff6113ff"
// // //                   name="Spend"
// // //                 />
// // //                 <Line
// // //                   yAxisId="right"
// // //                   type="monotone"
// // //                   dataKey="Clicks"
// // //                   stroke="#002fffff"
// // //                   strokeWidth={2.5}
// // //                   dot={{ r: 3 }}
// // //                   name="Clicks"
// // //                 />
// // //               </ComposedChart>
// // //             </ResponsiveContainer>
// // //           </div>

// // //           {/* 🍩 Donut Chart */}
// // //           <div style={styles.chartCard}>
// // //             <h3>Overall Summary</h3>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <PieChart>
// // //                 <Pie
// // //                   data={pieData}
// // //                   dataKey="value"
// // //                   nameKey="name"
// // //                   cx="50%"
// // //                   cy="50%"
// // //                   outerRadius={100}
// // //                   innerRadius={60}
// // //                   label
// // //                 >
// // //                   {pieData.map((_, i) => (
// // //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// // //                   ))}
// // //                 </Pie>
// // //                 <Tooltip />
// // //                 <Legend />
// // //               </PieChart>
// // //             </ResponsiveContainer>
// // //           </div>

// // //           {/* 📋 Table */}
// // //           <div style={styles.tableCard}>
// // //             <h3>Detailed Report</h3>
// // //             <div style={styles.tableWrapper}>
// // //               <table style={styles.table}>
// // //                 <thead>
// // //                   <tr>
// // //                     {headers.map((head, i) => (
// // //                       <th key={i} style={styles.th}>
// // //                         {head}
// // //                       </th>
// // //                     ))}
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {filtered.map((row, i) => (
// // //                     <tr key={i}>
// // //                       {headers.map((head, j) => (
// // //                         <td key={j} style={styles.td}>
// // //                           {row[head]}
// // //                         </td>
// // //                       ))}
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // ✅ Styles
// // // const styles = {
// // //   container: {
// // //     marginTop: "30px",
// // //     backgroundColor: "#fff",
// // //     borderRadius: "10px",
// // //     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //     padding: "20px",
// // //   },
// // //   title: {
// // //     textAlign: "center",
// // //     color: "#2c3e50",
// // //     marginBottom: "20px",
// // //   },
// // //   filterContainer: {
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     gap: "20px",
// // //     flexWrap: "wrap",
// // //     marginBottom: "25px",
// // //   },
// // //   label: { marginRight: "8px", fontWeight: "bold", color: "#333" },
// // //   dateInput: {
// // //     padding: "6px 10px",
// // //     borderRadius: "6px",
// // //     border: "1px solid #ccc",
// // //     fontSize: "14px",
// // //   },
// // //   chartCard: {
// // //     marginBottom: "30px",
// // //     background: "#f8f9fa",
// // //     padding: "20px",
// // //     borderRadius: "10px",
// // //   },
// // //   tableCard: {
// // //     marginTop: "20px",
// // //     padding: "20px",
// // //     borderRadius: "10px",
// // //     background: "#fafafa",
// // //   },
// // //   tableWrapper: { overflowX: "auto" },
// // //   table: { width: "100%", borderCollapse: "collapse" },
// // //   th: {
// // //     border: "1px solid #ddd",
// // //     padding: "8px",
// // //     background: "#eaeaea",
// // //     fontWeight: "bold",
// // //   },
// // //   td: { border: "1px solid #ddd", padding: "8px" },
// // //   noData: {
// // //     color: "#777",
// // //     textAlign: "center",
// // //     marginTop: "40px",
// // //     fontSize: "16px",
// // //   },
// // // };

// // // export default VideoReport;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   ResponsiveContainer,
// //   ComposedChart,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   Bar,
// //   Line,
// //   PieChart,
// //   Pie,
// //   Cell,
// // } from "recharts";

// // const VideoReport = () => {
// //   const [data, setData] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const userToken = JSON.parse(localStorage.getItem("jwt")).token; // directly the JWT string
// //         if (!userToken) {
// //           console.error("No token found in localStorage");
// //           return;
// //         }

// //         const response = await axios.get("http://localhost:5000/api/getallsheets", {
// //           headers: { Authorization: `Bearer ${userToken}` },
// //         });

// //         // response.data is an array of sheets, pick the one for VideoReport
// //         // if you know its name → filter by it, else pick index manually
// //         const sheet = response.data.find(
// //           (s) => s.name === "VideoReport" || s.name === "Sheet3"
// //         );

// //         if (!sheet || !sheet.data) {
// //           console.warn("No sheet data found for VideoReport");
// //           return;
// //         }

// //         // clean data
// //         const cleanedData = sheet.data.map((row) => {
// //           const cleanRow = {};
// //           for (let key in row) cleanRow[key.trim()] = row[key];

// //           // Convert Excel serial date → readable date
// //           if (!isNaN(cleanRow.Date)) {
// //             const excelBase = new Date(1899, 11, 30);
// //             const jsDate = new Date(excelBase.getTime() + cleanRow.Date * 86400000);
// //             cleanRow.Date = jsDate.toISOString().split("T")[0];
// //           }
// //           return cleanRow;
// //         });

// //         setData(cleanedData);
// //         setFiltered(cleanedData);
// //       } catch (err) {
// //         console.error("Error fetching VideoReport data:", err);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // ✅ Date Filter
// //   useEffect(() => {
// //     if (!startDate && !endDate) {
// //       setFiltered(data);
// //       return;
// //     }
// //     const f = data.filter((row) => {
// //       const date = new Date(row.Date);
// //       const afterStart = startDate ? date >= new Date(startDate) : true;
// //       const beforeEnd = endDate ? date <= new Date(endDate) : true;
// //       return afterStart && beforeEnd;
// //     });
// //     setFiltered(f);
// //   }, [startDate, endDate, data]);

// //   const COLORS = ["#004c8fff", "#00997dff", "#ffae00ff", "#e04b00ff"];

// //   const totalImpressions = filtered.reduce((a, b) => a + (Number(b.Impressions) || 0), 0);
// //   const totalClicks = filtered.reduce((a, b) => a + (Number(b.Clicks) || 0), 0);
// //   const totalSpend = filtered.reduce((a, b) => a + (Number(b.Spend) || 0), 0);

// //   const pieData = [
// //     { name: "Impressions", value: totalImpressions },
// //     { name: "Clicks", value: totalClicks },
// //     { name: "Spend", value: totalSpend },
// //   ];

// //   const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.title}>🎥 Video Report Dashboard</h2>

// //       {/* 📅 Date Filter */}
// //       <div style={styles.filterContainer}>
// //         <div>
// //           <label style={styles.label}>Start Date:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             style={styles.dateInput}
// //           />
// //         </div>
// //         <div>
// //           <label style={styles.label}>End Date:</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             style={styles.dateInput}
// //           />
// //         </div>
// //       </div>

// //       {filtered.length === 0 ? (
// //         <h3 style={styles.noData}>No records available for this date range</h3>
// //       ) : (
// //         <>
// //           {/* 📊 Combo Chart */}
// //           <div style={styles.chartCard}>
// //             <h3>Impressions, Spend & Clicks Overview</h3>
// //             <ResponsiveContainer width="100%" height={380}>
// //               <ComposedChart data={filtered}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="Date" />
// //                 <YAxis yAxisId="left" />
// //                 <YAxis yAxisId="right" orientation="right" />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar
// //                   yAxisId="left"
// //                   dataKey="Impressions"
// //                   barSize={20}
// //                   fill="#00C49F"
// //                   name="Impressions"
// //                 />
// //                 <Bar
// //                   yAxisId="right"
// //                   dataKey="Spend"
// //                   barSize={20}
// //                   fill="#ff6113ff"
// //                   name="Spend"
// //                 />
// //                 <Line
// //                   yAxisId="right"
// //                   type="monotone"
// //                   dataKey="Clicks"
// //                   stroke="#002fffff"
// //                   strokeWidth={2.5}
// //                   dot={{ r: 3 }}
// //                   name="Clicks"
// //                 />
// //               </ComposedChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* 🍩 Donut Chart */}
// //           <div style={styles.chartCard}>
// //             <h3>Overall Summary</h3>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <PieChart>
// //                 <Pie
// //                   data={pieData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={100}
// //                   innerRadius={60}
// //                   label
// //                 >
// //                   {pieData.map((_, i) => (
// //                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* 📋 Table */}
// //           <div style={styles.tableCard}>
// //             <h3>Detailed Report</h3>
// //             <div style={styles.tableWrapper}>
// //               <table style={styles.table}>
// //                 <thead>
// //                   <tr>
// //                     {headers.map((head, i) => (
// //                       <th key={i} style={styles.th}>
// //                         {head}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((row, i) => (
// //                     <tr key={i}>
// //                       {headers.map((head, j) => (
// //                         <td key={j} style={styles.td}>
// //                           {row[head]}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     marginTop: "30px",
// //     backgroundColor: "#fff",
// //     borderRadius: "10px",
// //     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //     padding: "20px",
// //   },
// //   title: {
// //     textAlign: "center",
// //     color: "#2c3e50",
// //     marginBottom: "20px",
// //   },
// //   filterContainer: {
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: "20px",
// //     flexWrap: "wrap",
// //     marginBottom: "25px",
// //   },
// //   label: { marginRight: "8px", fontWeight: "bold", color: "#333" },
// //   dateInput: {
// //     padding: "6px 10px",
// //     borderRadius: "6px",
// //     border: "1px solid #ccc",
// //     fontSize: "14px",
// //   },
// //   chartCard: {
// //     marginBottom: "30px",
// //     background: "#f8f9fa",
// //     padding: "20px",
// //     borderRadius: "10px",
// //   },
// //   tableCard: {
// //     marginTop: "20px",
// //     padding: "20px",
// //     borderRadius: "10px",
// //     background: "#fafafa",
// //   },
// //   tableWrapper: { overflowX: "auto" },
// //   table: { width: "100%", borderCollapse: "collapse" },
// //   th: {
// //     border: "1px solid #ddd",
// //     padding: "8px",
// //     background: "#eaeaea",
// //     fontWeight: "bold",
// //   },
// //   td: { border: "1px solid #ddd", padding: "8px" },
// //   noData: {
// //     color: "#777",
// //     textAlign: "center",
// //     marginTop: "40px",
// //     fontSize: "16px",
// //   },
// // };

// // export default VideoReport;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const VideoReport = () => {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tokenData = JSON.parse(localStorage.getItem("jwt"));
//         const userToken = tokenData?.token;
//         if (!userToken) {
//           console.error("No token found in localStorage");
//           return;
//         }

//         const response = await axios.get("http://localhost:5000/api/getallsheets", {
//           headers: { Authorization: `Bearer ${userToken}` },
//         });

//         // Normalize sheet names
//         const normalize = (name) => name?.trim().toLowerCase().replace(/\s|_/g, "");

//         const allSheets = response.data || [];
//         console.log("📑 Sheets available:", allSheets.map((s) => s.name));

//         // Find video sheet regardless of naming
//         const sheet = allSheets.find((s) => {
//           const n = normalize(s.name);
//           return n.includes("videoreport") || n.includes("video");
//         });

//         if (!sheet || !sheet.data || sheet.data.length === 0) {
//           console.warn("⚠️ No valid sheet data found for VideoReport");
//           return;
//         }

//         // Clean and normalize each row
//         const cleanedData = sheet.data.map((row) => {
//           const cleanRow = {};
//           for (let key in row) {
//             cleanRow[key.trim()] = row[key];
//           }

//           // Convert Excel serial date → readable date
//           if (!isNaN(cleanRow.Date)) {
//             const excelBase = new Date(1899, 11, 30);
//             const jsDate = new Date(excelBase.getTime() + cleanRow.Date * 86400000);
//             cleanRow.Date = jsDate.toISOString().split("T")[0];
//           }

//           return cleanRow;
//         });

//         setData(cleanedData);
//         setFiltered(cleanedData);
//       } catch (err) {
//         console.error("❌ Error fetching VideoReport data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ Date Filter
//   useEffect(() => {
//     if (!startDate && !endDate) {
//       setFiltered(data);
//       return;
//     }
//     const f = data.filter((row) => {
//       const date = new Date(row.Date);
//       const afterStart = startDate ? date >= new Date(startDate) : true;
//       const beforeEnd = endDate ? date <= new Date(endDate) : true;
//       return afterStart && beforeEnd;
//     });
//     setFiltered(f);
//   }, [startDate, endDate, data]);

//   const COLORS = ["#004c8fff", "#00997dff", "#ffae00ff", "#e04b00ff"];

//   const totalImpressions = filtered.reduce((a, b) => a + (Number(b.Impressions) || 0), 0);
//   const totalClicks = filtered.reduce((a, b) => a + (Number(b.Clicks) || 0), 0);
//   const totalSpend = filtered.reduce((a, b) => a + (Number(b.Spend) || 0), 0);

//   const pieData = [
//     { name: "Impressions", value: totalImpressions },
//     { name: "Clicks", value: totalClicks },
//     { name: "Spend", value: totalSpend },
//   ];

//   const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>🎥 Video Report Dashboard</h2>

//       {/* 📅 Date Filter */}
//       <div style={styles.filterContainer}>
//         <div>
//           <label style={styles.label}>Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             style={styles.dateInput}
//           />
//         </div>
//         <div>
//           <label style={styles.label}>End Date:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             style={styles.dateInput}
//           />
//         </div>
//       </div>

//       {filtered.length === 0 ? (
//         <h3 style={styles.noData}>No records available for this date range</h3>
//       ) : (
//         <>
//           {/* 📊 Combo Chart */}
//           <div style={styles.chartCard}>
//             <h3>Impressions, Spend & Clicks Overview</h3>
//             <ResponsiveContainer width="100%" height={380}>
//               <ComposedChart data={filtered}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="Date" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar
//                   yAxisId="left"
//                   dataKey="Impressions"
//                   barSize={20}
//                   fill="#00C49F"
//                   name="Impressions"
//                 />
//                 <Bar
//                   yAxisId="right"
//                   dataKey="Spend"
//                   barSize={20}
//                   fill="#ff6113ff"
//                   name="Spend"
//                 />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="Clicks"
//                   stroke="#002fffff"
//                   strokeWidth={2.5}
//                   dot={{ r: 3 }}
//                   name="Clicks"
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </div>

//           {/* 🍩 Donut Chart */}
//           <div style={styles.chartCard}>
//             <h3>Overall Summary</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   innerRadius={60}
//                   label
//                 >
//                   {pieData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* 📋 Table */}
//           <div style={styles.tableCard}>
//             <h3>Detailed Report</h3>
//             <div style={styles.tableWrapper}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     {headers.map((head, i) => (
//                       <th key={i} style={styles.th}>
//                         {head}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((row, i) => (
//                     <tr key={i}>
//                       {headers.map((head, j) => (
//                         <td key={j} style={styles.td}>
//                           {row[head]}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginTop: "30px",
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     padding: "20px",
//   },
//   title: {
//     textAlign: "center",
//     color: "#2c3e50",
//     marginBottom: "20px",
//   },
//   filterContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "20px",
//     flexWrap: "wrap",
//     marginBottom: "25px",
//   },
//   label: { marginRight: "8px", fontWeight: "bold", color: "#333" },
//   dateInput: {
//     padding: "6px 10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   chartCard: {
//     marginBottom: "30px",
//     background: "#f8f9fa",
//     padding: "20px",
//     borderRadius: "10px",
//   },
//   tableCard: {
//     marginTop: "20px",
//     padding: "20px",
//     borderRadius: "10px",
//     background: "#fafafa",
//   },
//   tableWrapper: { overflowX: "auto" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     background: "#eaeaea",
//     fontWeight: "bold",
//   },
//   td: { border: "1px solid #ddd", padding: "8px" },
//   noData: {
//     color: "#777",
//     textAlign: "center",
//     marginTop: "40px",
//     fontSize: "16px",
//   },
// };

// export default VideoReport;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const VideoReport = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Fetch Video Report Sheet
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("jwt"));
        const userToken = tokenData?.token;
        if (!userToken) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/getallsheets", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const normalize = (n) => n?.trim().toLowerCase().replace(/\s|_/g, "");
        const allSheets = res.data || [];
        const videoSheet = allSheets.find((s) => {
          const name = normalize(s.name);
          return name.includes("videoreport") || name.includes("video");
        });

        if (!videoSheet || !videoSheet.data?.length) {
          console.warn("⚠️ No valid VideoReport sheet found");
          return;
        }

        const cleanedData = videoSheet.data.map((row) => {
          const clean = {};
          for (let key in row) clean[key.trim()] = row[key];

          // Excel serial date → readable format
          if (!isNaN(clean.Date)) {
            const excelBase = new Date(1899, 11, 30);
            const jsDate = new Date(excelBase.getTime() + clean.Date * 86400000);
            clean.Date = jsDate.toISOString().split("T")[0];
          }
          return clean;
        });

        setData(cleanedData);
        setFiltered(cleanedData);
      } catch (err) {
        console.error("❌ Error fetching VideoReport data:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Date Filter
  useEffect(() => {
    if (!startDate && !endDate) {
      setFiltered(data);
      return;
    }
    const f = data.filter((row) => {
      const date = new Date(row.Date);
      const afterStart = startDate ? date >= new Date(startDate) : true;
      const beforeEnd = endDate ? date <= new Date(endDate) : true;
      return afterStart && beforeEnd;
    });
    setFiltered(f);
  }, [startDate, endDate, data]);

  const COLORS = ["#004c8f", "#00997d", "#ffae00", "#e04b00"];
  const totalImpressions = filtered.reduce((a, b) => a + (+b.Impressions || 0), 0);
  const totalClicks = filtered.reduce((a, b) => a + (+b.Clicks || 0), 0);
  const totalSpend = filtered.reduce((a, b) => a + (+b.Spend || 0), 0);
  const pieData = [
    { name: "Impressions", value: totalImpressions },
    { name: "Clicks", value: totalClicks },
    { name: "Spend", value: totalSpend },
  ];

  const headers = filtered.length > 0 ? Object.keys(filtered[0]) : [];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎥 Video Report Dashboard</h2>

      {/* 📅 Date Filter */}
      <div style={styles.filterContainer}>
        <div>
          <label style={styles.label}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
        <div>
          <label style={styles.label}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <h3 style={styles.noData}>No records available for this date range</h3>
      ) : (
        <>
          <div style={styles.chartCard}>
            <h3>Impressions, Spend & Clicks Overview</h3>
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={filtered}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="Impressions" fill="#00C49F" />
                <Bar yAxisId="right" dataKey="Spend" fill="#ff6113" />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Clicks"
                  stroke="#002fff"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <h3>Overall Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.tableCard}>
            <h3>Detailed Report</h3>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {headers.map((head, i) => (
                      <th key={i} style={styles.th}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr key={i}>
                      {headers.map((head, j) => (
                        <td key={j} style={styles.td}>{row[head]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { marginTop: "30px", background: "#fff", borderRadius: "10px", padding: "20px" },
  title: { textAlign: "center", color: "#2c3e50" },
  filterContainer: {
    display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "25px",
  },
  label: { marginRight: "8px", fontWeight: "bold" },
  dateInput: { padding: "6px 10px", borderRadius: "6px", border: "1px solid #ccc" },
  chartCard: { background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "30px" },
  tableCard: { background: "#fafafa", padding: "20px", borderRadius: "10px" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { border: "1px solid #ddd", padding: "8px", background: "#eaeaea" },
  td: { border: "1px solid #ddd", padding: "8px" },
  noData: { textAlign: "center", color: "#777", marginTop: "40px" },
};

export default VideoReport;
