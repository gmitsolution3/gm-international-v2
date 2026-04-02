"use client";

import {
  Clock,
  Compass,
  Moon,
  Star,
  Bell,
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const UmrahHajjComingSoonWithTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15); // Set launch date 15 days from now
    targetDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Moon className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Umrah & Hajj
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl text-emerald-600">✦</span>
            <Star className="w-8 h-8 text-emerald-600" />
          </div>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your sacred journey awaits. We're crafting the perfect pilgrimage
            experience for you.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-center text-lg font-semibold mb-6 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Launching In
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl sm:text-4xl font-bold">
                  {timeLeft.days}
                </div>
                <div className="text-xs sm:text-sm opacity-90">Days</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl sm:text-4xl font-bold">
                  {timeLeft.hours}
                </div>
                <div className="text-xs sm:text-sm opacity-90">Hours</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl sm:text-4xl font-bold">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs sm:text-sm opacity-90">Minutes</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                <div className="text-3xl sm:text-4xl font-bold">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs sm:text-sm opacity-90">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: MapPin,
              title: "Best Locations",
              desc: "Near Haram hotels",
            },
            {
              icon: Users,
              title: "Expert Guides",
              desc: "Knowledgable scholars",
            },
            {
              icon: Heart,
              title: "Complete Care",
              desc: "Medical & travel support",
            },
            { icon: Phone, title: "24/7 Support", desc: "Always here to help" },
          ].map((feature, idx) => (
            <div key={idx} className="text-center p-4">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            Get Early Access
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Be the first to know when we launch and get exclusive early-bird
            discounts!
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Notify Me When Live
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 mt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-emerald-600"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-emerald-600"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-emerald-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-emerald-600"
            >
              Terms & Conditions
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 Umrah & Hajj Services. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UmrahHajjComingSoonWithTimer;
