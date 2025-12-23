// api/admin/users/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User"; // your User model
// import connectDB from "@/lib/db";
import connectDB from "@/lib/mongoose";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const users = await User.find({}).select("name email image role hasResume createdAt").lean();
  return NextResponse.json(users);
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, role } = await req.json();
  if (!["user", "admin"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await connectDB();
  await User.findByIdAndUpdate(userId, { role });
  return NextResponse.json({ success: true });
}