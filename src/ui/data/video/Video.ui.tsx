"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, Volume2, VolumeX, Volume1,
  Maximize, Minimize, PictureInPicture2, PictureInPictureIcon,
  Settings, Subtitles, SkipBack, SkipForward,
  Loader2, AlertCircle, ChevronRight, Check, X,
  Gauge,
} from "lucide-react";
import {
  VideoProvider,
  useVideoContext,
  formatTime,
  type VideoProps,
  type VideoQuality,
  type PlaybackRate,
} from "./Video.context";

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tip({ content, children }: { content: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#1a1a1a] dark:bg-[#111] text-white text-[11px] font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg border border-white/10">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Icon Button ─────────────────────────────────────────────────────────────

function IconBtn({
  tooltip,
  onClick,
  children,
  active,
  className = "",
}: {
  tooltip: string;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <Tip content={tooltip}>
      <button
        type="button"
        onClick={onClick}
        className={[
          "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150",
          "text-white/80 hover:text-white hover:bg-white/10 active:scale-95",
          active ? "text-blue-400 hover:text-blue-300" : "",
          className,
        ].join(" ")}
      >
        {children}
      </button>
    </Tip>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar() {
  const { currentTime, duration, bufferedEnd, handleSliderMouseDown, seek, isSeeking } = useVideoContext();
  const [hoverPct, setHoverPct] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufPct = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPct(p * 100);
  }, []);

  return (
    <div className="w-full px-1">
      <div
        ref={barRef}
        className="relative w-full h-1 group/bar cursor-pointer"
        style={{ height: "4px" }}
        onMouseDown={handleSliderMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverPct(null)}
      >
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-white/20 overflow-hidden" style={{ height: "4px" }}>
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all duration-300"
            style={{ width: `${bufPct}%` }}
          />
          {/* Progress */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
            style={{ width: `${pct}%` }}
            transition={{ duration: isSeeking ? 0 : 0.1 }}
          />
        </div>

        {/* Hover preview line */}
        {hoverPct !== null && (
          <div
            className="absolute top-0 w-0.5 h-full bg-white/60 rounded pointer-events-none"
            style={{ left: `${hoverPct}%`, transform: "translateX(-50%)" }}
          />
        )}

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150 pointer-events-none"
          style={{ left: `${pct}%`, transform: `translateX(-50%) translateY(-50%)` }}
        />

        {/* Hover time tooltip */}
        {hoverPct !== null && duration > 0 && (
          <div
            className="absolute -top-7 bg-[#1a1a1a] text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none"
            style={{ left: `${hoverPct}%`, transform: "translateX(-50%)" }}
          >
            {formatTime((hoverPct / 100) * duration)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Volume Control ───────────────────────────────────────────────────────────

function VolumeControl() {
  const { volume, isMuted, toggleMute, handleVolumeMouseDown } = useVideoContext();
  const [expanded, setExpanded] = useState(false);
  const vol = isMuted ? 0 : volume;

  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <IconBtn tooltip={isMuted || volume === 0 ? "Unmute (m)" : "Mute (m)"} onClick={toggleMute}>
        {isMuted || volume === 0 ? (
          <VolumeX size={16} />
        ) : volume < 0.5 ? (
          <Volume1 size={16} />
        ) : (
          <Volume2 size={16} />
        )}
      </IconBtn>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 72, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="relative flex items-center cursor-pointer h-5 w-[72px]"
              onMouseDown={handleVolumeMouseDown}
            >
              <div className="relative w-full h-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  style={{ width: `${vol * 100}%` }}
                />
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow pointer-events-none"
                style={{ left: `${vol * 100}%`, transform: "translateX(-50%) translateY(-50%)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Popup Menu ───────────────────────────────────────────────────────────────

interface PopupMenuProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

function PopupMenu({ open, onClose, title, children }: PopupMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-14 right-2 z-50 min-w-[180px] bg-[#1c1c1e]/95 dark:bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {title && (
              <div className="px-3 pt-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40 border-b border-white/10">
                {title}
              </div>
            )}
            <div className="p-1">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface MenuItemProps {
  label: string;
  active?: boolean;
  description?: string;
  trailing?: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "danger";
}

function MenuItem({ label, active, description, trailing, onClick, icon, variant = "default" }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-100 text-left",
        variant === "danger"
          ? "text-red-400 hover:bg-red-500/10"
          : "text-white/85 hover:bg-white/10",
        active ? "text-blue-400" : "",
      ].join(" ")}
    >
      {icon && <span className="shrink-0 text-white/40 w-4 h-4 flex items-center">{icon}</span>}
      <span className="flex-1 min-w-0">
        <span className="block">{label}</span>
        {description && <span className="block text-[11px] text-white/40 font-normal">{description}</span>}
      </span>
      {trailing && <span className="shrink-0 text-white/40 text-xs">{trailing}</span>}
      {active && <Check size={13} className="shrink-0 text-blue-400" />}
    </button>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel() {
  const {
    showSettings, setShowSettings,
    showQualityMenu, setShowQualityMenu,
    showSpeedMenu, setShowSpeedMenu,
    showCCMenu, setShowCCMenu,
    quality, setQuality,
    playbackRate, setPlaybackRate,
    activeTrack, setActiveTrack,
    props,
  } = useVideoContext();

  const qualities: VideoQuality[] = props.qualities ?? ["auto", "1080p", "720p", "480p", "360p"];
  const speeds: PlaybackRate[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  if (showQualityMenu) {
    return (
      <PopupMenu open title="Quality" onClose={() => { setShowQualityMenu(false); setShowSettings(false); }}>
        <button
          type="button"
          onClick={() => setShowQualityMenu(false)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
        {qualities.map(q => (
          <MenuItem
            key={q}
            label={q === "auto" ? "Auto" : q}
            active={quality === q}
            onClick={() => { setQuality(q); setShowQualityMenu(false); setShowSettings(false); }}
          />
        ))}
      </PopupMenu>
    );
  }

  if (showSpeedMenu) {
    return (
      <PopupMenu open title="Playback Speed" onClose={() => { setShowSpeedMenu(false); setShowSettings(false); }}>
        <button
          type="button"
          onClick={() => setShowSpeedMenu(false)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
        {speeds.map(s => (
          <MenuItem
            key={s}
            label={s === 1 ? "Normal" : `${s}×`}
            active={playbackRate === s}
            onClick={() => { setPlaybackRate(s); setShowSpeedMenu(false); setShowSettings(false); }}
          />
        ))}
      </PopupMenu>
    );
  }

  if (showCCMenu) {
    const tracks = props.tracks ?? [];
    return (
      <PopupMenu open title="Subtitles / CC" onClose={() => { setShowCCMenu(false); setShowSettings(false); }}>
        <button
          type="button"
          onClick={() => setShowCCMenu(false)}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
        <MenuItem label="Off" active={activeTrack === -1} onClick={() => { setActiveTrack(-1); setShowCCMenu(false); setShowSettings(false); }} />
        {tracks.map((t, i) => (
          <MenuItem
            key={i}
            label={t.label}
            active={activeTrack === i}
            onClick={() => { setActiveTrack(i); setShowCCMenu(false); setShowSettings(false); }}
          />
        ))}
      </PopupMenu>
    );
  }

  return (
    <PopupMenu open={showSettings} onClose={() => setShowSettings(false)} title="Settings">
      <MenuItem
        label="Quality"
        trailing={<span className="flex items-center gap-1">{quality === "auto" ? "Auto" : quality} <ChevronRight size={12} /></span>}
        onClick={() => setShowQualityMenu(true)}
      />
      <MenuItem
        label="Speed"
        trailing={<span className="flex items-center gap-1">{playbackRate === 1 ? "Normal" : `${playbackRate}×`} <ChevronRight size={12} /></span>}
        onClick={() => setShowSpeedMenu(true)}
      />
      {(props.tracks?.length ?? 0) > 0 && (
        <MenuItem
          label="Subtitles / CC"
          trailing={<span className="flex items-center gap-1">{activeTrack === -1 ? "Off" : (props.tracks?.[activeTrack]?.label ?? "On")} <ChevronRight size={12} /></span>}
          onClick={() => setShowCCMenu(true)}
        />
      )}
    </PopupMenu>
  );
}

// ─── Controls Bar ─────────────────────────────────────────────────────────────

function ControlsBar() {
  const {
    isPlaying, togglePlay,
    isMuted, toggleMute,
    isFullscreen, toggleFullscreen,
    isPiP, togglePiP,
    currentTime, duration,
    showSettings, setShowSettings,
    showCCMenu, showSpeedMenu, showQualityMenu,
    props,
  } = useVideoContext();

  const hasTracks = (props.tracks?.length ?? 0) > 0;
  const settingsOpen = showSettings || showCCMenu || showSpeedMenu || showQualityMenu;

  return (
    <div
      className={[
        "absolute bottom-0 left-0 right-0 z-30",
        props.controlsClassName ?? "",
      ].join(" ")}
    >
      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none rounded-b-xl" />

      <div className="relative px-3 pb-3 pt-8 flex flex-col gap-2">
        {/* Progress */}
        <ProgressBar />

        {/* Controls row */}
        <div className="flex items-center gap-1">
          {/* Left side */}
          <IconBtn tooltip="Skip back 10s" onClick={() => { const v = document.querySelector("video"); if (v) v.currentTime = Math.max(0, v.currentTime - 10); }}>
            <SkipBack size={15} />
          </IconBtn>

          <IconBtn tooltip={isPlaying ? "Pause (k)" : "Play (k)"} onClick={togglePlay} className="w-9 h-9">
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </IconBtn>

          <IconBtn tooltip="Skip forward 10s" onClick={() => { const v = document.querySelector("video"); if (v) v.currentTime = Math.min(v.duration, v.currentTime + 10); }}>
            <SkipForward size={15} />
          </IconBtn>

          <VolumeControl />

          {/* Time */}
          <span className="text-white/70 text-xs font-mono ml-1 tabular-nums whitespace-nowrap">
            {formatTime(currentTime)}
            <span className="text-white/30 mx-0.5">/</span>
            {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Right side */}
          {hasTracks && (
            <IconBtn tooltip="Subtitles / CC" onClick={() => { setShowSettings(false); }}>
              <Subtitles size={16} />
            </IconBtn>
          )}

          <div className="relative">
            <IconBtn
              tooltip="Settings"
              onClick={() => setShowSettings(!settingsOpen)}
              active={settingsOpen}
            >
              <Settings size={15} />
            </IconBtn>
            <SettingsPanel />
          </div>

          {typeof document !== "undefined" && "pictureInPictureEnabled" in document && (
            <IconBtn tooltip={isPiP ? "Exit PiP" : "Picture in Picture"} onClick={togglePiP} active={isPiP}>
              {isPiP ? <PictureInPictureIcon size={15} /> : <PictureInPicture2 size={15} />}
            </IconBtn>
          )}

          <IconBtn
            tooltip={isFullscreen ? "Exit Fullscreen (f)" : "Fullscreen (f)"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </IconBtn>
        </div>
      </div>
    </div>
  );
}

// ─── Center Play Overlay ──────────────────────────────────────────────────────

function CenterPlayOverlay() {
  const { togglePlay } = useVideoContext();
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
      onClick={togglePlay}
    />
  );
}

// ─── Loading Overlay ──────────────────────────────────────────────────────────

function LoadingOverlay() {
  const { isLoading, isBuffering, hasError } = useVideoContext();
  if (!isLoading && !isBuffering && !hasError) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
      {!hasError && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 size={36} className="text-white/70" />
        </motion.div>
      )}
    </div>
  );
}

// ─── Error Overlay ────────────────────────────────────────────────────────────

function ErrorOverlay() {
  const { hasError, errorMessage } = useVideoContext();
  if (!hasError) return null;
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/80 rounded-xl px-6 text-center">
      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
        <AlertCircle size={24} className="text-red-400" />
      </div>
      <p className="text-white font-semibold text-sm">Playback Error</p>
      <p className="text-white/50 text-xs max-w-xs">{errorMessage}</p>
    </div>
  );
}

// ─── Title Overlay ────────────────────────────────────────────────────────────

function TitleOverlay() {
  const { props, showControls } = useVideoContext();
  if (!props.showTitle || !props.title) return null;
  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 right-0 z-30 px-4 pt-3 pb-8 bg-gradient-to-b from-black/70 to-transparent pointer-events-none rounded-t-xl"
        >
          <p className="text-white text-sm font-semibold truncate">{props.title}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Big Play Button (thumbnail state) ───────────────────────────────────────

function BigPlayButton() {
  const { isPlaying, isLoading, hasError, togglePlay, props } = useVideoContext();
  if (isPlaying || isLoading || hasError) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transition-colors hover:bg-white/30"
      >
        <Play size={28} fill="white" className="text-white ml-1" />
      </motion.button>
    </div>
  );
}

// ─── Buffering Spinner (mid-play) ─────────────────────────────────────────────

function BufferingSpinner() {
  const { isBuffering, isLoading } = useVideoContext();
  if (!isBuffering || isLoading) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      >
        <Loader2 size={32} className="text-white/60" />
      </motion.div>
    </div>
  );
}

// ─── Main Video Component ─────────────────────────────────────────────────────

/**
 * Full-featured video player component.
 *
 * @example
 * <Video
 *   src="https://example.com/video.mp4"
 *   thumbnailUrl="https://example.com/thumb.jpg"
 *   title="My Video"
 *   size="lg"
 *   showTitle
 *   qualities={["auto","1080p","720p","480p"]}
 *   tracks={[{ kind:"subtitles", src:"/subs/en.vtt", srclang:"en", label:"English", default:true }]}
 *   onPlay={() => console.log("playing")}
 *   className="rounded-2xl"
 * />
 */
export function Video(props: VideoProps) {
  return (
    <VideoProvider props={props}>
      <VideoInner />
    </VideoProvider>
  );
}

function VideoInner() {
  const { videoRef, isPlaying, showControls, props } = useVideoContext();

  return (
    <>
      {/* Video element */}
      <video
        ref={videoRef}
        src={props.src}
        poster={props.thumbnailUrl}
        loop={props.loop}
        autoPlay={props.autoPlay}
        muted={props.muted}
        playsInline
        className={[
          "w-full h-full object-cover block rounded-xl",
          props.videoClassName ?? "",
        ].join(" ")}
        preload="metadata"
      >
        {props.tracks?.map((t, i) => (
          <track
            key={i}
            kind={t.kind}
            src={t.src}
            srcLang={t.srclang}
            label={t.label}
            default={t.default}
          />
        ))}
      </video>

      {/* Overlays */}
      <LoadingOverlay />
      <ErrorOverlay />
      <BigPlayButton />
      <BufferingSpinner />
      <TitleOverlay />
      <CenterPlayOverlay />

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            <div className="absolute inset-0 pointer-events-auto">
              <ControlsBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Re-exports ───────────────────────────────────────────────────────────────
export type { VideoProps, VideoQuality, PlaybackRate };