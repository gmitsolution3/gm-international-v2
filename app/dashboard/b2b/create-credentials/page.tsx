"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllB2BApplication } from "../components/fetch";
import { Application } from "../components/showAllApplication";
import Loader from "@/components/ui/loader";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

type Inputs = {
  userName: string;
  email: string;
  phone: string;
};

interface ReturnB2BData {
  email: string;
  Phone: string;
  userName: string;
  b2bProfileId: string;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

const CreateCredential = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [b2bProfileId, setB2bProfileId] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [returnUserData, setReturnUserData] = useState<ReturnB2BData | null>(
    null
  );
  const [emailSending, setEmailSending] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  const { data: session } = useSession();
  const { register, handleSubmit, control, watch, formState } =
    useForm<Inputs>();
  const [Applications, setApplications] = useState<Application[]>();
  const [searchEmail, setSearchEmail] = useState("");
  const [matchedApplication, setMatchedApplication] =
    useState<Application | null>(null);

  // get all application
  useEffect(() => {
    setIsLoading(true);
    const getApplications = async () => {
      const data = await getAllB2BApplication();
      setApplications(data);
    };
    getApplications();
    setIsLoading(false);
  }, []);

  console.log({returnUserData: returnUserData})

  const generateB2BProfileId = () => {
    return (
      "B2B-" + crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()
    );
  };

  const generatePassword = (length = 6) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!";
    let password = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  };

  // search handler
  useEffect(() => {
    if (!searchEmail) {
      setMatchedApplication(null);
      return;
    }

    const found = Applications?.find(
      (app) => app.email?.toLowerCase() === searchEmail.toLowerCase()
    );

    setMatchedApplication(found || null);
  }, [searchEmail, Applications]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const profileId = generateB2BProfileId();
    const password = generatePassword();

    setB2bProfileId(profileId);
    setGeneratedPassword(password);

    setPreviewData({
      ...data,
      b2bProfileId: profileId,
      password,
    });

    setShowPreview(true);
  };

  const handleConfirmSubmit = async () => {
    if (!matchedApplication) {
      Swal.fire("No application found for this email");
      return;
    }

    setIsLoading(true);
   



    const response = await fetch("/api/auth/b2b-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: previewData.email,
        userName: previewData.userName,
        phone: previewData.phone,
        password: previewData.password,
        b2bProfileId,
        userRole: "b2b",
        isActive: true,
        createdBy: session?.user?.email,
        createdAt: new Date(),
      }),
    });

    const data = await response.json();

    if (data.message === "Username Already taken") {
      Swal.fire({
        icon: "error",
        title: data.message || "Something went wrong",
      });
      setIsLoading(false);
      return;
    }

    if (data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setReturnUserData(data.user);
    }
    setIsLoading(false);
  };

  console.log({previewData: previewData})

  const handleEmailSend = async () => {
    setEmailSending(true);
    try {
      const res = await fetch("/api/auth/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: previewData.email,
          name: previewData.userName,
          b2bProfileId: b2bProfileId,
          b2bProfilePassword: generatedPassword,
        }),
      });

      if (res.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Email send succfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEmailConfirm(true);
      }
    } catch (error) {
      
    } finally {
      setEmailSending(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold my-8 text-red-700">
        User Credential
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-10">
        <div className="border-2 border-red-400 p-6 rounded-2xl">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold md:text-4xl text-gray-900 mb-2">
              Create User Credentials
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl"
          >
            <div>
              {/* Username */}
              <div>
                <label>
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="info@gmail.com"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:border-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label>
                  User Name <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  {...register("userName", { required: true })}
                  placeholder="User Name"
                  className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label>
                  Phone <span className="text-red-400">*</span>
                </label>
                <Input
                  type="text"
                  {...register("phone", { required: true })}
                  placeholder="Enter Phone"
                  className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Create credentials
            </Button>
          </form>
        </div>
        <div className="border-2 border-red-400 rounded-2xl p-6">
          <div>
            <label className="text-xl font-bold">
              Search user by email <span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              placeholder="Search By email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-red-300
             focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {matchedApplication && (
              <div className="mt-6 border border-red-300 rounded-xl p-4 space-y-2">
                <h3 className="text-lg font-semibold text-red-600">
                  Personal Information
                </h3>

                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {matchedApplication.name}
                </p>

                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {matchedApplication.email}
                </p>

                <p>
                  <span className="font-semibold">Mobile:</span>{" "}
                  {matchedApplication.mobile || matchedApplication.mobileNumber}
                </p>

                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {matchedApplication.address}
                </p>

                <p>
                  <span className="font-semibold">Present Address:</span>{" "}
                  {matchedApplication.presentAddress}
                </p>
                <p>
                  <span className="font-semibold">Application Status:</span>{" "}
                  {matchedApplication.applicationStatus}
                </p>
              </div>
            )}

            {searchEmail && !matchedApplication && (
              <p className="mt-4 text-red-500">No user found with this email</p>
            )}
          </div>
        </div>

        <div>
          {showPreview && previewData && (
            <div className="mt-8 border-2 border-red-400 rounded-2xl p-6 space-y-3">
              <h1 className="my-4 text-2xl text-green-700 font-bold text-center">
                Preview
              </h1>
              <h3 className="text-2xl font-bold text-red-600">
                Credential Preview
              </h3>

              <p>
                <b>Email:</b> {previewData.email}
              </p>
              <p>
                <b>User Name:</b> {previewData.userName}
              </p>
              <p>
                <b>Phone:</b> {previewData.phone}
              </p>
              <p>
                <b>B2B Profile ID:</b> {previewData.b2bProfileId}
              </p>
              <p className="text-red-600">
                <b>Password:</b> ******
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleConfirmSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirm & Create
                </Button>

                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
        <div>
          {returnUserData && (
            <div className="mt-8 border-2 border-red-400 rounded-2xl p-6 space-y-3">
              <h1 className="my-4 text-2xl text-green-700 font-bold text-center">
                B2B
              </h1>
              <h3 className="text-2xl font-bold text-red-600">
                B2B User Profile
              </h3>

              <p>
                <b>Email:</b> {returnUserData.email}
              </p>
              <p>
                <b>User Name:</b> {returnUserData.userName}
              </p>
              <p>
                <b>Phone:</b> {returnUserData.Phone}
              </p>
              <p>
                <b>B2B Profile ID:</b> {returnUserData.b2bProfileId}
              </p>
              <p className="text-red-600 border-b-2">
                <b>Password:</b> ******
              </p>
              <p>
                <b>B2B Profile createdBy:</b> {returnUserData.createdBy}
              </p>
              <p>
                <b>B2B Profile createdAt:</b>{" "}
                {new Date(returnUserData.createdAt).toLocaleString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleEmailSend}
                  disabled={isEmailConfirm}
                  className={`bg-green-600 hover:bg-green-700 
    ${isEmailConfirm ? "cursor-not-allowed opacity-60" : ""}
  `}
                >
                  {emailSending ? "sending..." : "Send Email"}
                </Button>

                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCredential;
