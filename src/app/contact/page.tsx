'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <section className="py-12 bg-slate-900 text-white text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold">
          Get in Touch with <span className="gradient-text">SkillForge AI</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Have questions or feedback? Our technical support team is here to assist you.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                    <p className="text-slate-500">support@skillforge.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Call Us</h4>
                    <p className="text-slate-500">+1 (800) 555-SKILL</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Headquarters</h4>
                    <p className="text-slate-500">500 Innovation Way, San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="glass-card p-4 overflow-hidden space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">San Francisco HQ Map</h4>
              <div className="h-44 w-full rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-medium border border-slate-700">
                [ Interactive Map Preview Container ]
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send Us a Message</h2>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Message sent successfully! We will reply within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Enterprise Team Licensing Inquiry"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message details..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold gradient-btn rounded-xl flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
