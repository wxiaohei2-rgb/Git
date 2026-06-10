"use client";

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";

const particles = Array.from({ length: 44 }, (_, index) => ({
  delay: -((index % 12) * 0.58),
  size: 2 + (index % 4),
  x: 6 + ((index * 37) % 82),
  y: 8 + ((index * 19) % 76)
}));

export function PasscodeHome() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passcodeVisible, setPasscodeVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passcodeVisible) {
      inputRef.current?.focus();
    }
  }, [passcodeVisible]);

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
    <main className="login-shell cinematic-login">
      <div className="cosmic-vignette" aria-hidden="true" />
      <div className="infinity-field" aria-hidden="true">
        <span className="infinity-orbit infinity-orbit-a">∞</span>
        <span className="infinity-orbit infinity-orbit-b">∞</span>
        <span className="infinity-orbit infinity-orbit-c">∞</span>
      </div>
      <div className="particle-field" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            style={
              {
                "--delay": `${particle.delay}s`,
                "--size": `${particle.size}px`,
                "--x": `${particle.x}%`,
                "--y": `${particle.y}%`
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="cinematic-floor" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <section className="cinematic-login-panel" aria-label="DaMai Matrix 访问入口">
        <div className="login-copy">
          <h1>大麦·Matrix ∞ AI</h1>
          <p>AI Creative Studio for Automotive Marketing</p>
        </div>

        {!passcodeVisible ? (
          <button className="cinematic-login-button" type="button" onClick={() => setPasscodeVisible(true)}>
            登录
          </button>
        ) : (
          <form className="passcode-form cinematic-passcode-form" onSubmit={handleSubmit}>
            <label htmlFor="passcode">访问口令</label>
            <div className="input-row">
              <LockKeyhole size={18} />
              <input
                ref={inputRef}
                id="passcode"
                name="passcode"
                type="password"
                autoComplete="current-password"
                placeholder="请输入访问口令"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
              />
              <button className="passcode-submit" type="submit" disabled={loading} title="进入创作台">
                <span>{loading ? "校验中" : "进入"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
            {message ? <p className="form-error">{message}</p> : null}
          </form>
        )}

        <p className="login-footnote">受控访问 · 项目资产保护 · 面向市场化产品</p>
      </section>
    </main>
  );
}
