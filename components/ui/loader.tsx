import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-15 w-15 border-t-4 border-red-600"></div>
    </div>
  );
};

export default Loader;
