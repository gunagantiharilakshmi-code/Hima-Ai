import React, { useState, useEffect } from 'react';
import { ActivePage, StudyTask, ExamItem, AssignmentItem, EventItem, ExamPrepStatus, AssignmentStatus } from './types';
import { 
  INITIAL_STUDY_TASKS, 
  INITIAL_EXAMS, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_EVENTS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Assistant } from './pages/Assistant';
import { StudyPlanner } from './pages/StudyPlanner';
import { CollegeInfo } from './pages/CollegeInfo';
import { Exams } from './pages/Exams';
import { Assignments } from './pages/Assignments';
import { Events } from './pages/Events';
import { Resources } from './pages/Resources';
import { About } from './pages/About';
import { HimaNotificationToast, ToastNotificationData } from './components/HimaNotificationToast';
import { Bot, MessageSquare, ArrowRight } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [assistantPrompt, setAssistantPrompt] = useState<string>('');

  // Subtle Notification System State
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [lastBotMessage, setLastBotMessage] = useState<ToastNotificationData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('hima_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('hima_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // When Hima AI sends a new message (either via Botpress event or DOM observer)
  const handleNewBotMessage = (preview: string) => {
    const notification: ToastNotificationData = {
      id: `hima-msg-${Date.now()}`,
      preview,
      timestamp: new Date(),
    };
    setLastBotMessage(notification);

    // If user is currently looking at other pages, increment unread counter
    if (activePage !== 'assistant') {
      setUnreadCount((prev) => prev + 1);
    }
  };

  // When user navigates to Assistant, mark all as read
  useEffect(() => {
    if (activePage === 'assistant') {
      setUnreadCount(0);
    }
  }, [activePage]);

  // Update browser tab title to subtly alert user when a reply arrives while away
  useEffect(() => {
    const baseTitle = 'NRC MEC - College & Study Hub';
    if (unreadCount > 0 && activePage !== 'assistant') {
      document.title = `(${unreadCount}) Hima AI replied • NRC MEC Hub`;
    } else {
      document.title = baseTitle;
    }
  }, [unreadCount, activePage]);

  // 1. Study Tasks State (persisted in localStorage)
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('hima_study_tasks');
      return saved ? JSON.parse(saved) : INITIAL_STUDY_TASKS;
    } catch {
      return INITIAL_STUDY_TASKS;
    }
  });

  // 2. Exams State (persisted in localStorage)
  const [exams, setExams] = useState<ExamItem[]>(() => {
    try {
      const saved = localStorage.getItem('hima_exams');
      return saved ? JSON.parse(saved) : INITIAL_EXAMS;
    } catch {
      return INITIAL_EXAMS;
    }
  });

  // 3. Assignments State (persisted in localStorage)
  const [assignments, setAssignments] = useState<AssignmentItem[]>(() => {
    try {
      const saved = localStorage.getItem('hima_assignments');
      return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
    } catch {
      return INITIAL_ASSIGNMENTS;
    }
  });

  // 4. Events State (persisted in localStorage)
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('hima_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hima_study_tasks', JSON.stringify(studyTasks));
  }, [studyTasks]);

  useEffect(() => {
    localStorage.setItem('hima_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('hima_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('hima_events', JSON.stringify(events));
  }, [events]);

  // Navigation with optional query prompt for Hima AI
  const handleNavigate = (page: ActivePage, prompt?: string) => {
    setActivePage(page);
    if (prompt) {
      setAssistantPrompt(prompt);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAssistantWithPrompt = (prompt: string) => {
    handleNavigate('assistant', prompt);
  };

  // Study Task Handlers
  const handleAddStudyTask = (taskData: Omit<StudyTask, 'id' | 'createdAt'>) => {
    const newTask: StudyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setStudyTasks([newTask, ...studyTasks]);
  };

  const handleToggleStudyTask = (id: string) => {
    setStudyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteStudyTask = (id: string) => {
    setStudyTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompletedStudyTasks = () => {
    setStudyTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Exam Handlers
  const handleUpdateExamStatus = (id: string, status: ExamPrepStatus) => {
    setExams((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, prepStatus: status } : ex))
    );
  };

  const handleAddExam = (examData: Omit<ExamItem, 'id'>) => {
    const newExam: ExamItem = {
      ...examData,
      id: `exam-${Date.now()}`,
    };
    setExams([...exams, newExam]);
  };

  // Assignment Handlers
  const handleAddAssignment = (asgData: Omit<AssignmentItem, 'id'>) => {
    const newAsg: AssignmentItem = {
      ...asgData,
      id: `asg-${Date.now()}`,
    };
    setAssignments([newAsg, ...assignments]);
  };

  const handleUpdateAssignmentStatus = (id: string, status: AssignmentStatus) => {
    setAssignments((prev) =>
      prev.map((asg) => (asg.id === id ? { ...asg, status } : asg))
    );
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((asg) => asg.id !== id));
  };

  // Event Handlers
  const handleAddEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `event-${Date.now()}`,
    };
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar activePage={activePage} onNavigate={(p) => handleNavigate(p)} unreadCount={unreadCount} />

      {/* Floating subtle toast alert for new messages when user is viewing any part of the app */}
      <HimaNotificationToast 
        notification={lastBotMessage}
        onOpenAssistant={() => handleNavigate('assistant')}
        onDismiss={() => setLastBotMessage(null)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            onNavigate={(p) => handleNavigate(p)}
            studyTasks={studyTasks}
            exams={exams}
            assignments={assignments}
          />
        )}

        {/* Persistent Hima AI Assistant: kept mounted in the DOM so the Botpress connection continuously listens for replies while user browses other sections */}
        <div 
          className={activePage === 'assistant' ? 'block' : 'fixed -left-[9999px] top-0 w-[800px] h-[600px] opacity-0 pointer-events-none -z-50'}
          aria-hidden={activePage !== 'assistant'}
        >
          <Assistant
            initialQuery={assistantPrompt}
            onClearInitialQuery={() => setAssistantPrompt('')}
            onNewBotMessage={handleNewBotMessage}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((prev) => !prev)}
            isCurrentPage={activePage === 'assistant'}
          />
        </div>

        {activePage === 'study-planner' && (
          <StudyPlanner
            tasks={studyTasks}
            onAddTask={handleAddStudyTask}
            onToggleComplete={handleToggleStudyTask}
            onDeleteTask={handleDeleteStudyTask}
            onClearCompleted={handleClearCompletedStudyTasks}
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'college-info' && (
          <CollegeInfo
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'exams' && (
          <Exams
            exams={exams}
            onUpdateExamStatus={handleUpdateExamStatus}
            onAddExam={handleAddExam}
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'assignments' && (
          <Assignments
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onUpdateStatus={handleUpdateAssignmentStatus}
            onDeleteAssignment={handleDeleteAssignment}
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'events' && (
          <Events
            events={events}
            onAddEvent={handleAddEvent}
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'resources' && (
          <Resources
            onNavigateToAssistantWithPrompt={handleNavigateToAssistantWithPrompt}
          />
        )}

        {activePage === 'about' && (
          <About onNavigate={(p) => handleNavigate(p)} />
        )}
      </main>

      {/* Floating Quick Action Button and Subtle Reply Bubble when on other pages */}
      {activePage !== 'assistant' && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          {/* Subtle notification popover bubble when a reply is waiting */}
          {unreadCount > 0 && lastBotMessage && (
            <div 
              onClick={() => handleNavigate('assistant')}
              className="mb-3 max-w-xs bg-slate-900/95 backdrop-blur-md text-white text-xs p-3 rounded-2xl shadow-xl border border-indigo-500/40 cursor-pointer animate-fadeIn hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-[11px] text-emerald-300">Hima AI replied</span>
                </div>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <p className="text-slate-300 text-[11px] line-clamp-2 leading-relaxed">
                {lastBotMessage.preview}
              </p>
              <div className="text-[10px] text-indigo-300 font-semibold mt-1.5 inline-flex items-center gap-1 group-hover:underline">
                <span>View response</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}

          <button
            id="floating-ask-hima-btn"
            onClick={() => handleNavigate('assistant')}
            className={`flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all ${
              unreadCount > 0 ? 'ring-2 ring-emerald-400 ring-offset-2' : ''
            }`}
            title="Open Hima AI Assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5" />
              {unreadCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-indigo-600"></span>
                </span>
              ) : (
                <>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-indigo-600 rounded-full" />
                </>
              )}
            </div>
            <span>Ask Hima AI</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-400 text-indigo-950 text-[10px] font-extrabold rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={(p) => handleNavigate(p)} />
    </div>
  );
}
