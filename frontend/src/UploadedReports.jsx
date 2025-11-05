// // // // import React, { useState } from "react";

// // // // const UploadedReports = () => {
// // // //   const [reports, setReports] = useState([
// // // //     {
// // // //       id: 1,
// // // //       fileName: "OTT_Report_Oct.xlsx",
// // // //       uploadedBy: "Publisher 1",
// // // //       date: "2025-01-20",
// // // //       status: "Processed",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       fileName: "Video_Report_Oct.xlsx",
// // // //       uploadedBy: "Publisher 2",
// // // //       date: "2025-01-22",
// // // //       status: "Pending",
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       fileName: "AdWidget_Nov.xlsx",
// // // //       uploadedBy: "Publisher 3",
// // // //       date: "2025-01-25",
// // // //       status: "Processed",
// // // //     }
// // // //   ]);

// // // //   const handleDelete = (id) => {
// // // //     if (window.confirm("Are you sure to delete this report?")) {
// // // //       setReports(reports.filter((r) => r.id !== id));
// // // //     }
// // // //   };

// // // //   const statusStyle = (status) => ({
// // // //     background: status === "Processed" ? "#00C49F" : "#FF9800",
// // // //     color: "#fff",
// // // //     padding: "5px 10px",
// // // //     borderRadius: "6px",
// // // //     fontSize: "12px",
// // // //     fontWeight: "600",
// // // //   });

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.title}>📂 Uploaded Reports</h2>

// // // //       <div style={styles.wrapper}>
// // // //         <table style={styles.table}>
// // // //           <thead>
// // // //             <tr>
// // // //               <th>File Name</th>
// // // //               <th>Uploaded By</th>
// // // //               <th>Date</th>
// // // //               <th>Status</th>
// // // //               <th style={{ textAlign:"center" }}>Actions</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {reports.map((r) => (
// // // //               <tr key={r.id}>
// // // //                 <td>{r.fileName}</td>
// // // //                 <td>{r.uploadedBy}</td>
// // // //                 <td>{r.date}</td>
// // // //                 <td>
// // // //                   <span style={statusStyle(r.status)}>{r.status}</span>
// // // //                 </td>
// // // //                 <td style={styles.actions}>
// // // //                   <button style={styles.viewBtn}>View</button>
// // // //                   <button style={styles.downloadBtn}>Download</button>
// // // //                   <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>

// // // //         {/* ✅ Mobile Card View */}
// // // //         <div style={styles.mobileList}>
// // // //           {reports.map((r) => (
// // // //             <div key={r.id} style={styles.card}>
// // // //               <h4>{r.fileName}</h4>
// // // //               <p><b>Uploaded By:</b> {r.uploadedBy}</p>
// // // //               <p><b>Date:</b> {r.date}</p>
// // // //               <span style={statusStyle(r.status)}>{r.status}</span>
// // // //               <div style={styles.cardActions}>
// // // //                 <button style={styles.viewBtn}>View</button>
// // // //                 <button style={styles.downloadBtn}>Download</button>
// // // //                 <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ✅ Internal CSS
// // // // const styles = {
// // // //   container: {
// // // //     padding: "20px",
// // // //     fontFamily: "Poppins, sans-serif",
// // // //   },
// // // //   title: {
// // // //     marginBottom: "15px",
// // // //     fontSize: "22px",
// // // //     fontWeight: "600",
// // // //   },
// // // //   wrapper: {
// // // //     background: "#fff",
// // // //     borderRadius: "12px",
// // // //     padding: "20px",
// // // //     boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
// // // //   },
// // // //   table: {
// // // //     width: "100%",
// // // //     borderCollapse: "collapse",
// // // //     display: "table",
// // // //   },
// // // //   actions: {
// // // //     display: "flex",
// // // //     gap: "8px",
// // // //     justifyContent: "center",
// // // //   },
// // // //   viewBtn: {
// // // //     background: "#007bff",
// // // //     color: "#fff",
// // // //     padding: "6px 10px",
// // // //     border: "none",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //     fontSize: "13px",
// // // //   },
// // // //   downloadBtn: {
// // // //     background: "#6a5acd",
// // // //     color: "#fff",
// // // //     padding: "6px 10px",
// // // //     border: "none",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //     fontSize: "13px",
// // // //   },
// // // //   deleteBtn: {
// // // //     background: "#ff4d4d",
// // // //     color: "#fff",
// // // //     padding: "6px 10px",
// // // //     border: "none",
// // // //     borderRadius: "6px",
// // // //     cursor: "pointer",
// // // //     fontSize: "13px",
// // // //   },
// // // //   mobileList: {
// // // //     display: "none",
// // // //   },
// // // //   card: {
// // // //     border: "1px solid #ddd",
// // // //     padding: "15px",
// // // //     borderRadius: "10px",
// // // //     marginBottom: "12px",
// // // //   },
// // // //   cardActions: {
// // // //     display: "flex",
// // // //     gap: "8px",
// // // //     marginTop: "10px",
// // // //   },

// // // //   // Mobile responsive styles
// // // //   "@media(maxWidth: 768px)": {},
// // // // };

// // // // // ✅ Make responsive with CSS
// // // // const styleSheet = document.styleSheets[0];
// // // // styleSheet.insertRule(`
// // // //   @media (max-width: 768px) {
// // // //     table { display: none; }
// // // //     .mobileList { display: block; }
// // // //   }
// // // // `, styleSheet.cssRules.length);

// // // // export default UploadedReports;


// // // import React, { useState } from "react";

// // // const UploadedReports = () => {
// // //   const [reports, setReports] = useState([
// // //     { id: 1, fileName: "OTT_Report_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-01-20", status: "Processed" },
// // //     { id: 2, fileName: "Video_Report_Oct.xlsx", uploadedBy: "Publisher 2", date: "2025-01-22", status: "Pending" },
// // //     { id: 3, fileName: "AdWidget_Nov.xlsx", uploadedBy: "Publisher 3", date: "2025-01-25", status: "Processed" },
// // //   ]);

// // //   const handleDelete = (id) => {
// // //     if (window.confirm("Delete this report?")) {
// // //       setReports(reports.filter((r) => r.id !== id));
// // //     }
// // //   };

// // //   const statusBadge = (status) => ({
// // //     background: status === "Processed" ? "#00C49F" : "#FF9800",
// // //     color: "#fff",
// // //     padding: "5px 10px",
// // //     borderRadius: "6px",
// // //     fontSize: "12px",
// // //     fontWeight: 600,
// // //   });

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.title}>📂 Uploaded Reports</h2>

// // //       <div style={styles.tableWrapper}>
// // //         <table style={styles.table}>
// // //           <thead>
// // //             <tr>
// // //               <th>#</th>
// // //               <th>File Name</th>
// // //               <th>Uploaded By</th>
// // //               <th>Date</th>
// // //               <th>Status</th>
// // //               <th style={{ textAlign: "center" }}>Actions</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {reports.map((r, idx) => (
// // //               <tr key={r.id}>
// // //                 <td>{idx + 1}</td>
// // //                 <td>{r.fileName}</td>
// // //                 <td>{r.uploadedBy}</td>
// // //                 <td>{r.date}</td>
// // //                 <td><span style={statusBadge(r.status)}>{r.status}</span></td>
// // //                 <td style={styles.actions}>
// // //                   <button style={styles.viewBtn}>View</button>
// // //                   <button style={styles.downloadBtn}>Download</button>
// // //                   <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ✅ CSS Styles
// // // const styles = {
// // //   container: {
// // //     padding: "20px",
// // //     fontFamily: "Poppins, sans-serif",
// // //   },
// // //   title: {
// // //     fontSize: "22px",
// // //     fontWeight: 600,
// // //     marginBottom: "15px",
// // //   },
// // //   tableWrapper: {
// // //     overflowX: "auto",
// // //     background: "#fff",
// // //     padding: "20px",
// // //     borderRadius: "10px",
// // //     boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
// // //   },
// // //   table: {
// // //     width: "100%",
// // //     borderCollapse: "collapse",
// // //   },
// // //   actions: {
// // //     display: "flex",
// // //     gap: "8px",
// // //     justifyContent: "center",
// // //   },

// // //   viewBtn: {
// // //     background: "#007bff",
// // //     color: "#fff",
// // //     padding: "6px 10px",
// // //     border: "none",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     fontSize: "13px",
// // //   },
// // //   downloadBtn: {
// // //     background: "#6a5acd",
// // //     color: "#fff",
// // //     padding: "6px 10px",
// // //     border: "none",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     fontSize: "13px",
// // //   },
// // //   deleteBtn: {
// // //     background: "#ff4d4d",
// // //     color: "#fff",
// // //     padding: "6px 10px",
// // //     border: "none",
// // //     borderRadius: "6px",
// // //     cursor: "pointer",
// // //     fontSize: "13px",
// // //   },
// // // };

// // // export default UploadedReports;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const UploadedReports = () => {
// // const [reports, setReports] = useState([
// //   { id: 1, fileName: "OTT_Report_Oct.xlsx", uploadedBy: "Publisher A", date: "2025-10-20", status: "Processed" },
// //   { id: 2, fileName: "Video_Insights_Sep.xlsx", uploadedBy: "Publisher B", date: "2025-09-18", status: "Processed" },
// //   { id: 3, fileName: "Banner_Performance_Aug.xlsx", uploadedBy: "Publisher C", date: "2025-08-25", status: "Pending" },
// //   { id: 4, fileName: "CTV_Data_Nov.xlsx", uploadedBy: "Publisher D", date: "2025-11-01", status: "Processed" },
// //   { id: 5, fileName: "AdWidget_Reports_Oct.xlsx", uploadedBy: "Publisher E", date: "2025-10-29", status: "Processed" },
// //   { id: 6, fileName: "Instream_Video_Sep.xlsx", uploadedBy: "Publisher F", date: "2025-09-22", status: "Pending" },
// //   { id: 7, fileName: "Display_Report_Nov.xlsx", uploadedBy: "Publisher G", date: "2025-11-03", status: "Processed" },
// //   { id: 8, fileName: "Native_Campaign_Oct.xlsx", uploadedBy: "Publisher H", date: "2025-10-15", status: "Processed" },
// //   { id: 9, fileName: "OTT_QA_Report_Jul.xlsx", uploadedBy: "Publisher I", date: "2025-07-30", status: "Processed" },
// //   { id: 10, fileName: "AdNetwork_Data_Aug.xlsx", uploadedBy: "Publisher J", date: "2025-08-11", status: "Pending" },
// // ]);


// //   // Fetch reports from API
// //   useEffect(() => {
// //     const fetchReports = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get("http://localhost:5000/api/sheets", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setReports(res.data);
// //       } catch (err) {
// //         console.error("Error fetching reports:", err);
// //       }
// //     };

// //     fetchReports();
// //   }, []);

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this report?")) return;

// //     try {
// //       const token = localStorage.getItem("token");
// //       await axios.delete(`http://localhost:5000/api/sheets/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setReports(reports.filter((r) => r._id !== id));
// //     } catch (err) {
// //       console.error("Error deleting report:", err);
// //     }
// //   };

// //   const statusBadge = (status) => ({
// //     background: status === "Processed" ? "#00C49F" : "#FF9800",
// //     color: "#fff",
// //     padding: "5px 10px",
// //     borderRadius: "6px",
// //     fontSize: "12px",
// //     fontWeight: 600,
// //   });

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.title}>📊 Reports Dashboard</h2>

// //       <div style={styles.tableWrapper}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Report Name</th>
// //               <th>Uploaded By</th>
// //               <th>Date</th>
// //               <th>Status</th>
// //               <th style={{ textAlign: "center" }}>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {reports.length > 0 ? (
// //               reports.map((r, idx) => (
// //                 <tr key={r._id || idx}>
// //                   <td>{idx + 1}</td>
// //                   <td>{r.fileName || "N/A"}</td>
// //                   <td>{r.uploadedBy?.name || "Unknown"}</td>
// //                   <td>{new Date(r.createdAt).toLocaleDateString()}</td>
// //                   <td><span style={statusBadge(r.status || "Pending")}>{r.status || "Pending"}</span></td>
// //                   <td style={styles.actions}>
// //                     <button style={styles.viewBtn}>View</button>
// //                     <button style={styles.downloadBtn}>Download</button>
// //                     <button style={styles.deleteBtn} onClick={() => handleDelete(r._id)}>Delete</button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" style={styles.emptyText}>No Reports Found</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // // ✅ CSS Styles
// // const styles = {
// //   container: {
// //     padding: "20px",
// //     fontFamily: "Poppins, sans-serif",
// //   },
// //   title: {
// //     fontSize: "22px",
// //     fontWeight: 600,
// //     marginBottom: "15px",
// //   },
// //   tableWrapper: {
// //     overflowX: "auto",
// //     background: "#fff",
// //     padding: "20px",
// //     borderRadius: "10px",
// //     boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
// //   },
// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     border:"5"
// //   },
// //   actions: {
// //     display: "flex",
// //     gap: "8px",
// //     justifyContent: "center",
// //   },
// //   viewBtn: {
// //     background: "#007bff",
// //     color: "#fff",
// //     padding: "6px 10px",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     fontSize: "13px",
// //   },
// //   downloadBtn: {
// //     background: "#6a5acd",
// //     color: "#fff",
// //     padding: "6px 10px",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     fontSize: "13px",
// //   },
// //   deleteBtn: {
// //     background: "#ff4d4d",
// //     color: "#fff",
// //     padding: "6px 10px",
// //     border: "none",
// //     borderRadius: "6px",
// //     cursor: "pointer",
// //     fontSize: "13px",
// //   },
// //   emptyText: {
// //     textAlign: "center",
// //     padding: "20px 0",
// //     color: "#888",
// //   },
// // };

// // export default UploadedReports;

// import React, { useState } from "react";

// const UploadedReports = () => {
//   const [reports, setReports] = useState([
//     { id: 1, fileName: "OTT_Report_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-01-20", status: "Processed" },
//     { id: 2, fileName: "Video_Insights_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-01-22", status: "Processed" },
//     { id: 3, fileName: "Banner_Performance_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-01-25", status: "Pending" },
//     { id: 4, fileName: "CTV_Data_Nov.xlsx", uploadedBy: "Publisher 4", date: "2025-02-02", status: "Processed" },
//     { id: 5, fileName: "AdWidget_Reports_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-02-05", status: "Processed" },
//     { id: 6, fileName: "Instream_Video_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-02-08", status: "Pending" },
//     { id: 7, fileName: "Display_Report_Nov.xlsx", uploadedBy: "Publisher 3", date: "2025-02-10", status: "Processed" },
//     { id: 8, fileName: "Native_Campaign_Oct.xlsx", uploadedBy: "Publisher 4", date: "2025-02-11", status: "Processed" },
//     { id: 9, fileName: "OTT_QA_Report_Jul.xlsx", uploadedBy: "Publisher 2", date: "2025-02-13", status: "Processed" },
//     { id: 10, fileName: "AdNetwork_Data_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-02-15", status: "Pending" },
//   ]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this report?")) {
//       setReports(reports.filter((r) => r.id !== id));
//     }
//   };

//   const statusBadge = (status) => ({
//     background: status === "Processed" ? "#00C49F" : "#FF9800",
//     color: "#fff",
//     padding: "5px 10px",
//     borderRadius: "6px",
//     fontSize: "12px",
//     fontWeight: 600,
//   });

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>📊 Reports Dashboard</h2>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>#</th>
//               <th style={styles.th}>Report Name</th>
//               <th style={styles.th}>Uploaded By</th>
//               <th style={styles.th}>Date</th>
//               <th style={styles.th}>Status</th>
//               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {reports.map((r, idx) => (
//               <tr key={r.id}>
//                 <td style={styles.td}>{idx + 1}</td>
//                 <td style={styles.td}>{r.fileName}</td>
//                 <td style={styles.td}>{r.uploadedBy}</td>
//                 <td style={styles.td}>{r.date}</td>
//                 <td style={styles.td}>
//                   <span style={statusBadge(r.status)}>{r.status}</span>
//                 </td>
//                 <td style={{ ...styles.td, ...styles.actions }}>
//                   <button style={styles.viewBtn}>View</button>
//                   <button style={styles.downloadBtn}>Download</button>
//                   <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ✅ Styles
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Poppins, sans-serif",
//     backgroundColor: "#f9fafb",
//   },
//   title: {
//     fontSize: "22px",
//     fontWeight: 600,
//     marginBottom: "15px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },
//   tableWrapper: {
//     overflowX: "auto",
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     textAlign: "left",
//   },
//   th: {
//     borderBottom: "2px solid #ddd",
//     padding: "12px 10px",
//     backgroundColor: "#f3f4f6",
//     fontWeight: 600,
//     fontSize: "14px",
//     color: "#333",
//   },
//   td: {
//     borderBottom: "1px solid #eee",
//     padding: "10px",
//     fontSize: "14px",
//     color: "#555",
//   },
//   actions: {
//     display: "flex",
//     gap: "8px",
//     justifyContent: "center",
//   },
//   viewBtn: {
//     background: "#007bff",
//     color: "#fff",
//     padding: "6px 10px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
//   downloadBtn: {
//     background: "#6a5acd",
//     color: "#fff",
//     padding: "6px 10px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
//   deleteBtn: {
//     background: "#ff4d4d",
//     color: "#fff",
//     padding: "6px 10px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
// };

// export default UploadedReports;

import React, { useState } from "react";

const UploadedReports = () => {
  const [reports, setReports] = useState([
    { id: 1, fileName: "OTT_Report_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-01-20", status: "Processed" },
    { id: 2, fileName: "Video_Insights_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-01-22", status: "Processed" },
    { id: 3, fileName: "Banner_Performance_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-01-25", status: "Pending" },
    { id: 4, fileName: "CTV_Data_Nov.xlsx", uploadedBy: "Publisher 4", date: "2025-02-02", status: "Processed" },
    { id: 5, fileName: "AdWidget_Reports_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-02-05", status: "Processed" },
    { id: 6, fileName: "Instream_Video_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-02-08", status: "Pending" },
    { id: 7, fileName: "Display_Report_Nov.xlsx", uploadedBy: "Publisher 3", date: "2025-02-10", status: "Processed" },
    { id: 8, fileName: "Native_Campaign_Oct.xlsx", uploadedBy: "Publisher 4", date: "2025-02-11", status: "Processed" },
    { id: 9, fileName: "OTT_QA_Report_Jul.xlsx", uploadedBy: "Publisher 2", date: "2025-02-13", status: "Processed" },
    { id: 10, fileName: "AdNetwork_Data_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-02-15", status: "Pending" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  const statusBadge = (status) => ({
    background: status === "Processed" ? "#00C49F" : "#FF9800",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Reports Dashboard</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Report Name</th>
              <th style={styles.th}>Uploaded By</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r, idx) => (
              <tr key={r.id} style={styles.tr}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{r.fileName}</td>
                <td style={styles.td}>{r.uploadedBy}</td>
                <td style={styles.td}>{r.date}</td>
                <td style={styles.td}>
                  <span style={statusBadge(r.status)}>{r.status}</span>
                </td>
                <td style={{ ...styles.td, ...styles.actions }}>
                  <button style={styles.viewBtn}>View</button>
                  <button style={styles.downloadBtn}>Download</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ CSS Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  th: {
    border: "1px solid #ccc",
    padding: "12px 10px",
    backgroundColor: "#e9f1f7",
    fontWeight: 600,
    fontSize: "14px",
    color: "#333",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "14px",
    color: "#555",
    backgroundColor: "#fff",
  },
  tr: {
    transition: "background 0.2s ease-in-out",
  },
  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  viewBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  downloadBtn: {
    background: "#6a5acd",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  deleteBtn: {
    background: "#ff4d4d",
    color: "#fff",
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default UploadedReports;
