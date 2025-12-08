import React from "react";
import {
  AlertTriangle,
  Clock,
  FileWarning,
  UserCheck,
  Ship,
  Calendar,
} from "lucide-react";
import type { Candidate } from "../../types";

interface Alert {
  id: string;
  type: "document" | "medical" | "roster" | "interview" | "deployment";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  candidate?: Candidate;
  dueDate?: string;
  actionRequired?: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  onAlertClick?: (alert: Alert) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAlertClick }) => {
  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "document":
        return <FileWarning className="h-5 w-5" />;
      case "medical":
        return <FileWarning className="h-5 w-5" />;
      case "roster":
        return <Ship className="h-5 w-5" />;
      case "interview":
        return <UserCheck className="h-5 w-5" />;
      case "deployment":
        return <Calendar className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getSeverityText = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
    }
  };

  const mockAlerts: Alert[] = [
    {
      id: "1",
      type: "document",
      severity: "high",
      title: "Medical Certificates Expiring",
      description:
        "5 crew members have medical certificates expiring within 30 days",
      dueDate: "2024-02-15",
      actionRequired: true,
    },
    {
      id: "2",
      type: "roster",
      severity: "high",
      title: "Critical Position Vacancy",
      description: "Chief Engineer required for MS Atlantic Star by Feb 15",
      dueDate: "2024-02-15",
      actionRequired: true,
    },
    {
      id: "3",
      type: "interview",
      severity: "medium",
      title: "Interviews Scheduled Today",
      description: "3 technical interviews scheduled for today",
      actionRequired: false,
    },
    {
      id: "4",
      type: "deployment",
      severity: "medium",
      title: "Deployment Documents Pending",
      description: "Joining instructions for 2 crew members awaiting approval",
      actionRequired: true,
    },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          Priority Alerts
        </h3>
        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
          {displayAlerts.length} alerts
        </span>
      </div>

      <div className="space-y-4">
        {displayAlerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onAlertClick?.(alert)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${getSeverityColor(
              alert.severity
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    alert.severity === "high"
                      ? "bg-red-100 text-red-600"
                      : alert.severity === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {getIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        alert.severity === "high"
                          ? "bg-red-200 text-red-800"
                          : alert.severity === "medium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {getSeverityText(alert.severity)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.description}
                  </p>
                  {alert.candidate && (
                    <div className="flex items-center mt-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">
                        {alert.candidate.firstName} {alert.candidate.lastName}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {alert.candidate.rank}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {alert.actionRequired && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                  Action Required
                </span>
              )}
            </div>

            {alert.dueDate && (
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                Due: {new Date(alert.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {displayAlerts.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No active alerts</p>
          <p className="text-sm text-gray-500 mt-1">
            All systems are operating normally
          </p>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
