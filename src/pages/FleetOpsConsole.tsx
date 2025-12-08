import React, { useState } from "react";
import {
  Calendar,
  Ship,
  Users,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { useVesselStore } from "../store";
import StatusTag from "../components/common/StatusTag";

const FleetOpsConsole: React.FC = () => {
  const { vessels } = useVesselStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"roster" | "calendar" | "planning">(
    "roster"
  );

  const upcomingReliefs = [
    {
      id: "1",
      name: "John Smith",
      rank: "Captain",
      vessel: "MS Atlantic Star",
      date: "2024-02-15",
    },
    {
      id: "2",
      name: "Maria Garcia",
      rank: "Chief Engineer",
      vessel: "Tanker Prosperity",
      date: "2024-03-01",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Fleet Operations Console
          </h1>
          <p className="text-gray-600">
            Manage crew rotations, vessel assignments, and roster planning
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setView("roster")}
            className={`px-4 py-2 rounded-lg ${
              view === "roster" ? "bg-maritime-blue text-white" : "bg-gray-100"
            }`}
          >
            Roster View
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-lg ${
              view === "calendar"
                ? "bg-maritime-blue text-white"
                : "bg-gray-100"
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setView("planning")}
            className={`px-4 py-2 rounded-lg ${
              view === "planning"
                ? "bg-maritime-blue text-white"
                : "bg-gray-100"
            }`}
          >
            Planning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Ship className="h-5 w-5 mr-2" />
                Vessel Overview
              </h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {vessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{vessel.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vessel.nextPort} • ETA:{" "}
                        {new Date(vessel.eta).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {vessel.type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-700 mb-2">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Required Positions:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {vessel.requiredPositions.map((pos, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {pos.rank} • {pos.status}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      IMO: {vessel.imo} • {vessel.company}
                    </div>
                    <button className="text-maritime-blue hover:text-maritime-darkBlue flex items-center text-sm">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-6">
            <h2 className="text-lg font-semibold mb-4">
              Crew Rotation Calendar
            </h2>
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Calendar view for crew rotations
                </p>
                <p className="text-sm text-gray-500">
                  Interactive calendar showing sign-on/off dates
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Reliefs
            </h3>
            <div className="space-y-3">
              {upcomingReliefs.map((relief) => (
                <div key={relief.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{relief.name}</p>
                      <p className="text-sm text-gray-600">{relief.rank}</p>
                    </div>
                    <StatusTag status="Scheduled" />
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{relief.vessel}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(relief.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Reliever Planning</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Find Replacement For
                </label>
                <select className="w-full border-gray-300 rounded-md">
                  <option>Select Crew Member</option>
                  <option>John Smith - Captain</option>
                  <option>Maria Garcia - Chief Engineer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Availability Date
                </label>
                <input
                  type="date"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <button className="w-full btn-primary">
                Find Suitable Relievers
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Vessel Suitability Matrix</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>MS Atlantic Star</span>
                <span className="text-green-600">✓ Suitable</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tanker Prosperity</span>
                <span className="text-yellow-600">Needs Certification</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bulk Carrier Oceanic</span>
                <span className="text-red-600">Not Suitable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetOpsConsole;
