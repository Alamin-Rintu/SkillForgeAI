'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { PlusCircle, Image, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AddRoadmapPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [duration, setDuration] = useState('8 Weeks');
  const [category, setCategory] = useState('Full Stack');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, MongoDB');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetchApi('/roadmaps', {
        method: 'POST',
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          difficulty,
          duration,
          category,
          skills: skills.split(',').map(s => s.trim()),
          imageUrl
        })
      });

      if (res.success) {
        setMessage('Roadmap created successfully!');
        setTimeout(() => {
          router.push('/dashboard/manage-roadmaps');
        }, 1200);
      } else {
        setMessage(res.message || 'Failed to create roadmap.');
      }
    } catch (e) {
      setMessage('Error creating roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-500" /> Add New Learning Roadmap
        </h1>
        <p className="text-xs text-slate-500">Publish a new structured curriculum to the SkillForge AI platform.</p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5 border border-slate-200 dark:border-slate-800">
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Roadmap Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Master Enterprise React 19 Architecture"
            className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Short Summary</label>
          <input
            type="text"
            required
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Concise 1-2 sentence preview description..."
            className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="AI">AI & ML</option>
              <option value="Data Science">Data Science</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Estimated Duration</label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 10 Weeks"
              className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Skills Tags (comma separated)</label>
          <input
            type="text"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Next.js, TypeScript, Tailwind CSS"
            className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Cover Image URL</label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Detailed Description</label>
          <textarea
            required
            rows={5}
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            placeholder="Provide complete breakdown of learning objectives and prerequisites..."
            className="w-full p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? 'Creating Roadmap...' : 'Publish Roadmap'}
        </button>
      </form>
    </div>
  );
}
