import React from "react";

const LoginForm = () => {
  const handleLogin = (provider) => {
    console.log(`Logging in with ${provider}...`);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1e] text-white">
      <h1 className="text-4xl font-bold mb-6">Login to Cheesecake</h1>
      <p className="mb-4">Welcome back! Please log in to continue.</p>
      <input
        type="email"
        placeholder="Email"
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <button className="bg-blue-600 text-white p-2 rounded w-80">Login</button>
      <div className="my-4 text-gray-400">or login with</div>
      <div className="flex space-x-4">
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("GitHub")}
        >
          GitHub
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("Google")}
        >
          Google
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("Twitter")}
        >
          Twitter
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("Facebook")}
        >
          Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
