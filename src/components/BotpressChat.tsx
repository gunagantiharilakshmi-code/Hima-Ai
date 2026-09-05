import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, RefreshCw, AlertCircle, ShieldCheck, Check, Copy, Send, Sparkles, Bell, BellOff, Volume2, User } from 'lucide-react';
import { playNotificationChime } from '../utils/notificationSound';

const INJECT_SCRIPT_ID = 'botpress-inject-script';
const INJECT_SCRIPT_SRC = 'https://cdn.botpress.cloud/webchat/v3.7/inject.js';
const EMBED_CONTAINER_ID = 'hima-botpress-webchat-container';
const BOT_ID = '1edaba0a-8bab-4d38-ac45-3288b393c324';
const CLIENT_ID = 'ecb7156b-e6d9-4a79-a71b-b66fa38d62e4';

interface BotpressChatProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onNewBotMessage?: (preview: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isCurrentPage?: boolean;
}

export const BotpressChat: React.FC<BotpressChatProps> = ({ 
  initialPrompt, 
  onClearInitialPrompt,
  onNewBotMessage,
  soundEnabled = true,
  onToggleSound,
  isCurrentPage = true,
}) => {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'fallback'>('loading');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [canDirectSend, setCanDirectSend] = useState<boolean>(false);
  const [recentReply, setRecentReply] = useState<{ text: string; time: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recentHashesRef = useRef<Set<string>>(new Set());

  const [fallbackMessages, setFallbackMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: "Hi! 👋 I'm Hima AI, your smart college & study assistant for NRC MEC. Ask me about your semester subjects, daily timetable, exam schedules, pending assignments, fee payments, library timings, or campus hackathons!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [fallbackInput, setFallbackInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const fallbackChatEndRef = useRef<HTMLDivElement>(null);

  // Generate responsive academic answers for college queries
  const generateAcademicResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('subject') || q.includes('syllabus') || q.includes('course')) {
      return "Here are your verified CSE Semester 4 subjects & key topics:\n\n1. 📊 **Database Management Systems (DBMS)** - Relational algebra, SQL, Normalization (1NF to BCNF), ACID transactions.\n2. 🌐 **Computer Networks** - TCP/IP & OSI layers, Subnetting, Routing algorithms, Socket programming.\n3. 💻 **Operating Systems** - Process scheduling (Round Robin, SRTF), Semaphores, Deadlocks, Virtual memory paging.\n4. ⚙️ **Theory of Computation** - DFA/NFA, Regular expressions, Context-free grammars, Turing machines.\n5. 🤖 **AI & Machine Learning Foundations** - Supervised/Unsupervised models, Regression, Decision trees, Neural nets.\n6. 🧪 **Full-Stack Development Lab** - Modern React, TypeScript, Node.js REST endpoints, and database queries.";
    }

    if (q.includes('timetable') || q.includes('schedule') || q.includes('class') || q.includes('routine')) {
      return "Here is your standard NRC MEC CSE Semester 4 weekday schedule:\n\n• **09:00 AM - 10:00 AM**: Operating Systems (LH-204)\n• **10:00 AM - 11:00 AM**: Computer Networks (LH-204)\n• **11:00 AM - 11:15 AM**: Morning Tea & Refreshment Break\n• **11:15 AM - 12:15 PM**: Database Management Systems (LH-204)\n• **12:15 PM - 01:15 PM**: Lunch Break (Cafeteria / Student Center)\n• **01:15 PM - 03:15 PM**: Practical Laboratory Session (Full-Stack Lab 3 / Networks Lab 2)\n• **03:15 PM - 04:15 PM**: AI & Machine Learning Foundations\n• **04:15 PM - 04:30 PM**: Faculty Mentorship & Doubts";
    }

    if (q.includes('exam') || q.includes('mid') || q.includes('test') || q.includes('final')) {
      return "Here is the official Examination Schedule for NRC MEC:\n\n📅 **Mid-Term Examinations 1**: October 12 – October 16, 2026\n• Time: 10:00 AM - 12:00 PM\n• Hall tickets released 5 days prior via the student portal\n\n📅 **Mid-Term Examinations 2**: November 23 – November 27, 2026\n\n📅 **End Semester Practical Labs**: November 30 – December 04, 2026\n\n📅 **Semester End Theory Finals**: December 05 – December 18, 2026\n\n💡 *Note: Maintain minimum 75% attendance in each course to avoid condonation!*";
    }

    if (q.includes('assignment') || q.includes('homework') || q.includes('submission') || q.includes('project')) {
      return "Here are your active assignments and submission deadlines:\n\n1. 📝 **DBMS Normalization & Schema Design**: Due October 8, 2026 (Upload PDF to college ERP)\n2. 💻 **OS Round-Robin & Priority CPU Scheduling**: Due October 14, 2026 (Submit code zip / GitHub)\n3. 🌐 **Socket Programming Client-Server Chat in C/Python**: Due October 20, 2026\n4. 🤖 **AI Model Regression Analysis on Dataset**: Due October 28, 2026\n\nYou can track and update task progress directly in the Assignments tab!";
    }

    if (q.includes('library') || q.includes('book') || q.includes('journal')) {
      return "NRC MEC Central Library Details:\n\n• **Operating Hours**: Mon - Sat: 08:30 AM – 08:00 PM | Sun: 10:00 AM – 02:00 PM\n• **Book Lending**: 4 books per student for 14 days, renewable online\n• **Digital Library**: 40 workstations with free access to IEEE Xplore, ACM Digital Library, and NPTEL video archives\n• **Quiet Study Zones**: Located on Floor 2";
    }

    if (q.includes('fee') || q.includes('payment') || q.includes('pay') || q.includes('tuition')) {
      return "NRC MEC Fee Payment Guidelines:\n\n• **Payment Methods**: SBI Collect online, College ERP Student Portal, or Accounts Counter (Admin Block Ground Floor).\n• **Due Date**: October 25, 2026 (without late fee).\n• **Automated E-Receipt**: Generated instantly under your ERP profile upon successful transaction.";
    }

    if (q.includes('event') || q.includes('hackathon') || q.includes('fest') || q.includes('techfest')) {
      return "Upcoming Campus Events & Tech Competitions:\n\n🚀 **MEC TechFest 2026**: November 10-12, 2026 (Hackathons, Robotics, Web3/AI Tracks)\n🏆 **Smart India Hackathon (College Internal Rounds)**: October 22, 2026\n🎤 **IEEE Student Branch Workshop on Agentic AI**: October 18, 2026 (Seminar Hall A)\n\nCheck out the Events tab in this hub for detailed schedules and registration links!";
    }

    if (q.includes('faculty') || q.includes('teacher') || q.includes('professor') || q.includes('hod') || q.includes('contact')) {
      return "Key Department Contacts for NRC MEC:\n\n• **Principal Office**: principal@nrcmec.edu | Intercom: 101\n• **HOD Computer Science**: hod.cse@nrcmec.edu | Room: CS-101\n• **Exam Branch**: exams@nrcmec.edu | Admin Block Ground Floor\n• **Training & Placement Cell**: placements@nrcmec.edu | 1st Floor Admin Block";
    }

    if (q.includes('study') || q.includes('prepare') || q.includes('tip') || q.includes('help')) {
      return "Here is an optimal study formula for your engineering semester:\n\n1. ⏱️ **Pomodoro Blocks**: 45 mins focused study + 10 mins break for dense courses like Theory of Computation & DBMS.\n2. 🔄 **Active Recall**: Solve previous 3 years' question papers for internal and semester exams.\n3. 🎯 **Daily Goals**: Use our built-in Study Planner tab to schedule and check off topics systematically!";
    }

    return `I can help you with that! At NRC MEC, you can ask about course syllabi, daily timetable, upcoming mid-term and semester final exams, active assignments, fee payments, library resources, and campus hackathons. What specific topic would you like to explore regarding "${query}"?`;
  };

  const handleSendFallbackMessage = (textToSend?: string) => {
    const messageText = (textToSend || fallbackInput).trim();
    if (!messageText) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: messageText, time: userTime };

    setFallbackMessages((prev) => [...prev, userMsg]);
    setFallbackInput('');
    setIsTyping(true);

    setTimeout(() => {
      fallbackChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    setTimeout(() => {
      const replyText = generateAcademicResponse(messageText);
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botMsg = { sender: 'bot' as const, text: replyText, time: botTime };

      setFallbackMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      handleBotResponseReceived(replyText);

      setTimeout(() => {
        fallbackChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }, 600);
  };
  const extractMessageText = (payload: any): string => {
    if (!payload) return 'New response from Hima AI';
    if (typeof payload === 'string') return payload;
    if (payload.block?.text) return payload.block.text;
    if (payload.block?.markdown) return payload.block.markdown;
    if (payload.block?.block?.text) return payload.block.block.text;
    if (payload.payload?.text) return payload.payload.text;
    if (payload.payload?.markdown) return payload.payload.markdown;
    if (payload.text) return payload.text;
    if (payload.content) return payload.content;
    return 'New response from Hima AI';
  };

  // Trigger subtle notification when a message arrives from Hima AI
  const handleBotResponseReceived = useCallback((rawSnippet: string) => {
    const cleanSnippet = rawSnippet.trim();
    if (!cleanSnippet) return;

    // Deduplicate within short window to prevent duplicate alerts
    const key = cleanSnippet.slice(0, 45);
    if (recentHashesRef.current.has(key)) return;
    recentHashesRef.current.add(key);
    setTimeout(() => recentHashesRef.current.delete(key), 5000);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecentReply({ text: cleanSnippet, time: timeStr });
    setTimeout(() => setRecentReply(null), 8500);

    if (soundEnabled) {
      playNotificationChime();
    }

    if (onNewBotMessage) {
      onNewBotMessage(cleanSnippet);
    }
  }, [soundEnabled, onNewBotMessage]);

  // When initialPrompt changes, copy it to clipboard and offer quick feedback
  useEffect(() => {
    if (initialPrompt) {
      navigator.clipboard?.writeText(initialPrompt).catch(() => {});
      setCopiedPrompt(initialPrompt);
      if (loadState === 'fallback') {
        handleSendFallbackMessage(initialPrompt);
      }
      const timer = setTimeout(() => {
        setCopiedPrompt(null);
        if (onClearInitialPrompt) onClearInitialPrompt();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt, loadState, onClearInitialPrompt]);

  // Configure Botpress to embed into our designated container
  const applyBotpressConfiguration = useCallback(() => {
    const win = window as any;
    if (!win.botpress) return false;

    try {
      if (typeof win.botpress.config === 'function') {
        win.botpress.config({
          configuration: {
            embeddedChatId: EMBED_CONTAINER_ID,
          },
        });
      }
      if (typeof win.botpress.open === 'function') {
        win.botpress.open();
      }
      if (typeof win.botpress.sendMessage === 'function') {
        setCanDirectSend(true);
      }
      return true;
    } catch (err) {
      console.warn('Botpress configuration sync notice:', err);
      return false;
    }
  }, []);

  // When the user switches to the Assistant page, ensure webchat configuration is refreshed
  useEffect(() => {
    if (isCurrentPage) {
      applyBotpressConfiguration();
      setRecentReply(null);
    }
  }, [isCurrentPage, applyBotpressConfiguration]);

  // Send a message directly to the active Botpress conversation or fallback chat
  const handleSendPromptDirectly = (promptText: string) => {
    const win = window as any;
    if (win.botpress && typeof win.botpress.sendMessage === 'function') {
      try {
        win.botpress.sendMessage(promptText);
        setCopiedPrompt(null);
        if (onClearInitialPrompt) onClearInitialPrompt();
      } catch (err) {
        console.warn('Unable to send message via Botpress sendMessage:', err);
        handleSendFallbackMessage(promptText);
        setCopiedPrompt(null);
        if (onClearInitialPrompt) onClearInitialPrompt();
      }
    } else {
      handleSendFallbackMessage(promptText);
      setCopiedPrompt(null);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  };

  const initBotpressIntegration = useCallback(() => {
    const win = window as any;
    setLoadState('loading');

    // Clean up any existing observer or timeout
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Safeguard timeout: transition to interactive fallback if Botpress takes longer than 5 seconds
    timeoutRef.current = setTimeout(() => {
      const container = document.getElementById(EMBED_CONTAINER_ID);
      if (!container || container.children.length === 0) {
        setLoadState('fallback');
      }
    }, 5000);

    // Watch for children mounted into the container to detect when Webchat is fully rendered
    const setupContainerObserver = () => {
      const container = document.getElementById(EMBED_CONTAINER_ID);
      if (!container) return;

      if (container.children.length > 0) {
        setLoadState('loaded');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return;
      }

      observerRef.current = new MutationObserver(() => {
        const el = document.getElementById(EMBED_CONTAINER_ID);
        if (el && el.children.length > 0) {
          setLoadState('loaded');
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      });

      observerRef.current.observe(container, { childList: true, subtree: true });
    };

    const initializeBot = () => {
      if (!win.botpress) return;

      try {
        if (!win.botpress.initialized && typeof win.botpress.init === 'function') {
          const initRes = win.botpress.init({
            botId: BOT_ID,
            clientId: CLIENT_ID,
            configuration: {
              embeddedChatId: EMBED_CONTAINER_ID,
              website: {},
              email: {},
              phone: {},
              termsOfService: {},
              privacyPolicy: {},
            },
          });
          if (initRes && typeof initRes.catch === 'function') {
            initRes.catch((err: any) => {
              console.warn('Botpress cloud connection notice:', err);
              setLoadState('fallback');
            });
          }
        } else {
          applyBotpressConfiguration();
        }

        setupContainerObserver();

        if (typeof win.botpress.open === 'function') {
          win.botpress.open();
        }
        if (typeof win.botpress.sendMessage === 'function') {
          setCanDirectSend(true);
        }

        // Attach event listener for incoming messages from Botpress
        if (typeof win.botpress.on === 'function' && !win.__himaMessageListenerAttached) {
          win.__himaMessageListenerAttached = true;
          win.botpress.on('message', (msg: any) => {
            const currentUserId = win.botpress?.user?.id || win.botpress?.user?.userId;
            const authorId = msg?.authorId || msg?.userId;
            // If the message is from the bot (authorId differs from current user)
            if (!currentUserId || !authorId || authorId !== currentUserId) {
              const text = extractMessageText(msg);
              handleBotResponseReceived(text);
            }
          });
        }

        // Quick check if already rendered into container
        setTimeout(() => {
          const container = document.getElementById(EMBED_CONTAINER_ID);
          if (container && container.children.length > 0) {
            setLoadState('loaded');
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }
        }, 300);
      } catch (err) {
        console.warn('Botpress initialization transition:', err);
        setLoadState('fallback');
      }
    };

    // If Botpress is already loaded on this page session
    if (win.botpress) {
      initializeBot();
      return;
    }

    // Step 1: Load official Botpress Webchat inject.js
    let injectScript = document.getElementById(INJECT_SCRIPT_ID) as HTMLScriptElement | null;

    if (!injectScript) {
      injectScript = document.createElement('script');
      injectScript.id = INJECT_SCRIPT_ID;
      injectScript.src = INJECT_SCRIPT_SRC;
      injectScript.async = true;
      injectScript.onload = () => {
        initializeBot();
      };
      injectScript.onerror = () => {
        setLoadState('fallback');
      };
      document.body.appendChild(injectScript);
    } else {
      if (win.botpress) {
        initializeBot();
      } else {
        injectScript.addEventListener('load', () => initializeBot(), { once: true });
        injectScript.addEventListener('error', () => setLoadState('fallback'), { once: true });
      }
    }
  }, [applyBotpressConfiguration, handleBotResponseReceived]);

  useEffect(() => {
    initBotpressIntegration();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [initBotpressIntegration]);

  // Secondary DOM observer to reliably catch new bot messages rendered into the DOM
  useEffect(() => {
    const container = document.getElementById(EMBED_CONTAINER_ID);
    if (!container) return;

    const messageObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              const hasMessageClass = 
                el.classList?.contains('bpMessage') ||
                el.querySelector?.('.bpMessage') ||
                el.querySelector?.('[class*="bpMessageBlocksText"]') ||
                el.querySelector?.('[class*="bpMessageBlocksBubble"]');

              if (hasMessageClass) {
                const textContent = el.textContent || '';
                if (
                  textContent &&
                  !textContent.includes('Connecting') &&
                  !textContent.includes('Botpress') &&
                  textContent.length > 3
                ) {
                  handleBotResponseReceived(textContent.slice(0, 100));
                }
              }
            }
          });
        }
      }
    });

    messageObserver.observe(container, { childList: true, subtree: true });
    return () => messageObserver.disconnect();
  }, [handleBotResponseReceived]);

  const handleRetry = () => {
    initBotpressIntegration();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden min-h-[600px] lg:min-h-[680px]">
      {/* Chat Top Banner */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-sm tracking-tight text-white">Hima AI</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                ● Online
              </span>
              <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                Botpress Powered
              </span>
              {recentReply && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full animate-pulse">
                  ● Replied just now
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300">
              Connected to your Botpress Studio Workflow
            </p>
          </div>
        </div>

        {/* Right side controls: Sound alert toggle, test button, embed status */}
        <div className="flex items-center gap-2 text-xs text-slate-300">
          {onToggleSound && (
            <button
              id="assistant-sound-toggle-btn"
              onClick={onToggleSound}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                soundEnabled 
                  ? 'bg-slate-800 text-indigo-300 border-slate-700 hover:bg-slate-750' 
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
              }`}
              title={soundEnabled ? 'Mute subtle notification chime' : 'Enable subtle notification chime'}
            >
              {soundEnabled ? <Bell className="w-3.5 h-3.5 text-indigo-400" /> : <BellOff className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Chime on' : 'Chime off'}</span>
            </button>
          )}

          <button
            id="assistant-test-alert-btn"
            onClick={() => handleBotResponseReceived('Here is an update regarding your college studies and exams!')}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-[11px] text-slate-300 transition-colors"
            title="Preview how subtle notifications sound and look"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Alert</span>
          </button>

          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Webchat Embed
          </span>
        </div>
      </div>

      {/* Subtle notification banner when a new response arrives */}
      {recentReply && (
        <div className="bg-gradient-to-r from-emerald-50 via-indigo-50 to-emerald-50 border-b border-emerald-200 px-4 py-2.5 text-xs text-slate-800 flex items-center justify-between gap-3 animate-fadeIn z-20 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <span className="font-bold text-emerald-900 mr-1.5">Hima AI replied:</span>
              <span className="text-slate-700 font-normal truncate">"{recentReply.text.slice(0, 95)}..."</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-slate-400 hidden sm:inline">{recentReply.time}</span>
            <button
              onClick={() => setRecentReply(null)}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2 py-0.5 rounded transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating alert when prompt is clicked */}
      {copiedPrompt && (
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2.5 text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-2 animate-fadeIn z-20 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              Question copied to clipboard: <strong>"{copiedPrompt}"</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {canDirectSend && (
              <button
                onClick={() => handleSendPromptDirectly(copiedPrompt)}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-xs transition-colors"
                title="Send directly to Botpress chat"
              >
                <Send className="w-3 h-3" />
                <span>Send to Bot</span>
              </button>
            )}
            <button 
              onClick={() => setCopiedPrompt(null)}
              className="text-indigo-600 hover:text-indigo-900 font-semibold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="relative flex-1 w-full h-full flex flex-col bg-slate-50 min-h-[540px]">
        {/* Loading State Overlay */}
        {loadState === 'loading' && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 animate-pulse shadow-sm">
              <Bot className="w-7 h-7 animate-bounce" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg mb-1">Connecting to Hima AI...</h4>
            <p className="text-xs text-slate-500 max-w-sm mb-5 leading-relaxed">
              Initializing your Botpress college & study assistant workflow.
            </p>
            <div className="w-44 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-indigo-600 rounded-full animate-indeterminate"></div>
            </div>
          </div>
        )}

        {/* Interactive Academic Fallback State: Instant, reliable college assistance even if external cloud sync is blocked */}
        {loadState === 'fallback' && (
          <div className="absolute inset-0 bg-slate-50 flex flex-col z-10">
            {/* Status Sub-Banner */}
            <div className="px-4 py-2 bg-indigo-50/80 border-b border-indigo-100/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-indigo-900 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Hima AI Academic Engine Active</span>
                <span className="text-[11px] text-indigo-600/85 hidden sm:inline">• Local College Knowledge</span>
              </div>
              <button
                id="fallback-retry-cloud-btn"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-indigo-100/60 text-indigo-700 text-[11px] font-semibold rounded-lg border border-indigo-200 transition-colors shadow-2xs"
                title="Attempt to reconnect to external Botpress cloud"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry Cloud</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {fallbackMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[78%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`text-[10px] text-slate-400 mt-1 px-1 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={fallbackChatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-white/90 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
              {[
                'Today timetable',
                'Mid-Term exams',
                'Pending assignments',
                'CSE Sem 4 syllabus',
                'Library timings',
                'Fee payment rules',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendFallbackMessage(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-[11px] font-medium whitespace-nowrap transition-colors border border-slate-200/60"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendFallbackMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={fallbackInput}
                onChange={(e) => setFallbackInput(e.target.value)}
                placeholder="Ask Hima AI about subjects, timetable, exams, fees..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!fallbackInput.trim() || isTyping}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* Dedicated Mount Container for Botpress Embedded Webchat */}
        <div
          id={EMBED_CONTAINER_ID}
          ref={containerRef}
          className="w-full h-full flex-1 flex flex-col"
          style={{ minHeight: '540px', height: '100%', width: '100%' }}
        />
      </div>

      {/* Chat Footer Info */}
      <div className="px-5 py-2.5 bg-white border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-slate-700">Hima AI College & Study Assistant</span>
          <span className="text-slate-400">• Official Botpress Studio Integration</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>Subtle Audio & Toast Alerts Active</span>
          <span>•</span>
          <span>Subjects • Timetable • Exams • Assignments</span>
        </div>
      </div>
    </div>
  );
};
