// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    
    if (result.meta.requestStatus === 'fulfilled') {
      // Navigate to the dashboard only if login is successful
      navigate('/dashboard');
    } else if (result.meta.requestStatus === 'rejected') {
      // Optionally show error message if login failed
      console.error('Login failed: ', result.payload); // Log the error for debugging
    }
  };

  return (
    <div className="flex justify-center items-center mt-32 mb-32">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Display error message from Redux state */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
