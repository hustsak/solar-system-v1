import React from 'react';
import {
  Play,
  Pause,
  Gauge,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Orbit,
  Tag,
  Maximize,
  Minimize
} from 'lucide-react';

export default function ControlsOverlay({
  t,
  orbitActive,
  onToggleOrbit,
  speedMultiplier,
  onCycleSpeed,
  showOrbitPaths,
  onTogglePaths,
  showLabels,
  onToggleLabels,
  onResetView,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onToggleFullscreen
}) {
  return (
    <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-end gap-2 pointer-events-none">
      <div className="pointer-events-auto bg-[#090e24]/85 backdrop-blur-xl border border-white/15 p-1.5 sm:p-2 rounded-2xl shadow-2xl shadow-black/80 flex items-center gap-1 sm:gap-2 flex-nowrap max-w-[96vw] overflow-x-auto scrollbar-none">
        {/* Orbit Motion Toggle */}
        <button
          onClick={onToggleOrbit}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            orbitActive
              ? 'bg-sky-500/20 border-sky-400/80 text-sky-200 shadow-sm shadow-sky-500/20'
              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
          }`}
          title={orbitActive ? t.controls.orbitOn : t.controls.orbitOff}
        >
          {orbitActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{orbitActive ? t.controls.orbitOn : t.controls.orbitOff}</span>
        </button>

        {/* Speed Cycle Button */}
        <button
          onClick={onCycleSpeed}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all"
          title={t.controls.speed}
        >
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          <span>{speedMultiplier}x</span>
        </button>

        {/* Orbit Path Lines Toggle */}
        <button
          onClick={onTogglePaths}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            showOrbitPaths
              ? 'bg-indigo-500/20 border-indigo-400/80 text-indigo-200'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
          }`}
          title={showOrbitPaths ? t.controls.pathsOn : t.controls.pathsOff}
        >
          <Orbit className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{showOrbitPaths ? t.controls.pathsOn : t.controls.pathsOff}</span>
        </button>

        {/* Planet Labels Toggle */}
        <button
          onClick={onToggleLabels}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            showLabels
              ? 'bg-emerald-500/20 border-emerald-400/80 text-emerald-200'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
          }`}
          title={showLabels ? t.controls.labelsOn : t.controls.labelsOff}
        >
          <Tag className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{showLabels ? t.controls.labelsOn : t.controls.labelsOff}</span>
        </button>

        <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          title={t.controls.zoomIn}
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
          title={t.controls.zoomOut}
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Reset Camera */}
        <button
          onClick={onResetView}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors text-xs font-medium"
          title={t.controls.resetView}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">{t.controls.resetView}</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors hidden sm:flex"
          title={isFullscreen ? t.common.exitFullscreen : t.common.fullscreen}
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
