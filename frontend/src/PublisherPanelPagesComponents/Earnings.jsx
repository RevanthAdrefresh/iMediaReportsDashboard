// // // // import React from "react";
// // // // import { styles } from "./styles";

// // // // const earningsData = [
// // // //   { Date: "Nov 1", Platform: "YouTube", "Revenue ($)": 180 },
// // // //   { Date: "Nov 2", Platform: "OTT", "Revenue ($)": 210 },
// // // //   { Date: "Nov 3", Platform: "Website", "Revenue ($)": 190 },
// // // //   { Date: "Nov 4", Platform: "YouTube", "Revenue ($)": 260 },
// // // // ];

// // // // const Earnings = () => (
// // // //   <div style={styles.card}>
// // // //     <h3>💰 Earnings Summary</h3>
// // // //     <div style={styles.tableWrapper}>
// // // //       <table style={styles.table}>
// // // //         <thead>
// // // //           <tr>
// // // //             {Object.keys(earningsData[0]).map((col) => (
// // // //               <th key={col} style={styles.th}>{col}</th>
// // // //             ))}
// // // //           </tr>
// // // //         </thead>
// // // //         <tbody>
// // // //           {earningsData.map((row, i) => (
// // // //             <tr key={i}>
// // // //               {Object.values(row).map((val, j) => (
// // // //                 <td key={j} style={styles.td}>{val}</td>
// // // //               ))}
// // // //             </tr>
// // // //           ))}
// // // //         </tbody>
// // // //       </table>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // export default Earnings;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { styles } from "./styles";

// // // const Earnings = () => {
// // //   const [earnings, setEarnings] = useState([]);

// // //   useEffect(() => {
// // //     const fetchEarnings = async () => {
// // //       try {
// // //         // const usertoken =JSON.parse( localStorage.getItem("jwt")).token

// // //         const res = await axios.get("http://localhost:5000/api/getalldata");

// // //         const sheets = res.data;
// // //         console.log(sheets);
        

// // //         // Map to accumulate revenue by Date + Platform
// // //         const earningsMap = {};

// // //         sheets.forEach(sheet => {
// // //           const sheetName = sheet.name?.toLowerCase() || "";
// // //           const uploadDate = new Date(sheet.createdAt).toDateString();

// // //           sheet.data.forEach(row => {
// // //             // Normalize column keys
// // //             const clean = {};
// // //             Object.keys(row).forEach(k => (clean[k.trim()] = row[k]));

// // //             const impressions = Number(clean.Impressions || 0);
// // //             const clicks = Number(clean.Clicks || 0);
// // //             const cpm = Number(clean.CPM || 0);
// // //             const cpc = Number(clean.CPC || 0);
// // //             const platform = clean.Platform || clean["Platform"] || "Unknown";

// // //             // Revenue logic
// // //             let revenue = 0;
// // //             if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
// // //             else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
// // //             else revenue = (impressions / 1000) * 1.5;

// // //             const key = `${uploadDate}_${platform}`;

// // //             if (!earningsMap[key]) {
// // //               earningsMap[key] = {
// // //                 Date: uploadDate,
// // //                 Platform: platform,
// // //                 Revenue: 0,
// // //               };
// // //             }

// // //             earningsMap[key].Revenue += revenue;
// // //           });
// // //         });

// // //         const formatted = Object.values(earningsMap).map(e => ({
// // //           Date: e.Date,
// // //           Platform: e.Platform,
// // //           Revenue: Number(e.Revenue.toFixed(2)),
// // //         }));

// // //         setEarnings(formatted);
// // //       } catch (err) {
// // //         console.error("Error loading earnings:", err);
// // //       }
// // //     };

// // //     fetchEarnings();
// // //   }, []);

// // //   return (
// // //     <div style={styles.card}>
// // //       <h3>💰 Earnings Summary</h3>
// // //       <div style={styles.tableWrapper}>
// // //         <table style={styles.table}>
// // //           <thead>
// // //             <tr>
// // //               <th style={styles.th}>Date</th>
// // //               <th style={styles.th}>Platform</th>
// // //               <th style={styles.th}>Revenue ($)</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {earnings.length > 0 ? (
// // //               earnings.map((row, i) => (
// // //                 <tr key={i}>
// // //                   <td style={styles.td}>{row.Date}</td>
// // //                   <td style={styles.td}>{row.Platform}</td>
// // //                   <td style={styles.td}>${row.Revenue}</td>
// // //                 </tr>
// // //               ))
// // //             ) : (
// // //               <tr>
// // //                 <td style={styles.td} colSpan="3">Loading / No Earnings Found</td>
// // //               </tr>
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Earnings;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { styles } from "./styles";

// // const Earnings = () => {
// //   const [earnings, setEarnings] = useState([]);

// //   useEffect(() => {
// //     const fetchEarnings = async () => {
// //       try {
// //         // const token = localStorage.getItem("token");

// //         const res = await axios.get("http://localhost:5000/api/getalldata");

// //         const sheets = res.data;

// //         const platformMap = {
// //           0: "OTT",
// //           1: "Video",
// //           2: "Ad Widget"
// //         };

// //         const earningsMap = {};

// //         sheets.forEach((sheet, index) => {
// //           if (index > 2) return; // ✅ Ignore Sheet4 and anything above 2

// //           const platform = platformMap[index] || "Unknown";
// //           const uploadDate = new Date(sheet.createdAt).toDateString();

// //           sheet.data.forEach(row => {
// //             const clean = {};
// //             Object.keys(row).forEach(k => clean[k.trim()] = row[k]);

// //             const impressions = Number(clean.Impressions || 0);
// //             const clicks = Number(clean.Clicks || 0);
// //             const cpm = Number(clean.CPM || 0);
// //             const cpc = Number(clean.CPC || 0);

// //             // ✅ Revenue logic
// //             let revenue = 0;
// //             if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
// //             else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
// //             else revenue = (impressions / 1000) * 1.5;

// //             const key = `${uploadDate}_${platform}`;

// //             if (!earningsMap[key]) {
// //               earningsMap[key] = {
// //                 Date: uploadDate,
// //                 Platform: platform,
// //                 Revenue: 0
// //               };
// //             }

// //             earningsMap[key].Revenue += revenue;
// //           });
// //         });

// //         const formatted = Object.values(earningsMap).map(e => ({
// //           Date: e.Date,
// //           Platform: e.Platform,
// //           Revenue: e.Revenue.toFixed(2)
// //         }));

// //         setEarnings(formatted);
// //       } catch (err) {
// //         console.error("Error loading earnings:", err);
// //       }
// //     };

// //     fetchEarnings();
// //   }, []);

// //   return (
// //     <div style={styles.card}>
// //       <h3>💰 Earnings Summary</h3>

// //       <div style={styles.tableWrapper}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th style={styles.th}>Date</th>
// //               <th style={styles.th}>Platform</th>
// //               <th style={styles.th}>Revenue ($)</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {earnings.length > 0 ? (
// //               earnings.map((row, i) => (
// //                 <tr key={i}>
// //                   <td style={styles.td}>{row.Date}</td>
// //                   <td style={styles.td}>{row.Platform}</td>
// //                   <td style={styles.td}>${row.Revenue}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td style={styles.td} colSpan="3">Loading or No Data</td>
// //               </tr>
// //             )}
// //           </tbody>

// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Earnings;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { styles } from "./styles";

// const Earnings = () => {
//   const [earnings, setEarnings] = useState([]);

//   useEffect(() => {
//     const fetchEarnings = async () => {
//       try {
//         // const token = localStorage.getItem("token");

//         const res = await axios.get("http://localhost:5000/api/getalldata");

//         const sheets = res.data;
//         console.log(sheets,"sheets");
        

//         // ✅ Group sheets by publisher
//         const publisherSheets = {};
//         sheets.forEach(sheet => {
//           const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";
//           if (!publisherSheets[pubId]) publisherSheets[pubId] = [];
//           publisherSheets[pubId].push(sheet);
//         });

//         const platformMap = {
//           0: "OTT",
//           1: "Video",
//           2: "Ad Widget"
//         };

//         const earningsMap = {};

//         Object.values(publisherSheets).forEach(sheetArray => {
//           sheetArray.slice(0, 3).forEach((sheet, idx) => {
//             const platform = platformMap[idx] || "Unknown";
//             const uploadDate = new Date(sheet.createdAt).toDateString();

//             sheet.data.forEach(row => {
//               const clean = {};
//               Object.keys(row).forEach(k => clean[k.trim()] = row[k]);

//               const impressions = Number(clean.Impressions || 0);
//               const clicks = Number(clean.Clicks || 0);
//               const cpm = Number(clean.CPM || 0);
//               const cpc = Number(clean.CPC || 0);

//               // ✅ Revenue logic
//               let revenue = 0;
//               if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
//               else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
//               else revenue = (impressions / 1000) * 1.5;

//               const key = `${uploadDate}_${platform}`;

//               if (!earningsMap[key]) {
//                 earningsMap[key] = {
//                   Date: uploadDate,
//                   Platform: platform,
//                   Revenue: 0
//                 };
//               }

//               earningsMap[key].Revenue += revenue;
//             });
//           });
//         });

//         const formatted = Object.values(earningsMap).map(e => ({
//           Date: e.Date,
//           Platform: e.Platform,
//           Revenue: e.Revenue.toFixed(2),
//         }));

//         setEarnings(formatted);
//       } catch (err) {
//         console.error("Error loading earnings:", err);
//       }
//     };

//     fetchEarnings();
//   }, []);

//   return (
//     <div style={styles.card}>
//       <h3>💰 Earnings Summary</h3>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Date</th>
//               <th style={styles.th}>Platform</th>
//               <th style={styles.th}>Revenue ($)</th>
//             </tr>
//           </thead>

//           <tbody>
//             {earnings.length > 0 ? (
//               earnings.map((row, i) => (
//                 <tr key={i}>
//                   <td style={styles.td}>{row.Date}</td>
//                   <td style={styles.td}>{row.Platform}</td>
//                   <td style={styles.td}>${row.Revenue}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td style={styles.td} colSpan="3">Loading or No Data</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Earnings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
  const [publishers, setPublishers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/getalldata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sheets = res.data;
        const group = {};

        sheets.forEach(sheet => {
          const pid = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";
          if (!group[pid]) group[pid] = { publisher: pid, revenue: 0 };

          sheet.data.forEach(row => {
            const clean = {};
            Object.keys(row).forEach(k => clean[k.trim()] = row[k]);

            const imps = Number(clean.Impressions || 0);
            const clicks = Number(clean.Clicks || 0);
            const cpm = Number(clean.CPM || 0);
            const cpc = Number(clean.CPC || 0);

            let rev = 0;
            if (cpc > 0 && clicks > 0) rev = clicks * cpc;
            else if (cpm > 0 && imps > 0) rev = (imps / 1000) * cpm;
            else rev = (imps / 1000) * 1.5;

            group[pid].revenue += rev;
          });
        });

        setPublishers(Object.values(group));
      } catch (err) {
        console.error(err);
      }
    };

    fetchEarnings();
  }, []);

  const handleView = (publisherId) => {
    navigate("/publisherlevelearnings", { state: { publisherId } });
  };

  return (
    <div style={styles.card}>
      <h3>📊 Publisher Earnings</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Publisher ID</th>
            <th style={styles.th}>Total Revenue ($)</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((p,i)=>(
            <tr key={i}>
              <td style={styles.td}>{p.publisher}</td>
              <td style={styles.td}>${p.revenue.toFixed(2)}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleView(p.publisher)}
                  style={{ padding:"6px 10px",background:"#007bff",color:"#fff",border:"none",borderRadius:"5px" }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Earnings;
