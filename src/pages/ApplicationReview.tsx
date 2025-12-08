import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  Eye,
} from "lucide-react";
import { useCandidateStore } from "../store";
import StatusTag from "../components/common/StatusTag";
import DocumentUpload from "../components/common/DocumentUpload";

const ApplicationReview: React.FC = () => {
  const { candidates, updateCandidate } = useCandidateStore();
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[2]);
  const [verificationNotes, setVerificationNotes] = useState("");

  const documents = [
    {
      type: "COC",
      name: "Certificate of Competency",
      status: "Valid",
      expiry: "2025-12-31",
    },
    {
      type: "Medical",
      name: "MLC Medical Certificate",
      status: "Valid",
      expiry: "2024-06-30",
    },
    {
      type: "Passport",
      name: "Passport",
      status: "Pending Renewal",
      expiry: "2024-03-15",
    },
    {
      type: "SEA",
      name: "Seafarers Employment Agreement",
      status: "Under Review",
      expiry: "",
    },
  ];

  const handleVerification = (status: "Approved" | "Rejected" | "On Hold") => {
    if (selectedCandidate) {
      updateCandidate(selectedCandidate.id, { status });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Application Review & Verification
        </h1>
        <p className="text-gray-600">
          Scrutinize candidate applications and verify documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedCandidate?.firstName} {selectedCandidate?.lastName}
                </h2>
                <p className="text-gray-600">{selectedCandidate?.rank}</p>
              </div>
              <StatusTag status={selectedCandidate?.status || "In Review"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Nationality</label>
                    <p className="font-medium">
                      {selectedCandidate?.nationality}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Contact</label>
                    <p className="font-medium">{selectedCandidate?.phone}</p>
                    <p className="text-sm text-gray-600">
                      {selectedCandidate?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Application Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Source</label>
                    <p className="font-medium">{selectedCandidate?.source}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Applied Date
                    </label>
                    <p className="font-medium">
                      {new Date(
                        selectedCandidate?.dateApplied || ""
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Availability
                    </label>
                    <p className="font-medium">
                      {new Date(
                        selectedCandidate?.availabilityDate || ""
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Document Verification
              </h3>
              <div className="space-y-3">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {doc.expiry && (
                        <span className="text-sm text-gray-500">
                          Expires: {new Date(doc.expiry).toLocaleDateString()}
                        </span>
                      )}
                      <StatusTag status={doc.status} type="document" />
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4">Verification Notes</h3>
              <textarea
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                className="w-full h-32 border-gray-300 rounded-md"
                placeholder="Add verification notes, observations, or requirements..."
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleVerification("Rejected")}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Application
              </button>
              <button
                onClick={() => handleVerification("On Hold")}
                className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 flex items-center"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Put On Hold
              </button>
              <button
                onClick={() => handleVerification("Approved")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve & Forward to FPD
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Technical Fit Assessment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vessel Type Experience
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Container</span>
                    <span className="text-green-600">5 years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tanker</span>
                    <span className="text-yellow-600">2 years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>LNG</span>
                    <span className="text-red-600">No experience</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Certifications
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Advanced Firefighting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">GMDSS General Operator</span>
                  </div>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm">LNG Endorsement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Document Upload</h3>
            <DocumentUpload
              onUpload={(files) =>
                console.log("Uploading additional docs:", files)
              }
            />
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Review Queue</h3>
            <div className="space-y-3">
              {candidates
                .filter((c) => c.status === "In Review")
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedCandidate?.id === candidate.id
                        ? "border-maritime-blue bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {candidate.firstName} {candidate.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {candidate.rank}
                        </p>
                      </div>
                      <StatusTag status={candidate.status} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReview;
