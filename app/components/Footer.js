"use client";

import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  Heart,
  ArrowUp
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">J</span>
              </div>
              <h3 className="text-2xl font-bold">JobPortal</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your gateway to dream careers. Connecting talented professionals with top companies worldwide.
            </p>
            <div className="flex gap-3 pt-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/jobs" text="Browse Jobs" />
              <FooterLink href="/companies" text="Companies" />
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/contact" text="Contact" />
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-lg font-bold mb-6">For Candidates</h4>
            <ul className="space-y-3">
              <FooterLink href="/profile" text="My Profile" />
              <FooterLink href="/applications" text="Applications" />
              <FooterLink href="/saved-jobs" text="Saved Jobs" />
              <FooterLink href="/career-advice" text="Career Advice" />
              <FooterLink href="/resume-builder" text="Resume Builder" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
            <p className="text-slate-300 mb-4 text-sm">
              Subscribe to get latest job alerts and career tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-700 hover:to-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t border-white/10">
          <ContactItem 
            icon={<Phone size={18} />}
            title="Phone"
            value="+1 (555) 123-4567"
          />
          <ContactItem 
            icon={<Mail size={18} />}
            title="Email"
            value="info@jobportal.com"
          />
          <ContactItem 
            icon={<MapPin size={18} />}
            title="Location"
            value="San Francisco, CA"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-300 text-sm text-center sm:text-left">
              © 2025 JobPortal. All rights reserved. Built with{" "}
              by <span className="text-indigo-400 font-semibold">Muzammil Husnain</span>
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-indigo-600 to-sky-500 text-white rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}

/* ---------- COMPONENTS ---------- */

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, text }) {
  return (
    <li>
      <a
        href={href}
        className="text-slate-300 hover:text-white transition-colors inline-flex items-center group"
      >
        <span className="group-hover:translate-x-1 transition-transform">{text}</span>
      </a>
    </li>
  );
}

function ContactItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{title}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}