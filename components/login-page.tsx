import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MatrixBackground } from "@/components/marketing/matrix-background";
import { ProductHero } from "@/components/marketing/product-hero";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SecureAccessCard } from "@/components/marketing/secure-access-card";
import { WorkflowSection } from "@/components/marketing/workflow-section";

const signalItems = [
  ["Matrix Core", "汽车营销 AI 中枢"],
  ["Asset Memory", "素材 / 话术 / 数据沉淀"],
  ["Secure Gate", "受控访问与资产保护"]
];

export function LoginPage() {
  return (
    <main
      className="relative isolate min-h-svh overflow-hidden bg-[#030407] text-slate-50"
      id="top"
    >
      <MatrixBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <MarketingNav />

        <section className="login-redesign-stage" aria-label="大麦 Matrix 产品入口">
          <div className="login-hero-copy">
            <ProductHero />
          </div>
          <div className="login-portal">
            <div className="login-portal-rings" aria-hidden="true" />
            <SecureAccessCard />
          </div>
          <aside className="login-signal-dock" aria-label="产品状态">
            <span className="signal-panel-kicker">System Signal</span>
            {signalItems.map(([label, value]) => (
              <div className="signal-panel-item" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </aside>
        </section>

        <ProductShowcase />
        <CapabilitiesSection />
        <WorkflowSection />
      </div>
    </main>
  );
}
