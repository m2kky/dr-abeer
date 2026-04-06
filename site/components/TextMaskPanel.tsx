"use client";

import { RefObject } from "react";

interface TextMaskPanelProps {
  textMaskRef: RefObject<HTMLDivElement | null>;
}

export default function TextMaskPanel({ textMaskRef }: TextMaskPanelProps) {
  return (
    <div
      className="h-panel"
      id="textmask-panel"
      style={{ isolation: "isolate" }}
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/sda.mp4" type="video/mp4" />
      </video>

      {/* Text Mask Overlay */}
      <div className="text-mask-overlay">
        <div
          ref={textMaskRef}
          className="text-mask-text"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          من هنا تبدأ المسؤولية.
        </div>
      </div>
    </div>
  );
}
