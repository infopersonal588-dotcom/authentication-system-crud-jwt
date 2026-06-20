import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';
import authService from '../services/authService.jsx';
import FormCard from '../components/FormCard.jsx';

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile({ name: data.name, email: data.email });
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load profile');
      }
    };
    loadProfile();
  }, []);

  const handleProfileChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value });
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await authService.updateProfile(profile);
      setUser((prev) => ({ ...prev, name: data.name, email: data.email }));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update profile');
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords must match');
      return;
    }
    setLoading(true);
    try {
      await authService.updatePassword(passwordForm);
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update password');
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm('Delete your account and all notes?')) {
      return;
    }
    setLoading(true);
    try {
      await authService.deleteAccount();
      logout();
      toast.success('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-gap">
      <FormCard title="Profile settings">
        <form className="form-grid" onSubmit={saveProfile}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={profile.name} onChange={handleProfileChange} type="text" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={profile.email} onChange={handleProfileChange} type="email" />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button>
        </form>
      </FormCard>

      <FormCard title="Change password">
        <form className="form-grid" onSubmit={updatePassword}>
          <div className="input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input id="currentPassword" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} type="password" />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input id="newPassword" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} type="password" />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} type="password" />
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update password'}</button>
        </form>
      </FormCard>

      <FormCard title="Danger zone">
        <p>Delete your account permanently. This will remove your user and notes.</p>
        <button type="button" className="danger" onClick={deleteAccount} disabled={loading}>{loading ? 'Deleting...' : 'Delete account'}</button>
      </FormCard>
    </div>
  );
};

export default ProfilePage;
