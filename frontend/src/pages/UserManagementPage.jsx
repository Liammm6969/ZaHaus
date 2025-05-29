import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../services/userService';
import '../styles/UserManagementPage.css';
import Navbar from '../pages/Navbar';

const roles = ['admin', 'staff', 'customer'];

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    try {
      await updateUserRole(userId, newRole);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUpdatingId(userId);
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
    setUpdatingId(null);
  };

  return (
    <>
      <Navbar />
      <div className="user-management-container">
        <h2>User Management</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading users...</div>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>
                    <select
                      value={user.role}
                      disabled={updatingId === user._id}
                      onChange={e => handleRoleChange(user._id, e.target.value)}
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      disabled={updatingId === user._id}
                      onClick={() => handleDelete(user._id)}
                    >
                      {updatingId === user._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && users.length === 0 && !error && (
          <div className="loading-container">
            <div className="loading-text">No users found.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagementPage;