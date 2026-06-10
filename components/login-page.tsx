import { CapabilitiesSection } from "@/components/marketing/capabilities-section";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MatrixBackground } from "@/components/marketing/matrix-background";
import { ProductHero } from "@/components/marketing/product-hero";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SecureAccessCard } from "@/components/marketing/secure-access-card";
import { WorkflowSection } from "@/components/marketing/workflow-section";

const signalItems = [
  ["Studio OS", "6 个内容模块"],
  ["Asset Loop", "生成 / 复核 / 复用"],
  ["Launch Ready", "面向市场团队"]
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

        <section
          className="login-ceremony-grid grid min-h-[min(48rem,calc(100svh-4.75rem))] items-center gap-6 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(23rem,28rem)_minmax(0,0.92fr)] lg:gap-8 lg:py-12"
          aria-label="大麦 Matrix 产品入口"
        >
          <div className="order-2 lg:order-1">
            <ProductHero />
          </div>
          <div className="order-1 lg:order-2">
            <SecureAccessCard />
          </div>
          <aside className="signal-panel order-3 hidden lg:grid" aria-label="产品状态">
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
