import { useForm } from "react-hook-form";
import { auth } from "@/components/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    setFirebaseError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      await auth.currentUser?.reload(); // <-- Add this line
      navigate("/home");
    } catch (err) {
      const error = err as { code?: string; message?: string };

      if (
        error.code === "invalid-credential" ||
        error.code === "wrong-password"
      ) {
        setFirebaseError("Invalid email or password.");
      } else if (error.code === "user-not-found") {
        setFirebaseError("No account found with this email.");
      } else {
        setFirebaseError(error.message || "Error logging in.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        {firebaseError && (
          <p className="text-red-500 text-sm text-center mb-4">
            {firebaseError}
          </p>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
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

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-5">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
