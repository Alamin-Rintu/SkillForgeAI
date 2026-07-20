'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, RefreshCw, MessageSquare, ChevronDown } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const defaultPrompts = [
  "How do I create a personalized roadmap?",
  "What is the best way to prepare for a React 19 interview?",
  "How can I improve my resume's ATS compatibility score?",
  "What skills should I learn for Full Stack Development?"
];

export default function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your **SkillForge AI Assistant**. How can I help you with your career roadmaps, resume ATS review, or technical interview prep today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend?: string) => {
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
          topic: 'General AI Assistant & Career Advice',
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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sticky Floating Icon Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-blue-500/30 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-xl animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Chat with SkillForge AI</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle SkillForge AI Assistant"
          className="relative group p-4 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 text-white shadow-2xl shadow-purple-600/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 opacity-40 group-hover:opacity-80 blur-md transition duration-300" />
          <div className="relative z-10">
            {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-bounce" />}
          </div>
        </button>
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] glass-card bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  SkillForge AI <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Gemini 2.5</span>
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600'
                      : 'bg-gradient-to-tr from-purple-600 to-cyan-500'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-xs text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {defaultPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 shrink-0 truncate max-w-[200px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="gradient-btn p-2.5 rounded-xl text-white disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
