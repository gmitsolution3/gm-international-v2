"use client";

import {
  Facebook,
  Instagram,
  Music2,
  Github,
  MessageCircleMore,
} from "lucide-react";
import { IoLogoWechat } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleWeChatClick = (e: any) => {
    e.preventDefault();

    // অ্যাপ ওপেন করার চেষ্টা করবে
    window.location.href = "weixin://dl/chat?apon_01";

    // যদি ২ সেকেন্ডের মধ্যে অ্যাপ ওপেন না হয়, তবে ব্রাউজার লিংকে নিয়ে যাবে
    setTimeout(() => {
      window.open("https://www.wechat.com/", "_blank");
    }, 2000);
  };

  return (
    <footer className="relative mt-16 z-10">
      {/* Main Footer Content */}
      <div
        className="py-12 md:py-16 px-6 md:px-8 lg:px-12 rounded-t-4xl"
        style={{
          background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start">
              <div className="bg-white rounded-2xl p-3 mb-6 w-24 h-24 flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                    alt="company logo"
                    className="max-w-20"
                  />
                </div>
              </div>
              <p className="text-white text-center md:text-left text-sm leading-relaxed">
                We're here for you every step of the way. So count on us as we
                ensure your success and satisfaction.
              </p>{" "}
              <br />
              <p className="text-white text-center md:text-left text-sm leading-relaxed">
                <strong>Bangladesh Branches:</strong>
                <a
                  href="https://www.facebook.com/gminternational.live"
                  className="ml-2 hover:underline"
                  target="_blank"
                >
                  Mirpur
                </a>{" "}
                |
                <a
                  href="https://www.facebook.com/gminternationalbogura"
                  className="ml-2 hover:underline"
                  target="_blank"
                >
                  Bogura
                </a>
              </p>{" "}
              <br />
              <p className="text-white text-center md:text-left text-sm leading-relaxed">
                <strong>China Branches:</strong>{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=61580654585072"
                  className="hover:underline"
                  target="_blank"
                >
                  Guangzhou
                </a>{" "}
                | Kunming
              </p>
              <p className="text-white text-center md:text-left text-sm leading-relaxed">
                <strong>Our wirehouse address:</strong>{" "}
                广东省广州市白云区龙归街道南岭岗埔路三街2号厂房一楼（ 云采供应链
                ）
              </p>
            </div>

            {/* Explore Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold text-lg mb-4 md:mb-6">
                Explore
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    New offers
                  </a>
                </li>
                <li>
                  <Link
                    href="/b2b"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Become a B2B partner
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Scholarships
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>

            {/* About Us Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold text-lg mb-4 md:mb-6">
                About Us
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media & Newsletter */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold text-lg mb-4 md:mb-6">
                Social Media
              </h3>
              <div className="flex gap-4 mb-6">
                <div className="relative group w-10 h-10 flex items-center justify-center">
                  <a
                    onClick={(e) => handleWeChatClick(e)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
                  >
                    <IoLogoWechat size={20} className="text-black" />
                  </a>

                  {/* HOVER IMAGE (layout er baire) */}
                  <div
                    className="absolute top-1/2 -left-47.5 -translate-y-1/2
                  opacity-0 group-hover:opacity-100
                  scale-95 group-hover:scale-100
                  transition-all duration-300
                  pointer-events-none z-50"
                  >
                    <img
                      src="https://i.postimg.cc/8CnTyv3D/mmqrcode1766604271983.png"
                      alt="Wechat QR"
                      className="w-42 h-48 rounded-lg shadow-lg border bg-white"
                    />
                  </div>
                </div>
                <div className="bg-white w-10 h-10 flex justify-center items-center bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition">
                  <a
                    href="https://www.facebook.com/gminternational.live"
                    target="_blank"
                  >
                    <Facebook size={20} className="text-black" />
                  </a>
                </div>
                <div className="bg-white w-10 h-10 flex justify-center items-center bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition">
                  <a
                    href="https://www.youtube.com/@gminternationalvisaagency"
                    target="_blank"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
                  >
                    {/* <Instagram size={20} className="text-black" /> */}
                    {/* <FaYoutube /> */}
                    <AiOutlineYoutube size={20} className="text-black" />
                  </a>
                </div>
                <div className="bg-white w-10 h-10 flex justify-center items-center bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition">
                  <a
                    href="https://www.tiktok.com/@gminternational.live"
                    target="_blank"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
                  >
                    <Music2 size={20} className="text-black font-bold" />
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="w-full">
                <p className="text-white text-sm font-semibold mb-3 text-center md:text-left">
                  Sign up for our newsletter
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Your Mail"
                    className="px-4 py-3 rounded-lg text-sm  bg-opacity-10 text-white placeholder-gray-300 border border-white border-opacity-30 focus:outline-none focus:border-opacity-60 transition"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition text-sm"
                  >
                    {submitted ? "✓ Submitted" : "Submit"}
                  </button>
                </div>

                {/* Powered by GM Group - Redesigned */}
                <div className="mt-6 pt-4 border-t border-white border-opacity-20 text-center md:text-left">
                  <a
                    href="https://www.facebook.com/profile.php?id=61578361911412"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group"
                  >
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      Powered by
                    </span>
                    <span className="text-sm font-bold bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-red-700 group-hover:to-red-400 transition-all duration-300">
                      GM Group
                    </span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white border-opacity-20 my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-xs md:text-sm gap-4">
            <a href="#" className="hover:text-gray-200 transition">
              Terms & Conditions
            </a>
            <p className="text-center">
              Copyright @2025 GM International all right reserved.
            </p>
            <div>
              Development by
              <a
                href="https://www.gmitsolution.net/"
                target="_blank"
                className="hover:text-gray-200 transition ml-1 hover:underline"
              >
                GM IT Solution
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
