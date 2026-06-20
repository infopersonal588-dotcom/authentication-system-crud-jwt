import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import authService from '../services/authService.jsx';
import Loader from '../components/Loader.jsx';

const DashboardPage = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  return (
    <section className="card">
      <h1 className="section-title">Welcome back, {user?.name}</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="list-gap">
          <p>
            Use your dashboard to manage notes and profile settings. Your current account is registered with <strong>{profile?.email}</strong>.
          </p>
          <div className="note-card">
            <h3>Profile details</h3>
            <div className="note-meta">
              <span>Name:</span>
              <span>{profile?.name}</span>
            </div>
            <div className="note-meta">
              <span>Email:</span>
              <span>{profile?.email}</span>
            </div>
            <div className="note-meta">
              <span>Member since:</span>
              <span>{new Date(profile?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
