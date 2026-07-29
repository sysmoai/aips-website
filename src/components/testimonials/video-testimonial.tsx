"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoTestimonialProps {
  name: string;
  role: string;
  videoUrl: string;
  thumbnailUrl?: string;
  text?: string;
}

export function VideoTestimonial({
  name,
  role,
  videoUrl,
  thumbnailUrl,
  text,
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden group">
      {/* Video container */}
      <div className="relative aspect-video bg-white/[0.02] border-b border-white/[0.06]">
        {!isPlaying ? (
          <>
            {/* Thumbnail or placeholder */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#f4b942]/10 to-[#f4b942]/5"
              style={{
                backgroundImage: thumbnailUrl
                  ? `url(${thumbnailUrl})`
                  : "linear-gradient(135deg, rgba(244, 185, 66, 0.1) 0%, rgba(244, 185, 66, 0.05) 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Play button overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
              aria-label={`Play video testimonial from ${name}`}
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-[#f4b942] text-[#0a0e27] shadow-lg hover:shadow-xl transition-shadow">
                <Play className="size-6 fill-current" />
              </div>
            </button>
          </>
        ) : (
          <div className="absolute inset-0">
            {/* YouTube embed */}
            {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
              <iframe
                title={`Video testimonial from ${name}`}
                className="w-full h-full"
                src={videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Generic video player for other video URLs */
              <video
                autoPlay
                controls
                className="w-full h-full bg-black"
                title={`Video testimonial from ${name}`}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>

      {/* Testimonial info */}
      <div className="p-5">
        {text && (
          <p className="text-[0.8125rem] leading-relaxed text-[#8a91a8] mb-4">
            &ldquo;{text}&rdquo;
          </p>
        )}
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f4b942]/30 to-[#f4b942]/10 text-[0.75rem] font-bold text-[#f4b942]">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-[0.8125rem] font-semibold text-white">{name}</p>
            <p className="text-[0.6875rem] text-[#5b6280]">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
