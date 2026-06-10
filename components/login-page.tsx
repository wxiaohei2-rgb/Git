import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { LandingBackground } from "@/components/marketing/landing-background";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { ProductHero } from "@/components/marketing/product-hero";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SecureAccessCard } from "@/components/marketing/secure-access-card";
import { WorkflowSection } from "@/components/marketing/workflow-section";

export function LoginPage() {
  return (
    <main
      className="relative isolate min-h-svh overflow-hidden bg-[#030407] text-slate-50"
      id="top"
    >
      <LandingBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <MarketingNav />

        <section
          className="grid min-h-[min(46rem,calc(100svh-4.75rem))] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,27.5rem)] lg:gap-14 lg:py-12"
          aria-label="大麦 Matrix 产品入口"
        >
          <div className="order-2 lg:order-1">
            <ProductHero />
          </div>
          <div className="order-1 lg:order-2">
            <SecureAccessCard />
          </div>
        </section>

        <ProductShowcase />
        <CapabilitiesSection />
        <WorkflowSection />
      </div>
    </main>
  );
}
