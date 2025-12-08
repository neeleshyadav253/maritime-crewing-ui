import React, { useState } from "react";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  FileText,
  Star,
} from "lucide-react";
import { useCandidateStore } from "../store";
import StatusTag from "../components/common/StatusTag";
import DataTable from "../components/common/DataTable";

const Interviews: React.FC = () => {
  const { candidates } = useCandidateStore();
  const [selectedInterviewType, setSelectedInterviewType] = useState<
    "all" | "scheduled" | "completed" | "pending"
  >("all");
  const [newInterview, setNewInterview] = useState({
    candidateId: "",
    type: "Technical",
    date: "",
    time: "",
    interviewer: "",
    mode: "Video",
  });

  const interviews = [
    {
      id: "1",
      candidate: candidates[2],
      type: "Technical",
      date: "2024-01-22",
      time: "14:00",
      interviewer: "Capt. James Wilson",
      mode: "Video",
      result: "Passed",
      status: "completed",
    },
    {
      id: "2",
      candidate: candidates[0],
      type: "HR",
      date: "2024-01-25",
      time: "10:30",
      interviewer: "Sarah Johnson",
      mode: "In-person",
      result: "Pending",
      status: "scheduled",
    },
    {
      id: "3",
      candidate: candidates[1],
      type: "Final",
      date: "2024-01-23",
      time: "15:45",
      interviewer: "Fleet Manager",
      mode: "Phone",
      result: "Scheduled",
      status: "scheduled",
    },
  ];

  const filteredInterviews = interviews.filter(
    (interview) =>
      selectedInterviewType === "all" ||
      interview.status === selectedInterviewType
  );

  const referenceChecks = [
    {
      candidate: candidates[0],
      referee: "Capt. Robert Brown",
      company: "Oceanic Lines",
      contact: "+1 234 567 8901",
      status: "Completed",
      rating: 4.5,
    },
    {
      candidate: candidates[1],
      referee: "Chief Engineer Lee",
      company: "Global Tankers",
      contact: "+65 9876 5432",
      status: "Pending",
      rating: null,
    },
  ];

  const columns = [
    {
      key: "candidate",
      label: "Candidate",
      render: (value) => `${value.firstName} ${value.lastName}`,
    },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            value === "Technical"
              ? "bg-blue-100 text-blue-800"
              : value === "HR"
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date & Time",
      render: (_, item) =>
        `${new Date(item.date).toLocaleDateString()} ${item.time}`,
    },
    { key: "interviewer", label: "Interviewer" },
    {
      key: "mode",
      label: "Mode",
      render: (value) => (
        <span className="flex items-center">
          {value === "Video" ? (
            <Video className="h-4 w-4 mr-1" />
          ) : value === "Phone" ? (
            <Phone className="h-4 w-4 mr-1" />
          ) : (
            <MapPin className="h-4 w-4 mr-1" />
          )}
          {value}
        </span>
      ),
    },
    {
      key: "result",
      label: "Result",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            value === "Passed"
              ? "bg-green-100 text-green-800"
              : value === "Failed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusTag status={value} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Interviews & Assessment
        </h1>
        <p className="text-gray-600">
          Schedule interviews, record results, and conduct reference checks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Interview Schedule
              </h2>
              <div className="flex space-x-2">
                <button className="btn-secondary">Export Schedule</button>
                <button className="btn-primary flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              {["all", "scheduled", "completed", "pending"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedInterviewType(type as any)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedInterviewType === type
                      ? "bg-maritime-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <DataTable
              data={filteredInterviews}
              columns={columns}
              onRowClick={(interview) =>
                console.log("Interview details:", interview)
              }
            />
          </div>

          <div className="card mt-6">
            <h3 className="font-semibold mb-4">Schedule New Interview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Candidate
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md"
                    value={newInterview.candidateId}
                    onChange={(e) =>
                      setNewInterview({
                        ...newInterview,
                        candidateId: e.target.value,
                      })
                    }
                  >
                    <option value="">Choose candidate...</option>
                    {candidates.map((candidate) => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.firstName} {candidate.lastName} -{" "}
                        {candidate.rank}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type
                  </label>
                  <select
                    className="w-full border-gray-300 rounded-md"
                    value={newInterview.type}
                    onChange={(e) =>
                      setNewInterview({ ...newInterview, type: e.target.value })
                    }
                  >
                    <option value="Technical">Technical Assessment</option>
                    <option value="HR">HR Interview</option>
                    <option value="Final">Final Interview</option>
                    <option value="Reference">Reference Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interviewer
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md"
                    value={newInterview.interviewer}
                    onChange={(e) =>
                      setNewInterview({
                        ...newInterview,
                        interviewer: e.target.value,
                      })
                    }
                    placeholder="Enter interviewer name"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full border-gray-300 rounded-md"
                    value={newInterview.date}
                    onChange={(e) =>
                      setNewInterview({ ...newInterview, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full border-gray-300 rounded-md"
                    value={newInterview.time}
                    onChange={(e) =>
                      setNewInterview({ ...newInterview, time: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode
                  </label>
                  <div className="flex space-x-4">
                    {["Video", "Phone", "In-person"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() =>
                          setNewInterview({ ...newInterview, mode })
                        }
                        className={`px-4 py-2 rounded-lg flex-1 ${
                          newInterview.mode === mode
                            ? "bg-maritime-blue text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn-primary px-6">Schedule Interview</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Today's Interviews
            </h3>
            <div className="space-y-3">
              {interviews
                .filter(
                  (i) => i.date === new Date().toISOString().split("T")[0]
                )
                .map((interview) => (
                  <div key={interview.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {interview.candidate.firstName}{" "}
                          {interview.candidate.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {interview.type} Interview
                        </p>
                      </div>
                      <StatusTag status={interview.status} />
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {interview.time}
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 mr-1" />
                        {interview.interviewer}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Reference Checks</h3>
            <div className="space-y-4">
              {referenceChecks.map((check, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">
                        {check.candidate.firstName} {check.candidate.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{check.referee}</p>
                      <p className="text-xs text-gray-500">{check.company}</p>
                    </div>
                    <StatusTag status={check.status} />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Contact: {check.contact}
                    </p>
                    {check.rating && (
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(check.rating!)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {check.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Assessment Results</h3>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Technical Knowledge</span>
                  <span className="font-bold text-green-700">85%</span>
                </div>
                <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Communication Skills</span>
                  <span className="font-bold text-yellow-700">72%</span>
                </div>
                <div className="mt-2 h-2 bg-yellow-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-600"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Safety Awareness</span>
                  <span className="font-bold text-blue-700">91%</span>
                </div>
                <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: "91%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
