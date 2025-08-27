import { auth } from "@/components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

type SignInFormInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();

  const onSubmit = async (data: SignInFormInputs) => {
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = auth.currentUser;
        console.log(user);
        
    } catch (error) {
        console.error("Error signing in:",error);
    }   
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Signin</h2>
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
        Signin
      </button>
    </form>
    </div>
  );
};

export default SignInForm;