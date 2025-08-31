import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "../components/users/UserForm";
export default function EditUserPage() {
  const { id } = useParams(); // user id from URL
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch user by id
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (formData) => {
    try {
      setSubmitting(true);
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData);
      navigate("/"); // go back to homepage
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center">Loading user...</p>;
  }

  if (!user) {
    return <p className="text-red-500 text-center">User not found!</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Edit User</h1>

      <div className="p-4 border rounded bg-gray-50 shadow">
        <UserForm
          initial={user}
          onSubmit={handleUpdate}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
