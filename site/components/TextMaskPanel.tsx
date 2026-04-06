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
      {/* Cinematic gradient background (fallback when video is missing) */}
      <div className="textmask-bg-gradient" />

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
