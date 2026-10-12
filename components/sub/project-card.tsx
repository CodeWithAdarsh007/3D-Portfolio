// Project card with full-screen preview modal
"use client";

import { useState } from "react";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import { LiveSiteViewer } from "./LiveSiteViewer";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
}: ProjectCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const openModal = () => {
    setPreviewOpen(true);
  };

  const closeModal = () => {
    setPreviewOpen(false);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal();
        }
      }}
      className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] cursor-pointer hover:border-[#7042f8] transition-colors"
    >
      <LiveSiteViewer
        url={link}
        title={title}
        imageFallback={src}
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>

      <ProjectPreviewModal
        isOpen={previewOpen}
        onClose={closeModal}
        url={link}
        title={title}
      />
    </div>
  );
};
