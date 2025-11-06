
// import React, { useEffect, useState } from "react";
// import {
//   Line,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ComposedChart,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const AdWidget = () => {
//   const [sheetData, setSheetData] = useState([]);

//   useEffect(() => {
//     try {
//       const storedData = localStorage.getItem("uploadedSheets");
//       if (!storedData) return;

//       const parsed = JSON.parse(storedData);
//       const sheet1 = parsed.find(
//         (sheet) => sheet.name?.trim().toLowerCase() === "sheet1"
//       );

//       if (sheet1 && sheet1.data?.length) {
//         // ✅ Clean keys & normalize numbers
//         const cleaned = sheet1.data.map((item) => {
//           const newItem = {};
//           Object.keys(item).forEach((k) => {
//             const key = k.trim();
//             let value = item[k];

//             // Try to parse numbers
//             if (!isNaN(value) && value !== "" && value !== null) {
//               value = Number(value);
//             } else if (
//               typeof value === "string" &&
//               value.replace(/[^0-9.]/g, "").length
//             ) {
//               value = Number(value.replace(/[^0-9.]/g, ""));
//             }

//             newItem[key] = value;
//           });
//           return newItem;
//         });

//         setSheetData(cleaned);
//       }
//     } catch (error) {
//       console.error("Error loading AdWidget data:", error);
//     }
//   }, []);

//   if (!sheetData.length)
//     return <h3 style={{ color: "#777" }}>No AdWidget data available</h3>;

//   // ✅ Prepare Donut Summary
//   const totalImpressions = sheetData.reduce(
//     (a, b) => a + (b.Impressions || 0),
//     0
//   );
//   const totalClicks = sheetData.reduce((a, b) => a + (b.Clicks || 0), 0);
//   const totalSpend = sheetData.reduce((a, b) => a + (b.Spend || 0), 0);

//   const donutData = [
//     { name: "Impressions", value: totalImpressions },
//     { name: "Clicks", value: totalClicks },
//     { name: "Spend", value: totalSpend },
//   ];

//   return (
//     <div style={styles.card}>
//       <h3>📊 AdWidget (Sheet1 Report)</h3>

//       {/* Combined Bar + Line Chart with Dual Axis */}
//       <div style={{ width: "100%", height: 350 }}>
//         <ResponsiveContainer>
//           <ComposedChart data={sheetData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Date" />
//             <YAxis
//               yAxisId="left"
//               label={{ value: "Impressions / Spend", angle: -90, position: "insideLeft" }}
//             />
//             <YAxis
//               yAxisId="right"
//               orientation="right"
//               label={{ value: "Clicks / CTR", angle: -90, position: "insideRight" }}
//             />
//             <Tooltip />
//             <Legend />

//             {/* Bars */}
//             <Bar
//               yAxisId="left"
//               dataKey="Impressions"
//               fill="#0d00ffff"
//               barSize={25}
//               name="Impressions"
//             />
//             <Bar
//               yAxisId="left"
//               dataKey="Spend"
//               fill="#003a16ff"
//               barSize={25}
//               name="Spend"
//             />

//             {/* Lines (on right axis so they appear higher) */}
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="Clicks"
//               stroke="#9c4600ff"
//               strokeWidth={2.5}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//               name="Clicks"
//             />
//             <Line
//               yAxisId="right"
//               type="monotone"
//               dataKey="CTR"
//               stroke="#f71dffff"
//               strokeWidth={2.5}
//               dot={{ r: 4 }}
//               activeDot={{ r: 6 }}
//               name="CTR"
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Donut Chart */}
//       <div style={{ width: "100%", height: 300, marginTop: 30 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={donutData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={100}
//               fill="#8884d8"
//               label
//             >
//               {donutData.map((entry, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Data Table */}
//       <div style={{ marginTop: 30 }}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               {Object.keys(sheetData[0]).map((head, i) => (
//                 <th key={i} style={styles.th}>
//                   {head}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sheetData.map((row, i) => (
//               <tr key={i}>
//                 {Object.keys(row).map((key, j) => (
//                   <td key={j} style={styles.td}>
//                     {row[key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
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
//     backgroundColor: "#f8f8f8",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "8px",
//   },
// };

// export default AdWidget;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdWidget = () => {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usertoken = JSON.parse(localStorage.getItem("jwt")).token
        if (!usertoken) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/getallsheets", {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        });
console.log(response,"respinse");

        const data = response.data[1]?.data || [];
        if (!Array.isArray(data) || !data.length) return;

        // ✅ Normalize keys and values
        const cleaned = data.map((item) => {
          const newItem = {};
          Object.keys(item).forEach((k) => {
            const key = k.trim();
            let value = item[k];

            // Convert Excel serial date if needed
            if (key.toLowerCase() === "date" && !isNaN(value)) {
              const excelDate = Number(value);
              const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
              value = jsDate.toISOString().split("T")[0];
            }

            // Convert numeric strings
            if (!isNaN(value) && value !== "" && value !== null) {
              value = Number(value);
            } else if (
              typeof value === "string" &&
              value.replace(/[^0-9.]/g, "").length
            ) {
              value = Number(value.replace(/[^0-9.]/g, ""));
            }

            newItem[key] = value;
          });
          return newItem;
        });

        setSheetData(cleaned);
      } catch (error) {
        console.error("Error fetching AdWidget data:", error);
      }
    };

    fetchData();
  }, []);

  if (!sheetData.length)
    return <h3 style={{ color: "#777" }}>No AdWidget data available</h3>;

  // ✅ Donut Summary
  const totalImpressions = sheetData.reduce((a, b) => a + (b.Impressions || 0), 0);
  const totalClicks = sheetData.reduce((a, b) => a + (b.Clicks || 0), 0);
  const totalSpend = sheetData.reduce((a, b) => a + (b.Spend || 0), 0);

  const donutData = [
    { name: "Impressions", value: totalImpressions },
    { name: "Clicks", value: totalClicks },
    { name: "Spend", value: totalSpend },
  ];

  return (
    <div style={styles.card}>
      <h3>📊 AdWidget (Live Report)</h3>

      {/* Combined Bar + Line Chart */}
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <ComposedChart data={sheetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis
              yAxisId="left"
              label={{
                value: "Impressions / Spend",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Clicks / CTR",
                angle: -90,
                position: "insideRight",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="Impressions"
              fill="#0d00ff"
              barSize={25}
              name="Impressions"
            />
            <Bar
              yAxisId="left"
              dataKey="Spend"
              fill="#003a16"
              barSize={25}
              name="Spend"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Clicks"
              stroke="#9c4600"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Clicks"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="CTR"
              stroke="#f71dff"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="CTR"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart */}
      <div style={{ width: "100%", height: 300, marginTop: 30 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={donutData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {donutData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ marginTop: 30 }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {Object.keys(sheetData[0]).map((head, i) => (
                <th key={i} style={styles.th}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key, j) => (
                  <td key={j} style={styles.td}>
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
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
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "left",
    marginTop: "15px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#ececec",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default AdWidget;
