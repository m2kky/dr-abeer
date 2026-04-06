"use client";

const VIDEO_SRC =
  "/freepik_a-smooth-cinematic-video-of-the-same-woman-from-the-reference-image-maintaining-identical-facial-features-and-identity-sitting-on-a-simple-wooden-chair-body-slightly-turned-at-a-34-angle-_0001.mp4";

export default function MissionPanel() {
  return (
    <div
      className="h-panel flex flex-col justify-center px-[6vw]"
      id="mission-panel"
    >
      {/* Top accent tag */}
      <div className="mb-6">
        <span
          className="text-accent font-bold"
          style={{ fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)" }}
        >
          خبرة طويلة
        </span>
        <br />
        <span
          className="text-accent font-bold"
          style={{ fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)" }}
        >
          ورسالة أكبر.
        </span>
      </div>

      {/* Large heading */}
      <h2
        className="text-beige font-bold leading-[1.15] max-w-[65vw] mb-12"
        style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
      >
        بعد سنوات من بناء
        <br />
        مؤسسات التعليم والصحة
        <br />
        في مصر والسعودية...
      </h2>

      {/* Bottom section: showreel + two columns */}
      <div className="flex items-end gap-12 flex-wrap">
        {/* Showreel thumbnail */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden border border-white/20">
            <video
              src={VIDEO_SRC}
              muted
              playsInline
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
          <div>
            <span className="text-muted text-xs uppercase tracking-wider font-en block mb-1">
              Showreel
            </span>
            <span className="text-white text-sm font-bold font-en">
              DR. ABEER ATTALLA
            </span>
          </div>
        </div>

        {/* Description Column 1 */}
        <p
          className="text-muted max-w-[280px] leading-relaxed"
          style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
        >
          تحولت سنوات الخبرة في التعليم
          والصحة إلى أداة فعلية
          لخدمة المصريين في الخارج
          ومعالجة قضاياهم من داخل البرلمان.
        </p>

        {/* Description Column 2 */}
        <p
          className="text-muted max-w-[280px] leading-relaxed"
          style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
        >
          رسالتها اليوم:
          ربط المصري بوطنه،
          ودعم جيل جديد
          قادر على صناعة أثر حقيقي.
        </p>
      </div>
    </div>
  );
}
