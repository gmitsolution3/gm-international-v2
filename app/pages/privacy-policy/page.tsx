// components/PrivacyPolicy.tsx
import React from "react";

interface PrivacyPolicyProps {
  companyName?: string;
  contactEmail?: string;
  primaryColor?: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  companyName = "GM International",
  contactEmail = "info@gminternational.live",
  primaryColor = "red",
}) => {
  // Current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-white">
      {/* Header with red theme */}
      <header
        className="text-white shadow-lg"
        style={{
          background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
        }}
      >
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-red-50 p-4 rounded-full">
                <img
                  src="https://i.postimg.cc/WbV55LZS/Group-2.png"
                  alt="company logo"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {companyName}
                </h1>
                <p className="text-red-100 text-sm md:text-base">
                  Privacy & Data Protection
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="fas fa-shield-alt text-red-800"></i>
              <span className="text-sm text-red-800 font-medium">
                Your trust, our priority
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Last Updated Badge */}
        <div className="flex justify-end mb-6">
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
            <i className="fas fa-clock mr-2"></i>
            Last Updated: March 2024
          </div>
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-l-8 border-red-600">
          <p className="text-gray-700 text-lg leading-relaxed">
            {companyName} is committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your personal
            information.
          </p>
        </div>

        {/* Privacy Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Section 1: Information Collection */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-database text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                1. Information Collection
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              We collect the following types of information:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-user text-red-600 mt-1 mr-3"></i>
                <span>
                  <span className="font-semibold">Personal Information:</span>{" "}
                  Name, Contact Details, Passport Details, etc.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-graduation-cap text-red-600 mt-1 mr-3"></i>
                <span>
                  <span className="font-semibold">Academic Information:</span>{" "}
                  Transcripts, Certificates, Testimonial and Other Educational
                  Documents.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-credit-card text-red-600 mt-1 mr-3"></i>
                <span>
                  <span className="font-semibold">Payment Information:</span>{" "}
                  Bank Details (WeChat & Alipay Info for Virtual payment) or
                  Payment confirmations for service charges.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: Information Usage */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-cog text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                2. Information Usage
              </h2>
            </div>
            <p className="text-gray-600 mb-4">Your information is used for:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <span>Processing applications to universities.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <span>Facilitating scholarship applications.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <span>
                  Communicating with you regarding your application status.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <span>Improving our services.</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Data Sharing */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-share-alt text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                3. Data Sharing
              </h2>
            </div>
            <p className="text-gray-600 mb-4">Your data may be shared with:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-university text-red-600 mt-1 mr-3"></i>
                <span>Partner Universities</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-passport text-red-600 mt-1 mr-3"></i>
                <span>Government Bodies (for visas)</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-handshake text-red-600 mt-1 mr-3"></i>
                <span>
                  Authorized third parties as required for the application
                  process.
                </span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-medium">
                <i className="fas fa-ban mr-2"></i>
                {companyName} does not sell your personal data to third parties.
              </p>
            </div>
          </section>

          {/* Section 4: Data Security */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-lock text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                4. Data Security
              </h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-shield-alt text-red-600 mt-1 mr-3"></i>
                <span>
                  We use encryption and secure servers to protect your data.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-user-secret text-red-600 mt-1 mr-3"></i>
                <span>
                  Access to your information is limited to authorized personnel
                  only.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 5: User Rights */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-user-check text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                5. User Rights
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              You have the right to access, edit, or delete your personal data
              (not your application) by contacting us at:
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-red-50 p-4 rounded-lg">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center text-red-600 hover:text-red-700 font-medium"
              >
                <i className="fas fa-envelope mr-2"></i>
                {contactEmail}
              </a>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">
                Requests will be processed within 30 business days.
              </span>
            </div>
          </section>

          {/* Section 6: Cookies Policy */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-cookie-bite text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                6. Cookies Policy
              </h2>
            </div>
            <p className="text-gray-600">
              Cookies are used to enhance your experience on our portal. You can
              disable cookies in your browser settings if desired.
            </p>
          </section>

          {/* Section 7: Compliance */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-globe text-red-600 text-xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                7. Compliance
              </h2>
            </div>
            <p className="text-gray-600">
              {companyName} complies with international and data protection laws
              in China & Bangladesh, including GDPR and other relevant
              regulations.
            </p>
          </section>
        </div>

        {/* Contact Section */}
        <section
          className="mt-8  rounded-2xl shadow-xl p-6 md:p-8 text-white"
          style={{
            background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Have Questions About Your Privacy?
              </h3>
              <p className="text-red-100">
                Our data protection team is here to help.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
