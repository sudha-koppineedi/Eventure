import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";

const ResetPasswordPage = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/(?=.*[a-z])/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (!/(?=.*\d)/.test(password)) {
      setError("Password must contain at least one number");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const res = await authService.resetPassword(token, password);

      setMessage(res.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.message);
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

        <h1 className="text-center text-3xl font-extrabold text-white mb-4 drop-shadow-md">
          Eventure
        </h1>

        <h2 className="text-center text-lg text-gray-200 mb-6">
          Reset Password
        </h2>

        {message && (
          <div className="bg-green-500/20 text-green-200 p-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="New Password"
              className="w-full px-4 py-2 rounded-lg
              bg-white/10
              backdrop-blur-md
              text-white
              placeholder-gray-300
              border border-white/20
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-300"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg
              bg-white/10
              backdrop-blur-md
              text-white
              placeholder-gray-300
              border border-white/20
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-gray-300"
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>

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
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-200 mt-5">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-300 hover:text-white">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default ResetPasswordPage;