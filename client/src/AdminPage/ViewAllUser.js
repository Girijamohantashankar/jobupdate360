import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ViewAllUser.css";

function ViewAllUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [noUsersFound, setNoUsersFound] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user_controls/all_user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setAction(action);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      if (action === 'delete') {
        await deleteUser(selectedUser._id);
        toast.success('User deleted successfully');
      } else {
        await updateUserStatus(selectedUser._id, action);
        toast.success(`User ${action}d successfully`);
      }
    } catch (error) {
      toast.error('Error performing action');
    }
    setShowModal(false);
  };

  const updateUserStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/user_controls/${id}`, { status });
      fetchUsers(); 
    } catch (error) {
      console.error('Error updating user status', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user_controls/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setNoUsersFound(filteredUsers.length === 0 && search !== '');
  }, [search, filteredUsers]);

  return (
    <div className='view_all_users'>
      <h1>All Users</h1>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={handleSearch}
      />
      {noUsersFound ? (
        <p className="no-users-message">User not found</p>
      ) : (
        <div className="All_users_list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td className='btn_group'>
                  <button
                    className='active'
                    onClick={() => handleAction(user, 'active')}
                    disabled={user.status === 'active'}
                  >
                    Active
                  </button>
                  <button
                    className='block'
                    onClick={() => handleAction(user, 'blocked')}
                    disabled={user.status === 'blocked'}
                  >
                    Block
                  </button>
                  <button
                    className='delete'
                    onClick={() => handleAction(user, 'delete')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>Are you sure you want to {action} this user?</p>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default ViewAllUser;
