"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./HgReplicaExperience.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_LINES = [
  "25 years building the foundations.",
  "Now we are forming the future.",
];

type EventItem = {
  year: string;
  title: string;
  body: string;
};

const EVENTS: EventItem[] = [
  {
    year: "2000",
    title: "Youthful energy & the long view",
    body:
      "If we had to distil what got us here, it is youthful energy and ambition focused on major technology tailwinds, plus conviction that taking the long view would eventually prevail.",
  },
  {
    year: "2011",
    title: "The decision to specialise",
    body:
      "A choice that felt risky at the time: specialise while others stayed broad. Going inch-wide and mile-deep in mission-critical software built pattern recognition that others could not match.",
  },
  {
    year: "2019",
    title: "Delivering on our promise to investors",
    body:
      "Our responsibility has always been to deliver for millions of savers. That means balancing discipline with innovation and staying true to strategy through every cycle.",
  },
];

function splitLine(line: string) {
  return line.split("").map((char, index) => (
    <span
      key={`${line}-${index}`}
      className={styles.char}
      data-hg-char="true"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function HgReplicaExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const heroChars = root.querySelectorAll("[data-hg-char='true']");
      const heroLead = root.querySelector("[data-hg-hero-lead='true']");
      const heroContent = root.querySelector("[data-hg-hero-content='true']");
      const reflectionSection = root.querySelector("[data-reflection='true']");
      const eventsSection = root.querySelector("[data-events-section='true']");
      const eventItems = root.querySelectorAll("[data-event-item='true']");
      const eventYearDisplay = root.querySelector("[data-event-year-display='true']");

      gsap.set(heroChars, { yPercent: 120, opacity: 0 });
      gsap.to(heroChars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.02,
      });

      gsap.fromTo(
        heroLead,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.35, ease: "power2.out" }
      );

      gsap.to(heroContent, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "#loopVideoWrap",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (reflectionSection) {
        const reflectionLines = reflectionSection.querySelectorAll(
          "[data-reflection-line='true']"
        );
        const reflectionProfile = reflectionSection.querySelector(
          "[data-reflection-profile='true']"
        );

        gsap.fromTo(
          reflectionLines,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: reflectionSection,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          reflectionProfile,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: reflectionSection,
              start: "top 62%",
            },
          }
        );
      }

      if (eventItems.length > 0) {
        gsap.fromTo(
          eventItems,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.22,
            scrollTrigger: {
              trigger: eventItems[0],
              start: "top 80%",
            },
          }
        );

        if (eventYearDisplay) {
          gsap.set(eventYearDisplay, { autoAlpha: 0, opacity: 0.38 });

          const setYear = (year: string) => {
            const currentYear = eventYearDisplay.textContent?.trim();
            if (currentYear === year) return;

            gsap
              .timeline()
              .to(eventYearDisplay, {
                opacity: 0.12,
                duration: 0.16,
                ease: "power1.out",
              })
              .add(() => {
                eventYearDisplay.textContent = year;
              })
              .to(eventYearDisplay, {
                opacity: 0.38,
                duration: 0.2,
                ease: "power1.in",
              });
          };

          const firstYear =
            (eventItems[0] as HTMLElement | undefined)?.dataset.eventYear ?? EVENTS[0]?.year;
          if (firstYear) {
            eventYearDisplay.textContent = firstYear;
          }

          const showYear = () =>
            gsap.to(eventYearDisplay, {
              autoAlpha: 1,
              duration: 0.2,
              overwrite: true,
            });

          const hideYear = () =>
            gsap.to(eventYearDisplay, {
              autoAlpha: 0,
              duration: 0.2,
              overwrite: true,
            });

          if (eventsSection) {
            ScrollTrigger.create({
              trigger: eventsSection,
              start: "top top",
              end: "bottom top",
              onEnter: showYear,
              onEnterBack: showYear,
              onLeave: hideYear,
              onLeaveBack: hideYear,
            });
          }

          eventItems.forEach((item, index) => {
            const itemYear =
              (item as HTMLElement).dataset.eventYear ?? EVENTS[index]?.year ?? "";

            ScrollTrigger.create({
              trigger: item,
              start: "top 62%",
              end: "bottom 38%",
              onEnter: () => setYear(itemYear),
              onEnterBack: () => setYear(itemYear),
            });
          });
        }
      }
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles.shell} dir="ltr">
      <section id="loopVideoWrap" className={styles.hero}>
        <div className={styles.heroContent} data-hg-hero-content="true">
          <p className={styles.kicker}>Celebrating 25 years of focused software investing</p>

          {HERO_LINES.map((line) => (
            <h1 key={line} className={styles.heroLine} aria-label={line}>
              {splitLine(line)}
            </h1>
          ))}

          <p className={styles.heroLead} data-hg-hero-lead="true">
            The AI era is here. The teams that combine deep workflow context with AI-native
            execution will define the next generation.
          </p>
        </div>

        <div className={styles.heroGlow} aria-hidden="true" />
      </section>

      <section className={styles.reflection} data-reflection="true" dir="ltr">
        <div className={styles.reflectionInner}>
          <p className={styles.reflectionLine} data-reflection-line="true">
            When her journey began, digital access was still limited. Today, AI is{" "}
            <span className={styles.highlight}>rewriting the rules</span> of impact at{" "}
            <span className={styles.highlight}>break-neck speed</span>.
          </p>

          <p className={styles.reflectionLine} data-reflection-line="true">
            After 25 years of work, she is <span className={styles.highlight}>perfectly placed</span>{" "}
            to seize this opportunity, even if the road was never linear.
          </p>

          <p className={styles.reflectionLine} data-reflection-line="true">
            These are reflections on the key decisions that got us here and, more importantly,
            where we are headed next.
          </p>

          <div className={styles.profile} data-reflection-profile="true">
            <div className={styles.profileImageWrap}>
              <Image
                src="/hero-frames/frame_0038.webp"
                alt="Dr. Abeer Attalla"
                fill
                sizes="72px"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileText}>
              <strong>Dr. Abeer Attalla</strong>
              <span>Member of Parliament</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eventsSection} data-events-section="true" dir="ltr">
        <span className={styles.yearFloating} data-event-year-display="true" aria-hidden="true">
          {EVENTS[0]?.year}
        </span>

        <div className={styles.eventsList}>
          {EVENTS.map((event) => (
            <article
              key={event.year + event.title}
              className={styles.eventItem}
              data-event-item="true"
              data-event-year={event.year}
            >
              <div className={styles.eventBodyWrap}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <div className={styles.eventCard}>
                  <p>{event.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
