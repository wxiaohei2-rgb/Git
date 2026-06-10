import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";

const steps = [
  {
    label: "01",
    title: "输入营销目标",
    text: "车型、渠道、活动节点和预算约束先统一。"
  },
  {
    label: "02",
    title: "生成多模态素材",
    text: "文案、图像、视频和直播脚本按同一 Brief 展开。"
  },
  {
    label: "03",
    title: "沉淀项目资产",
    text: "可复核版本、素材说明和投放反馈留在工作台。"
  },
  {
    label: "04",
    title: "复盘数据表现",
    text: "用表现数据反向校准下一轮创意方向。"
  }
];

export function WorkflowSection() {
  return (
    <section className="relative z-10 scroll-mt-24 py-12 pb-20 sm:py-16" id="workflow">
      <div className="workflow-shell grid gap-8 rounded-lg border border-white/[0.12] bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
        <div>
          <SectionHeader
            badge="Operating Model"
            className="mb-0"
            title="更像一个营销生产系统，而不是一次性生成器"
            description="Matrix 的页面结构围绕“输入、生成、沉淀、复盘”组织，适合团队长期使用，而不只是单次体验。"
          />
          <Button asChild className="mt-8 h-12 w-full sm:w-auto" size="lg">
            <a href="#access">
              进入受控访问
              <ArrowRight />
            </a>
          </Button>
        </div>

        <WorkflowSteps />
      </div>
    </section>
  );
}

function WorkflowSteps() {
  return (
    <div className="workflow-steps">
      {steps.map((step) => (
        <article className="workflow-step" key={step.label}>
          <div className="workflow-step-index">
            <span>{step.label}</span>
            <CheckCircle2 className="size-4" />
          </div>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
