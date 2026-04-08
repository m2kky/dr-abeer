"use client";

export default function MissionPanel() {
  return (
    <div
      className="h-panel mission-panel flex flex-col justify-center px-[6vw]"
      id="mission-panel"
    >
      {/* Top accent tag */}
      <div className="mission-kicker">
        <span className="mission-tag">
          خبرة طويلة
        </span>
        <br />
        <span className="mission-tag">
          ورسالة أكبر.
        </span>
      </div>

      {/* Large heading */}
      <h2 className="mission-heading">
        بعد سنوات من بناء
        <br />
        مؤسسات التعليم والصحة
        <br />
        في مصر والسعودية...
      </h2>

      {/* Bottom section: showreel + two columns */}
      <div className="mission-bottom">
        {/* Showreel thumbnail */}
        <div className="mission-showreel">
          <div className="showreel-thumb">
            <video
              src="/sda.mp4"
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
            />
            <div className="showreel-play" />
          </div>
          <div>
            <span className="mission-showreel-label font-en">
              Showreel
            </span>
            <span className="mission-showreel-name font-en">
              DR. ABEER ATTALLA
            </span>
          </div>
        </div>

        {/* Description Column 1 */}
        <p className="mission-body mission-copy">
          تحولت سنوات الخبرة في التعليم
          والصحة إلى أداة فعلية
          لخدمة المصريين في الخارج
          ومعالجة قضاياهم من داخل البرلمان.
        </p>

        {/* Description Column 2 */}
        <p className="mission-body mission-copy">
          رسالتها اليوم:
          ربط المصري بوطنه،
          ودعم جيل جديد
          قادر على صناعة أثر حقيقي.
        </p>
      </div>
    </div>
  );
}
