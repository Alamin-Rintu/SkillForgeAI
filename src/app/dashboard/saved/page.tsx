'use client';

import React, { useState, useEffect } from 'react';
import RoadmapCard, { RoadmapCardProps } from '@/components/RoadmapCard';
import SkeletonCard from '@/components/SkeletonCard';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Bookmark } from 'lucide-react';

export default function SavedRoadmapsPage() {
  const { user } = useAuth();
  const [savedRoadmaps, setSavedRoadmaps] = useState<RoadmapCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      setLoading(true);
      try {
        const userId = user?.id || 'demo-user-123';
        const res = await fetchApi(`/roadmaps/saved?userId=${userId}`);
        if (res.success && res.data) {
          setSavedRoadmaps(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, [user]);

  const handleSaveToggle = (isSaved: boolean, id: string) => {
    if (!isSaved) {
      setSavedRoadmaps((prev) => prev.filter((rm) => rm._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-amber-500" /> Saved Resources & Roadmaps
        </h1>
        <p className="text-xs text-slate-500">Bookmarked learning tracks saved to your personal collection.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : savedRoadmaps.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Saved Roadmaps Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any roadmap card across the platform to save it here for quick access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRoadmaps.map((rm) => (
            <RoadmapCard key={rm._id} {...rm} isSavedInitial={true} onSaveToggle={handleSaveToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
