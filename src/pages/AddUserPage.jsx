import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import UserForm from "../users/UserForm";
import UserForm from "../components/users/UserForm"

export default function AddUserPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // ✅ Handle add user
  const handleAdd = async (formData) => {
    try {
      setSubmitting(true);
      await axios.post("https://jsonplaceholder.typicode.com/users", formData);
      navigate("/"); // go back to homepage after success
    } catch (err) {
      console.error("Error adding user:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Add New User</h1>

      <div className="p-4 border rounded bg-gray-50 shadow">
        <UserForm
          initial={{ name: "", email: "", phone: "" }}
          onSubmit={handleAdd}
          submitting={submitting}
        />
      </div>
    </div>
  );
}
