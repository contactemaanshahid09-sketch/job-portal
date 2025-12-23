// // app/admin/applications/page.js
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import {
//   Briefcase,
//   Users,
//   Calendar,
//   Download,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   UserCheck,
//   Mail,
//   ExternalLink,
// } from "lucide-react";
// import Link from "next/link";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
//   { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
//   { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
//   { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
//   { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
// ];

// export default function AdminApplications() {
//   const { data: session, status } = useSession();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);

//   // Replace with your actual admin check
//   const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session || !isAdmin) {
//       window.location.href = "/signin";
//       return;
//     }

//     fetchApplications();
//   }, [status, session]);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/admin/applications");
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setApplications(data);
//     } catch (err) {
//       alert("Failed to load applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (appId, newStatus) => {
//     if (updatingId) return;
//     setUpdatingId(appId);

//     try {
//       const res = await fetch("/api/admin/applications", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ applicationId: appId, status: newStatus }),
//       });

//       if (res.ok) {
//         setApplications((prev) =>
//           prev.map((app) =>
//             app._id === appId ? { ...app, status: newStatus } : app
//           )
//         );
//       } else {
//         alert("Failed to update status");
//       }
//     } catch (err) {
//       alert("Error updating status");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const getStatusInfo = (status) => {
//     return STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0];
//   };

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
//           <p className="text-2xl font-semibold text-slate-700 text-center">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center max-w-lg">
//           <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
//           <h2 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h2>
//           <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">
//             Admin Dashboard
//           </h1>
//           <p className="text-xl text-slate-600">Manage all job applications</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
//           {STATUS_OPTIONS.map((stat) => {
//             const Icon = stat.icon;
//             const count = applications.filter((a) => a.status === stat.value).length;
//             return (
//               <div
//                 key={stat.value}
//                 className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 text-center border border-white/50"
//               >
//                 <div className={`w-16 h-16 ${stat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <p className="text-3xl font-bold text-slate-800">{count}</p>
//                 <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Applications List */}
//         <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
//           <div className="p-8 border-b border-slate-200">
//             <h2 className="text-3xl font-bold flex items-center gap-4">
//               <Briefcase className="w-10 h-10 text-indigo-600" />
//               All Applications ({applications.length})
//             </h2>
//           </div>

//           {applications.length === 0 ? (
//             <div className="p-20 text-center">
//               <Users className="w-24 h-24 text-slate-300 mx-auto mb-6" />
//               <p className="text-2xl text-slate-500">No applications yet</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200">
//               {applications.map((app) => {
//                 const statusInfo = getStatusInfo(app.status);
//                 const StatusIcon = statusInfo.icon;

//                 return (
//                   <div
//                     key={app._id}
//                     className="p-8 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-sky-50/30 transition-all"
//                   >
//                     <div className="grid lg:grid-cols-12 gap-6 items-center">
//                       {/* Applicant Info */}
//                       <div className="lg:col-span-3 flex items-center gap-4">
//                         <img
//                           src={app.applicant.image || "/default-avatar.png"}
//                           alt={app.applicant.name}
//                           className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
//                         />
//                         <div>
//                           <h3 className="text-xl font-bold text-slate-900">{app.applicant.name}</h3>
//                           <p className="text-slate-600 flex items-center gap-2">
//                             <Mail className="w-4 h-4" />
//                             {app.applicant.email}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Job & Date */}
//                       <div className="lg:col-span-3">
//                         <p className="text-lg font-semibold text-slate-800">{app.jobTitle || "Software Engineer"}</p>
//                         <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
//                           <Calendar className="w-4 h-4" />
//                           Applied on {new Date(app.appliedAt).toLocaleDateString()}
//                         </p>
//                       </div>

//                       {/* Current Status */}
//                       <div className="lg:col-span-2">
//                         <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl ${statusInfo.color} font-bold`}>
//                           <StatusIcon className="w-5 h-5" />
//                           {statusInfo.label}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="lg:col-span-4 flex items-center justify-end gap-4">
//                         {/* View Profile */}
//                         <Link
//                           href={`/profile?email=${encodeURIComponent(app.applicant.email)}`}
//                           target="_blank"
//                           className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//                         >
//                           <Eye className="w-5 h-5" />
//                           View Profile
//                         </Link>

//                         {/* Download Resume */}
//                         {app.applicant.hasResume && (
//                           <a
//                             href={`/api/profile/resume?email=${encodeURIComponent(app.applicant.email)}`}
//                             download
//                             className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//                           >
//                             <Download className="w-5 h-5" />
//                             Resume
//                           </a>
//                         )}

//                         {/* Status Dropdown */}
//                         <select
//                           value={app.status}
//                           onChange={(e) => updateStatus(app._id, e.target.value)}
//                           disabled={updatingId === app._id}
//                           className="px-5 py-3 bg-white border-2 border-slate-300 rounded-2xl font-semibold text-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
//                         >
//                           {STATUS_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// app/admin/applications/page.js
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Mail,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
  { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
];

const ITEMS_PER_PAGE = 10;

export default function AdminApplications() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !isAdmin) {
      window.location.href = "/signin";
      return;
    }
    fetchApplications();
  }, [status, session]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const confirmStatusChange = (appId, newStatus) => {
    if (newStatus === "rejected" || newStatus === "hired") {
      setPendingStatusChange({ appId, newStatus });
    } else {
      updateStatus(appId, newStatus);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    if (updatingId) return;
    setUpdatingId(appId);

    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId, status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === appId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    } finally {
      setUpdatingId(null);
      setPendingStatusChange(null);
    }
  };

  const getStatusInfo = (status) => {
    return STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0];
  };

  // Filtered & Sorted Applications
  const filteredAndSorted = useMemo(() => {
    let filtered = applications;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.applicant.name.toLowerCase().includes(lower) ||
          app.applicant.email.toLowerCase().includes(lower) ||
          (app.jobTitle || "Software Engineer").toLowerCase().includes(lower)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.appliedAt) - new Date(a.appliedAt);
      if (sortBy === "date-asc") return new Date(a.appliedAt) - new Date(b.appliedAt);
      if (sortBy === "name") return a.applicant.name.localeCompare(b.applicant.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

    return filtered;
  }, [applications, searchTerm, statusFilter, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-slate-700 text-center">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center max-w-lg">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8 transition-all duration-1000 ${darkMode ? "dark" : ""}`}>
        <div className="max-w-7xl mx-auto relative">
      

          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Sparkles className="w-96 h-96 text-indigo-400 animate-pulse" />
            </div>
            <h1 className="relative text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-slate-600">Next-Gen Application Management</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {STATUS_OPTIONS.map((stat) => {
              const Icon = stat.icon;
              const count = applications.filter((a) => a.status === stat.value).length;
              return (
                <div
                  key={stat.value}
                  className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-white/50 overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-400/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`relative w-20 h-20 ${stat.color} rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <p className="relative text-4xl font-black text-slate-800">{count}</p>
                  <p className="relative text-sm font-medium text-slate-600 mt-2">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, email, job..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-12 pr-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              >
                <option value="all">All Status</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="status">Status</option>
              </select>

              <div className="text-right text-slate-600 flex items-center justify-end gap-2">
                <span className="font-semibold">{filteredAndSorted.length}</span> applications
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="p-8 border-b border-slate-200">
              <h2 className="text-3xl font-bold flex items-center gap-4">
                <Briefcase className="w-10 h-10 text-indigo-600" />
                Applications ({filteredAndSorted.length})
              </h2>
            </div>

            {paginated.length === 0 ? (
              <div className="p-32 text-center">
                <Users className="w-32 h-32 text-slate-300 mx-auto mb-8" />
                <p className="text-2xl text-slate-500">No applications match your filters</p>
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-200">
                  {paginated.map((app) => {
                    const statusInfo = getStatusInfo(app.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <div
                        key={app._id}
                        className="p-8 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/30 transition-all duration-500 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative grid lg:grid-cols-12 gap-6 items-center">
                          {/* Applicant Info */}
                          <div className="lg:col-span-3 flex items-center gap-5">
                            <div className="relative">
                              <img
                                src={app.applicant.image || "/default-avatar.png"}
                                alt={app.applicant.name}
                                className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-2xl group-hover:scale-110 transition-transform"
                              />
                              <div className="absolute inset-0 rounded-3xl ring-4 ring-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{app.applicant.name}</h3>
                              <p className="text-slate-600 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {app.applicant.email}
                              </p>
                            </div>
                          </div>

                          {/* Job & Date */}
                          <div className="lg:col-span-3">
                            <p className="text-lg font-semibold text-slate-800">{app.jobTitle || "Software Engineer"}</p>
                            <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(app.appliedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>

                          {/* Current Status */}
                          <div className="lg:col-span-2">
                            <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-3xl ${statusInfo.color} font-bold shadow-lg`}>
                              <StatusIcon className="w-6 h-6" />
                              {statusInfo.label}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="lg:col-span-4 flex items-center justify-end gap-4">
                            <Link
                              href={`/profile?email=${encodeURIComponent(app.applicant.email)}`}
                              target="_blank"
                              className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 group/btn"
                            >
                              <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                              View Profile
                            </Link>

                            {app.applicant.hasResume && (
                              <a
                                href={`/api/profile/resume?email=${encodeURIComponent(app.applicant.email)}`}
                                download
                                className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all flex items-center gap-3"
                              >
                                <Download className="w-5 h-5" />
                                Resume
                              </a>
                            )}

                            <select
                              value={app.status}
                              onChange={(e) => confirmStatusChange(app._id, e.target.value)}
                              disabled={updatingId === app._id}
                              className="px-6 py-4 bg-white border-2 border-slate-300 rounded-3xl font-semibold text-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 transition-all cursor-pointer hover:border-indigo-400"
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-8 flex items-center justify-between bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 bg-white/80 rounded-2xl shadow-lg disabled:opacity-50 flex items-center gap-3 hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" /> Previous
                    </button>
                    <span className="font-semibold text-slate-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 bg-white/80 rounded-2xl shadow-lg disabled:opacity-50 flex items-center gap-3 hover:bg-white transition-all"
                    >
                      Next <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {pendingStatusChange && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-md border border-white/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Confirm Status Change
              </h3>
              <p className="text-slate-600 mb-8">
                Are you sure you want to mark this application as <span className="font-bold text-red-600">
                  {pendingStatusChange.newStatus === "hired" ? "Hired" : "Rejected"}
                </span>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setPendingStatusChange(null)}
                  className="px-8 py-4 bg-slate-200 hover:bg-slate-300 rounded-2xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatus(pendingStatusChange.appId, pendingStatusChange.newStatus)}
                  className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                    pendingStatusChange.newStatus === "hired"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}