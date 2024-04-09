import React from "react";
import SearchBar from "./searchBar";

function topBar() {
  return (
    <div className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">MyCare</div>
          <div>
            <SearchBar />
          </div>
          <div>profile</div>
        </div>
      </div>
    </div>
  );
}

export default topBar;
