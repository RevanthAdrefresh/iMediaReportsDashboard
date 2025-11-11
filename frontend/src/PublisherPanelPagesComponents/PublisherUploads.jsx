
// // import React, { useEffect, useState } from "react";
// // import { styles } from "./styles";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Uploads = () => {
// //   const [campaigns, setCampaigns] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchUploads = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/getalldata");
// //         const sheets = res.data;

// //         const publisherMap = {};

// //         sheets.forEach((sheet) => {
// //           const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";

// //           if (!publisherMap[pubId]) {
// //             publisherMap[pubId] = {
// //               Campaign: pubId,
// //               Views: 0,
// //               Clicks: 0,
// //               Revenue: 0,
// //               sheetIds: [],
// //             };
// //           }

// //           publisherMap[pubId].sheetIds.push(sheet._id);

// //           sheet.data.forEach((row) => {
// //             const cleaned = {};
// //             Object.keys(row).forEach((k) => (cleaned[k.trim()] = row[k]));

// //             const impressions = Number(cleaned.Impressions || cleaned["Impressions"] || 0);
// //             const clicks = Number(cleaned.Clicks || cleaned["Clicks"] || 0);
// //             const cpm = Number(cleaned.CPM || 0);
// //             const cpc = Number(cleaned.CPC || 0);

// //             publisherMap[pubId].Views += impressions;
// //             publisherMap[pubId].Clicks += clicks;

// //             let revenue = 0;
// //             if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
// //             else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
// //             else revenue = (impressions / 1000) * 1.5;

// //             publisherMap[pubId].Revenue += revenue;
// //           });
// //         });

// //         setCampaigns(Object.values(publisherMap));
// //       } catch (error) {
// //         console.error("Error fetching uploads:", error);
// //       }
// //     };

// //     fetchUploads();
// //   }, []);

// //   const handleView = (sheetIds) => {
// //     navigate("/viewuploads", { state: { sheetIds } });
// //   };

// //   const handleDownload = (sheetIds) => {
// //     alert("Download Sheets:\n" + sheetIds.join("\n"));
// //   };

// //   return (
// //     <div style={styles.card}>
// //       <h3>📁 Uploaded Campaigns</h3>

// //       <div style={styles.tableWrapper}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th style={styles.th}>Campaign (Publisher ID)</th>
// //               <th style={styles.th}>Views</th>
// //               <th style={styles.th}>Clicks</th>
// //               <th style={{ ...styles.th, textAlign: "center" }}>Revenue ($)</th>
// //               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {campaigns.map((row, i) => (
// //               <tr key={i}>
// //                 <td style={styles.td}>{row.Campaign}</td>
// //                 <td style={styles.td}>{row.Views.toLocaleString()}</td>
// //                 <td style={styles.td}>{row.Clicks}</td>
// //                 <td style={{ ...styles.td, textAlign: "center" }}>
// //                   ${row.Revenue.toFixed(2)}
// //                 </td>
// //                 <td style={{ ...styles.td, textAlign: "center" }}>
// //                   <button
// //                     onClick={() => handleView(row.sheetIds)}
// //                     style={{
// //                       padding: "5px 10px",
// //                       marginRight: "6px",
// //                       background: "#007bff",
// //                       color: "#fff",
// //                       border: "none",
// //                       borderRadius: "5px",
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     View
// //                   </button>

// //                   <button
// //                     onClick={() => handleDownload(row.sheetIds)}
// //                     style={{
// //                       padding: "5px 10px",
// //                       background: "#28a745",
// //                       color: "#fff",
// //                       border: "none",
// //                       borderRadius: "5px",
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     Download
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>

// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Uploads;

// import React, { useEffect, useState } from "react";
// import { styles } from "../styles";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Uploads = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/getalldata");
//         const sheets = res.data;

//         const publisherMap = {};

//         sheets.forEach((sheet) => {
//           const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";

//           if (!publisherMap[pubId]) {
//             publisherMap[pubId] = {
//               Campaign: pubId,
//               Views: 0,
//               Clicks: 0,
//               Revenue: 0,
//               sheetIds: [],
//             };
//           }

//           publisherMap[pubId].sheetIds.push(sheet._id);

//           sheet.data.forEach((row) => {
//             const cleaned = {};
//             Object.keys(row).forEach((k) => (cleaned[k.trim()] = row[k]));

//             const impressions = Number(
//               cleaned.Impressions ||
//                 cleaned["Impressions"] ||
//                 cleaned[" Impressions "] ||
//                 0
//             );
//             const clicks = Number(
//               cleaned.Clicks || cleaned["Clicks"] || cleaned[" Clicks "] || 0
//             );
//             const cpm = Number(cleaned.CPM || cleaned[" CPM "] || 0);
//             const cpc = Number(cleaned.CPC || cleaned[" CPC "] || 0);

//             publisherMap[pubId].Views += impressions;
//             publisherMap[pubId].Clicks += clicks;

//             let revenue = 0;
//             if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
//             else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
//             else revenue = (impressions / 1000) * 1.5;

//             publisherMap[pubId].Revenue += revenue;
//           });
//         });

//         setCampaigns(Object.values(publisherMap));
//       } catch (error) {
//         console.error("Error fetching uploads:", error);
//       }
//     };

//     fetchUploads();
//   }, []);

//   const handleView = (sheetIds) => {
//     navigate("/viewuploads", { state: { sheetIds } });
//   };

//   const handleDownload = (sheetIds) => {
//     navigate("/downloadsheets", { state: { sheetIds } });
//   };

//   return (
//     <div style={styles.card}>
//       <h3>📁 Uploaded Campaigns</h3>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Campaign (Advertiser ID)</th>
//               <th style={styles.th}>Views</th>
//               <th style={styles.th}>Clicks</th>
//               <th style={{ ...styles.th, textAlign: "center" }}>Revenue ($)</th>
//               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {campaigns.map((row, i) => (
//               <tr key={i}>
//                 <td style={styles.td}>{row.Campaign}</td>
//                 <td style={styles.td}>{row.Views.toLocaleString()}</td>
//                 <td style={styles.td}>{row.Clicks}</td>
//                 <td style={{ ...styles.td, textAlign: "center" }}>
//                   ${row.Revenue.toFixed(2)}
//                 </td>
//                 <td style={{ ...styles.td, textAlign: "center" }}>
//                   <button
//                     onClick={() => handleView(row.sheetIds)}
//                     style={{
//                       padding: "5px 10px",
//                       marginRight: "6px",
//                       background: "#007bff",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() => handleDownload(row.sheetIds)}
//                     style={{
//                       padding: "5px 10px",
//                       background: "#28a745",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Download
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default Uploads;

import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Uploads = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [totals, setTotals] = useState({ impressions: 0, clicks: 0, revenue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const storedPublisher = JSON.parse(localStorage.getItem("jwt")).user.name
        if (!storedPublisher) {
          console.warn("⚠️ No publisher name found in localStorage");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/getalldata");

        // ✅ Combine sheets and genealogySheets
        const allSheets = [
          ...(res.data?.sheets || []),
          ...(res.data?.genealogySheets || []),
        ];

        // ✅ Filter only this publisher’s data
        const filtered = allSheets.filter(
          (sheet) =>
            sheet.publisher &&
            sheet.publisher.toLowerCase() === storedPublisher.toLowerCase()
        );

        const publisherMap = {};

        filtered.forEach((sheet) => {
          const advertiser = sheet.advertiser || "Unknown Advertiser";
          const key = advertiser;

          if (!publisherMap[key]) {
            publisherMap[key] = {
              Campaign: `${storedPublisher} | ${advertiser}`,
              Views: 0,
              Clicks: 0,
              Revenue: 0,
              sheetIds: [],
            };
          }

          publisherMap[key].sheetIds.push(sheet._id);

          (sheet.data || []).forEach((row) => {
            if (typeof row !== "object" || row === null) return;

            const normalized = Object.fromEntries(
              Object.entries(row).map(([key, value]) => [
                key.trim().toLowerCase(),
                value,
              ])
            );

            const impressions =
              parseFloat(normalized.impressions) ||
              parseFloat(normalized["impression"]) ||
              parseFloat(normalized.views) ||
              0;
            const clicks =
              parseFloat(normalized.clicks) || parseFloat(normalized["click"]) || 0;
            const cpm =
              parseFloat(normalized.cpm) ||
              parseFloat(normalized["cost per mille"]) ||
              0;
            const cpc = parseFloat(normalized.cpc) || 0;

            let revenue = 0;
            if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
            else if (cpm > 0 && impressions > 0)
              revenue = (impressions / 1000) * cpm;
            else revenue = (impressions / 1000) * 1.5;

            publisherMap[key].Views += impressions;
            publisherMap[key].Clicks += clicks;
            publisherMap[key].Revenue += revenue;
          });
        });

        const finalData = Object.values(publisherMap);

        // ✅ Totals
        const totalImpressions = finalData.reduce((sum, d) => sum + d.Views, 0);
        const totalClicks = finalData.reduce((sum, d) => sum + d.Clicks, 0);
        const totalRevenue = finalData.reduce((sum, d) => sum + d.Revenue, 0);

        setTotals({
          impressions: totalImpressions,
          clicks: totalClicks,
          revenue: totalRevenue.toFixed(2),
        });
        setCampaigns(finalData);
      } catch (error) {
        console.error("❌ Error fetching uploads:", error);
      }
    };

    fetchUploads();
  }, []);

  const handleView = (sheetIds) => {
    navigate("/viewuploads", { state: { sheetIds } });
  };

  const handleDownload = (sheetIds) => {
    navigate("/downloadsheets", { state: { sheetIds } });
  };

  return (
    <div style={{ ...styles.card, padding: "30px" }}>
      <h3 style={{ marginBottom: "20px" }}>
        📁 {localStorage.getItem("publisherName") || "Publisher"} Campaigns
      </h3>

      {/* ✅ Summary Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <div style={summaryCard}>
          <h4>Total Impressions</h4>
          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            {totals.impressions.toLocaleString()}
          </p>
        </div>
        <div style={summaryCard}>
          <h4>Total Clicks</h4>
          <p style={{ color: "#ff4d4f", fontWeight: "bold" }}>
            {totals.clicks.toLocaleString()}
          </p>
        </div>
        <div style={summaryCard}>
          <h4>Total Revenue</h4>
          <p style={{ color: "#007bff", fontWeight: "bold" }}>
            ${totals.revenue}
          </p>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Campaign (Publisher | Advertiser)</th>
              <th style={styles.th}>Impressions</th>
              <th style={styles.th}>Clicks</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Revenue ($)</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.Campaign}</td>
                  <td style={styles.td}>{row.Views.toLocaleString()}</td>
                  <td style={styles.td}>{row.Clicks.toLocaleString()}</td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    ${row.Revenue.toFixed(2)}
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <button
                      onClick={() => handleView(row.sheetIds)}
                      style={{
                        ...btn,
                        background: "#007bff",
                      }}
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDownload(row.sheetIds)}
                      style={{
                        ...btn,
                        background: "#ff4d4f",
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                  No campaigns found for this publisher.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Reusable Summary Card Style
const summaryCard = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "15px 25px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
  minWidth: "200px",
};

const btn = {
  padding: "6px 12px",
  marginRight: "6px",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
};

export default Uploads;
