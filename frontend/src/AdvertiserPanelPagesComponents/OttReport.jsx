

// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import {
// // // // // // //   ComposedChart,
// // // // // // //   Bar,
// // // // // // //   Line,
// // // // // // //   XAxis,
// // // // // // //   YAxis,
// // // // // // //   Tooltip,
// // // // // // //   Legend,
// // // // // // //   CartesianGrid,
// // // // // // //   ResponsiveContainer,
// // // // // // // } from "recharts";

// // // // // // // const OttReport = () => {
// // // // // // //   const [data, setData] = useState([]);
// // // // // // //   const [totals, setTotals] = useState({
// // // // // // //     spend: 0,
// // // // // // //     impressions: 0,
// // // // // // //     clicks: 0,
// // // // // // //     ctr: 0,
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     try {
// // // // // // //       const stored = localStorage.getItem("uploadedSheets");
// // // // // // //       if (stored) {
// // // // // // //         const sheets = JSON.parse(stored);
// // // // // // //         // Pick Sheet1 or Sheet3 based on your structure
// // // // // // //         const ottSheet =
// // // // // // //           sheets.find(
// // // // // // //             (s) =>
// // // // // // //               s.name.toLowerCase().includes("sheet1") ||
// // // // // // //               s.name.toLowerCase().includes("ott")
// // // // // // //           ) || sheets[0];

// // // // // // //         if (ottSheet && ottSheet.data && ottSheet.data.length > 0) {
// // // // // // //           const clean = cleanData(ottSheet.data);
// // // // // // //           setData(clean);
// // // // // // //           calculateTotals(clean);
// // // // // // //         } else {
// // // // // // //           console.warn("⚠️ No OTT sheet found or it's empty");
// // // // // // //         }
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("❌ Error loading OTT sheet:", err);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   const excelSerialToDate = (serial) => {
// // // // // // //     if (typeof serial === "number") {
// // // // // // //       const utc_days = Math.floor(serial - 25569);
// // // // // // //       const d = new Date(utc_days * 86400 * 1000);
// // // // // // //       return d.toISOString().split("T")[0];
// // // // // // //     }
// // // // // // //     return serial;
// // // // // // //   };

// // // // // // //   const cleanData = (rows) => {
// // // // // // //     if (!rows || !rows.length) return [];

// // // // // // //     // Trim all keys to remove spaces like " Clicks "
// // // // // // //     const cleanedRows = rows.map((r) => {
// // // // // // //       const obj = {};
// // // // // // //       Object.keys(r).forEach((key) => {
// // // // // // //         obj[key.trim()] = r[key];
// // // // // // //       });
// // // // // // //       return obj;
// // // // // // //     });

// // // // // // //     const headers = Object.keys(cleanedRows[0]);
// // // // // // //     console.log("🧾 Cleaned OTT Headers:", headers);

// // // // // // //     const findKey = (patterns) =>
// // // // // // //       headers.find((h) =>
// // // // // // //         patterns.some((p) => h.toLowerCase().includes(p))
// // // // // // //       );

// // // // // // //     const dateKey = findKey(["date", "day"]) || headers[0];
// // // // // // //     const spendKey = findKey(["spend", "revenue", "cost"]);
// // // // // // //     const impKey = findKey(["impression"]);
// // // // // // //     const clickKey = findKey(["click"]);
// // // // // // //     const ctrKey = findKey(["ctr", "rate"]);

// // // // // // //     console.log("✅ Detected Keys:", {
// // // // // // //       dateKey,
// // // // // // //       spendKey,
// // // // // // //       impKey,
// // // // // // //       clickKey,
// // // // // // //       ctrKey,
// // // // // // //     });

// // // // // // //     const cleanNumber = (val) => {
// // // // // // //       if (val === null || val === undefined || val === "") return 0;
// // // // // // //       const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// // // // // // //       return isNaN(num) ? 0 : num;
// // // // // // //     };

// // // // // // //     return cleanedRows.map((r) => ({
// // // // // // //       date: excelSerialToDate(r[dateKey]),
// // // // // // //       spend: cleanNumber(r[spendKey]),
// // // // // // //       impressions: cleanNumber(r[impKey]),
// // // // // // //       clicks: cleanNumber(r[clickKey]),
// // // // // // //       ctr: cleanNumber(r[ctrKey]),
// // // // // // //     }));
// // // // // // //   };

// // // // // // //   const calculateTotals = (rows) => {
// // // // // // //     const spend = rows.reduce((a, b) => a + b.spend, 0);
// // // // // // //     const impressions = rows.reduce((a, b) => a + b.impressions, 0);
// // // // // // //     const clicks = rows.reduce((a, b) => a + b.clicks, 0);
// // // // // // //     const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
// // // // // // //     setTotals({ spend, impressions, clicks, ctr });
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div
// // // // // // //       style={{
// // // // // // //         padding: 30,
// // // // // // //         fontFamily: "Segoe UI",
// // // // // // //         background: "#f9fafc",
// // // // // // //         minHeight: "100vh",
// // // // // // //       }}
// // // // // // //     >
// // // // // // //       <h2 style={{ textAlign: "center", marginBottom: 20 }}>
// // // // // // //         📊 OTT Daily Performance
// // // // // // //       </h2>

// // // // // // //       {data.length > 0 ? (
// // // // // // //         <>
// // // // // // //           {/* KPI Cards */}
// // // // // // //           <div
// // // // // // //             style={{
// // // // // // //               display: "flex",
// // // // // // //               flexWrap: "wrap",
// // // // // // //               justifyContent: "center",
// // // // // // //               gap: 20,
// // // // // // //               marginBottom: 40,
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {[
// // // // // // //               { label: "Total Spend", value: `$${totals.spend.toFixed(2)}` },
// // // // // // //               {
// // // // // // //                 label: "Total Impressions",
// // // // // // //                 value: totals.impressions.toLocaleString(),
// // // // // // //               },
// // // // // // //               { label: "Total Clicks", value: totals.clicks.toLocaleString() },
// // // // // // //               { label: "CTR", value: `${totals.ctr}%` },
// // // // // // //             ].map((item, i) => (
// // // // // // //               <div
// // // // // // //                 key={i}
// // // // // // //                 style={{
// // // // // // //                   background: "white",
// // // // // // //                   padding: "16px 20px",
// // // // // // //                   borderRadius: 10,
// // // // // // //                   minWidth: 180,
// // // // // // //                   textAlign: "center",
// // // // // // //                   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <div style={{ fontSize: 13, color: "#888" }}>{item.label}</div>
// // // // // // //                 <div
// // // // // // //                   style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}
// // // // // // //                 >
// // // // // // //                   {item.value}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>

// // // // // // //           {/* Chart */}
// // // // // // //           <div
// // // // // // //             style={{
// // // // // // //               background: "white",
// // // // // // //               borderRadius: 10,
// // // // // // //               padding: 20,
// // // // // // //               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             <h4 style={{ marginBottom: 20 }}>📈 Spend (Bar) vs Clicks (Line)</h4>
// // // // // // //             <ResponsiveContainer width="100%" height={400}>
// // // // // // //               <ComposedChart data={data}>
// // // // // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // // // // //                 <XAxis dataKey="date" />
// // // // // // //                 <YAxis
// // // // // // //                   yAxisId="left"
// // // // // // //                   label={{
// // // // // // //                     value: "Spend ($)",
// // // // // // //                     angle: -90,
// // // // // // //                     position: "insideLeft",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //                 <YAxis
// // // // // // //                   yAxisId="right"
// // // // // // //                   orientation="right"
// // // // // // //                   label={{
// // // // // // //                     value: "Clicks",
// // // // // // //                     angle: 90,
// // // // // // //                     position: "insideRight",
// // // // // // //                   }}
// // // // // // //                 />
// // // // // // //                 <Tooltip />
// // // // // // //                 <Legend />
// // // // // // //                 <Bar
// // // // // // //                   yAxisId="left"
// // // // // // //                   dataKey="spend"
// // // // // // //                   fill="#005780ff"
// // // // // // //                   barSize={20}
// // // // // // //                   radius={[6, 6, 0, 0]}
// // // // // // //                 />
// // // // // // //                 <Line
// // // // // // //                   yAxisId="right"
// // // // // // //                   type="monotone"
// // // // // // //                   dataKey="clicks"
// // // // // // //                   stroke="#ff00ff"
// // // // // // //                   strokeWidth={3}
// // // // // // //                   dot={false}
// // // // // // //                 />
// // // // // // //               </ComposedChart>
// // // // // // //             </ResponsiveContainer>
// // // // // // //           </div>
// // // // // // //         </>
// // // // // // //       ) : (
// // // // // // //         <p style={{ textAlign: "center", color: "#888" }}>
// // // // // // //           ⚠️ No OTT data found. Check if “uploadedSheets” exists in localStorage.
// // // // // // //         </p>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default OttReport;

// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import axios from "axios";
// // // // // // import {
// // // // // //   ComposedChart,
// // // // // //   Bar,
// // // // // //   Line,
// // // // // //   XAxis,
// // // // // //   YAxis,
// // // // // //   Tooltip,
// // // // // //   Legend,
// // // // // //   CartesianGrid,
// // // // // //   ResponsiveContainer,
// // // // // // } from "recharts";

// // // // // // const OttReport = () => {
// // // // // //   const [data, setData] = useState([]);
// // // // // //   const [totals, setTotals] = useState({
// // // // // //     spend: 0,
// // // // // //     impressions: 0,
// // // // // //     clicks: 0,
// // // // // //     ctr: 0,
// // // // // //   });

// // // // // //   // ✅ Extract token from localStorage
// // // // // //   const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;
// // // // // //   console.log(userToken, "token");

// // // // // //   const cleanNumber = (val) => {
// // // // // //     if (!val) return 0;
// // // // // //     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// // // // // //     return isNaN(num) ? 0 : num;
// // // // // //   };

// // // // // //   const calculateTotals = (rows) => {
// // // // // //     const spend = rows.reduce((a, b) => a + (b.spend || 0), 0);
// // // // // //     const impressions = rows.reduce((a, b) => a + (b.impressions || 0), 0);
// // // // // //     const clicks = rows.reduce((a, b) => a + (b.clicks || 0), 0);
// // // // // //     const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
// // // // // //     setTotals({ spend, impressions, clicks, ctr });
// // // // // //   };

// // // // // //   const fetchData = async () => {
// // // // // //     try {
// // // // // //       const res = await axios.get("http://localhost:5000/api/getallsheets", {
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${userToken}`,
// // // // // //         },
// // // // // //       });

// // // // // //       // ✅ Take the first sheet data
// // // // // //       const sheetData = res.data[0]?.data || [];
// // // // // //       console.log(sheetData,"sheetadata");
      

// // // // // //       // ✅ Normalize data keys
// // // // // //       const formatted = sheetData.map((r) => ({
// // // // // //         date: r["Date"] || r["date"] || "",
// // // // // //         spend: cleanNumber(r["Spend"] || r["spend"]),
// // // // // //         impressions: cleanNumber(r["Impressions"] || r["impressions"]),
// // // // // //         clicks: cleanNumber(r["Clicks"] || r["clicks"]),
// // // // // //         ctr: cleanNumber(r["CTR"] || r["ctr"]),
// // // // // //       }));

// // // // // //       setData(formatted);
// // // // // //       calculateTotals(formatted);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error fetching OTT data:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         padding: 30,
// // // // // //         fontFamily: "Segoe UI",
// // // // // //         background: "#f9fafc",
// // // // // //         minHeight: "100vh",
// // // // // //       }}
// // // // // //     >
// // // // // //       <h2 style={{ textAlign: "center", marginBottom: 20 }}>
// // // // // //         📊 OTT Daily Performance
// // // // // //       </h2>

// // // // // //       {/* KPI Cards */}
// // // // // //       {data.length > 0 && (
// // // // // //         <div
// // // // // //           style={{
// // // // // //             display: "flex",
// // // // // //             flexWrap: "wrap",
// // // // // //             justifyContent: "center",
// // // // // //             gap: 20,
// // // // // //             marginBottom: 40,
// // // // // //           }}
// // // // // //         >
// // // // // //           {[
// // // // // //             { label: "Total Spend", value: `$${totals.spend.toFixed(2)}` },
// // // // // //             {
// // // // // //               label: "Total Impressions",
// // // // // //               value: totals.impressions.toLocaleString(),
// // // // // //             },
// // // // // //             { label: "Total Clicks", value: totals.clicks.toLocaleString() },
// // // // // //             { label: "CTR", value: `${totals.ctr}%` },
// // // // // //           ].map((item, i) => (
// // // // // //             <div
// // // // // //               key={i}
// // // // // //               style={{
// // // // // //                 background: "white",
// // // // // //                 padding: "16px 20px",
// // // // // //                 borderRadius: 10,
// // // // // //                 minWidth: 180,
// // // // // //                 textAlign: "center",
// // // // // //                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// // // // // //               }}
// // // // // //             >
// // // // // //               <div style={{ fontSize: 13, color: "#888" }}>{item.label}</div>
// // // // // //               <div
// // // // // //                 style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}
// // // // // //               >
// // // // // //                 {item.value}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Chart */}
// // // // // //       {data.length > 0 ? (
// // // // // //         <div
// // // // // //           style={{
// // // // // //             background: "white",
// // // // // //             borderRadius: 10,
// // // // // //             padding: 20,
// // // // // //             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // // //           }}
// // // // // //         >
// // // // // //           <h4 style={{ marginBottom: 20 }}>📈 Spend (Bar) vs Clicks (Line)</h4>
// // // // // //           <ResponsiveContainer width="100%" height={400}>
// // // // // //             <ComposedChart data={data}>
// // // // // //               <CartesianGrid strokeDasharray="3 3" />
// // // // // //               <XAxis dataKey="date" />
// // // // // //               <YAxis
// // // // // //                 yAxisId="left"
// // // // // //                 label={{ value: "Spend ($)", angle: -90, position: "insideLeft" }}
// // // // // //               />
// // // // // //               <YAxis
// // // // // //                 yAxisId="right"
// // // // // //                 orientation="right"
// // // // // //                 label={{
// // // // // //                   value: "Clicks",
// // // // // //                   angle: 90,
// // // // // //                   position: "insideRight",
// // // // // //                 }}
// // // // // //               />
// // // // // //               <Tooltip />
// // // // // //               <Legend />
// // // // // //               <Bar
// // // // // //                 yAxisId="left"
// // // // // //                 dataKey="spend"
// // // // // //                 fill="#28a745"
// // // // // //                 barSize={20}
// // // // // //                 radius={[6, 6, 0, 0]}
// // // // // //               />
// // // // // //               <Line
// // // // // //                 yAxisId="right"
// // // // // //                 type="monotone"
// // // // // //                 dataKey="clicks"
// // // // // //                 stroke="#ff00ff"
// // // // // //                 strokeWidth={3}
// // // // // //                 dot={false}
// // // // // //               />
// // // // // //             </ComposedChart>
// // // // // //           </ResponsiveContainer>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <p style={{ textAlign: "center", color: "#888" }}>
// // // // // //           No data available from backend.
// // // // // //         </p>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default OttReport;

// // // // // import React, { useState, useEffect } from "react";
// // // // // import axios from "axios";
// // // // // import {
// // // // //   ComposedChart,
// // // // //   Bar,
// // // // //   Line,
// // // // //   XAxis,
// // // // //   YAxis,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   CartesianGrid,
// // // // //   ResponsiveContainer,
// // // // // } from "recharts";

// // // // // const OttReport = () => {
// // // // //   const [data, setData] = useState([]);
// // // // //   const [totals, setTotals] = useState({
// // // // //     revenue: 0,
// // // // //     impressions: 0,
// // // // //     clicks: 0,
// // // // //     ctr: 0,
// // // // //   });

// // // // //   const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;

// // // // //   const cleanNumber = (val) => {
// // // // //     if (!val) return 0;
// // // // //     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// // // // //     return isNaN(num) ? 0 : num;
// // // // //   };

// // // // //   const calculateTotals = (rows) => {
// // // // //     const impressions = rows.reduce((a, b) => a + (b.impressions || 0), 0);
// // // // //     const clicks = rows.reduce((a, b) => a + (b.clicks || 0), 0);
// // // // //     const revenue = rows.reduce((a, b) => a + (b.revenue || 0), 0);
// // // // //     const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
// // // // //     setTotals({ revenue, impressions, clicks, ctr });
// // // // //   };

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       const res = await axios.get("http://localhost:5000/api/getallsheets", {
// // // // //         headers: { Authorization: `Bearer ${userToken}` },
// // // // //       });

// // // // //       const allSheets = res.data || [];

// // // // //       // Combine only sheets that have "Clicks" data
// // // // //       const merged = allSheets
// // // // //         .flatMap((sheet) => sheet.data || [])
// // // // //         .filter((r) => r[" Clicks "] !== undefined || r["Clicks"] !== undefined);

// // // // //       const formatted = merged.map((r) => {
// // // // //         const impressions =
// // // // //           cleanNumber(r[" Impressions "] || r["Impressions"] || r.impressions);
// // // // //         const clicks = cleanNumber(r[" Clicks "] || r["Clicks"] || r.clicks);
// // // // //         const ctr = cleanNumber(r[" CTR "] || r["CTR"] || r.ctr);
// // // // //         const revenue = parseFloat(((clicks * ctr * 100) / 2).toFixed(2)); // adjust formula as needed
// // // // //         return {
// // // // //           date: r["Date"] || r.date || "",
// // // // //           impressions,
// // // // //           clicks,
// // // // //           ctr,
// // // // //           revenue,
// // // // //         };
// // // // //       });

// // // // //       setData(formatted);
// // // // //       calculateTotals(formatted);
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching OTT data:", error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   // Internal CSS
// // // // //   const styles = {
// // // // //     container: {
// // // // //       padding: 30,
// // // // //       fontFamily: "Segoe UI",
// // // // //       background: "#f9fafc",
// // // // //       minHeight: "100vh",
// // // // //     },
// // // // //     header: {
// // // // //       textAlign: "center",
// // // // //       marginBottom: 20,
// // // // //     },
// // // // //     kpiContainer: {
// // // // //       display: "flex",
// // // // //       flexWrap: "wrap",
// // // // //       justifyContent: "center",
// // // // //       gap: 20,
// // // // //       marginBottom: 40,
// // // // //     },
// // // // //     kpiCard: {
// // // // //       background: "white",
// // // // //       padding: "16px 20px",
// // // // //       borderRadius: 10,
// // // // //       minWidth: 180,
// // // // //       textAlign: "center",
// // // // //       boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// // // // //     },
// // // // //     kpiLabel: {
// // // // //       fontSize: 13,
// // // // //       color: "#888",
// // // // //     },
// // // // //     kpiValue: {
// // // // //       fontSize: 20,
// // // // //       fontWeight: "bold",
// // // // //       color: "#222",
// // // // //     },
// // // // //     chartBox: {
// // // // //       background: "white",
// // // // //       borderRadius: 10,
// // // // //       padding: 20,
// // // // //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // // //     },
// // // // //   };

// // // // //   return (
// // // // //     <div style={styles.container}>
// // // // //       <h2 style={styles.header}>📊 OTT Daily Performance</h2>

// // // // //       {data.length > 0 && (
// // // // //         <div style={styles.kpiContainer}>
// // // // //           {[
// // // // //             { label: "Total Revenue", value: `$${totals.revenue.toFixed(2)}` },
// // // // //             {
// // // // //               label: "Total Impressions",
// // // // //               value: totals.impressions.toLocaleString(),
// // // // //             },
// // // // //             { label: "Total Clicks", value: totals.clicks.toLocaleString() },
// // // // //             { label: "CTR", value: `${totals.ctr}%` },
// // // // //           ].map((item, i) => (
// // // // //             <div key={i} style={styles.kpiCard}>
// // // // //               <div style={styles.kpiLabel}>{item.label}</div>
// // // // //               <div style={styles.kpiValue}>{item.value}</div>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}

// // // // //       {data.length > 0 ? (
// // // // //         <div style={styles.chartBox}>
// // // // //           <h4 style={{ marginBottom: 20 }}>💰 Revenue (Bar) vs Clicks (Line)</h4>
// // // // //           <ResponsiveContainer width="100%" height={400}>
// // // // //             <ComposedChart data={data}>
// // // // //               <CartesianGrid strokeDasharray="3 3" />
// // // // //               <XAxis dataKey="date" />
// // // // //               <YAxis yAxisId="left" />
// // // // //               <YAxis yAxisId="right" orientation="right" />
// // // // //               <Tooltip />
// // // // //               <Legend />
// // // // //               <Bar
// // // // //                 yAxisId="left"
// // // // //                 dataKey="revenue"
// // // // //                 fill="#00C49F"
// // // // //                 barSize={20}
// // // // //                 radius={[6, 6, 0, 0]}
// // // // //               />
// // // // //               <Line
// // // // //                 yAxisId="right"
// // // // //                 type="monotone"
// // // // //                 dataKey="clicks"
// // // // //                 stroke="#8884d8"
// // // // //                 strokeWidth={3}
// // // // //                 dot={false}
// // // // //               />
// // // // //             </ComposedChart>
// // // // //           </ResponsiveContainer>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <p style={{ textAlign: "center", color: "#888" }}>
// // // // //           No data available from backend.
// // // // //         </p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OttReport;

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import {
// // // //   ComposedChart,
// // // //   Bar,
// // // //   Line,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   Legend,
// // // //   CartesianGrid,
// // // //   ResponsiveContainer,
// // // // } from "recharts";

// // // // const OttReport = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [totals, setTotals] = useState({
// // // //     spend: 0,
// // // //     impressions: 0,
// // // //     clicks: 0,
// // // //     ctr: 0,
// // // //   });

// // // //   const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;

// // // //   const cleanNumber = (val) => {
// // // //     if (!val) return 0;
// // // //     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// // // //     return isNaN(num) ? 0 : num;
// // // //   };

// // // //   const calculateTotals = (rows) => {
// // // //     const spend = rows.reduce((a, b) => a + (b.spend || 0), 0);
// // // //     const impressions = rows.reduce((a, b) => a + (b.impressions || 0), 0);
// // // //     const clicks = rows.reduce((a, b) => a + (b.clicks || 0), 0);
// // // //     const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
// // // //     setTotals({ spend, impressions, clicks, ctr });
// // // //   };

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       const res = await axios.get("http://localhost:5000/api/getallsheets", {
// // // //         headers: { Authorization: `Bearer ${userToken}` },
// // // //       });

// // // //       const allSheets = res.data[0] || [];
// // // //       const merged = allSheets.flatMap((sheet) => sheet.data || []);

// // // //       const formatted = merged.map((r) => ({
// // // //         date: r["Date"] || r.date || "",
// // // //         spend: cleanNumber(r[" Spend "] || r["Spend"] || r.spend),
// // // //         impressions: cleanNumber(r[" Impressions "] || r["Impressions"]),
// // // //         clicks: cleanNumber(r[" Clicks "] || r["Clicks"]),
// // // //         ctr: cleanNumber(r[" CTR "] || r["CTR"]),
// // // //       }));

// // // //       setData(formatted);
// // // //       calculateTotals(formatted);
// // // //     } catch (error) {
// // // //       console.error("Error fetching advertiser OTT data:", error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, []);

// // // //   const styles = {
// // // //     container: {
// // // //       padding: 30,
// // // //       fontFamily: "Segoe UI",
// // // //       background: "#f9fafc",
// // // //       minHeight: "100vh",
// // // //     },
// // // //     header: {
// // // //       textAlign: "center",
// // // //       marginBottom: 20,
// // // //     },
// // // //     kpiContainer: {
// // // //       display: "flex",
// // // //       flexWrap: "wrap",
// // // //       justifyContent: "center",
// // // //       gap: 20,
// // // //       marginBottom: 40,
// // // //     },
// // // //     kpiCard: {
// // // //       background: "white",
// // // //       padding: "16px 20px",
// // // //       borderRadius: 10,
// // // //       minWidth: 180,
// // // //       textAlign: "center",
// // // //       boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// // // //     },
// // // //     kpiLabel: {
// // // //       fontSize: 13,
// // // //       color: "#888",
// // // //     },
// // // //     kpiValue: {
// // // //       fontSize: 20,
// // // //       fontWeight: "bold",
// // // //       color: "#222",
// // // //     },
// // // //     chartBox: {
// // // //       background: "white",
// // // //       borderRadius: 10,
// // // //       padding: 20,
// // // //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //       marginBottom: 30,
// // // //     },
// // // //     table: {
// // // //       width: "100%",
// // // //       borderCollapse: "collapse",
// // // //       background: "white",
// // // //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // // //       borderRadius: 10,
// // // //       overflow: "hidden",
// // // //     },
// // // //     th: {
// // // //       background: "#007bff",
// // // //       color: "white",
// // // //       padding: 10,
// // // //       textAlign: "center",
// // // //     },
// // // //     td: {
// // // //       padding: 10,
// // // //       textAlign: "center",
// // // //       borderBottom: "1px solid #ddd",
// // // //     },
// // // //   };

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.header}>📊 Advertiser OTT Performance</h2>

// // // //       {data.length > 0 && (
// // // //         <div style={styles.kpiContainer}>
// // // //           {[
// // // //             { label: "Total Spend", value: `$${totals.spend.toFixed(2)}` },
// // // //             {
// // // //               label: "Total Impressions",
// // // //               value: totals.impressions.toLocaleString(),
// // // //             },
// // // //             { label: "Total Clicks", value: totals.clicks.toLocaleString() },
// // // //             { label: "CTR", value: `${totals.ctr}%` },
// // // //           ].map((item, i) => (
// // // //             <div key={i} style={styles.kpiCard}>
// // // //               <div style={styles.kpiLabel}>{item.label}</div>
// // // //               <div style={styles.kpiValue}>{item.value}</div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {data.length > 0 ? (
// // // //         <>
// // // //           <div style={styles.chartBox}>
// // // //             <h4 style={{ marginBottom: 20 }}>💰 Spend (Bar) vs Clicks (Line)</h4>
// // // //             <ResponsiveContainer width="100%" height={400}>
// // // //               <ComposedChart data={data}>
// // // //                 <CartesianGrid strokeDasharray="3 3" />
// // // //                 <XAxis dataKey="date" />
// // // //                 <YAxis yAxisId="left" />
// // // //                 <YAxis yAxisId="right" orientation="right" />
// // // //                 <Tooltip />
// // // //                 <Legend />
// // // //                 <Bar
// // // //                   yAxisId="left"
// // // //                   dataKey="spend"
// // // //                   fill="#00C49F"
// // // //                   barSize={20}
// // // //                   radius={[6, 6, 0, 0]}
// // // //                 />
// // // //                 <Line
// // // //                   yAxisId="right"
// // // //                   type="monotone"
// // // //                   dataKey="clicks"
// // // //                   stroke="#8884d8"
// // // //                   strokeWidth={3}
// // // //                   dot={false}
// // // //                 />
// // // //               </ComposedChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           <table style={styles.table}>
// // // //             <thead>
// // // //               <tr>
// // // //                 <th style={styles.th}>Date</th>
// // // //                 <th style={styles.th}>Spend ($)</th>
// // // //                 <th style={styles.th}>Impressions</th>
// // // //                 <th style={styles.th}>Clicks</th>
// // // //                 <th style={styles.th}>CTR (%)</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {data.map((row, i) => (
// // // //                 <tr key={i}>
// // // //                   <td style={styles.td}>{row.date}</td>
// // // //                   <td style={styles.td}>${row.spend.toFixed(2)}</td>
// // // //                   <td style={styles.td}>{row.impressions}</td>
// // // //                   <td style={styles.td}>{row.clicks}</td>
// // // //                   <td style={styles.td}>{(row.ctr * 100).toFixed(2)}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </>
// // // //       ) : (
// // // //         <p style={{ textAlign: "center", color: "#888" }}>
// // // //           No data available from backend.
// // // //         </p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OttReport;

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import {
// // //   ComposedChart,
// // //   Bar,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // //   CartesianGrid,
// // //   ResponsiveContainer,
// // // } from "recharts";

// // // const OttReport = () => {
// // //   const [data, setData] = useState([]);

// // //   const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;

// // //   const cleanNumber = (val) => {
// // //     if (!val) return 0;
// // //     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// // //     return isNaN(num) ? 0 : num;
// // //   };

// // //   const fetchData = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/getallsheets", {
// // //         headers: { Authorization: `Bearer ${userToken}` },
// // //       });

// // //       // Fetch only the first sheet and read its data array
// // //       const sheetData = res.data?.[0]?.data || [];

// // //       const formatted = sheetData.map((r) => ({
// // //         date: r["Date"] || r.date || "",
// // //         impressions: cleanNumber(
// // //           r[" Impressions "] || r["Impressions"] || r.impressions
// // //         ),
// // //         clicks: cleanNumber(r[" Clicks "] || r["Clicks"] || r.clicks),
// // //         ctr: parseFloat(
// // //           cleanNumber(r[" CTR "] || r["CTR"] || r.ctr)
// // //         ).toFixed(2),
// // //       }));

// // //       setData(formatted);
// // //     } catch (error) {
// // //       console.error("Error fetching OTT data:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, []);

// // //   // Internal CSS
// // //   const styles = {
// // //     container: {
// // //       padding: 30,
// // //       fontFamily: "Segoe UI, sans-serif",
// // //       background: "#f9fafc",
// // //       minHeight: "100vh",
// // //     },
// // //     header: {
// // //       textAlign: "center",
// // //       marginBottom: 30,
// // //       color: "#333",
// // //     },
// // //     tableBox: {
// // //       background: "white",
// // //       borderRadius: 10,
// // //       padding: 20,
// // //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //       marginBottom: 40,
// // //       overflowX: "auto",
// // //     },
// // //     table: {
// // //       width: "100%",
// // //       borderCollapse: "collapse",
// // //       textAlign: "center",
// // //       fontSize: 14,
// // //     },
// // //     th: {
// // //       background: "#f3f4f6",
// // //       padding: 10,
// // //       border: "1px solid #ddd",
// // //       fontWeight: 600,
// // //     },
// // //     td: {
// // //       padding: 10,
// // //       border: "1px solid #eee",
// // //     },
// // //     chartBox: {
// // //       background: "white",
// // //       borderRadius: 10,
// // //       padding: 20,
// // //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// // //     },
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.header}>📊 Advertiser Campaign Performance</h2>

// // //       {data.length > 0 ? (
// // //         <>
// // //           {/* Data Table */}
// // //           <div style={styles.tableBox}>
// // //             <table style={styles.table}>
// // //               <thead>
// // //                 <tr>
// // //                   <th style={styles.th}>Date</th>
// // //                   <th style={styles.th}>Impressions</th>
// // //                   <th style={styles.th}>Clicks</th>
// // //                   <th style={styles.th}>CTR (%)</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {data.map((row, i) => (
// // //                   <tr key={i}>
// // //                     <td style={styles.td}>{row.date}</td>
// // //                     <td style={styles.td}>{row.impressions}</td>
// // //                     <td style={styles.td}>{row.clicks}</td>
// // //                     <td style={styles.td}>{row.ctr}</td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>

// // //           {/* Chart Section */}
// // //           <div style={styles.chartBox}>
// // //             <h4 style={{ marginBottom: 20 }}>📈 Impressions (Bar) vs Clicks (Line)</h4>
// // //             <ResponsiveContainer width="100%" height={400}>
// // //               <ComposedChart data={data}>
// // //                 <CartesianGrid strokeDasharray="3 3" />
// // //                 <XAxis dataKey="date" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Legend />
// // //                 <Bar
// // //                   dataKey="impressions"
// // //                   fill="#82ca9d"
// // //                   barSize={25}
// // //                   radius={[6, 6, 0, 0]}
// // //                 />
// // //                 <Line
// // //                   type="monotone"
// // //                   dataKey="clicks"
// // //                   stroke="#8884d8"
// // //                   strokeWidth={3}
// // //                   dot={false}
// // //                 />
// // //               </ComposedChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </>
// // //       ) : (
// // //         <p style={{ textAlign: "center", color: "#888" }}>
// // //           No campaign data available.
// // //         </p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OttReport;



// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   ComposedChart,
// //   Bar,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   CartesianGrid,
// //   ResponsiveContainer,
// // } from "recharts";

// // const OttReport = () => {
// //   const [data, setData] = useState([]);
// //   const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;

// //   const cleanNumber = (val) => {
// //     if (!val) return 0;
// //     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
// //     return isNaN(num) ? 0 : num;
// //   };

// //   const fetchData = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/getallsheets", {
// //         headers: { Authorization: `Bearer ${userToken}` },
// //       });

// //       const sheetData = res.data?.[0]?.data || [];
// //       if (!sheetData.length) {
// //         console.warn("⚠️ No sheet data found");
// //         return;
// //       }

// //       // 🔍 detect all headers
// //       const headers = Object.keys(sheetData[0]).map((h) => h.trim().toLowerCase());
// //       const findKey = (patterns) =>
// //         headers.find((h) => patterns.some((p) => h.includes(p))) || null;

// //       const spendKey = findKey(["spend", "cost", "amount"]);
// //       const impKey = findKey(["impression"]);
// //       const clickKey = findKey(["click"]);
// //       const ctrKey = findKey(["ctr", "rate"]);
// //       const dateKey = findKey(["date", "day"]);

// //       console.log("✅ Detected Columns:", {
// //         dateKey,
// //         spendKey,
// //         impKey,
// //         clickKey,
// //         ctrKey,
// //       });

// //       const formatted = sheetData.map((r) => ({
// //         date: r[dateKey] || "",
// //         spend: cleanNumber(r[spendKey]),
// //         impressions: cleanNumber(r[impKey]),
// //         clicks: cleanNumber(r[clickKey]),
// //         ctr: parseFloat(cleanNumber(r[ctrKey])).toFixed(2),
// //       }));

// //       setData(formatted);
// //     } catch (error) {
// //       console.error("Error fetching OTT data:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // Internal CSS
// //   const styles = {
// //     container: {
// //       padding: 30,
// //       fontFamily: "Segoe UI, sans-serif",
// //       background: "#f9fafc",
// //       minHeight: "100vh",
// //     },
// //     header: {
// //       textAlign: "center",
// //       marginBottom: 30,
// //       color: "#333",
// //     },
// //     tableBox: {
// //       background: "white",
// //       borderRadius: 10,
// //       padding: 20,
// //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //       marginBottom: 40,
// //       overflowX: "auto",
// //     },
// //     table: {
// //       width: "100%",
// //       borderCollapse: "collapse",
// //       textAlign: "center",
// //       fontSize: 14,
// //     },
// //     th: {
// //       background: "#f3f4f6",
// //       padding: 10,
// //       border: "1px solid #ddd",
// //       fontWeight: 600,
// //     },
// //     td: {
// //       padding: 10,
// //       border: "1px solid #eee",
// //     },
// //     chartBox: {
// //       background: "white",
// //       borderRadius: 10,
// //       padding: 20,
// //       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //     },
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.header}>📊 Advertiser Campaign Performance</h2>

// //       {data.length > 0 ? (
// //         <>
// //           {/* Data Table */}
// //           <div style={styles.tableBox}>
// //             <table style={styles.table}>
// //               <thead>
// //                 <tr>
// //                   <th style={styles.th}>Date</th>
// //                   <th style={styles.th}>Spend ($)</th>
// //                   <th style={styles.th}>Impressions</th>
// //                   <th style={styles.th}>Clicks</th>
// //                   <th style={styles.th}>CTR (%)</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {data.map((row, i) => (
// //                   <tr key={i}>
// //                     <td style={styles.td}>{row.date}</td>
// //                     <td style={styles.td}>${row.spend.toFixed(2)}</td>
// //                     <td style={styles.td}>{row.impressions}</td>
// //                     <td style={styles.td}>{row.clicks}</td>
// //                     <td style={styles.td}>{row.ctr}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Chart Section */}
// //           <div style={styles.chartBox}>
// //             <h4 style={{ marginBottom: 20 }}>📈 Spend (Bar) vs Clicks (Line)</h4>
// //             <ResponsiveContainer width="100%" height={400}>
// //               <ComposedChart data={data}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="date" />
// //                 <YAxis yAxisId="left" />
// //                 <YAxis yAxisId="right" orientation="right" />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar
// //                   yAxisId="left"
// //                   dataKey="spend"
// //                   fill="#00C49F"
// //                   barSize={25}
// //                   radius={[6, 6, 0, 0]}
// //                 />
// //                 <Line
// //                   yAxisId="right"
// //                   type="monotone"
// //                   dataKey="clicks"
// //                   stroke="#8884d8"
// //                   strokeWidth={3}
// //                   dot={false}
// //                 />
// //               </ComposedChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </>
// //       ) : (
// //         <p style={{ textAlign: "center", color: "#888" }}>
// //           No campaign data available.
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default OttReport;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const OttReport = () => {
//   const [data, setData] = useState([]);

//   const cleanNumber = (val) => {
//     if (!val) return 0;
//     const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
//     return isNaN(num) ? 0 : num;
//   };

//   const fetchData = async () => {
//     try {
//       const tokenData = JSON.parse(localStorage.getItem("jwt"));
//       const userToken = tokenData?.token;
//       if (!userToken) {
//         console.error("❌ No token found in localStorage");
//         return;
//       }

//       // ✅ Fetch all uploaded sheets
//       const res = await axios.get("http://localhost:5000/api/getallsheets", {
//         headers: { Authorization: `Bearer ${userToken}` },
//       });

//       const allSheets = res.data || [];
//       console.log("📄 Available Sheets:", allSheets.map((s) => s.name));

//       // ✅ Find OTT-related sheet dynamically
//       const normalize = (name) => name?.trim().toLowerCase().replace(/\s|_/g, "");
//       const ottSheet = allSheets.find((sheet) => {
//         const n = normalize(sheet.name);
//         return (
//           n.includes("ottreport") ||
//           n.includes("ott") ||
//           n.includes("over") ||
//           n.includes("videoott")
//         );
//       });

//       if (!ottSheet || !ottSheet.data?.length) {
//         console.warn("⚠️ No matching OTT sheet found.");
//         return;
//       }

//       console.log(`✅ Matched OTT Sheet: ${ottSheet.name}`);

//       // ✅ Flexible header detection
//       const headers = Object.keys(ottSheet.data[0]).map((h) => h.trim().toLowerCase());
//       const findKey = (patterns) =>
//         headers.find((h) => patterns.some((p) => h.includes(p))) || null;

//       const dateKey = findKey(["date", "day"]);
//       const spendKey = findKey(["spend", "cost", "amount"]);
//       const impKey = findKey(["impression"]);
//       const clickKey = findKey(["click"]);
//       const ctrKey = findKey(["ctr", "rate"]);

//       console.log("🧭 Detected Keys:", { dateKey, spendKey, impKey, clickKey, ctrKey });

//       // ✅ Format the data properly
//       const formatted = ottSheet.data.map((row) => {
//         const r = {};
//         for (const key in row) r[key.trim()] = row[key];
//         return {
//           date: r[dateKey] || "",
//           spend: cleanNumber(r[spendKey]),
//           impressions: cleanNumber(r[impKey]),
//           clicks: cleanNumber(r[clickKey]),
//           ctr: parseFloat(cleanNumber(r[ctrKey])).toFixed(2),
//         };
//       });

//       setData(formatted);
//     } catch (error) {
//       console.error("❌ Error fetching OTT data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // 💅 Inline Styles
//   const styles = {
//     container: {
//       padding: 30,
//       fontFamily: "Segoe UI, sans-serif",
//       background: "#f9fafc",
//       minHeight: "100vh",
//     },
//     header: {
//       textAlign: "center",
//       marginBottom: 30,
//       color: "#333",
//     },
//     chartBox: {
//       background: "white",
//       borderRadius: 10,
//       padding: 20,
//       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       marginBottom: 40,
//     },
//     tableBox: {
//       background: "white",
//       borderRadius: 10,
//       padding: 20,
//       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       overflowX: "auto",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       textAlign: "center",
//       fontSize: 14,
//     },
//     th: {
//       background: "#007bff",
//       color: "white",
//       padding: 10,
//       border: "1px solid #ddd",
//       fontWeight: 600,
//     },
//     td: {
//       padding: 10,
//       border: "1px solid #eee",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>📺 OTT Campaign Performance</h2>

//       {data.length > 0 ? (
//         <>
//           {/* 📊 Chart */}
//           <div style={styles.chartBox}>
//             <h4 style={{ marginBottom: 20 }}>💰 Spend (Bar) vs Clicks (Line)</h4>
//             <ResponsiveContainer width="100%" height={400}>
//               <ComposedChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar
//                   yAxisId="left"
//                   dataKey="spend"
//                   fill="#007bff"
//                   barSize={25}
//                   radius={[6, 6, 0, 0]}
//                 />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="clicks"
//                   stroke="#ff007f"
//                   strokeWidth={3}
//                   dot={false}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </div>

//           {/* 📋 Table */}
//           <div style={styles.tableBox}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Date</th>
//                   <th style={styles.th}>Spend ($)</th>
//                   <th style={styles.th}>Impressions</th>
//                   <th style={styles.th}>Clicks</th>
//                   <th style={styles.th}>CTR (%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row, i) => (
//                   <tr key={i}>
//                     <td style={styles.td}>{row.date}</td>
//                     <td style={styles.td}>${row.spend.toFixed(2)}</td>
//                     <td style={styles.td}>{row.impressions}</td>
//                     <td style={styles.td}>{row.clicks}</td>
//                     <td style={styles.td}>{row.ctr}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       ) : (
//         <p style={{ textAlign: "center", color: "#888", marginTop: 50 }}>
//           ⚠️ No OTT data available or sheet not detected.
//         </p>
//       )}
//     </div>
//   );
// };

// export default OttReport;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const OttReport = () => {
  const [data, setData] = useState([]);

  const cleanNumber = (val) => {
    if (val === null || val === undefined || val === "") return 0;
    const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const fetchData = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("jwt"));
      const userToken = tokenData?.token;
      if (!userToken) return console.error("❌ No token found");

      const res = await axios.get("http://localhost:5000/api/getallsheets", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
console.log(res,"ssdfdvdfsresult");

      const allSheets = res.data || [];
      console.log("📄 Available Sheets:", allSheets.map((s) => s.name));

      const normalize = (name) => name?.trim().toLowerCase().replace(/\s|_/g, "");
      const ottSheet = allSheets.find((s) => {
        const n = normalize(s.name);
        return n.includes("ottreport") || n.includes("ott");
      });

      if (!ottSheet || !ottSheet.data?.length) {
        console.warn("⚠️ No OTT sheet found");
        return;
      }

      console.log(`✅ Matched OTT Sheet: ${ottSheet.name}`);

      // 🔍 Header detection with fuzzy matching
      const headers = Object.keys(ottSheet.data[0]).map((h) =>
        h.trim().toLowerCase()
      );

      const findKey = (...patterns) =>
        headers.find((h) =>
          patterns.some((p) => h.includes(p.toLowerCase()))
        ) || null;

      const dateKey = findKey("date", "day");
      const spendKey = findKey("spend", "cost", "totalspend", "amount");
      const impKey = findKey("impression", "view", "reach");
      const clickKey = findKey("click", "totalclick");
      const ctrKey = findKey("ctr", "clickrate", "clickthrough");

      console.log("🧭 Detected Keys:", {
        dateKey,
        spendKey,
        impKey,
        clickKey,
        ctrKey,
      });

      const formatted = ottSheet.data.map((r) => {
        const clean = {};
        for (let key in r) clean[key.trim().toLowerCase()] = r[key];

        return {
          date: clean[dateKey] || "",
          spend: cleanNumber(clean[spendKey]),
          impressions: cleanNumber(clean[impKey]),
          clicks: cleanNumber(clean[clickKey]),
          ctr: parseFloat(cleanNumber(clean[ctrKey])).toFixed(2),
        };
      });

      console.log("📊 Cleaned Data Preview:", formatted.slice(0, 3));

      setData(formatted);
    } catch (err) {
      console.error("❌ Error fetching OTT data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const styles = {
    container: {
      padding: 30,
      fontFamily: "Segoe UI, sans-serif",
      background: "#f9fafc",
      minHeight: "100vh",
    },
    header: { textAlign: "center", marginBottom: 30, color: "#333" },
    chartBox: {
      background: "white",
      borderRadius: 10,
      padding: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: 40,
    },
    tableBox: {
      background: "white",
      borderRadius: 10,
      padding: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "center",
      fontSize: 14,
    },
    th: {
      background: "#007bff",
      color: "white",
      padding: 10,
      border: "1px solid #ddd",
      fontWeight: 600,
    },
    td: { padding: 10, border: "1px solid #eee" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📺 OTT Campaign Performance</h2>

      {data.length > 0 ? (
        <>
          {/* Chart */}
          <div style={styles.chartBox}>
            <h4 style={{ marginBottom: 20 }}>💰 Spend (Bar) vs Clicks (Line)</h4>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="spend"
                  fill="#007bff"
                  barSize={25}
                  radius={[6, 6, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#ff007f"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Table */}
          <div style={styles.tableBox}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Spend ($)</th>
                  <th style={styles.th}>Impressions</th>
                  <th style={styles.th}>Clicks</th>
                  <th style={styles.th}>CTR (%)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td style={styles.td}>{row.date}</td>
                    <td style={styles.td}>${row.spend.toFixed(2)}</td>
                    <td style={styles.td}>{row.impressions}</td>
                    <td style={styles.td}>{row.clicks}</td>
                    <td style={styles.td}>{row.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#888", marginTop: 50 }}>
          ⚠️ No OTT data available or headers not matched.
        </p>
      )}
    </div>
  );
};

export default OttReport;
