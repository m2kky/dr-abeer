"use client";

import { CSSProperties, useMemo, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { timelineData, timelineYearThemes } from "@/data/timelineData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TimelineSlide = {
  year: number;
  title: string;
  detail: string;
  sourceLabel: string;
  sourceUrl: string;
  eventIndex: number;
  eventCount: number;
  slideId: string;
};

const TOTAL_HERO_FRAMES = 122;
const fallbackTheme = timelineYearThemes[2017];

const framePath = (index: number) =>
  `/hero-frames/frame_${String(index).padStart(4, "0")}.webp`;

const inferCategory = (title: string, detail: string) => {
  const text = `${title} ${detail}`;
  if (/برلمان|تشريعي|نواب|سياسي/i.test(text)) return "PARLIAMENT";
  if (/رياض|اعاق|بارالمب|اتحاد/i.test(text)) return "SPORT";
  if (/تعليم|مدرس|تدريب|جامعة/i.test(text)) return "EDUCATION";
  if (/اقتصاد|استثمار|ريادة|اعمال/i.test(text)) return "BUSINESS";
  return "LEADERSHIP";
};

const buildStamp = (year: number, eventIndex: number) =>
  `${String(year).slice(-2)}_${String(eventIndex + 1).padStart(2, "0")}`;

const mediaKindForSlide = (index: number) => (index % 4 === 0 ? "video" : "image");

const frameForSlide = (index: number) => 1 + ((index * 9 + 7) % TOTAL_HERO_FRAMES);

const leadForVisual = (title: string) => {
  const words = title.split(" ").filter(Boolean);
  if (!words.length) return "IMPACT";
  return words.slice(0, 3).join(" ");
};

export default function HorizontalTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);

  const years = useMemo(
    () => [...timelineData].sort((a, b) => a.year - b.year),
    []
  );

  const slides = useMemo<TimelineSlide[]>(
    () =>
      years.flatMap((yearItem) =>
        yearItem.events.map((event, eventIndex) => ({
          ...event,
          year: yearItem.year,
          eventIndex,
          eventCount: yearItem.events.length,
          slideId: `${yearItem.year}-${eventIndex + 1}`,
        }))
      ),
    [years]
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progressFill = progressFillRef.current;
      if (!section || !track || !progressFill || !slides.length) return;

      const slideEls = gsap.utils.toArray<HTMLElement>(".story-slide");
      const yearMarkers = gsap.utils.toArray<HTMLElement>(".story-year-marker");

      const shiftX = Math.max(0, track.scrollWidth - window.innerWidth);
      const totalPin = shiftX + window.innerWidth * 0.8;

      gsap.set(track, { x: 0 });
      gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

      const syncActive = (progress: number) => {
        const activeIndex = Math.min(
          slides.length - 1,
          Math.max(0, Math.round(progress * (slides.length - 1)))
        );
        const activeYear = slides[activeIndex]?.year;

        slideEls.forEach((slideEl, index) => {
          slideEl.classList.toggle("is-active", index === activeIndex);
        });

        yearMarkers.forEach((marker) => {
          const markerYear = Number(marker.dataset.year || "0");
          marker.classList.toggle("is-active", markerYear === activeYear);
          marker.classList.toggle(
            "is-past",
            Boolean(activeYear && markerYear < activeYear)
          );
        });
      };

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

      masterTimeline.to(
        track,
        {
          x: () => -shiftX,
          ease: "none",
        },
        0
      );

      masterTimeline.to(
        progressFill,
        {
          scaleX: 1,
          ease: "none",
        },
        0
      );

      slideEls.forEach((slideEl, index) => {
        const isMediaLeft = slideEl.classList.contains("is-media-left");
        const mediaBlock = slideEl.querySelector<HTMLElement>(".story-slide__visual");
        const textBlock = slideEl.querySelector<HTMLElement>(".story-slide__text");
        const bgYear = slideEl.querySelector<HTMLElement>(".story-slide__bg-year");
        const mediaCard = slideEl.querySelector<HTMLElement>(".story-slide__visual-card");
        const mediaAsset = slideEl.querySelector<HTMLElement>(".story-slide__media");
        const wirePath = slideEl.querySelector<SVGPathElement>(".story-slide__wire path");

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
            {
              x: isMediaLeft ? 110 : -110,
              y: 26,
              opacity: 0.2,
            },
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

        const titleEl = slideEl.querySelector<HTMLElement>(".story-slide__title");
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            {
              yPercent: 24,
            },
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

        // Subtle motion for neighboring slides so transition feels continuous.
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
    },
    { scope: sectionRef, dependencies: [slides] }
  );

  return (
    <section ref={sectionRef} className="story-timeline" style={{ direction: "ltr" }}>
      <header className="story-timeline__header" dir="rtl">
        <p className="story-timeline__kicker font-en">TIMELINE [2017 - 2026]</p>
        <h3 className="story-timeline__heading">
          رحلة تصاعدية من الأقدم إلى الأحدث، وكل محطة تظهر في شاشة مستقلة مع حركة
          انتقالية.
        </h3>
      </header>

      <div ref={trackRef} className="story-timeline__track">
        {slides.map((slide, index) => {
          const theme = timelineYearThemes[slide.year] ?? fallbackTheme;
          const category = inferCategory(slide.title, slide.detail);
          const stamp = buildStamp(slide.year, slide.eventIndex);
          const mediaKind = mediaKindForSlide(index);
          const mediaSrc =
            mediaKind === "video"
              ? "/sda.mp4"
              : framePath(frameForSlide(index));

          const slideStyle = {
            "--slide-accent": theme.accent,
            "--slide-surface": theme.surface,
            "--slide-surface-strong": theme.surfaceStrong,
            "--slide-ink": theme.ink,
            "--slide-wire": theme.wire,
          } as CSSProperties;

          return (
            <article
              key={slide.slideId}
              className={`story-slide ${index % 2 === 1 ? "is-media-left" : ""}`}
              style={slideStyle}
            >
              <span className="story-slide__bg-year font-en" aria-hidden="true">
                {slide.year}
              </span>

              <div className="story-slide__inner">
                <div className="story-slide__visual" aria-hidden="true">
                  <div className="story-slide__visual-card">
                    <div className="story-slide__chrome font-en">
                      <span className="story-slide__dot" />
                      <span className="story-slide__dot" />
                      <span className="story-slide__dot" />
                      <span className="story-slide__chrome-label">
                        {category} / {slide.year}
                      </span>
                    </div>

                    <div className="story-slide__media-wrap">
                      {mediaKind === "video" ? (
                        <video
                          className="story-slide__media"
                          src={mediaSrc}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          className="story-slide__media"
                          src={mediaSrc}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          priority={index < 2}
                        />
                      )}
                      <div className="story-slide__media-overlay" />
                      <span className="story-slide__media-title font-en">
                        {leadForVisual(slide.title)}
                      </span>
                    </div>

                    <span className="story-slide__visual-event font-en">
                      {String(slide.eventIndex + 1).padStart(2, "0")} / {String(
                        slide.eventCount
                      ).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="story-slide__text" dir="rtl">
                  <p className="story-slide__meta font-en">[{category}] [{stamp}]</p>
                  <h4 className="story-slide__title">{slide.title}</h4>
                  <p className="story-slide__detail">{slide.detail}</p>
                  <a
                    href={slide.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="story-slide__source font-en"
                    title={slide.sourceLabel}
                  >
                    OPEN [+]
                  </a>
                </div>
              </div>

              <svg
                className="story-slide__wire"
                viewBox="0 0 1440 220"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,130 C140,85 225,205 340,160 C465,110 560,205 700,150 C820,103 930,194 1055,143 C1185,93 1295,185 1440,130" />
              </svg>
            </article>
          );
        })}
      </div>

      <div className="story-timeline__hud" aria-label="timeline progress">
        <div className="story-timeline__progress-track">
          <span ref={progressFillRef} className="story-timeline__progress-fill" />
        </div>

        <div className="story-timeline__years font-en">
          {years.map((yearItem) => (
            <span
              key={yearItem.year}
              className="story-year-marker"
              data-year={yearItem.year}
            >
              {yearItem.year}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
