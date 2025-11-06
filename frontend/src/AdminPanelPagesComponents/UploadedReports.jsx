

// // // // // import React, { useState } from "react";

// // // // // const UploadedReports = () => {
// // // // //   const [reports, setReports] = useState([
// // // // //     { id: 1, fileName: "OTT_Report_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-01-20", status: "Processed" },
// // // // //     { id: 2, fileName: "Video_Insights_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-01-22", status: "Processed" },
// // // // //     { id: 3, fileName: "Banner_Performance_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-01-25", status: "Pending" },
// // // // //     { id: 4, fileName: "CTV_Data_Nov.xlsx", uploadedBy: "Publisher 4", date: "2025-02-02", status: "Processed" },
// // // // //     { id: 5, fileName: "AdWidget_Reports_Oct.xlsx", uploadedBy: "Publisher 1", date: "2025-02-05", status: "Processed" },
// // // // //     { id: 6, fileName: "Instream_Video_Sep.xlsx", uploadedBy: "Publisher 2", date: "2025-02-08", status: "Pending" },
// // // // //     { id: 7, fileName: "Display_Report_Nov.xlsx", uploadedBy: "Publisher 3", date: "2025-02-10", status: "Processed" },
// // // // //     { id: 8, fileName: "Native_Campaign_Oct.xlsx", uploadedBy: "Publisher 4", date: "2025-02-11", status: "Processed" },
// // // // //     { id: 9, fileName: "OTT_QA_Report_Jul.xlsx", uploadedBy: "Publisher 2", date: "2025-02-13", status: "Processed" },
// // // // //     { id: 10, fileName: "AdNetwork_Data_Aug.xlsx", uploadedBy: "Publisher 3", date: "2025-02-15", status: "Pending" },
// // // // //   ]);

// // // // //   const handleDelete = (id) => {
// // // // //     if (window.confirm("Are you sure you want to delete this report?")) {
// // // // //       setReports(reports.filter((r) => r.id !== id));
// // // // //     }
// // // // //   };

// // // // //   const statusBadge = (status) => ({
// // // // //     background: status === "Processed" ? "#00C49F" : "#FF9800",
// // // // //     color: "#fff",
// // // // //     padding: "5px 10px",
// // // // //     borderRadius: "6px",
// // // // //     fontSize: "12px",
// // // // //     fontWeight: 600,
// // // // //   });

// // // // //   return (
// // // // //     <div style={styles.container}>
// // // // //       <h2 style={styles.title}>📊 Reports Dashboard</h2>

// // // // //       <div style={styles.tableWrapper}>
// // // // //         <table style={styles.table}>
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th style={styles.th}>#</th>
// // // // //               <th style={styles.th}>Report Name</th>
// // // // //               <th style={styles.th}>Uploaded By</th>
// // // // //               <th style={styles.th}>Date</th>
// // // // //               <th style={styles.th}>Status</th>
// // // // //               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
// // // // //             </tr>
// // // // //           </thead>

// // // // //           <tbody>
// // // // //             {reports.map((r, idx) => (
// // // // //               <tr key={r.id} style={styles.tr}>
// // // // //                 <td style={styles.td}>{idx + 1}</td>
// // // // //                 <td style={styles.td}>{r.fileName}</td>
// // // // //                 <td style={styles.td}>{r.uploadedBy}</td>
// // // // //                 <td style={styles.td}>{r.date}</td>
// // // // //                 <td style={styles.td}>
// // // // //                   <span style={statusBadge(r.status)}>{r.status}</span>
// // // // //                 </td>
// // // // //                 <td style={{ ...styles.td, ...styles.actions }}>
// // // // //                   <button style={styles.viewBtn}>View</button>
// // // // //                   <button style={styles.downloadBtn}>Download</button>
// // // // //                   <button style={styles.deleteBtn} onClick={() => handleDelete(r.id)}>Delete</button>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // ✅ CSS Styles
// // // // // const styles = {
// // // // //   container: {
// // // // //     padding: "20px",
// // // // //     fontFamily: "Poppins, sans-serif",
// // // // //     backgroundColor: "#f9fafb",
// // // // //   },
// // // // //   title: {
// // // // //     fontSize: "22px",
// // // // //     fontWeight: 600,
// // // // //     marginBottom: "15px",
// // // // //     display: "flex",
// // // // //     alignItems: "center",
// // // // //     gap: "10px",
// // // // //   },
// // // // //   tableWrapper: {
// // // // //     overflowX: "auto",
// // // // //     background: "#fff",
// // // // //     padding: "20px",
// // // // //     borderRadius: "10px",
// // // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
// // // // //   },
// // // // //   table: {
// // // // //     width: "100%",
// // // // //     borderCollapse: "collapse",
// // // // //     border: "1px solid #ccc",
// // // // //   },
// // // // //   th: {
// // // // //     border: "1px solid #ccc",
// // // // //     padding: "12px 10px",
// // // // //     backgroundColor: "#e9f1f7",
// // // // //     fontWeight: 600,
// // // // //     fontSize: "14px",
// // // // //     color: "#333",
// // // // //     textAlign: "left",
// // // // //   },
// // // // //   td: {
// // // // //     border: "1px solid #ccc",
// // // // //     padding: "10px",
// // // // //     fontSize: "14px",
// // // // //     color: "#555",
// // // // //     backgroundColor: "#fff",
// // // // //   },
// // // // //   tr: {
// // // // //     transition: "background 0.2s ease-in-out",
// // // // //   },
// // // // //   actions: {
// // // // //     display: "flex",
// // // // //     gap: "8px",
// // // // //     justifyContent: "center",
// // // // //   },
// // // // //   viewBtn: {
// // // // //     background: "#007bff",
// // // // //     color: "#fff",
// // // // //     padding: "6px 10px",
// // // // //     border: "none",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     fontSize: "13px",
// // // // //   },
// // // // //   downloadBtn: {
// // // // //     background: "#6a5acd",
// // // // //     color: "#fff",
// // // // //     padding: "6px 10px",
// // // // //     border: "none",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     fontSize: "13px",
// // // // //   },
// // // // //   deleteBtn: {
// // // // //     background: "#ff4d4d",
// // // // //     color: "#fff",
// // // // //     padding: "6px 10px",
// // // // //     border: "none",
// // // // //     borderRadius: "6px",
// // // // //     cursor: "pointer",
// // // // //     fontSize: "13px",
// // // // //   },
// // // // // };

// // // // // export default UploadedReports;


// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import * as XLSX from "xlsx";
// // // // import { saveAs } from "file-saver";
// // // // import { useNavigate } from "react-router-dom";

// // // // const UploadedReports = () => {
// // // //   const [reports, setReports] = useState([]);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const fetchReports = async () => {
// // // //       try {
// // // //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// // // //         if (!token) {
// // // //           console.error("Missing token");
// // // //           return;
// // // //         }

// // // //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });

// // // //         console.log(res,"res");
        
// // // //         const allSheets = Array.isArray(res.data?.data)
// // // //           ? res.data.data
// // // //           : Array.isArray(res.data)
// // // //           ? res.data
// // // //           : [];

// // // //         const formatted = allSheets.map((sheet, index) => ({
// // // //           id: sheet._id || index,
// // // //           fileName: sheet.name || `Sheet_${index + 1}`,
// // // //           uploadedBy: sheet.uploadedBy?.name || sheet.uploadedBy || "Unknown",
// // // //           date: sheet.createdAt
// // // //             ? new Date(sheet.createdAt).toLocaleString()
// // // //             : "Not Available",
// // // //           status: "Processed",
// // // //           data: sheet.data || [],
// // // //         }));

// // // //         setReports(formatted.reverse());
// // // //       } catch (err) {
// // // //         console.error("Error fetching reports:", err);
// // // //       }
// // // //     };

// // // //     fetchReports();
// // // //   }, []);

// // // //   // ✅ View Sheet - Navigate to detailed sheet view
// // // //   const handleView = (report) => {
// // // //     navigate("/viewuploads", { state: { sheetIds: [report.id] } });
// // // //   };

// // // //   // ✅ Download as Excel
// // // //   const handleDownload = (report) => {
// // // //     if (!report.data || report.data.length === 0) {
// // // //       alert("No data available in this report");
// // // //       return;
// // // //     }

// // // //     const ws = XLSX.utils.json_to_sheet(report.data);
// // // //     const wb = XLSX.utils.book_new();
// // // //     XLSX.utils.book_append_sheet(wb, ws, "Sheet Data");
// // // //     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

// // // //     const fileName = `${report.fileName.replace(/\s+/g, "_")}.xlsx`;
// // // //     saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
// // // //   };

// // // //   // ✅ Delete Report
// // // //   const handleDelete = async (id) => {
// // // //     if (!window.confirm("Are you sure you want to delete this report?")) return;

// // // //     try {
// // // //       await axios.delete(`http://localhost:5000/api/deletesheet/${id}`);
// // // //       setReports(reports.filter((r) => r.id !== id));
// // // //     } catch (err) {
// // // //       console.error("Error deleting report:", err);
// // // //       alert("Failed to delete report");
// // // //     }
// // // //   };

// // // //   const statusBadge = (status) => ({
// // // //     background: status === "Processed" ? "#00C49F" : "#FF9800",
// // // //     color: "#fff",
// // // //     padding: "5px 10px",
// // // //     borderRadius: "6px",
// // // //     fontSize: "12px",
// // // //     fontWeight: 600,
// // // //   });

// // // //   return (
// // // //     <div style={styles.container}>
// // // //       <h2 style={styles.title}>📊 Uploaded Reports</h2>

// // // //       <div style={styles.tableWrapper}>
// // // //         <table style={styles.table}>
// // // //           <thead>
// // // //             <tr>
// // // //               <th style={styles.th}>#</th>
// // // //               <th style={styles.th}>Report Name</th>
// // // //               <th style={styles.th}>Uploaded By</th>
// // // //               <th style={styles.th}>Uploaded At</th>
// // // //               <th style={styles.th}>Status</th>
// // // //               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {reports.length > 0 ? (
// // // //               reports.map((r, idx) => (
// // // //                 <tr key={r.id} style={styles.tr}>
// // // //                   <td style={styles.td}>{idx + 1}</td>
// // // //                   <td style={styles.td}>{r.fileName}</td>
// // // //                   <td style={styles.td}>{r.uploadedBy}</td>
// // // //                   <td style={styles.td}>{r.date}</td>
// // // //                   <td style={styles.td}>
// // // //                     <span style={statusBadge(r.status)}>{r.status}</span>
// // // //                   </td>
// // // //                   <td style={{ ...styles.td, ...styles.actions }}>
// // // //                     <button style={styles.viewBtn} onClick={() => handleView(r)}>
// // // //                       View
// // // //                     </button>
// // // //                     <button
// // // //                       style={styles.downloadBtn}
// // // //                       onClick={() => handleDownload(r)}
// // // //                     >
// // // //                       Download
// // // //                     </button>
// // // //                     <button
// // // //                       style={styles.deleteBtn}
// // // //                       onClick={() => handleDelete(r.id)}
// // // //                     >
// // // //                       Delete
// // // //                     </button>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             ) : (
// // // //               <tr>
// // // //                 <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
// // // //                   No reports available
// // // //                 </td>
// // // //               </tr>
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // // ✅ CSS Styles
// // // // const styles = {
// // // //   container: {
// // // //     padding: "30px",
// // // //     fontFamily: "Poppins, sans-serif",
// // // //     backgroundColor: "#f9fafb",
// // // //   },
// // // //   title: {
// // // //     fontSize: "22px",
// // // //     fontWeight: 600,
// // // //     marginBottom: "15px",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "10px",
// // // //   },
// // // //   tableWrapper: {
// // // //     overflowX: "auto",
// // // //     background: "#fff",
// // // //     padding: "20px",
// // // //     borderRadius: "10px",
// // // //     boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
// // // //   },
// // // //   table: {
// // // //     width: "100%",
// // // //     borderCollapse: "collapse",
// // // //     border: "1px solid #ccc",
// // // //   },
// // // //   th: {
// // // //     border: "1px solid #ccc",
// // // //     padding: "12px 10px",
// // // //     backgroundColor: "#e9f1f7",
// // // //     fontWeight: 600,
// // // //     fontSize: "14px",
// // // //     color: "#333",
// // // //     textAlign: "left",
// // // //   },
// // // //   td: {
// // // //     border: "1px solid #ccc",
// // // //     padding: "10px",
// // // //     fontSize: "14px",
// // // //     color: "#555",
// // // //     backgroundColor: "#fff",
// // // //   },
// // // //   tr: {
// // // //     transition: "background 0.2s ease-in-out",
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
// // // // };

// // // // export default UploadedReports;



// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import * as XLSX from "xlsx";
// // // import { saveAs } from "file-saver";
// // // import { useNavigate } from "react-router-dom";

// // // const UploadedReports = () => {
// // //   const [reports, setReports] = useState([]);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchReports = async () => {
// // //       try {
// // //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// // //         if (!token) {
// // //           console.error("Missing token");
// // //           return;
// // //         }

// // //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });

// // //         // The backend returns all uploaded sheets (each upload includes multiple worksheets)
// // //         const allData = Array.isArray(res.data?.data)
// // //           ? res.data.data
// // //           : Array.isArray(res.data)
// // //           ? res.data
// // //           : [];

// // //         // Group by uploadedBy (since each uploader has multiple worksheets)
// // //         const grouped = {};

// // //         allData.forEach((sheet) => {
// // //           const uploaderId = sheet.uploadedBy?._id || sheet.uploadedBy || "unknown";
// // //           const uploaderName =
// // //             sheet.uploadedBy?.name || sheet.uploadedBy || "Unknown Publisher";

// // //           if (!grouped[uploaderId]) {
// // //             grouped[uploaderId] = {
// // //               uploaderId,
// // //               uploaderName,
// // //               createdAt: sheet.createdAt || new Date().toISOString(),
// // //               worksheets: [],
// // //             };
// // //           }

// // //           grouped[uploaderId].worksheets.push({
// // //             name: sheet.name || `Sheet_${grouped[uploaderId].worksheets.length + 1}`,
// // //             data: sheet.data || [],
// // //           });
// // //         });

// // //         const formatted = Object.values(grouped)
// // //           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// // //         setReports(formatted);
// // //       } catch (err) {
// // //         console.error("Error fetching grouped reports:", err);
// // //       }
// // //     };

// // //     fetchReports();
// // //   }, []);

// // //   // ✅ View - Go to ViewUploads page
// // //   const handleView = (report) => {
// // //     // collect all worksheet ids related to the uploader
// // //     const sheetIds = report.worksheets.map((ws) => ws.id).filter(Boolean);
// // //     navigate("/viewuploads", { state: { sheetIds } });
// // //   };

// // //   // ✅ Download - Combine all worksheets into one Excel file
// // //   const handleDownload = (report) => {
// // //     if (!report.worksheets || report.worksheets.length === 0) {
// // //       alert("No worksheets available in this report.");
// // //       return;
// // //     }

// // //     const wb = XLSX.utils.book_new();

// // //     report.worksheets.forEach((sheet) => {
// // //       const ws = XLSX.utils.json_to_sheet(sheet.data);
// // //       XLSX.utils.book_append_sheet(wb, ws, sheet.name || "Sheet");
// // //     });

// // //     const fileName = `${report.uploaderName.replace(/\s+/g, "_")}_Report.xlsx`;
// // //     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// // //     saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
// // //   };

// // //   // ✅ Delete - Delete all worksheets of that uploader
// // //   const handleDelete = async (uploaderId) => {
// // //     if (!window.confirm("Are you sure you want to delete all sheets of this uploader?")) return;

// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/deletesheetsbyuploader/${uploaderId}`);
// // //       setReports(reports.filter((r) => r.uploaderId !== uploaderId));
// // //     } catch (err) {
// // //       console.error("Error deleting report:", err);
// // //       alert("Failed to delete report");
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <h2 style={styles.title}>📑 Uploaded Reports (Grouped by Publisher)</h2>

// // //       <div style={styles.tableWrapper}>
// // //         <table style={styles.table}>
// // //           <thead>
// // //             <tr>
// // //               <th style={styles.th}>#</th>
// // //               <th style={styles.th}>Publisher</th>
// // //               <th style={styles.th}>Uploaded At</th>
// // //               <th style={styles.th}>Total Worksheets</th>
// // //               <th style={styles.th}>Status</th>
// // //               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {reports.length > 0 ? (
// // //               reports.map((r, idx) => (
// // //                 <tr key={r.uploaderId} style={styles.tr}>
// // //                   <td style={styles.td}>{idx + 1}</td>
// // //                   <td style={styles.td}>{r.uploaderName}</td>
// // //                   <td style={styles.td}>
// // //                     {new Date(r.createdAt).toLocaleString()}
// // //                   </td>
// // //                   <td style={styles.td}>{r.worksheets.length}</td>
// // //                   <td style={styles.td}>
// // //                     <span style={statusBadge("Processed")}>Processed</span>
// // //                   </td>
// // //                   <td style={{ ...styles.td, ...styles.actions }}>
// // //                     <button style={styles.viewBtn} onClick={() => handleView(r)}>
// // //                       View
// // //                     </button>
// // //                     <button
// // //                       style={styles.downloadBtn}
// // //                       onClick={() => handleDownload(r)}
// // //                     >
// // //                       Download
// // //                     </button>
                  
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             ) : (
// // //               <tr>
// // //                 <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
// // //                   No reports available
// // //                 </td>
// // //               </tr>
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // ✅ Style Definitions
// // // const statusBadge = (status) => ({
// // //   background: status === "Processed" ? "#00C49F" : "#FF9800",
// // //   color: "#fff",
// // //   padding: "5px 10px",
// // //   borderRadius: "6px",
// // //   fontSize: "12px",
// // //   fontWeight: 600,
// // // });

// // // const styles = {
// // //   container: {
// // //     padding: "30px",
// // //     fontFamily: "Poppins, sans-serif",
// // //     backgroundColor: "#f9fafb",
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
// // //     border: "1px solid #ccc",
// // //   },
// // //   th: {
// // //     border: "1px solid #ccc",
// // //     padding: "12px 10px",
// // //     backgroundColor: "#e9f1f7",
// // //     fontWeight: 600,
// // //     fontSize: "14px",
// // //     color: "#333",
// // //     textAlign: "left",
// // //   },
// // //   td: {
// // //     border: "1px solid #ccc",
// // //     padding: "10px",
// // //     fontSize: "14px",
// // //     color: "#555",
// // //     backgroundColor: "#fff",
// // //   },
// // //   tr: {
// // //     transition: "background 0.2s ease-in-out",
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
// // import * as XLSX from "xlsx";
// // import { saveAs } from "file-saver";
// // import { useNavigate } from "react-router-dom";

// // const UploadedReports = () => {
// //   const [reports, setReports] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchReports = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
// //         if (!token) {
// //           console.error("Missing token");
// //           return;
// //         }

// //         const res = await axios.get("http://localhost:5000/api/getalldata", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         const allData = Array.isArray(res.data?.data)
// //           ? res.data.data
// //           : Array.isArray(res.data)
// //           ? res.data
// //           : [];

// //         // Group sheets by uploader (each uploader has 4 worksheets)
// //         const grouped = {};

// //         allData.forEach((sheet) => {
// //           const uploaderId = sheet.uploadedBy?._id || sheet.uploadedBy || "unknown";
// //           const uploaderName =
// //             sheet.uploadedBy?.name || sheet.uploadedBy || "Unknown Publisher";

// //           if (!grouped[uploaderId]) {
// //             grouped[uploaderId] = {
// //               uploaderId,
// //               uploaderName,
// //               createdAt: sheet.createdAt || new Date().toISOString(),
// //               worksheets: [],
// //             };
// //           }

// //           grouped[uploaderId].worksheets.push({
// //             id: sheet._id, // ✅ Include worksheet ID for view functionality
// //             name: sheet.name || `Sheet_${grouped[uploaderId].worksheets.length + 1}`,
// //             data: sheet.data || [],
// //           });
// //         });

// //         const formatted = Object.values(grouped).sort(
// //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
// //         );

// //         setReports(formatted);
// //       } catch (err) {
// //         console.error("Error fetching grouped reports:", err);
// //       }
// //     };

// //     fetchReports();
// //   }, []);

// //   // ✅ View - Redirect to ViewUploads page with all worksheet IDs
// //   const handleView = (report) => {
// //     const sheetIds = report.worksheets.map((ws) => ws.id).filter(Boolean);

// //     if (!sheetIds.length) {
// //       alert("No worksheet IDs found for this report.");
// //       return;
// //     }

// //     navigate("/viewuploads", { state: { sheetIds } });
// //   };

// //   // ✅ Download - Combine all worksheets into one Excel file
// //   const handleDownload = (report) => {
// //     if (!report.worksheets || report.worksheets.length === 0) {
// //       alert("No worksheets available in this report.");
// //       return;
// //     }

// //     const wb = XLSX.utils.book_new();

// //     report.worksheets.forEach((sheet) => {
// //       const ws = XLSX.utils.json_to_sheet(sheet.data);
// //       XLSX.utils.book_append_sheet(wb, ws, sheet.name || "Sheet");
// //     });

// //     const fileName = `${report.uploaderName.replace(/\s+/g, "_")}_Report.xlsx`;
// //     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
// //     saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
// //   };

// //   // ✅ Delete - Delete all worksheets for that uploader
// //   const handleDelete = async (uploaderId) => {
// //     if (!window.confirm("Are you sure you want to delete all sheets for this publisher?")) return;

// //     try {
// //       await axios.delete(`http://localhost:5000/api/deletesheetsbyuploader/${uploaderId}`);
// //       setReports(reports.filter((r) => r.uploaderId !== uploaderId));
// //     } catch (err) {
// //       console.error("Error deleting report:", err);
// //       alert("Failed to delete report");
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.title}>📑 Uploaded Reports (Grouped by Publisher)</h2>

// //       <div style={styles.tableWrapper}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th style={styles.th}>#</th>
// //               <th style={styles.th}>Publisher</th>
// //               <th style={styles.th}>Uploaded At</th>
// //               <th style={styles.th}>Total Worksheets</th>
// //               <th style={styles.th}>Status</th>
// //               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {reports.length > 0 ? (
// //               reports.map((r, idx) => (
// //                 <tr key={r.uploaderId} style={styles.tr}>
// //                   <td style={styles.td}>{idx + 1}</td>
// //                   <td style={styles.td}>{r.uploaderName}</td>
// //                   <td style={styles.td}>
// //                     {new Date(r.createdAt).toLocaleString()}
// //                   </td>
// //                   <td style={styles.td}>{r.worksheets.length}</td>
// //                   <td style={styles.td}>
// //                     <span style={statusBadge("Processed")}>Processed</span>
// //                   </td>
// //                   <td style={{ ...styles.td, ...styles.actions }}>
// //                     <button style={styles.viewBtn} onClick={() => handleView(r)}>
// //                       View
// //                     </button>
// //                     <button
// //                       style={styles.downloadBtn}
// //                       onClick={() => handleDownload(r)}
// //                     >
// //                       Download
// //                     </button>
// //                     <button
// //                       style={styles.deleteBtn}
// //                       onClick={() => handleDelete(r.uploaderId)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
// //                   No reports available
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // // ✅ Badge Style
// // const statusBadge = (status) => ({
// //   background: status === "Processed" ? "#00C49F" : "#FF9800",
// //   color: "#fff",
// //   padding: "5px 10px",
// //   borderRadius: "6px",
// //   fontSize: "12px",
// //   fontWeight: 600,
// // });

// // // ✅ CSS
// // const styles = {
// //   container: {
// //     padding: "30px",
// //     fontFamily: "Poppins, sans-serif",
// //     backgroundColor: "#f9fafb",
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
// //     border: "1px solid #ccc",
// //   },
// //   th: {
// //     border: "1px solid #ccc",
// //     padding: "12px 10px",
// //     backgroundColor: "#e9f1f7",
// //     fontWeight: 600,
// //     fontSize: "14px",
// //     color: "#333",
// //     textAlign: "left",
// //   },
// //   td: {
// //     border: "1px solid #ccc",
// //     padding: "10px",
// //     fontSize: "14px",
// //     color: "#555",
// //     backgroundColor: "#fff",
// //   },
// //   tr: {
// //     transition: "background 0.2s ease-in-out",
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
// // };

// // export default UploadedReports;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useNavigate } from "react-router-dom";

// const UploadedReports = () => {
//   const [reports, setReports] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("jwt"))?.token;
//         if (!token) {
//           console.error("Missing authentication token");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/getalldata", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const allData = Array.isArray(res.data?.data)
//           ? res.data.data
//           : Array.isArray(res.data)
//           ? res.data
//           : [];

//         // Group reports by uploader (each uploader may have multiple worksheets)
//         const grouped = {};
//         allData.forEach((sheet) => {
//           const uploaderId = sheet.uploadedBy?._id || sheet.uploadedBy || "unknown";
//           const uploaderName =
//             sheet.uploadedBy?.name || sheet.uploadedBy || "Unknown Publisher";

//           if (!grouped[uploaderId]) {
//             grouped[uploaderId] = {
//               uploaderId,
//               uploaderName,
//               createdAt: sheet.createdAt || new Date().toISOString(),
//               worksheets: [],
//             };
//           }

//           grouped[uploaderId].worksheets.push({
//             id: sheet._id,
//             name: sheet.name || `Worksheet_${grouped[uploaderId].worksheets.length + 1}`,
//             data: sheet.data || [],
//           });
//         });

//         const formatted = Object.values(grouped).sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         setReports(formatted);
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       }
//     };

//     fetchReports();
//   }, []);

//   // ✅ View all worksheets of a publisher
//   const handleView = (report) => {
//     const sheetIds = report.worksheets.map((ws) => ws.id).filter(Boolean);

//     if (!sheetIds.length) {
//       alert("No worksheets found for this publisher.");
//       return;
//     }

//     navigate("/viewuploads", { state: { sheetIds } });
//   };

//   // ✅ Download as Excel
//   const handleDownload = (report) => {
//     if (!report.worksheets?.length) {
//       alert("No worksheets available for download.");
//       return;
//     }

//     const wb = XLSX.utils.book_new();
//     report.worksheets.forEach((sheet) => {
//       const ws = XLSX.utils.json_to_sheet(sheet.data);
//       XLSX.utils.book_append_sheet(wb, ws, sheet.name || "Sheet");
//     });

//     const fileName = `${report.uploaderName.replace(/\s+/g, "_")}_Full_Report.xlsx`;
//     const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
//   };

//   // ✅ Delete publisher’s sheets
//   const handleDelete = async (uploaderId) => {
//     if (!window.confirm("Are you sure you want to delete all reports for this publisher?"))
//       return;

//     try {
//       await axios.delete(`http://localhost:5000/api/deletesheetsbyuploader/${uploaderId}`);
//       setReports(reports.filter((r) => r.uploaderId !== uploaderId));
//     } catch (err) {
//       console.error("Error deleting report:", err);
//       alert("Failed to delete publisher reports.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>📂 Uploaded Reports Overview</h2>
//       <p style={styles.subtitle}>
//         Manage and view all uploaded datasets grouped by publisher. You can preview worksheets, download consolidated data, or remove old records.
//       </p>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>#</th>
//               <th style={styles.th}>Publisher Name</th>
//               <th style={styles.th}>Upload Date</th>
//               <th style={styles.th}>Total Worksheets</th>
//               <th style={styles.th}>Status</th>
//               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {reports.length > 0 ? (
//               reports.map((r, i) => (
//                 <tr key={r.uploaderId} style={styles.tr}>
//                   <td style={styles.td}>{i + 1}</td>
//                   <td style={styles.td}>{r.uploaderName}</td>
//                   <td style={styles.td}>
//                     {new Date(r.createdAt).toLocaleString()}
//                   </td>
//                   <td style={styles.td}>{r.worksheets.length}</td>
//                   <td style={styles.td}>
//                     <span style={statusBadge("Processed")}>Processed</span>
//                   </td>
//                   <td style={{ ...styles.td, ...styles.actions }}>
//                     <button style={styles.viewBtn} onClick={() => handleView(r)}>
//                       View
//                     </button>
//                     <button
//                       style={styles.downloadBtn}
//                       onClick={() => handleDownload(r)}
//                     >
//                       Download
//                     </button>
//                     <button
//                       style={styles.deleteBtn}
//                       onClick={() => handleDelete(r.uploaderId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" style={styles.empty}>
//                   No reports uploaded yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ✅ Status Badge
// const statusBadge = (status) => ({
//   background: status === "Processed" ? "#00C49F" : "#FF9800",
//   color: "#fff",
//   padding: "5px 10px",
//   borderRadius: "6px",
//   fontSize: "12px",
//   fontWeight: 600,
// });

// // ✅ Styling
// const styles = {
//   container: {
//     padding: "30px",
//     fontFamily: "Poppins, sans-serif",
//     backgroundColor: "#f9fafb",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: 700,
//     color: "#111827",
//     marginBottom: "5px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#555",
//     marginBottom: "20px",
//   },
//   tableWrapper: {
//     overflowX: "auto",
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     border: "1px solid #e5e7eb",
//   },
//   th: {
//     border: "1px solid #e5e7eb",
//     padding: "12px 10px",
//     backgroundColor: "#eef3f9",
//     fontWeight: 600,
//     fontSize: "14px",
//     color: "#333",
//     textAlign: "left",
//   },
//   td: {
//     border: "1px solid #e5e7eb",
//     padding: "10px",
//     fontSize: "14px",
//     color: "#444",
//     backgroundColor: "#fff",
//   },
//   tr: {
//     transition: "background 0.2s ease-in-out",
//   },
//   empty: {
//     textAlign: "center",
//     padding: "20px",
//     color: "#777",
//     fontStyle: "italic",
//   },
//   actions: {
//     display: "flex",
//     gap: "10px",
//     justifyContent: "center",
//   },
//   viewBtn: {
//     background: "#007bff",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
//   downloadBtn: {
//     background: "#6a5acd",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
//   deleteBtn: {
//     background: "#ff4d4d",
//     color: "#fff",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//   },
// };

// export default UploadedReports;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeSettings/ThemeContext"; // ✅ Import theme

const UploadedReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // ✅ Use theme context

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwt"))?.token;
        if (!token) {
          console.error("Missing authentication token");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/getalldata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allData = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        const grouped = {};
        allData.forEach((sheet) => {
          const uploaderId = sheet.uploadedBy?._id || sheet.uploadedBy || "unknown";
          const uploaderName =
            sheet.uploadedBy?.name || sheet.uploadedBy || "Unknown Publisher";

          if (!grouped[uploaderId]) {
            grouped[uploaderId] = {
              uploaderId,
              uploaderName,
              createdAt: sheet.createdAt || new Date().toISOString(),
              worksheets: [],
            };
          }

          grouped[uploaderId].worksheets.push({
            id: sheet._id,
            name: sheet.name || `Worksheet_${grouped[uploaderId].worksheets.length + 1}`,
            data: sheet.data || [],
          });
        });

        const formatted = Object.values(grouped).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(formatted);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  // ✅ View all worksheets of a publisher
  const handleView = (report) => {
    const sheetIds = report.worksheets.map((ws) => ws.id).filter(Boolean);

    if (!sheetIds.length) {
      alert("No worksheets found for this publisher.");
      return;
    }

    navigate("/viewuploads", { state: { sheetIds } });
  };

  // ✅ Download as Excel
  const handleDownload = (report) => {
    if (!report.worksheets?.length) {
      alert("No worksheets available for download.");
      return;
    }

    const wb = XLSX.utils.book_new();
    report.worksheets.forEach((sheet) => {
      const ws = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(wb, ws, sheet.name || "Sheet");
    });

    const fileName = `${report.uploaderName.replace(/\s+/g, "_")}_Full_Report.xlsx`;
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
  };

  // ✅ Delete publisher’s sheets
  const handleDelete = async (uploaderId) => {
    if (!window.confirm("Are you sure you want to delete all reports for this publisher?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/deletesheetsbyuploader/${uploaderId}`);
      setReports(reports.filter((r) => r.uploaderId !== uploaderId));
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete publisher reports.");
    }
  };

  // 🎨 Dynamic theme-based colors
  const colors = {
    background: theme === "dark" ? "#0f172a" : "#f9fafb",
    card: theme === "dark" ? "#1e293b" : "#ffffff",
    border: theme === "dark" ? "#334155" : "#e5e7eb",
    textPrimary: theme === "dark" ? "#f1f5f9" : "#111827",
    textSecondary: theme === "dark" ? "#cbd5e1" : "#555",
    headerBg: theme === "dark" ? "#334155" : "#eef3f9",
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >
      <h2 style={{ ...styles.title, color: colors.textPrimary }}>
        📂 Uploaded Reports Overview
      </h2>
      <p style={{ ...styles.subtitle, color: colors.textSecondary }}>
        Manage and view all uploaded datasets grouped by publisher. You can preview worksheets, download consolidated data, or remove old records.
      </p>

      <div
        style={{
          ...styles.tableWrapper,
          background: colors.card,
          boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <table style={{ ...styles.table, borderColor: colors.border }}>
          <thead>
            <tr>
              {["#", "Publisher Name", "Upload Date", "Total Worksheets", "Status", "Actions"].map(
                (header, idx) => (
                  <th key={idx} style={{ ...styles.th, backgroundColor: colors.headerBg, color: colors.textPrimary }}>
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {reports.length > 0 ? (
              reports.map((r, i) => (
                <tr key={r.uploaderId} style={styles.tr}>
                  <td style={{ ...styles.td, borderColor: colors.border }}>{i + 1}</td>
                  <td style={{ ...styles.td, borderColor: colors.border }}>{r.uploaderName}</td>
                  <td style={{ ...styles.td, borderColor: colors.border }}>
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td style={{ ...styles.td, borderColor: colors.border }}>{r.worksheets.length}</td>
                  <td style={{ ...styles.td, borderColor: colors.border }}>
                    <span style={statusBadge("Processed")}>Processed</span>
                  </td>
                  <td style={{ ...styles.td, ...styles.actions, borderColor: colors.border }}>
                    <button style={styles.viewBtn} onClick={() => handleView(r)}>
                      View
                    </button>
                    <button style={styles.downloadBtn} onClick={() => handleDownload(r)}>
                      Download
                    </button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(r.uploaderId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ ...styles.empty, color: colors.textSecondary }}>
                  No reports uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ✅ Status Badge
const statusBadge = (status) => ({
  background: status === "Processed" ? "#00C49F" : "#FF9800",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 600,
});

// ✅ Base Styles
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.3s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "5px",
    transition: "color 0.3s",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    transition: "color 0.3s",
  },
  tableWrapper: {
    overflowX: "auto",
    padding: "20px",
    borderRadius: "12px",
    transition: "background 0.3s, box-shadow 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    transition: "all 0.3s",
  },
  th: {
    padding: "12px 10px",
    fontWeight: 600,
    fontSize: "14px",
    textAlign: "left",
    border: "1px solid",
    transition: "background 0.3s, color 0.3s",
  },
  td: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid",
    transition: "background 0.3s, color 0.3s",
  },
  tr: {
    transition: "background 0.2s ease-in-out",
  },
  empty: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  viewBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  downloadBtn: {
    background: "#6a5acd",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  deleteBtn: {
    background: "#ff4d4d",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default UploadedReports;
