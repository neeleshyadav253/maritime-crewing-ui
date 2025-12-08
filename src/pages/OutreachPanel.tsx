import React, { useState } from "react";
import {
  Phone,
  PhoneOutgoing,
  PhoneMissed,
  PhoneIncoming,
  Clock,
  MessageSquare,
  Filter,
  Download,
  User,
  Calendar,
} from "lucide-react";
import { useCandidateStore } from "../store";
import StatusTag from "../components/common/StatusTag";
import DataTable from "../components/common/DataTable";

const OutreachPanel: React.FC = () => {
  const { candidates } = useCandidateStore();
  const [selectedCallType, setSelectedCallType] = useState<
    "all" | "contacted" | "no-answer" | "callback"
  >("all");
  const [notes, setNotes] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  const callLogs = [
    {
      id: "1",
      candidate: candidates[0],
      date: "2024-01-20 10:30",
      duration: "15:30",
      type: "outgoing",
      outcome: "Contacted",
      agent: "Sarah Johnson",
    },
    {
      id: "2",
      candidate: candidates[1],
      date: "2024-01-20 14:15",
      duration: "5:45",
      type: "outgoing",
      outcome: "No Answer",
      agent: "Mike Chen",
    },
    {
      id: "3",
      candidate: candidates[2],
      date: "2024-01-19 16:20",
      duration: "22:10",
      type: "incoming",
      outcome: "Call Back",
      agent: "Emma Davis",
    },
    {
      id: "4",
      candidate: candidates[3],
      date: "2024-01-19 11:45",
      duration: "18:30",
      type: "outgoing",
      outcome: "Contacted",
      agent: "Sarah Johnson",
    },
  ];

  const filteredLogs = callLogs.filter(
    (log) => selectedCallType === "all" || log.outcome === selectedCallType
  );

  const conversionStats = {
    totalCalls: 156,
    contacted: 89,
    converted: 42,
    conversionRate: "26.9%",
  };

  const columns = [
    {
      key: "candidate",
      label: "Candidate",
      render: (value) => `${value.firstName} ${value.lastName}`,
    },
    { key: "date", label: "Date & Time" },
    { key: "duration", label: "Duration" },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "outgoing"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value === "outgoing" ? "Outgoing" : "Incoming"}
        </span>
      ),
    },
    {
      key: "outcome",
      label: "Outcome",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "Contacted"
              ? "bg-green-100 text-green-800"
              : value === "No Answer"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "agent", label: "Agent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Outreach & Calling Panel
        </h1>
        <p className="text-gray-600">
          Manage candidate communication and track conversion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-3">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Call Logs
              </h2>
              <div className="flex space-x-2">
                <button className="btn-secondary flex items-center text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </button>
                <button className="btn-primary flex items-center text-sm">
                  <PhoneOutgoing className="h-4 w-4 mr-2" />
                  New Call
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              {["all", "contacted", "no-answer", "callback"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedCallType(type as any)}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    selectedCallType === type
                      ? "bg-maritime-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type === "contacted" && <Phone className="h-4 w-4 mr-2" />}
                  {type === "no-answer" && (
                    <PhoneMissed className="h-4 w-4 mr-2" />
                  )}
                  {type === "callback" && (
                    <PhoneIncoming className="h-4 w-4 mr-2" />
                  )}
                  {type === "all"
                    ? "All Calls"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <DataTable
              data={filteredLogs}
              columns={columns}
              onRowClick={(log) => setSelectedCandidate(log.candidate)}
            />
          </div>

          <div className="card mt-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Call Notes & Follow-up
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes from conversation with {selectedCandidate.firstName}{" "}
                  {selectedCandidate.lastName}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-32 border-gray-300 rounded-md"
                  placeholder="Record key points, candidate interest level, follow-up requirements..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Follow-up Date
                  </label>
                  <input
                    type="date"
                    className="w-full border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Type
                  </label>
                  <select className="w-full border-gray-300 rounded-md">
                    <option>Phone Call</option>
                    <option>Email</option>
                    <option>SMS</option>
                    <option>WhatsApp</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary">
                  Save Notes & Schedule Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Conversion Tracking</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Calls</span>
                  <span className="text-2xl font-bold">
                    {conversionStats.totalCalls}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Contacted</span>
                  <span className="text-2xl font-bold">
                    {conversionStats.contacted}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{
                      width: `${
                        (conversionStats.contacted /
                          conversionStats.totalCalls) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Converted to Applications
                  </span>
                  <span className="text-2xl font-bold">
                    {conversionStats.converted}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600"
                    style={{
                      width: `${
                        (conversionStats.converted /
                          conversionStats.contacted) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-2xl font-bold">
                    {conversionStats.conversionRate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Today's Call Schedule</h3>
            <div className="space-y-3">
              {[
                {
                  time: "10:00 AM",
                  name: "John Smith",
                  rank: "Captain",
                  status: "scheduled",
                },
                {
                  time: "2:30 PM",
                  name: "Maria Garcia",
                  rank: "Chief Engineer",
                  status: "completed",
                },
                {
                  time: "4:00 PM",
                  name: "Raj Patel",
                  rank: "2nd Officer",
                  status: "pending",
                },
              ].map((call, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{call.time}</p>
                      <p className="text-sm">{call.name}</p>
                      <p className="text-xs text-gray-500">{call.rank}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        call.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : call.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Quick Dial</h3>
            <div className="space-y-3">
              {candidates.slice(0, 3).map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-maritime-blue rounded-full flex items-center justify-center text-white text-sm mr-3">
                      {candidate.firstName[0]}
                      {candidate.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {candidate.firstName} {candidate.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{candidate.rank}</p>
                    </div>
                  </div>
                  <button className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachPanel;
