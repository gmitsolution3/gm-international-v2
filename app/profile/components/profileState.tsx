'use client';

import { useEffect, useState } from 'react';

interface User {
  createdAt: Date;
  updateAt: Date;
}

export function ProfileStats({ user }: { user: User }) {
  const [isVisible, setIsVisible] = useState(false);
  const [memberDays, setMemberDays] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const createdDate = new Date(user.createdAt);
    const today = new Date();
    const days = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    setMemberDays(Math.max(days, 0));
  }, [user.createdAt]);

  const stats = [
    { label: 'Days as Member', value: memberDays },
    { label: 'Account Status', value: 'Active' },
    { label: 'Last Updated', value: new Date(user.updateAt).toLocaleDateString() },
  ];

  return (
    <div
      className={`transform transition-all duration-1000 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl dark:shadow-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:border-red-400 dark:hover:border-red-500 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-red-50 to-red-100 dark:from-slate-800/50 dark:to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-bold bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </div>

            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-red-400 via-red-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
