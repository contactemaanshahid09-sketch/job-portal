// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Briefcase,
//   Building2,
//   MapPin,
//   Calendar,
//   Layers,
//   CheckCircle,
//   Save,
//   ArrowLeft,
// } from "lucide-react";

// export default function EditJobPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);

//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [description, setDescription] = useState("");

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [experience, setExperience] = useState(null);
//   const [status, setStatus] = useState("Open");
//   const [type, setType] = useState("Remote");

//   /* ---------------- FETCH JOB ---------------- */
//   useEffect(() => {
//     const fetchJob = async () => {
//       const res = await fetch(`/api/jobs/${id}`);
//       const data = await res.json();

//       setTitle(data.title);
//       setCompany(data.company);
//       setLocation(data.location);
//       setSalary(data.salary || "");
//       setDescription(data.description || "");
//       setExperience(data.experience || "");

//       setStartDate(data.startDate ? data.startDate.split("T")[0] : null);
//       setEndDate(data.endDate ? data.endDate.split("T")[0] : null);
//       setStatus(data.status);
//       setType(data.type);

//       setLoading(false);
//     };

//     fetchJob();
//   }, [id]);

//   /* ---------------- UPDATE JOB ---------------- */
//   const handleUpdate = async () => {
//     const res = await fetch(`/api/jobs/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         company,
//         location,
//         salary,
//         description,
//         startDate,
//         endDate,
//         experience,
//         status,
//         type,
//       }),
//     });

//     if (res.ok) {
//       alert("Job updated successfully");
//       router.push("/dashboard");
//     } else {
//       alert("Failed to update job");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 px-6 py-10">
//       <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-200/50">

//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
//           <button
//             onClick={() => router.back()}
//             className="p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all duration-300 shadow-sm hover:shadow"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-3xl font-bold text-slate-900">Edit Job</h1>
//         </div>

//         {/* FORM */}
//         <div className="grid md:grid-cols-2 gap-5 mb-8">
//           <Input label="Job Title" value={title} onChange={setTitle} icon={<Briefcase />} />
//           <Input label="Company" value={company} onChange={setCompany} icon={<Building2 />} />
//           <Input label="Location" value={location} onChange={setLocation} icon={<MapPin />} />
//           <Input label="Salary" value={salary} onChange={setSalary} />
//           <Input label="Experience (years)" value={experience ?? ""} onChange={(v) => setExperience(v || null)} icon={<Layers />} />

//           <Input
//             type="date"
//             label="Start Date"
//             value={startDate ?? ""}
//             onChange={(v) => setStartDate(v || null)}
//             icon={<Calendar />}
//           />

//           <Input
//             type="date"
//             label="End Date"
//             value={endDate ?? ""}
//             onChange={(v) => setEndDate(v || null)}
//             icon={<Calendar />}
//           />

//           <Select value={status} onChange={setStatus} icon={<CheckCircle />}>
//             <option>Open</option>
//             <option>Closed</option>
//             <option>Draft</option>
//           </Select>

//           <Select value={type} onChange={setType}>
//             <option>Remote</option>
//             <option>Hybrid</option>
//             <option>Onsite</option>
//           </Select>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter detailed job description..."
//               rows={4}
//               className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400"
//             />
//           </div>
//         </div>

//         {/* ACTION */}
//         <button
//           onClick={handleUpdate}
//           className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02]"
//         >
//           <Save className="w-5 h-5" /> Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ---------------- COMPONENTS ---------------- */

// function Input({ label, value, onChange, icon, type = "text" }) {
//   return (
//     <div className="relative group">
//       <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
//       {icon && <div className="absolute left-4 bottom-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">{icon}</div>}
//       <input
//         type={type}
//         placeholder={label}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`w-full ${icon ? "pl-11" : "pl-4"} pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 placeholder:text-slate-400 shadow-sm hover:shadow`}
//       />
//     </div>
//   );
// }

// function Select({ value, onChange, children, icon }) {
//   return (
//     <div className="relative group">
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {icon && <span className="inline-flex items-center gap-1.5">{icon} Status</span>}
//         {!icon && "Type"}
//       </label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow cursor-pointer appearance-none`}
//         style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em'}}
//       >
//         {children}
//       </select>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Layers,
  CheckCircle,
  Save,
  ArrowLeft,
  Tag,
  X,
  Sparkles,
} from "lucide-react";

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // FORM FIELDS
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("Open");
  const [type, setType] = useState("Remote");

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [featured, setFeatured] = useState(false);

  /* ---------------- FETCH JOB ---------------- */
  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setCompany(data.company);
      setLocation(data.location);
      setSalary(data.salary || "");
      setDescription(data.description || "");

      setExperience(data.experience ?? "");

      setStartDate(data.startDate ? data.startDate.split("T")[0] : null);
      setEndDate(data.endDate ? data.endDate.split("T")[0] : null);

      setStatus(data.status);
      setType(data.type);

      setSkills(data.skills || []);
      setFeatured(Boolean(data.featured));

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  /* ---------------- SKILLS HANDLING ---------------- */
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

  /* ---------------- UPDATE JOB ---------------- */
  const handleUpdate = async () => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        company,
        location,
        salary,
        description,
        startDate,
        endDate,
        experience,
        status,
        type,
        skills,
        featured,
      }),
    });

    if (res.ok) {
      alert("Job updated successfully");
      router.push("/dashboard");
    } else {
      alert("Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-200/50">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all duration-300 shadow-sm hover:shadow"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Edit Job</h1>
        </div>

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <Input label="Job Title" value={title} onChange={setTitle} icon={<Briefcase />} />
          <Input label="Company" value={company} onChange={setCompany} icon={<Building2 />} />
          <Input label="Location" value={location} onChange={setLocation} icon={<MapPin />} />
          <Input label="Salary" value={salary} onChange={setSalary} />
          <Input label="Experience (years)" value={experience} onChange={setExperience} icon={<Layers />} />

          <Input type="date" label="Start Date" value={startDate ?? ""} onChange={setStartDate} icon={<Calendar />} />
          <Input type="date" label="End Date" value={endDate ?? ""} onChange={setEndDate} icon={<Calendar />} />

          <Select value={status} onChange={setStatus} icon={<CheckCircle />}>
            <option>Open</option>
            <option>Closed</option>
            <option>Draft</option>
          </Select>

          <Select value={type} onChange={setType}>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </Select>

          {/* SKILLS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Skills</label>
            <div className="relative">
              <Tag className="absolute left-4 top-4 text-gray-500" size={20} />
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type skill and press Enter..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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

          {/* FEATURED */}
          <div className="md:col-span-2 flex items-center gap-4 mt-4">
            <label className="text-gray-700 font-semibold">Featured Job</label>
            <button
              onClick={() => setFeatured(!featured)}
              className={`relative w-14 h-8 rounded-full transition-all ${featured ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${featured ? "translate-x-6" : ""}`} />
            </button>
            {featured && <Sparkles className="text-yellow-500" size={24} />}
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed job description..."
              rows={4}
              className="w-full p-4 border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleUpdate}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 shadow-lg transition-all transform hover:scale-[1.02]"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, value, onChange, icon, type = "text" }) {
  return (
    <div className="relative group">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      {icon && (
        <div className="absolute left-4 bottom-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={`w-full ${icon ? "pl-11" : "pl-4"} pr-4 py-3.5 border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
      />
    </div>
  );
}

function Select({ value, onChange, children, icon }) {
  return (
    <div className="relative group">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {icon ? <span className="inline-flex items-center gap-1.5">{icon} Status</span> : "Type"}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        {children}
      </select>
    </div>
  );
}
