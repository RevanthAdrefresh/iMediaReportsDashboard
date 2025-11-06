// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import axios from "axios";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// // const tabs = ["Overall", "OTT", "Video", "Ad Widget"];

// // const PublisherEarnings = () => {
// //   const { state } = useLocation();
// //   const publisherId = state?.publisherId;

// //   const [activeTab, setActiveTab] = useState("Overall");
// //   const [stats, setStats] = useState({ revenue:0, clicks:0, imps:0, ctr:0, ecpm:0 });
// //   const [chartData, setChartData] = useState([]);

// //   useEffect(() => {
// //     if (!publisherId) return;

// //     const token = localStorage.getItem("token");

// //     axios.get("http://localhost:5000/api/getalldata", {
// //       headers: { Authorization: `Bearer ${token}` }
// //     }).then(res => {
// //       const sheets = res.data.filter(s => (s.uploadedBy?._id || s.uploadedBy) === publisherId);

// //       const platformMap = { 0: "OTT", 1: "Video", 2: "Ad Widget" };
// //       const metrics = { revenue:0, clicks:0, imps:0 };
// //       const chart = [];

// //       sheets.forEach((sheet, idx) => {
// //         const plat = platformMap[idx] || "Other";
// //         if (activeTab !== "Overall" && activeTab !== plat) return;

// //         sheet.data.forEach(row => {
// //           const clean = {}; Object.keys(row).forEach(k => clean[k.trim()] = row[k]);
// //           const imps = Number(clean.Impressions || 0);
// //           const clk = Number(clean.Clicks || 0);
// //           const cpm = Number(clean.CPM || 0);
// //           const cpc = Number(clean.CPC || 0);

// //           let rev = cpc>0 && clk>0 ? clk*cpc : cpm>0 ? (imps/1000)*cpm : (imps/1000)*1.5;

// //           metrics.revenue += rev;
// //           metrics.imps += imps;
// //           metrics.clicks += clk;

// //           chart.push({
// //             name: plat,
// //             revenue: Number(rev.toFixed(2))
// //           });
// //         });
// //       });

// //       metrics.ctr = metrics.imps ? ((metrics.clicks / metrics.imps)*100).toFixed(2) : 0;
// //       metrics.ecpm = metrics.imps ? ((metrics.revenue / metrics.imps)*1000).toFixed(2) : 0;

// //       setStats(metrics);
// //       setChartData(chart);
// //     });
// //   }, [publisherId, activeTab]);

// //   return (
// //     <div style={{display:"flex",marginLeft:"-22%"}}>
      
// //       {/* Sidebar */}
// //       <div style={{width:"200px",background:"#062f3c",color:"white",padding:"15px"}}>
// //         {tabs.map(t=>(
// //           <div key={t}
// //             onClick={()=>setActiveTab(t)}
// //             style={{
// //               padding:"10px",
// //               margin:"5px 0",
// //               cursor:"pointer",
// //               background: activeTab===t? "#05c19c":"transparent",
// //               borderRadius:"6px"
// //             }}
// //           >
// //             {t}
// //           </div>
// //         ))}
// //       </div>

// //       {/* Content */}
// //       <div style={{flex:1,padding:"20px"}}>
// //         <h2>{activeTab} Earnings</h2>

// //         <div style={{display:"flex",gap:"15px",marginBottom:"20px"}}>
// //           <Card title="Revenue" value={`$${stats.revenue.toFixed(2)}`} />
// //           <Card title="Impressions" value={stats.imps.toLocaleString()} />
// //           <Card title="Clicks" value={stats.clicks} />
// //           <Card title="CTR" value={`${stats.ctr}%`} />
// //           <Card title="eCPM" value={`$${stats.ecpm}`} />
// //         </div>

// //         <div style={{height:"300px",background:"white",padding:"10px",borderRadius:"10px"}}>
// //           <ResponsiveContainer width="100%" height="100%">
// //             <BarChart data={chartData}>
// //               <CartesianGrid strokeDasharray="3 3"/>
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="revenue" fill="#82ca9d" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const Card = ({title,value}) => (
// //   <div style={{
// //     background:"white",
// //     padding:"15px",
// //     borderRadius:"10px",
// //     fontSize:"14px",
// //     flex:1,
// //     boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
// //     // marginLeft:""
// //   }}>
// //     <div style={{fontWeight:"600"}}>{title}</div>
// //     <div style={{fontSize:"18px",marginTop:"5px"}}>{value}</div>
// //   </div>
// // );

// // export default PublisherEarnings;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
//   CartesianGrid, ResponsiveContainer, Legend
// } from "recharts";

// const tabs = ["Overall", "OTT", "Video", "Ad Widget"];

// const PublisherEarnings = () => {
//   const { state } = useLocation();
//   const publisherId = state?.publisherId;

//   const [activeTab, setActiveTab] = useState("Overall");
//   const [stats, setStats] = useState({});
//   const [chartData, setChartData] = useState([]);

//   const platformMap = { 0: "OTT", 1: "Video", 2: "Ad Widget" };

//   useEffect(() => {
//     if (!publisherId) return;

//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:5000/api/getalldata", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         const sheets = res.data.filter(
//           (s) => (s.uploadedBy?._id || s.uploadedBy) === publisherId
//         );

//         let metrics = { revenue: 0, imps: 0, clicks: 0 };
//         const dateMap = {};

//         sheets.forEach((sheet, idx) => {
//           const plat = platformMap[idx] || "Skip";
//           if (idx > 2) return;
//           if (activeTab !== "Overall" && activeTab !== plat) return;

//           const date = new Date(sheet.createdAt).toLocaleDateString();

//           sheet.data.forEach((row) => {
//             const clean = {};
//             Object.keys(row).forEach((k) => (clean[k.trim()] = row[k]));

//             const imps = Number(clean.Impressions || 0);
//             const clicks = Number(clean.Clicks || 0);
//             const cpm = Number(clean.CPM || 0);
//             const cpc = Number(clean.CPC || 0);

//             let rev =
//               cpc > 0 && clicks > 0
//                 ? clicks * cpc
//                 : cpm > 0
//                 ? (imps / 1000) * cpm
//                 : (imps / 1000) * 1.5;

//             metrics.revenue += rev;
//             metrics.imps += imps;
//             metrics.clicks += clicks;

//             if (!dateMap[date]) dateMap[date] = { date, revenue: 0 };
//             dateMap[date].revenue += rev;
//           });
//         });

//         metrics.ctr = metrics.imps ? ((metrics.clicks / metrics.imps) * 100).toFixed(2) : 0;
//         metrics.ecpm = metrics.imps ? ((metrics.revenue / metrics.imps) * 1000).toFixed(2) : 0;

//         setStats(metrics);
//         setChartData(Object.values(dateMap));
//       });
//   }, [publisherId, activeTab]);

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>

//       {/* Sidebar */}
//       <div style={{
//         width: "240px", background: "#051f33", color: "#fff",
//         padding: "25px 10px", fontSize: "15px", fontWeight: 500
//       }}>
//         <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
//           📊 Earnings Menu
//         </div>
//         {tabs.map((tab) => (
//           <div
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             style={{
//               padding: "12px 15px",
//               cursor: "pointer",
//               background: activeTab === tab ? "#06c19c" : "transparent",
//               borderRadius: "8px",
//               marginBottom: "8px",
//             }}
//           >
//             {tab}
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, padding: "32px", background: "#f4f6fa" }}>
//         <h2 style={{ marginBottom: "25px", fontSize: "26px", fontWeight: 700 }}>
//           {activeTab} Earnings Dashboard
//         </h2>

//         {/* Stat Cards */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(5, 1fr)",
//           gap: "20px",
//           marginBottom: "30px",
//         }}>
//           <Card label="Revenue" value={`$${stats.revenue?.toFixed(2)}`} />
//           <Card label="Impressions" value={stats.imps?.toLocaleString()} />
//           <Card label="Clicks" value={stats.clicks} />
//           <Card label="CTR" value={`${stats.ctr}%`} />
//           <Card label="eCPM" value={`$${stats.ecpm}`} />
//         </div>

//         {/* Chart */}
//         <div style={{
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "12px",
//           height: "380px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
//         }}>
//           <h3 style={{ marginBottom: "10px" }}>📈 Revenue Over Time</h3>

//           <ResponsiveContainer width="100%" height="90%">
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="revenue" stroke="#06c19c" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//       </div>
//     </div>
//   );
// };

// const Card = ({ label, value }) => (
//   <div style={{
//     background: "#fff",
//     padding: "22px",
//     borderRadius: "12px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//   }}>
//     <div style={{ fontSize: "15px", fontWeight: 600, color: "#6d7a88" }}>{label}</div>
//     <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "6px" }}>{value}</div>
//   </div>
// );

// export default PublisherEarnings;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from "recharts";

const tabs = ["Overall", "OTT", "Video", "Ad Widget"];

const COLORS = ["#06c19c", "#0088FE", "#FF8042", "#A020F0"];

const PublisherEarnings = () => {
  const { state } = useLocation();
  const publisherId = state?.publisherId;

  const [activeTab, setActiveTab] = useState("Overall");
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [donutData, setDonutData] = useState([]);

  const platformMap = { 0: "OTT", 1: "Video", 2: "Ad Widget" };

  useEffect(() => {
    if (!publisherId) return;

    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/getalldata", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {

      const sheets = res.data.filter(s => (s.uploadedBy?._id || s.uploadedBy) === publisherId);

      let metrics = { revenue: 0, imps: 0, clicks: 0 };
      const dateMap = {};
      const platformTotals = { "OTT":0, "Video":0, "Ad Widget":0 };

      sheets.forEach((sheet, idx) => {
        const platform = platformMap[idx] || "Skip";
        if (idx > 2) return;
        if (activeTab !== "Overall" && activeTab !== platform) return;

        const date = new Date(sheet.createdAt).toLocaleDateString();

        sheet.data.forEach(row => {
          const clean = {};
          Object.keys(row).forEach(k => clean[k.trim()] = row[k]);

          const imps = Number(clean.Impressions || 0);
          const clicks = Number(clean.Clicks || 0);
          const cpm = Number(clean.CPM || 0);
          const cpc = Number(clean.CPC || 0);

          let rev = cpc>0 && clicks>0 ? clicks*cpc : cpm>0 ? (imps/1000)*cpm : (imps/1000)*1.5;

          metrics.revenue += rev;
          metrics.imps += imps;
          metrics.clicks += clicks;

          if (!dateMap[date]) dateMap[date] = { date, revenue: 0 };
          dateMap[date].revenue += rev;

          platformTotals[platform] += rev;
        });
      });

      metrics.ctr = metrics.imps ? ((metrics.clicks/metrics.imps)*100).toFixed(2) : 0;
      metrics.ecpm = metrics.imps ? ((metrics.revenue/metrics.imps)*1000).toFixed(2) : 0;

      setStats(metrics);
      setChartData(Object.values(dateMap));

      setDonutData([
        { name: "OTT", value: Number(platformTotals["OTT"].toFixed(2)) },
        { name: "Video", value: Number(platformTotals["Video"].toFixed(2)) },
        { name: "Ad Widget", value: Number(platformTotals["Ad Widget"].toFixed(2)) }
      ]);
    });
  }, [publisherId, activeTab]);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif",marginLeft:"-26%" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#051f33",
        color: "#fff",
        padding: "25px 10px",
        fontSize: "15px",
        fontWeight: 500
      }}>
        <div style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px"
        }}>
          📊 Earnings Menu
        </div>
        
        {tabs.map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 15px",
              cursor: "pointer",
              background: activeTab === tab ? "#06c19c" : "transparent",
              borderRadius: "8px",
              marginBottom: "8px"
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px", background: "#f4f6fa" }}>
        <h2 style={{ marginBottom: "25px", fontSize: "26px", fontWeight: 700 }}>
          {activeTab} Earnings Dashboard
        </h2>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <Card label="Revenue" value={`$${stats.revenue?.toFixed(2)}`} />
          <Card label="Impressions" value={stats.imps?.toLocaleString()} />
          <Card label="Clicks" value={stats.clicks} />
          <Card label="CTR" value={`${stats.ctr}%`} />
          <Card label="eCPM" value={`$${stats.ecpm}`} />
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: "20px" }}>

          {/* Bar Chart */}
          <div style={{
            flex: 2,
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            height: "380px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>📊 Revenue Over Time</h3>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="revenue" fill="#06c19c" barSize={45}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            height: "380px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>🍩 Revenue Share</h3>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  label
                >
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div style={{
    background: "#fff",
    padding: "22px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  }}>
    <div style={{ fontSize: "15px", fontWeight: 600, color: "#6d7a88" }}>{label}</div>
    <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "6px" }}>{value}</div>
  </div>
);

export default PublisherEarnings;
