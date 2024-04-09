import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-full focus:outline-none hover:bg-blue-600 bg-gray-dark"
      >
        {/* <img> </img> */}
      </button>
    </form>
  );
}

export default SearchBar;
