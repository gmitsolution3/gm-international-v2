"use client"
import React, { Suspense } from "react";
import LoginForm from "../component/loginForm";
import Loader from "@/components/ui/loader";

const LoginPage = () => {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
