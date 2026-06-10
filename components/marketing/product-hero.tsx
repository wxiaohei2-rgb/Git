import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = ["汽车营销创作", "多模态资产", "投放数据回流"];

export function ProductHero() {
  return (
    <section className="max-w-3xl py-8 sm:py-12 lg:py-16">
      <Badge className="mb-6" variant="outline">
        <Sparkles className="size-3.5" />
        AI Creative Ops for Auto Marketing
      </Badge>

      <h1 className="max-w-[12ch] text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-7xl">
        <span className="block text-slate-300">大麦·Matrix</span>
        <span className="block text-white">∞ AI</span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white sm:text-xl">
        面向汽车营销团队的 AI 内容生产与资产协作平台。
      </p>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
        将文案、视觉、短视频、数字人直播与投放数据整理成一个受控工作台，让团队在更少切换中完成高质量素材生产。
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-12 w-full sm:w-auto" size="lg">
          <a href="#access">
            申请进入创作台
            <ArrowRight />
          </a>
        </Button>
        <Button asChild className="h-12 w-full sm:w-auto" size="lg" variant="secondary">
          <a href="#showcase">查看产品界面</a>
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
        {proofPoints.map((item) => (
          <span
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.06] px-3 backdrop-blur"
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
