"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching Spotify data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (!data?.isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 mt-4"
    >
      <Link
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-black/5 dark:border-white/5 backdrop-blur-sm"
      >
        <div className="relative size-8 rounded-full overflow-hidden shrink-0 animate-spin-slow">
            <Image
                src={data.albumImageUrl}
                alt={data.album}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex flex-col justify-center max-w-[200px]">
          <span className="text-xs font-medium truncate text-foreground">
            {data.title}
          </span>
          <span className="text-[10px] text-muted-foreground truncate">
            {data.artist}
          </span>
        </div>
        <FaSpotify className="size-5 text-[#1DB954] shrink-0 ml-1" />
      </Link>
    </motion.div>
  );
}
