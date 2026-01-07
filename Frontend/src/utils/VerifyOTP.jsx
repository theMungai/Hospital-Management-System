import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [focused, setFocused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  async function handleResend() {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      if (timer > 0) return;
      setTimer(30);
      setMessage("");

      await fetch("http://localhost:8000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setMessage("Verification code sent successfully!");
    } catch (error) {
      setMessage("Failed to resend code. Try again later.");
    }
  }

  async function handleVerify() {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid OTP");
        return;
      }

      // Replace old token with verified token
      localStorage.setItem("token", data.access_token);

      // redirect based on role
      if (data.role === "admin") navigate("/admin");
      else if (data.role === "doctor") navigate("/doctor-dashboard");
      else navigate("/patient-dashboard");
    } catch (e) {
      setError("OTP verification failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-3">
      <div className="max-w-[380px] w-full text-center font-dmsans bg-gray-50 py-6">
        <h1 className="text-4xl text-center font-bold  mb-20 text-customTealBlue">
          Healthcare hospital
        </h1>

        <h1 className="text-2xl font-extrabold mb-3 text-gray-800">
          Check your inbox
        </h1>

        <p className="text-gray-600">Enter the verification code we sent to</p>
        <p className="font-medium text-gray-600 mb-8">
          {localStorage.getItem("email")}
        </p>

        <div className="relative w-full mb-6">
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 6) setOtp(value);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Code"
            className="peer w-full border border-gray-400 bg-transparent py-3.5 px-5 rounded-[25px] tracking-widest text-customTealBlue focus:outline-none focus:border-customTealBlue transition-colors"
          />

          <label
            className={`absolute left-5 top-3 px-1 bg-gray-50 text-gray-500 transition-all duration-200 ${
              focused || otp
                ? "-translate-y-6 text-sm text-customTealBlue"
                : "text-base translate-y-0"
            }`}
          >
            Code
          </label>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <button
          type="submit"
          className="w-full bg-customTealBlue text-white py-3.5 rounded-[25px] transition hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin inline-block h-4 w-4 border-[2px] border-white border-t-transparent rounded-full mr-2"></span>
              Verifying OTP...
            </span>
          ) : (
            "Verify OTP"
          )}
        </button>

        <div className="mt-5 text-sm text-gray-600">
          {timer > 0 ? (
            <p>
              You can resend in{" "}
              <span className="text-customTealBlue">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-customTealBlue font-semibold hover:underline"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
