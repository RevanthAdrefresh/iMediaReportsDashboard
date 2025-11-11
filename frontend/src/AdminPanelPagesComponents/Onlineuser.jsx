// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OnlineUsers = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchOnlineUsers();

//     // ✅ Auto-refresh every 10 seconds
//     const interval = setInterval(() => {
//       fetchOnlineUsers();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const fetchOnlineUsers = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("jwt"))?.token;

//       const res = await axios.get("http://localhost:5000/api/online-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers(res.data.users);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const formatTime = (time) => {
//     if (!time) return "Never Active";
//     return new Date(time).toLocaleString();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "15px" }}>User Online Status</h2>

//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           border: "1px solid #ccc",
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Role</th>
//             <th style={styles.th}>Status</th>
//             <th style={styles.th}>Last Active</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td style={styles.td}>{user.name}</td>
//               <td style={styles.td}>{user.email}</td>
//               <td style={styles.td}>{user.role}</td>

//               {/* ✅ Status pill */}
//               <td style={{ ...styles.td }}>
//                 <span
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     display: "inline-block",
//                     borderRadius: "50%",
//                     marginRight: "8px",
//                     backgroundColor: user.isOnline ? "#22c55e" : "red",
//                   }}
//                 ></span>
//                 {user.isOnline ? "Online" : "Offline"}
//               </td>

//               <td style={styles.td}>{formatTime(user.lastActive)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const styles = {
//   th: {
//     padding: "10px",
//     border: "1px solid #ccc",
//     background: "#f4f4f4",
//     fontWeight: "bold",
//     textAlign: "left",
//   },
//   td: {
//     padding: "10px",
//     border: "1px solid #ccc",
//     textAlign: "left",
//   },
// };

// export default OnlineUsers;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeSettings/ThemeContext";

const OnlineUsers = () => {
  const [users, setUsers] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const themeColors = {
    tableBg: isDark ? "#1e293b" : "#ffffff",
    headerBg: isDark ? "#334155" : "#f4f4f4",
    text: isDark ? "#e2e8f0" : "#111827",
    border: isDark ? "#475569" : "#ccc",
  };

  useEffect(() => {
    fetchOnlineUsers();
    const interval = setInterval(() => fetchOnlineUsers(), 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"))?.token;

      const res = await axios.get("http://localhost:5000/api/online-users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const formatTime = (time) =>
    !time ? "Never Active" : new Date(time).toLocaleString();

  return (
    <div style={{ padding: "20px", color: themeColors.text }}>
      <h2 style={{ marginBottom: "15px" }}>User Online Status</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: themeColors.tableBg,
          border: `1px solid ${themeColors.border}`,
        }}
      >
        <thead>
          <tr style={{ background: themeColors.headerBg }}>
            <th style={th(themeColors)}>Name</th>
            <th style={th(themeColors)}>Email</th>
            <th style={th(themeColors)}>Role</th>
            <th style={th(themeColors)}>Status</th>
            <th style={th(themeColors)}>Last Active</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={td(themeColors)}>{user.name}</td>
              <td style={td(themeColors)}>{user.email}</td>
              <td style={td(themeColors)}>{user.role}</td>

              <td style={td(themeColors)}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    display: "inline-block",
                    borderRadius: "50%",
                    marginRight: "8px",
                    backgroundColor: user.isOnline ? "#22c55e" : "red",
                  }}
                ></span>
                {user.isOnline ? "Online" : "Offline"}
              </td>

              <td style={td(themeColors)}>{formatTime(user.lastActive)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const th = (themeColors) => ({
  padding: "10px",
  border: `1px solid ${themeColors.border}`,
  background: themeColors.headerBg,
  color: themeColors.text,
  fontWeight: "bold",
  textAlign: "left",
});

const td = (themeColors) => ({
  padding: "10px",
  border: `1px solid ${themeColors.border}`,
  textAlign: "left",
  color: themeColors.text,
});

export default OnlineUsers;
