// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Briefcase, Sparkles, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react";

// export default function SignIn() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       router.push("/dashboard");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
//         <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
//           <div className="flex flex-col items-center gap-4">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
//             <p className="text-white text-lg font-medium">Loading...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
//         <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
//       </div>

//       <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//           {/* Left Side - Branding & Info */}
//           <div className="hidden lg:block space-y-8">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
//                 <Briefcase size={32} className="text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
//                   JobPortal
//                 </h1>
//                 <p className="text-purple-200">Find Your Dream Career</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h2 className="text-5xl font-bold text-white leading-tight">
//                 Welcome to Your
//                 <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
//                   Professional Future
//                 </span>
//               </h2>
//               <p className="text-xl text-purple-200 leading-relaxed">
//                 Join thousands of professionals who have found their dream jobs through our platform.
//               </p>

//               {/* Features List */}
//               <div className="space-y-4 pt-6">
//                 <Feature icon={<Zap size={20} />} text="Instant access to 10,000+ jobs" />
//                 <Feature icon={<Shield size={20} />} text="Secure and trusted by top companies" />
//                 <Feature icon={<CheckCircle size={20} />} text="Easy one-click application process" />
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Sign In Card */}
//           <div className="w-full max-w-md mx-auto">
//             <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
//               {/* Mobile Logo */}
//               <div className="lg:hidden flex justify-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                     <Briefcase size={24} className="text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
//                       JobPortal
//                     </h1>
//                   </div>
//                 </div>
//               </div>

//               {/* Welcome Text */}
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 mb-4">
//                   <Sparkles size={16} className="text-yellow-300" />
//                   <span className="text-purple-200 text-sm font-medium">Start Your Journey</span>
//                 </div>
//                 <h2 className="text-3xl font-bold text-white mb-2">
//                   Sign In
//                 </h2>
//                 <p className="text-purple-200">
//                   Access your account and discover opportunities
//                 </p>
//               </div>

//               {/* Google Sign In Button */}
//               <button
//                 onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//                 className="w-full group relative overflow-hidden bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                 <svg className="w-6 h-6" viewBox="0 0 24 24">
//                   <path
//                     fill="#4285F4"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="#EA4335"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 <span className="relative z-10">Continue with Google</span>
//                 <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
//               </button>

//               {/* Divider */}
//               <div className="flex items-center gap-4 my-8">
//                 <div className="flex-1 h-px bg-white/10"></div>
//                 <span className="text-purple-300 text-sm">Quick & Secure</span>
//                 <div className="flex-1 h-px bg-white/10"></div>
//               </div>

//               {/* Security Note */}
//               <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
//                 <div className="flex items-center justify-center gap-2 text-purple-200 text-sm">
//                   <Shield size={16} className="text-green-400" />
//                   <span>Your data is secure and encrypted</span>
//                 </div>
//               </div>

//               {/* Terms */}
//               <p className="text-center text-purple-300 text-xs mt-6">
//                 By signing in, you agree to our{" "}
//                 <a href="#" className="text-purple-200 hover:text-white underline">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-purple-200 hover:text-white underline">
//                   Privacy Policy
//                 </a>
//               </p>
//             </div>

//             {/* Bottom Text */}
//             <p className="text-center text-purple-200 mt-6">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
//                 className="text-white font-semibold hover:underline"
//               >
//                 Sign up now
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Feature({ icon, text }) {
//   return (
//     <div className="flex items-center gap-3 group">
//       <div className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
//         {icon}
//       </div>
//       <span className="text-white font-medium">{text}</span>
//     </div>
//   );
// }


"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Briefcase,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="hidden lg:block space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">JobPortal</h1>
                <p className="text-gray-600">Your career starts here</p>
              </div>
            </div>

            <h2 className="text-5xl font-bold text-slate-900 leading-tight">
              Discover your <br />
              <span className="text-indigo-600">next opportunity</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-xl">
              Apply to verified jobs, manage applications, and grow your career
              with a modern hiring platform.
            </p>

            <div className="space-y-4 pt-4">
              <Feature icon={<Zap size={20} />} text="Fast & easy job applications" />
              <Feature icon={<ShieldCheck size={20} />} text="Secure & trusted platform" />
              <Feature icon={<CheckCircle size={20} />} text="Verified companies only" />
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">

              {/* Mobile logo */}
              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center">
                  <Briefcase size={26} className="text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">
                  <Sparkles size={16} />
                  Welcome Back
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Sign in to your account
                </h2>
                <p className="text-gray-600">
                  Continue with Google to access your dashboard
                </p>
              </div>

              {/* GOOGLE BUTTON */}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <GoogleIcon />
                <span className="font-semibold text-slate-800">
                  Continue with Google
                </span>
                <ArrowRight
                  size={18}
                  className="text-slate-500 group-hover:translate-x-1 transition-transform"
                />
              </button>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-gray-500 text-sm">Safe & Secure</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <ShieldCheck size={16} className="text-indigo-600" />
                  Your data is encrypted & protected
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-6">
                By continuing, you agree to our{" "}
                <span className="underline cursor-pointer">Terms</span> &{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            <p className="text-center text-gray-600 mt-6">
              New here?{" "}
              <button
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="font-semibold text-indigo-600 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
