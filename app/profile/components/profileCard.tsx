'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Shield } from 'lucide-react';

interface User {
  username: string;
  email: string;
  phone: string;
  userRole: string;
  createdAt: Date;
  updateAt: Date;
}

export function ProfileCard({ user }: { user: User }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const infoItems = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Phone', value: user.phone },
    { icon: Calendar, label: 'Member Since', value: formatDate(user.createdAt) },
    { icon: Shield, label: 'Role', value: user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1) },
  ];

  return (
    <div
      className={`transform transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-800/50 overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-slate-800/70 transition-shadow duration-300">
        <div className="h-1 bg-linear-to-r from-red-600 via-red-500 to-red-700"></div>
        
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-foreground mb-8">Profile Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infoItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.label}
                  className="transform transition-all duration-500 hover:scale-105 group"
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors duration-300">
                    <div className="mt-1 p-3 bg-linear-to-br from-red-600 to-red-500 rounded-lg text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      <p className="text-lg font-medium text-foreground break-all">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
