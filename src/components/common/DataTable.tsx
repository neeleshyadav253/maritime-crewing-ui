import React from "react";
import type { Candidate } from "../../types";

interface DataTableProps {
  data: Candidate[];
  columns: {
    key: keyof Candidate;
    label: string;
    render?: (value: any, item: Candidate) => React.ReactNode;
  }[];
  onRowClick?: (item: Candidate) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`hover:bg-gray-50 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {column.render ? (
                    column.render(item[column.key], item)
                  ) : (
                    <div className="text-sm text-gray-900">
                      {item[column.key]}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
