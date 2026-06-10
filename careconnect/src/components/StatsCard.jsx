import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, count, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
    >
      <div className="p-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 flex items-center justify-center">
        {Icon && <Icon className="h-8 w-8" />}
      </div>
      <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">{count}</h3>
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}
