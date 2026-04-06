"use client";

import { RefObject } from "react";

const VIDEO_SRC =
  "/freepik_a-smooth-cinematic-video-of-the-same-woman-from-the-reference-image-maintaining-identical-facial-features-and-identity-sitting-on-a-simple-wooden-chair-body-slightly-turned-at-a-34-angle-_0001.mp4";

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
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Text Mask Overlay */}
      <div className="text-mask-overlay">
        <div
          ref={textMaskRef}
          className="text-mask-text"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
        >
          من هنا تبدأ المسؤولية.
        </div>
      </div>
    </div>
  );
}
