import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const publisherData = [
  { name: "TechBurner Media", views: 120000, clicks: 3200, ctr: 2.6, revenue: 850 },
  { name: "FinanceWall", views: 98000, clicks: 2100, ctr: 2.1, revenue: 620 },
  { name: "Foodies Hub", views: 150000, clicks: 4800, ctr: 3.1, revenue: 1020 },
];

const advertiserData = [
  { name: "iMedia Ads", spend: 2000, impressions: 120000, conversions: 300, roi: 2.4 },
  { name: "AdBoosters", spend: 1500, impressions: 95000, conversions: 210, roi: 2.1 },
  { name: "ClickStream", spend: 2700, impressions: 160000, conversions: 420, roi: 2.8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState("publisher");

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f4f6;
          margin: 0;
          padding: 0;
        }

        .main {
          padding: 40px;
          max-width: 1200px;
          margin: auto;
        }

        .title {
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 25px;
          color: #111827;
          text-align: center;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 30px;
        }

        .tab-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 15px;
          transition: 0.3s;
        }

        .tab-btn.active {
          background-color: #10b981;
          color: white;
        }

        .tab-btn:not(.active) {
          background-color: #e5e7eb;
          color: #374151;
        }

        .tab-btn:not(.active):hover {
          background-color: #d1d5db;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .card {
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .card h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        th, td {
          border: 1px solid #e5e7eb;
          padding: 10px;
          text-align: left;
        }

        th {
          background-color: #f3f4f6;
        }

        tr:hover {
          background-color: #f9fafb;
        }

        .chart-container {
          height: 300px;
          width: 100%;
        }
      `}</style>

      <main className="main">
        <h2 className="title">Admin Analytics & Billing Dashboard</h2>

        {/* Tabs */}
        <div className="tabs">
          <button
            onClick={() => setActiveTab("publisher")}
            className={`tab-btn ${activeTab === "publisher" ? "active" : ""}`}
          >
            Publisher Performance
          </button>
          <button
            onClick={() => setActiveTab("advertiser")}
            className={`tab-btn ${activeTab === "advertiser" ? "active" : ""}`}
          >
            Advertiser Billing
          </button>
        </div>

        {/* Publisher Dashboard */}
        {activeTab === "publisher" && (
          <div className="grid">
            <div className="card">
              <h3>📊 Publisher Performance</h3>
              <table>
                <thead>
                  <tr>
                    <th>Publisher</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>CTR (%)</th>
                    <th>Revenue ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {publisherData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.views.toLocaleString()}</td>
                      <td>{item.clicks.toLocaleString()}</td>
                      <td>{item.ctr}</td>
                      <td>${item.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Revenue Distribution</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={publisherData}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      label
                    >
                      {publisherData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <h3>Views vs Clicks</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={publisherData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#0088FE" />
                    <Bar dataKey="clicks" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Advertiser Dashboard */}
        {activeTab === "advertiser" && (
          <div className="grid">
            <div className="card">
              <h3>💰 Advertiser Billing</h3>
              <table>
                <thead>
                  <tr>
                    <th>Advertiser</th>
                    <th>Spend ($)</th>
                    <th>Impressions</th>
                    <th>Conversions</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {advertiserData.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>${item.spend}</td>
                      <td>{item.impressions.toLocaleString()}</td>
                      <td>{item.conversions}</td>
                      <td>{item.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Spend Distribution</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={advertiserData}
                      dataKey="spend"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      label
                    >
                      {advertiserData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <h3>Impressions vs Conversions</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={advertiserData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="impressions" fill="#0088FE" />
                    <Bar dataKey="conversions" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
