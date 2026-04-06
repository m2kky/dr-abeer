"use client";

export default function MissionPanel() {
  return (
    <div
      className="h-panel flex flex-col justify-center px-[6vw]"
      id="mission-panel"
    >
      {/* Top accent tag */}
      <div className="mb-8">
        <span
          className="mission-tag"
          style={{ fontSize: "clamp(0.7rem, 1.1vw, 1rem)" }}
        >
          خبرة طويلة
        </span>
        <br />
        <span
          className="mission-tag"
          style={{ fontSize: "clamp(0.7rem, 1.1vw, 1rem)" }}
        >
          ورسالة أكبر.
        </span>
      </div>

      {/* Large heading */}
      <h2
        className="mission-heading max-w-[65vw] mb-14"
        style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)" }}
      >
        بعد سنوات من بناء
        <br />
        مؤسسات التعليم والصحة
        <br />
        في مصر والسعودية...
      </h2>

      {/* Bottom section: showreel + two columns */}
      <div className="flex items-end gap-10 flex-wrap">
        {/* Showreel thumbnail */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="showreel-thumb">
            <div className="showreel-play" />
          </div>
          <div>
            <span
              className="font-en block mb-1"
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--muted)",
              }}
            >
              Showreel
            </span>
            <span
              className="font-en font-bold"
              style={{ fontSize: "0.8rem", color: "#fff" }}
            >
              DR. ABEER ATTALLA
            </span>
          </div>
        </div>

        {/* Description Column 1 */}
        <p
          className="mission-body max-w-[260px]"
          style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.9rem)" }}
        >
          تحولت سنوات الخبرة في التعليم
          والصحة إلى أداة فعلية
          لخدمة المصريين في الخارج
          ومعالجة قضاياهم من داخل البرلمان.
        </p>

        {/* Description Column 2 */}
        <p
          className="mission-body max-w-[260px]"
          style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.9rem)" }}
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
