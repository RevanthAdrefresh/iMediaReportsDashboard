// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];
// const REVENUE_MULT = 1000;

// const normalize = (s = "") =>
//   s.toLowerCase().trim().replace(/\s+/g, "").replace(/_/g, "");

// const num = (v) => {
//   if (v == null || v === "") return 0;
//   if (typeof v === "string") return Number(v.replace(/,/g, ""));
//   return Number(v);
// };

// const convertDate = (serial) => {
//   const n = num(serial);
//   if (!n) return "";
//   const epoch = new Date(1899, 11, 30);
//   return new Date(epoch.getTime() + n * 86400000)
//     .toISOString()
//     .slice(0, 10);
// };

// export default function Earnings() {
//   const [activePlatform, setActivePlatform] = useState("overall");
//   const [selectedCampaign, setSelectedCampaign] = useState("All");

//   const [metrics, setMetrics] = useState({
//     revenue: 0,
//     impressions: 0,
//     clicks: 0,
//     ctr: 0,
//   });

//   const [campaignList, setCampaignList] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [tableData, setTableData] = useState([]);

//   const [adWidgetMetrics, setAdWidgetMetrics] = useState({
//     revenue: 0,
//     impressions: 0,
//     clicks: 0,
//     ctr: 0,
//   });

//   const [adWidgetDailyRows, setAdWidgetDailyRows] = useState([]);
//   const [adWidgetChart, setAdWidgetChart] = useState([]);

//   /* LOAD DATA */
//   useEffect(() => {
//     loadData();
//   }, [activePlatform, selectedCampaign]);

//   const loadData = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("jwt"))?.user;
//       if (!user?.name) return;

//       const res = await axios.get("http://localhost:5000/api/getalldata");
//       const allSheets = res?.data?.sheets || [];

//       let publisherSheets = allSheets.filter(
//         (s) => normalize(s.publisher) === normalize(user.name)
//       );

//       publisherSheets = publisherSheets.filter(
//         (s) => normalize(s.name) !== "summary"
//       );

//       setCampaignList([...new Set(publisherSheets.map((s) => s.campaign))]);

//       /* Categorizing */
//       const videoSheets = publisherSheets.filter((s) =>
//         normalize(s.name).includes("video")
//       );

//       const ottSheets = publisherSheets.filter((s) =>
//         normalize(s.name).includes("ott")
//       );

//       const adWidgetSheets = publisherSheets.filter(
//         (s) => normalize(s.name) === "adwidget"
//       );

//       /* Metric calculator */
//       const computeMetrics = (sheets) => {
//         const rows = sheets.flatMap((sheet) =>
//           (sheet.data || []).map((d) => {
//             let imps = 0;
//             let clicks = 0;

//             for (let key in d) {
//               const k = key.toLowerCase().replace(/\s+/g, "");
//               if (k.includes("imp") || k.includes("view")) imps = num(d[key]);
//               if (k.includes("click")) clicks = num(d[key]);
//             }

//             return { imps, clicks };
//           })
//         );

//         if (!rows.length)
//           return { impressions: 0, clicks: 0, ctr: 0, revenue: 0 };

//         const impressions = rows.reduce((a, r) => a + r.imps, 0);
//         const clicks = rows.reduce((a, r) => a + r.clicks, 0);
//         const ctr = impressions ? (clicks / impressions) * 100 : 0;
//         const revenue = clicks * (ctr / 100) * REVENUE_MULT;

//         return { impressions, clicks, ctr, revenue };
//       };

//       /* Platform-wide metrics */
//       const videoMetrics = computeMetrics(videoSheets);
//       const ottMetrics = computeMetrics(ottSheets);
//       const adMetrics = computeMetrics(adWidgetSheets);

//       /* ---------------- ADWIDGET FILTERING ---------------- */
//       let adFilteredSheets = adWidgetSheets;
//       if (selectedCampaign !== "All") {
//         adFilteredSheets = adWidgetSheets.filter(
//           (s) => normalize(s.campaign) === normalize(selectedCampaign)
//         );
//       }

//       const adFilteredMetrics = computeMetrics(adFilteredSheets);

//       setAdWidgetMetrics({
//         revenue: adFilteredMetrics.revenue.toFixed(2),
//         impressions: adFilteredMetrics.impressions,
//         clicks: adFilteredMetrics.clicks,
//         ctr: adFilteredMetrics.ctr.toFixed(2),
//       });

//       /* ADWIDGET daily table */
//       setAdWidgetDailyRows(
//         adFilteredSheets.flatMap((sheet) =>
//           (sheet.data || []).map((r) => ({
//             date:
//               convertDate(num(r.Date)) ||
//               convertDate(num(r.date)) ||
//               convertDate(num(r.Day)),
//             imps:
//               num(r.Impressions) ||
//               num(r.impressions) ||
//               num(r.Views) ||
//               num(r.views),
//             clicks:
//               num(r.Clicks) ||
//               num(r.clicks) ||
//               num(r["NP Clicks"]) ||
//               num(r["NP clicks"]),
//           }))
//         )
//       );

//       /* ---------------- ADWIDGET CAMPAIGN-WISE CHART (Fixed) ---------------- */
//       const adChartCampaign = {};

//       adFilteredSheets.forEach((sheet) => {
//         const revenue = (sheet.data || []).reduce((acc, r) => {
//           const imps = num(r.Impressions) || num(r.Views);
//           const clicks = num(r.Clicks) || num(r["NP Clicks"]);
//           const ctr = imps ? (clicks / imps) * 100 : 0;
//           return acc + clicks * (ctr / 100) * REVENUE_MULT;
//         }, 0);

//         adChartCampaign[sheet.campaign] =
//           (adChartCampaign[sheet.campaign] || 0) + revenue;
//       });

//       setAdWidgetChart(
//         Object.entries(adChartCampaign).map(([name, revenue]) => ({
//           name,
//           revenue: Number(revenue.toFixed(2)),
//         }))
//       );

//       /* ---------------- Other platforms filter ---------------- */
//       let sheetPool = [];

//       if (activePlatform === "video") sheetPool = videoSheets;
//       else if (activePlatform === "ott") sheetPool = ottSheets;
//       else if (activePlatform === "adwidget") sheetPool = adFilteredSheets;
//       else sheetPool = publisherSheets;

//       if (selectedCampaign !== "All" && activePlatform !== "adwidget") {
//         sheetPool = sheetPool.filter(
//           (s) => normalize(s.campaign) === normalize(selectedCampaign)
//         );
//       }

//       const recalculatedMetrics = computeMetrics(sheetPool);

//       setMetrics({
//         revenue: recalculatedMetrics.revenue.toFixed(2),
//         impressions: recalculatedMetrics.impressions,
//         clicks: recalculatedMetrics.clicks,
//         ctr: recalculatedMetrics.ctr.toFixed(2),
//       });

//       setTableData(
//         sheetPool.flatMap((sheet) =>
//           (sheet.data || []).map((r) => ({
//             date:
//               convertDate(num(r.Date)) ||
//               convertDate(num(r.date)) ||
//               convertDate(num(r.Day)),
//             imps:
//               num(r.Impressions) ||
//               num(r.impressions) ||
//               num(r.Views) ||
//               num(r.views),
//             clicks:
//               num(r.Clicks) ||
//               num(r.clicks) ||
//               num(r["NP Clicks"]) ||
//               num(r["NP clicks"]),
//           }))
//         )
//       );

//       /* Overall bar/pie chart */
//       const revenueChartData = {};
//       sheetPool.forEach((sheet) => {
//         const revenue = (sheet.data || []).reduce((acc, r) => {
//           const imps = num(r.Impressions) || num(r.Views);
//           const clicks = num(r.Clicks) || num(r["NP Clicks"]);
//           const ctr = imps ? (clicks / imps) * 100 : 0;
//           return acc + clicks * (ctr / 100) * REVENUE_MULT;
//         }, 0);

//         revenueChartData[sheet.campaign] =
//           (revenueChartData[sheet.campaign] || 0) + revenue;
//       });

//       setChartData(
//         Object.entries(revenueChartData).map(([name, revenue]) => ({
//           name,
//           revenue: Number(revenue.toFixed(2)),
//         }))
//       );
//     } catch (err) {
//       console.error("🔥 Error:", err);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <aside style={styles.sidebar}>
//         <h2 style={styles.menuTitle}>Earnings Menu</h2>

//         {["overall", "video", "ott", "adwidget"].map((p) => (
//           <button
//             key={p}
//             onClick={() => setActivePlatform(p)}
//             style={{
//               ...styles.menuBtn,
//               background: activePlatform === p ? "#00C49F" : "transparent",
//             }}
//           >
//             {p.toUpperCase()}
//           </button>
//         ))}

//         <div style={{ marginTop: 25 }}>
//           <h3 style={{ color: "#fff" }}>Campaign</h3>
//           <select
//             value={selectedCampaign}
//             onChange={(e) => setSelectedCampaign(e.target.value)}
//             style={styles.select}
//           >
//             <option value="All">All</option>
//             {campaignList.map((c, i) => (
//               <option key={i} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </div>
//       </aside>

//       <main style={styles.main}>
//         {/* ADWIDGET VIEW */}
//         {activePlatform === "adwidget" ? (
//           <>
//             <h2 style={styles.title}>
//               ADWIDGET Earnings{" "}
//               {selectedCampaign !== "All" ? ` - ${selectedCampaign}` : ""}
//             </h2>

//             <div style={styles.metricsRow}>
//               <div style={styles.metricBox}>
//                 <h4>Revenue</h4>
//                 <p>${adWidgetMetrics.revenue}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>Impressions</h4>
//                 <p>{adWidgetMetrics.impressions.toLocaleString()}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>Clicks</h4>
//                 <p>{adWidgetMetrics.clicks.toLocaleString()}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>CTR</h4>
//                 <p>{adWidgetMetrics.ctr}%</p>
//               </div>
//             </div>

//             <div style={styles.card}>
//               <h3>Daily Data</h3>
//               <table style={styles.table}>
//                 <thead>
//                   <tr>
//                     <th style={styles.th}>Date</th>
//                     <th style={styles.th}>Impressions</th>
//                     <th style={styles.th}>Clicks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {adWidgetDailyRows.map((row, i) => (
//                     <tr key={i}>
//                       <td style={styles.td}>{row.date}</td>
//                       <td style={styles.td}>{row.imps}</td>
//                       <td style={styles.td}>{row.clicks}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* CHARTS */}
//             <div style={styles.chartRow}>
//               <div style={styles.card}>
//                 <h3>Revenue Share</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={adWidgetChart}
//                       dataKey="revenue"
//                       nameKey="name"
//                       outerRadius={110}
//                       label
//                     >
//                       {adWidgetChart.map((_, i) => (
//                         <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div style={styles.card}>
//                 <h3>Revenue Trend</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={adWidgetChart}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="revenue" fill="#00C49F" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             {/* OTHER PLATFORMS */}
//             <h2 style={styles.title}>
//               {activePlatform.toUpperCase()} Earnings{" "}
//               {selectedCampaign !== "All" && activePlatform !== "overall"
//                 ? ` - ${selectedCampaign}`
//                 : ""}
//             </h2>

//             <div style={styles.metricsRow}>
//               <div style={styles.metricBox}>
//                 <h4>Revenue</h4>
//                 <p>${metrics.revenue}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>Impressions</h4>
//                 <p>{metrics.impressions.toLocaleString()}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>Clicks</h4>
//                 <p>{metrics.clicks.toLocaleString()}</p>
//               </div>
//               <div style={styles.metricBox}>
//                 <h4>CTR</h4>
//                 <p>{metrics.ctr}%</p>
//               </div>
//             </div>

//             {activePlatform !== "overall" && (
//               <div style={styles.card}>
//                 <h3>Data Table</h3>
//                 <table style={styles.table}>
//                   <thead>
//                     <tr>
//                       <th style={styles.th}>Date</th>
//                       <th style={styles.th}>Impressions</th>
//                       <th style={styles.th}>Clicks</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tableData.map((row, i) => (
//                       <tr key={i}>
//                         <td style={styles.td}>{row.date}</td>
//                         <td style={styles.td}>{row.imps}</td>
//                         <td style={styles.td}>{row.clicks}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <div style={styles.chartRow}>
//               <div style={styles.card}>
//                 <h3>Revenue Share</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       dataKey="revenue"
//                       nameKey="name"
//                       outerRadius={110}
//                       label
//                     >
//                       {chartData.map((_, i) => (
//                         <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div style={styles.card}>
//                 <h3>Revenue Trend</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="revenue" fill="#00C49F" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ✅ STYLES */
// const styles = {
//   container: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "#f4f6f8",
//   },
//   sidebar: {
//     width: "240px",
//     background: "#002b36",
//     color: "#fff",
//     padding: "20px",
//     height: "100vh",
//     position: "fixed",
//     left: 0,
//     top: 0,
//     overflowY: "auto",
//   },
//   main: {
//     flex: 1,
//     padding: "30px",
//     marginLeft: "240px",
//     width: "calc(100% - 240px)",
//   },
//   menuTitle: { fontSize: "18px", fontWeight: "bold", marginBottom: "20px" },
//   menuBtn: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "6px",
//     marginBottom: "10px",
//     border: "none",
//     cursor: "pointer",
//     color: "#fff",
//     fontSize: "16px",
//   },
//   select: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "6px",
//     marginTop: "10px",
//   },
//   title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
//   metricsRow: {
//     display: "flex",
//     gap: "15px",
//     flexWrap: "wrap",
//     marginBottom: "30px",
//   },
//   metricBox: {
//     flex: "1 1 250px",
//     background: "#fff",
//     padding: "25px",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//   },
//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "20px",
//     flex: 1,
//     minWidth: "380px",
//   },
//   chartRow: {
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "15px",
//   },
//   th: { border: "1px solid black", padding: "10px", background: "#ddd" },
//   td: { border: "1px solid black", padding: "10px" },
// };

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];

// ✅ CPM Revenue Formula
const CPM_VALUE = 10; // You can change this anytime

const normalize = (s = "") =>
  s.toLowerCase().trim().replace(/\s+/g, "").replace(/_/g, "");

const num = (v) => {
  if (v == null || v === "") return 0;
  if (typeof v === "string") return Number(v.replace(/,/g, ""));
  return Number(v);
};

const convertDate = (serial) => {
  const n = num(serial);
  if (!n) return "";
  const epoch = new Date(1899, 11, 30);
  return new Date(epoch.getTime() + n * 86400000)
    .toISOString()
    .slice(0, 10);
};

export default function Earnings() {
  const [activePlatform, setActivePlatform] = useState("overall");
  const [selectedCampaign, setSelectedCampaign] = useState("All");

  const [metrics, setMetrics] = useState({
    revenue: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });

  const [campaignList, setCampaignList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [adWidgetMetrics, setAdWidgetMetrics] = useState({
    revenue: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });

  const [adWidgetDailyRows, setAdWidgetDailyRows] = useState([]);
  const [adWidgetChart, setAdWidgetChart] = useState([]);

  useEffect(() => {
    loadData();
  }, [activePlatform, selectedCampaign]);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("jwt"))?.user;
      if (!user?.name) return;

      const res = await axios.get("http://localhost:5000/api/getalldata");
      const allSheets = res?.data?.sheets || [];

      let publisherSheets = allSheets.filter(
        (s) => normalize(s.publisher) === normalize(user.name)
      );

      publisherSheets = publisherSheets.filter(
        (s) => normalize(s.name) !== "summary"
      );

      setCampaignList([...new Set(publisherSheets.map((s) => s.campaign))]);

      const videoSheets = publisherSheets.filter((s) =>
        normalize(s.name).includes("video")
      );
      const ottSheets = publisherSheets.filter((s) =>
        normalize(s.name).includes("ott")
      );
      const adWidgetSheets = publisherSheets.filter(
        (s) => normalize(s.name) === "adwidget"
      );

      /* ✅ Universal CPM revenue-based metrics */
      const computeMetrics = (sheets) => {
        let totalImpressions = 0;
        let totalClicks = 0;

        sheets.forEach((sheet) => {
          (sheet.data || []).forEach((r) => {
            Object.keys(r).forEach((k) => {
              const key = k.toLowerCase().replace(/\s+/g, "");
              if (key.includes("imp") || key.includes("view"))
                totalImpressions += num(r[k]);
              if (key.includes("click")) totalClicks += num(r[k]);
            });
          });
        });

        const ctr = totalImpressions
          ? ((totalClicks / totalImpressions) * 100).toFixed(2)
          : 0;

        const revenue = ((totalImpressions / 1000) * CPM_VALUE).toFixed(2);

        return {
          impressions: totalImpressions,
          clicks: totalClicks,
          ctr,
          revenue,
        };
      };

      /* Apply CPM logic */
      const videoMetrics = computeMetrics(videoSheets);
      const ottMetrics = computeMetrics(ottSheets);
      const adMetrics = computeMetrics(adWidgetSheets);

      /* ✅ ADWIDGET Campaign Filter */
      let adFiltered = adWidgetSheets;
      if (selectedCampaign !== "All") {
        adFiltered = adWidgetSheets.filter(
          (s) => normalize(s.campaign) === normalize(selectedCampaign)
        );
      }

      const adFilteredMetrics = computeMetrics(adFiltered);

      setAdWidgetMetrics(adFilteredMetrics);

      /* ✅ Daily rows for adwidget */
      setAdWidgetDailyRows(
        adFiltered.flatMap((sheet) =>
          (sheet.data || []).map((r) => {
            const imps =
              num(r.Impressions) ||
              num(r.Views) ||
              num(r.impressions) ||
              num(r.views);

            const clicks =
              num(r.Clicks) ||
              num(r["NP Clicks"]) ||
              num(r.clicks) ||
              num(r["NP clicks"]);

            const revenue = ((imps / 1000) * CPM_VALUE).toFixed(2);

            const ctr = imps ? ((clicks / imps) * 100).toFixed(2) : 0;

            return {
              date:
                convertDate(num(r.Date)) ||
                convertDate(num(r.date)) ||
                convertDate(num(r.Day)),
              imps,
              clicks,
              ctr,
              revenue,
            };
          })
        )
      );

      /* ✅ Campaign-wise revenue for adwidget (CPM-based) */
      const adChartObj = {};
      adFiltered.forEach((sheet) => {
        const impressions = (sheet.data || []).reduce(
          (sum, r) =>
            sum +
            num(r.Impressions) +
            num(r.Views) +
            num(r.impressions) +
            num(r.views),
          0
        );

        const revenue = ((impressions / 1000) * CPM_VALUE).toFixed(2);

        adChartObj[sheet.campaign] =
          (adChartObj[sheet.campaign] || 0) + Number(revenue);
      });

      setAdWidgetChart(
        Object.entries(adChartObj).map(([name, revenue]) => ({
          name,
          revenue,
        }))
      );

      /* ✅ Aggregate others */
      let sheetPool = [];
      if (activePlatform === "video") sheetPool = videoSheets;
      else if (activePlatform === "ott") sheetPool = ottSheets;
      else if (activePlatform === "adwidget") sheetPool = adFiltered;
      else sheetPool = publisherSheets;

      if (selectedCampaign !== "All" && activePlatform !== "adwidget") {
        sheetPool = sheetPool.filter(
          (s) => normalize(s.campaign) === normalize(selectedCampaign)
        );
      }

      const platformMetrics = computeMetrics(sheetPool);
      setMetrics(platformMetrics);

      /* ✅ Data table rows */
      setTableData(
        sheetPool.flatMap((sheet) =>
          (sheet.data || []).map((r) => {
            const imps =
              num(r.Impressions) ||
              num(r.Views) ||
              num(r.impressions) ||
              num(r.views);

            const clicks =
              num(r.Clicks) ||
              num(r["NP Clicks"]) ||
              num(r.clicks) ||
              num(r["NP clicks"]);

            const ctr = imps ? ((clicks / imps) * 100).toFixed(2) : 0;

            const revenue = ((imps / 1000) * CPM_VALUE).toFixed(2);

            return {
              date:
                convertDate(num(r.Date)) ||
                convertDate(num(r.date)) ||
                convertDate(num(r.Day)),
              imps,
              clicks,
              ctr,
              revenue,
            };
          })
        )
      );

      /* ✅ Revenue chart */
      const chartObj = {};
      sheetPool.forEach((sheet) => {
        const impressions = (sheet.data || []).reduce(
          (sum, r) =>
            sum +
            num(r.Impressions) +
            num(r.Views) +
            num(r.impressions) +
            num(r.views),
          0
        );

        const revenue = ((impressions / 1000) * CPM_VALUE).toFixed(2);

        chartObj[sheet.campaign] =
          (chartObj[sheet.campaign] || 0) + Number(revenue);
      });

      setChartData(
        Object.entries(chartObj).map(([name, revenue]) => ({
          name,
          revenue,
        }))
      );
    } catch (err) {
      console.error("🔥 Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.menuTitle}>Earnings Menu</h2>

        {["overall", "video", "ott", "adwidget"].map((p) => (
          <button
            key={p}
            onClick={() => setActivePlatform(p)}
            style={{
              ...styles.menuBtn,
              background: activePlatform === p ? "#00C49F" : "transparent",
            }}
          >
            {p.toUpperCase()}
          </button>
        ))}

        <div style={{ marginTop: 25 }}>
          <h3 style={{ color: "#fff" }}>Campaign</h3>

          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            style={styles.select}
          >
            <option value="All">All</option>
            {campaignList.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <main style={styles.main}>
        {activePlatform === "adwidget" ? (
          <>
            <h2 style={styles.title}>
              ADWIDGET Earnings{" "}
              {selectedCampaign !== "All" ? ` - ${selectedCampaign}` : ""}
            </h2>

            <div style={styles.metricsRow}>
              <div style={styles.metricBox}>
                <h4>Revenue</h4>
                <p>${adWidgetMetrics.revenue}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>Impressions</h4>
                <p>{adWidgetMetrics.impressions.toLocaleString()}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>Clicks</h4>
                <p>{adWidgetMetrics.clicks.toLocaleString()}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>CTR</h4>
                <p>{adWidgetMetrics.ctr}%</p>
              </div>
            </div>

            {/* ✅ ADWIDGET TABLE WITH CTR + REVENUE */}
            <div style={styles.card}>
              <h3>Daily Data (CPM Based)</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Impressions</th>
                    <th style={styles.th}>Clicks</th>
                    <th style={styles.th}>CTR%</th>
                    <th style={styles.th}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {adWidgetDailyRows.map((row, i) => (
                    <tr key={i}>
                      <td style={styles.td}>{row.date}</td>
                      <td style={styles.td}>{row.imps}</td>
                      <td style={styles.td}>{row.clicks}</td>
                      <td style={styles.td}>{row.ctr}</td>
                      <td style={styles.td}>${row.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.chartRow}>
              <div style={styles.card}>
                <h3>Revenue Share</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adWidgetChart}
                      dataKey="revenue"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >
                      {adWidgetChart.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.card}>
                <h3>Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adWidgetChart}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.title}>
              {activePlatform.toUpperCase()} Earnings{" "}
              {selectedCampaign !== "All" && activePlatform !== "overall"
                ? ` - ${selectedCampaign}`
                : ""}
            </h2>

            <div style={styles.metricsRow}>
              <div style={styles.metricBox}>
                <h4>Revenue</h4>
                <p>${metrics.revenue}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>Impressions</h4>
                <p>{metrics.impressions.toLocaleString()}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>Clicks</h4>
                <p>{metrics.clicks.toLocaleString()}</p>
              </div>
              <div style={styles.metricBox}>
                <h4>CTR</h4>
                <p>{metrics.ctr}%</p>
              </div>
            </div>

            {activePlatform !== "overall" && (
              <div style={styles.card}>
                <h3>Data Table (CPM Based)</h3>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Impressions</th>
                      <th style={styles.th}>Clicks</th>
                      <th style={styles.th}>CTR%</th>
                      <th style={styles.th}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i}>
                        <td style={styles.td}>{row.date}</td>
                        <td style={styles.td}>{row.imps}</td>
                        <td style={styles.td}>{row.clicks}</td>
                        <td style={styles.td}>{row.ctr}</td>
                        <td style={styles.td}>${row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={styles.chartRow}>
              <div style={styles.card}>
                <h3>Revenue Share</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="revenue"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.card}>
                <h3>Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* STYLES */
const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#f4f6f8" },
  sidebar: {
    width: "240px",
    background: "#002b36",
    color: "#fff",
    padding: "20px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
  },
  main: {
    flex: 1,
    padding: "30px",
    marginLeft: "240px",
  },
  menuTitle: { fontSize: "18px", fontWeight: "bold", marginBottom: "20px" },
  menuBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontSize: "16px",
  },
  select: { width: "100%", padding: "10px", borderRadius: "6px", marginTop: "10px" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  metricsRow: { display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" },
  metricBox: {
    flex: "1 1 250px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    flex: 1,
    minWidth: "380px",
  },
  chartRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "15px" },
  th: { border: "1px solid black", padding: "10px", background: "#ddd" },
  td: { border: "1px solid black", padding: "10px" },
};
