
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WidgetReport() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Converts Excel serial date (e.g. 45756) → "10-12-2025"
  const excelDateToJSDate = (serial) => {
    if (!serial || isNaN(serial)) return serial;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const day = String(date_info.getDate()).padStart(2, "0");
    const month = String(date_info.getMonth() + 1).padStart(2, "0");
    const year = date_info.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formatted = jsonData.map((row) => {
        const cleanNumber = (val) =>
          val ? parseFloat(String(val).replace(/[^0-9.-]/g, "")) || 0 : 0;
        const cleanPercent = (val) => {
          if (!val) return 0;
          let num = parseFloat(String(val).replace("%", "").trim()) || 0;
          if (num < 1) num = num * 100;
          return num;
        };

        let formattedDate = row.Date;
        if (typeof row.Date === "number") {
          formattedDate = excelDateToJSDate(row.Date);
        }

        return {
          Date: formattedDate || "Unknown",
          Impressions: cleanNumber(row.Impressions || row.Imp),
          Clicks: cleanNumber(row.Clicks),
          CTR: cleanPercent(row.CTR),
        };
      });

      setData(formatted);
    };

    reader.readAsArrayBuffer(file);
  };

  const COLORS = {
    impressions: "#007bff",
    clicks: "#28a745",
    ctr: "#ff9800",
  };

  // 🧮 KPI Calculations
  const totalImpressions = data.reduce((sum, d) => sum + d.Impressions, 0);
  const totalClicks = data.reduce((sum, d) => sum + d.Clicks, 0);
  const avgCTR =
    data.length > 0
      ? (data.reduce((sum, d) => sum + d.CTR, 0) / data.length).toFixed(2)
      : 0;

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222" }}>
        📊 Widget Ads Performance Dashboard
      </h1>

      {/* Upload */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
      </div>

      {isMobile && (
        <div
          style={{
            background: "#ffebcc",
            color: "#7a5500",
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          ⚠️ Charts are best viewed on larger screens (Laptop/Desktop)
        </div>
      )}

      {data.length > 0 && (
        <>
          {/* KPI Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <h3 style={cardTitle}>Total Impressions</h3>
              <p style={cardValue}>{totalImpressions.toLocaleString()}</p>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitle}>Total Clicks</h3>
              <p style={cardValue}>{totalClicks.toLocaleString()}</p>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitle}>Average CTR</h3>
              <p style={cardValue}>{avgCTR}%</p>
            </div>
          </div>

          {/* Charts */}
          {!isMobile && (
            <>
              <div style={chartContainer}>
                <h3>📊 Impressions vs Clicks</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis
                      scale="sqrt"
                      domain={[0, "dataMax"]}
                      tickFormatter={(val) => val.toLocaleString()}
                    />
                    <Tooltip
                      formatter={(value) => value.toLocaleString("en-US")}
                    />
                    <Legend />
                    <Bar
                      dataKey="Impressions"
                      fill={COLORS.impressions}
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="Clicks"
                      fill={COLORS.clicks}
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={chartContainer}>
                <h3>📈 CTR Trend (%)</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="CTR"
                      stroke={COLORS.ctr}
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* Table at the bottom */}
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginTop: 40,
              overflowX: "auto",
            }}
          >
            <h3>📋 Widget Ads Data Overview</h3>
            <table
              border="1"
              cellPadding="8"
              style={{
                marginTop: 10,
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              <thead style={{ background: "#007bff", color: "white" }}>
                <tr>
                  <th>Date</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>CTR (%)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{row.Date}</td>
                    <td>{row.Impressions.toLocaleString()}</td>
                    <td>{row.Clicks.toLocaleString()}</td>
                    <td>{row.CTR.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// Styles
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const cardTitle = { color: "#555", fontSize: "15px", marginBottom: "8px" };
const cardValue = { color: "#111", fontSize: "22px", fontWeight: "bold" };

const chartContainer = {
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  marginBottom: 40,
};
