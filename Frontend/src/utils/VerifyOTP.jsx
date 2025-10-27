import React, { useState, useEffect } from "react";

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const [focused, setFocused] = useState(false);
    const [timer, setTimer] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    async function handleResend(){
        try {
            if (timer > 0) return;
            setTimer(30);
            setMessage("");

            setTimeout(() => {
                setMessage("Verification code sent successfully!");
            }, 1000);
        } catch (error) {
            setMessage("Failed to resend code. Try again later.");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-50 p-3">
            <div className="max-w-[380px] w-full text-center font-dmsans bg-gray-50 py-6">
                <h1 className="text-xl text-left font-medium my-8 text-customTealBlue">
                    Healthcare hospital
                </h1>

                <h1 className="text-3xl font-extrabold mb-3 text-gray-800">
                    Check your inbox
                </h1>

                <p className="text-gray-600">Enter the verification code we sent to</p>
                <p className="font-medium text-gray-600 mb-8">johndoe@gmail.com</p>

                <div className="relative w-full mb-6">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={otp}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 6) setOtp(value);
                        }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="Code"
                        className={`peer w-full border border-gray-400 bg-transparent py-3 px-5 rounded-[25px] tracking-widest text-customTealBlue focus:outline-none focus:border-customTealBlue transition-colors placeholder:text-gray-400 placeholder:text-sm
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              [appearance:textfield]`}
                    />
                    <label
                        className={`absolute left-5 top-3 px-1 bg-gray-50 text-gray-500 transition-all duration-200 ease-in-out
              ${focused || otp
                            ? "-translate-y-6 text-sm text-customTealBlue"
                            : "text-base translate-y-0"
                        }`}
                    >
                        Code
                    </label>
                </div>

                {/* Verify Button */}
                <button
                    className="w-full bg-customTealBlue text-white py-3 rounded-[25px] hover:bg-[#007f85] transition font-medium"
                >
                    Verify
                </button>

                {/* Resend Section */}
                <div className="mt-5 text-sm text-gray-600">
                    {timer > 0 ? (
                        <p>
                            You can resend in <span className="text-customTealBlue">{timer}s</span>
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

                {/* Feedback message */}
                {message && (
                    <p className="mt-3 text-sm text-green-600">{message}</p>
                )}
            </div>
        </div>
    );
}

export default VerifyOTP;
