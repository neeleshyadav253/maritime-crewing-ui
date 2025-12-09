import React from "react";
import { NavLink } from "react-router-dom";
import {
  Ship,
  Users,
  Phone,
  FileCheck,
  Calendar,
  User,
  ClipboardCheck,
  Send,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const navItems = [
    { path: "/", icon: Ship, label: "Dashboard" },
    { path: "/sourcing", icon: Users, label: "Candidate Sourcing" },
    { path: "/outreach", icon: Phone, label: "Outreach & Calling" },
    { path: "/review", icon: FileCheck, label: "Application Review" },
    { path: "/fleet-ops", icon: Calendar, label: "Fleet Ops Console" },
    { path: "/profile", icon: User, label: "Candidate Profile" },
    { path: "/interviews", icon: ClipboardCheck, label: "Interviews" },
    { path: "/deployment", icon: Send, label: "Deployment" },
    { path: "/crewPlanning", icon: Ship, label: "Crew Planning Sheet" },
    {
      path: "/seafarer-debriefing",
      icon: ClipboardCheck,
      label: "Seafarer Debriefing",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen text-white bg-maritime-darkBlue">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Ship className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Maritime Crewing</h1>
            <p className="text-sm text-blue-200">Management System</p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium hover:bg-blue-800 transition-colors ${
                isActive ? "bg-blue-900 border-r-4 border-white" : ""
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-6 border-t border-blue-800">
        <div className="text-sm">
          <p className="text-blue-200">Active Crew Members</p>
          <p className="mt-1 text-2xl font-bold">1,247</p>
          <p className="mt-2 text-xs text-blue-300">Last updated: Today</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
