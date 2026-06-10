import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Send, Bot, User, RefreshCw } from 'lucide-react';
import { FAQ_DATA, getDefaultResponse } from '../data/faq';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const getGeminiResponse = async (userText) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
          systemInstruction: {
            parts: [{
              text: "You are the CareConnect AI Assistant, a warm, professional, and empathetic chatbot helper for CareConnect, a healthcare NGO. You help patients get support, guide volunteers, and offer reliable medical navigation information. Keep answers concise, clear, and reassuring. If a question is about life-threatening symptoms, strongly advise calling emergency services immediately. If the user asks general questions, answer them in context of a medical NGO assistant."
            }]
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    return null;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return null;
  }
};

const formatMessageText = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  let inList = false;
  const elements = [];
  let currentListItems = [];

  const parseInlineMarkdown = (str) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-blue-600 dark:text-blue-400">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, lineIndex) => {
    const trimmedLine = line.trim();
    const bulletMatch = trimmedLine.match(/^[*•-]\s+(.*)/);
    
    if (bulletMatch) {
      if (!inList) {
        inList = true;
        currentListItems = [];
      }
      currentListItems.push(
        <li key={`li-${lineIndex}`} className="ml-4 list-disc mb-1 pl-1 text-slate-750 dark:text-slate-200">
          {parseInlineMarkdown(bulletMatch[1])}
        </li>
      );
    } else {
      if (inList) {
        elements.push(
          <ul key={`ul-${lineIndex}`} className="my-2 space-y-1">
            {currentListItems}
          </ul>
        );
        inList = false;
        currentListItems = [];
      }
      
      if (trimmedLine === '') {
        elements.push(<div key={`br-${lineIndex}`} className="h-2" />);
      } else {
        elements.push(
          <p key={`p-${lineIndex}`} className="mb-1.5 last:mb-0 text-slate-750 dark:text-slate-200">
            {parseInlineMarkdown(trimmedLine)}
          </p>
        );
      }
    }
  });

  if (inList) {
    elements.push(
      <ul key="ul-final" className="my-2 space-y-1">
        {currentListItems}
      </ul>
    );
  }

  return elements;
};

export default function FAQ() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm your CareConnect AI Assistant. I can help you with questions about our healthcare programs, volunteer onboarding, or operations. What's on your mind today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const autoScroll = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    autoScroll();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // First try Gemini API
      let answer = await getGeminiResponse(text);
      
      // Fallback to local rule-based response if Gemini fails
      if (!answer) {
        answer = getDefaultResponse(text);
      }

      setIsTyping(false);
      const botMessage = {
        id: 'msg_' + Math.random().toString(36).substr(2, 9),
        sender: 'bot',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setIsTyping(false);
      const botMessage = {
        id: 'msg_' + Math.random().toString(36).substr(2, 9),
        sender: 'bot',
        text: getDefaultResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hello! I'm your CareConnect AI Assistant. I can help you with questions about our healthcare programs, volunteer onboarding, or operations. What's on your mind today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-64px)] py-8 transition-colors flex items-center justify-center">
      <main className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 h-[75vh]">
        {/* Left Column: FAQ Suggested Questions */}
        <aside className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-205/60 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <HelpCircle className="h-5 w-5" /> Common Questions
              </h2>
              <div className="space-y-3">
                {FAQ_DATA.map((faq) => (
                  <button
                    key={faq.id}
                    type="button"
                    onClick={() => handleSend(faq.question)}
                    className="w-full text-left p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {faq.question}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Select this question to ask.
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl text-center">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1 uppercase tracking-wider">Need Immediate Support?</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Our emergency NGO support coordination desk is available 24/7 at 1-800-CARE.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Chat Window */}
        <section className="lg:col-span-8 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md overflow-hidden h-full">
          {/* Chat Header */}
          <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center relative shadow-sm">
                <Bot className="h-5 w-5" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">CareConnect AI Assistant</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Online &amp; ready to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages History */}
          <div className="flex-grow p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-955/20 space-y-6 flex flex-col">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isBot ? '' : 'flex-row-reverse self-end ml-auto'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm ${
                    isBot ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-blue-600 text-white'
                  }`}>
                    {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isBot
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800'
                        : 'bg-blue-600 text-white rounded-tr-none'
                    }`}>
                      {formatMessageText(msg.text)}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                      {isBot ? 'Assistant' : 'You'} • {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800 transition-colors">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 text-white p-2.5 rounded-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex justify-between items-center mt-3 px-1 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              <span>Powered by CareConnect AI Assistant</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
