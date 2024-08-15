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

  return (
    <div className="flex items-center justify-center p-40 min-h-screen bg-gray-200">
      <form
        className="px-12 py-8 shadow-xl bg-gray-50 rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full m-auto mb-4 text-2xl text-teal-600 font-bold text-center">
          Iniciar sesión
        </h1>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Correo electrónico es requerido",
            },
          })}
          className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
          placeholder="Correo electrónico"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña es requerida",
            },
          })}
          className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
          placeholder="Contraseña"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        <button className="w-full p-2 mt-3 text-white bg-teal-500  rounded hover:bg-teal-600 font-bold">
          Iniciar sesión
        </button>
        <Link 
          href="/sign-up"
          className="flex justify-center items-center mt-3 text-center text-teal-600"
        >
          Registrarse
        </Link>
      </form>
    </div>
  );
}

export default LoginPage
