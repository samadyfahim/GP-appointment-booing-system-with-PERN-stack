import React, { useState } from "react";
import dashboardIcon from "../assets/dashboard.png";
import UserProfileButton from "./UserProfileButton";
import SidebarComponent from "./SidebarComponent";
import { SlMenu } from "react-icons/sl";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                className="inline-flex items-center p-2 text-sm
                text-gray-500 rounded-lg sm:hidden
                hover:bg-gray-100 focus:outline-none focus:ring-2 
                focus:ring-gray-200
                dark:text-gray-400 
                dark:hover:bg-gray-700 
                dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <SlMenu className="w-6 h-6" />
              </button>
              <div className="flex ms-2 md:me-24">
                <p className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
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

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SidebarComponent />
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              sidebar render
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
