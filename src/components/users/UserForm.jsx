import { useState } from "react";

export default function UserForm({
  initial = { name: "", email: "", phone: "" },
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
   else if (!/^\+?[1-9]\d{9,14}$/.test(form.phone)) {
  e.phone = "Enter a valid phone number";
}

    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(form);
    }
  };

  return (
  <form onSubmit={handleSubmit} className="max-w-4xl space-y-6 mx-auto p-6 bg-white shadow-lg rounded-2xl">
  {/* Fields in responsive row */}
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {/* Name */}
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>

    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      placeholder="Enter full name"
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  </div>

  {/* Email */}
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      placeholder="Enter email address"
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>

  {/* Phone */}
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
    <input
      type="text"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      placeholder="Enter phone number"
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  </div>
</div>


  {/* Submit button */}
  <div className="flex justify-end">
    <button
      type="submit"
      disabled={submitting}
      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
    >
      {submitting ? "Submitting..." : "Submit"}
    </button>
  </div>
</form>


  );
}
