
// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function UserDashboard() {
//   const { data: session, status } = useSession();
//   const [jobs, setJobs] = useState([]);
//   const router = useRouter();

//   // 🔁 Redirect admin to admin dashboard
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.role === "admin") {
//       router.push("/dashboard/admin"); // change path if needed
//     }
//   }, [session, status, router]);

//   // Fetch jobs
//   const fetchJobs = async () => {
//     const res = await fetch("/api/jobs");
//     const data = await res.json();
//     setJobs(data);
//   };

//   useEffect(() => {
//     if (status === "authenticated") {
//       fetchJobs();
//     }
//   }, [status]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (!session) return <p>Please sign in to see jobs.</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">User Dashboard</h1>
//         <button
//           onClick={() => signOut({ callbackUrl: "/" })}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Welcome */}
//       <div className="bg-white p-4 rounded mb-6 shadow">
//         <h2 className="text-lg font-semibold">
//           Welcome, {session.user.name}
//         </h2>
//         <p className="text-gray-500">
//           Browse available jobs and apply directly.
//         </p>
//       </div>

//       {/* Jobs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {jobs.map((job) => (
//           <JobCard key={job._id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Job Card Component
// function JobCard({ job }) {
//   const { data: session } = useSession();

//   const handleApply = async () => {
//     if (!session) return alert("Please login first");

//     try {
//       const res = await fetch("/api/applications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           jobId: job._id,
//           userId: session.user.id,
//         }),
//       });

//       if (res.ok) {
//         alert(`Successfully applied for ${job.title}`);
//       } else {
//         const data = await res.json();
//         alert(data.message || "Failed to apply");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded p-4">
//       <h3 className="text-xl font-bold">{job.title}</h3>
//       <p className="text-gray-500">{job.company}</p>
//       <p className="text-gray-500">{job.location}</p>
//       {job.salary && <p className="text-gray-500">Salary: {job.salary}</p>}
//       {job.description && <p className="mt-2">{job.description}</p>}
//       <button
//         onClick={handleApply}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Apply
//       </button>
//     </div>
//   );
// }





"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, LogOut, ArrowRight, Clock } from "lucide-react";

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `/api/users/applied-jobs?email=${encodeURIComponent(
            session.user.email
          )}`
        );
        if (!res.ok) {
          setJobs([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setJobs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [status, session?.user?.email]);

  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthenticated" || session?.user?.role !== "user") {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              My Applications
            </h1>
            <p className="text-slate-600 mt-1">
              Jobs you have applied for with this account.
            </p>
          </div>
          
        </div>

        {/* Welcome card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 mb-8">
          <p className="text-lg font-semibold text-slate-800 mb-1">
            Welcome, {session.user.name || session.user.email}
          </p>
          <p className="text-slate-600 text-sm">
            Track all the jobs you have applied to and review details anytime.
          </p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading your applications...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg font-semibold text-slate-800 mb-2">
              No applications yet
            </p>
            <p className="text-slate-600 mb-6">
              Browse jobs and apply to see them listed here.
            </p>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold shadow-md"
            >
              Browse Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <AppliedJobCard key={job._id} job={job} userEmail={session.user.email} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function AppliedJobCard({ job, userEmail }) {
 
  const myApp =
    job.applications?.find((a) => a.userEmail === userEmail) || null;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {job.title}
        </h3>
        <p className="text-slate-600 font-medium">{job.company}</p>
        <p className="text-slate-500 text-sm mb-3">{job.location}</p>
        {job.salary && (
          <p className="text-emerald-600 font-semibold mb-2">
            {job.salary}
          </p>
        )}
        {job.description && (
          <p className="text-sm text-slate-600 line-clamp-3">
            {job.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
        <div className="flex flex-col">
          {myApp && (
            <>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <Clock className="w-4 h-4" />
                Applied on{" "}
                {new Date(myApp.appliedAt).toLocaleDateString()}
              </span>
              <span className="mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                Status: {myApp.status || "pending"}
              </span>
            </>
          )}
        </div>
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:text-indigo-700"
        >
          View job
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
