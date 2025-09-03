import { auth } from "@/components/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom";

type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormInputs>();
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();


  const onSubmit = async (data: SignUpFormInputs) => {
    setFirebaseError("");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await updateProfile(user, {displayName:data.name});
        if(user) {
          navigate("/home");
        }
        console.log("User signed up:",user);
        
    } catch (err) {
      const error = err as { code?: string; message?: string }

      if(error.code === 'auth/email-already-in-use') {
        setFirebaseError("Email already in use.")
      } else {
        setFirebaseError(error.message || "Error signing up.")
      }
    }   
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">SignUp</h2>
        {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}
        <div className="mb-4">
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
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
          {...register("password", { 
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }  
           })}
          type="password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <div className="mb-4">
          <label>Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === watch("password") || "Passwords do not match"
            })}
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Sign Up
      </button>
      <Link to = "/login">Login</Link>
    </form>
    </div>
  );
};

export default SignUpForm;