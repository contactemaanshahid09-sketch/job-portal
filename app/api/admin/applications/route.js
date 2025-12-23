// app/api/admin/applications/route.js

import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Your NextAuth route

await connectDB();

export async function GET(req) {
  const session = await getServerSession(authOptions);

  // Check if user is logged in and is admin
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isAdmin = session.user.role === "admin" || session.user.email === "admin@example.com";
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Find all users who have at least one application
    const usersWithApplications = await User.find({
      "applications.0": { $exists: true },
    })
      .select("name email image applications resume")
      .lean();

    const applications = [];

    usersWithApplications.forEach((user) => {
      (user.applications || []).forEach((app) => {
        applications.push({
          _id: app._id?.toString() || `${user._id}-${app.jobTitle}-${Date.now()}`, // Unique ID
          applicant: {
            name: user.name || "Unknown Applicant",
            email: user.email,
            image: user.image || "/default-avatar.png",
            hasResume: !!user.resume?.data,
          },
          jobTitle: app.jobTitle || "Unnamed Position",
          appliedAt: app.appliedAt || new Date(),
          status: app.status || "pending",
        });
      });
    });

    // Optional: Sort by newest first
    applications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    return Response.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch applications" }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "admin" && session.user.email !== "admin@example.com")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const { applicationId, status } = await req.json();

    if (!applicationId || !status) {
      return new Response(JSON.stringify({ error: "Missing applicationId or status" }), {
        status: 400,
      });
    }

    // Validate status
    const validStatuses = ["pending", "shortlisted", "interview", "rejected", "hired"];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
    }

    // Update the nested application status using positional operator $
    const result = await User.updateOne(
      { "applications._id": applicationId },
      { $set: { "applications.$.status": status } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Application not found" }), { status: 404 });
    }

    return Response.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating application status:", error);
    return new Response(JSON.stringify({ error: "Failed to update status" }), { status: 500 });
  }
}