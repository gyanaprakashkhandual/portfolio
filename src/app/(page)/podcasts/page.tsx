'use client'
import { Video } from "@/ui/data/video/Video.ui";
import React from "react";

export default function Page() {
  return (
    <div>
      <Video
        src="https://www.youtube.com/watch?v=GseIll1CB4E&list=RDzCG33YzKA-E&index=2"
        thumbnailUrl="https://res.cloudinary.com/dvytvjplt/image/upload/v1765866608/profile_pricture_oemv94.jpg"
        title="My Video Title"
        size="lg" // sm | md | lg | xl | full
        showTitle
        autoPlay={false}
        loop={false}
        muted={false}
        initialVolume={0.8}
        qualities={["auto", "1080p", "720p", "480p", "360p"]}
        tracks={[
          {
            kind: "subtitles",
            src: "/subs/en.vtt",
            srclang: "en",
            label: "English",
            default: true,
          },
        ]}
        minWidth="320px"
        maxWidth="960px"
        minHeight="180px"
        className="rounded-2xl shadow-2xl" // override root
        videoClassName="rounded-xl" // override <video>
        controlsClassName="px-4" // override controls bar
        onPlay={() => console.log("play")}
        onPause={() => console.log("pause")}
        onEnded={() => console.log("ended")}
        onTimeUpdate={(t, d) => console.log(t, d)}
        onVolumeChange={(vol, muted) => {}}
        onQualityChange={(q) => {}}
        onFullscreenChange={(fs) => {}}
      />
    </div>
  );
}
