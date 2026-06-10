import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  HeartHandshake,
  AlertTriangle,
  Clock,
  Search,
  RefreshCw
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getPatients, getVolunteers } from '../utils/localStorage';
import { generateSummary } from '../utils/summaryGenerator';
import SummaryCard from '../components/SummaryCard';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    const pData = getPatients();
    const vData = getVolunteers();
    setPatients(pData);
    setVolunteers(vData);
    setSummary(generateSummary());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Extract cities from patients list safely
  const uniqueCities = Array.from(
    new Set(patients.map((p) => p.location ? p.location.split(',')[0].trim() : ''))
  ).filter(Boolean);

  // Stats
  const totalPatients = patients.length;
  const totalVolunteers = volunteers.length;
  const highPriority = patients.filter(p => p.urgency === 'high').length;
  const mediumPriority = patients.filter(p => p.urgency === 'medium').length;
  const lowPriority = patients.filter(p => p.urgency === 'low').length;

  // Pie Chart Data
  const pieData = [
    { name: 'High', value: highPriority, color: '#ef4444' }, // Red
    { name: 'Medium', value: mediumPriority, color: '#f59e0b' }, // Amber
    { name: 'Low', value: lowPriority, color: '#10b981' } // Emerald
  ];

  // Bar Chart Data (Group by city)
  const cityCounts = {};
  patients.forEach(p => {
    const city = p.location.split(',')[0].trim();
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });
  const barData = Object.keys(cityCounts).map(city => ({
    city,
    requests: cityCounts[city]
  }));

  // Filtering Logic
  const filteredPatients = patients
    .filter(p => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        p.fullName.toLowerCase().includes(query) ||
        p.healthConcern.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query);

      const matchCity = cityFilter === '' || p.location.toLowerCase().includes(cityFilter.toLowerCase());
      const matchUrgency = urgencyFilter === '' || p.urgency.toLowerCase() === urgencyFilter.toLowerCase();

      return matchSearch && matchCity && matchUrgency;
    })
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 transition-colors">
      <main className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Operations Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-semibold">
              NGO CareConnect Administrator Console • System Online
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:border-blue-500 transition-all font-bold text-xs cursor-pointer shadow-sm disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Operations'}
          </button>
        </div>

        {/* Search & Filter bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-grow max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, concern or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 dark:text-white"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* City Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">City</span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-transparent border-none p-0 pr-6 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Urgency Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Urgency</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="bg-transparent border-none p-0 pr-6 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer"
              >
                <option value="">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Sort By</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-none p-0 pr-6 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-0 cursor-pointer"
              >
                <option value="latest">Latest Request</option>
                <option value="oldest">Oldest Request</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats and AI Summary Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Operations Metrics */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Metric 1: Patients */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start">
                <span className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Users className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded">+12%</span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">Total Patients</span>
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{totalPatients}</h3>
              </div>
            </div>

            {/* Metric 2: Volunteers */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start">
                <span className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded">+5%</span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">Volunteers</span>
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{totalVolunteers}</h3>
              </div>
            </div>

            {/* Metric 3: High Priority */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-l-4 border-l-red-500 border-y border-r border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-red-500 transition-all">
              <div className="flex justify-between items-start">
                <span className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">High Priority</span>
                <h3 className="text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">{highPriority}</h3>
              </div>
            </div>

            {/* Metric 4: Pending Tasks */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all">
              <div className="flex justify-between items-start">
                <span className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Clock className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">Medium / Low</span>
                <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-1">{mediumPriority + lowPriority}</h3>
              </div>
            </div>
            
          </div>

          {/* AI Summary Card Column */}
          <div className="lg:col-span-1">
            <SummaryCard summary={summary} onRefresh={handleRefresh} isRefreshing={isRefreshing} />
          </div>
        </div>

        {/* Recharts Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart: Urgency levels */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col items-center">
            <h3 className="text-base font-bold text-slate-800 dark:text-white self-start mb-6">Urgency Levels Breakdown</h3>
            <div className="w-full h-56 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Requests by City */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-6">Patient Requests by City</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="city" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="requests" name="Patient Requests" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Patient Requests Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Recent Patient Requests</h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-0.5 rounded-full">
                  {filteredPatients.length} Shown
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100/50 dark:bg-slate-800/40 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Name</th>
                      <th className="px-5 py-3.5">Concern</th>
                      <th className="px-5 py-3.5">Location</th>
                      <th className="px-5 py-3.5">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((p) => {
                        const isHigh = p.urgency === 'high';
                        const isMedium = p.urgency === 'medium';
                        return (
                          <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="px-5 py-4 font-bold text-slate-800 dark:text-white">{p.fullName}</td>
                            <td className="px-5 py-4 max-w-[200px] truncate" title={p.healthConcern}>
                              {p.healthConcern}
                            </td>
                            <td className="px-5 py-4 font-medium">{p.location}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                isHigh
                                  ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                                  : isMedium
                                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                                  : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                              }`}>
                                {p.urgency}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-5 py-8 text-center text-slate-500 font-semibold">
                          No matching patient requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Recent Volunteers</h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-0.5 rounded-full">
                {volunteers.length} Active
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100/50 dark:bg-slate-850/40 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Volunteer</th>
                    <th className="px-5 py-3.5">Skills</th>
                    <th className="px-5 py-3.5">City</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  {volunteers.length > 0 ? (
                    volunteers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-450 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                            {v.fullName.substr(0, 2)}
                          </div>
                          <span>{v.fullName}</span>
                        </td>
                        <td className="px-5 py-4 font-medium">{v.skills}</td>
                        <td className="px-5 py-4 font-medium">{v.city}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-5 py-8 text-center text-slate-500 font-semibold">
                        No volunteers registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
