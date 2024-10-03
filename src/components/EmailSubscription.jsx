import React, { useState } from 'react';
import './EmailSubscription.css';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation for email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setMessage('');
      return;
    }

    // Simulate an API call to send the email
    // Replace this with your actual API call
    setMessage(`Thank you for subscribing, ${email}!`);
    setError('');
    setEmail(''); // Clear the input after submission
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="email-subscription">
      <h2>Subscribe to get news about upcoming or latest movies and TV shows</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          required
          className="email-input"
        />
        <button type="submit" className="subscribe-button">Subscribe</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EmailSubscription;
