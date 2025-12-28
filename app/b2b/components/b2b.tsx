"use client";

import React, { useState } from "react";
import { B2BApplyForm } from "./b2bApplyForm";
import { Button } from "@/components/ui/button";
import { B2BLogin } from "./b2bLogin";

export const B2bSide = () => {
  const [activeView, setActiveView] = useState<"login" | "signup" | null>(null);

  return (
    <div>
      <div className="flex justify-center gap-6">
        <Button onClick={() => setActiveView("login")}>Login</Button>

        <Button onClick={() => setActiveView("signup")}>
          Become A B2B Partner
        </Button>
      </div>
      <div>
        {activeView === "login" && <B2BLogin />}
        {activeView === "signup" && <B2BApplyForm />}
      </div>
    </div>
  );
};
