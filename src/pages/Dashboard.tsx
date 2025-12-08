import React from "react";
import {
  Users,
  UserPlus,
  AlertTriangle,
  Calendar,
  FileWarning,
  Ship,
  CheckCircle,
} from "lucide-react";
import MetricsCard from "../components/dashboard/MetricsCard";
import { useDashboardStore } from "../store";
import { useCandidateStore } from "../store";
import DataTable from "../components/common/DataTable";
import StatusTag from "../components/common/StatusTag";

const Dashboard: React.FC = () => {
  const { metrics } = useDashboardStore();
  const { candidates } = useCandidateStore();

  const recentCandidates = candidates.slice(0, 5);

  const columns = [
    {
      key: "firstName",
      label: "Name",
      render: (value: string, item) => `${item.firstName} ${item.lastName}`,
    },
    { key: "rank", label: "Rank" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusTag status={value} />,
    },
    { key: "source", label: "Source" },
    {
      key: "dateApplied",
      label: "Applied",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Maritime Crewing Dashboard
        </h1>
        <p className="text-gray-600">Overview of crew management operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Candidates"
          value={metrics.totalCandidates}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <MetricsCard
          title="Sourced Today"
          value={metrics.sourcedToday}
          icon={UserPlus}
          color="green"
        />
        <MetricsCard
          title="Expiring Documents"
          value={metrics.expiringDocuments}
          icon={FileWarning}
          color="red"
        />
        <MetricsCard
          title="Roster Alerts"
          value={metrics.rosterAlerts}
          icon={AlertTriangle}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recent Candidates</h2>
            <DataTable data={recentCandidates} columns={columns} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Priority Actions
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm">Medical Certificates Expiring</span>
                <span className="font-semibold">5</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm">Interviews Scheduled Today</span>
                <span className="font-semibold">3</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">Deployments Pending</span>
                <span className="font-semibold">
                  {metrics.deploymentPending}
                </span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4 flex items-center">
              <Ship className="h-5 w-5 mr-2 text-maritime-blue" />
              Vessels Requiring Crew
            </h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">MS Atlantic Star</span>
                  <span className="text-sm text-gray-500">Container</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Requires: 2nd Officer, Rating
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Required by: Feb 15, 2024
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">Tanker Prosperity</span>
                  <span className="text-sm text-gray-500">Tanker</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Requires: Chief Engineer
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Required by: Mar 1, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
