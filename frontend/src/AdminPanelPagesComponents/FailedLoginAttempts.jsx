// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FailedLoginAttempts = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Shorten browser string
//   const cleanBrowser = (str) => {
//     if (!str) return "N/A";

//     // Chrome/Firefox/Edge extraction
//     if (str.includes("Chrome")) return "Chrome";
//     if (str.includes("Firefox")) return "Firefox";
//     if (str.includes("Safari") && !str.includes("Chrome")) return "Safari";
//     if (str.includes("Edg")) return "Edge";

//     return str.slice(0, 20) + "..."; // fallback
//   };

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("jwt"))?.token;

//         const res = await axios.get("http://localhost:5000/api/login-history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // ✅ Filter only failed logs
//         const failed = (res.data.logs || []).filter(
//           (log) => log.action === "login_failed"
//         );

//         setLogs(failed);
//       } catch (err) {
//         console.error("Failed to fetch logs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "20px" }}>❌ Failed Login Attempts</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : logs.length === 0 ? (
//         <p style={{ color: "#777" }}>No failed attempts found ✅</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid #aaa",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#082f3d", color: "white" }}>
//               <th style={th}>Username</th>
//               <th style={th}>Time</th>
//               <th style={th}>IP Address</th>
//               <th style={th}>Device</th>
//               <th style={th}>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log) => (
//               <tr key={log._id} style={{ background: "#fff" }}>
//                 <td style={td}>{log.username}</td>
//                 <td style={td}>
//                   {new Date(log.timestamp).toLocaleString()}
//                 </td>
//                 <td style={td}>{log.ipAddress || "N/A"}</td>
//                 <td style={td}>{cleanBrowser(log.browser)}</td>
//                 <td style={{ ...td, color: "red", fontWeight: 600 }}>
//                   Failed
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // ✅ Table cell styles (4-sided borders)
// const th = {
//   padding: "12px",
//   border: "1px solid #ccc",
//   textAlign: "left",
//   fontWeight: "600",
// };

// const td = {
//   padding: "12px",
//   border: "1px solid #ccc",
//   textAlign: "left",
//   verticalAlign: "middle",
// };

// export default FailedLoginAttempts;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeSettings/ThemeContext";

const FailedLoginAttempts = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const themeColors = {
    tableBg: isDark ? "#1e293b" : "#ffffff",
    headerBg: isDark ? "#334155" : "#dbe4e8ff",
    text: isDark ? "#e2e8f0" : "#111827",
    border: isDark ? "#475569" : "#ccc",
  };

  const cleanBrowser = (str) => {
    if (!str) return "N/A";
    if (str.includes("Chrome")) return "Chrome";
    if (str.includes("Firefox")) return "Firefox";
    if (str.includes("Safari") && !str.includes("Chrome")) return "Safari";
    if (str.includes("Edg")) return "Edge";
    return str.slice(0, 20) + "...";
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwt"))?.token;

        const res = await axios.get("http://localhost:5000/api/login-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const failed = (res.data.logs || []).filter(
          (log) => log.action === "login_failed"
        );

        setLogs(failed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "20px", color: themeColors.text }}>
      <h2 style={{ marginBottom: "20px" }}>❌ Failed Login Attempts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p style={{ color: themeColors.text }}>No failed attempts found ✅</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: themeColors.tableBg,
            border: `1px solid ${themeColors.border}`,
          }}
        >
          <thead>
            <tr style={{ background: themeColors.headerBg, color: "white" }}>
              <th style={th(themeColors)}>Username</th>
              <th style={th(themeColors)}>Time</th>
              <th style={th(themeColors)}>IP Address</th>
              <th style={th(themeColors)}>Device</th>
              <th style={th(themeColors)}>Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td style={td(themeColors)}>{log.username}</td>
                <td style={td(themeColors)}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td style={td(themeColors)}>{log.ipAddress || "N/A"}</td>
                <td style={td(themeColors)}>{cleanBrowser(log.browser)}</td>
                <td style={{ ...td(themeColors), color: "red", fontWeight: "600" }}>
                  Failed
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const th = (themeColors) => ({
  padding: "12px",
  border: `1px solid ${themeColors.border}`,
  textAlign: "left",
  fontWeight: 600,
  color: themeColors.text,
});

const td = (themeColors) => ({
  padding: "12px",
  border: `1px solid ${themeColors.border}`,
  textAlign: "left",
  color: themeColors.text,
});

export default FailedLoginAttempts;
