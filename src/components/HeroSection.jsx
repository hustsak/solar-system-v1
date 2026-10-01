import React from 'react';
import { Compass, BookOpen, ChevronRight, MousePointerClick, X } from 'lucide-react';

export default function HeroSection({
  t,
  onStartExploring,
  onOpenUniverse,
  onDismiss
}) {
  return (
    <div className="absolute top-20 sm:top-24 left-4 sm:left-8 max-w-md sm:max-w-lg z-20 pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto bg-[#0a0f24]/75 backdrop-blur-xl border border-white/15 p-5 sm:p-6 rounded-2xl shadow-2xl shadow-black/80 relative overflow-hidden group">
        {/* Subtle accent glow */}
        <div className="absolute -top-24 -left-24 w-40 h-40 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row with Badge & Dismiss Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 text-sky-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>{t.hero.badge}</span>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 drop-shadow-md">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-5 drop-shadow-sm">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="hero-primary-btn"
            onClick={onStartExploring}
            className="px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 border border-sky-300/30 hover:shadow-sky-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>{t.hero.primaryBtn}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-75" />
          </button>

          <button
            id="hero-secondary-btn"
            onClick={onOpenUniverse}
            className="px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/20 hover:border-sky-400/40 backdrop-blur-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>{t.hero.secondaryBtn}</span>
          </button>
        </div>

        {/* Interactive Controls Hint */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
          <MousePointerClick className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>{t.hero.instructions}</span>
        </div>
      </div>
    </div>
  );
}
