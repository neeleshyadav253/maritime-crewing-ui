import React from "react";
import type { Candidate } from "../../types";
import StatusTag from "../common/StatusTag";
import { Mail, Phone, Calendar, FileText } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  onClick?: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="card hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {candidate.firstName} {candidate.lastName}
          </h3>
          <p className="text-sm text-gray-600">{candidate.rank}</p>
        </div>
        <StatusTag status={candidate.status} />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          {candidate.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          {candidate.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Available from:{" "}
          {new Date(candidate.availabilityDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <StatusTag status={candidate.documentStatus} type="document" />
          <StatusTag status={candidate.medicalStatus} type="medical" />
        </div>
        <FileText className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default CandidateCard;
