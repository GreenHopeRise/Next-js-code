"use client";

import { useForm } from "react-hook-form";

type LoginFormData = {
    email: string,
    password: string
}
export default function LoginForm() {
    const {register, handleSubmit, formState:{errors}}= useForm<LoginFormData>()
    const onSubmit = (data: LoginFormData)=>{
        console.log(data)
    }
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm">

      <div>
        <h1 className="text-2xl font-bold">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Login to your account
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="space-y-2">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3"
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3"
            {...register('password')}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg p-3"
        >
          Login
        </button>

      </form>
    </div>
  );
}