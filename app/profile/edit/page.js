
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Sparkles, Briefcase, Building2, Users, TrendingUp, MapPin, Eye, ArrowRight, Search, Download, Trash2, Plus} from "lucide-react";

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [about, setAbout] = useState("");
//   const [education, setEducation] = useState([]);   
//   const [experience, setExperience] = useState([]); 
//   const [skillsText, setSkillsText] = useState(""); 
//   const [accounts, setAccounts] = useState([]);     

//   const [resumeMeta, setResumeMeta] = useState(null); 

//   const [resumeFile, setResumeFile] = useState(null); 

//   const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
//   const [showResumeModal, setShowResumeModal] = useState(false);



// const getFileType = (mimeType, originalName) => {
//   if (!mimeType) return 'unknown';
  
//   if (mimeType.startsWith('image/')) return 'image';
//   if (mimeType === 'application/pdf') return 'pdf';
//   return 'document'; 
// };


//   //  LOAD PROFILE 
//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session?.user?.email) {
//       router.push("/signin");
//       return;
//     }

//     const fetchProfile = async () => {
//     try {
//         setLoading(true);
//         const res = await fetch(
//         `/api/profile?email=${encodeURIComponent(session.user.email)}`
//         );
//         if (!res.ok) {
//         setLoading(false);
//         return;
//         }
//         const data = await res.json();
//         if (!data) {
//         setLoading(false);
//         return;
//         }

//         setAbout(data.about || "");
//         setEducation(data.education || []);
//         setExperience(data.experience || []);
//         setSkillsText((data.skills || []).join(", "));
//         setAccounts(data.accounts || []);

//         if (data.resume?.originalName || data.resume?.uploadedAt) {
//         setResumeMeta({
//             originalName: data.resume.originalName || "",
//             uploadedAt: data.resume.uploadedAt || null,
//             mimeType: data.resume.mimeType || null,  // ← ADD THIS
//         });

//         // yahi pe preview URL banao
//         try {
//             const previewRes = await fetch(
//             `/api/profile/resume?email=${encodeURIComponent(session.user.email)}`
//             );
//             if (previewRes.ok) {
//             const blob = await previewRes.blob();
//             const url = URL.createObjectURL(blob);
//             setResumePreviewUrl(url);
//             }
//         } catch (e) {
//             console.error("Error loading resume preview - page.js:89", e);
//         }
//         } else {
//         setResumeMeta(null);
//         setResumePreviewUrl(null);
//         }
//     } catch (err) {
//         console.error("Error loading profile: - page.js:96", err);
//     } finally {
//         setLoading(false);
//     }
//     };

//     fetchProfile();

//   }, [status, router, session?.user?.email]);
  
  
//   // ------------------ SAVE PROFILE (ABOUT/EDU/EXP/SKILLS/ACCOUNTS) ------------------
//   const handleSaveProfile = async () => {
//     if (!session?.user?.email) return;
//     try {
//       setSaving(true);

//       const payload = {
//         email: session.user.email,
//         about,
//         education,
//         experience,
//         skills: skillsText
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         accounts,
//       };

//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         alert("Failed to save profile");
//         return;
//       }

//       alert("Profile saved");
//     } catch (err) {
//       console.error("Error saving profile: - page.js:138", err);
//       alert("Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // RESUME HANDLERS

//   const handleResumeChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setResumeFile(file);
//   };

//   const handleUploadResume = async () => {
//     if (!session?.user?.email || !resumeFile) return;

//     try {
//       const formData = new FormData();
//       formData.append("email", session.user.email);
//       formData.append("file", resumeFile);

//       const res = await fetch("/api/profile/resume", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         alert("Failed to upload resume");
//         return;
//       }

//       const now = new Date();
//       setResumeMeta({
//         originalName: resumeFile.name,
//         uploadedAt: now.toISOString(),
//          mimeType: resumeFile.type,  
//       });
//       setResumeFile(null);
//       alert("Resume uploaded");
//     } catch (err) {
//       console.error("Error uploading resume: - page.js:180", err);
//       alert("Something went wrong");
//     }
    
//     try {
//     const previewRes = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}`
//     );
//     if (previewRes.ok) {
//         const blob = await previewRes.blob();
//         const url = URL.createObjectURL(blob);
//         setResumePreviewUrl(url);
//     }
//     } catch (e) {
//     console.error("Error loading resume preview after upload - page.js:194", e);
//     }
//   };

//   const handleDownloadResume = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}`
//       );
//       if (!res.ok) {
//         alert("No resume found");
//         return;
//       }

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
      
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = resumeMeta?.originalName || "resume";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Download failed: - page.js:220", err);
//       alert("Download failed. Please try again.");
//     }
//   };

//   const handleDeleteResume = async () => {
//     if (!session?.user?.email) return;
//     if (!confirm("Delete resume?")) return;

//     try {
//       const res = await fetch(
//         `/api/profile/resume?email=${encodeURIComponent(session.user.email)}`,
//         { method: "DELETE" }
//       );
//       if (!res.ok) {
//         alert("Failed to delete resume");
//         return;
//       }
//       setResumeMeta(null);
//       alert("Resume deleted");
//       setResumePreviewUrl(null);
//     } catch (err) {
//       console.error("Error deleting resume: - page.js:242", err);
//       alert("Something went wrong");
//     }
//   };


//   const addEducation = () => {
//     setEducation([
//       ...education,
//       { degree: "", institute: "", yearFrom: "", yearTo: "" },
//     ]);
//   };

//   const updateEducation = (index, field, value) => {
//     const copy = [...education];
//     copy[index] = { ...copy[index], [field]: value };
//     setEducation(copy);
//   };

//   const removeEducation = (index) => {
//     const copy = [...education];
//     copy.splice(index, 1);
//     setEducation(copy);
//   };

//   const addExperience = () => {
//     setExperience([
//       ...experience,
//       { title: "", company: "", years: "" },
//     ]);
//   };

//   const updateExperience = (index, field, value) => {
//     const copy = [...experience];
//     copy[index] = { ...copy[index], [field]: value };
//     setExperience(copy);
//   };

//   const removeExperience = (index) => {
//     const copy = [...experience];
//     copy.splice(index, 1);
//     setExperience(copy);
//   };

//   const addAccount = () => {
//     setAccounts([
//       ...accounts,
//       { platform: "", url: "" },
//     ]);
//   };

//   const updateAccount = (index, field, value) => {
//     const copy = [...accounts];
//     copy[index] = { ...copy[index], [field]: value };
//     setAccounts(copy);
//   };

//   const removeAccount = (index) => {
//     const copy = [...accounts];
//     copy.splice(index, 1);
//     setAccounts(copy);
//   };


//    if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-6">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 max-w-md">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
//           <p className="text-slate-600 font-bold text-xl text-center">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//     if (!session?.user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-6">
//         <div className="bg-white rounded-3xl shadow-2xl p-12 border border-white/50 max-w-md text-center">
//           <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
//             <Users className="w-12 h-12 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-slate-900 mb-4">Sign In Required</h2>
//           <p className="text-slate-600 mb-8">Please sign in to manage your professional profile.</p>
//         </div>
//       </div>
//     );
//   }



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* HERO HEADER */}
//         <section className="relative mb-16 sm:mb-24 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50" />
//           <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

//           <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-12 lg:p-16">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
//               <div className="relative flex-shrink-0">
//                 <img
//                   src={session.user.image || "/default-avatar.png"}
//                   alt={session.user.name}
//                   className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-8 ring-indigo-100/50 shadow-2xl border-4 border-white"
//                 />
//                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white">
//                   <TrendingUp className="w-5 h-5 text-white" />
//                 </div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-900 to-sky-900 bg-clip-text text-transparent mb-3 leading-tight">
//                   {session.user.name}
//                 </h1>
//                 <div className="bg-gradient-to-r from-slate-100/60 to-indigo-100/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200/50 inline-block">
//                   <p className="text-lg sm:text-xl font-semibold text-slate-700">{session.user.email}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 mb-16">
//           {/* RESUME SECTION */}
//           <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
//                 <Briefcase className="w-7 h-7 text-white" />
//               </div>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                 Resume
//               </h2>
//             </div>

//             {resumeMeta ? (
//               <div className="bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
//                 <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Last Updated</p>
//                 <p className="text-sm font-semibold text-slate-800">
//                   {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ) : (
//               <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center mb-8 hover:border-indigo-300 transition-colors bg-slate-50/50 backdrop-blur-sm group hover:bg-indigo-50/30">
//                 <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
//                   <Briefcase className="w-10 h-10 text-slate-500 group-hover:text-indigo-600" />
//                 </div>
//                 <p className="text-xl font-bold text-slate-700 mb-2">No Resume</p>
//                 <p className="text-slate-500">Upload your resume to get started</p>
//               </div>
//             )}

//             {/* Smart Preview */}
//             {resumeMeta && (
//               <div className="mb-10">
//                 <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-4">Preview</p>
//                 <div 
//                   className="w-40 h-40 lg:w-44 lg:h-44 bg-gradient-to-br from-slate-50 to-indigo-50 border-2 border-slate-200 rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-500 overflow-hidden group relative"
//                   onClick={() => setShowResumeModal(true)}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
//                   {getFileType(resumeMeta.mimeType) === 'image' && resumePreviewUrl ? (
//                     <img src={resumePreviewUrl} alt="Preview" className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform" />
//                   ) : getFileType(resumeMeta.mimeType) === 'pdf' ? (
//                     <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
//                       <div className="w-16 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl border-4 border-white">
//                         <span className="text-white font-bold text-xl">PDF</span>
//                       </div>
//                       <span className="text-slate-700 font-bold text-sm tracking-wide">First Page</span>
//                     </div>
//                   ) : (
//                     <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
//                       <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-3 shadow-2xl border-4 border-white text-2xl">
//                         📄
//                       </div>
//                       <span className="text-xs text-slate-700 font-bold max-w-[130px] truncate">
//                         {resumeMeta.originalName.split('.').slice(0, -1).join('.')}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-slate-500 mt-4 font-medium truncate max-w-[160px] text-center block">
//                   {resumeMeta.originalName}
//                 </p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-3">
//                 <label className="block text-xs text-slate-500 font-semibold uppercase tracking-wider">Upload Resume</label>
//                 <div className="flex gap-3">
//                   <input
//                     type="file"
//                     onChange={handleResumeChange}
//                     className="flex-1 file:mr-3 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-indigo-600 file:to-sky-500 file:text-white file:shadow-lg file:hover:from-indigo-700 hover:file:shadow-xl bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-sm text-slate-500 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
//                   />
//                   <button
//                     onClick={handleUploadResume}
//                     disabled={!resumeFile}
//                     className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none transition-all text-sm whitespace-nowrap"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <label className="block text-xs text-slate-500 font-semibold uppercase tracking-wider">Quick Actions</label>
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleDownloadResume}
//                     disabled={!resumeMeta}
//                     className="w-full py-4 px-6 border-2 border-slate-200 hover:border-indigo-400 bg-white/70 backdrop-blur-sm rounded-2xl font-semibold text-slate-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-sky-50 hover:shadow-xl disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2 group"
//                   >
//                     <Download className="w-5 h-5 group-hover:translate-y-[-1px] transition-transform" />
//                     Download
//                   </button>
//                   <button
//                     onClick={handleDeleteResume}
//                     disabled={!resumeMeta}
//                     className="w-full py-4 px-6 border-2 border-red-200 hover:border-red-400 bg-white/70 backdrop-blur-sm rounded-2xl font-semibold text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-xl disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2 group"
//                   >
//                     <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* PROFILE INFO SECTION */}
//           {/* 2. ABOUT ME */}
//             <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
//                   <Users className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                   About Me
//                 </h2>
//               </div>
//               <textarea
//                 rows={6}
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 placeholder="Tell us about your professional journey, skills, and career goals..."
//                 className="w-full p-8 rounded-3xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 bg-white/50 backdrop-blur-sm resize-vertical font-medium text-slate-700 placeholder:text-slate-400 transition-all shadow-lg hover:shadow-xl text-lg"
//               />
//             </section>


//               {/* 3. SKILLS */}
//                 <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//                   <div className="flex items-center gap-4 mb-8">
//                     <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
//                       <Sparkles className="w-7 h-7 text-white" />
//                     </div>
//                     <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                       Skills
//                     </h2>
//                   </div>
//                   <input
//                     value={skillsText}
//                     onChange={(e) => setSkillsText(e.target.value)}
//                     placeholder="React, Next.js, Node.js, TypeScript, Tailwind CSS, MongoDB..."
//                     className="w-full p-8 rounded-3xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 bg-white/50 backdrop-blur-sm font-semibold text-slate-700 placeholder:text-slate-400 transition-all shadow-lg hover:shadow-xl text-lg"
//                   />
//                 </section>

//               {/* 4. EDUCATION */}
//               <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-xl">
//                     <Building2 className="w-7 h-7 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Education
//                   </h2>
//                 </div>
//                 <div className="space-y-4">
//                   {education.map((edu, idx) => (
//                     <div key={idx} className="group bg-gradient-to-r from-slate-50 to-indigo-50 p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all shadow-lg hover:shadow-xl space-y-4">
//                       <input placeholder="Degree (e.g. B.Sc Computer Science)" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white font-semibold text-lg" />
//                       <input placeholder="Institute/University" value={edu.institute} onChange={(e) => updateEducation(idx, "institute", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white font-semibold text-lg" />
//                       <div className="grid grid-cols-2 gap-4">
//                         <input placeholder="From (e.g. 2018)" value={edu.yearFrom} onChange={(e) => updateEducation(idx, "yearFrom", e.target.value)} className="p-6 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white font-semibold" />
//                         <input placeholder="To (e.g. 2022)" value={edu.yearTo} onChange={(e) => updateEducation(idx, "yearTo", e.target.value)} className="p-6 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white font-semibold" />
//                       </div>
//                       <button onClick={() => removeEducation(idx)} className="w-full py-4 px-8 border-2 border-red-200 hover:border-red-400 bg-white/70 backdrop-blur-sm rounded-2xl font-bold text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-xl transition-all flex items-center justify-center gap-2">
//                         <Trash2 className="w-5 h-5" /> Remove Education
//                       </button>
//                     </div>
//                   ))}
//                   <button onClick={addEducation} className="w-full py-8 px-12 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3">
//                     <Plus className="w-6 h-6" /> Add Education
//                   </button>
//                 </div>
//               </section>


//               {/* 5. EXPERIENCE */}
//               <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
//                     <Briefcase className="w-7 h-7 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Experience
//                   </h2>
//                 </div>
//                 <div className="space-y-4">
//                   {experience.map((exp, idx) => (
//                     <div key={idx} className="group bg-gradient-to-r from-slate-50 to-emerald-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all shadow-lg hover:shadow-xl space-y-4">
//                       <input placeholder="Job Title (e.g. Senior Frontend Developer)" value={exp.title} onChange={(e) => updateExperience(idx, "title", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white font-semibold text-lg" />
//                       <input placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white font-semibold text-lg" />
//                       <input placeholder="Duration (e.g. 2020 - Present)" value={exp.years} onChange={(e) => updateExperience(idx, "years", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white font-semibold text-lg" />
//                       <button onClick={() => removeExperience(idx)} className="w-full py-4 px-8 border-2 border-red-200 hover:border-red-400 bg-white/70 backdrop-blur-sm rounded-2xl font-bold text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-xl transition-all flex items-center justify-center gap-2">
//                         <Trash2 className="w-5 h-5" /> Remove Experience
//                       </button>
//                     </div>
//                   ))}
//                   <button onClick={addExperience} className="w-full py-8 px-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3">
//                     <Plus className="w-6 h-6" /> Add Experience
//                   </button>
//                 </div>
//               </section>

//               {/* 6. SOCIAL ACCOUNTS */}
//               <section className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
//                     <MapPin className="w-7 h-7 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                     Social Accounts
//                   </h2>
//                 </div>
//                 <div className="space-y-4">
//                   {accounts.map((acc, idx) => (
//                     <div key={idx} className="group bg-gradient-to-r from-slate-50 to-purple-50 p-8 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all shadow-lg hover:shadow-xl space-y-4">
//                       <input placeholder="Platform (LinkedIn, GitHub, Twitter...)" value={acc.platform} onChange={(e) => updateAccount(idx, "platform", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white font-semibold text-lg" />
//                       <input placeholder="https://linkedin.com/in/yourprofile" value={acc.url} onChange={(e) => updateAccount(idx, "url", e.target.value)} className="w-full p-6 rounded-2xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white font-semibold text-lg" />
//                       <button onClick={() => removeAccount(idx)} className="w-full py-4 px-8 border-2 border-red-200 hover:border-red-400 bg-white/70 backdrop-blur-sm rounded-2xl font-bold text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:shadow-xl transition-all flex items-center justify-center gap-2">
//                         <Trash2 className="w-5 h-5" /> Remove Account
//                       </button>
//                     </div>
//                   ))}
//                   <button onClick={addAccount} className="w-full py-8 px-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3">
//                     <Plus className="w-6 h-6" /> Add Social Account
//                   </button>
//                 </div>
//               </section>

//               {/* 7. SAVE BUTTON - BOTTOM */}
//                 <section className="pt-12">
//                   <button
//                     onClick={handleSaveProfile}
//                     disabled={saving}
//                     className="w-full lg:w-auto lg:max-w-md mx-auto bg-gradient-to-r from-indigo-600 via-purple-500 to-sky-500 hover:from-indigo-700 hover:via-purple-600 hover:to-sky-600 text-white px-16 py-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:shadow-lg transition-all duration-300 flex items-center justify-center gap-4 group"
//                   >
//                     {saving ? (
//                       <>
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//                         Saving Profile...
//                       </>
//                     ) : (
//                       <>
//                         Save Profile
//                         <ArrowRight className="group-hover:translate-x-2 transition-transform w-6 h-6" />
//                       </>
//                     )}
//                   </button>
//                 </section>
//               </div>

//               {/* RESUME MODAL */}
//               {showResumeModal && resumeMeta && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowResumeModal(false)}>
//                   <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] overflow-auto border border-white/50 w-full mx-4" onClick={(e) => e.stopPropagation()}>
//                     <div className="p-8 lg:p-12">
//                       {getFileType(resumeMeta.mimeType) === 'image' && resumePreviewUrl ? (
//                         <img src={resumePreviewUrl} alt={resumeMeta.originalName} className="max-h-[70vh] w-auto mx-auto rounded-2xl shadow-2xl" />
//                       ) : getFileType(resumeMeta.mimeType) === 'pdf' ? (
//                         <div className="text-center">
//                           <div className="w-24 h-36 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white">
//                             <span className="text-white text-2xl font-bold">PDF</span>
//                           </div>
//                           <h3 className="text-2xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                           <p className="text-slate-600 mb-8 max-w-md mx-auto">Click "Download" to view the full document in your PDF reader</p>
//                         </div>
//                       ) : (
//                         <div className="text-center p-16">
//                           <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white text-4xl">
//                             📄
//                           </div>
//                           <h3 className="text-2xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
//                           <p className="text-slate-600 mb-8 max-w-md mx-auto">Document preview not available. Download to view full content.</p>
//                         </div>
//                       )}
//                       <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-slate-200">
//                         <button
//                           onClick={handleDownloadResume}
//                           className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto sm:mx-0"
//                         >
//                           <Download className="w-5 h-5" />
//                           Download File
//                         </button>
//                         <button
//                           onClick={() => setShowResumeModal(false)}
//                           className="px-8 py-4 border-2 border-slate-200 hover:border-slate-400 bg-white/70 backdrop-blur-sm rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-xl transition-all flex items-center justify-center gap-2"
//                         >
//                           Close
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  MapPin,
  Download,
  Trash2,
  Plus,
  ArrowRight,
  X,
  FileText,
  Image,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("PK"); 
  const [phoneNumber, setPhoneNumber] = useState("");


  const countries = [
    { code: "PK", name: "Pakistan", dial: "+92" },
    { code: "US", name: "United States", dial: "+1" },
    { code: "UK", name: "United Kingdom", dial: "+44" },
    { code: "SA", name: "Saudi Arabia", dial: "+966" },
    { code: "AE", name: "UAE", dial: "+971" },
    { code: "CA", name: "Canada", dial: "+1" },
    { code: "IN", name: "India", dial: "+91" },
  ];


const isValidPhone = (number) => /^\d{10,15}$/.test(number);

  
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skillsText, setSkillsText] = useState("");
  const [accounts, setAccounts] = useState([]);

  const [resumeMeta, setResumeMeta] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

    // Resume Auto-fill
  const [resumeSuggestions, setResumeSuggestions] = useState(null);
  const [showAutofillModal, setShowAutofillModal] = useState(false);
  

  const getFileType = (mimeType) => {
    if (!mimeType) return "document";
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType === "application/pdf") return "pdf";
    return "document";
  };

  // LOAD PROFILE
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) {
      router.push("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`);
        if (!res.ok) return;
        const data = await res.json();

        setAbout(data.about || "");
        
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
          if (data.phone) {
            const phoneMatch = data.phone.match(/^\+(\d{1,4})\s?(.+)$/);
            if (phoneMatch) {
              const [, countryCode, number] = phoneMatch;
              const country = countries.find(c => c.dial === `+${countryCode}`);
              if (country) {
                setSelectedCountry(country.code);
                setPhoneNumber(number.trim());
              } else {
                setPhoneNumber(data.phone.replace(/\D/g, ""));
              }
            } else {
              setPhoneNumber(data.phone.replace(/\D/g, ""));
            }
          } else {
            setSelectedCountry("PK");
            setPhoneNumber("");
          }
        
        setEducation(data.education || []);
        setExperience(data.experience || []);
        setSkillsText((data.skills || []).join(", "));
        setAccounts(data.accounts || []);

        if (data.resume?.originalName) {
          setResumeMeta({
            originalName: data.resume.originalName,
            uploadedAt: data.resume.uploadedAt,
            mimeType: data.resume.mimeType,
          });

          try {
            const previewRes = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`);
            if (previewRes.ok) {
              const blob = await previewRes.blob();
              const url = URL.createObjectURL(blob);
              setResumePreviewUrl(url);
            }
          } catch (e) {
            console.error("Preview load error - page.js:801", e);
          }
        }
      } catch (err) {
        console.error("Profile load error - page.js:805", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, router, session?.user?.email]);


const handleSaveProfile = async () => {
  if (!session?.user?.email) return;


  if (phoneNumber && !isValidPhone(phoneNumber)) {
    alert("Phone number must be 10-15 digits long!");
    return;
  }

  try {
    setSaving(true);
    const payload = {
      email: session.user.email,
      firstName,
      lastName,
      
    
      phone: selectedCountry && phoneNumber 
        ? `${countries.find(c => c.code === selectedCountry).dial} ${phoneNumber}`
        : phone || "",
      
      about,
      education,
      experience,
      skills: skillsText.split(",").map((s) => s.trim()).filter(Boolean),
      accounts,
    };

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Profile saved successfully!");
      window.location.reload();
    } else {
      alert("Failed to save profile");
    }
  } catch (err) {
    alert("Something went wrong");
  } finally {
    setSaving(false);
  }
};


  // RESUME HANDLERS
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleUploadResume = async () => {
    if (!resumeFile || !session?.user?.email) return;

    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("file", resumeFile);

    try {
      const res = await fetch("/api/profile/resume", { method: "POST", body: formData });
      if (!res.ok) throw new Error();

      const now = new Date();
      setResumeMeta({
        originalName: resumeFile.name,
        uploadedAt: now.toISOString(),
        mimeType: resumeFile.type,
      });
      setResumeFile(null);

      // Refresh preview
      const previewRes = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`);
      if (previewRes.ok) {
        const blob = await previewRes.blob();
        setResumePreviewUrl(URL.createObjectURL(blob));
      }

      alert("Resume uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleDownloadResume = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeMeta?.originalName || "resume";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed");
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm("Permanently delete your resume?")) return;
    try {
      const res = await fetch(`/api/profile/resume?email=${encodeURIComponent(session.user.email)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setResumeMeta(null);
        setResumePreviewUrl(null);
        alert("Resume deleted");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };










const handleAutofillFromResume = async () => {
  try {
    const res = await fetch("/api/profile/resume/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email }),
    });

    const data = await res.json();
    console.log("🔍 FULL API RESPONSE: - page.js:952", data);  

    if (res.ok && data.extracted) {
      setResumeSuggestions(
        Object.fromEntries(
          Object.entries(data.extracted).map(([k, v]) => [k, { value: v, checked: true }])
        )
      );
      setShowAutofillModal(true);
    } else {
      console.error("API ERROR: - page.js:962", data);
      alert(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    alert("Network error: " + err.message);
  }
};



const applyResumeAutofill = () => {
  if (!resumeSuggestions) return;

  Object.entries(resumeSuggestions).forEach(([key, obj]) => {
    if (!obj.checked) return;

    switch (key) {
      case "about":
        setAbout(obj.value);
        break;

      case "skills":
        setSkillsText(Array.isArray(obj.value) ? obj.value.join(", ") : obj.value);
        break;

      case "education":
        setEducation(Array.isArray(obj.value) ? obj.value : []);
        break;

      case "experience":
        setExperience(Array.isArray(obj.value) ? obj.value : []);
        break;

      default:
        break;
    }
  });

  setShowAutofillModal(false);
};










  // Dynamic list helpers (education, experience, accounts)
  const addEducation = () => setEducation([...education, { degree: "", institute: "", yearFrom: "", yearTo: "" }]);
  const updateEducation = (i, field, val) => {
    const newEdu = [...education];
    newEdu[i][field] = val;
    setEducation(newEdu);
  };
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));

  const addExperience = () => setExperience([...experience, { title: "", company: "", years: "" }]);
  const updateExperience = (i, field, val) => {
    const newExp = [...experience];
    newExp[i][field] = val;
    setExperience(newExp);
  };
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));

  const addAccount = () => setAccounts([...accounts, { platform: "", url: "" }]);
  const updateAccount = (i, field, val) => {
    const newAcc = [...accounts];
    newAcc[i][field] = val;
    setAccounts(newAcc);
  };
  const removeAccount = (i) => setAccounts(accounts.filter((_, idx) => idx !== i));

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 border border-white/60">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-slate-700 text-center">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center border border-white/60 max-w-lg">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
            <Users className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Sign In Required</h2>
          <p className="text-lg text-slate-600">Please sign in to manage your professional profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/*  WELCOME SECTION */}
        <div className="text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent mb-6">
            Complete Your Profile
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Add your personal information, resume, experience, and skills to get started with job applications.
          </p>
        </div>



        {/* PERSONAL INFO */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Personal Info
              </h2>
            </div>
          
            <div className="grid md:grid-cols-3 gap-6">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 text-lg font-medium placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
              />
              
              {/*  PHONE INPUT  */}
              <div className="md:col-span-1 relative group">
                <div className="flex rounded-2xl bg-white/60 backdrop-blur-md border-2 border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100/50 shadow-inner hover:shadow-lg transition-all overflow-hidden">
                  
              
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-3 py-5 bg-transparent border-r border-slate-200 text-base font-medium text-slate-700 focus:outline-none appearance-none cursor-pointer min-w-[100px]"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.dial}
                      </option>
                    ))}
                  </select>
                  
                  
                  <input
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(value);
                    }}
                    placeholder="3001234567"
                    maxLength={15}
                    className="flex-1 p-5 text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent px-3"
                  />
                </div>
                
              
                {phoneNumber && !isValidPhone(phoneNumber) && (
                  <p className="mt-1 text-xs text-red-500 text-right -mb-1">
                    10-15 digits required
                  </p>
                )}
              </div>

            </div>
          </section>

          

          {/* RESUME SECTION */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Resume
              </h2>
            </div>

            {resumeMeta ? (
              <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-200/50 rounded-3xl p-6 mb-10 shadow-inner">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-2">Last Updated</p>
                <p className="text-lg font-semibold text-slate-800">
                  {resumeMeta.originalName} • {new Date(resumeMeta.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ) : (
              <div className="border-4 border-dashed border-slate-300/60 rounded-3xl p-16 text-center mb-10 bg-slate-50/40 backdrop-blur-sm hover:border-indigo-400/60 transition-all">
                <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                <p className="text-2xl font-bold text-slate-700 mb-2">No resume uploaded yet</p>
                <p className="text-slate-500 text-lg">Add your resume to complete your profile</p>
              </div>
            )}

            {/* Preview Card */}
            {resumeMeta && (
              <div className="mb-12 flex justify-center">
                <div
                  onClick={() => setShowResumeModal(true)}
                  className="group relative w-64 h-80 bg-gradient-to-br from-slate-100/80 to-indigo-100/60 rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
                    <img src={resumePreviewUrl} alt="Resume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
                    <div className="flex flex-col items-center justify-center h-full p-10">
                      <FileText className="w-24 h-24 text-red-600 mb-6" />
                      <span className="text-slate-700 font-bold text-lg">PDF Document</span>
                      <span className="text-slate-500 text-sm mt-2">Click to enlarge</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-10">
                      <FileText className="w-24 h-24 text-indigo-600 mb-6" />
                      <span className="text-slate-700 font-bold text-lg truncate px-4">{resumeMeta.originalName}</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg text-sm font-medium text-slate-700">
                    {resumeMeta.originalName}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Upload New Resume</label>
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={handleResumeChange}
                    className="flex-1 file:cursor-pointer file:border-0 file:rounded-2xl file:px-6 file:py-4 file:font-bold file:text-white file:bg-gradient-to-r file:from-indigo-600 file:to-sky-600 file:shadow-lg hover:file:from-indigo-700 hover:file:to-sky-700 transition-all"
                  />
                  <button
                    onClick={handleUploadResume}
                    disabled={!resumeFile}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 block">Actions</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleDownloadResume}
                    disabled={!resumeMeta}
                    className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-slate-200 rounded-2xl font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={handleDeleteResume}
                    disabled={!resumeMeta}
                    className="py-4 px-6 bg-white/80 backdrop-blur-md border-2 border-red-200 rounded-2xl font-semibold text-red-700 hover:bg-red-50 hover:border-red-400 hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>

                  <button
                    onClick={handleAutofillFromResume}
                    disabled={!resumeMeta}
                    className="mt-4 w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all"
                  >
                    Auto-fill Profile from Resume
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT ME */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">About Me</h2>
            </div>
            <textarea
              rows={7}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Share your professional story, passions, and career aspirations..."
              className="w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 resize-none text-lg font-medium text-slate-700 placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
            />
          </section>

          {/* SKILLS */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Skills</h2>
            </div>
            <input
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="React, Next.js, TypeScript, Node.js, Tailwind CSS, MongoDB, AWS..."
              className="w-full p-8 rounded-3xl bg-white/60 backdrop-blur-md border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100/50 text-lg font-medium text-slate-700 placeholder-slate-400 transition-all shadow-inner hover:shadow-lg"
            />
          </section>

          {/* EDUCATION */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="bg-gradient-to-r from-slate-50/70 to-blue-50/50 rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} className="p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-lg font-medium" />
                    <input placeholder="Institute / University" value={edu.institute} onChange={(e) => updateEducation(i, "institute", e.target.value)} className="p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-lg font-medium" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <input placeholder="From Year" value={edu.yearFrom} onChange={(e) => updateEducation(i, "yearFrom", e.target.value)} className="p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" />
                    <input placeholder="To Year" value={edu.yearTo} onChange={(e) => updateEducation(i, "yearTo", e.target.value)} className="p-5 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 font-medium" />
                  </div>
                  <button onClick={() => removeEducation(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                    <Trash2 className="w-5 h-5" /> Remove
                  </button>
                </div>
              ))}
              <button onClick={addEducation} className="w-full py-6 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
                <Plus className="w-7 h-7" /> Add Education
              </button>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="bg-gradient-to-r from-slate-50/70 to-emerald-50/50 rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all">
                  <input placeholder="Job Title" value={exp.title} onChange={(e) => updateExperience(i, "title", e.target.value)} className="w-full mb-4 p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg font-medium" />
                  <input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} className="w-full mb-4 p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg font-medium" />
                  <input placeholder="Duration (e.g. 2021 – Present)" value={exp.years} onChange={(e) => updateExperience(i, "years", e.target.value)} className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium" />
                  <button onClick={() => removeExperience(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                    <Trash2 className="w-5 h-5" /> Remove
                  </button>
                </div>
              ))}
              <button onClick={addExperience} className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
                <Plus className="w-7 h-7" /> Add Experience
              </button>
            </div>
          </section>

          {/* SOCIAL ACCOUNTS */}
          <section className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Social Accounts</h2>
            </div>
            <div className="space-y-6">
              {accounts.map((acc, i) => (
                <div key={i} className="bg-gradient-to-r from-slate-50/70 to-purple-50/50 rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all">
                  <input placeholder="Platform (e.g. LinkedIn)" value={acc.platform} onChange={(e) => updateAccount(i, "platform", e.target.value)} className="w-full mb-4 p-5 rounded-2xl bg-white border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-lg font-medium" />
                  <input placeholder="https://linkedin.com/in/..." value={acc.url} onChange={(e) => updateAccount(i, "url", e.target.value)} className="w-full p-5 rounded-2xl bg-white border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-lg font-medium" />
                  <button onClick={() => removeAccount(i)} className="mt-6 w-full py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-2xl font-bold text-red-700 flex items-center justify-center gap-3 transition-all">
                    <Trash2 className="w-5 h-5" /> Remove
                  </button>
                </div>
              ))}
              <button onClick={addAccount} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-4">
                <Plus className="w-7 h-7" /> Add Account
              </button>
            </div>
          </section>

          {/* SAVE BUTTON */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="group relative px-16 py-7 bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 text-white text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl disabled:opacity-60 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                {saving ? "Saving..." : "Save Profile"}
                {!saving && <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />}
              </span>
              {saving && <div className="absolute inset-0 flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div></div>}
            </button>
          </div>
        </div>
      </div>

      {/* RESUME MODAL */}
      {showResumeModal && resumeMeta && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowResumeModal(false)}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/60" onClick={(e) => e.stopPropagation()}>
            <div className="p-12 relative">
              <button onClick={() => setShowResumeModal(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 flex items-center justify-center transition-all">
                <X className="w-6 h-6 text-slate-700" />
              </button>

              {getFileType(resumeMeta.mimeType) === "image" && resumePreviewUrl ? (
                <img src={resumePreviewUrl} alt="Resume" className="max-w-full max-h-[70vh] mx-auto rounded-2xl shadow-2xl" />
              ) : getFileType(resumeMeta.mimeType) === "pdf" ? (
                <div className="text-center py-20">
                  <FileText className="w-32 h-32 text-red-600 mx-auto mb-8" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
                  <p className="text-xl text-slate-600 mb-10">PDF preview not available in browser. Download to view.</p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <FileText className="w-32 h-32 text-indigo-600 mx-auto mb-8" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{resumeMeta.originalName}</h3>
                  <p className="text-xl text-slate-600 mb-10">Preview not available. Download to open.</p>
                </div>
              )}

              <div className="flex justify-center gap-6 mt-10">
                <button onClick={handleDownloadResume} className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-4 transition-all">
                  <Download className="w-6 h-6" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAutofillModal && resumeSuggestions && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">
              We found these details from your resume. Apply?
            </h3>

            <div className="space-y-4 max-h-80 overflow-auto">
              {Object.entries(resumeSuggestions).map(([key, obj]) => (
                <label key={key} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={obj.checked}
                    onChange={(e) =>
                      setResumeSuggestions((prev) => ({
                        ...prev,
                        [key]: { ...prev[key], checked: e.target.checked },
                      }))
                    }
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold capitalize">{key}</p>
                    <p className="text-sm text-slate-600">
                      {Array.isArray(obj.value)
                        ? JSON.stringify(obj.value)
                        : String(obj.value)}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAutofillModal(false)}
                className="px-6 py-3 rounded-xl border font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={applyResumeAutofill}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}