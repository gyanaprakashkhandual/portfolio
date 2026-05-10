"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type VideoQuality = "auto" | "4K" | "1080p" | "720p" | "480p" | "360p";
export type VideoSize = "sm" | "md" | "lg" | "xl" | "full";
export type PlaybackRate = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export interface VideoTrack {
  kind: "subtitles" | "captions" | "descriptions";
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface VideoProps {
  /** Video source URL */
  src: string;
  /** Thumbnail / poster image URL */
  thumbnailUrl?: string;
  /** Video title shown in overlay */
  title?: string;
  /** Array of text tracks for CC/subtitles */
  tracks?: VideoTrack[];
  /** Available quality options to display in settings */
  qualities?: VideoQuality[];
  /** Initial volume 0-1 */
  initialVolume?: number;
  /** Auto play on mount */
  autoPlay?: boolean;
  /** Loop the video */
  loop?: boolean;
  /** Muted on mount */
  muted?: boolean;
  /** Show the video title overlay */
  showTitle?: boolean;
  /** Minimum width (CSS value) */
  minWidth?: string;
  /** Maximum width (CSS value) */
  maxWidth?: string;
  /** Minimum height (CSS value) */
  minHeight?: string;
  /** Maximum height (CSS value) */
  maxHeight?: string;
  /** Predefined size preset */
  size?: VideoSize;
  /** Extra classes on the root wrapper */
  className?: string;
  /** Extra classes on the video element */
  videoClassName?: string;
  /** Extra classes on the controls bar */
  controlsClassName?: string;
  /** Called when play starts */
  onPlay?: () => void;
  /** Called when video pauses */
  onPause?: () => void;
  /** Called when video ends */
  onEnded?: () => void;
  /** Called on time update */
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  /** Called on volume change */
  onVolumeChange?: (volume: number, muted: boolean) => void;
  /** Called on quality change */
  onQualityChange?: (quality: VideoQuality) => void;
  /** Called on fullscreen toggle */
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

// ─── Size Presets ─────────────────────────────────────────────────────────────

export const sizePresets: Record<VideoSize, { maxWidth: string; minHeight: string }> = {
  sm: { maxWidth: "480px", minHeight: "270px" },
  md: { maxWidth: "720px", minHeight: "405px" },
  lg: { maxWidth: "960px", minHeight: "540px" },
  xl: { maxWidth: "1280px", minHeight: "720px" },
  full: { maxWidth: "100%", minHeight: "auto" },
};

// ─── Context ──────────────────────────────────────────────────────────────────

export interface VideoContextValue {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;

  // State
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isPiP: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  isBuffering: boolean;
  showControls: boolean;
  showSettings: boolean;
  showCCMenu: boolean;
  showQualityMenu: boolean;
  showSpeedMenu: boolean;
  currentTime: number;
  duration: number;
  bufferedEnd: number;
  volume: number;
  playbackRate: PlaybackRate;
  quality: VideoQuality;
  activeTrack: number; // -1 = off
  isSeeking: boolean;

  // Actions
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  togglePiP: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  setPlaybackRate: (r: PlaybackRate) => void;
  setQuality: (q: VideoQuality) => void;
  setActiveTrack: (idx: number) => void;
  setShowSettings: (v: boolean) => void;
  setShowCCMenu: (v: boolean) => void;
  setShowQualityMenu: (v: boolean) => void;
  setShowSpeedMenu: (v: boolean) => void;
  handleSliderMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleVolumeMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (s: number) => string;
  props: VideoProps;
}

const VideoContext = createContext<VideoContextValue | null>(null);

export function useVideoContext(): VideoContextValue {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideoContext must be used within VideoProvider");
  return ctx;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatTime(s: number): string {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function VideoProvider({
  children,
  props,
}: {
  children: React.ReactNode;
  props: VideoProps;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingProgress = useRef(false);
  const isDraggingVolume = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(props.muted ?? false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCCMenu, setShowCCMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolumeState] = useState(props.initialVolume ?? 1);
  const [playbackRate, setPlaybackRateState] = useState<PlaybackRate>(1);
  const [quality, setQualityState] = useState<VideoQuality>("auto");
  const [activeTrack, setActiveTrackState] = useState(-1);
  const [isSeeking, setIsSeeking] = useState(false);

  // Controls hide/show
  const scheduleHideControls = useCallback(() => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  // Video event bindings
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadStart = () => setIsLoading(true);
    const onLoadedData = () => setIsLoading(false);
    const onCanPlay = () => { setIsLoading(false); setIsBuffering(false); };
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => { setIsBuffering(false); setIsPlaying(true); };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); props.onEnded?.(); };
    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      if (v.buffered.length > 0) setBufferedEnd(v.buffered.end(v.buffered.length - 1));
      props.onTimeUpdate?.(v.currentTime, v.duration);
    };
    const onDurationChange = () => setDuration(v.duration);
    const onVolumeChange = () => {
      setIsMuted(v.muted);
      setVolumeState(v.volume);
      props.onVolumeChange?.(v.volume, v.muted);
    };
    const onError = () => {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage("Failed to load video. Please check the source URL.");
    };
    const onRateChange = () => setPlaybackRateState(v.playbackRate as PlaybackRate);

    v.addEventListener("loadstart", onLoadStart);
    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("durationchange", onDurationChange);
    v.addEventListener("volumechange", onVolumeChange);
    v.addEventListener("error", onError);
    v.addEventListener("ratechange", onRateChange);

    v.volume = props.initialVolume ?? 1;
    v.muted = props.muted ?? false;

    return () => {
      v.removeEventListener("loadstart", onLoadStart);
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("durationchange", onDurationChange);
      v.removeEventListener("volumechange", onVolumeChange);
      v.removeEventListener("error", onError);
      v.removeEventListener("ratechange", onRateChange);
    };
  }, [props]);

  // Fullscreen events
  useEffect(() => {
    const onFSChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      props.onFullscreenChange?.(fs);
    };
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, [props]);

  // PiP events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnterPiP = () => setIsPiP(true);
    const onLeavePiP = () => setIsPiP(false);
    v.addEventListener("enterpictureinpicture", onEnterPiP);
    v.addEventListener("leavepictureinpicture", onLeavePiP);
    return () => {
      v.removeEventListener("enterpictureinpicture", onEnterPiP);
      v.removeEventListener("leavepictureinpicture", onLeavePiP);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
      const v = videoRef.current;
      if (!v) return;
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "ArrowRight":
          e.preventDefault();
          seek(Math.min(v.currentTime + 5, v.duration));
          break;
        case "ArrowLeft":
          e.preventDefault();
          seek(Math.max(v.currentTime - 5, 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(v.volume + 0.1, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(v.volume - 0.1, 0));
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actions
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      props.onPlay?.();
    } else {
      v.pause();
      props.onPause?.();
    }
  }, [props]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const togglePiP = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch {}
  }, []);

  const seek = useCallback((time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.max(0, Math.min(1, val));
    v.volume = clamped;
    if (clamped > 0 && v.muted) v.muted = false;
    if (clamped === 0) v.muted = true;
    setVolumeState(clamped);
  }, []);

  const setPlaybackRate = useCallback((r: PlaybackRate) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = r;
    setPlaybackRateState(r);
    props.onQualityChange?.(quality);
  }, [props, quality]);

  const setQuality = useCallback((q: VideoQuality) => {
    setQualityState(q);
    props.onQualityChange?.(q);
  }, [props]);

  const setActiveTrack = useCallback((idx: number) => {
    const v = videoRef.current;
    if (!v) return;
    const tracks = v.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = i === idx ? "showing" : "hidden";
    }
    setActiveTrackState(idx);
  }, []);

  // Progress bar dragging
  const handleSliderMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingProgress.current = true;
    setIsSeeking(true);
    const bar = e.currentTarget;

    const doSeek = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = videoRef.current;
      if (v && isFinite(v.duration)) seek(pct * v.duration);
    };

    doSeek(e.clientX);

    const onMove = (me: MouseEvent) => { if (isDraggingProgress.current) doSeek(me.clientX); };
    const onUp = () => {
      isDraggingProgress.current = false;
      setIsSeeking(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [seek]);

  // Volume bar dragging
  const handleVolumeMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingVolume.current = true;
    const bar = e.currentTarget;

    const doVol = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setVolume(pct);
    };

    doVol(e.clientX);

    const onMove = (me: MouseEvent) => { if (isDraggingVolume.current) doVol(me.clientX); };
    const onUp = () => {
      isDraggingVolume.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [setVolume]);

  const value: VideoContextValue = {
    videoRef,
    containerRef,
    isPlaying, isMuted, isFullscreen, isPiP, isLoading, hasError, errorMessage,
    isBuffering, showControls, showSettings, showCCMenu, showQualityMenu, showSpeedMenu,
    currentTime, duration, bufferedEnd, volume, playbackRate, quality, activeTrack, isSeeking,
    togglePlay, toggleMute, toggleFullscreen, togglePiP,
    seek, setVolume, setPlaybackRate, setQuality, setActiveTrack,
    setShowSettings, setShowCCMenu, setShowQualityMenu, setShowSpeedMenu,
    handleSliderMouseDown, handleVolumeMouseDown,
    formatTime,
    props,
  };

  return (
    <VideoContext.Provider value={value}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
        onMouseEnter={() => setShowControls(true)}
        className={[
          "group relative bg-black overflow-hidden select-none focus:outline-none",
          "rounded-xl",
          props.className ?? "",
        ].join(" ")}
        style={{
          minWidth: props.minWidth,
          maxWidth: props.maxWidth ?? (props.size ? sizePresets[props.size].maxWidth : undefined),
          minHeight: props.minHeight ?? (props.size ? sizePresets[props.size].minHeight : undefined),
          maxHeight: props.maxHeight,
          width: "100%",
        }}
        tabIndex={0}
      >
        {children}
      </div>
    </VideoContext.Provider>
  );
}