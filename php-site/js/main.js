/**
 * Dr. Abeer Attalla — Main Animations
 * Vanilla JS + GSAP (ported from React/Next.js)
 */

(function () {
  "use strict";

  const TOTAL_FRAMES = 122;
  const FRAME_PATH = (i) =>
    `assets/hero-frames/frame_${String(i).padStart(4, "0")}.webp`;

  // ── Detect mobile (no horizontal scroll) ──
  const isMobile = () => window.innerWidth <= 768;

  // ── Utility: wait for DOM ──
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initHeroFrames();
    if (isMobile()) {
      initMobileAnimations();
    } else {
      initDesktopHorizontalScroll();
    }
    initIntroReveal();
    initTimeline();
  });

  /* ══════════════════════════════════════════════
     HERO FRAME SEQUENCE
     ══════════════════════════════════════════════ */

  const images = [];
  let heroCanvas, heroCtx;

  function drawFrame(index) {
    if (!heroCanvas || !images[index] || !images[index].complete) return;
    if (!heroCtx) heroCtx = heroCanvas.getContext("2d");
    if (!heroCtx) return;

    const wrapper = heroCanvas.parentElement;
    if (!wrapper) return;
    const wW = wrapper.clientWidth;
    const wH = wrapper.clientHeight;
    if (wW === 0 || wH === 0) return;

    if (heroCanvas.width !== wW || heroCanvas.height !== wH) {
      heroCanvas.width = wW;
      heroCanvas.height = wH;
    }

    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

    const img = images[index];
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = heroCanvas.width / heroCanvas.height;

    let drawW, drawH, drawX, drawY;
    if (imgRatio < canvasRatio) {
      drawH = heroCanvas.height;
      drawW = drawH * imgRatio;
      drawX = 0;
      drawY = 0;
    } else {
      drawW = heroCanvas.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (heroCanvas.height - drawH) / 2;
    }

    heroCtx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  function initHeroFrames() {
    heroCanvas = document.getElementById("hero-canvas");
    if (!heroCanvas) return;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      if (i === 1) {
        img.onload = () => {
          requestAnimationFrame(() => drawFrame(0));
        };
      }
      images.push(img);
    }
  }

  /* ══════════════════════════════════════════════
     DESKTOP: Horizontal Scroll Experience
     ══════════════════════════════════════════════ */

  function initDesktopHorizontalScroll() {
    const section = document.getElementById("horizontal-experience");
    const inner = document.getElementById("h-scroll-inner");
    if (!section || !inner) return;

    const words = gsap.utils.toArray(".hero-word");
    const wordRows = gsap.utils.toArray(".hero-word-row");
    const humanWord = document.querySelector(".hero-word--human");
    const canvasWrapper = document.querySelector(".hero-canvas-wrapper");
    const textBlock = document.querySelector(".hero-text-block");
    const textEl = document.getElementById("text-mask-text");
    const textMaskDotEl = document.getElementById("text-mask-dot");
    const textMaskOverlayEl = document.querySelector(".text-mask-overlay");
    const vw = window.innerWidth;
    const totalPanels = 3;
    const scrollDistance = vw * (totalPanels - 1);
    const wordRowHeights = wordRows.map((row) => row.scrollHeight);

    // ── Scroll geometry ──
    const hScrollLen = scrollDistance * 0.85;

    let textTranslateLen = 0;
    let translateDistance = 0;
    let scaleOriginX = 0;
    let scaleOriginY = "50%";

    if (textEl) {
      gsap.set(textEl, { x: 0, y: 0, yPercent: 0, scale: 1 });
      const textWidth = textEl.scrollWidth;
      const textRect = textEl.getBoundingClientRect();
      const overlayRect = textMaskOverlayEl
        ? textMaskOverlayEl.getBoundingClientRect()
        : null;
      const dotEl = textMaskDotEl || textEl.querySelector(".text-mask-dot");
      const dotRect = dotEl ? dotEl.getBoundingClientRect() : null;

      const measuredDotCenterX = dotRect
        ? dotRect.left + dotRect.width / 2 - textRect.left
        : 0;
      const dotCenterOffset = Math.min(
        textWidth,
        Math.max(0, measuredDotCenterX)
      );
      const measuredDotCenterY = dotRect
        ? dotRect.top + dotRect.height / 2 - textRect.top
        : textRect.height / 2;

      if (dotRect) {
        scaleOriginY = Math.max(
          0,
          dotRect.top + dotRect.height / 2 - textRect.top
        );
      } else {
        scaleOriginY = measuredDotCenterY;
      }

      const overlayHalfHeight = overlayRect
        ? overlayRect.height / 2
        : window.innerHeight / 2;
      gsap.set(textEl, { top: overlayHalfHeight - measuredDotCenterY });

      translateDistance = Math.max(0, textWidth - dotCenterOffset - vw / 2);
      textTranslateLen =
        translateDistance > 0 ? Math.max(vw, translateDistance) : 0;
      scaleOriginX = dotCenterOffset;
    }

    const scaleLen = vw * 0.8;
    const totalPinLen = hScrollLen + textTranslateLen + scaleLen;

    // ── Initial states ──
    gsap.set(wordRows, { height: 0 });
    gsap.set(words, { yPercent: 115, opacity: 1 });
    if (textBlock) gsap.set(textBlock, { xPercent: 0, x: 0 });
    gsap.set(".hero-english", { opacity: 0, x: 60 });
    gsap.set(".scroll-indicator", { opacity: 0 });
    gsap.set(heroCanvas, { opacity: 0 });
    gsap.set(inner, { x: -scrollDistance });

    // ── PHASE 1: Intro Animation ──
    const introTl = gsap.timeline({
      delay: 0.4,
      onComplete: () => {
        document.body.classList.remove("is-loading");
        requestAnimationFrame(() => ScrollTrigger.refresh(true));
      },
    });

    const wordStepInterval = 0.72;
    const wordRevealDuration = 0.58;
    introTl.addLabel("wordsStart");

    wordRows.forEach((row, index) => {
      const word = words[index];
      if (!word) return;
      const stepAt = `wordsStart+=${index * wordStepInterval}`;
      introTl.to(
        row,
        { height: wordRowHeights[index], duration: 0.34, ease: "power2.out" },
        stepAt
      );
      introTl.to(
        word,
        { yPercent: 0, duration: wordRevealDuration, ease: "power3.out" },
        stepAt
      );
    });

    const wordsRevealTotal =
      Math.max(0, wordRows.length - 1) * wordStepInterval +
      wordRevealDuration;

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
      heroCanvas,
      { opacity: 1, duration: 0.9, ease: "power2.out" },
      englishInAt
    );
    introTl.to(
      ".scroll-indicator",
      { opacity: 1, duration: 0.5 },
      `${englishInAt}+=0.5`
    );

    // ── PHASE 2: Scroll-driven sub-animations ──
    const hRatio = hScrollLen / totalPinLen;
    const textRatio = textTranslateLen / totalPinLen;
    const scaleRatio = scaleLen / totalPinLen;

    // Frame sequence
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

    // Canvas wrapper moves toward center
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

    // Text block pushed right and fades
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

    // Scroll indicator fades
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

    masterTl.to(inner, { x: 0, ease: "none", duration: hRatio }, 0);

    if (textEl) {
      if (translateDistance > 0) {
        masterTl.to(
          textEl,
          { x: translateDistance, ease: "none", duration: textRatio },
          hRatio
        );
      }

      const originY =
        typeof scaleOriginY === "number" ? `${scaleOriginY}px` : scaleOriginY;
      gsap.set(textEl, {
        transformOrigin: `${scaleOriginX}px ${originY}`,
      });
      masterTl.to(
        textEl,
        { scale: 80, ease: "power2.in", duration: scaleRatio },
        hRatio + textRatio
      );
    }
  }

  /* ══════════════════════════════════════════════
     MOBILE: Vertical Stack Animations
     ══════════════════════════════════════════════ */

  function initMobileAnimations() {
    // Remove is-loading immediately on mobile
    document.body.classList.remove("is-loading");

    const words = gsap.utils.toArray(".hero-word");
    const wordRows = gsap.utils.toArray(".hero-word-row");

    // Show canvas immediately
    if (heroCanvas) {
      gsap.set(heroCanvas, { opacity: 1 });
      drawFrame(0);
    }

    // Animate words on load
    gsap.set(wordRows, { height: "auto" });
    gsap.set(words, { yPercent: 60, opacity: 0 });

    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });

    // English line
    gsap.set(".hero-english", { opacity: 0, y: 20 });
    gsap.to(".hero-english", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 1.2,
    });

    // Scroll indicator
    gsap.set(".scroll-indicator", { opacity: 0 });
    gsap.to(".scroll-indicator", {
      opacity: 1,
      duration: 0.5,
      delay: 1.5,
    });

    // Frame sequence on scroll (mobile)
    const heroSection = document.getElementById("horizontal-experience");
    if (heroSection) {
      const frameProxy = { frame: 0 };
      gsap.to(frameProxy, {
        frame: TOTAL_FRAMES - 1,
        snap: { frame: 1 },
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
      });
    }

    // Mission panel: fade-in on scroll
    const missionPanel = document.getElementById("mission-panel");
    if (missionPanel) {
      gsap.from(missionPanel, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: missionPanel,
          start: "top 85%",
        },
      });
    }

    // TextMask: just show it
    const textMaskText = document.getElementById("text-mask-text");
    if (textMaskText) {
      gsap.set(textMaskText, {
        fontSize: "28vw",
        top: "50%",
        transform: "translateY(-50%)",
      });
    }
  }

  /* ══════════════════════════════════════════════
     INTRO REVEAL SECTION
     ══════════════════════════════════════════════ */

  function initIntroReveal() {
    const section = document.getElementById("intro-reveal");
    if (!section) return;

    const words = gsap.utils.toArray(".intro-reveal-word");
    if (words.length === 0) return;

    gsap.set(words, {
      opacity: 0.12,
      yPercent: 28,
      filter: "blur(8px)",
    });

    gsap.to(words, {
      opacity: 1,
      yPercent: 0,
      filter: "blur(0px)",
      ease: "none",
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "bottom 35%",
        scrub: 1.2,
      },
    });

    gsap.fromTo(
      ".intro-reveal-kicker, .intro-reveal-note",
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      }
    );
  }

  /* ══════════════════════════════════════════════
     HORIZONTAL TIMELINE
     ══════════════════════════════════════════════ */

  function initTimeline() {
    const section = document.getElementById("timeline-section");
    const track = document.getElementById("timeline-track");
    const progressFill = document.getElementById("timeline-progress-fill");
    if (!section || !track || !progressFill) return;

    const slideEls = gsap.utils.toArray(".story-slide");
    const yearMarkers = gsap.utils.toArray(".story-year-marker");

    if (slideEls.length === 0) return;

    const shiftX = Math.max(0, track.scrollWidth - window.innerWidth);
    const totalPin = shiftX + window.innerWidth * 0.8;

    gsap.set(track, { x: 0 });
    gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

    function syncActive(progress) {
      const activeIndex = Math.min(
        slideEls.length - 1,
        Math.max(0, Math.round(progress * (slideEls.length - 1)))
      );

      // Get the year from the data attribute or computed value
      const activeSlideEl = slideEls[activeIndex];
      const bgYearEl = activeSlideEl
        ? activeSlideEl.querySelector(".story-slide__bg-year")
        : null;
      const activeYear = bgYearEl ? parseInt(bgYearEl.textContent) : 0;

      slideEls.forEach((el, i) => {
        el.classList.toggle("is-active", i === activeIndex);
      });

      yearMarkers.forEach((marker) => {
        const markerYear = Number(marker.dataset.year || "0");
        marker.classList.toggle("is-active", markerYear === activeYear);
        marker.classList.toggle(
          "is-past",
          Boolean(activeYear && markerYear < activeYear)
        );
      });
    }

    syncActive(0);

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalPin}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncActive(self.progress),
      },
    });

    masterTimeline.to(track, { x: () => -shiftX, ease: "none" }, 0);
    masterTimeline.to(progressFill, { scaleX: 1, ease: "none" }, 0);

    // Per-slide animations
    slideEls.forEach((slideEl, index) => {
      const isMediaLeft = slideEl.classList.contains("is-media-left");
      const mediaBlock = slideEl.querySelector(".story-slide__visual");
      const textBlock = slideEl.querySelector(".story-slide__text");
      const bgYear = slideEl.querySelector(".story-slide__bg-year");
      const mediaCard = slideEl.querySelector(".story-slide__visual-card");
      const mediaAsset = slideEl.querySelector(".story-slide__media");
      const wirePath = slideEl.querySelector(".story-slide__wire path");

      if (mediaBlock) {
        gsap.fromTo(
          mediaBlock,
          {
            x: isMediaLeft ? -130 : 130,
            y: 44,
            opacity: 0.25,
            scale: 0.9,
            rotate: isMediaLeft ? -1.8 : 1.8,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left 92%",
              end: "center 58%",
              scrub: true,
            },
          }
        );
      }

      if (textBlock) {
        gsap.fromTo(
          textBlock,
          { x: isMediaLeft ? 110 : -110, y: 26, opacity: 0.2 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left 88%",
              end: "center 64%",
              scrub: true,
            },
          }
        );
      }

      if (bgYear) {
        gsap.fromTo(
          bgYear,
          { x: 0, opacity: 0.08 },
          {
            x: -140,
            opacity: 0.22,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }

      if (mediaCard) {
        gsap.fromTo(
          mediaCard,
          { y: 20 },
          {
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }

      if (mediaAsset) {
        gsap.fromTo(
          mediaAsset,
          { scale: 1.16, xPercent: isMediaLeft ? -4 : 4 },
          {
            scale: 1.02,
            xPercent: isMediaLeft ? 4 : -4,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }

      if (wirePath) {
        const pathLength = wirePath.getTotalLength();
        gsap.set(wirePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.to(wirePath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: slideEl,
            containerAnimation: masterTimeline,
            start: "left 70%",
            end: "right 50%",
            scrub: true,
          },
        });
      }

      const titleEl = slideEl.querySelector(".story-slide__title");
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { yPercent: 24 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: masterTimeline,
              start: "left 82%",
              end: "center 60%",
              scrub: true,
            },
          }
        );
      }

      // Subtle horizontal motion
      gsap.to(slideEl, {
        x: index % 2 === 0 ? -14 : 14,
        ease: "none",
        scrollTrigger: {
          trigger: slideEl,
          containerAnimation: masterTimeline,
          start: "left right",
          end: "right left",
          scrub: true,
        },
      });
    });
  }

  // ── Handle resize: refresh ScrollTrigger ──
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 250);
  });
})();
