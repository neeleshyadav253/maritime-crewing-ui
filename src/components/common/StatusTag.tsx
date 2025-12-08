import React from "react";

interface StatusTagProps {
  status: string;
  type?: "candidate" | "document" | "medical";
}

const StatusTag: React.FC<StatusTagProps> = ({
  status,
  type = "candidate",
}) => {
  const getColor = () => {
    switch (type) {
      case "document":
        switch (status) {
          case "Valid":
            return "bg-green-100 text-green-800";
          case "Expired":
            return "bg-red-100 text-red-800";
          case "Pending Renewal":
            return "bg-yellow-100 text-yellow-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      case "medical":
        switch (status) {
          case "Valid":
            return "bg-green-100 text-green-800";
          case "Expiring":
            return "bg-yellow-100 text-yellow-800";
          case "Expired":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      default:
        switch (status) {
          case "Available":
            return "bg-green-100 text-green-800";
          case "Onboard":
            return "bg-blue-100 text-blue-800";
          case "In Review":
            return "bg-yellow-100 text-yellow-800";
          case "Approved":
            return "bg-emerald-100 text-emerald-800";
          case "Rejected":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusTag;
