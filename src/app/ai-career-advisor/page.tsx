'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { Sparkles, Compass, Briefcase, GraduationCap, Code, Award, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AICareerAdvisorPage() {
  const [targetJob, setTargetJob] = useState('Full Stack Developer');
  const [skills, setSkills] = useState('React 19, TypeScript, Next.js, Node.js, Express, MongoDB');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetchApi('/ai/career-advisor', {
        method: 'POST',
        body: JSON.stringify({
          targetJob,
          userSkills: skills.split(',').map(s => s.trim())
        })
      });

      if (res.success && res.data) {
        setRecommendation(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-purple-500/30 text-xs font-bold text-purple-600 dark:text-purple-400">
            <Sparkles className="w-3.5 h-3.5" /> Feature 3: Career Path Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            AI Career <span className="gradient-text">Recommendation Engine</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Continuous career evaluation matching your skill matrix with high-salary roles, courses, projects, and certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-4 glass-card p-6 md:p-8 space-y-5 border border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-500" /> Career Profile Inputs
            </h2>

            <form onSubmit={handleRecommend} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Career Goal</label>
                <input
                  type="text"
                  required
                  value={targetJob}
                  onChange={(e) => setTargetJob(e.target.value)}
                  placeholder="e.g. Full Stack Engineer, Solutions Architect"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Current Technical Skills</label>
                <textarea
                  rows={4}
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="List skills separated by commas..."
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? 'Evaluating Market Fit...' : 'Generate Career Match'}
              </button>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {!recommendation && !loading && (
              <div className="glass-card p-12 text-center space-y-4">
                <Briefcase className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Discover Targeted Career Advice</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Submit your skills matrix on the left to receive AI-matched tech jobs and recommended certificates.
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-card p-12 text-center space-y-4 animate-pulse">
                <RefreshCw className="w-10 h-10 text-purple-500 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-400">Gemini AI is matching live industry demand with your skills...</p>
              </div>
            )}

            {recommendation && (
              <div className="space-y-6">
                
                {/* Recommended Jobs */}
                <div className="glass-card p-6 space-y-4 border border-purple-500/30">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" /> Recommended High-Match Job Roles
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendation.recommendedJobs?.map((job: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400">
                            {job.matchScore}% Match
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{job.title}</h4>
                        <p className="text-[11px] text-slate-500">{job.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Projects & Courses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Projects */}
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Code className="w-4 h-4 text-cyan-500" /> High Impact Capstone Projects
                    </h3>
                    <div className="space-y-3">
                      {recommendation.recommendedProjects?.map((proj: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 text-white text-xs space-y-1">
                          <h4 className="font-bold text-cyan-300">{proj.title}</h4>
                          <p className="text-[11px] text-slate-300">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="glass-card p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-500" /> Recommended Certifications
                    </h3>
                    <div className="space-y-3">
                      {recommendation.recommendedCertificates?.map((cert: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                            <p className="text-[11px] text-slate-500">Issued by {cert.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
