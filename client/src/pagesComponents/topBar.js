import React, { useState } from "react";
import UserProfileButton from "./UserProfileButton";
import SidebarComponent from "./SidebarComponent";

import { SlMenu } from "react-icons/sl";

function TopBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                className="inline-flex items-center p-2 text-sm
                rounded-lg sm:hidden
                focus:outline-none focus:ring-2"
                onClick={toggleSidebar}
              >
                <SlMenu className="w-6 h-6" />
              </button>
              <div className="flex ms-2 md:me-24">
                <p className="self-center text-x2 sm:text-3xl whitespace-nowrap font-semibold">
                  MyCare
                </p>
              </div>
            </div>
            <UserProfileButton />
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <SidebarComponent />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
