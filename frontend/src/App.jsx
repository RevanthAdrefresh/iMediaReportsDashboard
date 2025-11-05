

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// import DailyReport from "./DailyReport";
// import VideoAdsReport from "./VideoOTT";
// import WidgetReport from "./ADWidget";
// import DisplayAndGenealogyReport from "./Display";
// import MainDashBoard from "./MainDashBoard";

// import DashboardView from "./ExcelDashboard";
// import UploadSheet from "./Uploadsheet";
import MainDashboard from "./RealDashBoard";
import OTTReport from "./OttReport";
import VideoReport from "./NewVideoReport";
import AdWidget from "./Advertise";
import SummaryReport from "./Summary";
import Signup from "./Signup";
import Login from "./Login";
import AdminPanel from "./AdminPanel";

import PublisherPanel from "./PublisherPanel";
import AdvertiserPanel from "./AdvertiserPanel";
// AdvertiserPanel
// import PublisherPanel from "./AdvertiserPanell";
// import AdvertiserPanel from "./PublisherPanel";

// MainDashBoard
export default function App() {
  return (
    <div style={{ display: "flex", background: "#f5f7fa" }}>
      {/* <Sidebar /> */}

      <div
        style={{
          marginLeft: "240px",
          padding: "30px",
          flexGrow: 1,
          minHeight: "100vh",
        }}
      >
        <Routes>

          {/* <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainDashBoard />} />
          // <Route path="/daily" element={<DailyReport />} />
          <Route path="/video" element={<VideoAdsReport />} />
          <Route path="/adw" element={<WidgetReport />} />
          <Route path="/display" element={<DisplayAndGenealogyReport />} />
          <Route path="/dashboard" element={<DashboardView/>}></Route>
          <Route path="/upload" element={<UploadSheet/>}></Route> */}
           <Route path="/signup" element={<Signup/>}></Route>
                      <Route path="/login" element={<Login/>}></Route>

          <Route path="/main" element={<MainDashboard/>}></Route>
           <Route path="/daily" element={<OTTReport/>}></Route>
            <Route path="/video" element={<VideoReport/>}></Route>
             <Route path="/adw" element={<AdWidget/>}></Route>
              <Route path="/overall" element={<SummaryReport/>}></Route>
                            <Route path="/adminpanel" element={<AdminPanel/>}></Route>
                                                        <Route path="/advertiserpanel" element={<AdvertiserPanel/>}></Route>
                                                                                    <Route path="/publisherpanel" element={<PublisherPanel/>}></Route>


                                                    


             

        </Routes>
      </div>
    </div>
  );
}
