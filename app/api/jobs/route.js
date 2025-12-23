
// import connectDB from "@/lib/mongoose";
// import Job from "@/models/Job";
// import { NextResponse } from "next/server";

// /* =========================
//    GET → Fetch All Jobs
// ========================= */
// export async function GET() {
//   try {
//     await connectDB();

//     const jobs = await Job.find()
//       .sort({ createdAt: -1 }); // newest first

//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("FETCH JOBS ERROR:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch jobs" },
//       { status: 500 }
//     );
//   }
// }

// /* =========================
//    POST → Create New Job
// ========================= */
// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     // 🔥 CLEAN & NORMALIZE DATA
//     const payload = {
//       title: body.title,
//       company: body.company,
//       location: body.location,
//       salary: body.salary || undefined,
//       description: body.description || undefined,

//       startDate: body.startDate ? new Date(body.startDate) : undefined,
//       endDate: body.endDate ? new Date(body.endDate) : undefined,

//       experience:
//         body.experience !== "" && body.experience !== null
//           ? Number(body.experience)
//           : undefined,

//       status: ["Open", "Closed", "Draft"].includes(body.status)
//         ? body.status
//         : "Open",

//       type: ["Remote", "Hybrid", "Onsite"].includes(body.type)
//         ? body.type
//         : "Remote",
//     };

//     console.log("JOB PAYLOAD 👉", payload);

//     const job = await Job.create(payload);

//     return NextResponse.json(job, { status: 201 });
//   } catch (error) {
//     console.error("CREATE JOB ERROR:", error);
//     return NextResponse.json(
//       { message: error.message || "Failed to create job" },
//       { status: 500 }
//     );
//   }
// }



import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

/* =========================
   GET → Fetch All Jobs
========================= */
export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find().sort({ createdAt: -1 }); // newest first

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("FETCH JOBS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

/* =========================
   POST → Create New Job
========================= */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🔥 FINAL PAYLOAD (MATCHES FRONTEND PERFECTLY)
    const payload = {
      title: body.title,
      company: body.company,
      location: body.location,

      salary: body.salary || null,
      description: body.description || null,

      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,

      experience:
        body.experience !== "" && body.experience !== null
          ? Number(body.experience)
          : null,

      status: ["Open", "Closed", "Draft"].includes(body.status)
        ? body.status
        : "Open",

      type: ["Remote", "Hybrid", "Onsite"].includes(body.type)
        ? body.type
        : "Remote",

      skills: Array.isArray(body.skills) ? body.skills : [],   // ✅ FIXED
      featured: Boolean(body.featured),                        // ✅ FIXED
    };

    console.log("FINAL JOB PAYLOAD 👉", payload);

    const job = await Job.create(payload);

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create job" },
      { status: 500 }
    );
  }
}
