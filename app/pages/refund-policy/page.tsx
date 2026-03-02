// components/RefundPolicy.tsx
import React from "react";

interface RefundPolicyProps {
  companyName?: string;
  contactEmail?: string;
  primaryColor?: string;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({
  companyName = "GM International",
  contactEmail = "info@gminternational.live",
  primaryColor = "red",
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
                  Refund Policy & Financial Guidelines
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <i className="fas fa-shield-alt text-red-200"></i>
              <span className="text-sm text-red-800 font-medium">
                Transparent & Fair Policy
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
            The Refund Policy of{" "}
            <span className="font-semibold text-red-600">{companyName}</span>{" "}
            details the conditions under which full and partial refunds may be
            issued, as well as circumstances that preclude any refund. The
            policy is designed to provide clarity for partners and students
            regarding the financial commitments and the specific scenarios that
            may affect their eligibility for refunds. By determining the
            responsibilities of both{" "}
            <span className="font-semibold text-red-600">{companyName}</span>{" "}
            and the partners, as well as students, the policy aims to foster
            transparency and understanding in the admission process.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center mb-2">
              <i className="fas fa-check-circle text-green-600 text-xl mr-2"></i>
              <h3 className="font-semibold text-green-800">Full Refund</h3>
            </div>
            <p className="text-sm text-green-700">
              Eligible under specific conditions
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
            <div className="flex items-center mb-2">
              <i className="fas fa-adjust text-yellow-600 text-xl mr-2"></i>
              <h3 className="font-semibold text-yellow-800">Partial Refund</h3>
            </div>
            <p className="text-sm text-yellow-700">50-70% refund applicable</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
            <div className="flex items-center mb-2">
              <i className="fas fa-times-circle text-red-600 text-xl mr-2"></i>
              <h3 className="font-semibold text-red-800">No Refund</h3>
            </div>
            <p className="text-sm text-red-700">Circumstances not eligible</p>
          </div>
        </div>

        {/* Refund Sections */}
        <div className="space-y-6">
          {/* Full Refund Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-green-500">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <i className="fas fa-check-circle text-green-600 text-2xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                When {companyName} Can Refund (Full Payment)
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <i className="fas fa-file-alt text-green-600 mt-1 mr-3 text-xl"></i>
                <div>
                  <p className="font-semibold text-gray-800">
                    Admission & JW202 Failure
                  </p>
                  <p className="text-gray-600">
                    If {companyName} fails to provide any admission notice and
                    JW202 (Visa Application Form for Study in China) to students
                    after receiving complete documents.
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-green-50 p-4 rounded-lg">
                <i className="fas fa-university text-green-600 mt-1 mr-3 text-xl"></i>
                <div>
                  <p className="font-semibold text-gray-800">
                    Unsolicited Admission Letter
                  </p>
                  <p className="text-gray-600">
                    If {companyName} provides an admission letter without
                    consulting with students and if students do not agree to go
                    there.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-red-600">NB:</span>{" "}
                  {companyName} will refund the service charge deposit, not the
                  application fee, which will be paid to the University.
                </p>
              </div>
            </div>
          </section>

          {/* Partial Refund Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <i className="fas fa-adjust text-yellow-600 text-2xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                When {companyName} Can Refund (Partial)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-passport text-yellow-600 mr-2"></i>
                  <h3 className="font-semibold">Visa Issues</h3>
                </div>
                <p className="text-sm text-gray-600">
                  If students do not get visas because of {companyName} or the
                  University's problem.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-heartbeat text-yellow-600 mr-2"></i>
                  <h3 className="font-semibold">Serious Family Issues</h3>
                </div>
                <p className="text-sm text-gray-600">
                  If a student has a serious family issue, such as a medical
                  issue, and cannot go to China.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg md:col-span-2">
                <div className="flex items-center mb-2">
                  <i className="fas fa-plane-slash text-yellow-600 mr-2"></i>
                  <h3 className="font-semibold">Medical Travel Restrictions</h3>
                </div>
                <p className="text-sm text-gray-600">
                  If students cannot fly because of medical issues.
                </p>
              </div>
            </div>
          </section>

          {/* No Refund Section */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow border-t-4 border-red-600">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <i className="fas fa-times-circle text-red-600 text-2xl"></i>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                When Students Do Not Get Any Refund
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-user-slash text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Voluntary Withdrawal</h3>
                    <p className="text-sm text-gray-600">
                      If any students give up at any stage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-comment-slash text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Interview Failure</h3>
                    <p className="text-sm text-gray-600">
                      If students fail interviews and disagree with alternative
                      university recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-clock text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Document Delay</h3>
                    <p className="text-sm text-gray-600">
                      If students do not provide all documents in time or miss
                      interviews/exams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-passport text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Personal Visa Issues</h3>
                    <p className="text-sm text-gray-600">
                      If students do not get visas because of their own
                      problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-gavel text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Criminal Record</h3>
                    <p className="text-sm text-gray-600">
                      If students have any criminal record.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-file-excel text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Fake Documents</h3>
                    <p className="text-sm text-gray-600">
                      If students provide any fake documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <div className="flex items-start">
                  <i className="fas fa-language text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">Course Refusal</h3>
                    <p className="text-sm text-gray-600">
                      If students refuse to attend English and Chinese Language
                      courses and interview preparation courses provided by{" "}
                      {companyName}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-red-600 mt-1 mr-2"></i>
                  <div>
                    <h3 className="font-semibold">In-China Disputes</h3>
                    <p className="text-sm text-gray-600">
                      If students are in China, they will not get any refund.
                      Any disputes must be resolved before coming to China.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Important Notes Section */}
        <section
          className="mt-8 rounded-2xl shadow-xl p-6 md:p-8 text-white"
          style={{
            background: "linear-gradient(360deg, #CA2328 0%, #301314 70%)",
          }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Important Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>All refund requests must be submitted in writing</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>Processing time: 30 business days for refunds</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>University application fees are non-refundable</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-red-200 mt-1 mr-3"></i>
              <span>
                Medical documentation required for health-related refunds
              </span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-red-600">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Need Clarification?
              </h3>
              <p className="text-gray-600">
                Contact our support team for any refund-related queries.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href={`mailto:${contactEmail}`}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RefundPolicy;
