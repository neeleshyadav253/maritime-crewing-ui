import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import Dashboard from "./pages/Dashboard";
import CandidateSourcing from "./pages/CandidateSourcing";
import OutreachPanel from "./pages/OutreachPanel";
import ApplicationReview from "./pages/ApplicationReview";
import FleetOpsConsole from "./pages/FleetOpsConsole";
import CandidateProfile from "./pages/CandidateProfile";
import Interviews from "./pages/Interviews";
import Deployment from "./pages/Deployment";
import CrewPlanningSheet from "./pages/CrewPlanningSheet";
import SeafarerDebriefing from "./pages/SeafarerDebriefing";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="p-6 pt-24 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sourcing" element={<CandidateSourcing />} />
          <Route path="/outreach" element={<OutreachPanel />} />
          <Route path="/review" element={<ApplicationReview />} />
          <Route path="/fleet-ops" element={<FleetOpsConsole />} />
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="/crewPlanning" element={<CrewPlanningSheet />} />
          <Route path="/seafarer-debriefing" element={<SeafarerDebriefing />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
