"use client";

import React from "react";

interface YoutubeVideoPlayerProps {
  url: string | undefined;
  title?: string;
}

const getYoutubeEmbedUrl = (url: string) => {
  try {
    const videoId = url.includes("youtu.be/")
      ? url.split("youtu.be/")[1]
      : url.split("v=")[1]?.split("&")[0];

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return "";
  }
};

const YoutubeVideoPlayer: React.FC<YoutubeVideoPlayerProps> = ({
  url,
  title = "University Video",
}) => {
  const embedUrl = getYoutubeEmbedUrl(url!);

  if (!embedUrl) {
    return <p className="text-red-500">Invalid YouTube URL</p>;
  }

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YoutubeVideoPlayer;
