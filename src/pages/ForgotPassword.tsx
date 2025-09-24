import { useForm } from "react-hook-form";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/components/Firebase";
import { Link } from "react-router-dom";

type ForgotPasswordInputs = {
  email: string;
};

const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data: ForgotPasswordInputs) => {
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      const error = err as { code?: string; message?: string };
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Error sending reset email. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {message && <p className="text-green-600 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;