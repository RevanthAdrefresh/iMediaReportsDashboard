// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// //   LineChart,
// //   Line,
// // } from "recharts";

// // const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#A020F0", "#FF6384"];

// // const Dashboard = () => {
// //   const [performanceData, setPerformanceData] = useState([]);

// //   const styles = {
// //     dashboardGrid: {
// //       display: "flex",
// //       flexDirection: "column",
// //       gap: "20px",
// //       padding: "20px",
// //       backgroundColor: "#f9fafb",
// //       fontFamily: "Arial, sans-serif",
// //       minHeight: "100vh",
// //     },
// //     card: {
// //       backgroundColor: "#fff",
// //       borderRadius: "12px",
// //       boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// //       padding: "20px",
// //       flex: 1,
// //     },
// //     chartRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
// //     table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
// //     th: {
// //       borderBottom: "2px solid #ddd",
// //       textAlign: "left",
// //       padding: "10px",
// //       backgroundColor: "#f4f4f4",
// //       fontWeight: "bold",
// //     },
// //     td: { borderBottom: "1px solid #eee", padding: "10px", textAlign: "left" },
// //     heading: { marginBottom: "10px", color: "#333", fontSize: "18px", fontWeight: 600 },
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/getalldata");
// //         const sheets = res.data;

// //         const publisherMap = {};

// //         sheets.forEach((sheet) => {
// //           const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";
// //           const pubName = sheet.uploadedBy?.name || pubId;

// //           const sheetName = (sheet.name || "").toLowerCase();
// //           // ignore summary/budget sheet
// //           if (sheetName.includes("sheet4") || sheetName.includes("summary")) return;

// //           if (!publisherMap[pubId]) {
// //             publisherMap[pubId] = {
// //               publisher: pubName,
// //               totalViews: 0,
// //               totalClicks: 0,
// //               totalRevenue: 0,
// //             };
// //           }

// //           sheet.data.forEach((row) => {
// //             const entry = {};
// //             Object.keys(row).forEach((k) => entry[k.trim()] = row[k]);

// //             const impressions = Number(entry.Impressions || entry["Impressions"] || entry[" Impressions "] || 0);
// //             const clicks = Number(entry.Clicks || entry["Clicks"] || entry[" Clicks "] || 0);
// //             const cpm = Number(entry.CPM || entry[" CPM "] || 0);
// //             const cpc = Number(entry.CPC || entry[" CPC "] || 0);

// //             if (impressions > 0) {
// //               publisherMap[pubId].totalViews += impressions;
// //             }

// //             if (clicks > 0) {
// //               publisherMap[pubId].totalClicks += clicks;
// //             }

// //             // ✅ Revenue Logic: CPC > CPM > fallback CPM
// //             let rowRevenue = 0;

// //             if (!isNaN(cpc) && cpc > 0 && clicks > 0) {
// //               rowRevenue = clicks * cpc; // CPC model
// //             } else if (!isNaN(cpm) && cpm > 0 && impressions > 0) {
// //               rowRevenue = (impressions / 1000) * cpm; // CPM model
// //             } else {
// //               rowRevenue = (impressions / 1000) * 1.5; // fallback CPM
// //             }

// //             publisherMap[pubId].totalRevenue += rowRevenue;
// //           });
// //         });

// //         const finalData = Object.values(publisherMap).map((pub) => ({
// //           publisher: pub.publisher,
// //           totalViews: pub.totalViews,
// //           totalClicks: pub.totalClicks,
// //           ctrPercent: pub.totalViews ? ((pub.totalClicks / pub.totalViews) * 100).toFixed(2) : "0.00",
// //           totalRevenue: pub.totalRevenue.toFixed(2),
// //         }));

// //         setPerformanceData(finalData);
// //       } catch (err) {
// //         console.error("Error fetching:", err);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const isSingle = performanceData.length === 1;

// //   return (
// //     <div style={styles.dashboardGrid}>
// //       <div style={styles.card}>
// //         <h3 style={styles.heading}>📊 Publisher Performance Summary</h3>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th style={styles.th}>Publisher</th>
// //               <th style={styles.th}>Views</th>
// //               <th style={styles.th}>Clicks</th>
// //               <th style={styles.th}>CTR (%)</th>
// //               <th style={styles.th}>Revenue ($)</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {performanceData.map((row, i) => (
// //               <tr key={i}>
// //                 <td style={styles.td}>{row.publisher}</td>
// //                 <td style={styles.td}>{row.totalViews.toLocaleString()}</td>
// //                 <td style={styles.td}>{row.totalClicks}</td>
// //                 <td style={styles.td}>{row.ctrPercent}</td>
// //                 <td style={styles.td}>${row.totalRevenue}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div style={styles.chartRow}>
// //         <div style={styles.card}>
// //           <h3 style={styles.heading}>💰 Revenue Share</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             <PieChart>
// //               <Pie data={performanceData} dataKey="totalRevenue" nameKey="publisher" cx="50%" cy="50%" outerRadius={90} label>
// //                 {performanceData.map((_, i) => (
// //                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //               <Legend /><Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div style={styles.card}>
// //           <h3 style={styles.heading}>📈 Views vs Clicks</h3>
// //           <ResponsiveContainer width="100%" height={260}>
// //             {isSingle ? (
// //               <LineChart data={performanceData}>
// //                 <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="publisher" /><YAxis /><Tooltip /><Legend />
// //                 <Line type="monotone" dataKey="totalViews" stroke="#0088FE" strokeWidth={2} />
// //                 <Line type="monotone" dataKey="totalClicks" stroke="#00C49F" strokeWidth={2} />
// //               </LineChart>
// //             ) : (
// //               <BarChart data={performanceData}>
// //                 <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="publisher" /><YAxis /><Tooltip /><Legend />
// //                 <Bar dataKey="totalViews" fill="#0088FE" /><Bar dataKey="totalClicks" fill="#00C49F" />
// //               </BarChart>
// //             )}
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
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
//   LineChart,
//   Line,
// } from "recharts";

// const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#A020F0", "#FF6384"];

// const Dashboard = () => {
//   const [performanceData, setPerformanceData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/getalldata");
//         let sheets = res.data;

//         const publisherMap = {};
//         let counter = 1; // for readable IDs

//         sheets.forEach((sheet) => {
//           const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";
//           const sheetName = (sheet.name || "").toLowerCase();

//           if (sheetName.includes("sheet4") || sheetName.includes("summary")) return;

//           if (!publisherMap[pubId]) {
//             publisherMap[pubId] = {
//               publisher: sheet.uploadedBy?.name || `Publisher ${counter++}`,
//               totalViews: 0,
//               totalClicks: 0,
//               totalRevenue: 0,
//               seenDates: new Set(),
//             };
//           }

//           sheet.data.forEach((row) => {
//             const entry = {};
//             Object.keys(row).forEach((k) => (entry[k.trim()] = row[k]));

//             const impressions = Number(entry["Impressions"] || entry[" Impressions "] || 0);
//             const clicks = Number(entry["Clicks"] || entry[" Clicks "] || 0);
//             const cpm = Number(entry["CPM"] || entry[" CPM "] || 0);
//             const cpc = Number(entry["CPC"] || entry[" CPC "] || 0);
//             const date = entry.Date;

//             // 🚫 Prevent duplicate rows (by Date)
//             if (publisherMap[pubId].seenDates.has(date)) return;
//             publisherMap[pubId].seenDates.add(date);

//             publisherMap[pubId].totalViews += impressions;
//             publisherMap[pubId].totalClicks += clicks;

//             let revenue = 0;
//             if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
//             else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
//             else revenue = (impressions / 1000) * 1.5;

//             publisherMap[pubId].totalRevenue += revenue;
//           });
//         });

//         const finalData = Object.values(publisherMap).map((pub) => ({
//           publisher: pub.publisher,
//           totalViews: pub.totalViews,
//           totalClicks: pub.totalClicks,
//           ctrPercent: pub.totalViews
//             ? ((pub.totalClicks / pub.totalViews) * 100).toFixed(2)
//             : "0.00",
//           totalRevenue: Number(pub.totalRevenue.toFixed(2)),
//         }));

//         setPerformanceData(finalData);
//       } catch (err) {
//         console.error("Error fetching data", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ padding: 20, background: "#f9fafb", minHeight: "100vh" }}>

//       <div style={{ background: "#fff", padding: 20, borderRadius: 12, marginBottom: 20 }}>
//         <h3>📊 Publisher Performance Summary</h3>
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
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
//                 <td>{row.publisher}</td>
//                 <td>{row.totalViews.toLocaleString()}</td>
//                 <td>{row.totalClicks}</td>
//                 <td>{row.ctrPercent}</td>
//                 <td>${row.totalRevenue}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        
//         {/* Pie Chart */}
//         <div style={{ background: "#fff", padding: 20, borderRadius: 12, flex: 1, minWidth: 350 }}>
//           <h3>💰 Revenue Share</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={performanceData} dataKey="totalRevenue" nameKey="publisher" cx="50%" cy="50%" outerRadius={100} label>
//                 {performanceData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend verticalAlign="bottom" height={50}/>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div style={{ background: "#fff", padding: 20, borderRadius: 12, flex: 1, minWidth: 350 }}>
//           <h3>📈 Views vs Clicks</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="publisher" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="totalViews" fill="#0088FE" name="Views" />
//               <Bar dataKey="totalClicks" fill="#00C49F" name="Clicks" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
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
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#A020F0", "#FF6384"];

const Dashboard = () => {
  const [performanceData, setPerformanceData] = useState([]);

  const styles = {
    dashboardGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#f9fafb",
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      padding: "20px",
      flex: 1,
    },
    chartRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
    th: {
      borderBottom: "2px solid #ddd",
      textAlign: "left",
      padding: "10px",
      backgroundColor: "#f4f4f4",
      fontWeight: "bold",
    },
    td: { borderBottom: "1px solid #eee", padding: "10px", textAlign: "left" },
    heading: { marginBottom: "10px", color: "#333", fontSize: "18px", fontWeight: 600 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getalldata");
        const sheets = res.data;

        const publisherMap = {};

        sheets.forEach((sheet) => {
          const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";
          const sheetName = (sheet.name || "").toLowerCase();

          // ignore budget/summary sheet
          if (sheetName.includes("sheet4") || sheetName.includes("summary")) return;

          if (!publisherMap[pubId]) {
            publisherMap[pubId] = {
              publisher: pubId, // ✅ show only ObjectId
              totalViews: 0,
              totalClicks: 0,
              totalRevenue: 0,
            };
          }

          sheet.data.forEach((row) => {
            const e = {};
            Object.keys(row).forEach((k) => (e[k.trim()] = row[k]));

            const impressions = Number(e.Impressions || e["Impressions"] || e[" Impressions "] || 0);
            const clicks = Number(e.Clicks || e["Clicks"] || e[" Clicks "] || 0);
            const cpm = Number(e.CPM || e[" CPM "] || 0);
            const cpc = Number(e.CPC || e[" CPC "] || 0);

            if (impressions > 0) publisherMap[pubId].totalViews += impressions;
            if (clicks > 0) publisherMap[pubId].totalClicks += clicks;

            let rev = 0;
            if (cpc > 0 && clicks > 0) rev = clicks * cpc;
            else if (cpm > 0 && impressions > 0) rev = (impressions / 1000) * cpm;
            else rev = (impressions / 1000) * 1.5;

            publisherMap[pubId].totalRevenue += rev;
          });
        });

        const finalData = Object.values(publisherMap).map((pub) => ({
          publisher: pub.publisher,
          totalViews: pub.totalViews,
          totalClicks: pub.totalClicks,
          ctrPercent: pub.totalViews ? ((pub.totalClicks / pub.totalViews) * 100).toFixed(2) : "0.00",
          totalRevenue: Number(pub.totalRevenue.toFixed(2)),
        }));

        setPerformanceData(finalData);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchData();
  }, []);

  const isSingle = performanceData.length === 1;

  return (
    <div style={styles.dashboardGrid}>
      
      {/* TABLE */}
      <div style={styles.card}>
        <h3 style={styles.heading}>📊 Publisher Performance Summary</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Publisher</th>
              <th style={styles.th}>Views</th>
              <th style={styles.th}>Clicks</th>
              <th style={styles.th}>CTR (%)</th>
              <th style={styles.th}>Revenue ($)</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((row, i) => (
              <tr key={i}>
                <td style={styles.td}>{row.publisher}</td>
                <td style={styles.td}>{row.totalViews.toLocaleString()}</td>
                <td style={styles.td}>{row.totalClicks}</td>
                <td style={styles.td}>{row.ctrPercent}</td>
                <td style={styles.td}>${row.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ CHARTS */}
      <div style={styles.chartRow}>

        {/* PIE */}
        <div style={styles.card}>
          <h3 style={styles.heading}>💰 Revenue Share</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                dataKey="totalRevenue"
                nameKey="publisher"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(d) => `${d.publisher.slice(0,6)}... $${d.totalRevenue}`}
              >
                {performanceData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom"/>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* DUAL AXIS BAR */}
        <div style={styles.card}>
          <h3 style={styles.heading}>📈 Views vs Clicks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="publisher" tickFormatter={(v)=> v.slice(0,6)+"..."} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="totalViews" fill="#0088FE" />
              <Bar yAxisId="right" dataKey="totalClicks" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
