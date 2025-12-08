import React from "react";
import { Bell, Search, User, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-64 h-16 z-10">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search across candidates, vessels, documents..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maritime-blue"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Settings className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="w-8 h-8 bg-maritime-blue rounded-full flex items-center justify-center text-white font-medium">
              AJ
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">Fleet Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
