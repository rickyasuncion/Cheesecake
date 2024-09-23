import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1e] text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-2">Page Not Found</h2>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-600 text-white p-2 rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;