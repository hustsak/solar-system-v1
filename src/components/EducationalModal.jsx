import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sun,
  Globe2,
  Layers,
  Moon,
  Disc,
  Compass,
  Rocket,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PLANETS_DATA } from '../data/planets';

export default function EducationalModal({
  isOpen,
  onClose,
  lang = 'en',
  t,
  onSelectPlanet
}) {
  const [activeExhibit, setActiveExhibit] = useState('whatIsSolarSystem');

  if (!isOpen) return null;

  const sections = t.sections;

  const exhibitsList = [
    { key: 'whatIsSolarSystem', title: sections.whatIsSolarSystem.title, icon: Globe2 },
    { key: 'theSun', title: sections.theSun.title, icon: Sun },
    { key: 'theEightPlanets', title: sections.theEightPlanets.title, icon: Disc },
    { key: 'planetaryTypes', title: sections.planetaryTypes.title, icon: Layers },
    { key: 'moons', title: sections.moons.title, icon: Moon },
    { key: 'asteroidBelt', title: sections.asteroidBelt.title, icon: Compass },
    { key: 'kuiperBelt', title: sections.kuiperBelt.title, icon: Disc },
    { key: 'spaceExploration', title: sections.spaceExploration.title, icon: Rocket },
    { key: 'didYouKnow', title: sections.didYouKnow.title, icon: Sparkles }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#070c1e] border border-white/15 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Museum Exhibit Selector */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 bg-[#040816] flex flex-col shrink-0">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {t.sections.museumTitle}
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  9 Curated Exhibits
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {exhibitsList.map((exhibit) => {
              const Icon = exhibit.icon;
              const isActive = activeExhibit === exhibit.key;

              return (
                <button
                  key={exhibit.key}
                  onClick={() => setActiveExhibit(exhibit.key)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-sky-500/20 text-white font-semibold border border-sky-400/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-xs sm:text-sm line-clamp-1">{exhibit.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Quick Planet Selector at Bottom of Drawer */}
          <div className="p-4 border-t border-white/10 bg-[#030612]">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
              {t.nav.planets}
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {PLANETS_DATA.filter(p => p.id !== 'sun').map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectPlanet(p.id);
                    onClose();
                  }}
                  className="py-1 px-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-sky-400/40 text-[10px] text-center text-slate-300 hover:text-white transition-all truncate"
                  title={p.names[lang]}
                >
                  {p.names[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Exhibit Display Pavilion */}
        <div className="flex-1 flex flex-col bg-[#070c1e] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-white/5 to-transparent">
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 mb-1 inline-block">
                {sections[activeExhibit]?.badge || 'Exhibition'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {sections[activeExhibit]?.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Exhibit Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Exhibit Summary Callout */}
            {sections[activeExhibit]?.summary && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent border border-sky-500/20 text-slate-200 text-sm sm:text-base leading-relaxed font-normal shadow-sm">
                {sections[activeExhibit].summary}
              </div>
            )}

            {/* Standard Paragraphs */}
            {sections[activeExhibit]?.content && (
              <div className="space-y-4">
                {sections[activeExhibit].content.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Planetary Types Comparative Grid */}
            {activeExhibit === 'planetaryTypes' && sections.planetaryTypes.types && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {sections.planetaryTypes.types.map((type, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-sky-300 mb-2">
                        {type.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {type.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Did You Know Curiosities Grid */}
            {activeExhibit === 'didYouKnow' && sections.didYouKnow.facts && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {sections.didYouKnow.facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-sky-500/5 border border-white/10 flex items-start gap-3.5"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* The Eight Planets Visual Quick Matrix */}
            {activeExhibit === 'theEightPlanets' && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
                  {lang === 'en' ? 'Explore Any Planet in 3D' : 'រុករកភពណាមួយក្នុងទម្រង់ 3D'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PLANETS_DATA.filter(p => p.id !== 'sun').map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPlanet(p.id);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-sky-500/15 border border-white/10 hover:border-sky-400/60 text-left transition-all group flex items-center gap-2.5"
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 group-hover:scale-125 transition-transform border border-white/20"
                        style={{
                          background: p.gradient || p.hexColor,
                          boxShadow: `0 0 8px ${p.hexColor}60`
                        }}
                      />
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                        {p.names[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-white/10 bg-[#040816] flex justify-between items-center text-xs text-slate-400">
            <span>{t.footer.resources}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors font-medium"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
