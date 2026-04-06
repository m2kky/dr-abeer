"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTRO_TEXT =
  "من بناء المؤسسات التعليمية والصحية إلى مسار برلماني يخدم المصريين في الداخل والخارج، تتشكل رحلة ممتدة صنعت أثرًا عمليًا عامًا بعد عام. المحطات التالية ترصد كيف تحوّلت الخبرة إلى إنجازات، وكيف ظل الإنسان محور كل خطوة.";

const ACCENT_WORDS = new Set([
  "المؤسسات",
  "التعليمية",
  "الصحية",
  "برلماني",
  "المصريين",
  "إنجازات،",
  "الإنسان",
]);

export default function IntroRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".intro-reveal-word");
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
          trigger: sectionRef.current,
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
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="intro-reveal-section">
      <div className="intro-reveal-sticky">
        <p className="intro-reveal-kicker">تمهيد زمني قبل الخط الزمني</p>

        <h2 className="intro-reveal-text" aria-label={INTRO_TEXT}>
          {INTRO_TEXT.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`intro-reveal-word ${
                ACCENT_WORDS.has(word) ? "is-accent" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="intro-reveal-note">
          اسحب لأسفل لاكتشاف المحطات من 2017 حتى 2026
        </p>
      </div>
    </section>
  );
}
