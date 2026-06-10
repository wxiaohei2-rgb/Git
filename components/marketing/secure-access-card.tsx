"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const trustItems = ["受控访问", "资产保护", "内测空间"];

export function SecureAccessCard() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPasscode = passcode.trim();

    if (!normalizedPasscode) {
      setMessage("请输入访问口令");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: normalizedPasscode })
      });

      if (response.ok) {
        window.location.href = "/workspace";
        return;
      }

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setMessage(payload?.message ?? "无法进入 DaMai Matrix");
    } catch {
      setMessage("网络连接异常，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className="login-access-card marketing-spotlight-surface mx-auto w-full max-w-[27.5rem] overflow-hidden border-white/[0.14] bg-[#070a12]/82"
      id="access"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-200/80 via-45% to-transparent" />
      <div className="access-orbital-mark" aria-hidden="true">
        <span>∞</span>
      </div>
      <CardHeader className="p-6 pb-5 sm:p-8 sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid size-11 shrink-0 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-[0_0_34px_rgba(96,165,250,0.24)]"
              aria-hidden="true"
            >
              <Sparkles className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">大麦·Matrix ∞ AI</p>
              <p className="text-xs text-slate-400">Secure Creative Studio</p>
            </div>
          </div>
          <Badge variant="secondary">∞ AI</Badge>
        </div>

        <div className="pt-8">
          <p className="text-xs font-semibold uppercase tracking-normal text-cyan-200">
            Controlled Access
          </p>
          <CardTitle className="mt-3 text-[1.75rem] leading-tight tracking-normal text-white sm:text-[2rem]">
            进入 Matrix 创作空间
          </CardTitle>
          <CardDescription className="mt-3 max-w-[32ch] text-[0.95rem] leading-6 text-slate-300">
            输入项目访问口令，继续进入汽车营销 AI 内容生产空间。
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="passcode">访问口令</Label>
            <div className="relative">
              <LockKeyhole
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                id="passcode"
                name="passcode"
                type="password"
                autoComplete="current-password"
                placeholder="输入访问口令"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                className="w-full pl-10"
                aria-describedby={message ? "passcode-error" : undefined}
                aria-invalid={Boolean(message)}
              />
            </div>
          </div>

          {message ? (
            <p
              className="text-sm leading-5 text-rose-200"
              id="passcode-error"
              aria-live="polite"
            >
              {message}
            </p>
          ) : null}

          <Button
            className="h-12 w-full rounded-md"
            disabled={loading}
            size="lg"
            type="submit"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                校验中
              </>
            ) : (
              <>
                进入创作台
                <ArrowRight />
              </>
            )}
          </Button>
        </form>

        <div className="access-status-line" aria-label="当前访问状态">
          <span>Private beta</span>
          <strong>Matrix secure gateway</strong>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-300">
          {trustItems.map((item, index) => (
            <span
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-white/[0.1] bg-white/[0.05] px-2"
              key={item}
            >
              {index === 0 ? <ShieldCheck className="size-3.5 text-cyan-200" /> : null}
              {item}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
