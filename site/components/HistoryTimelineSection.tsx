"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TimelineItem = {
  year: string;
  title: string;
  content: string;
  renderCard: () => ReactNode;
};

const STAR_FIELD = Array.from({ length: 40 }, (_, index) => {
  const top = (index * 17 + 13) % 100;
  const left = (index * 29 + 19) % 100;
  const size = 1 + (index % 3);
  const opacity = 0.08 + (index % 5) * 0.05;
  return { top, left, size, opacity };
});

const timelineData: TimelineItem[] = [
  {
    year: "2000",
    title: "Hg is born.",
    content:
      "Our founders, Ian Armitage and Frances Jacob, spin Mercury Asset Management out from Merrill Lynch, rebranding as HgCapital.",
    renderCard: () => (
      <div className="relative flex h-[180px] w-[300px] max-w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')",
          }}
        />
        <span className="relative z-10 rounded-full bg-black/50 px-3 py-1 text-sm font-medium tracking-widest text-white/50 backdrop-blur-sm">
          Founders Photo
        </span>
      </div>
    ),
  },
  {
    year: "2001",
    title: "First fund raised.",
    content: "First fund raised. Investors trust the London-based team with GBP700m.",
    renderCard: () => (
      <div className="flex h-[180px] w-[200px] max-w-full items-center justify-center rounded-xl bg-[#EBEBE3] shadow-2xl transition-transform hover:scale-105">
        <span className="text-5xl font-bold tracking-tighter text-[#5952B8]">GBP700m</span>
      </div>
    ),
  },
  {
    year: "2004",
    title: "IRIS joins the Hg family",
    content: "IRIS joins the Hg family; an early blueprint for our software strategy. We are still invested today.",
    renderCard: () => (
      <div className="relative flex h-[180px] w-[240px] max-w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#0F1E4A] to-[#1F3A7A] shadow-2xl">
        <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-md" />
        <div className="relative flex items-center gap-2">
          <div className="flex h-8 items-end gap-1">
            <div className="h-4 w-2 bg-red-500" />
            <div className="h-6 w-2 bg-orange-400" />
            <div className="h-8 w-2 bg-blue-300" />
          </div>
          <span className="text-4xl font-extrabold tracking-tight text-white">IRIS</span>
        </div>
      </div>
    ),
  },
  {
    year: "2005",
    title: "Sector-focused approach",
    content: "A sector-focused approach: Consumer, Healthcare, Industrials, TMT, Services & Renewable Energy.",
    renderCard: () => (
      <div className="flex h-[180px] w-[260px] max-w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-md">
        <span className="text-lg font-medium leading-relaxed text-white/80">
          Pioneering a sector-focused strategy
        </span>
      </div>
    ),
  },
  {
    year: "2006",
    title: "Visma acquisition",
    content: "Visma, an up-and-coming leader, is taken private from the Oslo Stock Exchange.",
    renderCard: () => (
      <div className="flex h-[180px] w-[260px] max-w-full items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-600 shadow-2xl">
        <span className="text-3xl font-bold tracking-widest text-white">VISMA</span>
      </div>
    ),
  },
];

export default function HistoryTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const visible = rect.top < window.innerHeight && rect.bottom > 0;

      setIsSectionVisible(visible);

      if (maxScroll <= 0) return;

      let progress = currentScroll / maxScroll;
      progress = Math.max(0, Math.min(1, progress));

      const floatIndex = progress * (timelineData.length - 1);
      setScrollProgress(floatIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeIndex = Math.round(scrollProgress);

  return (
    <section className="bg-slate-900 min-h-screen text-white" dir="ltr">
      {isSectionVisible ? (
        <span className="pointer-events-none fixed left-2 top-1/2 z-30 -translate-y-1/2 text-[clamp(2.6rem,10vw,5rem)] font-medium tracking-wide text-white/18 md:hidden">
          {timelineData[activeIndex]?.year}
        </span>
      ) : null}

      <div ref={containerRef} style={{ height: `${timelineData.length * 80}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#2A2B66] via-[#1A183B] to-[#121124]" />

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {STAR_FIELD.map((star) => (
              <span
                key={`star-${star.top}-${star.left}`}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                }}
              />
            ))}

            <svg className="absolute h-[2000px] w-[2000px] opacity-70" viewBox="-1000 -1000 2000 2000">
              {[0, 1, 2, 3, 4].map((layer) => {
                const speed = 0.3;
                const cycle = ((scrollProgress * speed + layer / 5) % 1 + 1) % 1;
                const radius = cycle * 1000;
                const opacity = Math.sin(cycle * Math.PI) * 0.8;
                const rotate = scrollProgress * 40 + layer * 72;

                return (
                  <g
                    key={`layer-${layer}`}
                    style={{
                      opacity,
                      transform: `rotate(${rotate}deg)`,
                      transformOrigin: "0px 0px",
                    }}
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={radius}
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2.5"
                      strokeDasharray="4 40"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle
                      cx={radius}
                      cy="0"
                      r={layer % 2 === 0 ? 6 : 4}
                      fill={layer === 1 ? "#E2B8F0" : layer === 3 ? "#8C78C4" : "rgba(255,255,255,0.9)"}
                    />
                    <circle cx={-radius} cy="0" r="2" fill="rgba(255,255,255,0.4)" />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-8 md:px-16">
            <div className="z-20 w-full md:w-1/3">
              <h2 className="mb-4 text-5xl font-semibold tracking-tight md:text-6xl">Our History</h2>
              <p className="mb-12 max-w-sm text-lg leading-relaxed text-white/80">
                25 years of building for what&apos;s next. Our long-term thinking, specialisation,
                and culture has seen bold ideas turn into enduring value.
              </p>

              <div className="relative h-[200px] w-full">
                {timelineData.map((item, index) => (
                  <div
                    key={`card-${item.year}`}
                    className={`absolute left-0 top-0 transition-all duration-700 ease-in-out ${
                      activeIndex === index
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-4 scale-95 opacity-0"
                    }`}
                  >
                    {item.renderCard()}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-8 md:hidden">
                {timelineData.map((item) => (
                  <article key={`mobile-${item.year}`} className="space-y-3">
                    <h3 className="text-[clamp(1.8rem,8.2vw,2.7rem)] font-medium leading-tight text-white">
                      {item.title}
                    </h3>
                    <div className="rounded-2xl border border-white/20 bg-[#2b2b79]/45 px-4 py-4 backdrop-blur-sm">
                      <p className="text-[clamp(1rem,4.4vw,1.3rem)] leading-[1.45] text-white/90">
                        {item.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative hidden h-full w-1/2 items-center pointer-events-none md:flex">
              <div className="absolute left-0 top-1/2 h-0 w-0">
                <svg className="absolute overflow-visible" style={{ left: 0, top: 0 }}>
                  <circle
                    cx="-650"
                    cy="0"
                    r="1000"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    strokeDasharray="4 10"
                    fill="none"
                  />
                  <circle
                    cx="-650"
                    cy="0"
                    r="1150"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                    strokeDasharray="3 16"
                    fill="none"
                  />
                </svg>

                {timelineData.map((item, index) => {
                  const d = index - scrollProgress;
                  const radius = 1000;
                  const centerX = -650;
                  const theta = d * 0.14;

                  const x = centerX + radius * Math.cos(theta);
                  const y = radius * Math.sin(theta);

                  const opacity = Math.max(0, 1 - Math.abs(d) * 0.45);
                  const isActive = Math.abs(d) < 0.15;

                  return (
                    <div
                      key={`timeline-${item.year}`}
                      className="absolute flex items-center justify-center will-change-transform"
                      style={{
                        left: x,
                        top: y,
                        transform: "translate(-50%, -50%)",
                        opacity,
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "h-3.5 w-3.5 bg-[#FF3B4A] shadow-[0_0_15px_rgba(255,59,74,0.8)]"
                            : "h-2 w-2 bg-white/40"
                        }`}
                      />

                      <div className="absolute right-full mr-6 flex w-[150px] justify-end">
                        <span
                          className={`transition-all duration-300 ${
                            isActive ? "text-5xl font-bold text-white" : "text-3xl font-medium text-white/30"
                          }`}
                        >
                          {item.year}
                        </span>
                      </div>

                      <div
                        className="absolute left-full ml-6 w-[340px] transition-all duration-500 ease-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateX(0)" : "translateX(10px)",
                        }}
                      >
                        <span className="mb-1 block text-lg font-semibold text-white">{item.title}</span>
                        <p className="text-[15px] leading-relaxed text-white/70">{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative right-4 z-20 hidden h-full flex-col items-center justify-center gap-6 md:flex">
              <div className="absolute left-1/2 h-1/2 w-[1px] -translate-x-1/2 bg-white/10" />

              {timelineData.map((item, index) => (
                <div key={`progress-${item.year}`} className="relative flex h-8 w-8 items-center justify-center">
                  {activeIndex === index ? (
                    <div className="absolute flex items-center gap-1.5 rounded-full border border-white/30 bg-[#1A183B] px-2 py-1 shadow-lg">
                      <span className="text-[9px] font-bold tracking-widest text-white/80">TIMELINE</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF3B4A]" />
                    </div>
                  ) : (
                    <div className="h-1 w-1 rounded-full bg-white/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

