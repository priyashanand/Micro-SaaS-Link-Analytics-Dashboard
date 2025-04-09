// src/components/SignUp.tsx
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const backendUrl = "https://micro-saas-link-analytics-dashboard.onrender.com";

export default function SignUp({ onAuth }: { onAuth: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, { email, password });
      onAuth(res.data.token);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn mt-4 w-full" onClick={handleSignup}>
        Sign Up
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}
