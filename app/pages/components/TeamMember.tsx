import React from 'react'
import Image from "next/image";
import {
  Users,
  Globe,
  Award,
  BookOpen,
  CheckCircle,
  Target,
  Heart,
  Shield,
} from "lucide-react";
import { TeamMember } from '@/app/dashboard/setting/about/components/ManageTeamMember';

const TeamMemberCom = ({ members }: { members: any }) => {
  const stats = [
    { value: "5000+", label: "Students Placed", icon: Users },
    { value: "10+", label: "Countries", icon: Globe },
    { value: "8+", label: "Years Experience", icon: Award },
    { value: "200+", label: "University Partners", icon: BookOpen },
  ];

  const features = [
    {
      icon: Target,
      title: "Personalized Counseling",
      description:
        "We understand your dreams and guide you to the right university and course.",
    },
    {
      icon: Shield,
      title: "100% Visa Assistance",
      description:
        "End-to-end support for your student visa application with expert documentation.",
    },
    {
      icon: Heart,
      title: "Scholarship Guidance",
      description:
        "Helping you secure financial aid and scholarships to study abroad affordably.",
    },
    {
      icon: CheckCircle,
      title: "Test Preparation",
      description:
        "Expert coaching for IELTS, TOEFL, PTE, and other language proficiency tests.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-red-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-red-600">GM International</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Trusted Partner in Overseas Education Since 2016
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower Bangladeshi students with the guidance and support they
              need to access world-class education abroad. We bridge the gap
              between dreams and reality through expert counseling, transparent
              processes, and unwavering support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be Bangladesh's most trusted education consultancy, recognized
              for integrity, excellence, and successful student outcomes across
              the globe. We envision a future where every deserving student can
              pursue their international education dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(180deg, #301314 0%,#CA2328 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <Icon className="w-8 h-8 mx-auto mb-4 opacity-90" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features/Why Choose Us */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose GM International?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We don't just send students abroad; we build careers and futures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <div className="bg-red-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {members.map((member: TeamMember) => (
              <div
                key={member._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="h-64 bg-linear-to-br from-red-400 to-red-500 relative">
                  {/* Placeholder for team image - replace with actual images */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                    {/* {member.name.charAt(0)} */}
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={450}
                      height={450}
                      //   className= "object-cover"
                      className={`w-full h-full object-cover ${member.name === "Anik Saha" ? "object-top" : ""}`}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div
          className="rounded-3xl p-12 text-center text-white max-w-4xl mx-auto"
          style={{
            background: "linear-gradient(360deg, #301314 0%,#CA2328 100%)",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's make your study abroad dream a reality
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105">
            Book Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default TeamMemberCom;