// "use client";

// import {
//   Target,
//   Eye,
//   Heart,
//   Users,
//   Briefcase,
//   TrendingUp,
//   Award,
//   Globe,
//   Zap,
//   Shield,
//   Star,
//   CheckCircle,
//   Linkedin,
//   Twitter,
//   Mail,
// } from "lucide-react";

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
//           <div className="text-center max-w-4xl mx-auto">
//             <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 text-sm font-semibold border border-white/30">
//               <Heart size={16} />
//               Our Story
//             </div>
            
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
//               Connecting Talent with{" "}
//               <span className="bg-gradient-to-r from-sky-200 to-indigo-200 bg-clip-text text-transparent">
//                 Opportunity
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
//               We're revolutionizing the way people find jobs and companies discover talent. 
//               Our mission is to make career growth accessible to everyone, everywhere.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           <StatCard icon={<Users />} value="50,000+" label="Active Users" />
//           <StatCard icon={<Briefcase />} value="10,000+" label="Jobs Posted" />
//           <StatCard icon={<TrendingUp />} value="95%" label="Success Rate" />
//           <StatCard icon={<Award />} value="500+" label="Companies" />
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
//         <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
//           <MissionVisionCard
//             icon={<Target size={32} />}
//             title="Our Mission"
//             description="To empower individuals to find meaningful careers and help companies build exceptional teams. We believe that the right job can transform lives, and we're committed to making that connection happen."
//             gradient="from-indigo-600 to-purple-600"
//             items={[
//               "Connect talent with opportunity",
//               "Simplify the job search process",
//               "Support career growth and development",
//               "Build inclusive workplaces",
//             ]}
//           />
          
//           <MissionVisionCard
//             icon={<Eye size={32} />}
//             title="Our Vision"
//             description="To become the world's most trusted career platform, where every professional can discover their dream job and every company can find their perfect team member."
//             gradient="from-sky-500 to-indigo-600"
//             items={[
//               "Global reach, local impact",
//               "AI-powered job matching",
//               "Transparent hiring processes",
//               "Continuous innovation",
//             ]}
//           />
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="bg-white/50 backdrop-blur-sm py-16 sm:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
//               Our Core Values
//             </h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//               The principles that guide everything we do
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//             <ValueCard
//               icon={<Shield size={28} />}
//               title="Trust & Integrity"
//               description="We build trust through transparency and honest communication with both job seekers and employers."
//               color="text-blue-600"
//               bgColor="bg-blue-50"
//             />
            
//             <ValueCard
//               icon={<Zap size={28} />}
//               title="Innovation"
//               description="We continuously evolve our platform with cutting-edge technology to deliver the best experience."
//               color="text-yellow-600"
//               bgColor="bg-yellow-50"
//             />
            
//             <ValueCard
//               icon={<Heart size={28} />}
//               title="Empathy"
//               description="We understand the challenges of job searching and hiring, and design with compassion."
//               color="text-red-600"
//               bgColor="bg-red-50"
//             />
            
//             <ValueCard
//               icon={<Users size={28} />}
//               title="Diversity"
//               description="We champion inclusive hiring practices and celebrate diversity in all its forms."
//               color="text-purple-600"
//               bgColor="bg-purple-50"
//             />
            
//             <ValueCard
//               icon={<Star size={28} />}
//               title="Excellence"
//               description="We strive for excellence in every interaction, from search to hire."
//               color="text-indigo-600"
//               bgColor="bg-indigo-50"
//             />
            
//             <ValueCard
//               icon={<Globe size={28} />}
//               title="Global Impact"
//               description="We're committed to making a positive impact on careers worldwide."
//               color="text-green-600"
//               bgColor="bg-green-50"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
//         <div className="text-center mb-12 sm:mb-16">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
//             Meet Our Team
//           </h2>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Passionate individuals dedicated to transforming the job market
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           <TeamMember
//             name="Muzammil Husnain"
//             role="Founder & CEO"
//             image="MH"
//             linkedin="#"
//             twitter="#"
//             email="#"
//           />
//           <TeamMember
//             name="Sarah Johnson"
//             role="Head of Product"
//             image="SJ"
//             linkedin="#"
//             twitter="#"
//             email="#"
//           />
//           <TeamMember
//             name="Michael Chen"
//             role="Head of Engineering"
//             image="MC"
//             linkedin="#"
//             twitter="#"
//             email="#"
//           />
//           <TeamMember
//             name="Emily Rodriguez"
//             role="Head of Operations"
//             image="ER"
//             linkedin="#"
//             twitter="#"
//             email="#"
//           />
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
//         <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 rounded-3xl p-12 sm:p-16 text-white text-center overflow-hidden shadow-2xl">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
//           <div className="relative">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
//               Join Our Journey
//             </h2>
//             <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
//               Whether you're looking for your next opportunity or building your dream team, 
//               we're here to help you succeed.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
//                 Browse Jobs
//               </button>
//               <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
//                 Post a Job
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------- COMPONENTS ---------- */

// function StatCard({ icon, value, label }) {
//   return (
//     <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
//       <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
//       <div className="relative text-center">
//         <div className="flex justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
//           {icon}
//         </div>
//         <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{value}</p>
//         <p className="text-slate-600 text-sm font-medium">{label}</p>
//       </div>
//     </div>
//   );
// }

// function MissionVisionCard({ icon, title, description, gradient, items }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl transition-all duration-300">
//       <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
//         {icon}
//       </div>
//       <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{title}</h3>
//       <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
//       <ul className="space-y-3">
//         {items.map((item, index) => (
//           <li key={index} className="flex items-center gap-3 text-slate-700">
//             <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
//             <span>{item}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ValueCard({ icon, title, description, color, bgColor }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group">
//       <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
//       <p className="text-slate-600 leading-relaxed">{description}</p>
//     </div>
//   );
// }

// function TeamMember({ name, role, image, linkedin, twitter, email }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 group text-center">
//       <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
//         {image}
//       </div>
//       <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
//       <p className="text-slate-600 mb-4">{role}</p>
//       <div className="flex justify-center gap-2">
//         <SocialIcon icon={<Linkedin size={16} />} href={linkedin} />
//         <SocialIcon icon={<Twitter size={16} />} href={twitter} />
//         <SocialIcon icon={<Mail size={16} />} href={email} />
//       </div>
//     </div>
//   );
// }

// function SocialIcon({ icon, href }) {
//   return (
//     <a
//       href={href}
//       className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-500 flex items-center justify-center transition-all duration-300 hover:scale-110 text-slate-600 hover:text-indigo-600"
//     >
//       {icon}
//     </a>
//   );
// }


"use client";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function AboutPage() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/50 to-purple-50/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white py-32 sm:py-40">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Animated background blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-10 rounded-full bg-white/15 backdrop-blur-md px-8 py-4 text-sm font-semibold border border-white/20 shadow-lg">
              <Sparkles className="text-yellow-300" size={20} />
              Building the Future of Work
              <ArrowRight size={16} />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
              Connecting Talent with{" "}
              <span className="block bg-gradient-to-r from-cyan-200 via-white to-pink-200 bg-clip-text text-transparent animate-gradient">
                Extraordinary Opportunity
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-indigo-100 max-w-4xl mx-auto opacity-90">
              We’re redefining professional growth by matching exceptional talent with visionary companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-6 -mt-20 mb-32 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  {stat.icon}
                </div>
                <AnimatedStat end={stat.end} suffix={stat.suffix} inView={isStatsInView} />
                <p className="text-slate-700 font-medium mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-6">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-gradient-to-r from-indigo-50/50 via-transparent to-purple-50/50 rounded-3xl mx-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate experts driving innovation in talent acquisition
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-8">
                <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-5xl font-bold text-indigo-600">
                    {m.initials}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-xl opacity-70" />
              </div>
              <h3 className="text-xl font-bold">{m.name}</h3>
              <p className="text-slate-600 mb-6">{m.role}</p>
              <div className="flex justify-center gap-4">
                <SocialIcon icon={<Linkedin size={20} />} href={m.linkedin} />
                <SocialIcon icon={<Twitter size={20} />} href={m.twitter} />
                <SocialIcon icon={<Mail size={20} />} href={`mailto:${m.email}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gradient Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function AnimatedStat({ end, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <p className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </p>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-xl bg-white/70 backdrop-blur border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-md"
    >
      {icon}
    </a>
  );
}

/* ---------------- DATA ---------------- */
const statsData = [
  { icon: <Users />, end: 75000, suffix: "+", label: "Professionals Connected" },
  { icon: <Briefcase />, end: 15000, suffix: "+", label: "Jobs Posted" },
  { icon: <TrendingUp />, end: 98, suffix: "%", label: "Placement Success" },
  { icon: <Award />, end: 1200, suffix: "+", label: "Partner Companies" },
];

const values = [
  { icon: <Shield size={32} />, title: "Trust & Integrity", description: "We believe in radical transparency, verified profiles, and honest communication at every step." },
  { icon: <Zap size={32} />, title: "Innovation", description: "Leveraging AI and modern tools to create faster, smarter, and more human-centric hiring experiences." },
  { icon: <Heart size={32} />, title: "Empathy First", description: "Every decision puts people at the center — candidates and employers alike." },
  { icon: <Star size={32} />, title: "Excellence", description: "We strive for exceptional outcomes, not just transactions." },
  { icon: <Globe size={32} />, title: "Inclusivity", description: "Building opportunities for talent from all backgrounds and locations." },
  { icon: <Target size={32} />, title: "Precision Matching", description: "Going beyond keywords to connect skills, values, and cultural fit." },
];

const teamMembers = [
  { name: "Muzammil Husnain", role: "Founder & CEO", initials: "MH", linkedin: "#", twitter: "#", email: "#" },
  { name: "Sarah Johnson", role: "Chief Product Officer", initials: "SJ", linkedin: "#", twitter: "#", email: "#" },
  { name: "Michael Chen", role: "Chief Technology Officer", initials: "MC", linkedin: "#", twitter: "#", email: "#" },
  { name: "Emily Rodriguez", role: "Head of People & Culture", initials: "ER", linkedin: "#", twitter: "#", email: "#" },
];