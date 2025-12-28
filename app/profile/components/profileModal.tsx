"use client";

import { useState, useRef } from "react";
import { X, Upload, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Loader from "@/components/ui/loader";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  userRole: string;
  avatar: string;
  password?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}

export function EditProfileModal({
  isOpen,
  user,
  onClose,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    password: "",
    confirmPassword: "",
    avatar: user.avatar,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "pcakge_img_uploade");
    data.append("cloud_name", "dqyfwfeed");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      

      if (!result.secure_url) {
        throw new Error("Image upload failed");
      }

      setPreviewImage(result.secure_url);
      setFormData((prev) => ({
        ...prev,
        avatar: result.secure_url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    setIsLoading(true);

    try {
      // Simulate API call

      const updateData: Partial<User> = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
      };

      //   if (formData.password) {
      //     updateData.password = formData.password;
      //   }

      const res = await fetch(
        `https://gm-international-server-gamma.vercel.app/user/updated-profile/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title: "User data updated successfully",
          icon: "success",
          draggable: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

 

  if (isLoading) return <Loader />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-linear-to-r from-red-600 to-red-500">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
              <img
                src={previewImage || formData.avatar || "/placeholder.svg"}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              <Upload className="w-4 h-4" />
              Upload Picture
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>

            {/* Password */}
            {/* <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                New Password (Optional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div> */}

            {/* Confirm Password */}
            {/* {formData.password && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )} */}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-foreground rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
