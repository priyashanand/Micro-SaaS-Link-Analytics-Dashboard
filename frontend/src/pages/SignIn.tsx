import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import dotenv from 'dotenv';
dotenv.config();

const backendUrl = import.meta.env.BACKEND_URL ?? 'http://localhost:3000';


export default function SignIn({ onAuth }: { onAuth: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      onAuth(res.data.token);
      setMessage('Sign in successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect after 1 second
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.data && typeof err.response.data === 'object') {
        const data = err.response.data as { message?: string };
        setMessage(data.message || 'Login failed');
      } else {
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white w-full p-2 mt-4 rounded hover:bg-blue-600"
        onClick={handleSignin}
      >
        Sign In
      </button>
      {message && <p className="text-center mt-4 text-sm text-blue-600">{message}</p>}
    </div>
  );
}
