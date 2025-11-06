import React, { useState, useEffect } from "react";
import axios from "axios";
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

  // ✅ Extract token from localStorage
  const userToken = JSON.parse(localStorage.getItem("jwt"))?.token;
  console.log(userToken, "token");

  const cleanNumber = (val) => {
    if (!val) return 0;
    const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const calculateTotals = (rows) => {
    const spend = rows.reduce((a, b) => a + (b.spend || 0), 0);
    const impressions = rows.reduce((a, b) => a + (b.impressions || 0), 0);
    const clicks = rows.reduce((a, b) => a + (b.clicks || 0), 0);
    const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;
    setTotals({ spend, impressions, clicks, ctr });
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getallsheets", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      // ✅ Take the first sheet data
      const sheetData = res.data[0]?.data || [];

      // ✅ Normalize data keys
      const formatted = sheetData.map((r) => ({
        date: r["Date"] || r["date"] || "",
        spend: cleanNumber(r["Spend"] || r["spend"]),
        impressions: cleanNumber(r["Impressions"] || r["impressions"]),
        clicks: cleanNumber(r["Clicks"] || r["clicks"]),
        ctr: cleanNumber(r["CTR"] || r["ctr"]),
      }));

      setData(formatted);
      calculateTotals(formatted);
    } catch (error) {
      console.error("Error fetching OTT data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            {
              label: "Total Impressions",
              value: totals.impressions.toLocaleString(),
            },
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
              <div
                style={{ fontSize: 20, fontWeight: "bold", color: "#222" }}
              >
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
              <YAxis
                yAxisId="left"
                label={{ value: "Spend ($)", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Clicks",
                  angle: 90,
                  position: "insideRight",
                }}
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
          No data available from backend.
        </p>
      )}
    </div>
  );
};

export default OttReport;
