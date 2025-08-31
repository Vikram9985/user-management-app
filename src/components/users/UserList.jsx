import React, { useState } from "react";
import axios from "axios";

export default function UserList({ users = [], onEdit, onDelete, loading }) {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);

  // Open modal and set user data
  const handleEditClick = (user) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, phone: user.phone });
    setShowModal(true);
    if (onEdit) onEdit(user); // keep original callback if needed
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUT call to update user
  const handleSave = async () => {
    if (!editUser) return;
    setSaving(true);
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editUser.id}`,
        form
      );
      setShowModal(false);
      setEditUser(null);
      // Optionally, refresh users list here
    } catch (err) {
      alert("Error updating user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }

  if (!users.length) {
    return <p className="text-gray-500">No users found.</p>;
  }

  return (
    <div className="overflow-x-scroll">
      <div className="bg-white shadow-lg rounded-2xl ">
        <table className="w-full text-sm text-left">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`transition duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-indigo-50`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4 text-gray-700">{user.phone}</td>
                <td className="px-6 py-4 text-center">
  <div className="flex items-center justify-center gap-3">
    <button
      onClick={() => handleEditClick(user)}
      className="px-3 py-1.5 rounded-lg bg-yellow-400 text-white font-medium hover:bg-yellow-500 transition"
    >
      Edit
    </button>
    <button
      onClick={() => onDelete(user.id)}
      className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
    >
      Delete
    </button>
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
