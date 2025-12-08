import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { Document } from "../../types";
import StatusTag from "../common/StatusTag";
import {
  getDaysRemaining,
  isExpiringSoon,
  isExpired,
} from "../../utils/dateUtils";

interface DocumentPreviewProps {
  document: Document;
  onDownload?: () => void;
  onView?: () => void;
  onStatusChange?: (status: Document["status"]) => void;
  showActions?: boolean;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onDownload,
  onView,
  onStatusChange,
  showActions = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconColor = () => {
    switch (document.status) {
      case "Valid":
        return "text-green-500";
      case "Expired":
        return "text-red-500";
      case "Pending Renewal":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = () => {
    switch (document.status) {
      case "Valid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Expired":
        return <X className="h-5 w-5 text-red-500" />;
      case "Pending Renewal":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const daysRemaining = document.expiryDate
    ? getDaysRemaining(document.expiryDate)
    : null;
  const expiringSoon = document.expiryDate
    ? isExpiringSoon(document.expiryDate)
    : false;
  const expired = document.expiryDate ? isExpired(document.expiryDate) : false;

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 ${
        isHovered ? "shadow-md border-gray-300" : "border-gray-200"
      } ${expired ? "bg-red-50" : expiringSoon ? "bg-yellow-50" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${getIconColor()} bg-opacity-10`}>
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{document.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{document.type}</p>
            <div className="flex items-center mt-2 space-x-4">
              <StatusTag status={document.status} type="document" />
              {document.expiryDate && (
                <span
                  className={`text-sm ${
                    expired
                      ? "text-red-600"
                      : expiringSoon
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  Expires: {new Date(document.expiryDate).toLocaleDateString()}
                  {daysRemaining && (
                    <span className="ml-1">
                      ({daysRemaining} {daysRemaining === 1 ? "day" : "days"}{" "}
                      left)
                    </span>
                  )}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Uploaded: {new Date(document.uploadedDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          {getStatusIcon()}
          {showActions && (
            <div
              className={`flex space-x-2 transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {onView && (
                <button
                  onClick={onView}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="View document"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
              )}
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Download document"
                >
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {onStatusChange && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Update status:</span>
            <div className="flex space-x-2">
              {["Valid", "Pending Renewal", "Expired"].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status as Document["status"])}
                  className={`px-3 py-1 text-xs rounded-lg ${
                    document.status === status
                      ? "bg-maritime-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
