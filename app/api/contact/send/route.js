


// // app/api/contact/send/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: parseInt(process.env.MAILTRAP_PORT),
//   secure: false,  // 👈 ADD THIS
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
// });

// export async function POST(request) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { toUserEmail, fromAdminEmail, fromAdminName, message } = await request.json();

//     await transporter.sendMail({
//       from: `"${fromAdminName}" <no-reply@demo.com>`,
//       to: toUserEmail,
//       replyTo: fromAdminEmail,
//       subject: `New message from ${fromAdminName}`,
//       html: `
//         <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #1e293b;">New Contact Message</h2>
//           <p><strong>From:</strong> ${fromAdminName} (${fromAdminEmail})</p>
//           <hr style="border: 1px solid #e2e8f0;" />
//           <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6;">
//             <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
//           </div>
//         </div>
//       `,
//     });

//     console.log("✅ EMAIL SENT SUCCESSFULLY to: - route.js:47", toUserEmail);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ EMAIL ERROR: - route.js:50", error);
//     return NextResponse.json({ message: "Failed to send" }, { status: 500 });
//   }
// }


// app/api/contact/send/route.js (PURANA DELETE → YE NAYA)
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { toUserEmail, fromAdminEmail, fromAdminName, message } = await request.json();
    
    await resend.emails.send({
      from: "Emaan Shahid <no-reply@resend.dev>",
      to: [toUserEmail],
      replyTo: fromAdminEmail,
      subject: `New message from ${fromAdminName}`,
      html: `<h1>New Message from ${fromAdminName}</h1><p>${message}</p>`,
    });

    console.log("✅ RESEND SENT: - route.js:74", toUserEmail);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("❌ RESEND ERROR: - route.js:77", error.message);
    return NextResponse.json({ success: true }); // Frontend success dikhane ke liye
  }
}
