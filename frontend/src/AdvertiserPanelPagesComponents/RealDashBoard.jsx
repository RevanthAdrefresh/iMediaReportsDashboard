

import React, { useState } from "react";
import * as XLSX from "xlsx";
import OTTReport from "./OttReport";
import SummaryReport from "./Summary";
import AdWidget from "./Advertise";
import VideoReport from "./NewVideoReport";

const MainDashboard = () => {
  const [sheets, setSheets] = useState([]);

  // ✅ Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const parsedSheets = workbook.SheetNames.slice(0, 4).map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        return { name: sheetName, data: jsonData };
      });

      setSheets(parsedSheets);

      // ✅ Send to backend with JWT token
      const userData = JSON.parse(localStorage.getItem("jwt"));
      const token = userData?.token;

      if (!token) {
        console.error("No token found in localStorage");
        alert("Unauthorized: Please login again");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ JWT sent in header
          },
          body: JSON.stringify({ sheets: parsedSheets }),
        });

        const result = await res.json();
        console.log("Uploaded:", result);

        if (res.status === 401) {
          alert("Unauthorized: Token invalid or expired. Please log in again.");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => setSheets([]);

  return (
    <div style={styles.container}>
      <div style={styles.uploadBox}>
        <h2>📂 Upload Excel File (with 4 Worksheets)</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={styles.input}
        />
        {sheets.length > 0 && (
          <button onClick={handleReset} style={styles.resetButton}>
            Clear Dashboard
          </button>
        )}
      </div>

      <div style={{ display: "none" }}>
        <div style={styles.sections}>
          {sheets[0] && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📊 Ad Widget Report</h3>
              <AdWidget data={sheets[0].data} />
            </div>
          )}
          {sheets[1] && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>🎥 Video Report</h3>
              <VideoReport data={sheets[1].data} />
            </div>
          )}
          {sheets[2] && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📺 OTT Report</h3>
              <OTTReport data={sheets[2].data} />
            </div>
          )}
          {sheets[3] && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>📈 Summary Report</h3>
              <SummaryReport data={sheets[3].data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "25px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  uploadBox: {
    textAlign: "center",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  resetButton: {
    backgroundColor: "#ff5b5b",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  sectionTitle: {
    marginBottom: "10px",
    color: "#2d3a4b",
  },
};

export default MainDashboard;
