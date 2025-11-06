

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
import MainDashboard from "./AdvertiserPanelPagesComponents/RealDashBoard";
import OTTReport from "./AdvertiserPanelPagesComponents/OttReport";
import VideoReport from "./AdvertiserPanelPagesComponents/NewVideoReport";
import AdWidget from "./AdvertiserPanelPagesComponents/Advertise";
import SummaryReport from "./AdvertiserPanelPagesComponents/Summary";
import Signup from "./LoginAndSignupPages/Signup";
import Login from "./LoginAndSignupPages/Login";
import AdminPanel from "./AdminPanelPagesComponents/AdminPanel";

// import PublisherPanel from "../PublisherPanelPagesComponents/PublisherPanel";
import AdvertiserPanel from "./AdvertiserPanelPagesComponents/AdvertiserPanel";
import ViewUploads from "./PublisherPanelPagesComponents/ViewUploads";
import DownloadSheets from "./PublisherPanelPagesComponents/DownloadSheets";import PublisherPanel from "./PublisherPanelPagesComponents/PublisherPanel";
import PublisherEarnings from "./PublisherPanelPagesComponents/PublisherLevelEarnings";


// import PublisherEarnings from "../PublisherPanelPagesComponents/PublisherLevelEarnings";
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

                                                                                    <Route path="/viewuploads" element={<ViewUploads/>}></Route>

                                                    

<Route path="/downloadsheets" element={<DownloadSheets/>}></Route>
<Route path="/publisherlevelearnings" element={<PublisherEarnings/>}></Route>
             

        </Routes>
      </div>
    </div>
  );
}
