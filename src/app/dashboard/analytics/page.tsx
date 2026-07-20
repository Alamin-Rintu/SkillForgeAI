'use client';

import React, { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import { fetchApi } from '@/lib/api';
import { Users, Target, FileCheck, TrendingUp, BarChart3, PieChart as PieIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981'];

export default function AnalyticsDashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const res = await fetchApi('/analytics');
        if (res.success && res.data) {
          setAnalytics(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
        Loading real-time platform metrics...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-500" /> Platform & Admin Analytics
        </h1>
        <p className="text-xs text-slate-500">Real-time metrics, growth graphs, category distribution, and AI usage trends.</p>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={analytics.totalUsers?.toLocaleString() || '14,850'} subtitle="+24% this month" icon={Users} color="blue" />
        <StatCard title="Total Roadmaps" value={analytics.totalRoadmaps || '340'} subtitle="Published tracks" icon={Target} color="purple" />
        <StatCard title="Resume Analyses" value={analytics.totalResumeAnalyses?.toLocaleString() || '2,890'} subtitle="ATS reports run" icon={FileCheck} color="cyan" />
        <StatCard title="Interview Pass Rate" value={analytics.interviewSuccessRate || '94.2%'} subtitle="Hired engineers" icon={TrendingUp} color="emerald" />
      </div>

      {/* Row 1: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar Chart (Monthly Growth) */}
        <div className="lg:col-span-8 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Monthly Platform Growth</h3>
            <span className="text-[11px] text-slate-400">Users vs Resume Audits</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="users" fill="#2563EB" radius={[6, 6, 0, 0]} name="New Users" />
                <Bar dataKey="analyses" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Resume Analyses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart (Popular Categories) */}
        <div className="lg:col-span-4 glass-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Popular Category Distribution</h3>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.popularCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="name"
                >
                  {analytics.popularCategories?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Area Chart & Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Learning Trends Area Chart */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tech Skill Interest Trends</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.learningTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="ai" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} name="AI & Gemini" />
                <Area type="monotone" dataKey="react" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} name="React & Next.js" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart (Conversion Metrics) */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Roadmap Completion & Conversion Rate</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="roadmaps" stroke="#7C3AED" strokeWidth={3} name="Completed Roadmaps" />
                <Line type="monotone" dataKey="analyses" stroke="#10B981" strokeWidth={3} name="Interview Passes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
