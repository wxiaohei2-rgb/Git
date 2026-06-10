"use client";

import Image from "next/image";
import { BarChart3, Film, ImageIcon, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const showcases = [
  {
    id: "content",
    label: "内容工作台",
    icon: WandSparkles,
    title: "从活动 Brief 到多平台素材，一次组织完整生产链路",
    image: "/assets/ppt-workbench.jpg",
    details: ["统一管理品牌语气、车型卖点与渠道版本", "减少文案、设计、视频团队之间的重复切换", "将生成结果沉淀为可复用项目资产"]
  },
  {
    id: "visual",
    label: "视觉资产",
    icon: ImageIcon,
    title: "面向新车上市、门店活动和社媒种草的视觉生成空间",
    image: "/assets/ppt-image-studio.jpg",
    details: ["车型素材、场景参考与画面风格集中管理", "支持图文、短视频和直播脚本协同生产", "让设计复核从零散文件回到同一界面"]
  },
  {
    id: "insight",
    label: "数据洞察",
    icon: BarChart3,
    title: "把投放反馈和内容资产放在同一张经营视图里",
    image: "/assets/ppt-data-dashboard.jpg",
    details: ["快速比较素材表现、线索阶段和账号状态", "用真实数据反哺下一轮内容生产", "帮助市场团队判断哪些创意值得放大"]
  }
];

export function ProductShowcase() {
  return (
    <section className="relative z-10 scroll-mt-24 py-12 sm:py-16 lg:py-20" id="showcase">
      <div className="mb-8 max-w-3xl">
        <Badge className="mb-4" variant="secondary">
          Product Interface
        </Badge>
        <h2 className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
          把一次创意需求推进到可复用的项目资产
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          从 Brief、素材、生成参数到复盘数据，团队可以在同一套工作流里看见状态、版本和下一步动作。
        </p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          {showcases.map((item) => {
            const Icon = item.icon;

            return (
              <TabsTrigger className="gap-2 px-2 sm:px-4" key={item.id} value={item.id}>
                <Icon className="hidden size-4 sm:block" />
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {showcases.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <div className="marketing-spotlight-surface grid overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.055] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="relative min-h-[18rem] border-b border-white/[0.1] bg-slate-950/60 lg:min-h-[30rem] lg:border-b-0 lg:border-r">
                <Image
                  alt={item.title}
                  className="object-cover object-top"
                  fill
                  priority={item.id === "content"}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070b]/80 via-transparent to-transparent" />
              </div>

              <div className="grid content-center gap-6 p-6 sm:p-8">
                <Badge variant="outline">{item.label}</Badge>
                <div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white">
                    {item.title}
                  </h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
                    {item.details.map((detail) => (
                      <li className="flex gap-3" key={detail}>
                        <Film className="mt-1 size-4 shrink-0 text-cyan-200" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
