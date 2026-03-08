// components/NewsletterPage.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiHeart,
  FiBookOpen,
  FiCheckCircle,
  FiX,
  FiSend,
  FiAward,
  FiUsers,
} from "react-icons/fi";

// Types
interface FormData {
  name: string;
  email: string;
  country: string;
  interests: string[];
}

interface Country {
  name: string;
  flag: string;
}

const NewsletterPage: React.FC = () => {
  // States
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    interests: [],
  });

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Services with red theme colors
  const services = [
    {
      id: "tourist",
      name: "Tourist Visa",
      icon: FiGlobe,
      color: "from-red-500 to-red-600",
    },
    {
      id: "medical",
      name: "Medical Visa",
      icon: FiHeart,
      color: "from-red-400 to-red-500",
    },
    {
      id: "business",
      name: "Business Visa",
      icon: FiBriefcase,
      color: "from-red-600 to-red-700",
    },
    {
      id: "scholarship",
      name: "Scholarship",
      icon: FiBookOpen,
      color: "from-red-500 to-red-600",
    },
  ];

  // Countries served
  const countries: Country[] = [
    { name: "China", flag: "🇨🇳" },
    { name: "Malaysia", flag: "🇲🇾" },
    { name: "Thailand", flag: "🇹🇭" },
  ];

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle interest selection
  const toggleInterest = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(serviceId)
        ? prev.interests.filter((id) => id !== serviceId)
        : [...prev.interests, serviceId],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setShowPopup(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setFormData({ name: "", email: "", country: "", interests: [] });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Red Theme */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: "linear-gradient(360deg, #301314 0%,#CA2328 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-30 h-28 bg-white rounded-full mb-8"
            >
              {/* <FiMail className="w-10 h-10 text-red-600" /> */}
              <img
                src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                alt="company_logo"
                className="max-w-20"
              />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stay Updated with
              <span className="block text-red-200">GM International</span>
            </h1>

            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Get the latest visa updates, travel advisories, and exclusive
              opportunities delivered to your inbox
            </p>
          </div>
        </motion.div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 text-gray-50"
            preserveAspectRatio="none"
            viewBox="0 0 1440 74"
          >
            <path
              fill="currentColor"
              d="M0,0 C480,74 960,74 1440,0 L1440,74 L0,74 Z"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Benefits & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Why Subscribe?
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: FiGlobe,
                    text: "Exclusive visa updates for 20+ countries",
                  },
                  {
                    icon: FiBriefcase,
                    text: "Business opportunities and trade alerts",
                  },
                  {
                    icon: FiHeart,
                    text: "Medical travel tips and health advisories",
                  },
                  {
                    icon: FiBookOpen,
                    text: "Scholarship deadlines and requirements",
                  },
                  {
                    icon: FiAward,
                    text: "Special offers and discounted services",
                  },
                  { icon: FiUsers, text: "Join 10,000+ successful travelers" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="shrink-0">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                    <p className="text-gray-600">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Countries We Serve */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Countries We Serve
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {countries.map((country, index) => (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm text-gray-700">
                        {country.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Subscription Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Subscribe to Our Newsletter
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Country Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interests Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    I'm interested in (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = formData.interests.includes(
                        service.id,
                      );

                      return (
                        <motion.button
                          key={service.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleInterest(service.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            isSelected
                              ? `bg-linear-to-r ${service.color} text-white border-transparent`
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 mx-auto mb-2 ${
                              isSelected ? "text-white" : "text-gray-600"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {service.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                    isLoading || isSubscribed
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : isSubscribed ? (
                    <span className="flex items-center justify-center">
                      <FiCheckCircle className="w-5 h-5 mr-2" />
                      Subscribed Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FiSend className="w-5 h-5 mr-2" />
                      Subscribe Now
                    </span>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from GM International.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-white rounded-lg shadow-2xl border-l-4 border-red-600 p-6 max-w-md">
              <div className="flex items-start">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Successfully Subscribed!
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Thank you for subscribing to GM International newsletter.
                    We'll keep you updated with the latest visa news and
                    opportunities.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="ml-4 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Note */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            Join our community of 10,000+ subscribers and never miss an
            important update!
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="w-2 h-2 bg-red-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
