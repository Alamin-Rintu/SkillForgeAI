'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Calendar, Clock, BookOpen, CheckCircle, RefreshCw, ArrowRight, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIRoadmapGeneratorPage() {
  const { user } = useAuth();
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [targetJob, setTargetJob] = useState('Full Stack Engineer');
  const [availableTime, setAvailableTime] = useState('15 Hours / Week');
  const [languages, setLanguages] = useState('JavaScript, TypeScript, HTML/CSS');
  const [experience, setExperience] = useState('Built basic React apps and simple Express APIs.');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetchApi('/ai/roadmap-generator', {
        method: 'POST',
        body: JSON.stringify({
          currentSkillLevel: skillLevel,
          targetJob,
          availableTime,
          programmingLanguages: languages,
          experience
        })
      });

      if (res.success && res.data) {
        setResult(res.data);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToMyRoadmaps = async () => {
    if (!result) return;
    try {
      const creatorId = user?.id || 'demo-user-123';
      const creatorName = user?.name || 'Developer';
      const res = await fetchApi('/roadmaps', {
        method: 'POST',
        body: JSON.stringify({
          title: result.title,
          shortDescription: result.shortDescription,
          fullDescription: `Personalized AI roadmap generated for target role: ${targetJob}`,
          difficulty: skillLevel,
          duration: result.estimatedCompletionTime,
          category: 'AI Personalized',
          skills: languages.split(',').map(s => s.trim()),
          imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
          creatorId,
          creatorName
        })
      });

      if (res.success && res.data?._id) {
        // Auto-bookmark to user's saved collection as well
        await fetchApi('/roadmaps/save', {
          method: 'POST',
          body: JSON.stringify({ roadmapId: res.data._id, userId: creatorId })
        });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-purple-500/30 text-xs font-bold text-purple-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" /> Feature 1: Gemini AI Roadmap Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            AI Learning Roadmap <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tailor-made multi-week curriculum, weekly schedules, resources, and capstone projects generated for your background.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Form */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-5 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" /> Your Profile Parameters
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Tech Job Role</label>
                <input
                  type="text"
                  required
                  value={targetJob}
                  onChange={(e) => setTargetJob(e.target.value)}
                  placeholder="e.g. Full Stack Developer, AI Engineer"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Skill Level</label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Weekly Time</label>
                  <input
                    type="text"
                    required
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                    placeholder="e.g. 15 Hours / Week"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Languages & Tech Stack</label>
                <input
                  type="text"
                  required
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="JavaScript, TypeScript, Python..."
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Prior Experience</label>
                <textarea
                  rows={3}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Summarize projects or work experience..."
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Analyzing & Generating Plan...' : 'Generate Roadmap'}
              </button>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {!result && !loading && (
              <div className="glass-card p-12 text-center space-y-4">
                <Calendar className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready to Generate Your Schedule</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Fill out your target job and weekly hours on the left to receive a custom AI schedule.
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-card p-12 text-center space-y-4 animate-pulse">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-400">Gemini AI is structuring your personalized schedule...</p>
              </div>
            )}

            {result && (
              <div className="glass-card p-6 md:p-8 space-y-6 border border-blue-500/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-400">
                      {result.estimatedCompletionTime}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{result.title}</h2>
                    <p className="text-xs text-slate-500">{result.shortDescription}</p>
                  </div>

                  <button
                    onClick={handleSaveToMyRoadmaps}
                    disabled={savedSuccess}
                    className="px-4 py-2 rounded-xl text-xs font-bold gradient-btn flex items-center gap-1.5 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {savedSuccess ? 'Saved to Collection!' : 'Save Roadmap'}
                  </button>
                </div>

                {/* Weekly Schedule Timeline */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-purple-400">
                    Weekly Learning Schedule
                  </h3>

                  <div className="space-y-3">
                    {result.weeklySchedule?.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">Week {item.week || idx + 1}: {item.title}</span>
                          <span className="text-[11px] text-slate-500">{item.focus}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {item.topics?.map((topic: string, tIdx: number) => (
                            <li key={tIdx} className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Capstone Projects */}
                {result.recommendedProjects && (
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-cyan-400">
                      Recommended Capstone Projects
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {result.recommendedProjects.map((proj: any, pIdx: number) => (
                        <div key={pIdx} className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2">
                          <h4 className="font-bold text-xs text-cyan-300">{proj.title}</h4>
                          <p className="text-[11px] text-slate-300">{proj.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {proj.techStack?.map((ts: string, tsIdx: number) => (
                              <span key={tsIdx} className="px-2 py-0.5 text-[10px] bg-slate-800 rounded text-slate-400">
                                {ts}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
