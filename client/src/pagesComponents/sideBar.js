import React from "react";
import SidebarComponent from "./SidebarComponent";

function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SidebarComponent />
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
