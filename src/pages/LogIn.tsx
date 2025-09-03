import { useForm } from "react-hook-form";
import { auth } from "@/components/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    setFirebaseError("");
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigate("/home");

    } catch (err) {
      const error = err as { code?: string; message?: string };

      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        setFirebaseError("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        setFirebaseError("No account found with this email.");
      } else {
        setFirebaseError(error.message || "Error logging in.");
      }
      console.error("Login error:", error);
    }
    console.error(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}

      <div className="mb-4">
        <label>Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
    </div>
  );
};

export default LoginForm;