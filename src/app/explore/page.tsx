'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoadmapCard, { RoadmapCardProps } from '@/components/RoadmapCard';
import SkeletonCard from '@/components/SkeletonCard';
import { fetchApi } from '@/lib/api';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI', 'Data Science', 'Cyber Security'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function ExplorePage() {
  const [roadmaps, setRoadmaps] = useState<RoadmapCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRoadmaps = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        category,
        difficulty,
        sortBy,
        page: page.toString(),
        limit: '9'
      });
      const res = await fetchApi(`/roadmaps?${queryParams.toString()}`);
      if (res.success && res.data) {
        setRoadmaps(res.data);
        if (res.pagination) {
          setTotalPages(res.pagination.pages);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, [category, difficulty, sortBy, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadRoadmaps();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      {/* Page Header */}
      <section className="relative py-12 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore <span className="gradient-text">Learning Roadmaps</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Discover curated, step-by-step career blueprints engineered for modern software development.
          </p>
        </div>
      </section>

      {/* Main Content & Filter Bar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Search & Sorting Controls */}
        <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="w-full md:w-96 relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or tech stack..."
              className="w-full pl-9 pr-20 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 text-xs font-semibold gradient-btn rounded-lg"
            >
              Search
            </button>
          </form>

          {/* Sort By & Refresh */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-600 dark:text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={() => {
                setCategory('All');
                setDifficulty('All');
                setSearch('');
                setSortBy('newest');
                setPage(1);
              }}
              className="flex items-center gap-1 text-xs text-blue-600 dark:text-cyan-400 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-2">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  category === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-2">Difficulty:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  setDifficulty(diff);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  difficulty === diff
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Equal Height Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="glass-card p-12 text-center space-y-4">
            <Filter className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Roadmaps Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any roadmaps matching your current search and filter combination.
            </p>
            <button
              onClick={() => {
                setCategory('All');
                setDifficulty('All');
                setSearch('');
              }}
              className="gradient-btn px-5 py-2 text-xs font-semibold rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmaps.map((rm) => (
              <RoadmapCard key={rm._id} {...rm} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
