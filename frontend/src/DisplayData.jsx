
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ThemeContext } from "./ThemeSettings/ThemeContext";

const COLORS = ["#007bff", "#ff004c"]; // blue + red

const normalizeKey = (key = "") =>
  key.toString().trim().toLowerCase().replace(/\s+/g, "_").replace(/[^\w]/g, "");

const findFieldKey = (keys, terms) =>
  keys.find((key) => terms.some((t) => key.includes(t))) || null;

const safeNum = (v) => {
  if (v === null || v === undefined || v === "") return 0;
  const s = String(v).replace(/,/g, "").replace(/[^0-9.\-]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

const exportToCSV = (rows, columns, title) => {
  if (!rows || !columns) return;
  const csvRows = [];
  csvRows.push(columns.join(","));
  rows.forEach((r) => {
    const rowData = columns.map((c) => {
      const val = r[c];
      if (val == null) return "";
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(rowData.join(","));
  });
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default function DisplayData() {
  const { theme } = useContext(ThemeContext);
  const [sections, setSections] = useState({
    genealogysegments: null,
    genealogyretargeting: null,
    genealogysites: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const colors = {
    bg:
      theme === "dark"
        ? "linear-gradient(135deg,#0f172a,#1e293b)"
        : "linear-gradient(135deg,#f8fafc,#e0f2fe)",
    cardBg: theme === "dark" ? "rgba(30,41,59,0.9)" : "#ffffff",
    text: theme === "dark" ? "#e2e8f0" : "#0f172a",
    border: theme === "dark" ? "#334155" : "#cbd5e1",
  };

  useEffect(() => {
    const fetchGenealogy = async () => {
      setLoading(true);
      setError("");
      try {
        const tokenObj = JSON.parse(localStorage.getItem("jwt") || "null");
        const token = tokenObj?.token;
        if (!token) throw new Error("No JWT token found. Please login.");

        const res = await axios.get("http://localhost:5000/api/getgenealogyrecords", {
          headers: { Authorization: `Bearer ${token}` },
        });
console.log(res,"resss");

        const docs = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.genealogySheets)
          ? res.data.genealogySheets
          : [];

        if (!docs.length) throw new Error("No genealogy data found.");

        const segmentsDoc = docs.find((d) =>
          d.name?.toLowerCase().includes("genealogysegments")
        );
        const retargetingDoc = docs.find((d) =>
          d.name?.toLowerCase().includes("genealogyretargeting")
        );
        const sitesDoc = docs.find((d) =>
          d.name?.toLowerCase().includes("genealogysites")
        );

        const processDoc = (doc) => {
          if (!doc || !Array.isArray(doc.data)) return null;
          const rows = doc.data.filter(
            (r) => r && typeof r === "object" && Object.values(r).some((v) => v !== "")
          );
          if (!rows.length) return null;

          const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))))
            .filter(
              (h) =>
                h &&
                !/^unnamed|^empty|^nan|^_|^column\d+|^blank$/i.test(h.trim()) &&
                h.trim().length > 0
            );

          const cleaned = rows.map((r) => {
            const o = {};
            headers.forEach((h) => {
              const val = r[h];
              if (val !== null && val !== undefined && String(val).trim() !== "")
                o[h] = val;
            });
            return o;
          });

          const keys = headers.map(normalizeKey);
          const impressionsKey =
            findFieldKey(keys, ["impression", "impr", "view", "delivery"]) ||
            keys[0];
          const clicksKey = findFieldKey(keys, ["click"]) || keys[1];
          const spendKey =
            findFieldKey(keys, ["spend", "cost", "amount", "budget"]) || keys[2];
          const ctrKey = findFieldKey(keys, ["ctr"]) || null;
          const dateKey =
            findFieldKey(keys, ["date", "day", "time"]) || keys[0];

          let totalImpressions = 0,
            totalClicks = 0,
            totalSpend = 0,
            totalCtrSum = 0,
            ctrCount = 0;

          const chartRows = cleaned.map((r) => {
            const impressions = safeNum(r[headers[keys.indexOf(impressionsKey)]]);
            const clicks = safeNum(r[headers[keys.indexOf(clicksKey)]]);
            const spend = safeNum(r[headers[keys.indexOf(spendKey)]]);
            let ctr = ctrKey
              ? safeNum(r[headers[keys.indexOf(ctrKey)]])
              : impressions > 0
              ? (clicks / impressions) * 100
              : 0;

            totalImpressions += impressions;
            totalClicks += clicks;
            totalSpend += spend;
            if (ctr > 0) {
              totalCtrSum += ctr;
              ctrCount++;
            }

            return {
              date: r[headers[keys.indexOf(dateKey)]] || "",
              impressions,
              clicks,
              spend,
              ctr: Number(parseFloat(ctr).toFixed(2)),
            };
          });

          const avgCTR = ctrCount > 0 ? (totalCtrSum / ctrCount).toFixed(2) : 0;

          return {
            name: doc.name,
            chartRows,
            stats: {
              totalImpressions,
              totalClicks,
              totalSpend,
              avgCTR,
            },
            rows: cleaned,
            columns: headers,
          };
        };

        setSections({
          genealogysegments: processDoc(segmentsDoc),
          genealogyretargeting: processDoc(retargetingDoc),
          genealogysites: processDoc(sitesDoc),
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching genealogy:", err);
        setError(err.message || "Failed to fetch genealogy data.");
        setLoading(false);
      }
    };
    fetchGenealogy();
  }, [theme]);

  if (loading)
    return (
      <div style={{ padding: 30, textAlign: "center" }}>
        <h3>Loading Genealogy Dashboard...</h3>
      </div>
    );
  if (error)
    return (
      <div style={{ padding: 30, textAlign: "center", color: "red" }}>
        <h3>Error: {error}</h3>
      </div>
    );

  const StatCard = ({ label, value }) => (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: "linear-gradient(135deg,#007bff,#ff004c)",
        color: "#fff",
        minWidth: 140,
        textAlign: "center",
        boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
      }}
    >
      <b>{label}</b>
      <div style={{ fontSize: 16, fontWeight: 600 }}>{value}</div>
    </div>
  );

  const Section = ({ title, payload }) => {
    if (!payload)
      return (
        <div
          style={{
            background: colors.cardBg,
            padding: 20,
            borderRadius: 12,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          <h3>{title}</h3>
          <p>No data available.</p>
        </div>
      );

    const { chartRows, stats, columns, rows } = payload;

    return (
      <div
        style={{
          background: colors.cardBg,
          padding: 24,
          borderRadius: 12,
          marginBottom: 30,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 16,
            background: "linear-gradient(90deg,#007bff,#ff004c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          📊 {title}
        </h2>

        {/* Export */}
        <div style={{ textAlign: "right", marginBottom: "12px" }}>
          <button
            onClick={() => exportToCSV(rows, columns, title)}
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 14px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            ⬇️ Export CSV
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <StatCard label="📊 Impressions" value={stats.totalImpressions} />
          <StatCard label="🖱️ Clicks" value={stats.totalClicks} />
          <StatCard label="📈 Avg CTR" value={`${stats.avgCTR}%`} />
          <StatCard
            label="💰 Spend"
            value={`$${Number(stats.totalSpend).toLocaleString()}`}
          />
        </div>

        {/* Charts */}
        <div style={{ height: 320, marginBottom: 30 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartRows}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="impressions" fill="#007bff" name="Impressions" />
              <Bar dataKey="spend" fill="#ff004c" name="Spend" />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#ff004c"
                strokeWidth={2}
                name="Clicks"
              />
              <Line
                type="monotone"
                dataKey="ctr"
                stroke="#007bff"
                strokeWidth={2}
                name="CTR (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        {/* 🎯 Campaign Performance Donut Chart */}
<div style={{ height: 280, marginBottom: 30 }}>
  <h4 style={{ textAlign: "center", marginBottom: 10, fontWeight: 600 }}>
    Overall Campaign Distribution
  </h4>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={[
          { name: "Impressions", value: stats.totalImpressions },
          { name: "Clicks", value: stats.totalClicks },
          { name: "Spend", value: stats.totalSpend },
        ]}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        paddingAngle={3}
        dataKey="value"
        label={({ name, percent }) =>
          `${name}: ${(percent * 100).toFixed(1)}%`
        }
      >
        <Cell fill="#007bff" /> {/* Blue - Impressions */}
        <Cell fill="#ff004c" /> {/* Red - Clicks */}
        <Cell fill="#9ca3af" /> {/* Gray - Spend */}
      </Pie>
      <Tooltip
        formatter={(value, name) => [
          name === "Spend"
            ? `$${Number(value).toLocaleString()}`
            : Number(value).toLocaleString(),
          name,
        ]}
      />
      <Legend
        verticalAlign="bottom"
        height={36}
        iconType="circle"
        wrapperStyle={{
          fontSize: "0.9rem",
          marginTop: "10px",
        }}
      />
    </PieChart>
  </ResponsiveContainer>
</div>

        {/* Table */}
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      padding: 10,
                      border: "1px solid #ddd",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 200).map((r, ri) => (
                <tr
                  key={ri}
                  style={{ background: ri % 2 === 0 ? "#f9fafb" : "#ffffff" }}
                >
                  {columns.map((c, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: 8,
                        border: "1px solid #eee",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        maxWidth: "200px",
                      }}
                    >
                      {r[c] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Totals Row */}
              <tr style={{ background: "#f1f5f9", fontWeight: "bold" }}>
                <td colSpan={columns.length} style={{ textAlign: "right", padding: "10px" }}>
                  Total Impressions: {stats.totalImpressions.toLocaleString()} | 
                  Total Clicks: {stats.totalClicks.toLocaleString()} | 
                  Total Spend: ${stats.totalSpend.toLocaleString()} | 
                  Avg CTR: {stats.avgCTR}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        padding: "2rem",
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "2rem",
        }}
      >
        🧬 Genealogy Dashboard
      </h1>

      <Section title="Genealogy Segments" payload={sections.genealogysegments} />
      <Section title="Genealogy Retargeting" payload={sections.genealogyretargeting} />
      <Section title="Genealogy Sites" payload={sections.genealogysites} />

      <p style={{ textAlign: "center", color: "#64748b", marginTop: "1rem" }}>
        Showing up to 200 rows per section. Data cleaned and charted accurately.
      </p>
    </div>
  );
}
