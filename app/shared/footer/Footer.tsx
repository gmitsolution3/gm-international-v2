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
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    window.location.href = "weixin://dl/chat?apon_01";
    setTimeout(() => {
      window.open("https://www.wechat.com/", "_blank");
    }, 2000);
  };

  const handleTestimonialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/#testimonials");
    } else {
      const section = document.getElementById("testimonials");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleOffer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/#offers");
    } else {
      const section = document.getElementById("offers");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/#faq");
    } else {
      const section = document.getElementById("faq");
      section?.scrollIntoView({ behavior: "smooth" });
    }
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
              <div className="space-y-2">
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
                  <strong>Our China Wirehouse Address:</strong>{" "}
                  广东省广州市白云区龙归街道南岭岗埔路三街2号厂房一楼（
                  云采供应链 ）
                </p>
              </div>
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
                    onClick={handleOffer}
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
                    href="https://www.chinese.cn/page/#/pcpage/mainpage"
                    target="_blank"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    CIS Scholarship
                  </a>
                </li>
                <li>
                  <a
                    href="https://eng.yidaiyilu.gov.cn"
                    target="_blank"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Belt & Road Initiative
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.campuschina.org"
                    target="_blank"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Chinese Government Scholarship
                  </a>
                </li>
              </ul>
            </div>

            {/* About Us Section */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-bold text-lg mb-4 md:mb-6">
                About
              </h3>
              <ul className="space-y-3 text-center md:text-left">
                <li>
                  <Link
                    href="/pages/about"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                    onClick={handleTestimonialsClick}
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleFAQ}
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <Link
                    href="./pages/privacy-policy"
                    target="_blank"
                    // onClick={handleFAQ}
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="./pages/refund-policy"
                    target="_blank"
                    
                    className="text-white text-sm hover:text-green-200 hover:underline transition"
                  >
                    Refund Policy
                  </Link>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition group">
                  <img
                    src="https://i.postimg.cc/2S2ZkPY4/Whats-App-Image-2026-03-02-at-11-33-03-AM.jpg"
                    alt="WhatsApp QR"
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <p className="text-white text-xs font-semibold text-center">
                    WhatsApp
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition group">
                  <img
                    src="https://i.postimg.cc/8CnTyv3D/mmqrcode1766604271983.png"
                    alt="WeChat QR"
                    className="w-full aspect-square object-cover rounded-lg mb-2"
                  />
                  <p className="text-white text-xs font-semibold text-center">
                    WeChat
                  </p>
                </div>
              </div>

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

          {/* Divider */}
          <div className="border-t border-white border-opacity-20 mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-xs md:text-sm gap-4">
            <Link
              href="./pages/terms&conditions"
              target="_blank"
              // onClick={handleFAQ}
              className="text-white text-sm hover:text-green-200 hover:underline transition"
            >
              Terms And Conditions
            </Link>
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

// "use client";

// import {
//   Facebook,
//   Instagram,
//   Music2,
//   Github,
//   MessageCircleMore,
//   MapPin,
//   Phone,
//   Mail,
//   Globe,
//   ChevronRight,
// } from "lucide-react";
// import { IoLogoWechat } from "react-icons/io5";
// import { AiOutlineYoutube } from "react-icons/ai";
// import { FaWhatsapp, FaWeixin, FaTiktok } from "react-icons/fa";
// import Link from "next/link";
// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleSubmit = () => {
//     if (email.trim()) {
//       setSubmitted(true);
//       setEmail("");
//       setTimeout(() => setSubmitted(false), 3000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };

//   const handleWeChatClick = (e: any) => {
//     e.preventDefault();
//     window.location.href = "weixin://dl/chat?apon_01";
//     setTimeout(() => {
//       window.open("https://www.wechat.com/", "_blank");
//     }, 2000);
//   };

//   const handleTestimonialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     if (pathname !== "/") {
//       router.push("/#testimonials");
//     } else {
//       const section = document.getElementById("testimonials");
//       section?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleOffer = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     if (pathname !== "/") {
//       router.push("/#offers");
//     } else {
//       const section = document.getElementById("offers");
//       section?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     if (pathname !== "/") {
//       router.push("/#faq");
//     } else {
//       const section = document.getElementById("faq");
//       section?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const socialLinks = [
//     {
//       name: "WeChat",
//       icon: IoLogoWechat,
//       href: "#",
//       onClick: handleWeChatClick,
//       qrCode: "https://i.postimg.cc/8CnTyv3D/mmqrcode1766604271983.png",
//       color: "hover:bg-green-500",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       href: "https://www.facebook.com/gminternational.live",
//       color: "hover:bg-blue-600",
//     },
//     {
//       name: "YouTube",
//       icon: AiOutlineYoutube,
//       href: "https://www.youtube.com/@gminternationalvisaagency",
//       color: "hover:bg-red-600",
//     },
//     {
//       name: "TikTok",
//       icon: Music2,
//       href: "https://www.tiktok.com/@gminternational.live",
//       color: "hover:bg-black",
//     },
//   ];

//   const exploreLinks = [
//     { name: "New offers", onClick: handleOffer },
//     { name: "Become a B2B partner", href: "/b2b" },
//     {
//       name: "CIS Scholarship",
//       href: "https://www.chinese.cn/page/#/pcpage/mainpage",
//       external: true,
//     },
//     {
//       name: "Belt & Road Initiative",
//       href: "https://eng.yidaiyilu.gov.cn",
//       external: true,
//     },
//     {
//       name: "Chinese Government Scholarship",
//       href: "https://www.campuschina.org",
//       external: true,
//     },
//   ];

//   const aboutLinks = [
//     { name: "About us", href: "/pages/about" },
//     { name: "Testimonials", onClick: handleTestimonialsClick },
//     { name: "FAQ", onClick: handleFAQ },
//     { name: "Privacy policy", href: "./pages/privacy-policy" },
//     { name: "Refund Policy", href: "./pages/refund-policy" },
//     { name: "Terms And Conditions", href: "./pages/terms&conditions" },
//   ];

//   const branchLocations = [
//     { country: "Bangladesh", cities: ["Mirpur", "Bogura"] },
//     { country: "China", cities: ["Guangzhou", "Kunming"] },
//   ];

//   return (
//     <footer className="relative mt-16 z-10">
//       {/* Main Footer Content */}
//       <div
//         className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 rounded-t-4xl"
//         style={{
//           background: "linear-gradient(180deg, #CA2328 0%, #301314 100%)",
//         }}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Mobile: 2 columns, Tablet/Laptop: 4 columns */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-12">
//             {/* Brand Section - Full width on mobile, 1 column on larger */}
//             <div className="col-span-2 lg:col-span-1">
//               <div className="flex flex-col items-center lg:items-start">
//                 {/* Logo */}
//                 <div className="bg-white rounded-2xl p-4 mb-6 w-28 h-28 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
//                   <img
//                     src="https://i.postimg.cc/WbV55LZS/Group-2.png"
//                     alt="GM International"
//                     className="max-w-24"
//                   />
//                 </div>

//                 {/* Description */}
//                 <p className="text-white/90 text-center lg:text-left text-sm leading-relaxed mb-4">
//                   We're here for you every step of the way. So count on us as we
//                   ensure your success and satisfaction.
//                 </p>

//                 {/* Branches */}
//                 <div className="w-full space-y-3">
//                   {branchLocations.map((branch) => (
//                     <div
//                       key={branch.country}
//                       className="flex items-start gap-2"
//                     >
//                       <MapPin
//                         size={16}
//                         className="text-red-300 mt-1 shrink-0"
//                       />
//                       <div>
//                         <span className="text-white font-semibold text-sm">
//                           {branch.country}:
//                         </span>
//                         <div className="flex flex-wrap gap-2 mt-1">
//                           {branch.cities.map((city) => (
//                             <span
//                               key={city}
//                               className="text-white/80 text-xs px-2 py-1 bg-white/10 rounded-full"
//                             >
//                               {city}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* China Address */}
//                 <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
//                   <p className="text-white/80 text-xs leading-relaxed">
//                     <span className="font-semibold block mb-1">
//                       China Warehouse:
//                     </span>
//                     广东省广州市白云区龙归街道南岭岗埔路三街2号厂房一楼（云采供应链）
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Explore Section - Mobile column 1 */}
//             <div className="col-span-1">
//               <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
//                 Explore
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-400 rounded-full"></span>
//               </h3>
//               <ul className="space-y-3">
//                 {exploreLinks.map((link, index) => (
//                   <li key={index}>
//                     {link.onClick ? (
//                       <a
//                         href="#"
//                         onClick={link.onClick}
//                         className="text-white/80 hover:text-white text-sm flex items-center gap-2 group transition"
//                       >
//                         <ChevronRight
//                           size={14}
//                           className="group-hover:translate-x-1 transition-transform"
//                         />
//                         {link.name}
//                       </a>
//                     ) : (
//                       <Link
//                         href={link.href || "#"}
//                         target={link.external ? "_blank" : undefined}
//                         className="text-white/80 hover:text-white text-sm flex items-center gap-2 group transition"
//                       >
//                         <ChevronRight
//                           size={14}
//                           className="group-hover:translate-x-1 transition-transform"
//                         />
//                         {link.name}
//                       </Link>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* About Section - Mobile column 2 */}
//             <div className="col-span-1">
//               <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
//                 About
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-400 rounded-full"></span>
//               </h3>
//               <ul className="space-y-3">
//                 {aboutLinks.map((link, index) => (
//                   <li key={index}>
//                     {link.onClick ? (
//                       <a
//                         href="#"
//                         onClick={link.onClick}
//                         className="text-white/80 hover:text-white text-sm flex items-center gap-2 group transition"
//                       >
//                         <ChevronRight
//                           size={14}
//                           className="group-hover:translate-x-1 transition-transform"
//                         />
//                         {link.name}
//                       </a>
//                     ) : (
//                       <Link
//                         href={link.href || "#"}
//                         className="text-white/80 hover:text-white text-sm flex items-center gap-2 group transition"
//                       >
//                         <ChevronRight
//                           size={14}
//                           className="group-hover:translate-x-1 transition-transform"
//                         />
//                         {link.name}
//                       </Link>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Social & Newsletter - Full width on mobile, 1 column on larger */}
//             <div className="col-span-2 lg:col-span-1">
//               <h3 className="text-white font-bold text-lg mb-4 relative inline-block">
//                 Connect With Us
//                 <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-400 rounded-full"></span>
//               </h3>

//               {/* Social Icons */}
//               <div className="flex flex-wrap gap-3 mb-6">
//                 {socialLinks.map((social) => (
//                   <div
//                     key={social.name}
//                     className="relative group"
//                     onMouseEnter={() => setHoveredSocial(social.name)}
//                     onMouseLeave={() => setHoveredSocial(null)}
//                   >
//                     <a
//                       href={social.href}
//                       onClick={social.onClick}
//                       target={
//                         social.href.startsWith("http") ? "_blank" : undefined
//                       }
//                       className="block"
//                     >
//                       <div
//                         className={`bg-white/10 hover:bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3 border border-white/20`}
//                       >
//                         <social.icon size={20} className="text-white" />
//                       </div>
//                     </a>

//                     {/* QR Code for WeChat */}
//                     {social.name === "WeChat" && hoveredSocial === "WeChat" && (
//                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none z-50">
//                         <div className="bg-white p-2 rounded-lg shadow-xl">
//                           <img
//                             src={social.qrCode}
//                             alt="WeChat QR"
//                             className="w-32 h-36 object-cover rounded"
//                           />
//                           <p className="text-xs text-center text-gray-600 mt-1">
//                             Scan to chat
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* QR Codes Grid - 2 columns on mobile */}
//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition group">
//                   <img
//                     src="https://i.postimg.cc/2S2ZkPY4/Whats-App-Image-2026-03-02-at-11-33-03-AM.jpg"
//                     alt="WhatsApp QR"
//                     className="w-full aspect-square object-cover rounded-lg mb-2"
//                   />
//                   <p className="text-white text-xs font-semibold text-center">
//                     WhatsApp
//                   </p>
//                 </div>

//                 <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition group">
//                   <img
//                     src="https://i.postimg.cc/8CnTyv3D/mmqrcode1766604271983.png"
//                     alt="WeChat QR"
//                     className="w-full aspect-square object-cover rounded-lg mb-2"
//                   />
//                   <p className="text-white text-xs font-semibold text-center">
//                     WeChat
//                   </p>
//                 </div>
//               </div>

//               {/* Newsletter */}
//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <p className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
//                   <Mail size={16} className="text-red-300" />
//                   Newsletter
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Your email"
//                     className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-white/50 text-sm border border-white/20 focus:outline-none focus:border-white/40 transition"
//                   />
//                   <button
//                     onClick={handleSubmit}
//                     className="px-4 py-2.5 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition text-sm whitespace-nowrap"
//                   >
//                     {submitted ? "✓ Sent" : "Subscribe"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-white/10 my-8"></div>

//           {/* Bottom Footer - Mobile: 2 columns */}
//           <div className="grid grid-cols-2 md:flex md:flex-row md:justify-between items-center gap-4 text-white/70 text-xs md:text-sm">
//             <div className="col-span-1">
//               <Link
//                 href="/terms"
//                 className="hover:text-white transition flex items-center gap-1"
//               >
//                 <span>Terms</span>
//                 <span className="hidden sm:inline"> & Conditions</span>
//               </Link>
//             </div>

//             <div className="col-span-1 text-right md:text-center">
//               <p className="text-xs">© 2025 GM International</p>
//             </div>

//             <div className="col-span-2 text-center md:text-right mt-2 md:mt-0">
//               <span>Development by </span>
//               <a
//                 href="https://www.gmitsolution.net/"
//                 target="_blank"
//                 className="text-white hover:underline font-medium"
//               >
//                 GM IT Solution
//               </a>
//             </div>
//           </div>

//           {/* Powered by GM Group */}
//           <div className="mt-6 text-center">
//             <a
//               href="https://www.facebook.com/profile.php?id=61578361911412"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 group bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition"
//             >
//               <span className="text-xs text-white/60">Powered by</span>
//               <span className="text-sm font-bold bg-linear-to-r from-white to-red-300 bg-clip-text text-transparent">
//                 GM Group
//               </span>
//               <ChevronRight
//                 size={14}
//                 className="text-white/60 group-hover:translate-x-0.5 transition-transform"
//               />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
