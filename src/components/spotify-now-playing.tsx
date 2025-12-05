"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

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
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

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
        className="flex flex-col gap-2 mt-4 w-full"
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FaSpotify className="size-3 text-[#1DB954]" />
          <span className="font-medium">Loading...</span>
        </div>
      </motion.div>
    );
  }

  // Always show widget, even if no data
  if (!data?.title) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mt-4 w-full"
      >
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FaSpotify className="size-3 text-[#1DB954]" />
          <span className="font-medium">Not Playing</span>
        </div>
      </motion.div>
    );
  }

  const statusText = data.isPlaying ? "Now Playing" : "Last Played";
  const progressPercent = data.duration ? (currentProgress / data.duration) * 100 : 0;
  const showProgress = data.isPlaying && data.duration; // Only show progress bar when playing

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 mt-4 w-full"
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <FaSpotify className="size-3 text-[#1DB954]" />
        <span className="font-medium">{statusText}</span>
      </div>
      
      <Link
        href={data.songUrl!}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-black/5 via-black/5 to-black/10 dark:from-white/5 dark:via-white/5 dark:to-white/10 hover:from-black/10 hover:via-black/10 hover:to-black/15 dark:hover:from-white/10 dark:hover:via-white/10 dark:hover:to-white/15 transition-all duration-300 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl"
      >
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="relative size-16 rounded-lg overflow-hidden shrink-0 shadow-md">
            <Image
              src={data.albumImageUrl!}
              alt={data.album!}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Song Info */}
          <div className="flex flex-col justify-center flex-1 min-w-0 gap-1">
            <span className="text-sm font-bold truncate text-foreground group-hover:text-[#1DB954] transition-colors leading-tight">
              {data.title}
            </span>
            <span className="text-xs text-muted-foreground truncate leading-tight">
              {data.artist}
            </span>
          </div>
        </div>
        
        {/* Progress Bar with Time - Only show when playing */}
        {showProgress && (
          <div className="flex flex-col gap-1">
            <div className="relative w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-visible group/progress">
              <div 
                className="h-full bg-white dark:bg-white rounded-full transition-all duration-300 relative"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              >
                {/* Progress Dot */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white dark:bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-muted-foreground/70">
              <span>{data.duration ? formatTime(currentProgress) : '0:00'}</span>
              <span>{data.duration ? formatTime(data.duration) : '0:00'}</span>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
