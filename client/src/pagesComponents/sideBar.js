// Sidebar.js
import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn">
        Toggle Sidebar
        </button>
        <ul>
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
        </ul>
    </div>
  );
};

export default Sidebar;
