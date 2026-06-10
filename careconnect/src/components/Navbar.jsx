import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Get Support', path: '/support' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 shadow-sm sticky top-0 z-50 transition-colors">
      <nav className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          <Heart className="h-6 w-6 fill-current text-blue-600 dark:text-blue-400" />
          <span>CareConnect</span>
        </NavLink>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-350 border-transparent hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-105 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-900 transition-colors"
          >
            <div className="flex flex-col px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/45 hover:text-blue-600 dark:hover:text-blue-400'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
