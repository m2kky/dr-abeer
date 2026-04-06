"use client";

import { RefObject } from "react";

interface HeroPanelProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function HeroPanel({ canvasRef }: HeroPanelProps) {
  return (
    <div className="h-panel" id="hero-panel" style={{ direction: "ltr" }}>
      {/* Canvas container - LEFT side, will animate to center on scroll */}
      <div
        className="hero-canvas-wrapper"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "42%",
          height: "100%",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0,
          }}
        />
      </div>

      {/* Text content - RIGHT side */}
      <div
        className="hero-text-block"
        style={{
          direction: "rtl",
          position: "absolute",
          right: 0,
          top: 0,
          width: "58%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingRight: "2vw",
          paddingLeft: "4vw",
          zIndex: 2,
        }}
      >
        {/* Main Arabic heading */}
        <div className="hero-word-row overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            بناء
          </span>
        </div>

        <div className="hero-education-line">
          {/* English tagline - slides in from right, pushes التعليم */}
          <div className="hero-english-row overflow-hidden">
            <span
              className="hero-english font-en"
              style={{
                fontSize: "clamp(0.65rem, 1.2vw, 1.1rem)",
                letterSpacing: "0.15em",
                color: "var(--foreground)",
                textTransform: "uppercase",
              }}
            >
              Over 20 Years
              <br />
              Helping
            </span>
          </div>

          <div className="hero-word-row overflow-hidden">
            <span
              className="hero-word hero-word--education"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
            >
              التعليم
            </span>
          </div>
        </div>

        <div className="hero-word-row overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            ودعم
          </span>
        </div>

        <div className="hero-word-row overflow-hidden">
          <span
            className="hero-word hero-word--human"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            الإنسان
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator font-en">
        <span
          className="uppercase tracking-[0.2em]"
          style={{ fontSize: "0.65rem", color: "var(--muted)" }}
        >
          Scroll to discover
        </span>
      </div>
    </div>
  );
}
