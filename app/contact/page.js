
// app/contact/page.js
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Phone,
  User,
  MessageCircle,
  Send,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
} from "lucide-react";
import Link from "next/link";

export default function ContactUser() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userEmail = searchParams.get("userEmail");

  // Check if user is admin
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !isAdmin) {
      router.push("/profile");
      return;
    }

    if (!userEmail) {
      router.push("/profile");
      return;
    }

    // Fetch user profile info
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profile?email=${encodeURIComponent(userEmail)}`);
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data);
        }
      } catch (err) {
        console.error("Error fetching user profile: - page.js:61", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [status, session, userEmail, router, isAdmin]);

  //  FIXED GMAIL DIRECT (Email Client)
  const handleGmailDirect = () => {
    console.log("🔍 Clicking Gmail Direct button... - page.js:72");
    console.log("User profile: - page.js:73", userProfile);
    console.log("Session: - page.js:74", session?.user);
    
    if (!userProfile?.email) {
      alert(" User email loading... Refresh page!");
      return;
    }
    
    if (!session?.user?.name) {
      alert(" Login issue - refresh!");
      return;
    }

    const subject = `New message from ${session.user.name}`;
    const body = `Hi ${userProfile.name},

${message || 'I came across your profile...'}

Best regards,
${session.user.name}
${session.user.email}`;

    console.log("📧 Opening Email Client to: - page.js:95", userProfile.email);
    const mailtoLink = `mailto:${userProfile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  //  GMAIL WEB
  const handleGmailWeb = () => {
    const subject = encodeURIComponent(`New message from ${session.user.name}`);
    const body = encodeURIComponent(`Hi ${userProfile.name},

    ${message || 'I came across your profile...'}

    Best regards,
    ${session.user.name}
    ${session.user.email}`);
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${userProfile.email}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
      };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-8"></div>
          <p className="text-2xl font-semibold text-slate-700 text-center">Loading contact info...</p>
        </div>
      </div>
    );
  }

  if (!userProfile || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-16 text-center max-w-lg">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-lg text-slate-600 mb-8">You need admin access to contact users.</p>
          <Link 
            href="/profile" 
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profiles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-12 px-4 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href={`/profile?email=${encodeURIComponent(userEmail)}`}
              className="p-2 hover:bg-slate-100 rounded-2xl transition-all flex-shrink-0"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-sky-900 bg-clip-text text-transparent">
                Contact {userProfile.name}
              </h1>
              <p className="text-slate-600 mt-1">Send a message as Admin</p>
            </div>
          </div>

          {/* User Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-slate-700">{userProfile.email}</span>
            </div>
            {userProfile.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span className="font-medium text-slate-700">{userProfile.phone}</span>
              </div>
            )}
            {userProfile.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sky-600" />
                <span className="font-medium text-slate-700">{userProfile.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="w-full max-w-md bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 shadow-xl">
            <button
              onClick={handleGmailWeb}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all text-lg transform hover:scale-[1.02]"
            >
              🌐 Open Gmail Web
            </button>
            <p className="text-center text-blue-800 mt-3 text-sm font-medium">
              Works on mobile/desktop
            </p>
          </div>
        </div>
        
          <div className="mt-8 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              You are contacting as: <strong>{session.user.name}</strong> ({session.user.email})
            </p>
          </div>
      </div>
    </div>
  );
}
