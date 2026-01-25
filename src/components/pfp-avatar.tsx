"use client";

import { useState } from "react";
import Image from "next/image";

const PFP_IMAGES = [
  "/herosection/profile.png",
  "/herosection/pfp/cap1.png",
  "/herosection/pfp/cap2.png",
  "/herosection/pfp/cap3.png",
  "/herosection/pfp/cap4.png",
  "/herosection/pfp/cap5.png",
];

export function PfpAvatar({ 
  width = 224, 
  height = 224,
}: {
  width?: number;
  height?: number;
}) {
  const [currentCapIndex, setCurrentCapIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const handleCapChange = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentCapIndex((prev) => (prev + 1) % PFP_IMAGES.length);
      setIsChanging(false);
    }, 150);
  };

  return (
    <div 
      className="relative cursor-pointer group"
      onClick={handleCapChange}
    >
      <div className={`transition-all duration-300 ${isChanging ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}>
        <Image
          alt="Priyanshu"
          src={PFP_IMAGES[currentCapIndex]}
          width={width}
          height={height}
          className="object-contain w-full h-full"
          priority
        />
      </div>
    </div>
  );
}
