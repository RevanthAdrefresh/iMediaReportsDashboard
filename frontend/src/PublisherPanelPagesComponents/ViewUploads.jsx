

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const containerStyle = {
  padding: "30px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#9cc9f9ff",
  marginLeft:"-15%"
};

const sheetTitle = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "10px",
  marginTop: "25px",
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

const tableWrapper = {
  overflowX: "auto",
  marginBottom: "30px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  border: "1px solid #dcdcdc",
};

const thStyle = {
  background: "#eef1f5",
  padding: "12px",
  fontWeight: "bold",
  textAlign: "center",
  border: "1px solid #d1d1d1",
  fontSize: "14px"
};

const tdStyle = {
  padding: "10px",
  textAlign: "center",
  border: "1px solid #e0e0e0",
  fontSize: "13px",
  background: "#fff"
};

const tdAltStyle = {
  ...tdStyle,
  background: "#fafafa"
};

const ViewUploads = () => {
  const location = useLocation();
  const sheetIds = location.state?.sheetIds || [];
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    if (!sheetIds.length) return;

    const fetchSheets = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/getsheetsbyids", { sheetIds });
        setSheets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSheets();
  }, [sheetIds]);

  const calcRevenue = (imps, clicks, cpm, cpc) => {
    if (cpc > 0 && clicks > 0) return clicks * cpc;
    if (cpm > 0 && imps > 0) return (imps / 1000) * cpm;
    return (imps / 1000) * 1.5;
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontWeight: "700", marginBottom: "10px" }}>📊 Campaign Sheets Data</h2>

      {sheets.map((sheet, i) => {
        const allColumns = new Set();
        sheet.data.forEach(row => {
          Object.keys(row).forEach(key => allColumns.add(key.trim()));
        });
        const columns = [...allColumns];

        return (
          <div key={i}>
            <div style={sheetTitle}>📄 {sheet.name || `Sheet ${i + 1}`}</div>

            <div style={tableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx} style={thStyle}>{col}</th>
                    ))}
                    <th style={thStyle}>Revenue ($)</th>
                  </tr>
                </thead>

                <tbody>
                  {sheet.data.map((row, idx) => {
                    const clean = {};
                    Object.keys(row).forEach(k => clean[k.trim()] = row[k]);

                    const imps = Number(clean.Impressions || 0);
                    const clicks = Number(clean.Clicks || 0);
                    const cpm = Number(clean.CPM || 0);
                    const cpc = Number(clean.CPC || 0);

                    const revenue = calcRevenue(imps, clicks, cpm, cpc);

                    const rowStyle = idx % 2 === 0 ? tdStyle : tdAltStyle;

                    return (
                      <tr key={idx}>
                        {columns.map((col, cIdx) => (
                          <td key={cIdx} style={rowStyle}>
                            {clean[col] !== undefined ? clean[col] : "-"}
                          </td>
                        ))}
                        <td style={rowStyle}>${revenue.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {sheets.length === 0 && (
        <p>No sheet data found!</p>
      )}
    </div>
  );
};

export default ViewUploads;
