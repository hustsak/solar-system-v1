import React, { useState } from 'react';
import { Globe, Volume2, VolumeX, Maximize2, Minimize2, Sparkles, BookOpen, Menu, X, Sun } from 'lucide-react';

export default function Navbar({
  lang = 'en',
  onToggleLang,
  t,
  onOpenExhibits,
  onOpenEclipseLab,
  onSelectPlanet,
  onResetView,
  isFullscreen,
  onToggleFullscreen
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

  // Subtle procedural cosmic ambient drone via Web Audio API (zero external assets needed)
  const toggleSound = () => {
    if (!soundActive) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // 108Hz harmonic
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(216, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.015, ctx.currentTime);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setAudioCtx({ ctx, osc1, osc2, gainNode });
        setSoundActive(true);
      } catch (err) {
        console.warn('Audio not supported or blocked', err);
      }
    } else {
      if (audioCtx) {
        try {
          audioCtx.osc1.stop();
          audioCtx.osc2.stop();
          audioCtx.ctx.close();
        } catch (_) {}
      }
      setSoundActive(false);
      setAudioCtx(null);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/75 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={onResetView}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-amber-300 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#080d1e] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-wider text-white flex items-center gap-2 group-hover:text-sky-300 transition-colors">
              {t.common.appName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">
              {t.common.appSubtitle}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={onResetView}
            className="px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => onSelectPlanet('sun')}
            className="px-3 py-1.5 rounded-lg text-sm text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 transition-colors font-medium flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
            {t.nav.sun}
          </button>

          <button
            onClick={onOpenExhibits}
            className="px-3 py-1.5 rounded-lg text-sm text-sky-300 hover:text-white hover:bg-sky-500/10 transition-colors font-medium flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            {t.nav.education}
          </button>

          <button
            onClick={onOpenEclipseLab}
            className="px-3 py-1.5 rounded-lg text-sm text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 transition-all font-semibold flex items-center gap-1.5 shadow-sm shadow-amber-500/10"
          >
            <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.nav.eclipse}</span>
          </button>
        </div>

        {/* Right Controls: Language, Sound, Fullscreen */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Badge */}
          <button
            id="lang-toggle-btn"
            onClick={onToggleLang}
            className="relative px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-sky-400/50 shadow-inner flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            title={lang === 'en' ? 'ប្តូរទៅភាសាខ្មែរ (Switch to Khmer)' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'en' ? '🇰🇭 ខ្មែរ' : '🇬🇧 English'}</span>
          </button>

          {/* Sound Ambiance Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all ${
              soundActive
                ? 'bg-sky-500/20 border-sky-400/60 text-sky-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={t.common.audioToggle}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors hidden sm:flex items-center justify-center"
            title={isFullscreen ? t.common.exitFullscreen : t.common.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#070b18]/95 backdrop-blur-2xl border-b border-white/10 flex flex-col gap-2">
          <button
            onClick={() => {
              onResetView();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-200 hover:bg-white/10 font-medium"
          >
            {t.nav.home}
          </button>

          <button
            onClick={() => {
              onSelectPlanet('sun');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-amber-300 hover:bg-amber-500/10 font-medium flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {t.nav.sun}
          </button>

          <button
            onClick={() => {
              onOpenExhibits();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sky-300 hover:bg-sky-500/10 font-medium flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            {t.nav.education}
          </button>

          <button
            onClick={() => {
              onOpenEclipseLab();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-amber-300 hover:bg-amber-500/10 font-medium flex items-center gap-2"
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>{t.nav.eclipse}</span>
          </button>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs text-slate-400">{t.common.switchLanguage}:</span>
            <button
              onClick={() => {
                onToggleLang();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20"
            >
              {lang === 'en' ? '🇰🇭 ប្តូរទៅ ខ្មែរ' : '🇬🇧 Switch to English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
