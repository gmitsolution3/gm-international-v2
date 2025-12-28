"use client";

import React, { useState } from "react";
import { ProfileHeader } from "./profileHeader";
import { ProfileCard } from "./profileCard";
import { ProfileStats } from "./profileState";
import { EditProfileModal } from "./profileModal";

interface UserProfileData {
  userProfleData: {
    _id: string;
    username: string;
    email: string;
    phone: string;
    userRole: string;
    avatar: string;
    createdAt: Date;
    updateAt: Date;
  };
}

const MainProfile = ({ userProfleData }: UserProfileData) => {
  const [user, setUser] = useState(userProfleData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //   const handleProfileUpdate =async (updatedData: any) => {
  //      
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       ...updatedData,
  //     }));

  //     try {
  //     const res = await fetch(`https://gm-international-server-gamma.vercel.app/user/updated-profile/${user._id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedData),
  //     });

  //     const result = await res.json();

  //     if (result.success) {
  //       // update local state
  //       setUser((prev) => ({ ...prev, ...result.data }));

  //       alert("Profile updated successfully!");
  //       setIsEditModalOpen(false);
  //     } else {
  //       alert(result.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong!");
  //   }

  //     
  //     // setIsEditModalOpen(false);
  //   };

  return (
    <div>
      <div className="relative z-10">
        <ProfileHeader
          user={user}
          onEditClick={() => setIsEditModalOpen(true)}
        />
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <ProfileCard user={user} />
            <ProfileStats user={user} />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        user={user}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default MainProfile;
