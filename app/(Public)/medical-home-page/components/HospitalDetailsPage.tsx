"use client";

import { MedicalFormData } from "@/app/dashboard/medical/admin/manage-application-package/components/type/type";
import { PackageDescriptionView } from "@/app/dashboard/scholarship/admin/manage-student-packages/components/PackageDescriptionView";
import { hotlineNumber } from "@/app/shared/navbar/components/hotlineButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaEye,
  FaStar,
  FaBuilding,
  FaChevronLeft,
  FaShare,
  FaBookmark,
  FaPhone,
  FaGlobe,
  FaClock,
  FaUserMd,
  FaProcedures,
  FaAmbulance,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
  FaPills,
  FaMicroscope,
  FaXRay,
  FaCalendarAlt,
  FaRegClock,
  FaCheckCircle,
  FaUser,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { MdLocalHospital, MdEmail, MdLocationOn } from "react-icons/md";
import { toast } from "sonner";

interface HospitalDetailsPageProps {
  hospital: MedicalFormData;
  relatedHospitals?: MedicalFormData[];
  session?: any;
  b2bId?: string;
}

// Review interface
interface Review {
  _id?: string;
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  userAvatar?: string;
}

const HospitalDetailsPage = ({
  hospital,
  relatedHospitals = [],
  session,
  b2bId,
}: HospitalDetailsPageProps) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "departments" | "reviews"
  >("details");

  // Review states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setIsLoading] = useState(false);

  // Mock user data (replace with actual auth user)
  const currentUser = {
    id: session?.id,
    name: session?.name,
    avatar: session?.image,
  };

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/hospital/reviews/${hospital._id}`,
        );

        const result = await res.json();
        if (!result.success) {
          setReviews([]);
        } else {
          // setReviews(Array.isArray(result.data) ? result.data : []);

          setReviews(
            Array.isArray(result.data)
              ? result.data.map((r: any) => ({
                  ...r,
                  id: r._id,
                }))
              : [],
          );
        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);

  const getImageSource = () => {
    if (hospital.photo && !imageError) {
      return hospital.photo;
    }
    return hospital.hospital_type === "public"
      ? "/images/default-public-hospital.jpg"
      : "/images/default-private-hospital.jpg";
  };

  const renderRating = (rating: number, showText: boolean = true) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return (
                <FaStar
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              );
            } else if (i === fullStars && hasHalfStar) {
              return (
                <div key={i} className="relative">
                  <FaStar className="w-4 h-4 text-gray-300" />
                  <FaStar
                    className="w-4 h-4 text-yellow-400 fill-current absolute top-0 left-0 overflow-hidden"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                </div>
              );
            }
            return <FaStar key={i} className="w-4 h-4 text-gray-300" />;
          })}
        </div>
        {showText && (
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)} ({reviews.length} reviews)
          </span>
        )}
      </div>
    );
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Need to login");
      router.push("/auth/signin");
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare review data
      const reviewData = {
        packageId: hospital._id,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        ...(editingReviewId && { reviewId: editingReviewId }), // Include if editing
      };

      // Determine API endpoint based on edit or create
      const url = editingReviewId
        ? `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/hospital/reviews/${editingReviewId}`
        : `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/hospital/reviews`;

      const method = editingReviewId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const savedReview = await response.json();

      // Update local state
      if (editingReviewId) {
        // Update existing review
        setReviews((prev) =>
          prev.map((review) =>
            review.id === editingReviewId
              ? {
                  ...review,
                  ...savedReview,
                  comment: newReview.comment,
                  rating: newReview.rating,
                }
              : review,
          ),
        );
      } else {
        // Add new review
        const newReviewWithId: Review = {
          id: savedReview.id || Date.now().toString(),
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
        };
        setReviews((prev) => [newReviewWithId, ...prev]);
      }

      // Reset form
      setNewReview({ rating: 5, comment: "" });
      setEditingReviewId(null);

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review?._id!);
    setNewReview({
      rating: review.rating,
      comment: review.comment,
    });
    // Scroll to review form
    document
      .getElementById("review-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // const handleDeleteReview = async (reviewId: string) => {
  //   if (!confirm("Are you sure you want to delete this review?")) {
  //     return;
  //   }

  //   try {
  //     // API call to delete review
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/hospital/reviews/${reviewId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ packageId: hospital._id }),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to delete review");
  //     }

  //     // Update local state
  //     setReviews((prev) => prev.filter((review) => review.id !== reviewId));

  //     // If deleted review was being edited, reset form
  //     if (editingReviewId === reviewId) {
  //       setEditingReviewId(null);
  //       setNewReview({ rating: 5, comment: "" });
  //     }
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //     alert("Failed to delete review. Please try again.");
  //   }
  // };

  const renderRatingInput = () => {
    return (
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700">Your Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewReview({ ...newReview, rating: star })}
              className="focus:outline-none"
            >
              <FaStar
                className={`w-6 h-6 ${
                  star <= newReview.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                } hover:scale-110 transition-transform`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getDepartmentIcon = (dept: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      cardiology: <FaHeartbeat className="w-4 h-4" />,
      neurology: <FaBrain className="w-4 h-4" />,
      orthopedics: <FaBone className="w-4 h-4" />,
      pediatrics: <FaChild className="w-4 h-4" />,
      gynecology: <FaVenus className="w-4 h-4" />,
      dermatology: <FaAllergies className="w-4 h-4" />,
      ophthalmology: <FaEye className="w-4 h-4" />,
      dentistry: <FaTooth className="w-4 h-4" />,
      psychiatry: <FaBrain className="w-4 h-4" />,
      radiology: <FaXRay className="w-4 h-4" />,
      pathology: <FaMicroscope className="w-4 h-4" />,
      pharmacy: <FaPills className="w-4 h-4" />,
    };
    return iconMap[dept.toLowerCase()] || <FaStethoscope className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down">
          <FaCheckCircle className="w-5 h-5" />
          <span>
            Review {editingReviewId ? "updated" : "submitted"} successfully!
          </span>
        </div>
      )}

      <div
        className="bg-linear-to-r from-red-600 to-red-500 h-48 md:h-64 relative"
        style={{
          background: "linear-gradient(360deg, #CA2328 0%, #301314 100%)",
        }}
      >
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-2 md:px-4 md:py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-xl hover:bg-white/30 transition-all duration-300"
          >
            <FaBookmark
              className={`w-4 h-4 md:w-5 md:h-5 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 pb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-48 md:h-72 lg:h-96">
            <Image
              src={getImageSource()}
              alt={hospital.hospital_name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md ${
                  hospital.hospital_type === "public"
                    ? "bg-red-500/90 text-white"
                    : "bg-red-800/90 text-white"
                }`}
              >
                {hospital.hospital_type}
              </span>

              {hospital.total_sell > 0 && (
                <span className="bg-purple-500/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  ⭐ {hospital.total_sell}+ Booking
                </span>
              )}
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  {hospital.hospital_name}
                </h1>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                    <span className="text-sm md:text-base">
                      {hospital.city_name}, {hospital.provience}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaBuilding className="w-4 h-4 text-red-500" />
                    <span className="text-sm md:text-base">
                      {hospital.country_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-2">
                {renderRating(
                  reviews?.length > 0
                    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                        reviews.length
                    : hospital.rating || 0,
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaEye className="w-4 h-4" />
                    {hospital.total_view.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-4 h-4" />
                    {new Date(hospital.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto pb-px hide-scrollbar">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "details"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("departments")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "departments"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Departments ({hospital.department.length})
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors ${
                  activeTab === "reviews"
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Review & Rating ({reviews.length})
              </button>
            </div>

            <div className="mb-8">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                      Description:
                    </h2>
                    <PackageDescriptionView html={hospital.description} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                      <FaUserMd className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">
                          Specialist Doctor
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          25+ Specialist
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
                      <FaProcedures className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          Bed capacity
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          500+ Bed capacity
                        </p>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 flex items-start gap-3">
                      <FaAmbulance className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-purple-600 font-medium">
                          Emergency Service
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          24/7 Ambulance
                        </p>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3">
                      <FaRegClock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-orange-600 font-medium">
                          OPD Schedule
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          9AM - 10PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "departments" && (
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                    Departments
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {hospital.department.map((dept, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-3 border border-gray-100 hover:border-red-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-red-500 group-hover:scale-110 transition-transform">
                            {getDepartmentIcon(dept)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {dept}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                    Patient Reviews & Feedback
                  </h2>

                  {/* Review Form */}
                  <div
                    id="review-form"
                    className="mb-8 bg-white rounded-xl p-4 md:p-6 border border-gray-200"
                  >
                    <h3 className="text-md font-semibold text-gray-700 mb-4">
                      {editingReviewId ? "Edit Your Review" : "Write a Review"}
                    </h3>
                    <form onSubmit={handleReviewSubmit}>
                      {renderRatingInput()}
                      <textarea
                        value={newReview.comment}
                        onChange={(e) =>
                          setNewReview({
                            ...newReview,
                            comment: e.target.value,
                          })
                        }
                        placeholder="Share your experience with this hospital..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        rows={4}
                        required
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <span>
                              {editingReviewId
                                ? "Update Review"
                                : "Submit Review"}
                            </span>
                          )}
                        </button>
                        {editingReviewId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingReviewId(null);
                              setNewReview({ rating: 5, comment: "" });
                            }}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Reviews List */}
                  {loading ? (
                    <div>loading... </div>
                  ) : (
                    <div>
                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <div
                              key={review.id}
                              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                    {review.userAvatar ? (
                                      <div>
                                        {review.userAvatar ? (
                                          <Image
                                            src={review.userAvatar}
                                            alt={review.userName}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                          />
                                        ) : (
                                          <div className="p-2 rounded-full">
                                            {session.name.char(1)}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <FaUser className="w-5 h-5 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-800">
                                      {review.userName}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <FaStar
                                            key={i}
                                            className={`w-4 h-4 ${
                                              i < review.rating
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-xs text-gray-400">
                                        {new Date(
                                          review.createdAt,
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Action buttons for user's own reviews */}
                                {review.userId === currentUser.id && (
                                  <div className="flex gap-2">
                                    {/* <button
                                      onClick={() => handleEditReview(review)}
                                      className="text-blue-500 hover:text-blue-700 transition-colors"
                                      title="Edit review"
                                    >
                                      <FaEdit className="w-4 h-4" />
                                    </button> */}
                                    {/* <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  title="Delete review"
                                >
                                  <FaTrash className="w-4 h-4" />
                                </button> */}
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm ml-13">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>
                            No reviews yet. Be the first to share your
                            experience!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${hotlineNumber}`}
                    aria-label={`Call our hotline at ${hotlineNumber}`}
                  >
                    <button className="flex items-center gap-2 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm md:text-base hover:cursor-pointer">
                      <FaPhone className="w-4 h-4" />
                      <span>Contact Us</span>
                    </button>
                  </a>
                  {b2bId ? (
                    <Link
                      href={`/medical-home-page/user-submit-form?id=${hospital._id}&b2bId=${b2bId}`}
                    >
                      <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm md:text-base">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>Request for invitation (5000TK)</span>
                      </button>
                    </Link>
                  ) : (
                    <Link
                      href={`/medical-home-page/user-submit-form?id=${hospital._id}`}
                    >
                      <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors text-sm md:text-base">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>Request for invitation (5000TK)</span>
                      </button>
                    </Link>
                  )}
                </div>

                <div className="flex gap-2">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaGlobe className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <MdEmail className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedHospitals.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              See more
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedHospitals.map((relatedHospital, index) => (
                <Link
                  key={index}
                  href={`/hospital/${relatedHospital.hospital_name}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={
                          relatedHospital.photo ||
                          "/images/default-hospital.jpg"
                        }
                        alt={relatedHospital.hospital_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                        {relatedHospital.hospital_name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                        {relatedHospital.city_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            relatedHospital.hospital_type === "public"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {relatedHospital.hospital_type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {relatedHospital.total_view} views
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HospitalDetailsPage;

// Keep your existing icon components
const FaBrain = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaBone = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaChild = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaVenus = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaAllergies = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
const FaTooth = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);
