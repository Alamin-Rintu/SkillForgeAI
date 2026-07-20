'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Layers, Eye, Trash2, Plus } from 'lucide-react';

export default function ManageRoadmapsPage() {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoadmaps = async () => {
    setLoading(true);
    try {
      const creatorId = user?.id || 'demo-user-123';
      const res = await fetchApi(`/roadmaps?creatorId=${creatorId}&limit=20`);
      if (res.success && res.data) {
        setRoadmaps(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return;
    try {
      const res = await fetchApi(`/roadmaps/${id}`, { method: 'DELETE' });
      if (res.success) {
        setRoadmaps(roadmaps.filter(rm => rm._id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-500" /> My Created Roadmaps
          </h1>
          <p className="text-xs text-slate-500">Manage learning roadmaps published by your account.</p>
        </div>

        <Link
          href="/dashboard/add-roadmap"
          className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Roadmap
        </Link>
      </div>

      {/* Table Container */}
      <div className="glass-card overflow-hidden border border-slate-200 dark:border-slate-800">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading your roadmaps...</div>
        ) : roadmaps.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-3">
            <p>You haven't created any custom roadmaps yet.</p>
            <Link
              href="/dashboard/add-roadmap"
              className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white"
            >
              Create Your First Roadmap
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                {roadmaps.map((rm) => (
                  <tr key={rm._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <img
                        src={rm.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'}
                        alt={rm.title}
                        className="w-12 h-10 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                      {rm.title}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500">
                        {rm.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-400">
                        {rm.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(rm.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/roadmaps/${rm._id}`}
                        className="p-1.5 inline-flex text-blue-600 dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(rm._id)}
                        className="p-1.5 inline-flex text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
