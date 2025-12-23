// "use client";

// import { useState } from "react";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Send,
//   MessageCircle,
//   Clock,
//   Globe,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   CheckCircle,
//   User,
// } from "lucide-react";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitted(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });

//       // Reset success message after 5 seconds
//       setTimeout(() => setSubmitted(false), 5000);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
//           <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 text-sm font-semibold border border-white/30">
//             <MessageCircle size={16} />
//             We're here to help
//           </div>
          
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
//             Get In Touch
//           </h1>
//           <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
//             Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8">
//               <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
//               <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

//               {submitted && (
//                 <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-center gap-3 animate-slide-in">
//                   <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
//                   <div>
//                     <p className="font-bold text-slate-900">Message Sent Successfully!</p>
//                     <p className="text-sm text-slate-600">We'll get back to you soon.</p>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <InputField
//                     label="Full Name"
//                     name="name"
//                     type="text"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={handleChange}
//                     icon={<User size={18} />}
//                     required
//                   />
//                   <InputField
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     icon={<Mail size={18} />}
//                     required
//                   />
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <InputField
//                     label="Phone Number"
//                     name="phone"
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     icon={<Phone size={18} />}
//                   />
//                   <InputField
//                     label="Subject"
//                     name="subject"
//                     type="text"
//                     placeholder="How can we help?"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     icon={<MessageCircle size={18} />}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     rows="6"
//                     placeholder="Tell us more about your inquiry..."
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white transition-all resize-none"
//                     required
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} className="group-hover:translate-x-1 transition-transform" />
//                       Send Message
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Contact Info Sidebar */}
//           <div className="space-y-6">
//             {/* Contact Cards */}
//             <ContactCard
//               icon={<Phone size={24} />}
//               title="Call Us"
//               content="+1 (555) 123-4567"
//               subtext="Mon-Fri 9am to 6pm"
//               gradient="from-green-500 to-emerald-600"
//             />
            
//             <ContactCard
//               icon={<Mail size={24} />}
//               title="Email Us"
//               content="info@jobportal.com"
//               subtext="We'll respond within 24hrs"
//               gradient="from-blue-500 to-sky-600"
//             />
            
//             <ContactCard
//               icon={<MapPin size={24} />}
//               title="Visit Us"
//               content="123 Business Ave, Suite 100"
//               subtext="San Francisco, CA 94102"
//               gradient="from-purple-500 to-pink-600"
//             />

//             {/* Office Hours */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center">
//                   <Clock size={20} className="text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900">Office Hours</h3>
//               </div>
//               <div className="space-y-2 text-slate-600">
//                 <div className="flex justify-between py-2 border-b border-slate-100">
//                   <span className="font-medium">Monday - Friday</span>
//                   <span className="font-semibold">9:00 AM - 6:00 PM</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-slate-100">
//                   <span className="font-medium">Saturday</span>
//                   <span className="font-semibold">10:00 AM - 4:00 PM</span>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <span className="font-medium">Sunday</span>
//                   <span className="font-semibold text-red-600">Closed</span>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
//               <h3 className="text-xl font-bold text-slate-900 mb-4">Follow Us</h3>
//               <div className="flex gap-3">
//                 <SocialButton icon={<Facebook size={20} />} />
//                 <SocialButton icon={<Twitter size={20} />} />
//                 <SocialButton icon={<Linkedin size={20} />} />
//                 <SocialButton icon={<Instagram size={20} />} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Map Section (Optional) */}
//         <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
//           <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
//             <div className="text-center">
//               <MapPin size={48} className="text-slate-400 mx-auto mb-4" />
//               <p className="text-slate-600 font-medium">Map Integration Placeholder</p>
//               <p className="text-sm text-slate-500">Google Maps or similar can be embedded here</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.4s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ---------- COMPONENTS ---------- */

// function InputField({ label, name, type, placeholder, value, onChange, icon, required }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-slate-700 mb-2">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="relative">
//         {icon && (
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//             {icon}
//           </div>
//         )}
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           required={required}
//           className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white transition-all`}
//         />
//       </div>
//     </div>
//   );
// }

// function ContactCard({ icon, title, content, subtext, gradient }) {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 group">
//       <div className="flex items-start gap-4">
//         <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
//           <div className="text-white">{icon}</div>
//         </div>
//         <div className="flex-1">
//           <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
//           <p className="text-slate-900 font-semibold mb-1">{content}</p>
//           <p className="text-sm text-slate-500">{subtext}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SocialButton({ icon }) {
//   return (
//     <button className="w-12 h-12 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-500 flex items-center justify-center transition-all duration-300 hover:scale-110 text-slate-600 hover:text-indigo-600">
//       {icon}
//     </button>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  User,
  Sparkles,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const nameInputRef = useRef(null);

  // Auto-focus name field on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length > 1000)
      newErrors.message = "Message must be 1000 characters or less";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 2000);
  };

  const copyToClipboard = (text, item) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-indigo-50 border border-indigo-200">
            <Sparkles className="text-indigo-600" />
            <span className="font-semibold">Contact Us</span>
            <Zap className="text-indigo-600" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Let’s{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            We’re here to help you with jobs, hiring, or partnerships.
          </p>
        </motion.div>
      </section>

      {/* SUCCESS TOAST */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-8 py-4 rounded-2xl bg-green-600 text-white shadow-2xl"
        >
          <CheckCircle size={28} />
          <div>
            <p className="font-bold text-lg">Message Sent Successfully!</p>
            <p>We’ll get back to you within a few hours.</p>
          </div>
        </motion.div>
      )}

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-12"
          >
            <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
            <p className="text-slate-600 mb-8">
              Our team usually replies within a few hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  ref={nameInputRef}
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  error={errors.email}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Phone (optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={<Phone size={18} />}
                  error={errors.phone}
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  icon={<MessageCircle size={18} />}
                  error={errors.subject}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Message <span className="text-slate-400">(max 1000 chars)</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-300"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.message && (
                    <p id="message-error" className="text-red-600 text-sm">
                      {errors.message}
                    </p>
                  )}
                  <p
                    className={`text-sm ml-auto ${
                      formData.message.length > 1000
                        ? "text-red-600"
                        : "text-slate-500"
                    }`}
                  >
                    {formData.message.length}/1000
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <InfoCard
              icon={<Phone />}
              title="Phone"
              text="+1 (555) 123-4567"
              copyText="+15551234567"
              copied={copiedItem === "phone"}
              onCopy={() => copyToClipboard("+15551234567", "phone")}
            />
            <InfoCard
              icon={<Mail />}
              title="Email"
              text="hello@jobportal.com"
              copyText="hello@jobportal.com"
              copied={copiedItem === "email"}
              onCopy={() => copyToClipboard("hello@jobportal.com", "email")}
            />
            <InfoCard
              icon={<MapPin />}
              title="Location"
              text="San Francisco, CA"
            />

            <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock /> Office Hours
              </h3>
              <p className="text-slate-600">Mon–Fri: 9AM – 6PM</p>
              <p className="text-slate-600">Sat: 10AM – 4PM</p>
              <p className="text-red-500 font-semibold">Sunday: Closed</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Social icon={<Facebook />} href="https://facebook.com" />
                <Social icon={<Twitter />} href="https://twitter.com" />
                <Social icon={<Linkedin />} href="https://linkedin.com" />
                <Social icon={<Instagram />} href="https://instagram.com" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
function Input({ label, icon, error, innerRef, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          ref={innerRef}
          {...props}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.name}-error` : undefined}
          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition ${
            error ? "border-red-400 focus:border-red-500" : "border-slate-300"
          }`}
        />
      </div>
      {error && (
        <p id={`${props.name}-error`} className="mt-1 text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoCard({ icon, title, text, copyText, copied, onCopy }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-md p-6 flex gap-4 items-start">
      <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold">{title}</h4>
        <p className="text-slate-600 break-all">{text}</p>
      </div>
      {copyText && (
        <button
          onClick={onCopy}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
          aria-label={`Copy ${title}`}
        >
          {copied ? <Check className="text-green-600" size={20} /> : <Copy size={20} className="text-slate-500" />}
        </button>
      )}
    </div>
  );
}

function Social({ icon, href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center border border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer transition hover:border-indigo-400"
    >
      {icon}
    </a>
  );
}