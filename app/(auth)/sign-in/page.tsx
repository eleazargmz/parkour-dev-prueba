"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("------handleSubmit------", data)
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  console.log(errors);

  return (
    <div className="flex items-center justify-center p-40 bg-gray-200">
      <form
        className="px-12 py-8 shadow-xl bg-gray-50 rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full m-auto mb-4 text-2xl text-teal-600 font-bold text-center">
          Login
        </h1>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        <button className="w-full p-2 mt-3 text-white bg-teal-500  rounded hover:bg-teal-600 font-bold">
          Login
        </button>
        <Link 
          href="/sign-up"
          className="flex justify-center items-center mt-3 text-center text-teal-600"
        >
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginPage
