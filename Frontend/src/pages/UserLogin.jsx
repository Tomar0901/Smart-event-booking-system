import { useState } from "react";
import API from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", form);

      // ✅ Save Token
      localStorage.setItem("token", res.data.token);

      // ✅ Save User
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      // 🔥 Redirect back (if coming from Book Ticket)
      const from = location.state?.from || "/";
      navigate(from);

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow w-96 rounded"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer ml-1 hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}