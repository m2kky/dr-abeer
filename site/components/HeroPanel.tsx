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
          width: "45%",
          height: "100%",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          width: "55%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingRight: "5vw",
          paddingLeft: "2vw",
          zIndex: 2,
        }}
      >
        {/* Main Arabic heading */}
        <div className="overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            بناء
          </span>
        </div>

        <div className="overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            التعليم
          </span>
        </div>

        {/* English tagline - slides in from right, pushes التعليم */}
        <div className="overflow-hidden my-1">
          <span
            className="hero-english font-en text-muted"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.3rem)", letterSpacing: "0.1em" }}
          >
            Over 20 Years Helping
          </span>
        </div>

        <div className="overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            ودعم
          </span>
        </div>

        <div className="overflow-hidden">
          <span
            className="hero-word"
            style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          >
            الإنسان
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator font-en">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Scroll to discover
        </span>
      </div>
    </div>
  );
}
