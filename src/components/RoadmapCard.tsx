'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, Award, Bookmark, ArrowRight, Check } from 'lucide-react';
import { fetchApi } from '@/lib/api';

export interface RoadmapCardProps {
  _id: string;
  title: string;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  skills: string[];
  imageUrl: string;
  rating: number;
  ratingCount?: number;
  isSavedInitial?: boolean;
}

export default function RoadmapCard({
  _id,
  title,
  shortDescription,
  difficulty,
  duration,
  category,
  skills = [],
  imageUrl,
  rating,
  ratingCount = 120,
  isSavedInitial = false,
}: RoadmapCardProps) {
  const [saved, setSaved] = useState(isSavedInitial);
  const [saving, setSaving] = useState(false);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaving(true);
    try {
      const res = await fetchApi('/roadmaps/save', {
        method: 'POST',
        body: JSON.stringify({ roadmapId: _id })
      });
      if (res.success) {
        setSaved(res.isSaved);
      } else {
        setSaved(!saved);
      }
    } catch (err) {
      setSaved(!saved);
    } finally {
      setSaving(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Advanced':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden group">
      {/* Image & Badges Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/10 shadow-sm">
            {category}
          </span>
          <button
            onClick={handleToggleSave}
            disabled={saving}
            aria-label="Bookmark Roadmap"
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              saved
                ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-slate-900/60 text-white border-white/20 hover:bg-slate-900/90'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Rating & Difficulty */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{rating ? rating.toFixed(1) : '4.9'}</span>
            <span className="text-slate-400">({ratingCount})</span>
          </div>

          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        {/* Skills Tag Pills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                +{skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Duration & Details Button Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>{duration}</span>
          </div>

          <Link
            href={`/roadmaps/${_id}`}
            className="flex items-center gap-1 font-semibold text-blue-600 dark:text-cyan-400 hover:gap-2 transition-all"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
