import {
  ArrowRight,
  BarChart3,
  Bot,
  Film,
  ImageIcon,
  MessageSquareText,
  Workflow
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SectionHeader } from "@/components/marketing/section-header";

const capabilities = [
  {
    title: "文案策略",
    description: "面向车型卖点、活动节点和平台语气生成多版本内容。",
    icon: MessageSquareText,
    status: "Ready",
    metric: "多平台语气"
  },
  {
    title: "视觉生成",
    description: "把车型素材、参考图和风格指令组织成可复核的视觉资产。",
    icon: ImageIcon,
    status: "Visual",
    metric: "参考图链路"
  },
  {
    title: "视频脚本",
    description: "快速沉淀镜头结构、脚本文案和批量视频生产方向。",
    icon: Film,
    status: "Script",
    metric: "分镜编排"
  },
  {
    title: "数字人直播",
    description: "辅助直播话术、节奏控制和评论回应的内容编排。",
    icon: Bot,
    status: "Live",
    metric: "问答节奏"
  },
  {
    title: "营销洞察",
    description: "把投放、账号、线索数据变成下一轮创意判断依据。",
    icon: BarChart3,
    status: "Insight",
    metric: "线索回流"
  },
  {
    title: "协作流程",
    description: "把生成、复核、沉淀、复用放到同一个生产闭环。",
    icon: Workflow,
    status: "Ops",
    metric: "团队复用"
  }
];

export function CapabilitiesSection() {
  return (
    <section className="relative z-10 scroll-mt-24 py-12 sm:py-16" id="capabilities">
      <SectionHeader
        badge="Core Capabilities"
        title="为汽车营销团队保留足够清晰的工作层级"
        description="每个模块都围绕真实交付动作组织：生成、复核、沉淀、复用，再回到下一轮内容判断。"
      />

      <div className="feature-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              className="feature-card marketing-spotlight-surface min-h-48 border-white/[0.12] bg-white/[0.055]"
              key={item.title}
            >
              <CardHeader className="feature-card-header p-5">
                <div className="feature-card-top">
                  <span className="feature-card-icon">
                    <Icon className="size-5" />
                  </span>
                  <Badge variant="outline">{item.status}</Badge>
                </div>
                <CardTitle className="pt-5 text-xl leading-tight tracking-normal text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="feature-card-content p-5 pt-0">
                <p>{item.description}</p>
                <div className="feature-card-footer">
                  <span>{item.metric}</span>
                  <a href="#access" aria-label={`进入${item.title}`}>
                    进入模块
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
