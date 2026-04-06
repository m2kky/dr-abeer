<div dir="rtl" align="right">

# 🏛️ عبير عطالله — بناء التعليم ودعم الإنسان

**الموقع الرسمي لعضوة مجلس النواب المصري د. عبير عطالله**
موقع بورتفوليو سينمائي تفاعلي يعرض رحلة ممتدة من ريادة الأعمال والتعليم والعمل البرلماني.

</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Private-red)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Components Deep Dive](#-components-deep-dive)
- [Animation System](#-animation-system)
- [Data Layer](#-data-layer)
- [Styling & Design System](#-styling--design-system)
- [Static Assets](#-static-assets)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Next Steps: Responsive Design](#-next-steps-responsive-design)

---

## 🌟 Overview

This is a **cinematic, scroll-driven portfolio website** for Dr. Abeer Attalla — a member of the Egyptian Parliament representing Egyptians abroad. The site showcases her career timeline (2017–2026) through an immersive, horizontally-scrolling experience inspired by high-end agency sites like [wonjyou.studio](https://wonjyou.studio).

### Key Features

| Feature | Description |
|---|---|
| 🎬 **Frame Sequence Hero** | 122-frame WebP image sequence animated on scroll |
| 📜 **Horizontal Scroll Panels** | Three panels (Hero → Mission → Text Mask) scroll horizontally via GSAP ScrollTrigger |
| 🎭 **Text Mask Reveal** | Oversized Arabic text with `mix-blend-mode: multiply` reveals background video on zoom |
| ✨ **Intro Word Reveal** | Per-word blur + parallax scroll animation for the intro section |
| 🗂️ **Interactive Timeline** | Full-screen slide-based timeline (2017–2026) with per-year color theming |
| 🎞️ **Cinematic FX** | Film grain overlay + radial vignette for a premium feel |
| 🌐 **RTL-First** | Fully right-to-left layout with Arabic (`Tajawal`) and English (`Figtree`) typography |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.2.2 |
| **UI Library** | [React](https://react.dev/) | 19.2.4 |
| **Animation** | [GSAP](https://gsap.com/) + ScrollTrigger + [@gsap/react](https://gsap.com/docs/v3/GSAP/gsap.react/) | 3.14.2 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4 + Vanilla CSS | 4.x |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.x |
| **Fonts** | Google Fonts — Tajawal (Arabic), Figtree (English) | — |
| **Media** | WebP frame sequence (122 frames) + MP4 video | — |

---

## 📁 Project Architecture

```
dr-abeer/
├── site/                          # ← Main Next.js application
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (fonts, grain, vignette)
│   │   ├── page.tsx               # Home page — assembles all sections
│   │   ├── globals.css            # Complete design system (~1075 lines)
│   │   └── favicon.ico
│   │
│   ├── components/                # React components
│   │   ├── HorizontalExperience.tsx   # 🎯 Master orchestrator (3-panel horizontal scroll)
│   │   ├── HeroPanel.tsx              # Hero section (canvas + text)
│   │   ├── MissionPanel.tsx           # Mission statement panel
│   │   ├── TextMaskPanel.tsx          # Text-mask video reveal panel
│   │   ├── IntroRevealSection.tsx     # Scroll-driven word reveal
│   │   └── HorizontalTimelineSection.tsx  # Interactive year-by-year timeline
│   │
│   ├── data/
│   │   └── timelineData.ts        # Timeline events (2017–2026) + color themes
│   │
│   ├── lib/
│   │   └── gsap-init.ts           # GSAP + ScrollTrigger registration
│   │
│   ├── public/
│   │   ├── hero-frames/           # 122 WebP frames (frame_0001.webp → frame_0122.webp)
│   │   └── sda.mp4                # Showreel video (~4.3 MB)
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
├── .gitignore
└── README.md                      # ← You are here
```

---

## 🧩 Components Deep Dive

### Page Composition (`page.tsx`)

The home page assembles three main sections vertically:

```
┌──────────────────────────────────┐
│      HorizontalExperience        │  ← Pinned horizontal scroll (3 panels)
│  ┌──────┬──────────┬──────────┐  │
│  │ Hero │ Mission  │ TextMask │  │
│  └──────┴──────────┴──────────┘  │
├──────────────────────────────────┤
│      IntroRevealSection          │  ← Scroll-driven paragraph reveal
├──────────────────────────────────┤
│    HorizontalTimelineSection     │  ← Full-screen timeline slides
└──────────────────────────────────┘
```

---

### 1. `HorizontalExperience.tsx` — Master Orchestrator

**The brain of the site.** Manages a pinned section with 3 full-screen panels that scroll horizontally (right-to-left).

| Responsibility | Details |
|---|---|
| **Frame preloading** | Preloads 122 WebP frames into memory for smooth canvas playback |
| **Canvas rendering** | Draws frames onto `<canvas>` with aspect-ratio-aware containment |
| **Intro animation** | ~3s choreographed entrance: Arabic words rise from below, English tagline slides in |
| **Scroll phases** | 3-phase master timeline: horizontal scroll → text translate → scale zoom |
| **ScrollTrigger pin** | Pins the section and maps vertical scroll to horizontal panel movement |

**Animation Phases:**

```
Phase 1 (Intro)     → Words rise + English slides in + Canvas fades in
Phase 2 (Scroll)    → Panels scroll horizontally (Hero → Mission → TextMask)
                    → Frame sequence plays (first 30%)
                    → Canvas wrapper moves from left to center
                    → Text block fades to the right
Phase 3 (Text Mask) → Arabic text translates horizontally
                    → Text zooms into the dot → reveals video
```

---

### 2. `HeroPanel.tsx` — Hero Section

A split layout panel:
- **Left (42%):** `<canvas>` element for the frame sequence animation
- **Right (58%):** Arabic heading "بناء التعليم ودعم الإنسان" + English tagline "Over 20 Years Helping"
- **Bottom:** "Scroll to discover" indicator with pulsing line animation

Typography uses `clamp(3.5rem, 10vw, 9rem)` for fluid scaling.

---

### 3. `MissionPanel.tsx` — Mission Statement

Displays the mission message with:
- Accent tag: "خبرة طويلة ورسالة أكبر"
- Large fluid heading about building education and healthcare institutions
- Showreel video thumbnail (90×90px with glassmorphic play button)
- Two-column paragraph describing her parliamentary mission

---

### 4. `TextMaskPanel.tsx` — Cinematic Text Mask Reveal

The most visually dramatic section:
- **Background:** Auto-playing `sda.mp4` video
- **Overlay:** Black div with `mix-blend-mode: multiply`
- **White text:** "من هنا تبدأ المسؤولية" at `45vw` font-size
- **Dot element:** A period (`.text-mask-dot`) that acts as the zoom origin point

When the user scrolls, GSAP translates the text horizontally then zooms into the dot at `scale: 80`, effectively revealing the video through the expanding text.

---

### 5. `IntroRevealSection.tsx` — Word-by-Word Reveal

A sticky section where a long Arabic paragraph reveals word-by-word as the user scrolls:
- Words start at `opacity: 0.12`, `blur(8px)`, `yPercent: 28`
- Scroll-driven animation reveals them with `scrub: 1.2`
- Seven accent words (المؤسسات, التعليمية, etc.) are highlighted in `--accent` color
- Kicker text and note fade in on enter

---

### 6. `HorizontalTimelineSection.tsx` — Interactive Timeline

A full-screen, horizontally-scrolling timeline covering **2017–2026** (30 events across 10 years).

| Feature | Implementation |
|---|---|
| **Slides** | Each event = one full-viewport slide with media + text |
| **Layout** | CSS Grid with alternating `is-media-left` pattern |
| **Media** | Every 4th slide uses video; others use hero frame images |
| **Chrome** | Browser-like card with dots + category label |
| **Themes** | Each year has its own color palette (accent, surface, ink, wire) |
| **Wire SVG** | Decorative wavy path with scroll-driven stroke animation |
| **HUD** | Progress bar + year markers at the bottom |
| **Parallax** | Media blocks, text blocks, background year, and cards all have independent scroll-driven motion |
| **Categories** | Auto-inferred from title content: PARLIAMENT, SPORT, EDUCATION, BUSINESS, LEADERSHIP |

---

## 🎬 Animation System

All animations use **GSAP 3.14** with the **ScrollTrigger** plugin.

### Registration

```ts
// lib/gsap-init.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Animation Inventory

| Animation | Type | Trigger | Component |
|---|---|---|---|
| Word rise in | Timeline | Page load (delay 0.4s) | HeroPanel |
| English tagline slide | Timeline | After words | HeroPanel |
| Canvas fade-in | Timeline | After words | HeroPanel |
| Scroll indicator pulse | CSS @keyframes | Continuous | HeroPanel |
| Frame sequence | ScrollTrigger (scrub) | Scroll 0–30% | HorizontalExperience |
| Canvas wrapper reposition | ScrollTrigger (scrub) | Scroll 0–40% | HorizontalExperience |
| Text block fade-out | ScrollTrigger (scrub) | Scroll 25%–45% | HorizontalExperience |
| Horizontal panel scroll | Pinned master timeline | Full scroll | HorizontalExperience |
| Text mask translate | Master timeline | After panel scroll | HorizontalExperience |
| Text mask zoom (×80) | Master timeline | After translate | HorizontalExperience |
| Word-by-word reveal | ScrollTrigger (scrub) | Section enter | IntroRevealSection |
| Kicker/note fade-in | ScrollTrigger | Section enter | IntroRevealSection |
| Slide media parallax | Container animation | Per-slide | HorizontalTimelineSection |
| Slide text parallax | Container animation | Per-slide | HorizontalTimelineSection |
| Background year drift | Container animation | Per-slide | HorizontalTimelineSection |
| SVG wire stroke draw | Container animation | Per-slide | HorizontalTimelineSection |
| Progress bar fill | Master timeline | Full scroll | HorizontalTimelineSection |

---

## 📊 Data Layer

### `data/timelineData.ts`

```ts
// Type definitions
type TimelineEvent = {
  title: string;          // Arabic event title
  detail: string;         // Arabic description
  sourceLabel: string;    // Source publication name
  sourceUrl: string;      // Source URL
};

type TimelineYear = {
  year: number;           // 2017–2026
  events: TimelineEvent[]; // 3 events per year
};

type TimelineYearTheme = {
  accent: string;         // Primary color (e.g. #DB7A2F)
  surface: string;        // Light background
  surfaceStrong: string;  // Slightly darker background
  ink: string;            // Text color
  wire: string;           // SVG wire color
};
```

**10 years × 3 events = 30 timeline slides**, each with a unique color theme applied via CSS custom properties.

---

## 🎨 Styling & Design System

### Design Tokens

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --accent: #ff7a30;       /* Orange — primary brand color */
  --beige: #e9e3df;
  --muted: #9a948f;
}
```

### Typography

| Usage | Font | Variable |
|---|---|---|
| Arabic body & headings | **Tajawal** (weights 200–900) | `--font-tajawal` |
| English labels & tags | **Figtree** (weights 300–800) | `--font-figtree` |

### CSS Architecture (globals.css — ~1,075 lines)

| Section | Lines | Purpose |
|---|---|---|
| Design tokens + reset | 1–48 | CSS variables, box-sizing, scrollbar |
| Horizontal scroll | 54–76 | `.h-scroll-section`, `.h-scroll-inner`, `.h-panel` |
| Hero panel layout | 78–160 | Canvas wrapper, text block, word rows |
| Mission panel | 162–220 | Tags, heading, showreel thumbnail |
| Text mask | 222–253 | Overlay blend mode, dot styling |
| Intro reveal | 255–307 | Sticky layout, word animation setup |
| Old timeline (legacy) | 309–575 | Card-based timeline (superseded) |
| Cinematic FX | 577–663 | Grain overlay, vignette, scrollbar |
| Story timeline | 665–1075 | Slide layout, chrome, media, wire, HUD |

### Cinematic Effects

- **Film Grain:** SVG noise texture at 3.5% opacity with `mix-blend-mode: overlay` — applied as fixed overlay
- **Vignette:** Radial gradient from transparent center to 40% black edges — fixed overlay
- **Color Mix:** Uses `color-mix(in srgb, ...)` for dynamic opacity on theme colors

---

## 📦 Static Assets

### Hero Frame Sequence

- **Location:** `public/hero-frames/`
- **Format:** WebP
- **Count:** 122 frames (`frame_0001.webp` → `frame_0122.webp`)
- **Size per frame:** ~23–30 KB
- **Total:** ~3.4 MB
- **Purpose:** Scroll-driven image sequence rendered on `<canvas>`

### Video

- **File:** `public/sda.mp4` (~4.3 MB)
- **Usage:** Text mask background + showreel thumbnail + timeline slides

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd dr-abeer/site

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Environment

No environment variables are required. The site is fully static/client-rendered.

---

## 📜 Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Next.js dev server with HMR |
| `build` | `npm run build` | Create optimized production build |
| `start` | `npm run start` | Serve production build |
| `lint` | `npm run lint` | Run ESLint checks |

---

## 📱 Next Steps: Responsive Design

The site is currently designed for **desktop viewports (≥1280px)**. The timeline sections have partial responsive rules, but the core horizontal scroll experience, hero panel, mission panel, and text mask panel need comprehensive mobile adaptation.

### Current Responsive Status

| Component | Desktop | Tablet (768–1024px) | Mobile (<768px) |
|---|---|---|---|
| HorizontalExperience | ✅ Full | ⚠️ Partial | ❌ Broken |
| HeroPanel | ✅ Full | ⚠️ Overflow issues | ❌ Not adapted |
| MissionPanel | ✅ Full | ⚠️ Partial | ❌ Text overflow |
| TextMaskPanel | ✅ Full | ⚠️ Partial | ❌ Not usable |
| IntroRevealSection | ✅ Full | ✅ Works (has rules) | ⚠️ Needs tweaks |
| HorizontalTimelineSection | ✅ Full | ✅ Has rules | ✅ Has rules |

---

### Responsive Implementation Plan

#### Phase 1: Core Layout Breakpoints

<div dir="rtl">

**1.1 إضافة Media Queries الأساسية**

</div>

Add three tier breakpoints in `globals.css`:

```css
/* Tablet landscape */
@media (max-width: 1024px) { ... }

/* Tablet portrait */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }
```

---

#### Phase 2: Hero Panel Mobile Adaptation

<div dir="rtl">

**المشكلة:** تقسيم الـ Hero إلى 42% كانفس + 58% نص لا يعمل على الشاشات الصغيرة.

</div>

**Solution: Stack vertically on mobile.**

```css
/* globals.css — add to mobile breakpoint */
@media (max-width: 768px) {
  .hero-canvas-wrapper {
    position: relative;
    width: 100% !important;
    height: 45vh !important;
    left: auto !important;
  }

  .hero-text-block {
    position: relative;
    width: 100% !important;
    height: auto !important;
    padding: 2rem 5vw;
    align-items: center;
    text-align: center;
  }

  .hero-text-block > .hero-word-row {
    justify-content: center;
  }

  .hero-education-line {
    flex-direction: column;
    align-items: center;
  }

  .hero-word {
    font-size: clamp(2.2rem, 12vw, 4rem) !important;
  }
}
```

**Key change in `HeroPanel.tsx`:**

```tsx
// Change inline styles to use CSS classes only
// Remove fixed percentage widths from inline styles
// Let CSS media queries control the layout
```

---

#### Phase 3: Horizontal Scroll → Vertical Scroll (Mobile)

<div dir="rtl">

**المشكلة الأكبر:** الـ horizontal scroll مع GSAP ScrollTrigger pin يحتاج viewport واسعة. على الموبايل، الأفضل تحويله لـ vertical scroll عادي.

</div>

**Strategy: Conditional animation based on viewport width.**

```tsx
// HorizontalExperience.tsx — Add responsive check
const isMobile = window.innerWidth < 768;

if (isMobile) {
  // Skip horizontal scroll pinning
  // Stack panels vertically
  // Simplify or disable the text-mask zoom
  gsap.set(inner, { x: 0 }); // No horizontal offset
} else {
  // Existing desktop animation code
}
```

**CSS changes:**

```css
@media (max-width: 768px) {
  .h-scroll-section {
    height: auto; /* Allow natural height */
  }

  .h-scroll-inner {
    flex-direction: column; /* Stack panels vertically */
    width: 100%;
    height: auto;
  }

  .h-panel {
    width: 100%;
    height: 100svh; /* Use small viewport height for mobile */
    min-height: 100svh;
  }
}
```

---

#### Phase 4: Text Mask Panel Mobile

<div dir="rtl">

**المشكلة:** خط بحجم `45vw` والأنيميشن بتاعة الـ zoom لـ `scale: 80` مش عملية على الموبايل.

</div>

**Solution:**

```css
@media (max-width: 768px) {
  .text-mask-text {
    font-size: 22vw; /* Reduce from 45vw */
    white-space: normal; /* Allow wrapping */
    text-align: center;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
  }
}
```

```tsx
// In HorizontalExperience.tsx — reduce zoom on mobile
const finalScale = isMobile ? 20 : 80;
masterTl.to(textEl, { scale: finalScale, ... });
```

---

#### Phase 5: Mission Panel Mobile

```css
@media (max-width: 768px) {
  #mission-panel {
    padding: 2rem 5vw;
  }

  .mission-heading {
    font-size: clamp(1.4rem, 6vw, 2.4rem) !important;
    max-width: 90vw !important;
    margin-bottom: 2rem;
  }

  /* Stack showreel + text columns vertically */
  #mission-panel .flex.items-end {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .mission-body {
    max-width: 100% !important;
  }

  .showreel-thumb {
    width: 70px;
    height: 70px;
  }
}
```

---

#### Phase 6: Touch & Performance Optimization

<div dir="rtl">

**تحسينات الأداء على الموبايل:**

</div>

| Optimization | How |
|---|---|
| **Reduce frame count** | On mobile, load every 2nd frame (61 instead of 122) |
| **Lazy video** | Don't autoplay `sda.mp4` on mobile; show poster image instead |
| **Reduce grain** | Set `.grain { opacity: 0.015 }` or remove entirely on mobile |
| **ScrollTrigger config** | Reduce `scrub` values and simplify timeline for smoother 60fps |
| **Canvas resolution** | Use `devicePixelRatio * 0.75` on mobile for lower-res canvas |

```tsx
// Conditional frame loading
const isMobile = window.innerWidth < 768;
const FRAME_STEP = isMobile ? 2 : 1;
const framesToLoad = [];
for (let i = 1; i <= TOTAL_FRAMES; i += FRAME_STEP) {
  framesToLoad.push(i);
}
```

```css
@media (max-width: 768px) {
  .grain { opacity: 0.015; }
  .vignette { display: none; }
}
```

---

#### Phase 7: Timeline Section Mobile Polish

The timeline already has responsive rules at `1024px` and `720px`. Additional mobile polish:

```css
@media (max-width: 480px) {
  .story-slide__inner {
    padding: 5.5rem 0.6rem 3.8rem;
  }

  .story-slide__visual {
    height: min(28vh, 12rem);
  }

  .story-slide__title {
    font-size: clamp(1.1rem, 7vw, 1.6rem);
  }

  .story-slide__detail {
    font-size: clamp(0.78rem, 2.8vw, 0.92rem);
    line-height: 1.7;
  }

  .story-slide__chrome {
    height: 1.8rem;
  }
}
```

---

### Responsive Implementation Checklist

```
[ ] Phase 1 — Add base breakpoints to globals.css
[ ] Phase 2 — Stack HeroPanel layout vertically on mobile
[ ] Phase 3 — Convert horizontal scroll to vertical on mobile
    [ ] Add isMobile detection hook
    [ ] Conditional GSAP animation logic
    [ ] CSS flex-direction change
[ ] Phase 4 — Adapt TextMaskPanel for smaller screens
    [ ] Reduce font-size
    [ ] Reduce zoom scale
    [ ] Handle text wrapping
[ ] Phase 5 — Adapt MissionPanel for mobile
    [ ] Stack columns vertically
    [ ] Adjust spacing and typography
[ ] Phase 6 — Performance optimizations
    [ ] Conditional frame loading
    [ ] Lazy video loading
    [ ] Reduce cinematic FX on mobile
    [ ] Lower canvas resolution
[ ] Phase 7 — Timeline section mobile polish
[ ] Phase 8 — Test on real devices
    [ ] iPhone Safari
    [ ] Android Chrome
    [ ] iPad Safari (landscape + portrait)
    [ ] iPad Chrome
```

---

### Recommended Utility: Responsive Hook

Create a reusable React hook for breakpoint detection:

```tsx
// lib/useBreakpoint.ts
"use client";
import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return bp;
}
```

Usage in components:

```tsx
const bp = useBreakpoint();

// Conditional rendering
{bp === "desktop" && <DesktopOnlyElement />}

// Conditional animation params
const scale = bp === "mobile" ? 20 : 80;
const frameStep = bp === "mobile" ? 2 : 1;
```

---

<div dir="rtl" align="center">

**صُنع بـ ❤️ لخدمة رسالة بناء التعليم ودعم الإنسان**

</div>
