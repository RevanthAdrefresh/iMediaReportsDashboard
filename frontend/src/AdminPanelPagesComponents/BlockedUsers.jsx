// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BlockedUsers = () => {
//   const [blockedUsers, setBlockedUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBlockedUsers();
//   }, []);

//   // ✅ Fetch Blocked Users
//   const fetchBlockedUsers = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("jwt"))?.token;

//       const res = await axios.get("http://localhost:5000/api/blocked-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setBlockedUsers(res.data.blockedUsers || []);
//     } catch (err) {
//       console.error("Error fetching blocked users:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Styles — FULL BORDER CELLS
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",      // ✅ removes double lines
//     border: "1px solid #000000",     // ✅ full outer border
//     background: "#ffffff",
//   };

//   const thStyle = {
//     border: "1px solid #000000",     // ✅ 4-sided border
//     padding: "12px",
//     background: "#082f3d",
//     color: "#ffffff",
//     textAlign: "center",
//     fontWeight: "600",
//   };

//   const tdStyle = {
//     border: "1px solid #000000",     // ✅ 4-sided border
//     padding: "10px",
//     textAlign: "center",
//     verticalAlign: "middle",
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "15px", fontWeight: "600" }}>🚫 Blocked Users</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : blockedUsers.length === 0 ? (
//         <p style={{ color: "green", fontWeight: "500" }}>
//           ✅ No Blocked Users Found
//         </p>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Username</th>
//               <th style={thStyle}>Failed Attempts</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Last Attempt</th>
//             </tr>
//           </thead>

//           <tbody>
//             {blockedUsers.map((user) => (
//               <tr key={user._id}>
//                 <td style={tdStyle}>{user.username}</td>
//                 <td style={tdStyle}>{user.attempts}</td>

//                 <td style={tdStyle}>
//                   <span
//                     style={{
//                       width: "12px",
//                       height: "12px",
//                       borderRadius: "50%",
//                       display: "inline-block",
//                       backgroundColor: user.blocked ? "red" : "green",
//                       marginRight: "6px",
//                     }}
//                   ></span>
//                   {user.blocked ? "Blocked" : "Active"}
//                 </td>

//                 <td style={tdStyle}>
//                   {user.lastAttempt
//                     ? new Date(user.lastAttempt).toLocaleString()
//                     : "N/A"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <button
//         onClick={fetchBlockedUsers}
//         style={{
//           marginTop: "20px",
//           padding: "10px 16px",
//           background: "#082f3d",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//       >
//         Refresh 🔄
//       </button>
//     </div>
//   );
// };

// export default BlockedUsers;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeSettings/ThemeContext"; // ✅ add theme

const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext); // ✅ Get current theme

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  // ✅ Fetch Blocked Users
  const fetchBlockedUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"))?.token;

      const res = await axios.get("http://localhost:5000/api/blocked-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlockedUsers(res.data.blockedUsers || []);
    } catch (err) {
      console.error("Error fetching blocked users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Theme colors
  const isDark = theme === "dark";

  const themeStyles = {
    pageBg: isDark ? "#1e293b" : "#ffffff",
    textColor: isDark ? "#e2e8f0" : "#000000",
    tableBorder: isDark ? "#334155" : "#000000",
    headerBg: isDark ? "#0f172a" : "#082f3d",
    headerText: "#ffffff",
    rowBg: isDark ? "#1e293b" : "#ffffff",
  };

  // ✅ Table Styles — FULL 4-SIDE BORDER
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    border: `1px solid ${themeStyles.tableBorder}`,
    background: themeStyles.rowBg,
  };

  const thStyle = {
    border: `1px solid ${themeStyles.tableBorder}`,
    padding: "12px",
    background: themeStyles.headerBg,
    color: themeStyles.headerText,
    textAlign: "center",
    fontWeight: "600",
  };

  const tdStyle = {
    border: `1px solid ${themeStyles.tableBorder}`,
    padding: "10px",
    textAlign: "center",
    color: themeStyles.textColor,
    verticalAlign: "middle",
  };

  return (
    <div
      style={{
        padding: "20px",
        background: themeStyles.pageBg,
        color: themeStyles.textColor,
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginBottom: "15px", fontWeight: "600", color: themeStyles.textColor }}>
        🚫 Blocked Users
      </h2>

      {loading ? (
        <p style={{ color: themeStyles.textColor }}>Loading...</p>
      ) : blockedUsers.length === 0 ? (
        <p style={{ color: "green", fontWeight: "500" }}>
          ✅ No Blocked Users Found
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Failed Attempts</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Last Attempt</th>
            </tr>
          </thead>

          <tbody>
            {blockedUsers.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.attempts}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      display: "inline-block",
                      backgroundColor: user.blocked ? "red" : "green",
                      marginRight: "6px",
                    }}
                  ></span>
                  {user.blocked ? "Blocked" : "Active"}
                </td>

                <td style={tdStyle}>
                  {user.lastAttempt
                    ? new Date(user.lastAttempt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={fetchBlockedUsers}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          background: themeStyles.headerBg,
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Refresh 🔄
      </button>
    </div>
  );
};

export default BlockedUsers;
