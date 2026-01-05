"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import { Play, Pause } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  playedAt?: string;
  progress?: number;
  duration?: number;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        
        // Always set the data from server (includes cached data)
        setData(json);
        
        if (json.progress !== undefined) {
          setCurrentProgress(json.progress);
        }
      } catch (error) {
        console.error("Error fetching Spotify data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Poll every 2 seconds for faster updates

    return () => clearInterval(interval);
  }, []);

  // Update progress in real-time when playing
  useEffect(() => {
    if (!data?.isPlaying || !data.progress || !data.duration) return;

    setCurrentProgress(data.progress);
    
    const progressInterval = setInterval(() => {
      setCurrentProgress((prev) => {
        const newProgress = prev + 1000; // Add 1 second
        if (newProgress >= data.duration!) {
          return data.duration!;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [data?.isPlaying, data?.progress, data?.duration]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show loading state instead of hiding completely
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-sm">
          <div className="relative size-14 rounded-md overflow-hidden shrink-0 bg-muted animate-pulse" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 bg-muted rounded animate-pulse w-16" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      </motion.div>
    );
  }

  // If no song data at all, show placeholder
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

  const statusText = data.isPlaying ? "Now Playing" : "Last played";
  const progressPercent = data.duration ? (currentProgress / data.duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="relative rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <a
          href={data.songUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 p-3 hover:bg-accent/30 transition-all duration-300"
        >
          {/* Album Art */}
          <div className="relative size-12 rounded-md overflow-hidden shrink-0">
            <Image
              src={data.albumImageUrl!}
              alt={data.album!}
              fill
              sizes="48px"
              loading="eager"
              className="object-cover"
            />
            {/* Spotify Icon Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaSpotify className="size-5 text-[#1DB954]" />
            </div>
          </div>
          
          {/* Song Info */}
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

          {/* Play/Pause Button */}
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

        {/* Progress Bar - Always visible but only active when playing */}
        <div className="relative w-full h-1 bg-muted/50">
          <div 
            className="h-full bg-foreground transition-all duration-300"
            style={{ width: data.isPlaying ? `${Math.min(progressPercent, 100)}%` : '0%' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
