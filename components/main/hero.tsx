import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-4 md:gap-6 max-w-[1200px] mx-auto px-4">
        <HeroContent />
      </div>
    </section>
  );
};
