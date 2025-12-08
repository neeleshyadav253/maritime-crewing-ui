import React, { useState } from "react";
import { Search, Upload, Filter, ExternalLink, UserPlus } from "lucide-react";
import { useCandidateStore } from "../store";
import CandidateCard from "../components/candidate/CandidateCard";
import DocumentUpload from "../components/common/DocumentUpload";
import DataTable, { type Column } from "../components/common/DataTable";
import StatusTag from "../components/common/StatusTag";
import type { Candidate } from "../types";

const CandidateSourcing: React.FC = () => {
  const { filters, setFilters, getFilteredCandidates } = useCandidateStore();
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = getFilteredCandidates().filter(
    (candidate) =>
      `${candidate.firstName} ${candidate.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      candidate.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ⚠ Fully typed → no build error
  const tableColumns: Column<Candidate>[] = [
    {
      key: "firstName",
      label: "Name",
      render: (_, item) => `${item.firstName} ${item.lastName}`,
    },
    { key: "rank", label: "Rank" },
    { key: "nationality", label: "Nationality" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusTag status={value as string} />,
    },
    { key: "source", label: "Source" },
    {
      key: "dateApplied",
      label: "Applied",
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Candidate Sourcing
          </h1>
          <p className="text-gray-600">
            Discover and onboard new maritime professionals
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <UserPlus className="h-4 w-4 mr-2" /> Add Candidate
          </button>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="btn-secondary flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" /> Bulk Upload
          </button>
        </div>
      </div>

      {showUpload && (
        <div className="card">
          <h3 className="font-semibold mb-4">Bulk Upload CVs</h3>
          <DocumentUpload
            onUpload={(files) => console.log("Uploading:", files)}
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>Supported portals: LinkedIn, Nautilus, Sea-Crews, Crewtoo</p>
            <div className="flex space-x-4 mt-2">
              <a className="text-maritime-blue hover:underline flex items-center">
                <ExternalLink className="h-3 w-3 mr-1" /> Portal Integration
              </a>
              <a className="text-maritime-blue hover:underline flex items-center">
                <ExternalLink className="h-3 w-3 mr-1" /> Agent Network
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ---- FILTER PANEL ---- */}
        <div className="lg:col-span-1">
          <div className="card space-y-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </h3>

            <select
              className="w-full border-gray-300 rounded-md"
              value={filters.rank}
              onChange={(e) => setFilters({ rank: e.target.value })}
            >
              <option value="">All Ranks</option>
              <option value="Captain">Captain</option>
              <option value="Chief Officer">Chief Officer</option>
              <option value="Chief Engineer">Chief Engineer</option>
              <option value="Rating">Rating</option>
            </select>

            <select
              className="w-full border-gray-300 rounded-md"
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Available">Available</option>
            </select>

            <select
              className="w-full border-gray-300 rounded-md"
              value={filters.source}
              onChange={(e) => setFilters({ source: e.target.value })}
            >
              <option value="">All Sources</option>
              <option value="Portal">Portal</option>
              <option value="Agent">Agent</option>
              <option value="Direct Application">Direct Application</option>
              <option value="Reference">Reference</option>
            </select>
          </div>
        </div>

        {/* ---- TABLE + CARDS ---- */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* search */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 border rounded-lg"
                placeholder="Search candidates..."
              />
            </div>

            {/* TABLE */}
            <DataTable
              data={filteredCandidates}
              columns={tableColumns}
              onRowClick={(candidate) => console.log("Selected:", candidate)}
            />

            {/* CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {filteredCandidates.slice(0, 4).map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onClick={() => console.log("View candidate:", candidate.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSourcing;
