'use client';

import { useEffect, useState } from 'react';
import { Edit2 } from 'lucide-react';

interface User {
  username: string;
  userRole: string;
  avatar: string;
}

export function ProfileHeader({ user, onEditClick }: { user: User; onEditClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-96 bg-linear-to-r from-red-600 via-red-500 to-red-700 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-size-[60px_60px] animate-slide"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        {/* Profile Avatar with animation - Made clickable with edit button */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <button
            onClick={onEditClick}
            className="relative w-40 h-40 mb-6 group focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white rounded-full p-1 shadow-2xl">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <Edit2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-red-400/30 to-transparent animate-pulse"></div>
          </button>
        </div>

        {/* Name and Role with animation */}
        <div
          className={`text-center transform transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3 drop-shadow-lg">
            {user.username}
          </h1>
          <p className="text-xl sm:text-2xl text-red-100 font-medium drop-shadow-md">
            {user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
}
