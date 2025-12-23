// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   MapPin,
//   DollarSign,
//   Building2,
//   Clock,
//   Briefcase,
//   ArrowLeft,
//   CheckCircle,
//   Calendar,
//   Layers,
//   Info,
//   Tag,
//   Star,
//   Sparkles,
// } from "lucide-react";

// export default function JobDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [job, setJob] = useState(null);
//   const [isApplying, setIsApplying] = useState(false);
//   const [hasApplied, setHasApplied] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setJob(data));
//   }, [id]);

//   const handleApply = async () => {
//     if (!session) {
//       router.push("/signin");
//       return;
//     }

//     setIsApplying(true);

//     const res = await fetch("/api/applications", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ jobId: job._id }),
//     });

//     if (res.ok) setHasApplied(true);

//     setIsApplying(false);
//   };

//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <div className="animate-pulse h-16 w-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   const isClosed = job.status === "Closed";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden relative">
//       {/* Subtle background accents */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       {/* HEADER */}
//       <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-5">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-3 text-indigo-700 hover:text-indigo-900 transition-colors duration-300 font-medium"
//           >
//             <ArrowLeft size={20} />
//             Back to Listings
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
//         {/* MAIN CONTENT */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* JOB HEADER CARD */}
//           <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
//             <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-100/30"></div>
//             <div className="relative flex items-start gap-8">
//               <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Building2 className="text-white" size={36} />
//                 <Sparkles className="absolute -top-2 -right-2 text-yellow-500" size={20} />
//               </div>

//               <div className="flex-1">
//                 <h1 className="text-4xl font-extrabold text-gray-900">
//                   {job.title}
//                 </h1>
//                 <p className="text-2xl text-gray-700 mt-2">{job.company}</p>

//                 {job.featured && (
//                   <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-400 text-yellow-800 text-sm font-bold">
//                     <Star size={16} fill="currentColor" />
//                     Featured Opportunity
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* INFO GRID */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
//               <InfoItem icon={<MapPin />} label="Location" value={job.location} />
//               <InfoItem icon={<DollarSign />} label="Salary Range" value={job.salary} />
//               <InfoItem icon={<Briefcase />} label="Employment Type" value={job.type} />
//               <InfoItem icon={<Layers />} label="Experience Level" value={`${job.experience} years`} />
//               <InfoItem icon={<Calendar />} label="Start Date" value={new Date(job.startDate).toLocaleDateString()} />
//               <InfoItem icon={<Calendar />} label="Application Deadline" value={new Date(job.endDate).toLocaleDateString()} />
//             </div>
//           </div>

//           {/* DESCRIPTION CARD */}
//           <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">
//               About This Role
//             </h2>
//             <p className="text-gray-700 leading-relaxed text-lg">
//               {job.description}
//             </p>
//           </div>

//           {/* SKILLS CARD */}
//           <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">
//               Required Skills & Technologies
//             </h2>

//             {job.skills?.length ? (
//               <div className="flex flex-wrap gap-4">
//                 {job.skills.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 text-indigo-800 font-medium flex items-center gap-2 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300"
//                   >
//                     <Tag size={16} />
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No specific skills listed</p>
//             )}
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <div className="relative">
//           <div className="sticky top-28 rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-8">
//             <div className="text-center mb-8">
//               <span
//                 className={`inline-block px-6 py-3 rounded-full text-lg font-bold tracking-wide ${
//                   isClosed
//                     ? "bg-red-100 text-red-700 border border-red-300"
//                     : "bg-green-100 text-green-700 border border-green-300"
//                 }`}
//               >
//                 {job.status}
//               </span>
//             </div>

//             {hasApplied ? (
//               <div className="text-center">
//                 <CheckCircle className="mx-auto mb-4 text-green-600" size={60} />
//                 <p className="text-2xl font-bold text-green-700">Application Submitted!</p>
//                 <p className="text-gray-600 mt-2">We'll be in touch soon.</p>
//               </div>
//             ) : (
//               <button
//                 disabled={isApplying || isClosed}
//                 onClick={handleApply}
//                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
//               >
//                 {isApplying ? "Submitting Application..." : "Apply Instantly"}
//               </button>
//             )}

//             {isClosed && (
//               <p className="text-center text-sm text-gray-600 mt-6 flex items-center justify-center gap-2">
//                 <Info size={16} />
//                 This position is no longer accepting applications
//               </p>
//             )}

//             <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
//               <Clock size={16} />
//               Posted on {new Date(job.createdAt).toLocaleDateString()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-gray-200 hover:bg-white/90 hover:shadow-md transition-all duration-300">
//       <div className="text-indigo-600">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500 uppercase tracking-wider">{label}</p>
//         <p className="text-lg font-semibold text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// import {
//   MapPin,
//   DollarSign,
//   Building2,
//   Clock,
//   Briefcase,
//   ArrowLeft,
//   CheckCircle,
//   Calendar,
//   Layers,
//   Info,
//   Tag,
//   Star,
//   Sparkles,
//   Eye,
//   Edit3,
//   X,
//   Users,
// } from "lucide-react";

// export default function JobDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [job, setJob] = useState(null);
//   const [showProfileReview, setShowProfileReview] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch Job
//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setJob(data))
//       .catch(() => {});
//   }, [id]);

//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <div className="animate-pulse h-16 w-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   const isClosed = job.status === "Closed";

//   // Open Profile Modal Before Applying
//   const handleApplyClick = async () => {
//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `/api/profile/review?email=${encodeURIComponent(session.user.email)}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         setProfileData(data);
//         setShowProfileReview(true);
//       } else {
//         alert("Please complete your profile first.");
//       }
//     } catch (error) {
//       alert("Error loading profile.");
//     }
//   };

//   // Confirm Apply (FINAL POST)
//   const handleConfirmApply = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/application", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobId: job._id,
//           userEmail: session.user.email,
//         }),
//       });

//       if (res.ok) {
//         alert(`Successfully applied for ${job.title}!`);
//         setShowProfileReview(false);
//       } else {
//         const data = await res.json();
//         alert(data.message || "Failed to apply.");
//       }
//     } catch (error) {
//       alert("Something went wrong.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden relative">
//       {/* BG ANIMATION */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       {/* HEADER */}
//       <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-5">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-3 text-indigo-700 hover:text-indigo-900 transition-colors duration-300 font-medium"
//           >
//             <ArrowLeft size={20} />
//             Back to Listings
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
//         {/* LEFT SECTION */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* JOB HEADER CARD */}
//           <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10 hover:shadow-3xl transition-all duration-500">
//             <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-purple-100/30"></div>

//             <div className="relative flex items-start gap-8">
//               <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Building2 className="text-white" size={36} />
//                 <Sparkles className="absolute -top-2 -right-2 text-yellow-500" size={20} />
//               </div>

//               <div className="flex-1">
//                 <h1 className="text-4xl font-extrabold text-gray-900">{job.title}</h1>
//                 <p className="text-2xl text-gray-700 mt-2">{job.company}</p>

//                 {job.featured && (
//                   <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-400 text-yellow-800 text-sm font-bold">
//                     <Star size={16} fill="currentColor" />
//                     Featured Opportunity
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* INFO GRID */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
//               <InfoItem icon={<MapPin />} label="Location" value={job.location} />
//               <InfoItem icon={<DollarSign />} label="Salary Range" value={job.salary} />
//               <InfoItem icon={<Briefcase />} label="Employment Type" value={job.type} />
//               <InfoItem icon={<Layers />} label="Experience Level" value={`${job.experience} years`} />
//               <InfoItem icon={<Calendar />} label="Start Date" value={new Date(job.startDate).toDateString()} />
//               <InfoItem icon={<Calendar />} label="Deadline" value={new Date(job.endDate).toDateString()} />
//             </div>
//           </div>

//           {/* DESCRIPTION */}
//           <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">About This Role</h2>
//             <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
//           </div>

//           {/* SKILLS */}
//           <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-10">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">Required Skills</h2>

//             {job.skills?.length ? (
//               <div className="flex flex-wrap gap-4">
//                 {job.skills.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 text-indigo-800 font-medium flex items-center gap-2"
//                   >
//                     <Tag size={16} />
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No skills listed.</p>
//             )}
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="relative">
//           <div className="sticky top-28 rounded-3xl bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-2xl p-8">
//             <div className="text-center mb-8">
//               <span
//                 className={`inline-block px-6 py-3 rounded-full text-lg font-bold tracking-wide ${
//                   isClosed
//                     ? "bg-red-100 text-red-700 border border-red-300"
//                     : "bg-green-100 text-green-700 border border-green-300"
//                 }`}
//               >
//                 {job.status}
//               </span>
//             </div>

//             <button
//               disabled={isClosed}
//               onClick={handleApplyClick}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
//             >
//               Apply Instantly
//             </button>

//             <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
//               <Clock size={16} />
//               Posted on {new Date(job.createdAt).toDateString()}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PROFILE REVIEW MODAL */}
//       {showProfileReview && profileData && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div
//             className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-6xl max-h-[90vh] overflow-y-auto w-full border border-white/50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-10">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-bold">Review Your Profile</h2>
//                 <button
//                   onClick={() => setShowProfileReview(false)}
//                   className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div className="space-y-6">
//                   <div className="p-6 bg-indigo-50 rounded-2xl">
//                     <h3 className="font-bold mb-3">Personal Info</h3>
//                     <p className="text-lg font-semibold">{profileData.name}</p>
//                     <p className="text-gray-600">{profileData.email}</p>
//                   </div>

//                   {profileData.resume && (
//                     <div className="p-6 bg-orange-50 rounded-2xl">
//                       <h3 className="font-bold mb-3">Resume</h3>
//                       <p>{profileData.resume.originalName}</p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-6">
//                   {profileData.skills?.length > 0 && (
//                     <div className="p-6 bg-emerald-50 rounded-2xl">
//                       <h3 className="font-bold mb-3">Skills</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {profileData.skills.map((s, i) => (
//                           <span key={i} className="bg-white px-4 py-2 rounded-xl border">
//                             {s}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-4 mt-10">
//                 <Link
//                   href="/profile"
//                   className="px-8 py-3 bg-gray-700 text-white rounded-xl"
//                 >
//                   Edit Profile
//                 </Link>

//                 <button
//                   onClick={handleConfirmApply}
//                   className="px-8 py-3 bg-emerald-600 text-white rounded-xl"
//                   disabled={loading}
//                 >
//                   {loading ? "Applying..." : "Confirm & Apply"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-gray-200">
//       <div className="text-indigo-600">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500 uppercase tracking-wider">{label}</p>
//         <p className="text-lg font-semibold text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// import {
//   MapPin,
//   DollarSign,
//   Building2,
//   Clock,
//   Briefcase,
//   ArrowLeft,
//   CheckCircle,
//   Calendar,
//   Layers,
//   Info,
//   Tag,
//   Star,
//   Sparkles,
//   Eye,
//   Edit3,
//   X,
//   Users,
//   Share2,
//   Bookmark,
//   BookmarkCheck,
//   AlertCircle,
//   Heart,
//   Zap,
//   Globe,
//   Mail,
//   Phone,
// } from "lucide-react";

// export default function JobDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [job, setJob] = useState(null);
//   const [showProfileReview, setShowProfileReview] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saved, setSaved] = useState(false);
//   const [applicationsCount, setApplicationsCount] = useState(0);

//   // Fetch Job + simulated extra data
//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJob(data);
//         // Simulated: fetch applications count & saved status
//         setApplicationsCount(Math.floor(Math.random() * 200) + 50);
//         setSaved(false); // or check from user saved jobs
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <div className="animate-pulse h-16 w-16 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <p className="text-2xl text-gray-600">Job not found</p>
//       </div>
//     );
//   }

//   const isClosed = job.status === "Closed";

//   // Open Profile Modal Before Applying
//   const handleApplyClick = async () => {
//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `/api/profile/review?email=${encodeURIComponent(session.user.email)}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         setProfileData(data);
//         setShowProfileReview(true);
//       } else {
//         alert("Please complete your profile first.");
//         router.push("/profile");
//       }
//     } catch (error) {
//       alert("Error loading profile.");
//     }
//   };

//   // Confirm Apply (FINAL POST)
//   const handleConfirmApply = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/application", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobId: job._id,
//           userEmail: session.user.email,
//         }),
//       });

//       if (res.ok) {
//         alert(`Successfully applied for ${job.title}!`);
//         setShowProfileReview(false);
//         // Optional: update applications count
//         setApplicationsCount(prev => prev + 1);
//       } else {
//         const data = await res.json();
//         alert(data.message || "Failed to apply.");
//       }
//     } catch (error) {
//       alert("Something went wrong.");
//     }

//     setLoading(false);
//   };

//   const handleSave = () => {
//     // TODO: integrate with backend saved jobs
//     setSaved(!saved);
//     alert(saved ? "Job removed from saved" : "Job saved!");
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: job.title,
//         text: `Check out this job: ${job.title} at ${job.company}`,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Link copied to clipboard!");
//     }
//   };

//   const daysSincePosted = Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden relative">
//       {/* ENHANCED BG ANIMATION */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//         <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-40 left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//       </div>

//       {/* HEADER WITH ACTIONS */}
//       <div className="sticky top-0 bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 z-50 shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-3 text-indigo-700 hover:text-indigo-900 transition-colors duration-300 font-medium"
//           >
//             <ArrowLeft size={20} />
//             Back to Listings
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleSave}
//               className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
//             >
//               {saved ? <BookmarkCheck size={20} className="text-indigo-600" /> : <Bookmark size={20} />}
//             </button>
//             <button
//               onClick={handleShare}
//               className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <Share2 size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
//         {/* LEFT SECTION */}
//         <div className="lg:col-span-2 space-y-10">
//           {/* JOB HEADER CARD - MORE REALISTIC */}
//           <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl p-10 hover:shadow-3xl transition-shadow duration-500 border border-gray-100">
//             <div className="flex items-start justify-between mb-8">
//               <div className="flex items-start gap-8">
//                 <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
//                   {job.companyLogo ? (
//                     <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
//                   ) : (
//                     <Building2 className="text-white" size={40} />
//                   )}
//                   <Sparkles className="absolute -top-2 -right-2 text-yellow-400" size={24} />
//                 </div>

//                 <div>
//                   <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{job.title}</h1>
//                   <div className="flex items-center gap-4 mt-3">
//                     <p className="text-2xl text-gray-700 font-semibold">{job.company}</p>
//                     {job.verified && <CheckCircle className="text-green-600" size={24} />}
//                   </div>

//                   <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <MapPin size={16} />
//                       {job.location}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Users size={16} />
//                       {applicationsCount} applicants
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock size={16} />
//                       {daysSincePosted === 0 ? "Today" : `${daysSincePosted} days ago`}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {job.featured && (
//                 <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-400 text-amber-800 font-bold">
//                   <Zap size={18} />
//                   Featured
//                 </span>
//               )}
//             </div>

//             {/* QUICK INFO GRID */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
//               <InfoItem icon={<DollarSign />} label="Salary Range" value={job.salary || "Competitive"} />
//               <InfoItem icon={<Briefcase />} label="Type" value={job.type} />
//               <InfoItem icon={<Layers />} label="Experience" value={`${job.experience} years`} />
//               <InfoItem icon={<Globe />} label="Work Mode" value={job.remote ? "Remote" : "On-site/Hybrid"} />
//               <InfoItem icon={<Calendar />} label="Start Date" value={new Date(job.startDate).toLocaleDateString()} />
//               <InfoItem icon={<AlertCircle />} label="Deadline" value={new Date(job.endDate).toLocaleDateString()} />
//             </div>
//           </div>

//           {/* DESCRIPTION SECTION */}
//           <div className="rounded-3xl bg-white shadow-2xl p-10 border border-gray-100">
//             <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
//               <Info size={28} />
//               About This Role
//             </h2>
//             <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
//               {job.description || "No detailed description available."}
//             </div>
//           </div>

//           {/* REQUIRED SKILLS */}
//           <div className="rounded-3xl bg-white shadow-2xl p-10 border border-gray-100">
//             <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
//               <Tag size={28} />
//               Required Skills & Qualifications
//             </h2>

//             {job.skills?.length ? (
//               <div className="flex flex-wrap gap-4">
//                 {job.skills.map((skill, i) => (
//                   <span
//                     key={i}
//                     className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-800 font-semibold text-lg flex items-center gap-3 shadow-sm hover:shadow-md transition"
//                   >
//                     <Star size={18} className="text-indigo-600" />
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-lg">No specific skills listed.</p>
//             )}
//           </div>

//           {/* OPTIONAL: BENEFITS SECTION (if data available) */}
//           {/* Add if job.benefits array exists */}
//         </div>

//         {/* RIGHT SIDEBAR - MORE REALISTIC & INTERACTIVE */}
//         <div className="space-y-8">
//           <div className="sticky top-28 rounded-3xl bg-white shadow-2xl p-8 border border-gray-100">
//             <div className="text-center mb-8">
//               <span
//                 className={`inline-block px-8 py-4 rounded-full text-xl font-bold tracking-wide shadow-md ${
//                   isClosed
//                     ? "bg-red-100 text-red-700 border border-red-300"
//                     : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300"
//                 }`}
//               >
//                 {isClosed ? "Position Closed" : "Actively Hiring"}
//               </span>
//             </div>

//             <button
//               disabled={isClosed || loading}
//               onClick={handleApplyClick}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-6 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
//             >
//               {isClosed ? "Closed" : "Apply Now"}
//             </button>

//             <div className="mt-8 space-y-4 text-center text-gray-600">
//               <p className="flex items-center justify-center gap-2">
//                 <Eye size={18} />
//                 {Math.floor(Math.random() * 500) + 200} views this week
//               </p>
//               <p className="flex items-center justify-center gap-2">
//                 <Clock size={18} />
//                 Posted {new Date(job.createdAt).toLocaleDateString()}
//               </p>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="mt-10 pt-8 border-t border-gray-200 flex justify-center gap-6">
//               <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
//                 <Heart size={24} />
//                 <span className="text-sm">Interested</span>
//               </button>
//               <button onClick={handleShare} className="flex flex-col items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
//                 <Share2 size={24} />
//                 <span className="text-sm">Share</span>
//               </button>
//             </div>
//           </div>

//           {/* COMPANY CONTACT CARD (optional realism) */}
//           <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 border border-indigo-100">
//             <h3 className="text-xl font-bold mb-4">Contact Recruiter</h3>
//             <div className="space-y-4">
//               <a href={`mailto:${job.contactEmail}`} className="flex items-center gap-3 text-indigo-700 hover:underline">
//                 <Mail size={20} />
//                 Send Message
//               </a>
//               {job.contactPhone && (
//                 <a href={`tel:${job.contactPhone}`} className="flex items-center gap-3 text-indigo-700 hover:underline">
//                   <Phone size={20} />
//                   {job.contactPhone}
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PROFILE REVIEW MODAL - ENHANCED VISUALS */}
//       {showProfileReview && profileData && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6">
//           <div className="bg-white rounded-3xl shadow-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
//             <div className="p-10">
//               <div className="flex items-center justify-between mb-10">
//                 <h2 className="text-4xl font-bold text-gray-900">Review Your Profile Before Applying</h2>
//                 <button
//                   onClick={() => setShowProfileReview(false)}
//                   className="p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition"
//                 >
//                   <X size={28} />
//                 </button>
//               </div>

//               <div className="grid md:grid-cols-2 gap-10">
//                 <div className="space-y-8">
//                   <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-md">
//                     <h3 className="text-2xl font-bold mb-4">Personal Information</h3>
//                     <p className="text-xl font-semibold">{profileData.name || "Not set"}</p>
//                     <p className="text-gray-700 text-lg">{profileData.email}</p>
//                     {profileData.phone && <p className="text-gray-700">{profileData.phone}</p>}
//                   </div>

//                   {profileData.resume && (
//                     <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-md">
//                       <h3 className="text-2xl font-bold mb-4">Resume</h3>
//                       <p className="text-lg">{profileData.resume.originalName}</p>
//                       <a href={profileData.resume.url} className="text-indigo-600 hover:underline mt-2 inline-block">
//                         View Resume →
//                       </a>
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-8">
//                   {profileData.skills?.length > 0 && (
//                     <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-md">
//                       <h3 className="text-2xl font-bold mb-6">Your Skills</h3>
//                       <div className="flex flex-wrap gap-4">
//                         {profileData.skills.map((s, i) => (
//                           <span key={i} className="px-6 py-3 bg-white rounded-2xl border border-emerald-200 shadow-sm text-emerald-800 font-medium">
//                             {s}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {profileData.experience && (
//                     <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-md">
//                       <h3 className="text-2xl font-bold mb-4">Experience Summary</h3>
//                       <p className="text-gray-700">{profileData.experience}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-6 mt-12">
//                 <Link
//                   href="/profile"
//                   className="px-10 py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-900 transition flex items-center gap-3"
//                 >
//                   <Edit3 size={20} />
//                   Edit Profile
//                 </Link>

//                 <button
//                   onClick={handleConfirmApply}
//                   disabled={loading}
//                   className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold hover:shadow-2xl transition disabled:opacity-70"
//                 >
//                   {loading ? "Applying..." : "Confirm & Apply"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-5 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition">
//       <div className="text-indigo-600 bg-indigo-100 p-4 rounded-xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">{label}</p>
//         <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
//       </div>
//     </div>
//   );
// }


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
                className={`inline-block px-8 py-4 rounded-full text-xl font-bold tracking-wide shadow-md ${
                  isClosed
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
              <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
                <Heart size={24} />
                <span className="text-sm">Interested</span>
              </button>
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