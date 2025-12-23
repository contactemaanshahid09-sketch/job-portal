import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return Response.json({ message: "Missing email" }, { status: 400 });
  }

  const user = await User.findOne(
    { email },
    "-password -resume.data" // password + raw buffer hide
  );

  return Response.json(user || null, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return Response.json({ message: "Missing email" }, { status: 400 });
  }

  const update = {
    about: body.about,
    education: body.education || [],
    experience: body.experience || [],
    skills: body.skills || [],
    accounts: body.accounts || [],
  };

  const user = await User.findOneAndUpdate(
    { email },
    update,
    { new: true }
  ).select("-password -resume.data");

  return Response.json(user, { status: 200 });
}
