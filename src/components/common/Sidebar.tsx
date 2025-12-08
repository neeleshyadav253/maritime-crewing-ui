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
  ];

  return (
    <div className="w-64 bg-maritime-darkBlue text-white h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <Ship className="h-8 w-8" />
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
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-6 border-t border-blue-800">
        <div className="text-sm">
          <p className="text-blue-200">Active Crew Members</p>
          <p className="text-2xl font-bold mt-1">1,247</p>
          <p className="text-xs text-blue-300 mt-2">Last updated: Today</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
