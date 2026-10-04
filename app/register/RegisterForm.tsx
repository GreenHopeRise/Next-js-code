"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const onSubmit = async (data: RegisterFormData) => {
    setSuccess("");
setServerError("");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
setSuccess("Account created successfully!");
      console.log(result);
    } catch (error) {
  setServerError(
    error instanceof Error
      ? error.message
      : "Something went wrong"
  );
}
  };
  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold">Create Account</h1>

        <p className="text-sm text-gray-500 mt-2">Register to get started</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-lg p-3"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full border rounded-lg p-3"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        {success && <p className="text-sm text-green-600">{success}</p>}

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded-lg p-3 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>
      </form>
    </div>
  );
}
