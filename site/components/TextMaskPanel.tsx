"use client";

import { RefObject } from "react";

interface TextMaskPanelProps {
  textMaskRef: RefObject<HTMLDivElement | null>;
  textMaskDotRef: RefObject<HTMLSpanElement | null>;
}

export default function TextMaskPanel({
  textMaskRef,
  textMaskDotRef,
}: TextMaskPanelProps) {
  return (
    <div
      className="h-panel text-mask-panel"
      id="textmask-panel"
      style={{ isolation: "isolate" }}
    >
      {/* Background video plays behind the mask */}
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

      {/* White text reveals the video through multiply blending */}
      <div className="text-mask-overlay">
        <div ref={textMaskRef} className="text-mask-text">
          <span>من هنا تبدأ المسؤولية</span>
          <span ref={textMaskDotRef} className="text-mask-dot" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
