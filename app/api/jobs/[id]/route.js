import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path to your auth options

// GET - Fetch a single job by ID
export async function GET(req, context) {
  try {
    // ✅ connect DB
    await connectDB();

    // ✅ unwrap params (IMPORTANT)
    const { id } = await context.params;

    // ✅ validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Job ID" },
        { status: 400 }
      );
    }

    // ✅ find job
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // ✅ success
    return NextResponse.json(job, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT - Update a job by ID (Admin only)
export async function PUT(req, context) {
  try {
    // ✅ check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }



    // ✅ connect DB
    await connectDB();

    // ✅ unwrap params
    const { id } = await context.params;

    // ✅ validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Job ID" },
        { status: 400 }
      );
    }

    // ✅ get request body
    const body = await req.json();

    // ✅ update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // ✅ success
    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job by ID (Admin only)
export async function DELETE(req, context) {
  try {
    // ✅ check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }



    // ✅ connect DB
    await connectDB();

    // ✅ unwrap params
    const { id } = await context.params;

    // ✅ validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Job ID" },
        { status: 400 }
      );
    }

    // ✅ delete job
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    // ✅ success
    return NextResponse.json(
      { message: "Job deleted successfully", job: deletedJob },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}