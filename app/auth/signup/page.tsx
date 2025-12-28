"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  username: string;
  password: string;
  email: string;
  phone: string;
  userRole: string;
};

export default function SignUp() {
  const [isError, setIsError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    const {data:session} = useSession();
  
    if(session?.user?.email){
      router.push("/")
    }

  const { register, handleSubmit, watch, formState, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password, email, phone } = data;

    if (!username || !password || !email || !phone) {
      setIsError("Please full fill the criteria");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`|\\]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setIsError(
        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long."
      );
    }
    const api = "/api/auth/register";

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          phone,
          createdAt: new Date(),
          userRole: "user",
        }),
      });

      const data = await response.json();

      if (data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      setIsError("An error occurred. Please try again.");
    }

    reset();
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleOAuthSignIn = (provider: "google" | "facebook") => {
    setIsLoading(true);
    signIn(provider, { redirect: false, callbackUrl: "/" })
      .then((result) => {
        if (result?.error) {
          setError(`Failed to sign in with ${provider}`);
        }

        if (result?.url) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Login successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/");
        }
      })
      .catch(() => setError(`Failed to sign in with ${provider}`))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-[70vh] md:min-h-screen bg-white flex max-w-7xl mx-auto">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-8 md:py-0">
        <div className="max-w-md">
          {/* Logo */}
          {/* <div className="mb-8">
            <div className=" ">
              <img
                src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                alt="com_logo"
                className="max-w-20"
              />
            </div>
          </div> */}

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-2">
              Sign up to continue
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label>Name</label>
              <Input
                type="text"
                {...register("username", { required: true })}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:border-red-500"
              />
            </div>

            {/* Password */}
            <div>
              <label>Email</label>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="info@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label>Phone</label>
              <Input
                type="phone"
                {...register("phone", { required: true })}
                placeholder="+92094839372"
                className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {/* password */}
            <div>
              <label>Password</label>
              <Input
                type="password"
                {...register("password", { required: true })}
                placeholder="*********"
                className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <label className="text-sm">Must be at least 8 characters </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Sign Up
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-red-600 hover:underline font-semibold"
            >
              Click to login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-4">
            <button
              onClick={() => handleOAuthSignIn("google")}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="hidden sm:inline text-gray-700 font-medium">
                Google
              </span>
            </button>
            <button
              onClick={() => handleOAuthSignIn("facebook")}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="hidden sm:inline text-gray-700 font-medium">
                Facebook
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <div className="bounce-animation">
          <img
            src="https://i.postimg.cc/pd9yyNSR/Illustration.png"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
