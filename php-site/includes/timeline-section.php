<?php
require_once __DIR__ . '/timeline-data.php';

$TOTAL_HERO_FRAMES = 122;

function framePath($index) {
    return 'assets/hero-frames/frame_' . str_pad($index, 4, '0', STR_PAD_LEFT) . '.webp';
}

function inferCategory($title, $detail) {
    $text = $title . ' ' . $detail;
    if (preg_match('/برلمان|تشريعي|نواب|سياسي/u', $text)) return 'PARLIAMENT';
    if (preg_match('/رياض|اعاق|بارالمب|اتحاد/u', $text)) return 'SPORT';
    if (preg_match('/تعليم|مدرس|تدريب|جامعة/u', $text)) return 'EDUCATION';
    if (preg_match('/اقتصاد|استثمار|ريادة|اعمال/u', $text)) return 'BUSINESS';
    return 'LEADERSHIP';
}

function buildStamp($year, $eventIndex) {
    return substr($year, -2) . '_' . str_pad($eventIndex + 1, 2, '0', STR_PAD_LEFT);
}

function mediaKindForSlide($index) {
    return ($index % 4 === 0) ? 'video' : 'image';
}

function frameForSlide($index) {
    global $TOTAL_HERO_FRAMES;
    return 1 + (($index * 9 + 7) % $TOTAL_HERO_FRAMES);
}

function leadForVisual($title) {
    $words = array_filter(explode(' ', $title));
    if (empty($words)) return 'IMPACT';
    return implode(' ', array_slice($words, 0, 3));
}
?>

<section class="story-timeline" id="timeline-section" style="direction: ltr">
    <header class="story-timeline__header" dir="rtl">
        <p class="story-timeline__kicker font-en">TIMELINE [2017 - 2026]</p>
        <h3 class="story-timeline__heading">
            رحلة تصاعدية من الأقدم إلى الأحدث، وكل محطة تظهر في شاشة مستقلة مع حركة
            انتقالية.
        </h3>
    </header>

    <div class="story-timeline__track" id="timeline-track">
        <?php foreach ($slides as $index => $slide):
            $theme = $timelineYearThemes[$slide['year']] ?? $fallbackTheme;
            $category = inferCategory($slide['title'], $slide['detail']);
            $stamp = buildStamp($slide['year'], $slide['eventIndex']);
            $mediaKind = mediaKindForSlide($index);
            $mediaSrc = ($mediaKind === 'video')
                ? 'assets/videos/hero.mp4'
                : framePath(frameForSlide($index));
            $isMediaLeft = ($index % 2 === 1);
        ?>
        <article
            class="story-slide<?= $isMediaLeft ? ' is-media-left' : '' ?>"
            style="--slide-accent:<?= $theme['accent'] ?>;--slide-surface:<?= $theme['surface'] ?>;--slide-surface-strong:<?= $theme['surfaceStrong'] ?>;--slide-ink:<?= $theme['ink'] ?>;--slide-wire:<?= $theme['wire'] ?>"
        >
            <span class="story-slide__bg-year font-en" aria-hidden="true"><?= $slide['year'] ?></span>

            <div class="story-slide__inner">
                <div class="story-slide__visual" aria-hidden="true">
                    <div class="story-slide__visual-card">
                        <div class="story-slide__chrome font-en">
                            <span class="story-slide__dot"></span>
                            <span class="story-slide__dot"></span>
                            <span class="story-slide__dot"></span>
                            <span class="story-slide__chrome-label">
                                <?= $category ?> / <?= $slide['year'] ?>
                            </span>
                        </div>

                        <div class="story-slide__media-wrap">
                            <?php if ($mediaKind === 'video'): ?>
                                <video class="story-slide__media" src="<?= $mediaSrc ?>" muted loop autoplay playsinline preload="metadata"></video>
                            <?php else: ?>
                                <img class="story-slide__media" src="<?= $mediaSrc ?>" alt="" loading="<?= $index < 2 ? 'eager' : 'lazy' ?>">
                            <?php endif; ?>
                            <div class="story-slide__media-overlay"></div>
                            <span class="story-slide__media-title font-en">
                                <?= htmlspecialchars(leadForVisual($slide['title'])) ?>
                            </span>
                        </div>

                        <span class="story-slide__visual-event font-en">
                            <?= str_pad($slide['eventIndex'] + 1, 2, '0', STR_PAD_LEFT) ?> / <?= str_pad($slide['eventCount'], 2, '0', STR_PAD_LEFT) ?>
                        </span>
                    </div>
                </div>

                <div class="story-slide__text" dir="rtl">
                    <p class="story-slide__meta font-en">[<?= $category ?>] [<?= $stamp ?>]</p>
                    <h4 class="story-slide__title"><?= htmlspecialchars($slide['title']) ?></h4>
                    <p class="story-slide__detail"><?= htmlspecialchars($slide['detail']) ?></p>
                    <a href="<?= htmlspecialchars($slide['sourceUrl']) ?>" target="_blank" rel="noreferrer" class="story-slide__source font-en" title="<?= htmlspecialchars($slide['sourceLabel']) ?>">
                        OPEN [+]
                    </a>
                </div>
            </div>

            <svg class="story-slide__wire" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,130 C140,85 225,205 340,160 C465,110 560,205 700,150 C820,103 930,194 1055,143 C1185,93 1295,185 1440,130"/>
            </svg>
        </article>
        <?php endforeach; ?>
    </div>

    <div class="story-timeline__hud" aria-label="timeline progress">
        <div class="story-timeline__progress-track">
            <span class="story-timeline__progress-fill" id="timeline-progress-fill"></span>
        </div>

        <div class="story-timeline__years font-en">
            <?php foreach ($timelineData as $yearItem): ?>
                <span class="story-year-marker" data-year="<?= $yearItem['year'] ?>"><?= $yearItem['year'] ?></span>
            <?php endforeach; ?>
        </div>
    </div>
</section>
