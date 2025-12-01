import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [formData, setFormData] = useState({email: "", password: "",});
  const [error, setError] = useState("");
  const [ showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Invalid credentials");
                return;
            }

            // ⭐ SAVE user info
            localStorage.setItem("user_id", data.user.id);
            localStorage.setItem("role", data.user.role);

            // ⭐ REDIRECT
            if (data.user.role === "doctor") {
                navigate("/doctor-dashboard");
            } else if (data.user.role === "patient") {
                navigate("/patient-dashboard");
            } else if (data.user.role === "admin") {
                navigate("/admin");
            }

        } catch (err) {
            setError("Network error, try again later.");
        }
    };

  function togglePasswordVisibility(){
      setShowPassword(prev => !prev)
  }

  const passwordInputType = showPassword ? "text" : "password"

  const buttonLabel = showPassword ? "Hide" : "Show"

  return (
    <div className="min-h-screen flex items-center justify-center bg-customWhite px-4 font-dmsans">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl xs:text-[24px] sm:text-[28px] text-customTealBlue font-bold text-center mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block ">
              Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="bg-transparent p-2.5 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"/>

          </div>

          <div>
            <label htmlFor="password" className="mb-2.5 text-[#282938] font-normal text-[19px] xs:text-sm sm:text-sm block ">
              Password
            </label>

              <div className="relative">
                  <input
                      type={passwordInputType}
                      name="password" value={formData.password}
                      onChange={handleChange} placeholder="Enter your password"
                      className="bg-transparent p-2.5 text-[1rem] text-[#282938] border border-customTealBlue outline-none rounded-[6px] w-full"
                  />

                  <div
                      onClick={togglePasswordVisibility}
                      className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-customTealBlue">
                      {buttonLabel}
                  </div>
              </div>


          </div>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

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
