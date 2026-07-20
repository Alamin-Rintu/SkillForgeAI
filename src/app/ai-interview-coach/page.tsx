'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchApi } from '@/lib/api';
import { Sparkles, Bot, Send, User, Code, Terminal, MessageSquare, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const topics = ['Frontend Engineering', 'Backend Systems', 'Full Stack Architecture', 'System Design', 'Behavioral Interview'];

const initialSuggested = [
  "Explain the Virtual DOM and React 19 concurrent features.",
  "How do you optimize initial load times on Next.js web applications?",
  "What is the difference between SQL and MongoDB document schemas?",
  "Tell me about a time you resolved a major bug in production."
];

export default function AIInterviewCoachPage() {
  const [topic, setTopic] = useState('Frontend Engineering');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState(initialSuggested);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I am your SkillForge **AI Interview Coach**. We are currently practicing for **${topic}**. \n\nTo start our mock session, please introduce yourself or click one of the suggested prompts below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetchApi('/ai/interview-coach', {
        method: 'POST',
        body: JSON.stringify({
          message: text,
          topic,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (res.success && res.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
        if (res.suggestedPrompts) {
          setPrompts(res.suggestedPrompts);
        }
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Header Bar */}
        <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">AI Interview Assistant</h1>
              <p className="text-xs text-slate-500">Live mock practice with intelligent evaluation and follow-up prompts</p>
            </div>
          </div>

          {/* Topic Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-400">Interview Topic:</span>
            <select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setMessages([
                  {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `Switched interview domain to **${e.target.value}**. What area of ${e.target.value} would you like to cover first?`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]);
              }}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="glass-card h-[600px] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
          
          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-tr from-purple-600 to-cyan-500 text-white'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>
                  <div
                    className={`text-[10px] text-right ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-xs text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Coach is formulating technical feedback...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pills */}
          {prompts.length > 0 && (
            <div className="px-6 py-2 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Prompts:</span>
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-3 py-1 rounded-full text-[11px] bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 border border-transparent shrink-0 truncate max-w-xs"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your interview response or ask a technical question..."
              className="flex-1 px-4 py-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="gradient-btn px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 disabled:opacity-50"
            >
              Send <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </main>

      <Footer />
    </div>
  );
}
