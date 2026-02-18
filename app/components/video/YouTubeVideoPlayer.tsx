// components/YouTubeVideoPlayer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface YouTubeVideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  title?: string;
  autoPlay?: boolean;
}

const getYoutubeId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const YouTubeVideoPlayer: React.FC<YouTubeVideoPlayerProps> = ({
  videoUrl,
  thumbnail,
  title,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoId = getYoutubeId(videoUrl);

  if (!videoId) return null;

  return (
    <div className="w-full group">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-xl">
        {!isPlaying ? (
          <>
            {/* Thumbnail with Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
            {/* || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` */}
            <Image
              src={`${thumbnail}`}
              alt={title || "YouTube Video"}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              // onError={(e) => {
              //   const target = e.target as HTMLImageElement;
              //   target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              // }}
            />
            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="relative">
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-red-600/30 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping animation-delay-300" />

                {/* Main Play Button */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-r from-red-600 to-red-500 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
                </div>
              </div>
            </button>
            {/* Title Overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-lg">
                  {title}
                </h3>
              </div>
            )}
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
