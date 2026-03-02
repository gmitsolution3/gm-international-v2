// components/TermsAndConditions.tsx
import React from "react";

interface TermsAndConditionsProps {
  companyName?: string;
  websiteUrl?: string;
  contactEmail?: string;
  effectiveDate?: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  companyName = "GM International",
  websiteUrl = "gminternational.live",
  contactEmail = "info@gminternational.live",
  effectiveDate = "March 2024",
}) => {
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
              <div className="bg-white p-3 rounded-full">
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
                  Terms and Conditions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="fas fa-gavel text-red-200"></i>
              <span className="text-sm text-red-800 font-medium">
                Last Updated: {effectiveDate}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-l-8 border-red-600">
          <div className="flex items-start">
            <i className="fas fa-hand-peace text-red-600 text-3xl mr-4 mt-1"></i>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to the{" "}
                <span className="font-semibold text-red-600">
                  {companyName}
                </span>
                . By accessing or using this platform, you agree to comply with
                and be bound by the following Terms and Conditions, Privacy
                Policy, and Refund Policy. If you do not agree, please refrain
                from using the portal.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: "fa-check-circle", label: "Acceptance", color: "red" },
            { icon: "fa-user-check", label: "Eligibility", color: "red" },
            { icon: "fa-file-alt", label: "Application", color: "red" },
            { icon: "fa-credit-card", label: "Charges", color: "red" },
            { icon: "fa-tasks", label: "Responsibilities", color: "red" },
            { icon: "fa-laptop", label: "Platform Use", color: "red" },
            { icon: "fa-balance-scale", label: "Liabilities", color: "red" },
            { icon: "fa-edit", label: "Amendments", color: "red" },
          ].map((item, index) => (
            <a
              key={index}
              href={`#section-${index + 1}`}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border-b-2 border-red-600 text-center group"
            >
              <i
                className={`fas ${item.icon} text-red-600 text-xl mb-2 group-hover:scale-110 transition-transform`}
              ></i>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </a>
          ))}
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* Section 1: Acceptance of Terms */}
          <section
            id="section-1"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">1</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Acceptance of Terms
              </h2>
            </div>
            <div className="pl-4 border-l-4 border-red-200">
              <p className="text-gray-700">
                By applying through the portal, you acknowledge that you have
                read, understood, and agreed to these Terms and Conditions,
                along with our Privacy Policy and Refund Policy.
              </p>
              <div className="mt-3 bg-red-50 p-3 rounded-lg">
                <i className="fas fa-info-circle text-red-600 mr-2"></i>
                <span className="text-sm text-gray-600">
                  Your acceptance is confirmed upon account creation and
                  application submission.
                </span>
              </div>
            </div>
          </section>

          {/* Section 2: Eligibility */}
          <section
            id="section-2"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4 ">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">2</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Eligibility
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Applicants must meet the eligibility criteria specified by the
                  university and {companyName}.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Applicants must provide accurate, authentic, and complete
                  information during the application process.
                </p>
              </div>
              <div className="flex items-start bg-red-50 p-3 rounded-lg">
                <i className="fas fa-exclamation-triangle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700 font-medium">
                  Failure to meet the eligibility criteria may result in
                  application rejection.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Application Process */}
          <section
            id="section-3"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">3</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Application Process
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-handshake text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  {companyName} acts as a facilitator to assist students in
                  applying to Chinese universities.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-file-invoice text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Submission of documents and payment of applicable service
                  charges are mandatory for application processing.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-university text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Applications are subject to review and approval by the
                  university and relevant authorities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Service Charges */}
          <section
            id="section-4"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">4</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Service Charges
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-credit-card text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Service charges are non-refundable unless specified in our{" "}
                  <a
                    href="/refund-policy"
                    className="text-red-600 hover:underline"
                  >
                    Refund Policy
                  </a>
                  .
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-receipt text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Additional fees, such as university application fees, visa
                  fees, or travel costs, are the responsibility of the
                  applicant.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-semibold text-gray-600">
                    Application Fees
                  </p>
                  <p className="text-xs text-gray-500">Paid to University</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-semibold text-gray-600">
                    Visa Fees
                  </p>
                  <p className="text-xs text-gray-500">Government Charges</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-semibold text-gray-600">
                    Travel Costs
                  </p>
                  <p className="text-xs text-gray-500">
                    Student's Responsibility
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Applicant's Responsibilities */}
          <section
            id="section-5"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">5</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Applicant's Responsibilities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Ensure accuracy of all provided documents and information
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">Meet all application deadlines</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">Attend interviews as required</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Complete all required examinations
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Platform Use */}
          <section
            id="section-6"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">6</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Platform Use
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-ban text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Unauthorized use of the portal, including sharing accounts or
                  submitting fraudulent information, is prohibited.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-shield-alt text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  {companyName} reserves the right to suspend or terminate
                  accounts for misuse or violations.
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    Prohibited activities include:
                  </span>{" "}
                  Account sharing, submitting fake documents, unauthorized
                  access attempts, and any fraudulent behavior.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Liabilities */}
          <section
            id="section-7"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">7</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Liabilities
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-exclamation-circle text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  {companyName} is not liable for circumstances beyond its
                  control, such as visa rejections, university decisions, or
                  delays caused by third parties.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-gavel text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Users are responsible for ensuring compliance with local laws
                  and regulations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="border border-red-200 p-3 rounded-lg text-center">
                  <i className="fas fa-passport text-red-600 text-xl mb-2"></i>
                  <p className="text-xs text-gray-600">Visa Rejections</p>
                </div>
                <div className="border border-red-200 p-3 rounded-lg text-center">
                  <i className="fas fa-university text-red-600 text-xl mb-2"></i>
                  <p className="text-xs text-gray-600">University Decisions</p>
                </div>
                <div className="border border-red-200 p-3 rounded-lg text-center">
                  <i className="fas fa-clock text-red-600 text-xl mb-2"></i>
                  <p className="text-xs text-gray-600">Third-party Delays</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Amendments */}
          <section
            id="section-8"
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <span className="text-red-600 font-bold text-xl">8</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Amendments
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-4 border-red-200">
              <div className="flex items-start">
                <i className="fas fa-edit text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  {companyName} reserves the right to update these Terms and
                  Conditions at any time.
                </p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-bell text-red-600 mt-1 mr-3"></i>
                <p className="text-gray-700">
                  Users will be notified of significant changes via email or
                  platform announcements.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Agreement Summary Card */}
        <section
          className="mt-8 rounded-2xl shadow-xl p-6 md:p-8 text-white"
          style={{
            background: "linear-gradient(180deg, #CA2328 0%, #301314 70%)",
          }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-handshake mr-2"></i>
            Summary of Agreement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>By using our services, you agree to all terms above</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>You confirm the accuracy of all provided information</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>You accept our Privacy and Refund Policies</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>
                You understand the non-refundable nature of service charges
              </span>
            </div>
          </div>
        </section>

        {/* Contact and Acknowledgment */}
        <section className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-red-600">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Questions About Our Terms?
              </h3>
              <p className="text-gray-600">
                We're here to clarify any concerns before you proceed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Acknowledgment Checkbox */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="flex items-start space-x-3 cursor-pointer">
              <span className="text-gray-600 text-sm">
                I have read, understood, and agree to be bound by the Terms and
                Conditions, Privacy Policy, and Refund Policy of {companyName}.
              </span>
            </label>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditions;
