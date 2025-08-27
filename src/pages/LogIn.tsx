import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
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