<?php include __DIR__ . '/includes/header.php'; ?>

<main class="bg-black text-white">
    <!-- Horizontal Experience Section (Hero + Mission + TextMask) -->
    <!-- On desktop: horizontal scroll. On mobile: vertical stack -->
    <section class="h-scroll-section" id="horizontal-experience" style="direction: ltr">
        <div class="h-scroll-inner" id="h-scroll-inner">
            <!-- REVERSED ORDER for RTL horizontal scroll (desktop) -->
            <!-- Panel 1: TextMask -->
            <div class="scroll-panel" style="direction: rtl">
                <?php include __DIR__ . '/includes/textmask-panel.php'; ?>
            </div>
            <!-- Panel 2: Mission -->
            <div class="scroll-panel" style="direction: rtl">
                <?php include __DIR__ . '/includes/mission-panel.php'; ?>
            </div>
            <!-- Panel 3: Hero (visible first) -->
            <div class="scroll-panel">
                <?php include __DIR__ . '/includes/hero-panel.php'; ?>
            </div>
        </div>
    </section>

    <!-- Intro Reveal Section -->
    <?php include __DIR__ . '/includes/intro-reveal.php'; ?>

    <!-- Horizontal Timeline Section -->
    <?php include __DIR__ . '/includes/timeline-section.php'; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
