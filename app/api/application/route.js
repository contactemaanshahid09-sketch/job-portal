// import connectDB from "@/lib/mongoose";
// import Application from "@/models/Application";

// export async function POST(req) {
//   await connectDB();
//   const { jobId, userId } = await req.json();

//   // Optional: check if user already applied
//   const exists = await Application.findOne({ jobId, userId });
//   if (exists) return Response.json({ message: "Already applied" }, { status: 400 });

//   const application = await Application.create({ jobId, userId });
//   return Response.json(application);
// }



// import connectDB from "@/lib/mongoose";
// import Job from "@/models/Job";
// import User from "@/models/User";

// export async function POST(req) {
//   await connectDB();
//   const { jobId, userEmail } = await req.json();

//   if (!jobId || !userEmail) {
//     return Response.json({ message: "Missing jobId or userEmail" }, { status: 400 });
//   }

//   try {
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return Response.json({ message: "Job not found" }, { status: 404 });
//     }

//     const existingApplication = job.applications.find(
//       app => app.userEmail === userEmail
//     );

//     if (existingApplication) {
//       return Response.json({ 
//         message: "Already applied for this job", 
//         status: existingApplication.status 
//       }, { status: 400 });
//     }

 
//     job.applications.push({
//       userId: (await User.findOne({ email: userEmail }))?._id,
//       userEmail,
//     });

//     await job.save();

//     return Response.json({ 
//       message: "Application submitted successfully!",
//       applicationId: job.applications[job.applications.length - 1]._id
//     });

//   } catch (error) {
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }


import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { jobId, userEmail } = await req.json();

    if (!jobId || !userEmail) {
      return NextResponse.json(
        { message: "Missing jobId or userEmail" },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // 🟢 IMPORTANT FIX: ensure applications array exists
    if (!Array.isArray(job.applications)) {
      job.applications = [];
    }

    // Prevent duplicates
    const existingApplication = job.applications.find(
      (app) => app.userEmail === userEmail
    );

    if (existingApplication) {
      return NextResponse.json(
        { message: "Already applied for this job" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { message: "User not found, complete profile first" },
        { status: 404 }
      );
    }

    // Add new application
    const newApplication = {
      userId: user._id,
      userEmail,
      appliedAt: new Date(),
      status: "pending",
    };

    job.applications.push(newApplication);
    await job.save();

    return NextResponse.json(
      {
        message: "Application submitted successfully!",
        applicationId: newApplication._id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Application API error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
