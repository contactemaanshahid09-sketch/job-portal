import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ message: "Missing email" }, { status: 400 });
  }

  try {
    const jobs = await Job.find({
      "applications.userEmail": email,
    }).sort({ createdAt: -1 });

    return Response.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching applied jobs: - route.js:21", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
