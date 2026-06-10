import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = ["汽车营销创作", "多模态资产库", "投放信号回流"];

export function ProductHero() {
  return (
    <section className="login-brand-panel max-w-4xl py-6 sm:py-10 lg:py-14">
      <Badge className="hero-system-badge mb-7" variant="outline">
        <Sparkles className="size-3.5" />
        Matrix Creative Operating System
      </Badge>

      <div className="hero-matrix-lockup">
        <div className="matrix-brand-mark" aria-hidden="true">
          <span>∞</span>
        </div>
        <div className="hero-brand-code" aria-hidden="true">
          DAMAI / MATRIX / AI
        </div>
      </div>

      <h1 className="brand-headline text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-7xl lg:text-[6.65rem]">
        <span className="matrix-title-line">大麦·Matrix</span>
        <span className="matrix-title-ai">∞ AI</span>
      </h1>

      <p className="hero-subtitle mt-7 max-w-3xl text-xl font-medium leading-9 text-white sm:text-2xl">
        面向汽车营销团队的 AI 创作指挥舱。
      </p>
      <p className="hero-description mt-4 max-w-2xl text-base leading-8 text-slate-300">
        把文案策略、视觉生成、视频脚本、数字人直播和营销洞察收束到同一个 Matrix 工作台，让每一次 Campaign 都能沉淀成可复用资产。
      </p>

      <div className="hero-action-row mt-9 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="hero-primary-cta h-12 w-full sm:w-auto" size="lg">
          <a href="#access">
            打开 Matrix 入口
            <ArrowRight />
          </a>
        </Button>
        <Button asChild className="hero-secondary-cta h-12 w-full sm:w-auto" size="lg" variant="secondary">
          <a href="#showcase">预览工作台</a>
        </Button>
      </div>

      <div className="hero-proof-grid mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
        {proofPoints.map((item) => (
          <span
            className="brand-proof-pill inline-flex min-h-9 items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.06] px-3 backdrop-blur"
            key={item}
          >
            <CheckCircle2 className="size-4 text-cyan-200" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
