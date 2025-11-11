// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LoginActivity = () => {
//   const [logs, setLogs] = useState([]);

//   // ✅ Extract only useful parts from user-agent
//   const parseBrowser = (ua) => {
//     if (!ua) return "Unknown";

//     let browser = "Unknown";
//     let os = "Unknown";

//     // Detect browser
//     if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
//     else if (ua.includes("Firefox")) browser = "Firefox";
//     else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
//     else if (ua.includes("Edg")) browser = "Edge";
//     else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";

//     // Detect OS
//     if (ua.includes("Windows NT 10")) os = "Windows 10";
//     else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
//     else if (ua.includes("Mac OS")) os = "MacOS";
//     else if (ua.includes("Android")) os = "Android";
//     else if (ua.includes("iPhone")) os = "iPhone";
//     else if (ua.includes("iPad")) os = "iPad";
//     else if (ua.includes("Linux")) os = "Linux";

//     return `${os} — ${browser}`;
//   };

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("jwt"))?.token;

//         const res = await axios.get("http://localhost:5000/api/login-history", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // ✅ Ensure logs is always an array
//         const data = Array.isArray(res.data) ? res.data : res.data.logs || [];
//         setLogs(data);
//       } catch (error) {
//         console.log(error);
//         setLogs([]); // fallback
//       }
//     };
//     fetchLogs();
//   }, []);

//   // ✅ Table cell style (full border)
//   const cellStyle = {
//     border: "1px solid #ccc",
//     padding: "12px",
//     textAlign: "center",
//     fontSize: "15px",
//   };

//   const headerStyle = {
//     border: "1px solid #999",
//     padding: "12px",
//     background: "#e8f1f3",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: "16px",
//   };

//   return (
//     <div style={{ padding: "25px" }}>
//       <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>
//         Login Activity
//       </h2>

//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           background: "#fff",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//           borderRadius: "8px",
//           overflow: "hidden",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={headerStyle}>Username</th>
//             <th style={headerStyle}>Action</th>
//             <th style={headerStyle}>Login Time</th>
//             <th style={headerStyle}>IP Address</th>
//             <th style={headerStyle}>Device</th>
//           </tr>
//         </thead>

//         <tbody>
//           {logs.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={{ ...cellStyle, fontWeight: "500" }}>
//                 No Login Activity Found
//               </td>
//             </tr>
//           ) : (
//             logs.map((log) => (
//               <tr key={log._id}>
//                 <td style={cellStyle}>{log.username || "N/A"}</td>
//                 <td style={cellStyle}>{log.action || "login"}</td>
//                 <td style={cellStyle}>
//                   {log.timestamp
//                     ? new Date(log.timestamp).toLocaleString()
//                     : "N/A"}
//                 </td>
//                 <td style={cellStyle}>{log.ipAddress || "N/A"}</td>
//                 <td style={cellStyle}>{parseBrowser(log.browser)}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LoginActivity;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeSettings/ThemeContext";

const LoginActivity = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [logs, setLogs] = useState([]);

  const themeColors = {
    tableBg: isDark ? "#1e293b" : "#ffffff",
    headerBg: isDark ? "#334155" : "#e8f1f3",
    text: isDark ? "#e2e8f0" : "#111827",
    border: isDark ? "#475569" : "#ccc",
  };

  // ✅ Extract only useful parts from user-agent
  const parseBrowser = (ua) => {
    if (!ua) return "Unknown";

    let browser = "Unknown";
    let os = "Unknown";

    // Detect browser
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";

    // Detect OS
    if (ua.includes("Windows NT 10")) os = "Windows 10";
    else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
    else if (ua.includes("Mac OS")) os = "MacOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone")) os = "iPhone";
    else if (ua.includes("iPad")) os = "iPad";
    else if (ua.includes("Linux")) os = "Linux";

    return `${os} — ${browser}`;
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwt"))?.token;

        const res = await axios.get("http://localhost:5000/api/login-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data.logs || [];
        setLogs(data);
      } catch (error) {
        console.log(error);
        setLogs([]);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "25px", color: themeColors.text }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "600" }}>
        Login Activity
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: themeColors.tableBg,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={{ ...header(themeColors) }}>Username</th>
            <th style={{ ...header(themeColors) }}>Action</th>
            <th style={{ ...header(themeColors) }}>Login Time</th>
            <th style={{ ...header(themeColors) }}>IP Address</th>
            <th style={{ ...header(themeColors) }}>Device</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ ...cell(themeColors), fontWeight: "500" }}>
                No Login Activity Found
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td style={cell(themeColors)}>{log.username || "N/A"}</td>
                <td style={cell(themeColors)}>{log.action || "login"}</td>
                <td style={cell(themeColors)}>
                  {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
                </td>
                <td style={cell(themeColors)}>{log.ipAddress || "N/A"}</td>
                <td style={cell(themeColors)}>{parseBrowser(log.browser)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const header = (themeColors) => ({
  border: `1px solid ${themeColors.border}`,
  padding: "12px",
  background: themeColors.headerBg,
  color: themeColors.text,
  textAlign: "center",
  fontWeight: "600",
  fontSize: "16px",
});

const cell = (themeColors) => ({
  border: `1px solid ${themeColors.border}`,
  padding: "12px",
  textAlign: "center",
  fontSize: "15px",
  color: themeColors.text,
});

export default LoginActivity;
