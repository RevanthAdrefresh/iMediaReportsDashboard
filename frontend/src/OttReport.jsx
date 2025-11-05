

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("uploadedSheets");
      if (stored) {
        const sheets = JSON.parse(stored);
        // Pick Sheet1 or Sheet3 based on your structure
        const ottSheet =
          sheets.find(
            (s) =>
              s.name.toLowerCase().includes("sheet1") ||
              s.name.toLowerCase().includes("ott")
          ) || sheets[0];

        if (ottSheet && ottSheet.data && ottSheet.data.length > 0) {
          const clean = cleanData(ottSheet.data);
          setData(clean);
          calculateTotals(clean);
        } else {
          console.warn("⚠️ No OTT sheet found or it's empty");
        }
      }
    } catch (err) {
      console.error("❌ Error loading OTT sheet:", err);
    }
  }, []);

  const excelSerialToDate = (serial) => {
    if (typeof serial === "number") {
      const utc_days = Math.floor(serial - 25569);
      const d = new Date(utc_days * 86400 * 1000);
      return d.toISOString().split("T")[0];
    }
    return serial;
  };

  const cleanData = (rows) => {
    if (!rows || !rows.length) return [];

    // Trim all keys to remove spaces like " Clicks "
    const cleanedRows = rows.map((r) => {
      const obj = {};
      Object.keys(r).forEach((key) => {
        obj[key.trim()] = r[key];
      });
      return obj;
    });

    const headers = Object.keys(cleanedRows[0]);
    console.log("🧾 Cleaned OTT Headers:", headers);

    const findKey = (patterns) =>
      headers.find((h) =>
        patterns.some((p) => h.toLowerCase().includes(p))
      );

    const dateKey = findKey(["date", "day"]) || headers[0];
    const spendKey = findKey(["spend", "revenue", "cost"]);
    const impKey = findKey(["impression"]);
    const clickKey = findKey(["click"]);
    const ctrKey = findKey(["ctr", "rate"]);

    console.log("✅ Detected Keys:", {
      dateKey,
      spendKey,
      impKey,
      clickKey,
      ctrKey,
    });

    const cleanNumber = (val) => {
      if (val === null || val === undefined || val === "") return 0;
      const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };

    return cleanedRows.map((r) => ({
      date: excelSerialToDate(r[dateKey]),
      spend: cleanNumber(r[spendKey]),
      impressions: cleanNumber(r[impKey]),
      clicks: cleanNumber(r[clickKey]),
      ctr: cleanNumber(r[ctrKey]),
    }));
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

      {data.length > 0 ? (
        <>
          {/* KPI Cards */}
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

          {/* Chart */}
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
                  label={{
                    value: "Spend ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
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
                  fill="#005780ff"
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
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          ⚠️ No OTT data found. Check if “uploadedSheets” exists in localStorage.
        </p>
      )}
    </div>
  );
};

export default OttReport;
