import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import FormCard from '../components/FormCard.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

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
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords must match');
      return;
    }
    try {
      await register(form);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <FormCard title="Create your account">
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your full name" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="6+ characters" />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm password" />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        <small className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </FormCard>
  );
};

export default RegisterPage;
