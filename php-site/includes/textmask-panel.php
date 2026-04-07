<div class="h-panel" id="textmask-panel" style="isolation: isolate">
    <!-- Background video plays behind the mask -->
    <video class="textmask-video" autoplay muted loop playsinline preload="auto">
        <source src="assets/videos/hero.mp4" type="video/mp4">
    </video>

    <!-- Gradient fallback -->
    <div class="textmask-bg-gradient"></div>

    <!-- White text reveals the video through multiply blending -->
    <div class="text-mask-overlay">
        <div id="text-mask-text" class="text-mask-text" style="font-size: 45vw">
            <span>من هنا تبدأ المسؤولية</span>
            <span id="text-mask-dot" class="text-mask-dot" aria-hidden="true"></span>
        </div>
    </div>
</div>
