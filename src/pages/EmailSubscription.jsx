import React, { useState } from 'react';
import { db } from '../_utils/firebase';  // Make sure the path is correct
import { collection, addDoc, Timestamp } from "../_utils/firebase/firestore";

const EmailSubscription = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add a new document with email and timestamp
            await addDoc(collection(db, "subscriptions"), {
                email: email,
                timestamp: Timestamp.fromDate(new Date())
            });
            setMessage('Thank you for subscribing!');
            setEmail('');  // Clear input field
        } catch (error) {
            console.error("Error adding subscription: ", error);
            setMessage('Subscription failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailSubscription;
