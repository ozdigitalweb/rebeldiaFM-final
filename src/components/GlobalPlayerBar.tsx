import React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Moon,
  Bell,
  Sliders,
  Radio,
  Music,
  ExternalLink,
  ChevronUp,
  Clock,
  Maximize2,
} from 'lucide-react';
import { ProgramItem, RadioAlarm, RadioStationConfig, EqualizerPreset } from '../types';
import { StreamMetadata } from '../utils/api';

interface GlobalPlayerBarProps {
  isPlaying: boolean;
  isBuffering: boolean;
  hasError: boolean;
  volume: number;
  isMuted: boolean;
  currentLiveProgram: ProgramItem | null;
  streamMetadata?: StreamMetadata;
  artworkUrl?: string | null;
  stationConfig: RadioStationConfig;
  equalizerPreset: EqualizerPreset;
  timerSecondsRemaining: number | null;
  alarm: RadioAlarm;
  onTogglePlay: () => void;
  onReloadStream: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onOpenSleepTimer: () => void;
  onOpenAlarm: () => void;
  onOpenSettings: () => void;
  onOpenRequests: () => void;
  onGoToPlayerTab: () => void;
  onOpenMusicMode?: () => void;
  isPlayerTabActive: boolean;
}

export const GlobalPlayerBar: React.FC<GlobalPlayerBarProps> = ({
  isPlaying,
  isBuffering,
  hasError,
  volume,
  isMuted,
  currentLiveProgram,
  streamMetadata,
  artworkUrl,
  stationConfig,
  equalizerPreset,
  timerSecondsRemaining,
  alarm,
  onTogglePlay,
  onReloadStream,
  onVolumeChange,
  onToggleMute,
  onOpenSleepTimer,
  onOpenAlarm,
  onOpenSettings,
  onOpenRequests,
  onGoToPlayerTab,
  onOpenMusicMode,
  isPlayerTabActive,
}) => {
  return (
    <aside
      aria-label="Controles de reprodução de áudio"
      className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-2xl border-t border-white/15 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-all px-[10px] sm:px-[30px]"
    >
      <div className="w-full py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section: Program & Track Info */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 max-w-[40%] sm:max-w-xs md:max-w-sm">
          {/* Mini Vinyl / Album Art Play/Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="relative cursor-pointer shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full active:scale-95 transition-transform touch-manipulation"
            title={isPlaying ? 'Pausar rádio' : 'Tocar rádio'}
            aria-label={isPlaying ? 'Pausar rádio' : 'Tocar rádio'}
          >
            <div
              className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-zinc-900 border border-zinc-700 p-0.5 shadow-md flex items-center justify-center overflow-hidden transition-all pointer-events-none ${
                isPlaying ? 'animate-pulse-burst border-white/40' : ''
              }`}
            >
              {artworkUrl || currentLiveProgram?.avatarUrl ? (
                <img
                  src={artworkUrl || currentLiveProgram?.avatarUrl}
                  alt={streamMetadata?.rawTitle || currentLiveProgram?.title || 'No Ar'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover pointer-events-none"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center pointer-events-none">
                  <Music className="w-4 h-4 text-zinc-500" />
                </div>
              )}
            </div>

            {/* Quick Play overlay icon */}
            <div className="absolute inset-0 bg-black/55 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white text-white" />
              ) : (
                <Play className="w-4 h-4 fill-white text-white ml-0.5" />
              )}
            </div>

            {/* Subtle mobile play indicator badge when stopped so users know it is interactive */}
            {!isPlaying && (
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shadow pointer-events-none sm:hidden border border-black/30">
                <Play className="w-2.5 h-2.5 fill-black ml-0.5" />
              </span>
            )}
          </button>

          {/* Text Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider ${
                  isPlaying
                    ? 'bg-white text-black'
                    : isBuffering
                    ? 'bg-zinc-800 text-zinc-300'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPlaying
                      ? 'bg-black animate-ping'
                      : isBuffering
                      ? 'bg-zinc-400 animate-pulse'
                      : 'bg-zinc-600'
                  }`}
                />
                <span className="hidden xs:inline">
                  {isPlaying
                    ? 'AO VIVO'
                    : isBuffering
                    ? 'CONECTANDO'
                    : 'OFFLINE'}
                </span>
              </span>

              <span className="text-[10px] font-mono text-zinc-400 truncate hidden md:inline">
                {stationConfig.bitrate}
              </span>
            </div>

            <h4
              onClick={onGoToPlayerTab}
              className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:underline"
              title={
                streamMetadata?.hasLiveMetadata
                  ? `${streamMetadata.song} - ${streamMetadata.artist}`
                  : currentLiveProgram
                  ? currentLiveProgram.title
                  : stationConfig.name
              }
            >
              {streamMetadata?.hasLiveMetadata
                ? streamMetadata.song
                : currentLiveProgram
                ? currentLiveProgram.title
                : stationConfig.name}
            </h4>

            <p
              onClick={onGoToPlayerTab}
              className="text-[10px] sm:text-xs text-zinc-400 truncate cursor-pointer hover:text-zinc-200"
            >
              {streamMetadata?.hasLiveMetadata
                ? streamMetadata.artist
                : currentLiveProgram?.host
                ? `Com ${currentLiveProgram.host}`
                : stationConfig.slogan}
            </p>
          </div>
        </div>

        {/* Center Section: Playback Controls & Waveform */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Reconnect button */}
          <button
            onClick={onReloadStream}
            className="p-2 sm:p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition shadow-sm hidden xs:flex items-center justify-center"
            title="Reconectar áudio"
            aria-label="Reconectar áudio"
          >
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBuffering ? 'animate-spin text-white' : ''}`} />
          </button>

          {/* Main Big Play / Pause Button */}
          <button
            onClick={onTogglePlay}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center shrink-0 shadow-xl transition transform active:scale-95"
            aria-label={isPlaying ? 'Pausar rádio' : 'Ouvir rádio ao vivo'}
          >
            {isBuffering ? (
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-black" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black ml-0.5" />
            )}
          </button>

          {/* Mini Live Audio Equalizer Animation Bars */}
          <div
            onClick={onGoToPlayerTab}
            className="hidden sm:flex items-end gap-1 h-6 px-2 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 cursor-pointer"
            title="Equalizador Digital"
          >
            {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7].map((factor, idx) => (
              <span
                key={idx}
                className={`w-1 rounded-full bg-white transition-all duration-200 ${
                  isPlaying
                    ? 'animate-pulse'
                    : 'h-1.5 opacity-30'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(4, Math.min(22, factor * 22))}px` : '4px',
                  animationDelay: `${idx * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Volume & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Volume Controls (Desktop & Tablets) */}
          <div className="hidden lg:flex items-center gap-2 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={onToggleMute}
              className="text-zinc-400 hover:text-white transition"
              aria-label={isMuted ? 'Ativar som' : 'Silenciar som'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 xl:w-24 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              aria-label="Controle de volume"
            />
            <span className="text-[10px] font-mono text-zinc-400 w-7 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Pedir Música Shortcut */}
          <button
            onClick={onOpenRequests}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold transition"
            title="Pedir Música"
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Pedir Música</span>
          </button>

          {/* Despertador / Alarme (Sino) */}
          <button
            onClick={onOpenAlarm}
            className={`p-2 rounded-xl border text-xs font-bold transition relative cursor-pointer ${
              alarm.enabled
                ? 'bg-amber-400 text-black border-amber-400 shadow-md font-bold'
                : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
            title="Despertador da Rádio"
            aria-label="Despertador da Rádio"
          >
            <Bell className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${alarm.enabled ? 'fill-black text-black' : 'text-amber-400'}`} />
            {alarm.enabled && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 border border-black animate-ping" />
            )}
          </button>

          {/* Sleep Timer button */}
          <button
            onClick={onOpenSleepTimer}
            className={`p-2 rounded-xl border text-xs font-bold transition relative cursor-pointer ${
              timerSecondsRemaining !== null
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
            title="Sleep Timer"
            aria-label="Sleep Timer"
          >
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {timerSecondsRemaining !== null && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-black border border-white" />
            )}
          </button>

          {/* Settings / Equalizer button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition"
            title="Configurações e Equalizador"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Modo Música (Tela Cheia) */}
          {onOpenMusicMode && (
            <button
              onClick={onOpenMusicMode}
              className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400/40 text-amber-400 hover:text-amber-300 text-xs transition cursor-pointer"
              title="Modo Música (Tela Cheia)"
              aria-label="Modo Música (Tela Cheia)"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Toggle to Player Tab */}
          {!isPlayerTabActive ? (
            <button
              onClick={onGoToPlayerTab}
              className="px-2.5 sm:px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
              title="Abrir Tela do Player"
            >
              <Radio className="w-3.5 h-3.5 text-zinc-300" />
              <span className="hidden sm:inline">Player</span>
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
};
