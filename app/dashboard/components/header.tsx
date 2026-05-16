"use client";

import React, { useState } from "react";
import Header from "../scholarship/components/Header";

interface SidebarProps {
  avatar: string | undefined;
  userRole: string;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

const DashboardHeader = ({
  avatar,
  userRole,
  onMenuToggle,
  sidebarOpen,

}: SidebarProps) => {
  return (
    <div className="sticky top-0">
      <Header
        onMenuToggle={onMenuToggle}
        sidebarOpen={sidebarOpen}
        avatar={avatar}
        userRole={userRole}
      />
    </div>
  );
};

export default DashboardHeader;
