import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Simulate login (replace with real API call)
    console.log("Logging in with:", formData);
    alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-customWhite px-4 font-dmsans">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl xs:text-[24px] sm:text-[28px] text-customTealBlue font-bold text-center mb-6">Login to Your Account</h2>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block ">
              Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="bg-transparent p-2.5 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full" required />
          </div>

          <div>
            <label htmlFor="password" className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block ">
              Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="bg-transparent p-2.5 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-customTealBlue text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
          <Link to="/sign-up" className="hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
