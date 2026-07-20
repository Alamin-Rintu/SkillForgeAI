'use client';

import React, { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoadmapCard from '@/components/RoadmapCard';
import { fetchApi } from '@/lib/api';
import {
  Star,
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Bookmark,
  Share2,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

interface TopicResource {
  name: string;
  url: string;
  type?: string;
}

interface Topic {
  title: string;
  description: string;
  duration?: string;
  resources?: TopicResource[];
}

interface ReviewItem {
  _id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface RoadmapDetail {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  skills: string[];
  imageUrl: string;
  rating: number;
  ratingCount: number;
  topics: Topic[];
  prerequisites: string[];
  creatorName?: string;
}

export default function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState<number | null>(0);

  // Review Form
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const res = await fetchApi(`/roadmaps/${id}`);
        if (res.success && res.data) {
          setRoadmap(res.data);
          setReviews(res.reviews || []);
        }

        // Load related roadmaps
        const relRes = await fetchApi(`/roadmaps?limit=3`);
        if (relRes.success && relRes.data) {
          setRelated(relRes.data.filter((item: any) => item._id !== id));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingReview(true);

    const mockReview: ReviewItem = {
      _id: Date.now().toString(),
      userName: 'Current User',
      userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rating: newRating,
      comment: newComment,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setReviews([mockReview, ...reviews]);
      setNewComment('');
      setSubmittingReview(false);
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse space-y-4">
          <div className="h-8 bg-slate-300 dark:bg-slate-800 rounded w-1/3 mx-auto" />
          <div className="h-64 bg-slate-300 dark:bg-slate-800 rounded-3xl w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold">Roadmap Not Found</h2>
          <Link href="/explore" className="gradient-btn px-6 py-2.5 rounded-xl text-xs font-semibold inline-block">
            Back to Explore
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative py-12 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={roadmap.imageUrl} alt={roadmap.title} className="w-full h-full object-cover blur-md" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link href="/explore" className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full font-bold bg-blue-600 text-white">
              {roadmap.category}
            </span>
            <span className="px-3 py-1 rounded-full font-bold bg-purple-600/30 text-purple-300 border border-purple-500/30">
              {roadmap.difficulty}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> {roadmap.duration}
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {roadmap.rating.toFixed(1)} ({roadmap.ratingCount} reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold max-w-4xl">{roadmap.title}</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">{roadmap.shortDescription}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {roadmap.skills?.map((sk, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 flex-1">
        
        {/* Overview & Prerequisites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Overview Left */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" /> Curriculum Overview
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {roadmap.fullDescription}
              </p>
            </div>

            {/* Topics Included Accordion */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Topics Included ({roadmap.topics?.length || 0} Modules)
              </h2>

              <div className="space-y-4">
                {roadmap.topics?.map((topic, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setActiveTopic(activeTopic === idx ? null : idx)}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/40 text-left font-semibold text-slate-900 dark:text-white flex items-center justify-between"
                    >
                      <span className="text-sm">{topic.title}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500">{topic.duration || 'Week ' + (idx + 1)}</span>
                        <ChevronDown className={`w-4 h-4 text-blue-500 transition-transform ${activeTopic === idx ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {activeTopic === idx && (
                      <div className="p-5 space-y-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-600 dark:text-slate-400">{topic.description}</p>
                        {topic.resources && topic.resources.length > 0 && (
                          <div className="pt-2 space-y-2">
                            <p className="text-[11px] font-bold text-slate-400 uppercase">Recommended Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {topic.resources.map((res, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 hover:underline border border-slate-200 dark:border-slate-700"
                                >
                                  {res.name} <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Prerequisites & Summary Card */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4 sticky top-28">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Prerequisites</h3>
              <ul className="space-y-2 text-xs">
                {roadmap.prerequisites?.map((pre, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <Link
                  href="/ai-roadmap-generator"
                  className="w-full py-3 text-center text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
                >
                  Generate Custom Version with AI
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="glass-card p-6 md:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" /> Student Reviews
              </h2>
              <p className="text-xs text-slate-500">Real feedback from learners who completed this path.</p>
            </div>
          </div>

          {/* Leave a review form */}
          <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Leave Your Review</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="p-1 text-amber-400"
                >
                  <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience taking this roadmap..."
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={submittingReview}
              className="px-5 py-2 text-xs font-semibold gradient-btn rounded-xl"
            >
              {submittingReview ? 'Submitting...' : 'Post Review'}
            </button>
          </form>

          {/* Review items */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={rev.userAvatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Roadmaps */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Related Roadmaps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rm) => (
                <RoadmapCard key={rm._id} {...rm} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
