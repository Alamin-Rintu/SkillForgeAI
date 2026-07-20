'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, Download, RefreshCw, Upload, ShieldCheck, Zap } from 'lucide-react';

export default function AIResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState(
    `ALEX MORGAN
Full Stack Developer | Email: alex@example.com | GitHub: github.com/alexmorgan

SUMMARY:
Motivated Software Engineer with 2+ years experience building web applications using React, JavaScript, Node.js, and HTML/CSS. Skilled in API design and responsive UI components.

EXPERIENCE:
Software Engineer Intern — TechCorp (2025 - Present)
- Developed responsive web components using React and Tailwind CSS.
- Built RESTful endpoints in Node.js Express for user management.
- Collaborated in agile team sprints to fix UI bugs and improve loading speeds.

SKILLS:
JavaScript, React, Node.js, Express, HTML5, CSS3, Git, REST APIs`
  );
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetchApi('/ai/resume-analyzer', {
        method: 'POST',
        body: JSON.stringify({ resumeText, targetRole })
      });

      if (res.success && res.data) {
        setAnalysis(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) setResumeText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadReport = () => {
    if (!analysis) return;
    const content = `====================================================
SKILLFORGE AI - RESUME ATS ANALYSIS REPORT
Target Role: ${targetRole}
Date: ${new Date().toLocaleDateString()}
====================================================

OVERALL ATS SCORE: ${analysis.score}/100
ATS COMPATIBILITY: ${analysis.atsCompatibility}%

KEY STRENGTHS:
${analysis.strengths?.map((s: string) => `- ${s}`).join('\n')}

AREAS FOR IMPROVEMENT / WEAKNESSES:
${analysis.weaknesses?.map((w: string) => `- ${w}`).join('\n')}

MISSING CRITICAL SKILLS:
${analysis.missingSkills?.map((m: string) => `- ${m}`).join('\n')}

SUGGESTED ACTIONABLE IMPROVEMENTS:
${analysis.suggestedImprovements?.map((imp: string) => `- ${imp}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume_ATS_Analysis_${targetRole.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" /> Feature 2: ATS & Skill Parser Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            AI Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit your resume for Applicant Tracking Systems (ATS), detect missing keywords, score readability, and download improvement reports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Resume Upload / Text Area Column */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 space-y-5 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-500" /> Resume Content
              </h2>

              <label className="text-xs font-semibold text-blue-600 dark:text-cyan-400 cursor-pointer hover:underline flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload File (TXT/PDF)
                <input type="file" accept=".txt,.pdf,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Role Title</label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Full Stack Engineer, Senior Frontend"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Paste Resume Text</label>
                <textarea
                  required
                  rows={12}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-cyan-300" />}
                {loading ? 'Analyzing ATS Compatibility...' : 'Run AI Resume Audit'}
              </button>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {!analysis && !loading && (
              <div className="glass-card p-12 text-center space-y-4">
                <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready for Resume Audit</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click 'Run AI Resume Audit' on the left to evaluate your ATS compatibility score and missing keywords.
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-card p-12 text-center space-y-4 animate-pulse">
                <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-400">Gemini AI is parsing skills, ATS compatibility, and formatting...</p>
              </div>
            )}

            {analysis && (
              <div className="glass-card p-6 md:p-8 space-y-6 border border-cyan-500/30">
                
                {/* Score Gauge Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800">
                  <div className="flex items-center gap-6">
                    {/* Score Circle */}
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-1 shadow-lg shadow-cyan-500/20">
                      <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-white">{analysis.score}</span>
                        <span className="text-[9px] text-slate-400">/ 100</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">ATS Readiness Rating</h3>
                      <p className="text-xs text-cyan-300">
                        {analysis.atsCompatibility}% ATS Compatibility Match
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-cyan-400" /> Download Report
                  </button>
                </div>

                {/* Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Key Strengths
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {analysis.strengths?.map((str: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Areas for Improvement
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {analysis.weaknesses?.map((wk: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{wk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Missing Skills Tags */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Missing Target ATS Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingSkills?.map((ms: string, i: number) => (
                      <span key={i} className="px-3 py-1 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        + {ms}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested Action Improvements */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-purple-400">
                    Recommended Bullet Revisions
                  </h4>
                  <div className="space-y-2">
                    {analysis.suggestedImprovements?.map((imp: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                        {imp}
                      </div>
                    ))}
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
