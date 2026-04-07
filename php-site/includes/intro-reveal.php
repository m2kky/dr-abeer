<?php
$introText = 'من بناء المؤسسات التعليمية والصحية إلى مسار برلماني يخدم المصريين في الداخل والخارج، تتشكل رحلة ممتدة صنعت أثرًا عمليًا عامًا بعد عام. المحطات التالية ترصد كيف تحوّلت الخبرة إلى إنجازات، وكيف ظل الإنسان محور كل خطوة.';

$accentWords = ['المؤسسات', 'التعليمية', 'الصحية', 'برلماني', 'المصريين', 'إنجازات،', 'الإنسان'];

$words = explode(' ', $introText);
?>
<section class="intro-reveal-section" id="intro-reveal">
    <div class="intro-reveal-sticky">
        <p class="intro-reveal-kicker">تمهيد زمني قبل الخط الزمني</p>

        <h2 class="intro-reveal-text" aria-label="<?= htmlspecialchars($introText) ?>">
            <?php foreach ($words as $index => $word): ?>
                <span class="intro-reveal-word<?= in_array($word, $accentWords) ? ' is-accent' : '' ?>"><?= htmlspecialchars($word) ?></span>
            <?php endforeach; ?>
        </h2>

        <p class="intro-reveal-note">
            اسحب لأسفل لاكتشاف المحطات من 2017 حتى 2026
        </p>
    </div>
</section>
