"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  MapPin,
  DollarSign,
  Building2,
  Clock,
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Layers,
  Tag,
  Star,
  Sparkles,
  Share2,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  Users,
  Edit3,
  X,
  Heart,
  Zap,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [job, setJob] = useState(null);
  const [showProfileReview, setShowProfileReview] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [applicationsCount, setApplicationsCount] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setApplicationsCount(Math.floor(Math.random() * 200) + 50);
        setSaved(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-pulse h-16 w-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <p className="text-2xl text-gray-600">Job not found</p>
      </div>
    );
  }

  const isClosed = job.status === "Closed";

  const handleApplyClick = async () => {
    if (!session?.user?.email) {
      router.push("/signin");
      return;
    }

    try {
      const res = await fetch(
        `/api/profile/review?email=${encodeURIComponent(session.user.email)}`
      );

      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
        setShowProfileReview(true);
      } else {
        alert("Please complete your profile first.");
        router.push("/profile");
      }
    } catch (error) {
      alert("Error loading profile.");
    }
  };

  const handleConfirmApply = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          userEmail: session.user.email,
        }),
      });

      if (res.ok) {
        alert(`Successfully applied for ${job.title}!`);
        setShowProfileReview(false);
        setApplicationsCount((prev) => prev + 1);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to apply.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  const handleSave = () => {
    setSaved(!saved);
    alert(saved ? "Job removed from saved" : "Job saved!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const daysSincePosted = Math.floor(
    (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Helper functions for profile modal
  const calculateCompleteness = (profile) => {
    let score = 0;
    if (profile.name) score += 15;
    if (profile.email) score += 10;
    if (profile.phone) score += 10;
    if (profile.about) score += 15;
    if (profile.resume) score += 20;
    if (profile.skills?.length > 0) score += 15;
    if (profile.education?.length > 0) score += 8;
    if (profile.experience?.length > 0) score += 7;
    return Math.min(100, score);
  };

  const getCompletenessMessage = (profile) => {
    const pct = calculateCompleteness(profile);
    if (pct === 100) return "Your profile is complete and ready to impress employers!";
    if (pct >= 80) return "Great job! Just a few more details to make it perfect.";
    if (pct >= 50) return "You're halfway there — keep adding details!";
    return "Complete your profile to stand out to recruiters.";
  };

  const calculateSkillMatch = (userSkills = [], jobSkills = []) => {
    if (!jobSkills || jobSkills.length === 0) return 100;
    const lowerUser = userSkills.map((s) => s.toLowerCase());
    const lowerJob = jobSkills.map((s) => s.toLowerCase());
    const matches = lowerJob.filter((skill) => lowerUser.includes(skill)).length;
    return Math.round((matches / jobSkills.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-indigo-700 hover:text-indigo-900 transition-colors duration-300 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Listings
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              {saved ? <BookmarkCheck size={20} className="text-indigo-600" /> : <Bookmark size={20} />}
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-10">
          {/* Job Header */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl p-10 hover:shadow-3xl transition-shadow duration-500 border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-8">
                <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <Building2 className="text-white" size={40} />
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={24} />
                </div>

                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{job.title}</h1>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-2xl text-gray-700 font-semibold">{job.company}</p>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      {applicationsCount} applicants
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {daysSincePosted === 0 ? "Today" : `${daysSincePosted} days ago`}
                    </div>
                  </div>
                </div>
              </div>

              {job.featured && (
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-400 text-amber-800 font-bold">
                  <Zap size={18} />
                  Featured
                </span>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              <InfoItem icon={<DollarSign />} label="Salary Range" value={job.salary || "Competitive"} />
              <InfoItem icon={<Briefcase />} label="Type" value={job.type} />
              <InfoItem icon={<Layers />} label="Experience" value={`${job.experience} years`} />
              <InfoItem icon={<Globe />} label="Work Mode" value={job.remote ? "Remote" : "On-site/Hybrid"} />
              <InfoItem icon={<Calendar />} label="Start Date" value={new Date(job.startDate).toLocaleDateString()} />
              <InfoItem icon={<AlertCircle />} label="Deadline" value={new Date(job.endDate).toLocaleDateString()} />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-3xl bg-white shadow-2xl p-10 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
              About This Role
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description || "No detailed description available."}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-3xl bg-white shadow-2xl p-10 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
              <Tag size={28} />
              Required Skills & Qualifications
            </h2>

            {job.skills?.length ? (
              <div className="flex flex-wrap gap-4">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-800 font-semibold text-lg flex items-center gap-3 shadow-sm hover:shadow-md transition"
                  >
                    <Star size={18} className="text-indigo-600" />
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg">No specific skills listed.</p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-28 rounded-3xl bg-white shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <span
                className={`inline-block px-8 py-4 rounded-full text-xl font-bold tracking-wide shadow-md ${isClosed
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300"
                  }`}
              >
                {isClosed ? "Position Closed" : "Actively Hiring"}
              </span>
            </div>

            <button
              disabled={isClosed || loading}
              onClick={handleApplyClick}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
            >
              {isClosed ? "Closed" : "Apply Now"}
            </button>

            <div className="mt-8 space-y-4 text-center text-gray-600">
              <p className="flex items-center justify-center gap-2">
                <Clock size={18} />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 flex justify-center gap-6">

              <button onClick={handleShare} className="flex flex-col items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
                <Share2 size={24} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE REVIEW MODAL */}
      {showProfileReview && profileData && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowProfileReview(false)}
        >
          <div
            className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-6xl max-h-[90vh] overflow-y-auto w-full border border-white/50 max-lg:mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Review Your Profile
                    </h2>
                    <p className="text-slate-600 text-lg">
                      Ensure everything looks good before applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileReview(false)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Profile Completeness */}
              <div className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Profile Completeness
                  </h3>
                  <span className="text-2xl font-bold text-indigo-700">
                    {calculateCompleteness(profileData)}%
                  </span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${calculateCompleteness(profileData)}%` }}
                  />
                </div>
                <p className="text-sm text-indigo-700 mt-2">
                  {getCompletenessMessage(profileData)}
                </p>
              </div>

              {/* Profile Summary */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Left */}
                <div className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Users className="w-6 h-6 text-indigo-600" />
                      Personal Information
                    </h3>
                    <div className="space-y-4 p-6 bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl shadow-inner">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {profileData.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900">{profileData.name || "Not provided"}</p>
                          <p className="text-slate-600">{profileData.email}</p>
                          {profileData.phone && <p className="text-slate-600">{profileData.phone}</p>}
                        </div>
                      </div>
                      {profileData.about ? (
                        <p className="text-slate-700 italic mt-3">"{profileData.about}"</p>
                      ) : (
                        <p className="text-amber-700 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          Add a short bio to stand out!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Resume */}
                  {profileData.resume ? (
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-orange-600" />
                        Resume
                      </h3>
                      <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-orange-300 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                              PDF
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{profileData.resume.originalName}</p>
                              <p className="text-sm text-slate-500">
                                Uploaded: {new Date(profileData.resume.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <a
                            href={profileData.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition text-sm font-medium"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-red-50 border-2 border-dashed border-red-300 rounded-2xl">
                      <p className="text-red-700 font-medium flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        No resume uploaded yet. Please add one in your profile.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="space-y-8">
                  {/* Skills */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                      Skills ({profileData.skills?.length || 0})
                    </h3>
                    {profileData.skills?.length > 0 ? (
                      <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-inner">
                        <div className="flex flex-wrap gap-3">
                          {profileData.skills.slice(0, 12).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-5 py-3 bg-white border border-emerald-300 text-emerald-800 font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
                            >
                              {skill}
                            </span>
                          ))}
                          {profileData.skills.length > 12 && (
                            <span className="px-5 py-3 bg-emerald-100 text-emerald-700 font-bold rounded-2xl">
                              +{profileData.skills.length - 12} more
                            </span>
                          )}
                        </div>
                        {job.skills && (
                          <div className="mt-5 pt-5 border-t border-emerald-200">
                            <p className="text-sm font-medium text-emerald-800 mb-2">Skill Match with Job</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-emerald-200 rounded-full h-3">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                                  style={{ width: `${calculateSkillMatch(profileData.skills, job.skills)}%` }}
                                />
                              </div>
                              <span className="font-bold text-emerald-700">
                                {calculateSkillMatch(profileData.skills, job.skills)}% Match
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-amber-700 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Add skills to increase your chances!
                      </p>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                      Education ({profileData.education?.length || 0})
                    </h3>
                    <div className="space-y-3">
                      {profileData.education?.length > 0 ? (
                        profileData.education.slice(0, 3).map((edu, idx) => (
                          <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                            <p className="font-semibold text-slate-800">{edu.degree}</p>
                            <p className="text-sm text-slate-600">{edu.institute}</p>
                            <p className="text-xs text-slate-500">{edu.yearFrom} - {edu.yearTo || "Present"}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 text-sm">No education added</p>
                      )}
                      {profileData.education?.length > 3 && (
                        <p className="text-center text-sm text-slate-500">
                          +{profileData.education.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                      Work Experience ({profileData.experience?.length || 0})
                    </h3>
                    <div className="space-y-3">
                      {profileData.experience?.length > 0 ? (
                        profileData.experience.slice(0, 3).map((exp, idx) => (
                          <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <p className="font-semibold text-slate-800">{exp.title}</p>
                            <p className="text-sm text-slate-600">{exp.company}</p>
                            <p className="text-xs text-slate-500">{exp.years}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 text-sm">No experience added</p>
                      )}
                      {profileData.experience?.length > 3 && (
                        <p className="text-center text-sm text-slate-500">
                          +{profileData.experience.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-8 border-t-2 border-slate-200 mt-12">
                <Link
                  href="/profile"
                  className="flex-1 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Edit3 className="w-6 h-6" />
                  Edit Profile
                </Link>
                <button
                  onClick={handleConfirmApply}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl disabled:shadow-none transition-all flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-7 w-7 border-3 border-white border-t-transparent"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      Confirm & Apply Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition">
      <div className="text-indigo-600 bg-indigo-100 p-4 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}