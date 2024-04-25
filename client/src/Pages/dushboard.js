import React from "react";
import Sidebar from "../pagesComponents/sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../pagesComponents/topBar";


function Dashboard() {
  return (
    <div>
      <div>
        <TopBar/>
      </div>
      <Sidebar />
      <main className="flex-grow p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
