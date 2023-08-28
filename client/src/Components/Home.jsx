import React, { useState } from "react";

const Home = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Event handler to update the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2 id="FindItems">Find Some Weird Items</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {/* Display search results or content */}
    </div>
  );
};

export default Home;
