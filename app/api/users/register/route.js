import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  return Response.json({ message: "User registered" });
}
