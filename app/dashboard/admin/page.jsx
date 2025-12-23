
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase, Users, PlusCircle, TrendingUp, Edit2, Trash2, Search,
  Building2, ArrowUp, Calendar, Layers, CheckCircle, MapPin, Check,
  X, Eye, Sparkles, Tag, Star
} from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

   useEffect(() => {
    
  
      if (!session) {
        router.push("/signin");
        return;
      }
  
      if (session.user.role === "user") {
        router.push("/user/dashboard");
      } 
    }, [session, status, router]);

    

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Form States
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [experience, setExperience] = useState("");
  const [statusField, setStatusField] = useState("Open");
  const [jobType, setJobType] = useState("Remote");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const addSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddJob = async () => {
    if (!title || !company || !location) {
      alert("Please fill in required fields: Title, Company, Location");
      return;
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        company,
        location,
        salary: salary || null,
        description: description || null,
        startDate: startDate || null,
        endDate: endDate || null,
        experience: experience ? Number(experience) : null,
        status: statusField,
        type: jobType,
        skills,
        featured,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setJobs((prev) => [data, ...prev]);
      resetForm();
      setSuccessMsg("Job added successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    }
  };

  const resetForm = () => {
    setTitle(""); setCompany(""); setLocation(""); setSalary(""); setDescription("");
    setStartDate(""); setEndDate(""); setExperience(""); setStatusField("Open");
    setJobType("Remote"); setSkills([]); setSkillInput(""); setFeatured(false);
  };

  const handleDeleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setSelectedJob(null);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.skills?.join(" ")}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-4 border-t-indigo-600 border-r-purple-600 border-b-pink-600 border-l-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-700 text-xl font-medium">Initializing dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Success Alert */}
        {successMsg && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-4 bg-white border-2 border-green-500 px-8 py-5 rounded-2xl shadow-2xl animate-pulse">
            <Check size={28} className="text-green-600" />
            <span className="text-gray-900 font-bold text-lg">{successMsg}</span>
            <button onClick={() => setSuccessMsg("")} className="text-gray-500 hover:text-gray-700">
              <X size={22} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage job opportunities with ease</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Jobs" value={jobs.length} icon={<Briefcase />} color="from-indigo-500 to-blue-600" />
          <StatCard title="Active" value={jobs.filter(j => j.status === "Open").length} icon={<TrendingUp />} color="from-emerald-500 to-teal-600" />
          <StatCard title="Remote" value={jobs.filter(j => j.type === "Remote").length} icon={<Users />} color="from-purple-500 to-pink-600" />
          <StatCard title="Featured" value={jobs.filter(j => j.featured).length} icon={<Star />} color="from-yellow-500 to-orange-600" />
        </div>

        {/* Add Job Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <PlusCircle size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create New Job</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Job Title *" value={title} onChange={setTitle} icon={<Briefcase />} />
            <Input label="Company *" value={company} onChange={setCompany} icon={<Building2 />} />
            <Input label="Location *" value={location} onChange={setLocation} icon={<MapPin />} />
            <Input label="Salary Range" value={salary} onChange={setSalary} placeholder="e.g. $120k - $180k" />
            <Input label="Experience (years)" value={experience} onChange={setExperience} icon={<Layers />} type="number" />
            
            <Input type="date" label="Start Date" value={startDate} onChange={setStartDate} icon={<Calendar />} />
            <Input type="date" label="Application Deadline" value={endDate} onChange={setEndDate} icon={<Calendar />} />

            <Select label="Status" value={statusField} onChange={setStatusField} icon={<CheckCircle />}>
              <option>Open</option>
              <option>Closed</option>
              <option>Draft</option>
            </Select>

            <Select label="Job Type" value={jobType} onChange={setJobType}>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </Select>

            {/* Skills Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Skills Required</label>
              <div className="relative">
                <Tag className="absolute left-4 top-4 text-gray-500" size={20} />
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Type skill and press Enter..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                    {skill}
                    <button onClick={() => removeSkill(i)} className="hover:bg-white/20 rounded-full p-1 transition">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="text-gray-700 font-semibold">Featured Job</label>
              <button
                onClick={() => setFeatured(!featured)}
                className={`relative w-14 h-8 rounded-full transition-all ${featured ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${featured ? "translate-x-6" : ""}`} />
              </button>
              {featured && <Sparkles className="text-yellow-500" size={24} />}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Job Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full p-5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleAddJob}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Launch Job Listing 🚀
          </button>
        </div>

        {/* Job Listings Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900">Job Listings</h3>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                placeholder="Search jobs & skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  <Th>Title</Th>
                  <Th>Company</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>Featured</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-16 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center">
                          <Briefcase className="text-gray-400" size={40} />
                        </div>
                        <p className="text-gray-500 text-lg">No jobs match your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job._id} className="border-t border-gray-100 hover:bg-gray-50 transition-all">
                      <Td><span className="font-semibold text-gray-900">{job.title}</span></Td>
                      <Td className="text-gray-600">{job.company}</Td>
                      <Td><Badge text={job.type} type={job.type} /></Td>
                      <Td><Badge text={job.status} type={job.status} /></Td>
                      <Td>{job.featured ? <Star className="text-yellow-500 fill-yellow-500" size={20} /> : "-"}</Td>
                      <Td>
                        <div className="flex gap-3">
                          <ActionBtn icon={<Eye />} onClick={() => setSelectedJob(job)} />
                          <ActionBtn icon={<Edit2 />} onClick={() => router.push(`/dashboard/jobs/${job._id}/edit`)} />
                          <ActionBtn icon={<Trash2 />} danger onClick={() => handleDeleteJob(job._id)} />
                        </div>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-t-3xl flex justify-between items-start text-white">
                <div className="flex gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold">
                    {selectedJob.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                    <p className="text-indigo-100 text-lg">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedJob(null)} className="p-3 hover:bg-white/20 rounded-2xl transition">
                  <X size={28} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedJob.salary && <Detail label="Salary" value={selectedJob.salary} color="text-emerald-600" />}
                  <Detail label="Type" value={selectedJob.type} color="text-indigo-600" />
                  <Detail label="Status" value={selectedJob.status} color={selectedJob.status === "Open" ? "text-emerald-600" : "text-red-600"} />
                  {selectedJob.experience && <Detail label="Experience" value={`${selectedJob.experience} years`} color="text-purple-600" />}
                  {selectedJob.startDate && <Detail label="Start" value={new Date(selectedJob.startDate).toLocaleDateString()} color="text-pink-600" />}
                  {selectedJob.endDate && <Detail label="Deadline" value={new Date(selectedJob.endDate).toLocaleDateString()} color="text-orange-600" />}
                </div>

                {selectedJob.skills?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                      <Tag className="text-indigo-600" /> Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedJob.skills.map((skill, i) => (
                        <span key={i} className="px-5 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full border border-indigo-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedJob.description && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => { router.push(`/dashboard/jobs/${selectedJob._id}/edit`); setSelectedJob(null); }}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    Edit Job
                  </button>
                  <button
                    onClick={() => { handleDeleteJob(selectedJob._id); setSelectedJob(null); }}
                    className="flex-1 py-4 bg-red-50 border border-red-500 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Components */
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <Sparkles className="text-yellow-500 opacity-0 group-hover:opacity-100 transition" size={20} />
      </div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-4xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, icon, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          className={`w-full ${icon ? 'pl-12' : 'pl-5'} pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
        />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, children, icon }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">{icon}</div>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-12' : 'pl-5'} pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer`}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 1L7 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function Badge({ text, type }) {
  const styles = {
    Remote: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Hybrid: "bg-blue-100 text-blue-700 border border-blue-200",
    Onsite: "bg-orange-100 text-orange-700 border border-orange-200",
    Open: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Closed: "bg-red-100 text-red-700 border border-red-200",
    Draft: "bg-gray-100 text-gray-700 border border-gray-200",
  };
  return <span className={`px-4 py-2 rounded-full text-sm font-semibold ${styles[type] || styles.Draft}`}>{text}</span>;
}

function Th({ children }) {
  return <th className="p-6 text-left">{children}</th>;
}

function Td({ children }) {
  return <td className="p-6 text-gray-700">{children}</td>;
}

function ActionBtn({ icon, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl transition-all hover:scale-110 ${danger ? "bg-red-100 hover:bg-red-200 text-red-600" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-600"}`}
    >
      {icon}
    </button>
  );
}

function Detail({ label, value, color }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}