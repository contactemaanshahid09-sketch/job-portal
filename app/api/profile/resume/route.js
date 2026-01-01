// import connectDB from "@/lib/mongoose";
// import User from "@/models/User";

// export async function POST(req) {
//   await connectDB();

//   const formData = await req.formData();
//   const email = formData.get("email");
//   const file = formData.get("file"); // Blob

//   if (!email || !file) {
//     return Response.json({ message: "Missing email or file" }, { status: 400 });
//   }

//   // const arrayBuffer = await file.arrayBuffer();
//   // const buffer = Buffer.from(arrayBuffer);

//   // const update = {
//   //   resume: {
//   //     data: buffer,
//   //     mimeType: file.type,
//   //     originalName: file.name,
//   //     uploadedAt: new Date(),
//   //   },
//   // };
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const update = {
//     resume: {
//       data: buffer,
//       mimeType: file.type || 'application/octet-stream',
//       originalName: file.name,
//       uploadedAt: new Date(),
//     },
//   };

//   await User.updateOne({ email }, update);

//   return Response.json({ message: "Resume uploaded" }, { status: 200 });
// }

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");
//   if (!email) {
//     return new Response("Missing email", { status: 400 });
//   }

//   const user = await User.findOne({ email });
//   if (!user?.resume?.data) {
//     return new Response("No resume", { status: 404 });
//   }

//   const headers = {
//     'Content-Type': user.resume.mimeType || 'application/octet-stream',
//     'Content-Disposition': `attachment; filename="${user.resume.originalName}"`,
//     'Content-Length': user.resume.data.length.toString(),
//     'Cache-Control': 'no-cache',
//   };

//   return new Response(user.resume.data, {
//     status: 200,
//     headers,
//   });
// }



// export async function DELETE(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get("email");
//   if (!email) {
//     return Response.json({ message: "Missing email" }, { status: 400 });
//   }

//   await User.updateOne(
//     { email },
//     { $unset: { resume: 1 } }
//   );

//   return Response.json({ message: "Resume deleted" }, { status: 200 });
// }


// app/api/profile/resume/route.js

import connectDB from "@/lib/mongoose";
import User from "@/models/User";

await connectDB();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const file = formData.get("file");

    if (!email || !file || !(file instanceof File)) {
      return Response.json(
        { message: "Missing or invalid email/file" },
        { status: 400 }
      );
    }

    // Optional: Restrict file size (15MB max)
    if (file.size > 15 * 1024 * 1024) {
      return Response.json(
        { message: "File too large (max 15MB)" },
        { status: 400 }
      );
    }

    // Optional: Allow only common resume formats
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { message: "Invalid file type. Please upload PDF, JPG, PNG, DOC, or DOCX." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const update = {
      resume: {
        data: buffer,
        mimeType: file.type,
        originalName: file.name,
        uploadedAt: new Date(),
      },
    };

    await User.updateOne(
      { email },
      { $set: update },
      { upsert: true } // Creates user document if it doesn't exist
    );

    return Response.json(
      { message: "Resume uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resume upload error: - route.js:155", error);
    return Response.json(
      { message: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const mode = searchParams.get("mode");  // 🔥 NEW: preview or download

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    const user = await User.findOne({ email }).select("resume");

    if (!user?.resume?.data) {
      return new Response("No resume found", { status: 404 });
    }

    // const headers = new Headers({
    //   "Content-Type": user.resume.mimeType || "application/octet-stream",
    //   "Content-Disposition": `attachment; filename="${encodeURIComponent(
    //     user.resume.originalName
    //   )}"`,
    //   "Content-Length": user.resume.data.length.toString(),
    //   "Cache-Control": "no-cache",
    // });
    const headers = new Headers({
      "Content-Type": user.resume.mimeType || "application/octet-stream",
      "Content-Length": user.resume.data.length.toString(),
      "Cache-Control": "no-cache",
    });
    // 🔥 FIX: Conditional download header
    if (mode === "download") {
      headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(user.resume.originalName)}"`);
    }
    // Preview: No attachment header = normal file display



    return new Response(user.resume.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Resume fetch error: - route.js:206", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json({ message: "Missing email" }, { status: 400 });
    }

    const result = await User.updateOne(
      { email },
      { $unset: { resume: "" } } // Removes the entire resume field
    );

    if (result.modifiedCount === 0) {
      return Response.json({ message: "No resume to delete" }, { status: 404 });
    }

    return Response.json({ message: "Resume deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Resume delete error: - route.js:231", error);
    return Response.json({ message: "Delete failed" }, { status: 500 });
  }
}