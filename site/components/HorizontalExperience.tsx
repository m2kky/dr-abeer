"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroPanel from "./HeroPanel";
import MissionPanel from "./MissionPanel";
import TextMaskPanel from "./TextMaskPanel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 122;
const FRAME_PATH = (i: number) =>
  `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`;

export default function HorizontalExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);
  const textMaskDotRef = useRef<HTMLSpanElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Draw a specific frame index onto the canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images[index] || !images[index].complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const wrapper = canvas.parentElement;
    if (!wrapper) return;
    const wrapperW = wrapper.clientWidth;
    const wrapperH = wrapper.clientHeight;

    if (wrapperW === 0 || wrapperH === 0) return;

    if (canvas.width !== wrapperW || canvas.height !== wrapperH) {
      canvas.width = wrapperW;
      canvas.height = wrapperH;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image maintaining aspect ratio (contain), centered
    const img = images[index];
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawW: number, drawH: number, drawX: number, drawY: number;
    if (imgRatio < canvasRatio) {
      // Image is taller proportionally — fit to height
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      drawX = 0;
      drawY = 0;
    } else {
      // Image is wider proportionally — fit to width
      drawW = canvas.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload hero frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let firstLoaded = false;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      if (i === 1) {
        img.onload = () => {
          if (!firstLoaded) {
            firstLoaded = true;
            // Small delay to ensure wrapper has layout
            requestAnimationFrame(() => drawFrame(0));
          }
        };
      }
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const wordRows = gsap.utils.toArray<HTMLElement>(".hero-word-row");
      const humanWord = document.querySelector(
        ".hero-word--human"
      ) as HTMLElement | null;
      const canvasWrapper = document.querySelector(
        ".hero-canvas-wrapper"
      ) as HTMLElement;
      const textBlock = document.querySelector(
        ".hero-text-block"
      ) as HTMLElement;
      const vw = window.innerWidth;
      const totalPanels = 3;
      const scrollDistance = vw * (totalPanels - 1);
      const wordRowHeights = wordRows.map((row) => row.scrollHeight);

      // ── Scroll geometry ──
      const hScrollLen = scrollDistance * 0.85;
      const textEl = textMaskRef.current;
      const textMaskOverlayEl = document.querySelector(
        ".text-mask-overlay"
      ) as HTMLElement | null;

      // Measure text width to calculate horizontal translation
      let textTranslateLen = 0;
      let translateDistance = 0;
      let scaleOriginX = 0;
      let scaleOriginY: number | string = "50%";
      if (textEl) {
        // Hard reset any previous vertical transforms before measuring.
        gsap.set(textEl, { x: 0, y: 0, yPercent: 0, scale: 1 });
        const textWidth = textEl.scrollWidth;
        const textRect = textEl.getBoundingClientRect();
        const overlayRect = textMaskOverlayEl?.getBoundingClientRect();
        const dotEl =
          textMaskDotRef.current ??
          (textEl.querySelector(".text-mask-dot") as HTMLSpanElement | null);
        const dotRect = dotEl?.getBoundingClientRect();

        // Measure the actual center of the final dot inside the text.
        const measuredDotCenterX = dotRect
          ? dotRect.left + (dotRect.width / 2) - textRect.left
          : 0;
        const dotCenterOffset = Math.min(
          textWidth,
          Math.max(0, measuredDotCenterX)
        );
        const measuredDotCenterY = dotRect
          ? dotRect.top + (dotRect.height / 2) - textRect.top
          : textRect.height / 2;
        if (dotRect) {
          scaleOriginY = Math.max(
            0,
            dotRect.top + (dotRect.height / 2) - textRect.top
          );
        } else {
          scaleOriginY = measuredDotCenterY;
        }

        // Vertically center the dot itself in the viewport.
        const overlayHalfHeight = overlayRect
          ? overlayRect.height / 2
          : window.innerHeight / 2;
        gsap.set(textEl, { top: overlayHalfHeight - measuredDotCenterY });

        translateDistance = Math.max(0, textWidth - dotCenterOffset - vw / 2);
        textTranslateLen = translateDistance > 0 ? Math.max(vw, translateDistance) : 0;
        scaleOriginX = dotCenterOffset;
      }

      const scaleLen = vw * 0.8;
      const totalPinLen = hScrollLen + textTranslateLen + scaleLen;

      // ── Initial states ──
      gsap.set(wordRows, { height: 0 });
      gsap.set(words, { yPercent: 115, opacity: 1 });
      if (textBlock) {
        // Keep heading anchored to the right from first paint.
        gsap.set(textBlock, { xPercent: 0, x: 0 });
      }
      gsap.set(".hero-english", { opacity: 0, x: 60 });
      gsap.set(".scroll-indicator", { opacity: 0 });
      gsap.set(canvasRef.current, { opacity: 0 });

      // Container starts shifted LEFT to show the Hero panel (rightmost)
      gsap.set(inner, { x: -scrollDistance });

      document.body.classList.add("is-loading");

      // ── PHASE 1: Intro Animation (~3s) ──
      const introTl = gsap.timeline({
        delay: 0.4,
        onComplete: () => {
          document.body.classList.remove("is-loading");
          requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
          });
        },
      });

      // 1a. Arabic words enter from below, each one pushes previous lines up.
      const wordStepInterval = 0.72;
      const wordRevealDuration = 0.58;
      introTl.addLabel("wordsStart");
      wordRows.forEach((row, index) => {
        const word = words[index];
        if (!word) return;
        const stepAt = `wordsStart+=${index * wordStepInterval}`;
        introTl.to(
          row,
          {
            height: wordRowHeights[index],
            duration: 0.34,
            ease: "power2.out",
          },
          stepAt
        );
        introTl.to(
          word,
          { yPercent: 0, duration: wordRevealDuration, ease: "power3.out" },
          stepAt
        );
      });

      // 1b. Compute reveal timing for the follow-up English line.
      const wordsRevealTotal =
        (Math.max(0, wordRows.length - 1) * wordStepInterval) + wordRevealDuration;

      // 1c. English tagline slides in from the right, nudges "الإنسان", and starts frame reveal.
      const englishInAt = `wordsStart+=${wordsRevealTotal + 0.68}`;
      introTl.add(() => drawFrame(0), englishInAt);
      introTl.to(
        ".hero-english",
        { x: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        englishInAt
      );
      if (humanWord) {
        introTl.to(
          humanWord,
          { xPercent: -6, duration: 0.22, ease: "power2.out" },
          `${englishInAt}+=0.02`
        );
        introTl.to(
          humanWord,
          { xPercent: 0, duration: 0.24, ease: "power2.inOut" },
          `${englishInAt}+=0.24`
        );
      }
      introTl.to(
        canvasRef.current,
        { opacity: 1, duration: 0.9, ease: "power2.out" },
        englishInAt
      );

      // 1d. Scroll indicator
      introTl.to(
        ".scroll-indicator",
        { opacity: 1, duration: 0.5 },
        `${englishInAt}+=0.5`
      );

      // ── PHASE 2: Scroll-driven sub-animations ──

      const hRatio = hScrollLen / totalPinLen;
      const textRatio = textTranslateLen / totalPinLen;
      const scaleRatio = scaleLen / totalPinLen;

      // 2a. Frame sequence (first 30% of horizontal scroll)
      const frameProxy = { frame: 0 };
      gsap.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        snap: { frame: 1 },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${hScrollLen * 0.3}`,
          scrub: 0.8,
        },
        onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
      });

      // 2b. Canvas wrapper moves from LEFT toward CENTER
      if (canvasWrapper) {
        gsap.to(canvasWrapper, {
          left: "27.5%",
          width: "45%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${hScrollLen * 0.4}`,
            scrub: 0.8,
          },
        });
      }

      // 2c. Text block pushed to the right and fades
      if (textBlock) {
        gsap.to(textBlock, {
          x: "30%",
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${hScrollLen * 0.25} top`,
            end: () => `top+=${hScrollLen * 0.45} top`,
            scrub: 0.8,
          },
        });
      }

      // 2d. Scroll indicator fades out immediately
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      // ── PHASE 3: Master pinned timeline ──
      // 3 phases: horizontal panel scroll → text translate → scale reveal
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalPinLen}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // A) Horizontal panel scroll (0 → hRatio)
      masterTl.to(
        inner,
        { x: 0, ease: "none", duration: hRatio },
        0
      );

      // B) Text translation then zoom
      if (textEl) {
        if (translateDistance > 0) {
          masterTl.to(
            textEl,
            { x: translateDistance, ease: "none", duration: textRatio },
            hRatio
          );
        }

        // Zoom starts exactly after the final dot reaches center.
        const originY =
          typeof scaleOriginY === "number" ? `${scaleOriginY}px` : scaleOriginY;
        gsap.set(textEl, { transformOrigin: `${scaleOriginX}px ${originY}` });
        masterTl.to(
          textEl,
          { scale: 80, ease: "power2.in", duration: scaleRatio },
          hRatio + textRatio
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="h-scroll-section"
      style={{ direction: "ltr" }}
    >
      <div ref={innerRef} className="h-scroll-inner">
        {/* REVERSED ORDER: TextMask → Mission → Hero (RTL scroll direction) */}
        <div
          className="scroll-panel w-screen h-screen shrink-0 overflow-hidden relative"
          style={{ direction: "rtl" }}
        >
          <TextMaskPanel
            textMaskRef={textMaskRef}
            textMaskDotRef={textMaskDotRef}
          />
        </div>
        <div
          className="scroll-panel w-screen h-screen shrink-0 overflow-hidden relative"
          style={{ direction: "rtl" }}
        >
          <MissionPanel />
        </div>
        <div className="scroll-panel w-screen h-screen shrink-0 overflow-hidden relative">
          <HeroPanel canvasRef={canvasRef} />
        </div>
      </div>
    </section>
  );
}
