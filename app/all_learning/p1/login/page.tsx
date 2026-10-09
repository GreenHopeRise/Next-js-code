"use client";

import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../libs/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit =async (e:LoginFormValues)=>{
    console.log(e)

  }

  return <div>
    <h1>Form</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} />
        <input type="password" {...register('password')} />
        <button type="submit" disabled={isSubmitting}>Submit</button>
    </form>
  </div>;
}
