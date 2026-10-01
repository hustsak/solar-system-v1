import React from 'react';

export default function Footer({ t, onOpenExhibits }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none p-3 hidden sm:flex justify-between items-center text-[11px] text-slate-500">
      <div className="pointer-events-auto flex items-center gap-3 bg-[#030612]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
        <span>{t.footer.copyright}</span>
      </div>

      <div className="pointer-events-auto flex items-center gap-3 bg-[#030612]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
        <button
          onClick={onOpenExhibits}
          className="text-sky-400/80 hover:text-sky-300 transition-colors underline"
        >
          {t.sections.museumTitle}
        </button>
      </div>
    </footer>
  );
}
