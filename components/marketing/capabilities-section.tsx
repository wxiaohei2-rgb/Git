import {
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
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const capabilities = [
  {
    title: "文案策略",
    description: "面向车型卖点、活动节点和平台语气生成多版本内容。",
    icon: MessageSquareText
  },
  {
    title: "视觉生成",
    description: "把车型素材、参考图和风格指令组织成可复核的视觉资产。",
    icon: ImageIcon
  },
  {
    title: "视频脚本",
    description: "快速沉淀镜头结构、脚本文案和批量视频生产方向。",
    icon: Film
  },
  {
    title: "数字人直播",
    description: "辅助直播话术、节奏控制和评论回应的内容编排。",
    icon: Bot
  },
  {
    title: "营销洞察",
    description: "把投放、账号、线索数据变成下一轮创意判断依据。",
    icon: BarChart3
  },
  {
    title: "协作流程",
    description: "把生成、复核、沉淀、复用放到同一个生产闭环。",
    icon: Workflow
  }
];

export function CapabilitiesSection() {
  return (
    <section className="relative z-10 scroll-mt-24 py-12 sm:py-16" id="capabilities">
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <Badge className="mb-4" variant="secondary">
            Core Capabilities
          </Badge>
          <h2 className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
            为汽车营销团队保留足够清晰的工作层级
          </h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-slate-300">
          每个模块都围绕真实交付动作组织：生成、复核、沉淀、复用，再回到下一轮内容判断。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              className="marketing-spotlight-surface min-h-48 border-white/[0.12] bg-white/[0.055]"
              key={item.title}
            >
              <CardHeader className="p-5">
                <span className="grid size-10 place-items-center rounded-md border border-white/[0.1] bg-white/[0.06] text-cyan-200">
                  <Icon className="size-5" />
                </span>
                <CardTitle className="pt-5 text-xl leading-tight tracking-normal text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <CardDescription className="text-sm leading-6 text-slate-300">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
