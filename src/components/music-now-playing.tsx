"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TrackData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
}

const STORAGE_KEY = "music_last_track";

// Animated equalizer — green bars when live
function EqualizerBars() {
  const bars = [
    { height: [3, 14, 6, 10, 3], duration: 0.9 },
    { height: [10, 4, 14, 5, 10], duration: 0.75 },
    { height: [6, 12, 3, 14, 6], duration: 1.05 },
  ];
  return (
    <span className="inline-flex items-end gap-[2px] h-4 shrink-0" aria-hidden>
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-sm bg-green-500 inline-block"
          animate={{ height: bar.height.map((h) => `${h}px`) }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ height: "3px" }}
        />
      ))}
    </span>
  );
}

export function MusicNowPlaying() {
  // Lazy initializer — reads localStorage synchronously on first render, no flash/delay
  const [track, setTrack] = useState<TrackData | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as TrackData) : null;
    } catch {
      return null;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/music');
        const json = await res.json();
        if (json?.title) {
          const t: TrackData = {
            isPlaying: json.isPlaying,
            title: json.title,
            artist: json.artist,
            albumImageUrl: json.albumImageUrl,
            songUrl: json.songUrl,
          };
          setTrack(t);
          setIsPlaying(json.isPlaying);
          // Always persist last known track
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...t, isPlaying: false }));
          } catch {
            // ignore
          }
        } else {
          setIsPlaying(false);
        }
      } catch {
        // silent fail
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5_000);

    // Refetch immediately when tab becomes visible again
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchData();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!track) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={track.title}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Link
          href={track.songUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 w-full rounded-2xl border border-border/30 bg-muted/40 hover:bg-muted/70 backdrop-blur-sm px-4 py-3 transition-colors duration-200"
        >
          {/* Album art */}
          <div className="relative size-12 shrink-0 rounded-lg overflow-hidden bg-muted">
            {track.albumImageUrl ? (
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="size-4 text-muted-foreground/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
                </svg>
              </div>
            )}
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-medium leading-none mb-1">
              {isPlaying ? "Now Playing" : "Last Played"}
            </p>
            <p className="text-sm font-semibold text-foreground/90 truncate leading-tight group-hover:text-foreground transition-colors">
              {track.title}
            </p>
            <p className="text-xs text-muted-foreground/60 truncate leading-tight mt-0.5">
              {track.artist}
            </p>
          </div>

          {/* Right: equalizer when live, muted note icon when not */}
          <div className="shrink-0 pl-1">
            {isPlaying ? (
              <EqualizerBars />
            ) : (
              <svg
                className="size-4 text-muted-foreground/25"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
              </svg>
            )}
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

