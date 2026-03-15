import { useState } from "react";
import authService from "../services/authService";

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      await authService.forgotPassword(email);

      setMessage(
        "If this email exists in our system, a password reset link has been sent."
      );

      setEmail("");

    } catch {
      setMessage(
        "If this email exists in our system, a password reset link has been sent."
      );
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6"
      style={{
        backgroundImage: "url('/beach2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div
        className="w-full max-w-md
        bg-white/5
        backdrop-blur-2xl
        border border-white/20
        shadow-2xl
        rounded-2xl
        p-8"
      >

        <h1 className="text-center text-3xl font-extrabold text-white mb-2 drop-shadow-md">
          Eventure
        </h1>

        <h2 className="text-center text-lg text-gray-200 mb-6">
          Forgot Password
        </h2>

        {message && (
          <div className="bg-emerald-500/20 text-emerald-200 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg
            bg-white/10
            backdrop-blur-md
            text-white
            placeholder-gray-300
            border border-white/20
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-400
            transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            font-semibold
            transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-200 mt-5">
          Remember your password?{" "}
          <a href="/login" className="text-indigo-300 hover:text-white">
            Login
          </a>
        </p>

      </div>

    </div>
  );
};

export default ForgotPasswordPage;