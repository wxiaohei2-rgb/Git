import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="relative z-20 flex min-h-16 items-center justify-between gap-4">
      <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="大麦 Matrix 首页">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-[0_0_30px_rgba(96,165,250,0.2)]">
          <Sparkles className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white">
            大麦·Matrix ∞ AI
          </span>
          <span className="hidden text-xs text-slate-400 sm:block">
            Automotive Creative Studio
          </span>
        </span>
      </a>

      <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
        <a className="transition-colors hover:text-white" href="#showcase">
          产品
        </a>
        <a className="transition-colors hover:text-white" href="#capabilities">
          能力
        </a>
        <a className="transition-colors hover:text-white" href="#workflow">
          流程
        </a>
      </nav>

      <div className="flex items-center gap-2">
        <Button asChild className="hidden sm:inline-flex" size="sm" variant="secondary">
          <a href="#showcase">查看能力</a>
        </Button>
        <Button asChild size="sm">
          <a href="#access">
            进入
            <ArrowRight />
          </a>
        </Button>
      </div>
    </header>
  );
}
