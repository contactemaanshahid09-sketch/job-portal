// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import {
//   MapPin,
//   DollarSign,
//   Briefcase,
//   Search,
//   Filter,
//   ArrowRight,
//   Building2,
//   Clock,
//   Sparkles,
// } from "lucide-react";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => setJobs(data));
//   }, []);

//   const filteredJobs = jobs.filter((job) =>
//     `${job.title} ${job.company} ${job.location}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      
//       {/* HERO */}
//       <section className="relative px-6 pt-24 pb-20 text-center max-w-6xl mx-auto">
//         <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold shadow-sm border border-indigo-200/50">
//           <Sparkles size={16} />
//           Verified Opportunities
//         </span>
        
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
//           Browse{" "}
//           <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Dream Jobs
//           </span>
//         </h1>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
//           Discover opportunities from verified companies worldwide. Your next career move starts here.
//         </p>

//         {/* SEARCH */}
//         <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50 hover:shadow-indigo-100/50 transition-shadow duration-300">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex items-center gap-4 flex-1 px-4 py-3 bg-slate-50/70 rounded-2xl focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300">
//               <Search className="text-gray-400 flex-shrink-0" size={20} />
//               <input
//                 placeholder="Search by title, company, or location"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-400 font-medium"
//               />
//             </div>
//             <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
//               <Filter size={18} className="group-hover:rotate-12 transition-transform" />
//               Filters
//             </button>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
//           <Stat icon={<Briefcase size={24} />} label="Jobs" value={jobs.length} />
//           <Stat icon={<Building2 size={24} />} label="Companies" value="50+" />
//           <Stat icon={<MapPin size={24} />} label="Locations" value="30+" />
//           <Stat icon={<Clock size={24} />} label="New Today" value="12" />
//         </div>
//       </section>

//       {/* JOBS */}
//       <section className="relative max-w-7xl mx-auto px-6 pb-24">
//         {filteredJobs.length === 0 ? (
//           <div className="text-center py-24 bg-white/50 backdrop-blur rounded-3xl border border-white/50 shadow-lg">
//             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
//               <Briefcase className="text-indigo-600" size={40} />
//             </div>
//             <h3 className="text-2xl font-bold mb-3 text-gray-800">No jobs found</h3>
//             <p className="text-gray-600 text-lg">
//               Try adjusting your search keywords or filters.
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredJobs.map((job) => (
//               <JobCard key={job._id} job={job} />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Stat({ icon, label, value }) {
//   return (
//     <div className="relative group bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-6 border border-white/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden backdrop-blur-sm">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative flex justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
//         {icon}
//       </div>
//       <p className="relative text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{value}</p>
//       <p className="relative text-sm text-gray-500 font-medium mt-1">{label}</p>
//     </div>
//   );
// }

// function JobCard({ job }) {
//   return (
//     <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      
//       <div className="relative">
//         {/* Header */}
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
//             <Building2 className="text-white" size={24} />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
//               {job.title}
//             </h3>
//             <p className="text-sm text-gray-500 font-medium">{job.company}</p>
//           </div>
//         </div>

//         {/* Job details */}
//         <div className="space-y-3 mb-6 text-sm text-gray-600">
//           {job.location && (
//             <div className="flex items-center gap-3 px-3 py-2 bg-slate-50/70 rounded-xl group-hover:bg-white transition-colors duration-300">
//               <MapPin size={16} className="text-indigo-600 flex-shrink-0" />
//               <span className="font-medium">{job.location}</span>
//             </div>
//           )}
//           {job.salary && (
//             <div className="flex items-center gap-3 px-3 py-2 bg-slate-50/70 rounded-xl group-hover:bg-white transition-colors duration-300">
//               <DollarSign size={16} className="text-purple-600 flex-shrink-0" />
//               <span className="font-semibold text-gray-800">{job.salary}</span>
//             </div>
//           )}
//         </div>

//         {/* Description */}
//         {job.description && (
//           <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
//             {job.description}
//           </p>
//         )}

//         {/* CTA */}
//         <Link
//           href={`/jobs/${job._id}`}
//           className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-4 transition-all duration-300 group/link"
//         >
//           View details 
//           <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
//         </Link>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Building2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated futuristic background orbs with soft glows */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* HERO */}
      <section className="relative px-6 pt-24 pb-20 text-center max-w-6xl mx-auto z-10">
        <span className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-cyan-200/50 text-cyan-700 text-sm font-bold shadow-lg shadow-cyan-200/30">
          <Zap size={18} className="animate-pulse text-cyan-500" />
          Verified Future Opportunities
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
          Unlock Your{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Next-Gen Career
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Explore cutting-edge opportunities from innovative companies worldwide. The future of work starts now.
        </p>

        {/* SEARCH BAR - Glassmorphism with subtle neon border */}
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:border-cyan-300/50 transition-all duration-500 group">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4 flex-1 px-6 py-4 bg-white/70 rounded-2xl border border-gray-200 focus-within:border-cyan-400 focus-within:shadow-lg focus-within:shadow-cyan-300/40 transition-all duration-500">
              <Search className="text-cyan-500" size={24} />
              <input
                placeholder="Search roles, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder:text-gray-500 font-medium text-lg"
              />
            </div>
            <button className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-white text-lg hover:from-cyan-400 hover:to-purple-400 hover:shadow-2xl hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300 group/btn">
              <Filter size={22} className="group-hover/btn:rotate-180 transition-transform duration-500" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <Stat icon={<Briefcase size={28} />} label="Active Roles" value={jobs.length} />
          <Stat icon={<Building2 size={28} />} label="Innovators" value="200+" />
          <Stat icon={<MapPin size={28} />} label="Global Hubs" value="50+" />
          <Stat icon={<Clock size={28} />} label="Posted Today" value="24" />
        </div>
      </section>

      {/* JOBS GRID */}
      <section className="relative max-w-7xl mx-auto px-6 pb-32 z-10">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-32 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl">
            <div className="bg-gradient-to-br from-cyan-100 to-purple-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-200/50">
              <Briefcase className="text-cyan-600" size={64} />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">No matches detected</h3>
            <p className="text-gray-500 text-xl">Refine your search parameters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Stat({ icon, label, value }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 hover:border-cyan-300/50 shadow-lg hover:shadow-2xl hover:shadow-cyan-200/40 hover:-translate-y-4 transition-all duration-500">
      <div className="flex flex-col items-center">
        <div className="text-cyan-500 mb-4 group-hover:scale-125 transition-transform duration-500">
          {icon}
        </div>
        <p className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-gray-600 text-sm font-medium mt-2">{label}</p>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="group relative bg-white/70 backdrop-blur-2xl rounded-3xl p-10 border border-gray-100 hover:border-cyan-300/60 shadow-2xl hover:shadow-cyan-200/50 hover:-translate-y-6 transition-all duration-500 overflow-hidden">
      {/* Subtle glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-purple-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
      
      <div className="relative z-10">
        {/* Company Logo Placeholder */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-300/50 group-hover:scale-110 transition-transform duration-500">
            <Building2 className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
              {job.title}
            </h3>
            <p className="text-gray-600 text-lg font-medium">{job.company}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-8">
          {job.location && (
            <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
              <MapPin size={20} className="text-cyan-500" />
              <span className="font-medium text-gray-700">{job.location}</span>
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-4 px-5 py-3 bg-white/60 rounded-2xl border border-gray-100">
              <DollarSign size={20} className="text-purple-500" />
              <span className="font-bold text-lg text-gray-800">{job.salary}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-gray-600 line-clamp-3 mb-8 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* CTA */}
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-3 text-cyan-600 font-bold text-lg hover:gap-6 transition-all duration-500 group/link"
        >
          Explore Opportunity
          <ArrowRight size={24} className="group-hover/link:translate-x-4 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}