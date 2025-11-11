// // // /

// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import * as XLSX from "xlsx";
// // // // // // // // import {
// // // // // // // //   BarChart,
// // // // // // // //   Bar,
// // // // // // // //   LineChart,
// // // // // // // //   Line,
// // // // // // // //   Tooltip,
// // // // // // // //   Legend,
// // // // // // // //   XAxis,
// // // // // // // //   YAxis,
// // // // // // // //   CartesianGrid,
// // // // // // // //   ResponsiveContainer,
// // // // // // // // } from "recharts";

// // // // // // // // export default function MainDashBoard() {
// // // // // // // //   const [data, setData] = useState([]);
// // // // // // // //   const [isLaptopView, setIsLaptopView] = useState(true);
// // // // // // // //   const [totals, setTotals] = useState({
// // // // // // // //     totalSpend: 0,
// // // // // // // //     totalBudget: 0,
// // // // // // // //     totalRemaining: 0,
// // // // // // // //     percentSpent: 0,
// // // // // // // //   });

// // // // // // // //   useEffect(() => {
// // // // // // // //     const handleResize = () => setIsLaptopView(window.innerWidth >= 992);
// // // // // // // //     handleResize();
// // // // // // // //     window.addEventListener("resize", handleResize);
// // // // // // // //     return () => window.removeEventListener("resize", handleResize);
// // // // // // // //   }, []);

// // // // // // // //   // Helper: cleans any messy Excel value
// // // // // // // //   const cleanNumber = (val) => {
// // // // // // // //     if (val === undefined || val === null || val === "") return 0;
// // // // // // // //     if (typeof val === "number" && !isNaN(val)) return val;
// // // // // // // //     const cleaned = String(val).replace(/[^0-9.-]+/g, "");
// // // // // // // //     const parsed = parseFloat(cleaned);
// // // // // // // //     return isNaN(parsed) ? 0 : parsed;
// // // // // // // //   };

// // // // // // // //   const pickKey = (keys, sampleRows, patterns) => {
// // // // // // // //     for (const k of keys) {
// // // // // // // //       const nk = k.trim().toLowerCase();
// // // // // // // //       for (const p of patterns) {
// // // // // // // //         if (nk === p || nk.includes(p)) return k;
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //     return null;
// // // // // // // //   };

// // // // // // // //   const handleFileUpload = (e) => {
// // // // // // // //     const file = e.target.files[0];
// // // // // // // //     if (!file) return;

// // // // // // // //     const reader = new FileReader();
// // // // // // // //     reader.onload = (event) => {
// // // // // // // //       const wb = XLSX.read(event.target.result, { type: "array" });
// // // // // // // //       const sheet = wb.Sheets[wb.SheetNames[0]];
// // // // // // // //       const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

// // // // // // // //       if (!jsonData.length) return setData([]);

// // // // // // // //       const headerKeys = Object.keys(jsonData[0]);

// // // // // // // //       const spendKey =
// // // // // // // //         pickKey(headerKeys, jsonData, ["spend", "spent", "amount", "cost"]) ||
// // // // // // // //         headerKeys[0];
// // // // // // // //       const totalBudgetKey =
// // // // // // // //         pickKey(headerKeys, jsonData, ["budget", "total budget", "total"]) ||
// // // // // // // //         headerKeys[1];
// // // // // // // //       const remainingKey =
// // // // // // // //         pickKey(headerKeys, jsonData, ["remaining", "left", "balance"]) ||
// // // // // // // //         null;
// // // // // // // //       const platformKey =
// // // // // // // //         pickKey(headerKeys, jsonData, ["platform", "channel", "name"]) ||
// // // // // // // //         headerKeys[0];

// // // // // // // //       const formatted = jsonData.map((row, i) => {
// // // // // // // //         const spend = cleanNumber(row[spendKey]);
// // // // // // // //         const totalBudget = cleanNumber(row[totalBudgetKey]);
// // // // // // // //         let remaining = remainingKey ? cleanNumber(row[remainingKey]) : 0;

// // // // // // // //         // Auto-calc Remaining if not present or invalid
// // // // // // // //         if (!remaining && totalBudget > 0) {
// // // // // // // //           remaining = totalBudget - spend;
// // // // // // // //         }

// // // // // // // //         return {
// // // // // // // //           Platform:
// // // // // // // //             row[platformKey] || row.Name || row.Channel || `Row ${i + 1}`,
// // // // // // // //           Spend: spend,
// // // // // // // //           "Total Budget": totalBudget,
// // // // // // // //           Remaining: remaining,
// // // // // // // //         };
// // // // // // // //       });

// // // // // // // //       // ✅ Accurate Totals
// // // // // // // //       const totalSpend = formatted.reduce((a, b) => a + b.Spend, 0);
// // // // // // // //       const totalBudget = formatted.reduce((a, b) => a + b["Total Budget"], 0);
// // // // // // // //       const totalRemaining =
// // // // // // // //         totalBudget > 0 ? totalBudget - totalSpend : 0;
// // // // // // // //       const percentSpent =
// // // // // // // //         totalBudget > 0 ? ((totalSpend / totalBudget) * 100).toFixed(2) : 0;

// // // // // // // //       setTotals({
// // // // // // // //         totalSpend,
// // // // // // // //         totalBudget,
// // // // // // // //         totalRemaining,
// // // // // // // //         percentSpent,
// // // // // // // //       });
// // // // // // // //       setData(formatted);
// // // // // // // //     };
// // // // // // // //     reader.readAsArrayBuffer(file);
// // // // // // // //   };

// // // // // // // //   const COLORS = {
// // // // // // // //     spend: "#007bff",
// // // // // // // //     total: "#28a745",
// // // // // // // //     remaining: "#ffc107",
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div
// // // // // // // //       style={{
// // // // // // // //         padding: 30,
// // // // // // // //         fontFamily: "Segoe UI, sans-serif",
// // // // // // // //         backgroundColor: "#f5f7fa",
// // // // // // // //         minHeight: "100vh",
// // // // // // // //       }}
// // // // // // // //     >
// // // // // // // //       <h1 style={{ textAlign: "center", color: "#222" }}>💵 Ad Budget Dashboard</h1>

// // // // // // // //       <div style={{ textAlign: "center", marginBottom: 30 }}>
// // // // // // // //         <input
// // // // // // // //           type="file"
// // // // // // // //           accept=".xlsx,.xls,.csv"
// // // // // // // //           onChange={handleFileUpload}
// // // // // // // //           style={{
// // // // // // // //             background: "#007bff",
// // // // // // // //             color: "white",
// // // // // // // //             border: "none",
// // // // // // // //             padding: "10px 15px",
// // // // // // // //             borderRadius: "8px",
// // // // // // // //             cursor: "pointer",
// // // // // // // //           }}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {data.length > 0 && (
// // // // // // // //         <>
// // // // // // // //           {/* ✅ KPI Cards */}
// // // // // // // //           <div
// // // // // // // //             style={{
// // // // // // // //               display: "flex",
// // // // // // // //               flexWrap: "wrap",
// // // // // // // //               justifyContent: "center",
// // // // // // // //               gap: "20px",
// // // // // // // //               marginBottom: 30,
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             {[
// // // // // // // //               { title: "Total Spend", color: "#007bff", value: totals.totalSpend },
// // // // // // // //               { title: "Total Budget", color: "#28a745", value: totals.totalBudget },
// // // // // // // //               { title: "Remaining", color: "#ffc107", value: totals.totalRemaining },
// // // // // // // //               { title: "% Spent", color: "#6f42c1", value: `${totals.percentSpent}%` },
// // // // // // // //             ].map((card, i) => (
// // // // // // // //               <div
// // // // // // // //                 key={i}
// // // // // // // //                 style={{
// // // // // // // //                   background: "white",
// // // // // // // //                   padding: 20,
// // // // // // // //                   borderRadius: 12,
// // // // // // // //                   width: "220px",
// // // // // // // //                   textAlign: "center",
// // // // // // // //                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <h4 style={{ color: card.color }}>{card.title}</h4>
// // // // // // // //                 <h2>
// // // // // // // //                   {typeof card.value === "number"
// // // // // // // //                     ? `$${card.value.toLocaleString()}`
// // // // // // // //                     : card.value}
// // // // // // // //                 </h2>
// // // // // // // //               </div>
// // // // // // // //             ))}
// // // // // // // //           </div>

// // // // // // // //           {/* 📋 Table */}
// // // // // // // //           <div
// // // // // // // //             style={{
// // // // // // // //               background: "white",
// // // // // // // //               padding: 20,
// // // // // // // //               borderRadius: 12,
// // // // // // // //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // // //               marginBottom: 40,
// // // // // // // //             }}
// // // // // // // //           >
// // // // // // // //             <h3>📋 Campaign Data (USD)</h3>
// // // // // // // //             <div style={{ overflowX: "auto" }}>
// // // // // // // //               <table
// // // // // // // //                 border="1"
// // // // // // // //                 cellPadding="8"
// // // // // // // //                 style={{
// // // // // // // //                   marginTop: 10,
// // // // // // // //                   width: "100%",
// // // // // // // //                   borderCollapse: "collapse",
// // // // // // // //                   fontSize: 14,
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <thead style={{ background: "#007bff", color: "white" }}>
// // // // // // // //                   <tr>
// // // // // // // //                     {Object.keys(data[0]).map((key) => (
// // // // // // // //                       <th key={key}>{key}</th>
// // // // // // // //                     ))}
// // // // // // // //                   </tr>
// // // // // // // //                 </thead>
// // // // // // // //                 <tbody>
// // // // // // // //                   {data.map((row, i) => (
// // // // // // // //                     <tr key={i}>
// // // // // // // //                       {Object.entries(row).map(([key, val], j) => (
// // // // // // // //                         <td key={j}>
// // // // // // // //                           {typeof val === "number" && key !== "Platform"
// // // // // // // //                             ? `$${val.toLocaleString("en-US", {
// // // // // // // //                                 minimumFractionDigits: 2,
// // // // // // // //                                 maximumFractionDigits: 2,
// // // // // // // //                               })}`
// // // // // // // //                             : val}
// // // // // // // //                         </td>
// // // // // // // //                       ))}
// // // // // // // //                     </tr>
// // // // // // // //                   ))}
// // // // // // // //                 </tbody>
// // // // // // // //               </table>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* 📊 Charts */}
// // // // // // // //           {isLaptopView ? (
// // // // // // // //             <>
// // // // // // // //               <div
// // // // // // // //                 style={{
// // // // // // // //                   background: "white",
// // // // // // // //                   padding: 20,
// // // // // // // //                   borderRadius: 12,
// // // // // // // //                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // // //                   marginBottom: 40,
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <h3>📊 Spend vs Total Budget vs Remaining</h3>
// // // // // // // //                 <ResponsiveContainer width="100%" height={350}>
// // // // // // // //                   <BarChart data={data}>
// // // // // // // //                     <CartesianGrid strokeDasharray="3 3" />
// // // // // // // //                     <XAxis dataKey="Platform" />
// // // // // // // //                     <YAxis />
// // // // // // // //                     <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
// // // // // // // //                     <Legend />
// // // // // // // //                     <Bar dataKey="Spend" fill={COLORS.spend} radius={[6, 6, 0, 0]} />
// // // // // // // //                     <Bar dataKey="Total Budget" fill={COLORS.total} radius={[6, 6, 0, 0]} />
// // // // // // // //                     <Bar dataKey="Remaining" fill={COLORS.remaining} radius={[6, 6, 0, 0]} />
// // // // // // // //                   </BarChart>
// // // // // // // //                 </ResponsiveContainer>
// // // // // // // //               </div>

// // // // // // // //               <div
// // // // // // // //                 style={{
// // // // // // // //                   background: "white",
// // // // // // // //                   padding: 20,
// // // // // // // //                   borderRadius: 12,
// // // // // // // //                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 <h3>📈 Spend Trend Across Platforms</h3>
// // // // // // // //                 <ResponsiveContainer width="100%" height={350}>
// // // // // // // //                   <LineChart data={data}>
// // // // // // // //                     <CartesianGrid strokeDasharray="3 3" />
// // // // // // // //                     <XAxis dataKey="Platform" />
// // // // // // // //                     <YAxis />
// // // // // // // //                     <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
// // // // // // // //                     <Legend />
// // // // // // // //                     <Line
// // // // // // // //                       type="monotone"
// // // // // // // //                       dataKey="Spend"
// // // // // // // //                       stroke={COLORS.spend}
// // // // // // // //                       strokeWidth={3}
// // // // // // // //                       dot={{ r: 5 }}
// // // // // // // //                     />
// // // // // // // //                     <Line
// // // // // // // //                       type="monotone"
// // // // // // // //                       dataKey="Remaining"
// // // // // // // //                       stroke={COLORS.remaining}
// // // // // // // //                       strokeWidth={3}
// // // // // // // //                       dot={{ r: 5 }}
// // // // // // // //                     />
// // // // // // // //                   </LineChart>
// // // // // // // //                 </ResponsiveContainer>
// // // // // // // //               </div>
// // // // // // // //             </>
// // // // // // // //           ) : (
// // // // // // // //             <div
// // // // // // // //               style={{
// // // // // // // //                 background: "#fff3cd",
// // // // // // // //                 color: "#856404",
// // // // // // // //                 padding: "20px",
// // // // // // // //                 borderRadius: "12px",
// // // // // // // //                 textAlign: "center",
// // // // // // // //                 fontWeight: "bold",
// // // // // // // //                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // // //               }}
// // // // // // // //             >
// // // // // // // //               ⚠️ Charts are best viewed on a laptop or desktop screen.
// // // // // // // //             </div>
// // // // // // // //           )}
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


// // // // // // // import React, { useState } from "react";
// // // // // // // import * as XLSX from "xlsx";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import OTTReport from "./OttReport";
// // // // // // // import SummaryReport from "./Summary";
// // // // // // // import AdWidget from "./Advertise";
// // // // // // // import VideoReport from "./NewVideoReport";

// // // // // // // const MainDashboard = () => {
// // // // // // //   const [sheets, setSheets] = useState([]);
// // // // // // //   const Navigate = useNavigate();

// // // // // // //   // ✅ Handle file upload
// // // // // // //   const handleFileUpload = async (e) => {
// // // // // // //     const file = e.target.files[0];
// // // // // // //     if (!file) return;

// // // // // // //     const reader = new FileReader();
// // // // // // //     reader.onload = async (event) => {
// // // // // // //       const data = new Uint8Array(event.target.result);
// // // // // // //       const workbook = XLSX.read(data, { type: "array" });

// // // // // // //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// // // // // // //         const sheet = workbook.Sheets[sheetName];
// // // // // // //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// // // // // // //         return { name: sheetName, data: jsonData };
// // // // // // //       });

// // // // // // //       setSheets(parsedSheets);

// // // // // // //       // ✅ Send to backend
// // // // // // //       try {
// // // // // // //         const res = await fetch("http://localhost:5000/api/upload", {
// // // // // // //           method: "POST",
// // // // // // //           headers: { "Content-Type": "application/json" },
// // // // // // //           body: JSON.stringify({ sheets: parsedSheets }),
// // // // // // //         });

// // // // // // //         const result = await res.json();
// // // // // // //         console.log("Uploaded:", result);
// // // // // // //         Navigate("/upload");
// // // // // // //       } catch (err) {
// // // // // // //         console.error("Upload failed:", err);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     reader.readAsArrayBuffer(file);
// // // // // // //   };

// // // // // // //   const handleReset = () => setSheets([]);

// // // // // // //   return (
// // // // // // //     <div style={styles.container}>
// // // // // // //       <div style={styles.uploadBox}>
// // // // // // //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// // // // // // //         <input
// // // // // // //           type="file"
// // // // // // //           accept=".xlsx, .xls"
// // // // // // //           onChange={handleFileUpload}
// // // // // // //           style={styles.input}
// // // // // // //         />
// // // // // // //         {sheets.length > 0 && (
// // // // // // //           <button onClick={handleReset} style={styles.resetButton}>
// // // // // // //             Clear Dashboard
// // // // // // //           </button>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div style={{ display: "none" }}>
// // // // // // //         <div style={styles.sections}>
// // // // // // //           {sheets[0] && (
// // // // // // //             <div style={styles.section}>
// // // // // // //               <h3 style={styles.sectionTitle}>📊 Ad Widget Report</h3>
// // // // // // //               <AdWidget data={sheets[0].data} />
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           {sheets[1] && (
// // // // // // //             <div style={styles.section}>
// // // // // // //               <h3 style={styles.sectionTitle}>🎥 Video Report</h3>
// // // // // // //               <VideoReport data={sheets[1].data} />
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           {sheets[2] && (
// // // // // // //             <div style={styles.section}>
// // // // // // //               <h3 style={styles.sectionTitle}>📺 OTT Report</h3>
// // // // // // //               <OTTReport data={sheets[2].data} />
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //           {sheets[3] && (
// // // // // // //             <div style={styles.section}>
// // // // // // //               <h3 style={styles.sectionTitle}>📈 Summary Report</h3>
// // // // // // //               <SummaryReport data={sheets[3].data} />
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const styles = {
// // // // // // //   container: {
// // // // // // //     padding: "25px",
// // // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // // //     backgroundColor: "#f4f6f9",
// // // // // // //     minHeight: "100vh",
// // // // // // //   },
// // // // // // //   uploadBox: {
// // // // // // //     textAlign: "center",
// // // // // // //     background: "white",
// // // // // // //     borderRadius: "10px",
// // // // // // //     padding: "20px",
// // // // // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // // // // //     marginBottom: "30px",
// // // // // // //   },
// // // // // // //   input: {
// // // // // // //     padding: "10px",
// // // // // // //     border: "1px solid #ccc",
// // // // // // //     borderRadius: "6px",
// // // // // // //     cursor: "pointer",
// // // // // // //     marginRight: "10px",
// // // // // // //   },
// // // // // // //   resetButton: {
// // // // // // //     backgroundColor: "#ff5b5b",
// // // // // // //     color: "white",
// // // // // // //     border: "none",
// // // // // // //     padding: "10px 15px",
// // // // // // //     borderRadius: "6px",
// // // // // // //     cursor: "pointer",
// // // // // // //   },
// // // // // // //   sections: {
// // // // // // //     display: "flex",
// // // // // // //     flexDirection: "column",
// // // // // // //     gap: "25px",
// // // // // // //   },
// // // // // // //   section: {
// // // // // // //     backgroundColor: "#fff",
// // // // // // //     borderRadius: "10px",
// // // // // // //     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // //     padding: "20px",
// // // // // // //   },
// // // // // // //   sectionTitle: {
// // // // // // //     marginBottom: "10px",
// // // // // // //     color: "#2d3a4b",
// // // // // // //   },
// // // // // // // };

// // // // // // // export default MainDashboard;


// // // // // // import React, { useState } from "react";
// // // // // // import * as XLSX from "xlsx";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import OTTReport from "./OttReport";
// // // // // // import SummaryReport from "./Summary";
// // // // // // import AdWidget from "./Advertise";
// // // // // // import VideoReport from "./NewVideoReport";

// // // // // // const MainDashboard = () => {
// // // // // //   const [sheets, setSheets] = useState([]);
// // // // // //   const Navigate = useNavigate();

// // // // // //   // ✅ Handle file upload
// // // // // //   const handleFileUpload = async (e) => {
// // // // // //     const file = e.target.files[0];
// // // // // //     if (!file) return;

// // // // // //     const token = localStorage.getItem("jwt").data.token;
// // // // // //     if (!token) {
// // // // // //       alert("User not authenticated. Please login again.");
// // // // // //       return;
// // // // // //     }

// // // // // //     const reader = new FileReader();
// // // // // //     reader.onload = async (event) => {
// // // // // //       const data = new Uint8Array(event.target.result);
// // // // // //       const workbook = XLSX.read(data, { type: "array" });

// // // // // //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// // // // // //         const sheet = workbook.Sheets[sheetName];
// // // // // //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// // // // // //         return { name: sheetName, data: jsonData };
// // // // // //       });

// // // // // //       setSheets(parsedSheets);

// // // // // //       // ✅ Send to backend
// // // // // //       try {
// // // // // //         const res = await fetch("http://localhost:5000/api/upload", {
// // // // // //           method: "POST",
// // // // // //           headers: {
// // // // // //             "Content-Type": "application/json",
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //           body: JSON.stringify({ sheets: parsedSheets }),
// // // // // //         });

// // // // // //         if (!res.ok) throw new Error("Upload failed");
// // // // // //         const result = await res.json();
// // // // // //         console.log("Uploaded:", result);
// // // // // //         Navigate("/upload");
// // // // // //       } catch (err) {
// // // // // //         console.error("Upload failed:", err);
// // // // // //       }
// // // // // //     };

// // // // // //     reader.readAsArrayBuffer(file);
// // // // // //   };

// // // // // //   const handleReset = () => setSheets([]);

// // // // // //   return (
// // // // // //     <div style={styles.container}>
// // // // // //       <div style={styles.uploadBox}>
// // // // // //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// // // // // //         <input
// // // // // //           type="file"
// // // // // //           accept=".xlsx, .xls"
// // // // // //           onChange={handleFileUpload}
// // // // // //           style={styles.input}
// // // // // //         />
// // // // // //         {sheets.length > 0 && (
// // // // // //           <button onClick={handleReset} style={styles.resetButton}>
// // // // // //             Clear Dashboard
// // // // // //           </button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // const styles = {
// // // // // //   container: {
// // // // // //     padding: "25px",
// // // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // // //     backgroundColor: "#f4f6f9",
// // // // // //     minHeight: "100vh",
// // // // // //   },
// // // // // //   uploadBox: {
// // // // // //     textAlign: "center",
// // // // // //     background: "white",
// // // // // //     borderRadius: "10px",
// // // // // //     padding: "20px",
// // // // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // // // //     marginBottom: "30px",
// // // // // //   },
// // // // // //   input: {
// // // // // //     padding: "10px",
// // // // // //     border: "1px solid #ccc",
// // // // // //     borderRadius: "6px",
// // // // // //     cursor: "pointer",
// // // // // //     marginRight: "10px",
// // // // // //   },
// // // // // //   resetButton: {
// // // // // //     backgroundColor: "#ff5b5b",
// // // // // //     color: "white",
// // // // // //     border: "none",
// // // // // //     padding: "10px 15px",
// // // // // //     borderRadius: "6px",
// // // // // //     cursor: "pointer",
// // // // // //   },
// // // // // // };

// // // // // // export default MainDashboard;


// // // // // import React, { useEffect, useState } from "react";
// // // // // import * as XLSX from "xlsx";
// // // // // import axios from "axios";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import OTTReport from "./OttReport";
// // // // // import SummaryReport from "./Summary";
// // // // // import AdWidget from "./Advertise";
// // // // // import VideoReport from "./NewVideoReport";

// // // // // const MainDashboard = () => {
// // // // //   const [sheets, setSheets] = useState([]);
// // // // //   const navigate = useNavigate();


// // // // //   // ✅ Handle Excel file upload
// // // // //   const handleFileUpload = async (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (!file) return;

// // // // //     const storedData = localStorage.getItem("jwt").data.token
// // // // //     if (!storedData) {
// // // // //       alert("User not authenticated. Please login again.");
// // // // //       return;
// // // // //     }

   
    
// // // // //     if (!token) {
// // // // //       alert("Invalid token. Please login again.");
// // // // //       return;
// // // // //     }

// // // // //     const reader = new FileReader();
// // // // //     reader.onload = async (event) => {
// // // // //       const data = new Uint8Array(event.target.result);
// // // // //       const workbook = XLSX.read(data, { type: "array" });

// // // // //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// // // // //         const sheet = workbook.Sheets[sheetName];
// // // // //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// // // // //         return { name: sheetName, data: jsonData };
// // // // //       });

// // // // //       setSheets(parsedSheets);

// // // // //       try {
// // // // //         const res = await axios.post(
// // // // //           "http://localhost:5000/api/upload",
// // // // //           { sheets: parsedSheets },
// // // // //           {
// // // // //             headers: {
// // // // //               Authorization: `Bearer ${token}`,
// // // // //               "Content-Type": "application/json",
// // // // //             },
// // // // //           }
// // // // //         );

// // // // //         console.log("✅ Uploaded:", res.data);
// // // // //         navigate("/upload");
// // // // //       } catch (err) {
// // // // //         console.error("❌ Upload failed:", err.response?.data || err.message);
// // // // //         alert("Upload failed. Check console for details.");
// // // // //       }
// // // // //     };

// // // // //     reader.readAsArrayBuffer(file);
// // // // //   };

// // // // //   const handleReset = () => setSheets([]);

// // // // //   return (
// // // // //     <div style={styles.container}>
// // // // //       <div style={styles.uploadBox}>
// // // // //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// // // // //         <input
// // // // //           type="file"
// // // // //           accept=".xlsx, .xls"
// // // // //           onChange={handleFileUpload}
// // // // //           style={styles.input}
// // // // //         />
// // // // //         {sheets.length > 0 && (
// // // // //           <button onClick={handleReset} style={styles.resetButton}>
// // // // //             Clear Dashboard
// // // // //           </button>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const styles = {
// // // // //   container: {
// // // // //     padding: "25px",
// // // // //     fontFamily: "Segoe UI, sans-serif",
// // // // //     backgroundColor: "#f4f6f9",
// // // // //     minHeight: "100vh",
// // // // //   },
// // // // //   uploadBox: {
// // // // //     textAlign: "center",
// // // // //     background: "white",
// // // // //     borderRadius: "10px",
// // // // //     padding: "20px",
// // // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // // //     marginBottom: "30px",
// // // // //   },
// // // // //   input: {
// // // // //     padding: "10px",
// // // // //     border: "1px solid #ccc",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     marginRight: "10px",
// // // // //   },
// // // // //   resetButton: {
// // // // //     backgroundColor: "#ff5b5b",
// // // // //     color: "white",
// // // // //     border: "none",
// // // // //     padding: "10px 15px",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //   },
// // // // // };

// // // // // export default MainDashboard;


// // // // import React, { useState } from "react";
// // // // import * as XLSX from "xlsx";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";

// // // // const MainDashboard = () => {
// // // //   const [sheets, setSheets] = useState([]);
// // // //   const navigate = useNavigate();

// // // //   const handleFileUpload = async (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;

// // // //     const storedData = localStorage.getItem("jwt");
// // // //     if (!storedData) {
// // // //       alert("User not authenticated. Please login again.");
// // // //       return;
// // // //     }

// // // //     const token = JSON.parse(storedData)?.data?.token;
// // // //     if (!token) {
// // // //       alert("Invalid token. Please login again.");
// // // //       return;
// // // //     }

// // // //     const reader = new FileReader();
// // // //     reader.onload = async (event) => {
// // // //       const data = new Uint8Array(event.target.result);
// // // //       const workbook = XLSX.read(data, { type: "array" });

// // // //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// // // //         const sheet = workbook.Sheets[sheetName];
// // // //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// // // //         return { name: sheetName, data: jsonData };
// // // //       });

// // // //       setSheets(parsedSheets);

// // // //       try {
// // // //         const res = await axios.post(
// // // //           "http://localhost:5000/api/upload",
// // // //           { sheets: parsedSheets },
// // // //           {
// // // //             headers: {
// // // //               Authorization: `Bearer ${token}`,
// // // //               "Content-Type": "application/json",
// // // //             },
// // // //           }
// // // //         );
// // // //         console.log("✅ Uploaded:", res.data);
// // // //         navigate("/upload");
// // // //       } catch (err) {
// // // //         console.error("❌ Upload failed:", err.response?.data || err.message);
// // // //         alert("Upload failed. Check console for details.");
// // // //       }
// // // //     };

// // // //     reader.readAsArrayBuffer(file);
// // // //   };

// // // //   const handleReset = () => setSheets([]);

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <div style={styles.uploadBox}>
// // // //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// // // //         <input
// // // //           type="file"
// // // //           accept=".xlsx, .xls"
// // // //           onChange={handleFileUpload}
// // // //           style={styles.input}
// // // //         />
// // // //         {sheets.length > 0 && (
// // // //           <button onClick={handleReset} style={styles.resetButton}>
// // // //             Clear Dashboard
// // // //           </button>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // const styles = {
// // // //   container: {
// // // //     padding: "25px",
// // // //     fontFamily: "Segoe UI, sans-serif",
// // // //     backgroundColor: "#f4f6f9",
// // // //     minHeight: "100vh",
// // // //   },
// // // //   uploadBox: {
// // // //     textAlign: "center",
// // // //     background: "white",
// // // //     borderRadius: "10px",
// // // //     padding: "20px",
// // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // //     marginBottom: "30px",
// // // //   },
// // // //   input: {
// // // //     padding: "10px",
// // // //     border: "1px solid #ccc",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //     marginRight: "10px",
// // // //   },
// // // //   resetButton: {
// // // //     backgroundColor: "#ff5b5b",
// // // //     color: "white",
// // // //     border: "none",
// // // //     padding: "10px 15px",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //   },
// // // // };

// // // // export default MainDashboard;


// // // import React, { useState } from "react";
// // // import * as XLSX from "xlsx";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import OTTReport from "./OttReport";
// // // import SummaryReport from "./Summary";
// // // import AdWidget from "./Advertise";
// // // import VideoReport from "./NewVideoReport";

// // // const MainDashboard = () => {
// // //   const [sheets, setSheets] = useState([]);
// // //   const navigate = useNavigate();

// // //   // ✅ Handle Excel file upload
// // //   const handleFileUpload = async (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;

// // //     // ✅ Extract JWT token safely
// // //     const storedData = localStorage.getItem("jwt");
// // //     const token = storedData ? JSON.parse(storedData).token : null;

// // //     if (!token) {
// // //       alert("User not authenticated. Please login again.");
// // //       return;
// // //     }

// // //     const reader = new FileReader();
// // //     reader.onload = async (event) => {
// // //       const data = new Uint8Array(event.target.result);
// // //       const workbook = XLSX.read(data, { type: "array" });

// // //       // ✅ Parse only first 4 worksheets
// // //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// // //         const sheet = workbook.Sheets[sheetName];
// // //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// // //         return { name: sheetName, data: jsonData };
// // //       });

// // //       setSheets(parsedSheets);

// // //       try {
// // //         // ✅ Upload data to backend with Authorization header
// // //         const res = await axios.post(
// // //           "http://localhost:5000/api/upload",
// // //           { sheets: parsedSheets },
// // //           {
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         );

// // //         console.log("✅ Uploaded successfully:", res.data);
// // //         navigate("/upload");
// // //       } catch (err) {
// // //         console.error("❌ Upload failed:", err.response?.data || err.message);
// // //         alert("Upload failed. Check console for details.");
// // //       }
// // //     };

// // //     reader.readAsArrayBuffer(file);
// // //   };

// // //   const handleReset = () => setSheets([]);

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.uploadBox}>
// // //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// // //         <input
// // //           type="file"
// // //           accept=".xlsx, .xls"
// // //           onChange={handleFileUpload}
// // //           style={styles.input}
// // //         />
// // //         {sheets.length > 0 && (
// // //           <button onClick={handleReset} style={styles.resetButton}>
// // //             Clear Dashboard
// // //           </button>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const styles = {
// // //   container: {
// // //     padding: "25px",
// // //     fontFamily: "Segoe UI, sans-serif",
// // //     backgroundColor: "#f4f6f9",
// // //     minHeight: "100vh",
// // //   },
// // //   uploadBox: {
// // //     textAlign: "center",
// // //     background: "white",
// // //     borderRadius: "10px",
// // //     padding: "20px",
// // //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // //     marginBottom: "30px",
// // //   },
// // //   input: {
// // //     padding: "10px",
// // //     border: "1px solid #ccc",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     marginRight: "10px",
// // //   },
// // //   resetButton: {
// // //     backgroundColor: "#ff5b5b",
// // //     color: "white",
// // //     border: "none",
// // //     padding: "10px 15px",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //   },
// // // };

// // // export default MainDashboard;


// // import React, { useEffect, useState } from "react";
// // import * as XLSX from "xlsx";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import OTTReport from "./OttReport";
// // import SummaryReport from "./Summary";
// // import AdWidget from "./Advertise";
// // import VideoReport from "./NewVideoReport";

// // const MainDashboard = () => {
// //   const [sheets, setSheets] = useState([]);
// //   const navigate = useNavigate();
// //   useEffect(()=>{
// //         const token = JSON.parse(localStorage.getItem("j")).token
// // console.log(token);

// //   },[])

// //   const handleFileUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     const userToken = JSON.parse(localStorage.getItem("jwt")).token
// //     if (!userToken) {
// //       alert("User not authenticated. Please login again.");
// //       navigate("/login");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = async (event) => {
// //       const data = new Uint8Array(event.target.result);
// //       const workbook = XLSX.read(data, { type: "array" });

// //       const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
// //         const sheet = workbook.Sheets[sheetName];
// //         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
// //         return { name: sheetName, data: jsonData };
// //       });

// //       setSheets(parsedSheets);

// //       try {
// //         const res = await axios.post(
// //           "http://localhost:5000/api/upload",
// //           { sheets: parsedSheets },
// //           {
// //             headers: {
// //                Authorization: `Bearer ${userToken}`,
// //               "Content-Type": "application/json",
             
// //             },
// //           }
// //         );

// //         console.log("✅ Uploaded successfully:", res.data);
// //         navigate("/upload");
// //       } catch (err) {
// //         console.error("❌ Upload failed:", err.response?.data || err.message);
// //         alert("Upload failed. Check console for details.");
// //       }
// //     };

// //     reader.readAsArrayBuffer(file);
// //   };

// //   const handleReset = () => setSheets([]);

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.uploadBox}>
// //         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
// //         <input
// //           type="file"
// //           accept=".xlsx, .xls"
// //           onChange={handleFileUpload}
// //           style={styles.input}
// //         />
// //         {sheets.length > 0 && (
// //           <button onClick={handleReset} style={styles.resetButton}>
// //             Clear Dashboard
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     padding: "25px",
// //     fontFamily: "Segoe UI, sans-serif",
// //     backgroundColor: "#f4f6f9",
// //     minHeight: "100vh",
// //   },
// //   uploadBox: {
// //     textAlign: "center",
// //     background: "white",
// //     borderRadius: "10px",
// //     padding: "20px",
// //     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// //     marginBottom: "30px",
// //   },
// //   input: {
// //     padding: "10px",
// //     border: "1px solid #ccc",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     marginRight: "10px",
// //   },
// //   resetButton: {
// //     backgroundColor: "#ff5b5b",
// //     color: "white",
// //     border: "none",
// //     padding: "10px 15px",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //   },
// // };

// // export default MainDashboard;

// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MainDashboard = () => {
//   const [sheets, setSheets] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const stored = localStorage.getItem("jwt")
//     if (!stored) {
//       console.warn("No JWT found in localStorage");
//       return;
//     }
//     const tokenData = JSON.parse(stored);
//     console.log("✅ Loaded token:", tokenData.token);
//   }, []);

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const stored = localStorage.getItem("jwt");
//     if (!stored) {
//       alert("User not authenticated. Please login again.");
//       navigate("/login");
//       return;
//     }

//     const { token } = JSON.parse(stored);
//     if (!token) {
//       alert("Invalid token. Please login again.");
//       navigate("/login");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       const parsedSheets = workbook.SheetNames.slice(0, 10).map((sheetName) => {
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//         return { name: sheetName, data: jsonData };
//       });

//       setSheets(parsedSheets);

//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/upload",
//           { sheets: parsedSheets },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("✅ Uploaded successfully:", res.data);
//         navigate("/upload");
//       } catch (err) {
//         console.error("❌ Upload failed:", err.response?.data || err.message);
//         alert("Upload failed. Check console for details.");
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleReset = () => setSheets([]);

//   return (
//     <div style={styles.container}>
//       <div style={styles.uploadBox}>
//         <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           style={styles.input}
//         />
//         {sheets.length > 0 && (
//           <button onClick={handleReset} style={styles.resetButton}>
//             Clear Dashboard
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "25px",
//     fontFamily: "Segoe UI, sans-serif",
//     backgroundColor: "#f4f6f9",
//     minHeight: "100vh",
//   },
//   uploadBox: {
//     textAlign: "center",
//     background: "white",
//     borderRadius: "10px",
//     padding: "20px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     marginBottom: "30px",
//   },
//   input: {
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginRight: "10px",
//   },
//   resetButton: {
//     backgroundColor: "#ff5b5b",
//     color: "white",
//     border: "none",
//     padding: "10px 15px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default MainDashboard;

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const [sheets, setSheets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("jwt");
    if (!stored) {
      console.warn("⚠️ No JWT found in localStorage");
      return;
    }
    const tokenData = JSON.parse(stored);
    console.log("✅ Loaded token:", tokenData.token);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const stored = localStorage.getItem("jwt");
    if (!stored) {
      alert("User not authenticated. Please login again.");
      navigate("/login");
      return;
    }

    const { token } = JSON.parse(stored);
    if (!token) {
      alert("Invalid token. Please login again.");
      navigate("/login");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // ✅ Parse up to 10 worksheets only
      const parsedSheets = workbook.SheetNames.slice(0, 10).map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        return { name: sheetName, data: jsonData };
      });

      setSheets(parsedSheets);

      try {
        // ✅ Send to backend with Bearer token
        const res = await axios.post(
          "http://localhost:5000/api/upload",
          { sheets: parsedSheets },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Uploaded successfully:", res.data);
        navigate("/upload");
      } catch (err) {
        console.error("❌ Upload failed:", err.response?.data || err.message);
        alert("Upload failed. Check console for details.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => setSheets([]);

  return (
    <div style={styles.container}>
      <div style={styles.uploadBox}>
        <h2>📂 Upload Excel File (up to 10 Worksheets)</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={styles.input}
        />

        {sheets.length > 0 && (
          <>
            <p style={styles.infoText}>
              ✅ Detected {sheets.length} sheet{ sheets.length > 1 ? "s" : "" }:
              {" "}
              {sheets.map((s) => s.name).join(", ")}
            </p>
            <button onClick={handleReset} style={styles.resetButton}>
              Clear Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  uploadBox: {
    textAlign: "center",
    background: "white",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  resetButton: {
    backgroundColor: "#ff5b5b",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px",
  },
  infoText: {
    marginTop: "15px",
    color: "#333",
    fontSize: "14px",
  },
};

export default MainDashboard;
