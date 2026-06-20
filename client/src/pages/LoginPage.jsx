import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import FormCard from '../components/FormCard.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Email and password are required');
      return;
    }
    try {
      await login(form);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <FormCard title="Login to AuthNotes">
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <small className="text-center">
          Don\'t have an account? <Link to="/register">Register here</Link>
        </small>
      </form>
    </FormCard>
  );
};

export default LoginPage;
