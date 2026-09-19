"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Asim's AI Assistant. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!" }
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "Network error occurred. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[380px] bg-white/60 border border-white/80 shadow-2xl shadow-slate-300/50 rounded-3xl overflow-hidden flex flex-col backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60"
            style={{ height: "500px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/50 flex justify-between items-center text-slate-900">
              <div className="flex items-center gap-2">
                <div className="bg-slate-950 text-white p-1.5 rounded-full shadow-inner shadow-white/20">
                  <Bot className="w-4 h-4" />
                </div>
                <h3 className="font-semibold tracking-tight">AI Assistant</h3>
                <Sparkles className="w-4 h-4 text-cyan-500 ml-1" />
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-slate-200/50 p-1.5 rounded-full transition-colors text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-slate-950 text-white rounded-2xl rounded-tr-sm shadow-slate-900/10"
                        : "bg-white/80 border border-white text-slate-800 rounded-2xl rounded-tl-sm backdrop-blur-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 border border-white p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white/40 border-t border-white/50 flex gap-2 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills..."
                className="flex-1 bg-white/70 border border-white/80 rounded-full px-4 py-2 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all shadow-inner shadow-slate-200/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-slate-950 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-950 text-white p-2.5 rounded-full transition-colors flex items-center justify-center shadow-md shadow-slate-900/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white/70 backdrop-blur-xl border border-white/80 rounded-full shadow-xl shadow-slate-300/50 flex items-center justify-center text-slate-900 transition-all hover:bg-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
