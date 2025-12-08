import React, { useState } from "react";
import {
  CheckCircle,
  FileText,
  Send,
  Printer,
  Download,
  ClipboardList,
} from "lucide-react";
import { useCandidateStore, useVesselStore } from "../store";
import StatusTag from "../components/common/StatusTag";

const Deployment: React.FC = () => {
  const { candidates } = useCandidateStore();
  const { vessels } = useVesselStore();
  const [selectedCandidate] = useState(candidates[0]);
  const [selectedVessel, setSelectedVessel] = useState(vessels[0]);

  const deploymentSteps = [
    { id: 1, name: "Final Approval", status: "complete" },
    { id: 2, name: "Vessel Assignment", status: "current" },
    { id: 3, name: "Travel Arrangements", status: "pending" },
    { id: 4, name: "Document Generation", status: "pending" },
    { id: 5, name: "Joining Instructions", status: "pending" },
  ];

  const joiningDocuments = [
    { name: "Letter of Employment", required: true, generated: true },
    { name: "Seafarers Employment Agreement", required: true, generated: true },
    { name: "Travel Itinerary", required: true, generated: false },
    { name: "Joining Instructions", required: true, generated: false },
    { name: "Medical Kit Requirements", required: false, generated: false },
  ];

  const handleGenerateDocuments = () => {
    console.log("Generating joining documents...");
    // setDeploymentStep(4);
  };

  const handleSendInstructions = () => {
    console.log("Sending joining instructions...");
    // setDeploymentStep(5);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Deployment Management
        </h1>
        <p className="text-gray-600">
          Final approval, vessel assignment, and joining instructions
        </p>
      </div>

      <div className="card">
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-8">
              {deploymentSteps.map((step) => (
                <li key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step.status === "complete"
                        ? "bg-green-100 text-green-600"
                        : step.status === "current"
                        ? "bg-maritime-blue text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="font-medium">{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`ml-3 font-medium ${
                      step.status === "current"
                        ? "text-maritime-blue"
                        : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </span>
                  {step.id < 5 && (
                    <div className="ml-8 h-0.5 w-16 bg-gray-200" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <ClipboardList className="h-5 w-5 mr-2" />
                Candidate Details
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </h4>
                    <p className="text-gray-600">{selectedCandidate.rank}</p>
                  </div>
                  <StatusTag status={selectedCandidate.status} />
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nationality:</span>
                    <span className="font-medium">
                      {selectedCandidate.nationality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Medical Status:</span>
                    <StatusTag
                      status={selectedCandidate.medicalStatus}
                      type="medical"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Documents:</span>
                    <StatusTag
                      status={selectedCandidate.documentStatus}
                      type="document"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Vessel Assignment</h3>
              <div className="space-y-4">
                {vessels.map((vessel) => (
                  <div
                    key={vessel.id}
                    onClick={() => setSelectedVessel(vessel)}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedVessel.id === vessel.id
                        ? "border-maritime-blue bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{vessel.name}</h4>
                        <p className="text-sm text-gray-600">
                          {vessel.type} • {vessel.company}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {vessel.nextPort}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Required Positions:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vessel.requiredPositions.map((pos, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded ${
                              pos.status === "Open"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {pos.rank}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Joining Documents
              </h3>
              <div className="space-y-3">
                {joiningDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          doc.generated ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.required ? "Required" : "Optional"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.generated ? (
                        <>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Printer className="h-4 w-4 text-gray-600" />
                          </button>
                        </>
                      ) : (
                        <button className="text-sm text-maritime-blue hover:text-maritime-darkBlue">
                          Generate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joining Port
                </label>
                <input
                  type="text"
                  defaultValue={selectedVessel.nextPort}
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Joining Date
                </label>
                <input
                  type="date"
                  className="w-full border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  className="w-full h-24 border-gray-300 rounded-md"
                  placeholder="Add any special instructions for the crew member..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button className="btn-secondary flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print All
              </button>
              <button
                onClick={handleGenerateDocuments}
                className="btn-primary flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Documents
              </button>
              <button
                onClick={handleSendInstructions}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Joining Instructions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;
