'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  password: string;
  profile_id: string;
};

export const B2BLogin = () => {
  const { register, handleSubmit, control, watch, formState } =
    useForm<Inputs>();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

 const onSubmit: SubmitHandler<Inputs> = (data) => {
  
    setIsLoading(true);

    signIn("credentials-b2b", {
      redirect: false,
      profile_id: data.profile_id,
      password: data.password,
    })
      .then((result) => {
        if (result?.error) {
          setError(result?.error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Error occour ${error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Login successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/b2b/dashboard");
        }
      })
      .catch(() => setError("An unexpected error occurred"))
      .finally(() => setIsLoading(false));
  };

  if(isLoading) return <Loader/>

  return (
    <div className="min-h-[40vh] max-w-7xl mx-auto flex justify-center items-center">
      <div className="w-full flex justify-center px-6">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="https://i.postimg.cc/WbV55LZS/Group-2.png"
              alt="com_logo"
              className="max-w-20"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-2">Hello!</h1>
            <p className="text-gray-500 text-base">
              Login with b2b credentials
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              autoComplete="profile_id"
              placeholder="Enter b2b-profile-id"
              {...register("profile_id", { required: true })}
            />

            <Input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              {...register("password", { required: true })}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

};
