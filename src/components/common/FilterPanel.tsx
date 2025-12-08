import React from "react";
import { Filter, X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterPanelProps {
  filters: {
    rank: string;
    status: string;
    source: string;
    nationality: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  availableOptions: {
    ranks: FilterOption[];
    statuses: FilterOption[];
    sources: FilterOption[];
    nationalities: FilterOption[];
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  availableOptions,
}) => {
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rank
          </label>
          <div className="space-y-2">
            {availableOptions.ranks.map((rank) => (
              <label key={rank.value} className="flex items-center">
                <input
                  type="radio"
                  name="rank"
                  value={rank.value}
                  checked={filters.rank === rank.value}
                  onChange={(e) => handleFilterChange("rank", e.target.value)}
                  className="h-4 w-4 text-maritime-blue"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {rank.label}
                  {rank.count !== undefined && (
                    <span className="ml-1 text-gray-500">({rank.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="space-y-2">
            {availableOptions.statuses.map((status) => (
              <label key={status.value} className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={filters.status === status.value}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="h-4 w-4 text-maritime-blue"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {status.label}
                  {status.count !== undefined && (
                    <span className="ml-1 text-gray-500">({status.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <div className="space-y-2">
            {availableOptions.sources.map((source) => (
              <label key={source.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.source === source.value}
                  onChange={(e) =>
                    handleFilterChange(
                      "source",
                      e.target.checked ? source.value : ""
                    )
                  }
                  className="h-4 w-4 text-maritime-blue rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {source.label}
                  {source.count !== undefined && (
                    <span className="ml-1 text-gray-500">({source.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality
          </label>
          <select
            value={filters.nationality}
            onChange={(e) => handleFilterChange("nationality", e.target.value)}
            className="w-full border-gray-300 rounded-md text-sm"
          >
            <option value="">All Nationalities</option>
            {availableOptions.nationalities.map((nationality) => (
              <option key={nationality.value} value={nationality.value}>
                {nationality.label}
                {nationality.count !== undefined && ` (${nationality.count})`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability Date
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="immediate"
                onChange={() => {}}
                className="h-4 w-4 text-maritime-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Immediate (within 2 weeks)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="short-term"
                onChange={() => {}}
                className="h-4 w-4 text-maritime-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Short-term (1-2 months)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="long-term"
                onChange={() => {}}
                className="h-4 w-4 text-maritime-blue"
              />
              <span className="ml-2 text-sm text-gray-700">
                Long-term (3+ months)
              </span>
            </label>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;

              const optionMap: Record<string, Record<string, string>> = {
                rank: Object.fromEntries(
                  availableOptions.ranks.map((r) => [r.value, r.label])
                ),
                status: Object.fromEntries(
                  availableOptions.statuses.map((s) => [s.value, s.label])
                ),
                source: Object.fromEntries(
                  availableOptions.sources.map((s) => [s.value, s.label])
                ),
                nationality: Object.fromEntries(
                  availableOptions.nationalities.map((n) => [n.value, n.label])
                ),
              };

              const label = optionMap[key]?.[value] || value;

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {key}: {label}
                  <button
                    onClick={() =>
                      handleFilterChange(key as keyof typeof filters, "")
                    }
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
