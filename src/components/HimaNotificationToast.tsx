import React, { useEffect, useState } from 'react';
import { Bot, MessageSquare, X, ArrowRight, Bell } from 'lucide-react';

export interface ToastNotificationData {
  id: string;
  preview: string;
  timestamp: Date;
}

interface HimaNotificationToastProps {
  notification: ToastNotificationData | null;
  onOpenAssistant: () => void;
  onDismiss: () => void;
}

export const HimaNotificationToast: React.FC<HimaNotificationToastProps> = ({
  notification,
  onOpenAssistant,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300); // allow fade out
      }, 7500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <aside
      aria-label="New Message Notification"
      className={`fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div 
        id="hima-notification-toast"
        className="bg-white/95 backdrop-blur-md rounded-2xl border border-indigo-200/90 shadow-xl shadow-indigo-900/10 p-4 transition-all hover:border-indigo-300"
      >
        <div className="flex items-start gap-3">
          {/* Avatar Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900">Hima AI</span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  New message
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
              {notification.preview}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100">
              <button
                id="toast-view-response-btn"
                onClick={() => {
                  setIsVisible(false);
                  onOpenAssistant();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all"
              >
                <span>View response</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="toast-dismiss-btn"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onDismiss, 200);
                }}
                className="text-slate-400 hover:text-slate-600 px-2 py-1 text-xs font-medium rounded transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDismiss, 200);
            }}
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
