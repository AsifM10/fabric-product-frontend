import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onMenuClick('Add Product')}>Add Product</li>
        <li onClick={() => onMenuClick('Get Product')}>Get Product</li>
      </ul>
    </div>
  );
};

export default Sidebar;
