
// // // import React, { useState } from "react";

// // // const Settings = () => {
// // //   const [theme, setTheme] = useState("light");
// // //   const [apiKey, setApiKey] = useState("sk-************");
// // //   const [enableLogs, setEnableLogs] = useState(true);
// // //   const [autoBackup, setAutoBackup] = useState(false);
// // //   const [twoFactorAuth, setTwoFactorAuth] = useState(false);
// // //   const [logData, setLogData] = useState([
// // //     { date: "2025-11-01", action: "User Login", status: "Success" },
// // //     { date: "2025-11-02", action: "File Upload", status: "Failed" },
// // //     { date: "2025-11-03", action: "Admin Access", status: "Success" },
// // //   ]);

// // //   const handleSave = () => {
// // //     alert("Settings updated successfully!");
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.card}>
// // //         <h2 style={styles.heading}>⚙️ Admin Settings</h2>

// // //         {/* Theme Section */}
// // //         <div style={styles.section}>
// // //           <h3 style={styles.subheading}>Theme Settings</h3>
// // //           <select
// // //             value={theme}
// // //             onChange={(e) => setTheme(e.target.value)}
// // //             style={styles.select}
// // //           >
// // //             <option value="light">Light Mode</option>
// // //             <option value="dark">Dark Mode</option>
// // //             <option value="system">System Default</option>
// // //           </select>
// // //         </div>

// // //         {/* App Configuration */}
// // //         <div style={styles.section}>
// // //           <h3 style={styles.subheading}>App Configuration</h3>
// // //           <div style={styles.fieldRow}>
// // //             <label style={styles.label}>API Key</label>
// // //             <input
// // //               type="text"
// // //               value={apiKey}
// // //               onChange={(e) => setApiKey(e.target.value)}
// // //               style={styles.input}
// // //             />
// // //           </div>

// // //           <div style={styles.toggleRow}>
// // //             <label>Enable System Logs</label>
// // //             <input
// // //               type="checkbox"
// // //               checked={enableLogs}
// // //               onChange={() => setEnableLogs(!enableLogs)}
// // //               style={styles.checkbox}
// // //             />
// // //           </div>

// // //           <div style={styles.toggleRow}>
// // //             <label>Enable Auto Backup</label>
// // //             <input
// // //               type="checkbox"
// // //               checked={autoBackup}
// // //               onChange={() => setAutoBackup(!autoBackup)}
// // //               style={styles.checkbox}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Security Section */}
// // //         <div style={styles.section}>
// // //           <h3 style={styles.subheading}>Security</h3>
// // //           <div style={styles.toggleRow}>
// // //             <label>Two-Factor Authentication</label>
// // //             <input
// // //               type="checkbox"
// // //               checked={twoFactorAuth}
// // //               onChange={() => setTwoFactorAuth(!twoFactorAuth)}
// // //               style={styles.checkbox}
// // //             />
// // //           </div>
// // //           <button style={styles.secondaryButton}>Reset Password</button>
// // //         </div>

// // //         {/* System Logs */}
// // //         {enableLogs && (
// // //           <div style={styles.section}>
// // //             <h3 style={styles.subheading}>System Logs</h3>
// // //             <div style={styles.logContainer}>
// // //               <table style={styles.table}>
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Date</th>
// // //                     <th>Action</th>
// // //                     <th>Status</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {logData.map((log, index) => (
// // //                     <tr key={index}>
// // //                       <td>{log.date}</td>
// // //                       <td>{log.action}</td>
// // //                       <td
// // //                         style={{
// // //                           color:
// // //                             log.status === "Success" ? "green" : "red",
// // //                           fontWeight: "bold",
// // //                         }}
// // //                       >
// // //                         {log.status}
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Save Button */}
// // //         <div style={styles.buttonContainer}>
// // //           <button onClick={handleSave} style={styles.button}>
// // //             Save Changes
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Internal Styles
// // // const styles = {
// // //   container: {
// // //     background: "#f5f6fa",
// // //     minHeight: "100vh",
// // //     padding: "30px",
// // //     fontFamily: "Arial, sans-serif",
// // //   },
// // //   card: {
// // //     maxWidth: "900px",
// // //     margin: "0 auto",
// // //     background: "#fff",
// // //     borderRadius: "16px",
// // //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// // //     padding: "30px",
// // //   },
// // //   heading: {
// // //     fontSize: "26px",
// // //     fontWeight: "700",
// // //     marginBottom: "20px",
// // //     color: "#333",
// // //   },
// // //   section: {
// // //     marginBottom: "30px",
// // //     borderBottom: "1px solid #eee",
// // //     paddingBottom: "20px",
// // //   },
// // //   subheading: {
// // //     fontSize: "18px",
// // //     fontWeight: "600",
// // //     marginBottom: "15px",
// // //     color: "#555",
// // //   },
// // //   fieldRow: {
// // //     display: "flex",
// // //     flexDirection: "column",
// // //     gap: "8px",
// // //     marginBottom: "15px",
// // //   },
// // //   label: {
// // //     fontSize: "14px",
// // //     color: "#444",
// // //   },
// // //   input: {
// // //     padding: "10px",
// // //     borderRadius: "8px",
// // //     border: "1px solid #ccc",
// // //     outline: "none",
// // //   },
// // //   select: {
// // //     padding: "10px",
// // //     borderRadius: "8px",
// // //     border: "1px solid #ccc",
// // //     outline: "none",
// // //     width: "100%",
// // //     maxWidth: "250px",
// // //   },
// // //   checkbox: {
// // //     width: "18px",
// // //     height: "18px",
// // //   },
// // //   toggleRow: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "space-between",
// // //     margin: "12px 0",
// // //   },
// // //   logContainer: {
// // //     overflowX: "auto",
// // //     borderRadius: "10px",
// // //     border: "1px solid #ddd",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //   },
// // //   buttonContainer: {
// // //     textAlign: "right",
// // //     marginTop: "10px",
// // //   },
// // //   button: {
// // //     background: "#007bff",
// // //     color: "#fff",
// // //     padding: "10px 20px",
// // //     borderRadius: "8px",
// // //     border: "none",
// // //     cursor: "pointer",
// // //     fontWeight: "bold",
// // //   },
// // //   secondaryButton: {
// // //     background: "#ffcc00",
// // //     color: "#333",
// // //     padding: "8px 14px",
// // //     border: "none",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     marginTop: "10px",
// // //   },
// // // };

// // // export default Settings;


// // import React, { useState } from "react";

// // const Settings = () => {
// //   const [theme, setTheme] = useState("light");
// //   const [twoFactorAuth, setTwoFactorAuth] = useState(true);
// //   const [showLogs, setShowLogs] = useState(true);

// //   const [userLogs] = useState([
// //     { name: "Ravi Kumar", role: "Advertiser", status: "Active", lastLogin: "2025-11-02" },
// //     { name: "Sneha Patil", role: "Publisher", status: "Inactive", lastLogin: "2025-10-28" },
// //     { name: "Admin User", role: "Admin", status: "Active", lastLogin: "2025-11-03" },
// //   ]);

// //   const [performance] = useState([
// //     { metric: "Total Advertisers", value: 42 },
// //     { metric: "Active Publishers", value: 19 },
// //     { metric: "Ongoing Campaigns", value: 27 },
// //     { metric: "Revenue (Monthly)", value: "$12,480" },
// //   ]);

// //   const handleSave = () => {
// //     alert("Settings saved successfully!");
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.card}>
// //         <h2 style={styles.heading}>⚙️ Admin & Advertiser Settings</h2>

// //         {/* Theme */}
// //         <div style={styles.section}>
// //           <h3 style={styles.subheading}>Theme Settings</h3>
// //           <select
// //             value={theme}
// //             onChange={(e) => setTheme(e.target.value)}
// //             style={styles.select}
// //           >
// //             <option value="light">Light Mode</option>
// //             <option value="dark">Dark Mode</option>
// //             <option value="system">System Default</option>
// //           </select>
// //         </div>

// //         {/* Security */}
// //         <div style={styles.section}>
// //           <h3 style={styles.subheading}>Security</h3>
// //           <div style={styles.toggleRow}>
// //             <label>Enable Two-Factor Authentication</label>
// //             <input
// //               type="checkbox"
// //               checked={twoFactorAuth}
// //               onChange={() => setTwoFactorAuth(!twoFactorAuth)}
// //               style={styles.checkbox}
// //             />
// //           </div>
// //           <button style={styles.secondaryButton}>Reset Password</button>
// //         </div>

// //         {/* Performance Summary */}
// //         <div style={styles.section}>
// //           <h3 style={styles.subheading}>📊 System Performance</h3>
// //           <div style={styles.tableContainer}>
// //             <table style={styles.table}>
// //               <thead>
// //                 <tr>
// //                   <th style={styles.th}>Metric</th>
// //                   <th style={styles.th}>Value</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {performance.map((item, i) => (
// //                   <tr key={i} style={styles.row}>
// //                     <td style={styles.cell}>{item.metric}</td>
// //                     <td style={styles.cell}>{item.value}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //         {/* User Logs */}
// //         {showLogs && (
// //           <div style={styles.section}>
// //             <h3 style={styles.subheading}>🧑‍💻 Active User Logs</h3>
// //             <div style={styles.tableContainer}>
// //               <table style={styles.table}>
// //                 <thead>
// //                   <tr>
// //                     <th style={styles.th}>Name</th>
// //                     <th style={styles.th}>Role</th>
// //                     <th style={styles.th}>Status</th>
// //                     <th style={styles.th}>Last Login</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {userLogs.map((log, i) => (
// //                     <tr key={i} style={styles.row}>
// //                       <td style={styles.cell}>{log.name}</td>
// //                       <td style={styles.cell}>{log.role}</td>
// //                       <td
// //                         style={{
// //                           ...styles.cell,
// //                           color: log.status === "Active" ? "green" : "red",
// //                           fontWeight: "bold",
// //                         }}
// //                       >
// //                         {log.status}
// //                       </td>
// //                       <td style={styles.cell}>{log.lastLogin}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* Save Button */}
// //         <div style={styles.buttonContainer}>
// //           <button onClick={handleSave} style={styles.button}>
// //             Save Changes
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Internal CSS Styles
// // const styles = {
// //   container: {
// //     background: "#f5f6fa",
// //     minHeight: "100vh",
// //     padding: "30px",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   card: {
// //     maxWidth: "950px",
// //     margin: "0 auto",
// //     background: "#fff",
// //     borderRadius: "16px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //     padding: "30px",
// //   },
// //   heading: {
// //     fontSize: "26px",
// //     fontWeight: "700",
// //     marginBottom: "20px",
// //     color: "#333",
// //   },
// //   section: {
// //     marginBottom: "30px",
// //     borderBottom: "1px solid #eee",
// //     paddingBottom: "20px",
// //   },
// //   subheading: {
// //     fontSize: "18px",
// //     fontWeight: "600",
// //     marginBottom: "15px",
// //     color: "#555",
// //   },
// //   select: {
// //     padding: "10px",
// //     borderRadius: "8px",
// //     border: "1px solid #ccc",
// //     outline: "none",
// //     width: "100%",
// //     maxWidth: "250px",
// //   },
// //   checkbox: {
// //     width: "18px",
// //     height: "18px",
// //   },
// //   toggleRow: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     margin: "12px 0",
// //   },
// //   tableContainer: {
// //     border: "1px solid #ccc",
// //     borderRadius: "10px",
// //     overflow: "hidden",
// //     width: "100%",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     textAlign: "left",
// //   },
// //   th: {
// //     background: "#f0f0f0",
// //     border: "1px solid #ccc",
// //     padding: "10px",
// //     fontWeight: "600",
// //   },
// //   cell: {
// //     border: "1px solid #ccc",
// //     padding: "10px",
// //   },
// //   row: {
// //     backgroundColor: "#fff",
// //   },
// //   buttonContainer: {
// //     textAlign: "right",
// //     marginTop: "10px",
// //   },
// //   button: {
// //     background: "#007bff",
// //     color: "#fff",
// //     padding: "10px 20px",
// //     borderRadius: "8px",
// //     border: "none",
// //     cursor: "pointer",
// //     fontWeight: "bold",
// //   },
// //   secondaryButton: {
// //     background: "#ffcc00",
// //     color: "#333",
// //     padding: "8px 14px",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     marginTop: "10px",
// //   },
// // };

// // export default Settings;

// import React, { useContext } from "react";
// import { ThemeContext } from "./ThemeSettings/ThemeContext";

// const Settings = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>⚙️ Admin Settings</h2>

//       <div style={styles.section}>
//         <label style={styles.label}>Theme:</label>
//         <button style={styles.toggleBtn} onClick={toggleTheme}>
//           Switch to {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
//         </button>
//       </div>

//       <p style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
//         Current theme: <b>{theme}</b>
//       </p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     maxWidth: "400px",
//     margin: "auto",
//   },
//   heading: {
//     marginBottom: "20px",
//     fontWeight: "600",
//   },
//   section: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "10px",
//   },
//   label: {
//     fontSize: "16px",
//   },
//   toggleBtn: {
//     background: "#00C49F",
//     color: "#fff",
//     padding: "8px 14px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//   },
// };

// export default Settings;


import React, { useContext } from "react";
import { ThemeContext } from "../ThemeSettings/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  // 🎨 Theme-specific colors
  const themeColors = {
    containerBg: isDark ? "#1e293b" : "#ffffff",
    textColor: isDark ? "#e2e8f0" : "#111827",
    borderColor: isDark ? "#334155" : "#e5e7eb",
    headingColor: isDark ? "#f8fafc" : "#111827",
    labelColor: isDark ? "#cbd5e1" : "#374151",
    buttonBg: isDark ? "#0ea5e9" : "#00C49F",
    buttonHover: isDark ? "#38bdf8" : "#06d6a0",
  };

  return (
    <div
      style={{
        ...styles.container,
        background: themeColors.containerBg,
        color: themeColors.textColor,
        border: `1px solid ${themeColors.borderColor}`,
        transition: "background 0.3s, color 0.3s, border 0.3s",
      }}
    >
      <h2 style={{ ...styles.heading, color: themeColors.headingColor }}>
        ⚙️ Admin Settings
      </h2>

      <div style={styles.section}>
        <label style={{ ...styles.label, color: themeColors.labelColor }}>
          Theme:
        </label>
        <button
          style={{
            ...styles.toggleBtn,
            background: themeColors.buttonBg,
          }}
          onMouseOver={(e) => (e.target.style.background = themeColors.buttonHover)}
          onMouseOut={(e) => (e.target.style.background = themeColors.buttonBg)}
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
        </button>
      </div>

      <p
        style={{
          marginTop: "10px",
          fontSize: "14px",
          opacity: 0.8,
          color: themeColors.textColor,
        }}
      >
        Current theme: <b>{theme}</b>
      </p>
    </div>
  );
};

// ✅ Styles (shared layout, dynamic colors applied via inline)
const styles = {
  container: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "auto",
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "600",
    fontSize: "20px",
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
  },
  toggleBtn: {
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s ease-in-out",
  },
};

export default Settings;
