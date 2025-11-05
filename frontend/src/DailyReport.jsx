

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const OttReport = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  });
const stored = localStorage.getItem("ottData");
    console.log(stored);
  // ✅ Load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("ottData");
    console.log(stored);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setData(parsed);
          calculateTotals(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const excelSerialToDate = (serial) => {
    if (typeof serial === "number") {
      const utcDays = Math.floor(serial - 25569);
      const d = new Date(utcDays * 86400 * 1000);
      return d.toISOString().split("T")[0];
    }
    return serial;
  };

  const cleanNumber = (val) => {
    if (!val) return 0;
    const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = XLSX.read(event.target.result, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      if (!json.length) return;

      const headers = Object.keys(json[0]);
      const dateKey = headers.find((h) => h.toLowerCase().includes("date")) || headers[0];
      const spendKey = headers.find((h) => h.toLowerCase().includes("spend") || h.toLowerCase().includes("revenue"));
      const impKey = headers.find((h) => h.toLowerCase().includes("impression"));
      const clickKey = headers.find((h) => h.toLowerCase().includes("click"));
      const ctrKey = headers.find((h) => h.toLowerCase().includes("ctr"));

      const formatted = json.map((r) => ({
        date: excelSerialToDate(r[dateKey]),
        spend: cleanNumber(r[spendKey]),
        impressions: cleanNumber(r[impKey]),
        clicks: cleanNumber(r[clickKey]),
        ctr: cleanNumber(r[ctrKey]),
      }));

      if (formatted.length > 0) {
        setData(formatted);
        localStorage.setItem("ottData", JSON.stringify(formatted));
        calculateTotals(formatted);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const calculateTotals = (rows) => {
    const spend = rows.reduce((a, b) => a + b.spend, 0);
    const impressions = rows.reduce((a, b) => a + b.impressions, 0);
    const clicks = rows.reduce((a, b) => a + b.clicks, 0);
    const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
    setTotals({ spend, impressions, clicks, ctr });
  };

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Segoe UI",
        background: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        📊 OTT Daily Performance
      </h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      </div>

      {/* KPI Cards */}
      {data.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {[
            { label: "Total Spend", value: `$${totals.spend.toFixed(2)}` },
            { label: "Total Impressions", value: totals.impressions.toLocaleString() },
            { label: "Total Clicks", value: totals.clicks.toLocaleString() },
            { label: "CTR", value: `${totals.ctr}%` },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "16px 20px",
                borderRadius: 10,
                minWidth: 180,
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: 13, color: "#888" }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      {data.length > 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ marginBottom: 20 }}>📈 Spend (Bar) vs Clicks (Line)</h4>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" label={{ value: "Spend ($)", angle: -90, position: "insideLeft" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: "Clicks", angle: 90, position: "insideRight" }}
              />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="spend"
                fill="#28a745"
                barSize={20}
                radius={[6, 6, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="clicks"
                stroke="#ff00ff"
                strokeWidth={3}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          No data available. Upload a file to view the chart.
        </p>
      )}
    </div>
  );
};

export default OttReport;
