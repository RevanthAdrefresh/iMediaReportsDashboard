

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const SummaryReport = () => {
//   const [summaryData, setSummaryData] = useState([]);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("uploadedSheets");
//       if (!stored) return;

//       const parsed = JSON.parse(stored);
//       // Find the sheet that contains summary data (Sheet4)
//       const sheet4 = parsed.find(
//         (s) => s.name?.trim().toLowerCase() === "sheet4"
//       );

//       if (sheet4 && sheet4.data?.length) {
//         // Clean keys (remove trailing spaces)
//         const cleaned = sheet4.data.map((item) => {
//           const newItem = {};
//           Object.keys(item).forEach((k) => {
//             newItem[k.trim()] = item[k];
//           });
//           return newItem;
//         });
//         setSummaryData(cleaned);
//       }
//     } catch (error) {
//       console.error("Error loading summary data:", error);
//     }
//   }, []);

//   if (!summaryData.length)
//     return <h3 style={{ color: "#777" }}>No Summary data available</h3>;

//   // ✅ Format number into dollars
//   const formatCurrency = (val) =>
//     typeof val === "number" ? `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : val;

//   // ✅ Calculate Totals
//   const totalSpend = summaryData.reduce((a, b) => a + (b["Spend"] || b["Spend "] || 0), 0);
//   const totalBudget = summaryData.reduce((a, b) => a + (b["Total Budget"] || 0), 0);
//   const totalRemaining = summaryData.reduce((a, b) => a + (b["Reamining"] || 0), 0);

//   return (
//     <div style={styles.card}>
//       <h3 style={styles.heading}>💰 Summary Report (Sheet4)</h3>

//       {/* ✅ Bar Chart */}
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <BarChart data={summaryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Platform" />
//             <YAxis />
//             <Tooltip formatter={(value) => formatCurrency(value)} />
//             <Legend />
//             <Bar dataKey="Spend" fill="#82ca9d" barSize={35} />
//             <Bar dataKey="Total Budget" fill="#8884d8" barSize={35} />
//             <Bar dataKey="Reamining" fill="#ffc658" barSize={35} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ✅ Summary Table */}
//       <div style={{ marginTop: 30 }}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Platform</th>
//               <th style={styles.th}>Spend</th>
//               <th style={styles.th}>Total Budget</th>
//               <th style={styles.th}>Remaining</th>
//             </tr>
//           </thead>
//           <tbody>
//             {summaryData.map((item, index) => (
//               <tr key={index}>
//                 <td style={styles.td}>{item.Platform}</td>
//                 <td style={styles.td}>{formatCurrency(item["Spend"] || item["Spend "] || 0)}</td>
//                 <td style={styles.td}>{formatCurrency(item["Total Budget"] || 0)}</td>
//                 <td style={styles.td}>{formatCurrency(item["Reamining"] || 0)}</td>
//               </tr>
//             ))}
//             <tr style={styles.totalRow}>
//               <td style={styles.th}>TOTAL</td>
//               <td style={styles.th}>{formatCurrency(totalSpend)}</td>
//               <td style={styles.th}>{formatCurrency(totalBudget)}</td>
//               <td style={styles.th}>{formatCurrency(totalRemaining)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ✅ Styling
// const styles = {
//   card: {
//     marginTop: "20px",
//     padding: "20px",
//     backgroundColor: "#f8f8f8",
//     borderRadius: "10px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//   },
//   heading: {
//     marginBottom: "15px",
//   },
//   table: {
//     borderCollapse: "collapse",
//     width: "100%",
//     textAlign: "left",
//     marginTop: "15px",
//   },
//   th: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     backgroundColor: "#ececec",
//     fontWeight: "600",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "8px",
//   },
//   totalRow: {
//     backgroundColor: "#fafafa",
//     fontWeight: "bold",
//   },
// };

// export default SummaryReport;

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import axios from "axios";
// const COLORS = ["#82ca9d", "#8884d8", "#ffc658"];

// const SummaryReport = () => {
//   const [summaryData, setSummaryData] = useState([]);

// const userToken=JSON.parse(localStorage.getItem("jwt")).token
// console.log(userToken,"token");

//   const fetchingData=async()=>{

//     try {
//     const fetchData = await axios.get("http://localhost:5000/api/getallsheets", {
//   headers: {
//     Authorization: `Bearer ${userToken}`,
//   },
// });

//       console.log(fetchData.data[3].data);
      

//     } catch (error) {
//       console.log(error);
      
//     }

//   }

//   useEffect(() => {
//     try {
//     fetchingData()

//       if (sheet4 && sheet4.data?.length) {
//         const cleaned = sheet4.data.map((item) => {
//           const newItem = {};
//           Object.keys(item).forEach((k) => {
//             newItem[k.trim()] = item[k];
//           });
//           return newItem;
//         });
//         setSummaryData(cleaned);
//       }
//     } catch (error) {
//       console.error("Error loading summary data:", error);
//     }
//   }, []);

//   if (!summaryData.length)
//     return <h3 style={{ color: "#777" }}>No Summary data available</h3>;

//   const formatCurrency = (val) =>
//     typeof val === "number"
//       ? `$${val.toLocaleString(undefined, {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })}`
//       : val;

//   const totalSpend = summaryData.reduce(
//     (a, b) => a + (b["Spend"] || b["Spend "] || 0),
//     0
//   );
//   const totalBudget = summaryData.reduce(
//     (a, b) => a + (b["Total Budget"] || 0),
//     0
//   );
//   const totalRemaining = summaryData.reduce(
//     (a, b) => a + (b["Reamining"] || 0),
//     0
//   );

//   const donutData = [
//     { name: "Total Spend", value: totalSpend },
//     { name: "Total Budget", value: totalBudget },
//     { name: "Remaining", value: totalRemaining },
//   ];

//   return (
//     <div style={styles.card}>
//       <h3 style={styles.heading}>💰 Summary Report (Sheet4)</h3>

//       {/* 📊 Bar Chart */}
//       <div style={{ width: "100%", height: 320, marginBottom: 40 }}>
//         <ResponsiveContainer>
//           <BarChart data={summaryData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Platform" />
//             <YAxis />
//             <Tooltip formatter={(value) => formatCurrency(value)} />
//             <Legend />
//             <Bar dataKey="Spend" fill="#82ca9d" barSize={35} radius={[8, 8, 0, 0]} />
//             <Bar dataKey="Total Budget" fill="#8884d8" barSize={35} radius={[8, 8, 0, 0]} />
//             <Bar dataKey="Reamining" fill="#ffc658" barSize={35} radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 🍩 Donut Chart */}
//       <div style={styles.donutCard}>
//         <h4 style={styles.subHeading}>Overall Budget Distribution</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={donutData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={110}
//               paddingAngle={5}
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(1)}%`
//               }
//             >
//               {donutData.map((entry, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value) => formatCurrency(value)} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 📋 Summary Table */}
//       <div style={{ marginTop: 30 }}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Platform</th>
//               <th style={styles.th}>Spend</th>
//               <th style={styles.th}>Total Budget</th>
//               <th style={styles.th}>Remaining</th>
//             </tr>
//           </thead>
//           <tbody>
//             {summaryData.map((item, index) => (
//               <tr key={index}>
//                 <td style={styles.td}>{item.Platform}</td>
//                 <td style={styles.td}>
//                   {formatCurrency(item["Spend"] || item["Spend "] || 0)}
//                 </td>
//                 <td style={styles.td}>
//                   {formatCurrency(item["Total Budget"] || 0)}
//                 </td>
//                 <td style={styles.td}>
//                   {formatCurrency(item["Reamining"] || 0)}
//                 </td>
//               </tr>
//             ))}
//             <tr style={styles.totalRow}>
//               <td style={styles.th}>TOTAL</td>
//               <td style={styles.th}>{formatCurrency(totalSpend)}</td>
//               <td style={styles.th}>{formatCurrency(totalBudget)}</td>
//               <td style={styles.th}>{formatCurrency(totalRemaining)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   card: {
//     marginTop: "20px",
//     padding: "20px",
//     backgroundColor: "#f8f9fb",
//     borderRadius: "12px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   },
//   heading: {
//     marginBottom: "20px",
//     textAlign: "center",
//     color: "#2c3e50",
//   },
//   donutCard: {
//     marginBottom: "30px",
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     padding: "20px",
//     boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
//   },
//   subHeading: {
//     textAlign: "center",
//     marginBottom: "10px",
//     color: "#555",
//   },
//   table: {
//     borderCollapse: "collapse",
//     width: "100%",
//     textAlign: "left",
//     marginTop: "15px",
//   },
//   th: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     backgroundColor: "#ececec",
//     fontWeight: "600",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "10px",
//   },
//   totalRow: {
//     backgroundColor: "#f4f4f4",
//     fontWeight: "bold",
//   },
// };

// export default SummaryReport;


import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"];

const SummaryReport = () => {
  const [summaryData, setSummaryData] = useState([]);

  const fetchingData = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;
      if (!userToken) {
        console.error("No JWT token found");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/getallsheets", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response,"response");
      
      console.log(response.data,"data");
      

      const sheet4 = response.data[3];
      if (sheet4 && sheet4.data?.length) {
        const cleaned = sheet4.data.map((item) => {
          const newItem = {};
          Object.keys(item).forEach((k) => {
            newItem[k.trim()] = item[k];
          });
          return newItem;
        });
        setSummaryData(cleaned);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  if (!summaryData.length)
    return <h3 style={{ color: "#777" }}>No Summary data available</h3>;

  const formatCurrency = (val) =>
    typeof val === "number"
      ? `$${val.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : val;

  const totalSpend = summaryData.reduce(
    (a, b) => a + (Number(b["Spend"]) || Number(b["Spend "]) || 0),
    0
  );
  const totalBudget = summaryData.reduce(
    (a, b) => a + (Number(b["Total Budget"]) || 0),
    0
  );
  const totalRemaining = summaryData.reduce(
    (a, b) => a + (Number(b["Reamining"]) || 0),
    0
  );

  const donutData = [
    { name: "Total Spend", value: totalSpend },
    { name: "Total Budget", value: totalBudget },
    { name: "Remaining", value: totalRemaining },
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>💰 Summary Report (Sheet4)</h3>

      {/* 📊 Bar Chart */}
      <div style={{ width: "100%", height: 320, marginBottom: 40 }}>
        <ResponsiveContainer>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Platform" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="Spend" fill="#82ca9d" barSize={35} radius={[8, 8, 0, 0]} />
            <Bar dataKey="Total Budget" fill="#8884d8" barSize={35} radius={[8, 8, 0, 0]} />
            <Bar dataKey="Reamining" fill="#ffc658" barSize={35} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🍩 Donut Chart */}
      <div style={styles.donutCard}>
        <h4 style={styles.subHeading}>Overall Budget Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {donutData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 Summary Table */}
      <div style={{ marginTop: 30 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Platform</th>
              <th style={styles.th}>Spend</th>
              <th style={styles.th}>Total Budget</th>
              <th style={styles.th}>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.Platform}</td>
                <td style={styles.td}>
                  {formatCurrency(item["Spend"] || item["Spend "] || 0)}
                </td>
                <td style={styles.td}>
                  {formatCurrency(item["Total Budget"] || 0)}
                </td>
                <td style={styles.td}>
                  {formatCurrency(item["Reamining"] || 0)}
                </td>
              </tr>
            ))}
            <tr style={styles.totalRow}>
              <td style={styles.th}>TOTAL</td>
              <td style={styles.th}>{formatCurrency(totalSpend)}</td>
              <td style={styles.th}>{formatCurrency(totalBudget)}</td>
              <td style={styles.th}>{formatCurrency(totalRemaining)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  card: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f8f9fb",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#2c3e50",
  },
  donutCard: {
    marginBottom: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  subHeading: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#555",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "left",
    marginTop: "15px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#ececec",
    fontWeight: "600",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  totalRow: {
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  },
};

export default SummaryReport;
