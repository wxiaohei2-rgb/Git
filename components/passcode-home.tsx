"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

export function PasscodeHome() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode })
    });

    if (response.ok) {
      window.location.href = "/workspace";
      return;
    }

    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    setMessage(payload?.message ?? "无法进入 DaMai Matrix");
    setLoading(false);
  }

  return (
    <main className="login-shell">
      <div className="login-visual" aria-hidden="true" />
      <section className="login-panel" aria-label="DaMai Matrix 访问入口">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            ♾️
          </span>
          <span>DaMai Matrix</span>
        </div>

        <div className="login-copy">
          <p className="eyebrow">AI Creative Studio for Automotive Marketing</p>
          <h1>大麦·Matrix ∞ AI</h1>
          <p>
            面向汽车营销创作者的 AI 内容生产平台，统一完成文案、图像、视频、数字人直播与数据洞察。
          </p>
        </div>

        <form className="passcode-form" onSubmit={handleSubmit}>
          <label htmlFor="passcode">访问口令</label>
          <div className="input-row">
            <LockKeyhole size={18} />
            <input
              id="passcode"
              name="passcode"
              type="password"
              autoComplete="current-password"
              placeholder="请输入访问口令"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
            />
          </div>
          {message ? <p className="form-error">{message}</p> : null}
          <button className="primary-button" type="submit" disabled={loading}>
            <span>{loading ? "校验中" : "进入创作台"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="trust-row">
          <span>
            <ShieldCheck size={16} />
            受控访问
          </span>
          <span>项目资产保护</span>
          <span>面向市场化产品</span>
        </div>
      </section>
    </main>
  );
}
