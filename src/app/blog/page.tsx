'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { Search, BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({ category, search });
        const res = await fetchApi(`/blogs?${queryParams.toString()}`);
        if (res.success && res.data) {
          setBlogs(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [category, search]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      {/* Page Hero */}
      <section className="relative py-12 bg-slate-900 text-white text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            SkillForge Articles
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Latest Tech & AI <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Stay updated with modern web development standards, Gemini AI techniques, and interview preparation strategies.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Article Reader Modal if selected */}
        {selectedBlog ? (
          <div className="glass-card p-6 md:p-10 space-y-6 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
            >
              ← Back to All Articles
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                {selectedBlog.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">{selectedBlog.title}</h1>
              
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <img src={selectedBlog.authorAvatar} alt={selectedBlog.author} className="w-7 h-7 rounded-full object-cover" />
                <span>{selectedBlog.author}</span>
                <span>•</span>
                <span>{selectedBlog.readTime}</span>
              </div>
            </div>

            <img
              src={selectedBlog.imageUrl}
              alt={selectedBlog.title}
              className="w-full h-80 object-cover rounded-2xl"
            />

            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {selectedBlog.content}
            </div>
          </div>
        ) : (
          <>
            {/* Search & Category Filter */}
            <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'AI & Tech', 'Career Advice', 'Web Development'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 ${
                      category === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400 animate-pulse">Loading articles...</div>
            ) : blogs.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">No articles found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <div key={blog._id} className="glass-card flex flex-col h-full overflow-hidden group">
                    <div className="h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400">
                          {blog.category}
                        </span>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={blog.authorAvatar} alt={blog.author} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-[11px] text-slate-500">{blog.author}</span>
                        </div>
                        <button
                          onClick={() => setSelectedBlog(blog)}
                          className="font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:gap-1.5 transition-all"
                        >
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
