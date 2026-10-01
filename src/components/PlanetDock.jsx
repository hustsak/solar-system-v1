import React from 'react';
import { PLANETS_DATA } from '../data/planets';

export default function PlanetDock({
  selectedPlanetId,
  onSelectPlanet,
  lang = 'en'
}) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 max-w-[95vw] sm:max-w-none">
      <div className="bg-[#090e23]/80 backdrop-blur-xl border border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl shadow-black/80 flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none">
        {PLANETS_DATA.map((planet) => {
          const isSelected = selectedPlanetId === planet.id;
          const planetName = planet.names[lang] || planet.names.en;

          return (
            <button
              key={planet.id}
              onClick={() => onSelectPlanet(planet.id)}
              className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-sky-500/25 border border-sky-400/80 shadow-md shadow-sky-500/30'
                  : 'hover:bg-white/10 border border-transparent'
              }`}
              title={planetName}
            >
              {/* Planet Color Sphere Indicator with Realistic Gradient */}
              <span
                className="w-4 h-4 rounded-full transition-transform group-hover:scale-125 shadow-md shrink-0 border border-white/20"
                style={{
                  background: planet.gradient || planet.hexColor,
                  boxShadow: isSelected
                    ? `0 0 14px ${planet.hexColor}`
                    : `0 0 6px ${planet.hexColor}60`
                }}
              />

              {/* Planet Label */}
              <span
                className={`text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {planetName}
              </span>

              {/* Active Indicator dot */}
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
