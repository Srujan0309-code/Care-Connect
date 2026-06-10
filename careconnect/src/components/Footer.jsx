import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Globe, Mail, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-extrabold text-blue-600 dark:text-blue-400">
            <Heart className="h-5 w-5 fill-current text-blue-600 dark:text-blue-400" />
            <span>CareConnect</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            © 2026 CareConnect NGO. Providing professional medical reliability and empathetic care. Bridging the gap between volunteers and patients.
          </p>
        </div>

        {/* Center Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Quick Links</h4>
          <div className="flex flex-col space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <NavLink to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</NavLink>
            <NavLink to="/support" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Get Support</NavLink>
            <NavLink to="/volunteer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Become Volunteer</NavLink>
            <NavLink to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI FAQ Assistant</NavLink>
            <NavLink to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Admin Dashboard</NavLink>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Connect & Support</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reach out or stay connected for updates on local campaigns and volunteer schedules.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-slate-950 transition-all cursor-pointer" aria-label="Website">
              <Globe className="h-4 w-4" />
            </a>
            <a href="mailto:info@careconnect.org" className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-slate-950 transition-all cursor-pointer" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-655 dark:text-slate-300 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-slate-950 transition-all cursor-pointer" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
