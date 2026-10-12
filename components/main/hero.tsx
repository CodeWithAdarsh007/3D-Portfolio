import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <section
      id="about"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 md:gap-6 max-w-[1200px] mx-auto px-4">
        <HeroContent />
      </div>
    </section>
  );
};
