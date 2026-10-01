import React, { useState } from 'react';
import {
  X,
  Compass,
  Thermometer,
  Rotate3d,
  CircleDot,
  Radio,
  Sparkles,
  Rocket,
  Layers,
  Wind,
  Info,
  ChevronRight
} from 'lucide-react';
import { PLANETS_DATA } from '../data/planets';

export default function PlanetModal({
  planetId,
  onClose,
  lang = 'en',
  t,
  onFocusPlanet,
  isFocused = false
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const planet = PLANETS_DATA.find(p => p.id === planetId);
  if (!planet) return null;

  const planetName = planet.names[lang] || planet.names.en;
  const tagline = planet.tagline[lang] || planet.tagline.en;
  const description = planet.description[lang] || planet.description.en;
  const classification = planet.type[lang] || planet.type.en;
  const atmosphere = planet.atmosphere[lang] || planet.atmosphere.en;
  const surface = planet.surface[lang] || planet.surface.en;
  const facts = planet.facts[lang] || planet.facts.en;
  const missions = planet.missions[lang] || planet.missions.en;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl md:max-w-2xl bg-[#060a19]/95 backdrop-blur-2xl border-l border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header Banner */}
      <div className="relative p-6 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Planet Color Sphere Visualizer */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shrink-0 p-1 border-2 border-white/20"
              style={{
                background: planet.gradient || planet.hexColor,
                boxShadow: `0 0 28px ${planet.hexColor}60`
              }}
            >
              <div className="w-5 h-5 rounded-full bg-white/25 blur-sm" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-sky-300 border border-white/10">
                  {classification}
                </span>
                <span className="text-xs text-slate-400">
                  #{planet.order === 0 ? 'Star' : `Planet ${planet.order}`}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {planetName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Focus Camera on Planet Button */}
            <button
              onClick={() => onFocusPlanet(planet.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isFocused
                  ? 'bg-sky-500/25 border-sky-400 text-sky-200'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
              title={t.common.focusPlanet}
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">{t.common.focusPlanet}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
              title={t.common.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-3 text-sm text-slate-300 italic">
          "{tagline}"
        </p>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 mt-5 overflow-x-auto scrollbar-none border-b border-white/10 pb-1">
          {[
            { id: 'overview', label: t.planetTabs.overview, icon: Info },
            { id: 'stats', label: t.planetTabs.stats, icon: CircleDot },
            { id: 'composition', label: t.planetTabs.composition, icon: Layers },
            { id: 'missions', label: t.planetTabs.missions, icon: Rocket },
            { id: 'facts', label: t.planetTabs.facts, icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isTabActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-sky-400 font-bold mb-2">
                {t.common.learnMore}
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">{t.statLabels.diameter}</span>
                <span className="text-sm sm:text-base font-bold text-white">
                  {planet.stats.diameter[lang] || planet.stats.diameter.en}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">{t.statLabels.distance}</span>
                <span className="text-sm sm:text-base font-bold text-white">
                  {planet.stats.distance[lang] || planet.stats.distance.en}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">{t.statLabels.temperature}</span>
                <span className="text-sm sm:text-base font-bold text-amber-300">
                  {planet.stats.temperature[lang] || planet.stats.temperature.en}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">{t.statLabels.moons}</span>
                <span className="text-sm sm:text-base font-bold text-sky-300">
                  {planet.stats.moons[lang] || planet.stats.moons.en}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-sky-200/80 leading-relaxed">
              {t.common.noteMoons}
            </div>
          </div>
        )}

        {/* TAB 2: SCIENTIFIC DATA */}
        {activeTab === 'stats' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <h3 className="text-xs uppercase tracking-wider text-sky-400 font-bold mb-3">
              {t.planetTabs.stats}
            </h3>

            <div className="divide-y divide-white/10 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
              {[
                { label: t.statLabels.type, value: classification },
                { label: t.statLabels.diameter, value: planet.stats.diameter[lang] || planet.stats.diameter.en },
                { label: t.statLabels.distance, value: planet.stats.distance[lang] || planet.stats.distance.en },
                { label: t.statLabels.orbitalPeriod, value: planet.stats.orbitalPeriod[lang] || planet.stats.orbitalPeriod.en },
                { label: t.statLabels.rotationPeriod, value: planet.stats.rotationPeriod[lang] || planet.stats.rotationPeriod.en },
                { label: t.statLabels.temperature, value: planet.stats.temperature[lang] || planet.stats.temperature.en },
                { label: t.statLabels.moons, value: planet.stats.moons[lang] || planet.stats.moons.en },
                { label: t.statLabels.gravity, value: planet.stats.gravity[lang] || planet.stats.gravity.en },
                { label: t.statLabels.mass, value: planet.stats.mass[lang] || planet.stats.mass.en },
                { label: t.statLabels.ringSystem, value: planet.stats.ringSystem[lang] || planet.stats.ringSystem.en }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 px-4 hover:bg-white/5 transition-colors">
                  <span className="text-xs sm:text-sm text-slate-400">{item.label}</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-100 text-right max-w-[55%]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 pt-2 italic">
              {t.common.noteMoons}
            </p>
          </div>
        )}

        {/* TAB 3: ATMOSPHERE & SURFACE */}
        {activeTab === 'composition' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <Wind className="w-4 h-4" />
                <span>{lang === 'en' ? 'Atmospheric Composition' : 'សមាសធាតុបរិយាកាស'}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {atmosphere}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Layers className="w-4 h-4" />
                <span>{lang === 'en' ? 'Geology & Surface Features' : 'ភូគព្ភសាស្ត្រ និងទម្រង់ផ្ទៃ'}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {surface}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: EXPLORATION MISSIONS */}
        {activeTab === 'missions' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs uppercase tracking-wider text-sky-400 font-bold mb-2">
              {t.planetTabs.missions}
            </h3>

            <div className="space-y-3">
              {missions.map((mission, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/40 transition-colors flex items-start gap-3"
                >
                  <Rocket className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DID YOU KNOW? */}
        {activeTab === 'facts' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-xs uppercase tracking-wider text-sky-400 font-bold mb-2">
              {t.planetTabs.facts}
            </h3>

            <div className="space-y-3">
              {facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-white/10 flex items-start gap-3"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Drawer Action */}
      <div className="p-4 border-t border-white/10 bg-[#040713] flex justify-between items-center">
        <button
          onClick={() => onFocusPlanet(planet.id)}
          className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
        >
          <span>{isFocused ? t.common.resetFocus : t.common.focusPlanet}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors"
        >
          {t.common.close}
        </button>
      </div>
    </div>
  );
}
