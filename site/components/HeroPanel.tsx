"use client";

import { RefObject } from "react";

interface HeroPanelProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function HeroPanel({ canvasRef }: HeroPanelProps) {
  return (
    <div className="h-panel" id="hero-panel" style={{ direction: "ltr" }}>
      {/* Canvas container - LEFT side, will animate to center on scroll */}
      <div className="hero-canvas-wrapper">
        <canvas ref={canvasRef} className="hero-canvas" />
      </div>

      {/* Text content - RIGHT side */}
      <div className="hero-text-block">
        {/* Main Arabic heading */}
        <div className="hero-word-row overflow-hidden">
          <span className="hero-word">
            بناء
          </span>
        </div>

        <div className="hero-education-line">
          {/* English tagline - slides in from right, pushes التعليم */}
          <div className="hero-english-row overflow-hidden">
            <span className="hero-english font-en">
              Over 20 Years
              <br />
              Helping
            </span>
          </div>

          <div className="hero-word-row overflow-hidden">
            <span className="hero-word hero-word--education">
              التعليم
            </span>
          </div>
        </div>

        <div className="hero-word-row overflow-hidden">
          <span className="hero-word">
            ودعم
          </span>
        </div>

        <div className="hero-word-row overflow-hidden">
          <span className="hero-word hero-word--human">
            الإنسان
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator font-en">
        <span className="scroll-indicator__text uppercase tracking-[0.2em]">
          Scroll to discover
        </span>
      </div>
    </div>
  );
}
