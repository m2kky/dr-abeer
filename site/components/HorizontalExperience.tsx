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
      drawX = (canvas.width - drawW) / 2;
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
      const canvasWrapper = document.querySelector(
        ".hero-canvas-wrapper"
      ) as HTMLElement;
      const textBlock = document.querySelector(
        ".hero-text-block"
      ) as HTMLElement;
      const vw = window.innerWidth;
      const totalPanels = 3;
      const scrollDistance = vw * (totalPanels - 1);

      // ── Initial states ──
      gsap.set(words, { y: "110%", opacity: 0 });
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
          // Allow time for layout to settle before refreshing ScrollTrigger
          requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
          });
        },
      });

      // 1a. Arabic words reveal one by one (RIGHT side)
      introTl.to(words, {
        y: "0%",
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });

      // 1b. "Over 20 Years Helping" slides in from RIGHT
      introTl.to(
        ".hero-english",
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.15"
      );

      // 1c. Canvas fades in with first frame (LEFT side)
      introTl.add(() => drawFrame(0), "-=0.4");
      introTl.to(
        canvasRef.current,
        { opacity: 1, duration: 0.9, ease: "power2.out" },
        "-=0.4"
      );

      // 1d. Scroll indicator
      introTl.to(
        ".scroll-indicator",
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

      // ── PHASE 2: Scroll-driven animations ──

      // 2a. Frame sequence (first 30% of scroll)
      const frameProxy = { frame: 0 };
      gsap.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        snap: { frame: 1 },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance * 0.3}`,
          scrub: 0.8,
        },
        onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
      });

      // 2b. Canvas wrapper moves from LEFT (0%) toward CENTER (first 40%)
      if (canvasWrapper) {
        gsap.to(canvasWrapper, {
          left: "27.5%",
          width: "45%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance * 0.4}`,
            scrub: 0.8,
          },
        });
      }

      // 2c. Text block pushed to the right and fades (25%-45% of scroll)
      if (textBlock) {
        gsap.to(textBlock, {
          x: "30%",
          opacity: 0,
          ease: "power1.in",
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${scrollDistance * 0.25} top`,
            end: () => `top+=${scrollDistance * 0.45} top`,
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

      // ── PHASE 3: Main horizontal scroll ──
      gsap.to(inner, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Text mask scale (last 25%)
      if (textMaskRef.current) {
        gsap.fromTo(
          textMaskRef.current,
          { scale: 1 },
          {
            scale: 20,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${scrollDistance * 0.78} top`,
              end: () => `top+=${scrollDistance} top`,
              scrub: 1,
            },
          }
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
          className="scroll-panel w-screen h-screen shrink-0"
          style={{ direction: "rtl" }}
        >
          <TextMaskPanel textMaskRef={textMaskRef} />
        </div>
        <div
          className="scroll-panel w-screen h-screen shrink-0"
          style={{ direction: "rtl" }}
        >
          <MissionPanel />
        </div>
        <div className="scroll-panel w-screen h-screen shrink-0">
          <HeroPanel canvasRef={canvasRef} />
        </div>
      </div>
    </section>
  );
}
