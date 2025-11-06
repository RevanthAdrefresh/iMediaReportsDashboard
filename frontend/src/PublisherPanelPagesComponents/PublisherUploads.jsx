
// import React, { useEffect, useState } from "react";
// import { styles } from "./styles";
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

//             const impressions = Number(cleaned.Impressions || cleaned["Impressions"] || 0);
//             const clicks = Number(cleaned.Clicks || cleaned["Clicks"] || 0);
//             const cpm = Number(cleaned.CPM || 0);
//             const cpc = Number(cleaned.CPC || 0);

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
//     alert("Download Sheets:\n" + sheetIds.join("\n"));
//   };

//   return (
//     <div style={styles.card}>
//       <h3>📁 Uploaded Campaigns</h3>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Campaign (Publisher ID)</th>
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getalldata");
        const sheets = res.data;

        const publisherMap = {};

        sheets.forEach((sheet) => {
          const pubId = sheet.uploadedBy?._id || sheet.uploadedBy || "Unknown";

          if (!publisherMap[pubId]) {
            publisherMap[pubId] = {
              Campaign: pubId,
              Views: 0,
              Clicks: 0,
              Revenue: 0,
              sheetIds: [],
            };
          }

          publisherMap[pubId].sheetIds.push(sheet._id);

          sheet.data.forEach((row) => {
            const cleaned = {};
            Object.keys(row).forEach((k) => (cleaned[k.trim()] = row[k]));

            const impressions = Number(
              cleaned.Impressions ||
                cleaned["Impressions"] ||
                cleaned[" Impressions "] ||
                0
            );
            const clicks = Number(
              cleaned.Clicks || cleaned["Clicks"] || cleaned[" Clicks "] || 0
            );
            const cpm = Number(cleaned.CPM || cleaned[" CPM "] || 0);
            const cpc = Number(cleaned.CPC || cleaned[" CPC "] || 0);

            publisherMap[pubId].Views += impressions;
            publisherMap[pubId].Clicks += clicks;

            let revenue = 0;
            if (cpc > 0 && clicks > 0) revenue = clicks * cpc;
            else if (cpm > 0 && impressions > 0) revenue = (impressions / 1000) * cpm;
            else revenue = (impressions / 1000) * 1.5;

            publisherMap[pubId].Revenue += revenue;
          });
        });

        setCampaigns(Object.values(publisherMap));
      } catch (error) {
        console.error("Error fetching uploads:", error);
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
    <div style={styles.card}>
      <h3>📁 Uploaded Campaigns</h3>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Campaign (Publisher ID)</th>
              <th style={styles.th}>Views</th>
              <th style={styles.th}>Clicks</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Revenue ($)</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((row, i) => (
              <tr key={i}>
                <td style={styles.td}>{row.Campaign}</td>
                <td style={styles.td}>{row.Views.toLocaleString()}</td>
                <td style={styles.td}>{row.Clicks}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  ${row.Revenue.toFixed(2)}
                </td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <button
                    onClick={() => handleView(row.sheetIds)}
                    style={{
                      padding: "5px 10px",
                      marginRight: "6px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDownload(row.sheetIds)}
                    style={{
                      padding: "5px 10px",
                      background: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Uploads;
