import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  const navigate = useNavigate();

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {setActiveTab(tab); navigate(`/users/${tab}`)}}
            className={`py-2 px-4 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
