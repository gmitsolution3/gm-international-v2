import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const InternationalTourist = () => {
  return (
    <div className="mix-h-[60vh] w-full flex flex-col justify-center items-center">
      <img
        src="https://i.postimg.cc/SxQt4ySd/OE60SH0.jpg"
        alt="under construction"
      />
      <Link href="/">
        <Button> Go Home</Button>
      </Link>
    </div>
  );
};

export default InternationalTourist;
