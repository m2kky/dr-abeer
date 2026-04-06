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
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    } else {
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
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      images.push(img);
    }
    imagesRef.current = images;

    // Once first frame loads, draw it
    images[0].onload = () => drawFrame(0);
  }, [drawFrame]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      if (!section || !inner) return;

      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const canvasWrapper = document.querySelector(".hero-canvas-wrapper") as HTMLElement;
      const textBlock = document.querySelector(".hero-text-block") as HTMLElement;
      const vw = window.innerWidth;
      const totalPanels = 3;
      const maxX = vw * (totalPanels - 1);

      // ── Initial states ──
      gsap.set(words, { y: "110%", opacity: 0 });
      gsap.set(".hero-english", { opacity: 0, x: 60 });
      gsap.set(".scroll-indicator", { opacity: 0 });
      gsap.set(canvasRef.current, { opacity: 0 });

      // Container starts shifted LEFT to show the Hero panel (rightmost)
      gsap.set(inner, { x: -maxX });

      document.body.classList.add("is-loading");

      // ── PHASE 1: Intro Animation (~3s) ──
      const introTl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          document.body.classList.remove("is-loading");
          ScrollTrigger.refresh();
        },
      });

      // 1a. Arabic words reveal one by one (RIGHT side)
      introTl.to(words, {
        y: "0%",
        opacity: 1,
        stagger: 0.18,
        duration: 0.7,
        ease: "power3.out",
      });

      // 1b. "Over 20 Years Helping" slides in from RIGHT
      introTl.to(
        ".hero-english",
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // 1c. Canvas fades in with first frame (LEFT side)
      introTl.add(() => drawFrame(0), "-=0.3");
      introTl.to(
        canvasRef.current,
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

      // 1d. Scroll indicator
      introTl.to(".scroll-indicator", { opacity: 1, duration: 0.4 }, "-=0.2");

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
          end: () => `+=${maxX * 0.3}`,
          scrub: 1,
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
            end: () => `+=${maxX * 0.4}`,
            scrub: 1,
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
            start: () => `top+=${maxX * 0.25} top`,
            end: () => `top+=${maxX * 0.45} top`,
            scrub: 1,
          },
        });
      }

      // 2d. Scroll indicator fades out immediately
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300",
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
          end: () => `+=${maxX}`,
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
            scale: 25,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${maxX * 0.75} top`,
              end: () => `top+=${maxX} top`,
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="h-scroll-section" style={{ direction: "ltr" }}>
      <div ref={innerRef} className="h-scroll-inner">
        {/* REVERSED ORDER: TextMask → Mission → Hero */}
        <div className="scroll-panel w-screen h-screen shrink-0" style={{ direction: "rtl" }}>
          <TextMaskPanel textMaskRef={textMaskRef} />
        </div>
        <div className="scroll-panel w-screen h-screen shrink-0" style={{ direction: "rtl" }}>
          <MissionPanel />
        </div>
        <div className="scroll-panel w-screen h-screen shrink-0">
          <HeroPanel canvasRef={canvasRef} />
        </div>
      </div>
    </section>
  );
}
