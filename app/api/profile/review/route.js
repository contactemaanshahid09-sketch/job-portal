import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ message: "Missing email" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email }).select(
      'name email about education experience skills accounts resume'
    );

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
