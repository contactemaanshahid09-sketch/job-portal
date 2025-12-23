// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Building2,
//   Users,
//   TrendingUp,
//   ArrowRight,
//   Sparkles,
//   Eye,
// } from "lucide-react";
// import HeroSlider from "./components/HeroSlider";

// export default function HomePage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch jobs from API
//     fetch("/api/jobs")
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setFilteredJobs(data.slice(0, 6)); // Show first 6 jobs
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching jobs:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Handle search functionality
//   const handleSearch = () => {
//     let filtered = jobs;

//     // Filter by search term (job title or company)
//     if (search.trim()) {
//       filtered = filtered.filter(
//         (job) =>
//           job.title.toLowerCase().includes(search.toLowerCase()) ||
//           job.company.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Filter by location
//     if (location.trim()) {
//       filtered = filtered.filter((job) =>
//         job.location.toLowerCase().includes(location.toLowerCase())
//       );
//     }

//     setFilteredJobs(filtered);
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Navigate to job details
//   const handleJobClick = (jobId) => {
//     router.push(`/jobs/${jobId}`);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">

//       <HeroSlider/>
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         {/* Enhanced gradient background with animated shapes */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />
//         <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//         <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

//         <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-28 text-center">
//           <span className="inline-flex items-center gap-2 mb-8 rounded-full bg-gradient-to-r from-indigo-100 to-sky-100 text-indigo-700 px-6 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm border border-indigo-200/50 hover:shadow-md transition-shadow">
//             <Sparkles size={16} />
//             Modern job search platform
//           </span>

//           <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
//             Find a job that{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-500 bg-clip-text text-transparent animate-gradient">
//               fits your future
//             </span>
//           </h1>

//           <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-14 leading-relaxed">
//             Explore thousands of verified jobs from top companies. Simple,
//             fast, and built for professionals.
//           </p>

//           {/* SEARCH */}
//           <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 hover:shadow-indigo-100/50 transition-all duration-300">
//             <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
//               <Input
//                 icon={<Search size={20} />}
//                 placeholder="Job title or company"
//                 value={search}
//                 onChange={setSearch}
//                 onKeyPress={handleKeyPress}
//               />
//               <Input
//                 icon={<MapPin size={20} />}
//                 placeholder="Location"
//                 value={location}
//                 onChange={setLocation}
//                 onKeyPress={handleKeyPress}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white px-8 sm:px-10 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group whitespace-nowrap">
//                 Search jobs
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
//               Remote positions
//             </span>
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//               Full-time & Part-time
//             </span>
//             <span className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
//               Top companies
//             </span>
//           </div>
//         </div>
//       </section>

//       {/* STATS */}
//       <section className="py-16 sm:py-24">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 px-6">
//           <Stat icon={<Briefcase size={28} />} value="10k+" label="Jobs" />
//           <Stat icon={<Building2 size={28} />} value="500+" label="Companies" />
//           <Stat icon={<Users size={28} />} value="50k+" label="Candidates" />
//           <Stat icon={<TrendingUp size={28} />} value="95%" label="Success Rate" />
//         </div>
//       </section>

//       {/* CATEGORIES */}
//       <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl" />

//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Popular Categories
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg">Discover opportunities across different industries</p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             {[
//               "Technology",
//               "Design",
//               "Marketing",
//               "Business",
//               "Healthcare",
//               "Education",
//               "Science",
//               "Legal",
//             ].map((item) => (
//               <Category key={item} title={item} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURED JOBS SECTION */}
//       <section className="py-16 sm:py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50/30" />
//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//               Featured Opportunities
//             </h2>
//             <p className="text-slate-600 text-base sm:text-lg">Hand-picked jobs from leading companies</p>
//           </div>

//           {loading ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-14 h-14 rounded-2xl bg-slate-200" />
//                     <div className="w-20 h-6 bg-slate-200 rounded-full" />
//                   </div>
//                   <div className="h-6 bg-slate-200 rounded mb-2 w-3/4" />
//                   <div className="h-5 bg-slate-200 rounded mb-4 w-1/2" />
//                   <div className="h-4 bg-slate-200 rounded w-1/3" />
//                 </div>
//               ))}
//             </div>
//           ) : filteredJobs.length > 0 ? (
//             <>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredJobs.map((job) => (
//                   <JobCard
//                     key={job._id}
//                     id={job._id}
//                     company={job.company}
//                     title={job.title}
//                     location={job.location}
//                     salary={job.salary}
//                     description={job.description}
//                     onClick={() => handleJobClick(job._id)}
//                   />
//                 ))}
//               </div>

//               <div className="text-center mt-12">
//                 <button
//                   onClick={() => router.push('/jobs')}
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group">
//                   View all jobs
//                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-16">
//               <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
//                 <Briefcase className="text-slate-400" size={32} />
//               </div>
//               <p className="text-slate-600 text-lg font-medium">No jobs found matching your criteria</p>
//               <p className="text-slate-500 text-sm mt-2">Try adjusting your search filters</p>
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setLocation("");
//                   setFilteredJobs(jobs.slice(0, 6));
//                 }}
//                 className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 sm:py-32">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 p-12 sm:p-16 text-white shadow-2xl overflow-hidden group">
//             <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

//             <div className="relative">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
//                 Ready to take the next step?
//               </h2>
//               <p className="text-white/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
//                 Join thousands of professionals who found their dream job.
//               </p>
//               <button
//                 onClick={() => router.push('/jobs')}
//                 className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group">
//                 Browse Jobs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------- COMPONENTS ---------- */

// function Input({ icon, placeholder, value, onChange, onKeyPress }) {
//   return (
//     <div className="relative flex-1 group">
//       <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
//         {icon}
//       </div>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyPress={onKeyPress}
//         placeholder={placeholder}
//         className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 placeholder:text-slate-400 font-medium text-sm sm:text-base"
//       />
//     </div>
//   );
// }

// function Stat({ icon, value, label }) {
//   return (
//     <div className="relative group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 text-center border border-slate-200/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative flex justify-center text-indigo-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
//         {icon}
//       </div>
//       <p className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{value}</p>
//       <p className="relative text-slate-500 text-xs sm:text-sm font-medium mt-1">{label}</p>
//     </div>
//   );
// }

// function Category({ title }) {
//   return (
//     <div className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="relative">
//         <h3 className="font-bold text-lg sm:text-xl mb-2 group-hover:text-indigo-600 transition-colors duration-300">
//           {title}
//         </h3>
//         <p className="text-slate-500 text-xs sm:text-sm">Explore opportunities</p>
//         <ArrowRight className="mt-3 sm:mt-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all duration-300" size={20} />
//       </div>
//     </div>
//   );
// }

// function JobCard({ id, company, title, location, salary, description, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       <div className="relative">
//         <div className="flex items-start justify-between mb-4">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
//             {company.charAt(0)}
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
//               Featured
//             </span>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onClick();
//               }}
//               className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-100 transition-all duration-300 group/btn"
//               title="View details">
//               <Eye size={18} className="text-slate-600 group-hover/btn:text-indigo-600" />
//             </button>
//           </div>
//         </div>

//         <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">
//           {title}
//         </h3>
//         <p className="text-slate-600 font-medium mb-4">{company}</p>

//         <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
//           <span className="flex items-center gap-1.5">
//             <MapPin size={16} />
//             {location}
//           </span>
//         </div>

//         {description && (
//           <p className="text-sm text-slate-500 mb-4 line-clamp-2">
//             {description}
//           </p>
//         )}

//         <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//           <span className="font-bold text-indigo-600">PKR {salary || "Competitive"}</span>
//           <ArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Eye,
  Zap,
  Clock,
  Home,
} from "lucide-react";
import HeroSlider from "./components/HeroSlider";
import { motion, useInView } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  // Real-time filtering
  useEffect(() => {
    let filtered = jobs;

    if (search.trim()) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location.trim()) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((job) =>
        job.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    setFilteredJobs(filtered.slice(0, 12)); // Show more on homepage
  }, [search, location, selectedCategory, jobs]);

  const handleJobClick = (jobId) => {
    router.push(`/jobs/${jobId}`);
  };

  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Business",
    "Healthcare",
    "Education",
    "Engineering",
    "Finance",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden">
      <HeroSlider />

      {/* HERO SEARCH SECTION */}
      <section className="relative -mt-32 pt-32 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/80 backdrop-blur-lg px-6 py-3 text-indigo-700 text-sm font-bold shadow-xl border border-white/50"
          >
            <Sparkles className="animate-pulse" size={18} />
            Next-Gen Job Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Find Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent animate-gradient-x">
              Dream Career
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-12"
          >
            Connect with top companies and land roles that match your skills and ambitions.
          </motion.p>

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  icon={<Search size={22} />}
                  placeholder="Job title, skills or company"
                  value={search}
                  onChange={setSearch}
                />
                <Input
                  icon={<MapPin size={22} />}
                  placeholder="City, state or remote"
                  value={location}
                  onChange={setLocation}
                />
                <button
                  onClick={() => router.push(`/jobs?search=${search}&location=${location}`)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  Find Jobs
                  <Zap size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> 2,500+ Active Jobs</span>
              <span className="flex items-center gap-2"><Home size={16} /> Remote Friendly</span>
              <span className="flex items-center gap-2"><Clock size={16} /> Instant Apply</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS WITH COUNTER ANIMATION */}
      <section ref={statsRef} className="py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          <CounterStat icon={<Briefcase />} end={12000} label="Jobs Posted" suffix="+" inView={isStatsInView} />
          <CounterStat icon={<Building2 />} end={850} label="Companies" suffix="+" inView={isStatsInView} />
          <CounterStat icon={<Users />} end={75000} label="Professionals" suffix="+" inView={isStatsInView} />
          <CounterStat icon={<TrendingUp />} end={98} label="Success Rate" suffix="%" inView={isStatsInView} />
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
              Explore by Category
            </h2>
            <p className="text-slate-600 mt-4 text-lg">Find your perfect role in trending industries</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                className={`group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer hover:scale-105 ${
                  selectedCategory === cat
                    ? "border-indigo-500 shadow-2xl ring-4 ring-indigo-200/50"
                    : "border-transparent shadow-xl hover:border-indigo-300"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {cat[0]}
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-indigo-700 transition-colors">{cat}</h3>
                  <p className="text-slate-500 text-sm mt-1">View jobs →</p>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setSelectedCategory("")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Clear category filter
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-20 bg-gradient-to-b from-transparent to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
              Featured Opportunities
            </h2>
            <p className="text-slate-600 mt-4 text-lg">Curated just for you</p>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job, i) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <JobCard
                      job={job}
                      onClick={() => handleJobClick(job._id)}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/jobs')}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  Explore All Jobs
                  <ArrowRight size={22} />
                </motion.button>
              </div>
            </>
          ) : (
            <EmptyState onClear={() => {
              setSearch("");
              setLocation("");
              setSelectedCategory("");
            }} />
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-8"
          >
            Start Your Journey Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            Join thousands who’ve found meaningful careers through our platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => router.push('/jobs')}
              className="bg-white text-indigo-700 px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-indigo-300 hover:scale-110 transition-all duration-500"
            >
              Browse Opportunities →
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* REUSABLE COMPONENTS */

function Input({ icon, placeholder, value, onChange }) {
  return (
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-600 transition-colors">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/70 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 text-base font-medium placeholder:text-slate-400"
      />
    </div>
  );
}

function CounterStat({ icon, end, label, suffix = "", inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white shadow-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-slate-600 font-medium mt-2">{label}</p>
    </div>
  );
}

function JobCard({ job, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-400 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {job.company[0]}
          </div>
          <div className="flex gap-2">
            {job.remote && <Tag text="Remote" color="emerald" />}
            {job.type === "Full-time" && <Tag text="Full-time" color="blue" />}
            <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-bold rounded-full">
              Featured
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
          {job.title}
        </h3>
        <p className="text-slate-600 font-semibold mb-4">{job.company}</p>

        <div className="flex items-center gap-4 text-slate-500 mb-4">
          <span className="flex items-center gap-2">
            <MapPin size={18} />
            {job.location}
          </span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-6">{job.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xl font-bold text-indigo-600">
            PKR {job.salary || "Competitive"}
          </span>
          <ArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" size={24} />
        </div>
      </div>
    </motion.div>
  );
}

function Tag({ text, color = "indigo" }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${colors[color]}`}>
      {text}
    </span>
  );
}

function ShimmerCard() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
        <div className="w-20 h-8 bg-slate-200 rounded-full" />
      </div>
      <div className="h-7 bg-slate-200 rounded mb-3 w-4/5" />
      <div className="h-5 bg-slate-200 rounded mb-4 w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
        <Briefcase size={48} className="text-indigo-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">No jobs found</h3>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Try adjusting your search or category filters to see more opportunities.
      </p>
      <button
        onClick={onClear}
        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 shadow-xl"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
}

/* Add to your global CSS or tailwind.config for gradient animation */
<style jsx global>{`
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 8s ease infinite;
  }
`}</style>