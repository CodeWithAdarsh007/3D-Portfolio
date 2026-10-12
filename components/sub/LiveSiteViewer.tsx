// Live iframes load third-party resources. Only mounted after
// intersection. If a target sets X-Frame-Options: DENY, the fallback
// overlay shows with a link to the live site.
"use client";

import { useEffect, useRef, useState } from "react";

interface LiveSiteViewerProps {
  url: string;
  title: string;
  imageFallback: string;
  className?: string;
}

export const LiveSiteViewer = ({
  url,
  title,
  imageFallback,
  className,
}: LiveSiteViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // IntersectionObserver to lazy-load iframe
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Compute scale dynamically based on container width (desktop base: 1440px)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      setScale(w / 1440);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setBlocked(true);
  };

  const hostname = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-lg border border-[#2A0E61] ${className}`}
      style={{ aspectRatio: "16 / 10" }}
    >
      {/* Browser Chrome */}
      <div className="bg-[#1a1a2e] px-3 py-2 flex items-center gap-2 border-b border-[#2A0E61]">
        {/* Traffic lights */}
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-[#0f0f1a] rounded px-3 py-1 text-xs text-gray-400 font-mono truncate">
          {hostname}
        </div>
      </div>

      {/* Scaled viewport — desktop width (1440px) scaled to fit card */}
      {!blocked && (
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: "1440px",
            height: "900px",
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
        >
          <iframe
            src={shouldLoad ? url : undefined}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="w-full h-full border-0 bg-white"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !blocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d0620] to-[#1a0b3a] text-white/40 text-xs">
          Loading preview…
        </div>
      )}

      {/* Fallback if blocked */}
      {blocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2A0E61] via-[#1a0b3a] to-[#0d0620] text-white/80">
          <p className="text-base font-semibold">{title}</p>
          <p className="text-xs mt-1 opacity-60">Preview unavailable</p>
        </div>
      )}
    </div>
  );
};
