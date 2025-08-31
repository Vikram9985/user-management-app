import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/users/UserForm";
import UserList from "../components/users/UserList";

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // ✅ Fetch users (replace URL with your backend)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Add or Update user
  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      if (editingUser) {
        // Update existing user
        await axios.put(`https://jsonplaceholder.typicode.com/${editingUser.id}`, formData);
      } else {
        // Add new user
        await axios.post("https://jsonplaceholder.typicode.com/users", formData);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">User Management</h1>

      {/* User Form */}
      <div className="p-4 border rounded bg-gray-50 shadow">
        <h2 className="text-xl font-semibold mb-2">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        <UserForm
          initial={editingUser || { name: "", email: "", phone: "" }}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
      <div className="p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
  <UserList
          users={users}
          loading={loading}
          onEdit={(user) => setEditingUser(user)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
