"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLastfm } from "react-icons/fa";
import { Play, Pause } from "lucide-react";

interface TrackData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  playedAt?: string;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching Last.fm data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll every 30s — Last.fm scrobbles are not real-time millisecond data
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-sm">
          <div className="relative size-12 rounded-md overflow-hidden shrink-0 bg-muted animate-pulse" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 bg-muted rounded animate-pulse w-16" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data?.title) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center justify-center p-4 rounded-xl bg-card border border-border shadow-sm text-sm text-muted-foreground">
          No recent activity
        </div>
      </motion.div>
    );
  }

  const statusText = data.isPlaying ? "Now Scrobbling" : "Last Scrobbled";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <a
          href={data.songUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 p-3 hover:bg-accent/30 transition-all duration-300"
        >
          {/* Album Art */}
          <div className="relative size-12 rounded-md overflow-hidden shrink-0 bg-muted">
            {data.albumImageUrl ? (
              <Image
                src={data.albumImageUrl}
                alt={data.album ?? "Album art"}
                fill
                sizes="48px"
                loading="eager"
                className="object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center">
                <FaLastfm className="size-5 text-[#d51007]" />
              </div>
            )}
            {/* Last.fm icon overlay on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaLastfm className="size-5 text-[#d51007]" />
            </div>
          </div>

          {/* Track Info */}
          <div className="flex flex-col justify-center flex-1 min-w-0 gap-0.5">
            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">
              {statusText}
            </span>
            <span className="text-sm font-semibold truncate text-foreground leading-tight">
              {data.title}
            </span>
            <span className="text-xs text-muted-foreground truncate leading-tight">
              by {data.artist}
            </span>
          </div>

          {/* Play/Pause indicator */}
          <div className="shrink-0 mr-1">
            <div className="size-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors">
              {data.isPlaying ? (
                <Pause className="size-3.5 text-foreground fill-foreground" />
              ) : (
                <Play className="size-3.5 text-foreground fill-foreground ml-0.5" />
              )}
            </div>
          </div>
        </a>

        {/* Scrobbling indicator bar */}
        {data.isPlaying && (
          <div className="relative w-full h-0.5 bg-muted/50 overflow-hidden">
            <div className="h-full bg-[#d51007] animate-scrobble" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
