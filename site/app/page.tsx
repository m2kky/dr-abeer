import HorizontalExperience from "@/components/HorizontalExperience";
import IntroRevealSection from "@/components/IntroRevealSection";
import HorizontalTimelineSection from "@/components/HorizontalTimelineSection";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <HorizontalExperience />
      <IntroRevealSection />
      <HorizontalTimelineSection />
    </main>
  );
}
