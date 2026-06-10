import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, MapPin, Users, RefreshCw } from 'lucide-react';

export default function SummaryCard({ summary, onRefresh, isRefreshing }) {
  if (!summary) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group border border-blue-500/30"
    >
      {/* Decorative brain icon in background */}
      <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform duration-500 pointer-events-none text-white">
        <Brain className="h-44 w-44" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider">AI Operations Summary</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-blue-100 font-medium">Patient Requests:</span>
            <span className="text-xl font-extrabold">{summary.totalRequests} Requests</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-blue-200 block">Most Common Concern:</span>
            <span className="text-sm font-semibold text-white bg-white/10 px-2 py-0.5 rounded inline-block">
              {summary.mostCommonConcern}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-red-500/20 border border-red-500/30 p-2 rounded-xl text-center">
              <span className="text-[10px] text-red-200 uppercase font-semibold block">High</span>
              <span className="text-base font-bold text-red-100">{summary.highPriority}</span>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-500/30 p-2 rounded-xl text-center">
              <span className="text-[10px] text-yellow-200 uppercase font-semibold block">Medium</span>
              <span className="text-base font-bold text-yellow-100">{summary.mediumPriority}</span>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 p-2 rounded-xl text-center">
              <span className="text-[10px] text-green-200 uppercase font-semibold block">Low</span>
              <span className="text-base font-bold text-green-100">{summary.lowPriority}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs text-blue-100">
            <MapPin className="h-4 w-4 text-blue-200 flex-shrink-0" />
            <span>Latest Request: <strong className="text-white">{summary.latestRequest}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-xs text-blue-100">
            <Users className="h-4 w-4 text-blue-200 flex-shrink-0" />
            <span>Total Volunteers: <strong className="text-white">{summary.totalVolunteers}</strong></span>
          </div>
        </div>

        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="w-full bg-white text-blue-700 py-2.5 px-4 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-md active:scale-95 cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isRefreshing && <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-700" />}
            {isRefreshing ? 'Refreshing...' : 'Refresh AI Analysis'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
