import React, { useState } from "react";
import {
  User,
  Briefcase,
  Award,
  FileText,
  Globe,
  Calendar,
  Phone,
  Mail,
  Download,
  Edit,
  Plus,
} from "lucide-react";
import { useCandidateStore } from "../store";
import StatusTag from "../components/common/StatusTag";
import DocumentUpload from "../components/common/DocumentUpload";

const CandidateProfile: React.FC = () => {
  const { candidates } = useCandidateStore();
  const [selectedCandidate] = useState(candidates[0]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "service" | "training"
  >("overview");

  const seaService = [
    {
      vessel: "MS Ocean King",
      type: "Container",
      rank: "Captain",
      company: "Oceanic Lines",
      from: "2022-01-15",
      to: "2023-06-30",
      days: 532,
    },
    {
      vessel: "Tanker Victory",
      type: "Tanker",
      rank: "Chief Officer",
      company: "Global Tankers",
      from: "2020-03-01",
      to: "2021-12-31",
      days: 670,
    },
    {
      vessel: "Bulk Carrier Atlas",
      type: "Bulk Carrier",
      rank: "Second Officer",
      company: "Maritime Co.",
      from: "2018-08-15",
      to: "2020-02-28",
      days: 563,
    },
  ];

  const trainingHistory = [
    {
      course: "Advanced Fire Fighting",
      provider: "Maritime Academy",
      date: "2023-05-15",
      expiry: "2025-05-15",
      status: "Valid",
    },
    {
      course: "Medical First Aid",
      provider: "Seafarers Training",
      date: "2023-03-20",
      expiry: "2025-03-20",
      status: "Valid",
    },
    {
      course: "GMDSS General Operator",
      provider: "Radio College",
      date: "2022-11-10",
      expiry: "2024-11-10",
      status: "Valid",
    },
    {
      course: "Security Awareness",
      provider: "Maritime Security",
      date: "2023-01-15",
      expiry: "2025-01-15",
      status: "Valid",
    },
  ];

  const medicalHistory = [
    {
      type: "MLC Medical",
      date: "2023-06-15",
      expiry: "2024-06-15",
      status: "Valid",
      doctor: "Dr. James Wilson",
    },
    {
      type: "Yellow Fever",
      date: "2022-12-01",
      expiry: "2032-12-01",
      status: "Valid",
      doctor: "Travel Clinic",
    },
    {
      type: "COVID-19 Vaccination",
      date: "2023-01-20",
      expiry: "",
      status: "Complete",
      doctor: "Public Health",
    },
  ];

  const totalSeaDays = seaService.reduce(
    (sum, service) => sum + service.days,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Candidate Profile</h1>
        <p className="text-gray-600">
          Complete profile with documents, sea service, and training history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-maritime-blue rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {selectedCandidate.firstName[0]}
                {selectedCandidate.lastName[0]}
              </div>
              <h2 className="text-xl font-bold">
                {selectedCandidate.firstName} {selectedCandidate.lastName}
              </h2>
              <p className="text-gray-600">{selectedCandidate.rank}</p>
              <StatusTag status={selectedCandidate.status} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Globe className="h-4 w-4 mr-3" />
                <span>{selectedCandidate.nationality}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-3" />
                <span>{selectedCandidate.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-3" />
                <span>{selectedCandidate.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-3" />
                <span>
                  Available:{" "}
                  {new Date(
                    selectedCandidate.availabilityDate
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full btn-secondary flex items-center justify-center text-sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
                <button className="w-full btn-primary flex items-center justify-center text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </button>
                <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center text-sm hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Profile
                </button>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <h3 className="font-semibold mb-4">Medical Validity</h3>
            <div className="space-y-3">
              {medicalHistory.map((medical, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{medical.type}</p>
                      <p className="text-xs text-gray-500">
                        Dr. {medical.doctor}
                      </p>
                    </div>
                    <StatusTag status={medical.status} type="medical" />
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Issued:</span>
                      <span>{new Date(medical.date).toLocaleDateString()}</span>
                    </div>
                    {medical.expiry && (
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span>
                          {new Date(medical.expiry).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card">
            <div className="border-b">
              <nav className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: User },
                  { id: "documents", label: "Documents", icon: FileText },
                  { id: "service", label: "Sea Service", icon: Briefcase },
                  { id: "training", label: "Training", icon: Award },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors flex items-center ${
                      activeTab === tab.id
                        ? "border-maritime-blue text-maritime-blue"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Career Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Sea Time</p>
                        <p className="text-2xl font-bold mt-1">
                          {totalSeaDays} days
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(totalSeaDays / 365).toFixed(1)} years
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Vessel Types</p>
                        <p className="text-2xl font-bold mt-1">3</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Container, Tanker, Bulk
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Companies</p>
                        <p className="text-2xl font-bold mt-1">3</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Diverse experience
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Recent Sea Service</h3>
                    <div className="space-y-3">
                      {seaService.slice(0, 2).map((service, idx) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">
                                {service.vessel}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {service.type} • {service.company}
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                              {service.rank}
                            </span>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Period</p>
                              <p className="font-medium">
                                {new Date(service.from).toLocaleDateString()} -{" "}
                                {new Date(service.to).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Duration</p>
                              <p className="font-medium">{service.days} days</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Document Management</h3>
                    <DocumentUpload
                      onUpload={(files) =>
                        console.log("Uploading documents:", files)
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        type: "COC",
                        name: "Certificate of Competency",
                        status: "Valid",
                        expiry: "2025-12-31",
                      },
                      {
                        type: "Passport",
                        name: "International Passport",
                        status: "Pending Renewal",
                        expiry: "2024-03-15",
                      },
                      {
                        type: "SEA",
                        name: "Seafarers Employment Agreement",
                        status: "Under Review",
                        expiry: "",
                      },
                      {
                        type: "CDC",
                        name: "Continuous Discharge Certificate",
                        status: "Valid",
                        expiry: "2026-01-31",
                      },
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-4" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-600">{doc.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {doc.expiry && (
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Expires</p>
                              <p className="font-medium">
                                {new Date(doc.expiry).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          <StatusTag status={doc.status} type="document" />
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "service" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Sea Service History</h3>
                    <button className="btn-primary flex items-center text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service Record
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Vessel
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Rank
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Company
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Period
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Days
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {seaService.map((service, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              {service.vessel}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                {service.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {service.rank}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {service.company}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(service.from).toLocaleDateString()} -{" "}
                              {new Date(service.to).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-semibold">
                              {service.days}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "training" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Training & Certifications</h3>
                    <button className="btn-primary flex items-center text-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Training Record
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trainingHistory.map((training, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{training.course}</h4>
                            <p className="text-sm text-gray-600">
                              {training.provider}
                            </p>
                          </div>
                          <StatusTag status={training.status} type="document" />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Completed</p>
                            <p className="font-medium">
                              {new Date(training.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expires</p>
                            <p className="font-medium">
                              {training.expiry
                                ? new Date(training.expiry).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card mt-6">
            <h3 className="font-semibold mb-4">Appraisal History</h3>
            <div className="space-y-4">
              {[
                {
                  vessel: "MS Ocean King",
                  date: "2023-06-20",
                  rating: 4.5,
                  remarks: "Excellent leadership and navigation skills",
                },
                {
                  vessel: "Tanker Victory",
                  date: "2021-12-15",
                  rating: 4.2,
                  remarks: "Strong technical knowledge, good team player",
                },
              ].map((appraisal, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{appraisal.vessel}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(appraisal.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(appraisal.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="ml-2 font-medium">
                        {appraisal.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {appraisal.remarks}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
