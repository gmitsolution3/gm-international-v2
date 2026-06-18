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
    updatedAt: Date;
  };
}

const MainProfile = ({ userProfleData }: UserProfileData) => {
  const [user, setUser] = useState(userProfleData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
