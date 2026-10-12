// Live preview modal for full-screen iframe viewing
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  fallbackImage?: string;
}

export const ProjectPreviewModal = ({
  isOpen,
  onClose,
  url,
  title,
}: ProjectPreviewModalProps) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIframeLoaded(true);
    } else {
      document.body.style.overflow = "";
      setIframeLoaded(false);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const hostname = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-[92vw] h-[88vh] max-w-[1400px] max-h-[900px] flex flex-col overflow-hidden rounded-lg border border-[#2A0E61] bg-[#0d0620]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-3 h-10 shrink-0 bg-[#1a0b3a] border-b border-[#2A0E61]">
              {/* Traffic lights */}
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              {/* URL bar */}
              <div className="flex-1 bg-[#0f0f1a] rounded px-2 py-0.5 text-xs text-gray-400 font-mono truncate">
                {hostname}
              </div>
              {/* Buttons */}
              <button
                onClick={() => window.location.reload()}
                className="p-1 hover:bg-[#7042f8] rounded transition text-gray-400 hover:text-white"
                title="Refresh"
              >
                ↺
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-1 bg-[#7042f8] text-white text-xs rounded-full hover:bg-[#5a35c9] transition"
              >
                Open in new tab ↗
              </a>
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1 hover:bg-[#7042f8] rounded transition text-gray-400 hover:text-white"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 relative overflow-hidden bg-white">
              {iframeLoaded && (
                <iframe
                  src={url}
                  title={title}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
