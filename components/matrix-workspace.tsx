"use client";

import Link from "next/link";
import {
  BarChart3,
  Bot,
  CalendarClock,
  CheckCircle2,
  Copy,
  Film,
  History,
  ImageIcon,
  Library,
  Loader2,
  LogOut,
  MessageSquareText,
  Mic2,
  MonitorPlay,
  Paperclip,
  Play,
  Plus,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Upload,
  WandSparkles,
  Workflow
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  accountRows,
  batchMaterials,
  collectionJobs,
  copyThreads,
  imageReferences,
  imageVersions,
  insightFunnel,
  liveComments,
  modules,
  videoCanvases,
  type ModuleId,
  type WorkModule
} from "@/lib/mock-data";
import { Textarea } from "@/components/ui/textarea";

const iconMap: Record<ModuleId, typeof MessageSquareText> = {
  copy: MessageSquareText,
  image: ImageIcon,
  video: Film,
  batchVideo: MonitorPlay,
  avatar: Bot,
  insights: BarChart3
};

const moduleSignals: Record<ModuleId, Array<[string, string]>> = {
  copy: [
    ["输出", "脚本 / 标题 / 话术"],
    ["语气", "平台适配"],
    ["复核", "可复制导出"]
  ],
  image: [
    ["画布", "参考图链路"],
    ["比例", "4:3 / 3:4 / 16:9"],
    ["版本", "可精修"]
  ],
  video: [
    ["结构", "分镜节点"],
    ["队列", "首帧 / 运动 / 裁切"],
    ["时长", "15s / 30s"]
  ],
  batchVideo: [
    ["素材", "批量上传"],
    ["成片", "多平台规格"],
    ["模板", "可复用"]
  ],
  avatar: [
    ["直播", "60 分钟流程"],
    ["互动", "问答库"],
    ["线索", "商品卡承接"]
  ],
  insights: [
    ["采集", "周期同步"],
    ["漏斗", "曝光到试驾"],
    ["复盘", "周报输出"]
  ]
};

type SurfaceProps = {
  brief: string;
  generationCount: number;
  isGenerating: boolean;
  module: WorkModule;
  progress: number;
  onBriefChange: (value: string) => void;
  onCopy: () => void;
  onExport: () => void;
  onGenerate: () => void;
  onNewCanvas: () => void;
};

export function MatrixWorkspace() {
  const [activeId, setActiveId] = useState<ModuleId>("copy");
  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeId) ?? modules[0],
    [activeId]
  );
  const [brief, setBrief] = useState(activeModule.defaultBrief);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationCount, setGenerationCount] = useState(1);
  const [canvasCount, setCanvasCount] = useState(videoCanvases.length);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setBrief(activeModule.defaultBrief);
    setProgress(0);
    setIsGenerating(false);
  }, [activeModule]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function handleGenerate() {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(10);

    let current = 10;
    const interval = window.setInterval(() => {
      current += 9;
      if (current >= 100) {
        window.clearInterval(interval);
        setProgress(100);
        setGenerationCount((value) => value + 1);
        window.setTimeout(() => {
          setIsGenerating(false);
          setToast(`${activeModule.title}结果已更新`);
        }, 260);
        return;
      }
      setProgress(current);
    }, 240);
  }

  async function copyResult() {
    const text = [
      activeModule.title,
      brief,
      "已生成：创意方向、内容资产、执行参数和后续动作。"
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setToast("结果已复制");
  }

  function exportResult() {
    const text = [
      `# ${activeModule.title}`,
      "",
      `Brief：${brief}`,
      "",
      "创作结果：",
      "- 资产结构已生成",
      "- 生成参数已保存",
      "- 可继续进入项目资产库"
    ].join("\n");
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${activeModule.navTitle}-结果.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("结果已导出");
  }

  function createCanvas() {
    setCanvasCount((value) => value + 1);
    setToast("新画布已创建");
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }

  const surfaceProps: SurfaceProps = {
    brief,
    generationCount,
    isGenerating,
    module: activeModule,
    progress,
    onBriefChange: setBrief,
    onCopy: copyResult,
    onExport: exportResult,
    onGenerate: handleGenerate,
    onNewCanvas: createCanvas
  };

  return (
    <main className="studio-shell">
      <StudioSidebar activeId={activeId} onSelect={setActiveId} />

      <section className="studio-main">
        <StudioTopbar activeModule={activeModule} onLogout={logout} />

        <section className="workspace-surface" style={{ "--accent": activeModule.accent } as React.CSSProperties}>
          <ModuleSignalBar module={activeModule} />
          <WorkspaceSurface activeId={activeId} canvasCount={canvasCount} {...surfaceProps} />
        </section>
      </section>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}

function ModuleSignalBar({ module }: { module: WorkModule }) {
  return (
    <div className="module-signal-bar" aria-label={`${module.title}模块状态`}>
      <div className="module-signal-title">
        <span>{module.kicker}</span>
        <strong>{module.title}</strong>
      </div>
      <div className="module-signal-grid">
        {moduleSignals[module.id].map(([label, value]) => (
          <div className="module-signal-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioSidebar({
  activeId,
  onSelect
}: {
  activeId: ModuleId;
  onSelect: (id: ModuleId) => void;
}) {
  return (
    <aside className="studio-sidebar" aria-label="工具导航">
      <Link className="studio-logo" href="/" aria-label="返回首页">
        <span aria-hidden="true">∞</span>
      </Link>

      <nav className="studio-icon-nav">
        {modules.map((module) => {
          const Icon = iconMap[module.id];
          return (
            <button
              key={module.id}
              className={module.id === activeId ? "studio-icon active" : "studio-icon"}
              style={{ "--accent": module.accent } as React.CSSProperties}
              type="button"
              title={module.title}
              onClick={() => onSelect(module.id)}
            >
              <Icon size={19} />
              <span>{module.navTitle}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function StudioTopbar({
  activeModule,
  onLogout
}: {
  activeModule: WorkModule;
  onLogout: () => void;
}) {
  return (
    <header className="studio-topbar">
      <div className="studio-brandline">
        <span aria-hidden="true">∞</span>
        <strong>大麦·Matrix ∞ AI</strong>
        <em>{activeModule.navTitle}</em>
      </div>
      <div className="studio-search">
        <Search size={17} />
        <span>搜索项目、资产或历史创作</span>
      </div>
      <button className="ghost-button topbar-exit" type="button" onClick={onLogout}>
        <LogOut size={16} />
        退出
      </button>
    </header>
  );
}

function WorkspaceSurface({
  activeId,
  canvasCount,
  ...props
}: SurfaceProps & { activeId: ModuleId; canvasCount: number }) {
  if (activeId === "copy") return <CopyChatSurface {...props} />;
  if (activeId === "image") return <ImageFlowSurface {...props} />;
  if (activeId === "video") return <VideoCanvasSurface {...props} canvasCount={canvasCount} />;
  if (activeId === "batchVideo") return <BatchVideoSurface {...props} />;
  if (activeId === "avatar") return <AvatarLiveSurface {...props} />;
  return <InsightsCollectorSurface {...props} />;
}

function SurfaceHeader({
  module,
  actions
}: {
  module: WorkModule;
  actions?: React.ReactNode;
}) {
  return (
    <div className="surface-header">
      <div>
        <p className="eyebrow">{module.kicker}</p>
        <h1>{module.title}</h1>
        <span>{module.description}</span>
      </div>
      {actions ? <div className="surface-actions">{actions}</div> : null}
    </div>
  );
}

function GenerateButton({
  isGenerating,
  label,
  onClick
}: {
  isGenerating: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="generate-button" type="button" onClick={onClick}>
      {isGenerating ? <Loader2 className="spin" size={18} /> : <WandSparkles size={18} />}
      {isGenerating ? "生成中" : label}
    </button>
  );
}

function ProgressLine({ progress, isGenerating }: { progress: number; isGenerating: boolean }) {
  return (
    <div className="generation-track" aria-label="生成进度">
      <span style={{ width: `${isGenerating ? progress : 100}%` }} />
    </div>
  );
}

function CopyChatSurface({
  brief,
  generationCount,
  isGenerating,
  module,
  progress,
  onBriefChange,
  onCopy,
  onGenerate
}: SurfaceProps) {
  return (
    <div className="copy-chat-layout">
      <aside className="chat-thread-rail">
        <button className="new-chat-button" type="button">
          <Plus size={16} />
          新建创作
        </button>
        <div className="thread-list">
          {copyThreads.map((thread) => (
            <button className={thread.active ? "thread-item active" : "thread-item"} key={thread.title} type="button">
              <MessageSquareText size={16} />
              <span>{thread.title}</span>
              <em>{thread.time}</em>
            </button>
          ))}
        </div>
      </aside>

      <section className="chat-main">
        <SurfaceHeader module={module} />

        <div className="chat-stream">
          <article className="chat-message user">
            <span>你</span>
            <p>{brief}</p>
          </article>
          <article className="chat-message assistant">
            <span>大麦·Matrix ∞ AI</span>
            <div>
              <p>
                可以。建议把内容拆成 3 条短视频脚本、6 个种草标题和 1 组评论区互动话术，统一围绕“城市到露营”的出行场景。
              </p>
              <ul>
                <li>开头：用周五下班直接出发制造代入感。</li>
                <li>中段：用空间、通过性、露营装备承载卖点。</li>
                <li>结尾：引导预约试驾和到店看车。</li>
              </ul>
            </div>
          </article>
          <article className="chat-message assistant compact">
            <span>输出 #{generationCount}</span>
            <p>{isGenerating ? "正在重组平台语气、卖点顺序和合规表达。" : "已生成短视频脚本、标题组和直播开场话术。"}</p>
          </article>
        </div>

        <div className="chat-composer">
          <div className="copy-template-row">
            {["短视频脚本", "小红书种草", "直播话术", "信息流标题"].map((item) => (
              <button key={item} type="button">{item}</button>
            ))}
          </div>
          <Textarea
            aria-label="文案创作 Prompt"
            value={brief}
            onChange={(event) => onBriefChange(event.target.value)}
            placeholder="像聊天一样描述车型、平台、人群、语气和目标。"
          />
          <div className="composer-footer">
            <div className="chat-tools">
              <button className="icon-button" type="button" title="添加附件">
                <Paperclip size={17} />
              </button>
              <button className="icon-button" type="button" title="复制结果" onClick={onCopy}>
                <Copy size={17} />
              </button>
            </div>
            <GenerateButton isGenerating={isGenerating} label="发送" onClick={onGenerate} />
          </div>
          <ProgressLine isGenerating={isGenerating} progress={progress} />
        </div>
      </section>
    </div>
  );
}

function ImageFlowSurface({
  brief,
  isGenerating,
  module,
  progress,
  onBriefChange,
  onGenerate
}: SurfaceProps) {
  return (
    <div className="flow-layout">
      <section className="flow-workspace">
        <SurfaceHeader
          module={module}
          actions={
            <>
              <button className="ghost-button" type="button">
                <Upload size={16} />
                上传参考
              </button>
              <GenerateButton isGenerating={isGenerating} label="生成图像" onClick={onGenerate} />
            </>
          }
        />

        <div className="flow-board" aria-label="图像生成画布">
          <article className="flow-node prompt-node">
            <span>Prompt</span>
            <p>{brief}</p>
          </article>
          <article className="flow-node image-node large">
            <img src="/assets/ppt-image-studio.jpg" alt="生成图像主视觉" />
            <strong>山野清晨主视觉</strong>
          </article>
          <article className="flow-node image-node">
            <img src="/assets/ppt-hero.jpg" alt="车型参考图" />
            <strong>雨天动态参考</strong>
          </article>
          <article className="flow-node note-node">
            <span>Refine</span>
            <p>保留车身真实比例，降低环境饱和度，画面顶部留标题空间。</p>
          </article>
        </div>

        <div className="flow-prompt-bar">
          <Textarea
            aria-label="图像生成 Prompt"
            value={brief}
            onChange={(event) => onBriefChange(event.target.value)}
          />
          <button className="icon-button" type="button" title="发送生成" onClick={onGenerate}>
            {isGenerating ? <Loader2 className="spin" size={17} /> : <Send size={17} />}
          </button>
        </div>
        <ProgressLine isGenerating={isGenerating} progress={progress} />
      </section>

      <aside className="flow-inspector">
        <PanelTitle icon={<SlidersHorizontal size={17} />} title="生成参数" />
        <div className="setting-grid">
          <span>比例</span>
          <strong>4:3</strong>
          <span>风格</span>
          <strong>高级汽车大片</strong>
          <span>种子</span>
          <strong>248196</strong>
          <span>输出</span>
          <strong>4 张</strong>
        </div>

        <PanelTitle icon={<Library size={17} />} title="参考素材" />
        <div className="reference-list">
          {imageReferences.map((item) => (
            <article key={item.name}>
              <img src={item.src} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{item.meta}</span>
              </div>
            </article>
          ))}
        </div>

        <PanelTitle icon={<History size={17} />} title="版本历史" />
        <div className="version-list">
          {imageVersions.map((item) => (
            <article key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.ratio} · {item.state}</span>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}

function VideoCanvasSurface({
  brief,
  canvasCount,
  isGenerating,
  module,
  progress,
  onBriefChange,
  onGenerate,
  onNewCanvas
}: SurfaceProps & { canvasCount: number }) {
  const shots = ["城市出发", "山路穿越", "露营抵达", "试驾引导"];

  return (
    <div className="video-canvas-layout">
      <SurfaceHeader
        module={module}
        actions={
          <>
            <button className="ghost-button" type="button" onClick={onNewCanvas}>
              <Plus size={16} />
              新建画布
            </button>
            <GenerateButton isGenerating={isGenerating} label="生成视频" onClick={onGenerate} />
          </>
        }
      />

      <div className="canvas-grid">
        <aside className="canvas-list">
          <PanelTitle icon={<Workflow size={17} />} title={`画布 ${canvasCount}`} />
          {videoCanvases.map((canvas) => (
            <article key={canvas.title}>
              <strong>{canvas.title}</strong>
              <span>{canvas.nodes} 个节点 · {canvas.duration}</span>
              <em>{canvas.state}</em>
            </article>
          ))}
        </aside>

        <section className="node-canvas">
          <div className="canvas-toolbar">
            <span>Project / 城市到山野 15s</span>
            <div>
              <button type="button">分镜</button>
              <button type="button">首尾帧</button>
              <button type="button">时间线</button>
            </div>
          </div>

          <div className="node-stage">
            {shots.map((shot, index) => (
              <article className="story-node" key={shot}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{shot}</strong>
                  <p>{index === 0 ? "低机位城市隧道推进" : index === 1 ? "山路侧面跟拍与车身反光" : index === 2 ? "营地抵达和装备展开" : "预约试驾行动引导"}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="timeline-strip">
            {shots.map((shot, index) => (
              <span key={shot} style={{ "--w": `${index === 0 ? 24 : index === 1 ? 30 : index === 2 ? 26 : 20}%` } as React.CSSProperties}>
                {shot}
              </span>
            ))}
          </div>

          <div className="canvas-prompt">
            <Textarea
              aria-label="视频生成 Prompt"
              value={brief}
              onChange={(event) => onBriefChange(event.target.value)}
            />
            <GenerateButton isGenerating={isGenerating} label="生成分镜" onClick={onGenerate} />
          </div>
          <ProgressLine isGenerating={isGenerating} progress={progress} />
        </section>

        <aside className="queue-panel">
          <PanelTitle icon={<Play size={17} />} title="生成队列" />
          {["首帧生成", "镜头运动", "9:16 裁切", "封面导出"].map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <em>{index < 2 ? "已完成" : index === 2 ? "生成中" : "等待中"}</em>
            </article>
          ))}
        </aside>
      </div>
    </div>
  );
}

function BatchVideoSurface({
  brief,
  isGenerating,
  module,
  progress,
  onBriefChange,
  onGenerate
}: SurfaceProps) {
  return (
    <div className="batch-layout">
      <aside className="batch-config">
        <SurfaceHeader module={module} />

        <section className="batch-section">
          <PanelTitle icon={<Settings2 size={17} />} title="基础配置" />
          <label>
            产品名称/经营项目
            <input value="旅行者单车解说" readOnly />
          </label>
          <label>
            产品信息/经营信息
            <Textarea value={brief} onChange={(event) => onBriefChange(event.target.value)} />
          </label>
        </section>

        <section className="batch-section">
          <PanelTitle icon={<Film size={17} />} title="视频类型" />
          <div className="batch-type-grid">
            <button className="active" type="button">
              口播视频
              <span>真人/数字人讲解</span>
            </button>
            <button type="button">
              标题/纯音乐视频
              <span>素材快剪成片</span>
            </button>
          </div>
        </section>

        <section className="batch-section">
          <PanelTitle icon={<Upload size={17} />} title="上传素材视频" />
          <div className="material-row">
            <button className="material-add" type="button">+</button>
            {batchMaterials.map((item) => (
              <article key={item.name}>
                <img src={item.src} alt={item.name} />
                <strong>{item.time}</strong>
                <span>{item.name}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="batch-section compact">
          <div className="toggle-line">
            <span>数字人</span>
            <i />
          </div>
          <div className="toggle-line">
            <span>自定义文案</span>
            <i />
          </div>
        </section>
      </aside>

      <section className="batch-preview">
        <div className="batch-empty">
          <MonitorPlay size={54} />
          <strong>{isGenerating ? "正在生成预览视频" : "预览视频"}</strong>
          <span>{isGenerating ? "系统正在拆解素材、匹配文案和生成竖屏版本。" : "上传素材并填写经营信息后，可在这里查看批量预览。"}</span>
        </div>
        <div className="batch-actions">
          <button className="ghost-button" type="button">
            另存为策划模板
          </button>
          <GenerateButton isGenerating={isGenerating} label="生成预览视频" onClick={onGenerate} />
        </div>
        <ProgressLine isGenerating={isGenerating} progress={progress} />
      </section>

      <aside className="batch-settings">
        <PanelTitle icon={<SlidersHorizontal size={17} />} title="高级设置" />
        {[
          ["成片比例", "9:16 / 16:9"],
          ["生成条数", "12 条"],
          ["字幕样式", "品牌白字"],
          ["分发平台", "抖音 / 小红书"]
        ].map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </aside>
    </div>
  );
}

function AvatarLiveSurface({
  brief,
  isGenerating,
  module,
  progress,
  onBriefChange,
  onGenerate
}: SurfaceProps) {
  return (
    <div className="avatar-live-layout">
      <section className="live-phone-stage">
        <img src="/assets/avatar-live-bg.png" alt="数字人直播底图" />
        <div className="live-overlay top">
          <strong>捷途汽车</strong>
          <span>12.8万本场点赞</span>
        </div>
        <div className="live-comment-stack">
          {liveComments.map((comment) => (
            <span key={comment}>{comment}</span>
          ))}
        </div>
      </section>

      <aside className="live-control-panel">
        <SurfaceHeader module={module} />
        <div className="live-script-card">
          <PanelTitle icon={<Mic2 size={17} />} title="直播脚本" />
          <Textarea
            aria-label="数字人直播 Prompt"
            value={brief}
            onChange={(event) => onBriefChange(event.target.value)}
          />
        </div>
        <div className="live-metric-grid">
          {[
            ["脚本段落", "18"],
            ["问答库", "36"],
            ["商品卡", "6"],
            ["循环话术", "开启"]
          ].map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <GenerateButton isGenerating={isGenerating} label="生成直播流程" onClick={onGenerate} />
        <ProgressLine isGenerating={isGenerating} progress={progress} />
      </aside>
    </div>
  );
}

function InsightsCollectorSurface({
  isGenerating,
  module,
  progress,
  onGenerate
}: SurfaceProps) {
  return (
    <div className="insights-layout">
      <SurfaceHeader
        module={module}
        actions={<GenerateButton isGenerating={isGenerating} label="立即采集" onClick={onGenerate} />}
      />

      <div className="collector-grid">
        <section className="collector-panel">
          <PanelTitle icon={<CalendarClock size={17} />} title="周期性数据收集" />
          <div className="collection-jobs">
            {collectionJobs.map((job) => (
              <article key={job.name}>
                <div>
                  <strong>{job.name}</strong>
                  <span>{job.source}</span>
                </div>
                <em>{job.cadence}</em>
                <b className={job.status === "待授权" ? "waiting" : ""}>{job.status}</b>
                <div className="collector-progress">
                  <i style={{ width: `${job.progress}%` }} />
                </div>
                <small>最近同步：{job.latest}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="collector-panel">
          <PanelTitle icon={<BarChart3 size={17} />} title="指标口径" />
          <div className="funnel collector-funnel">
            {insightFunnel.map((item) => (
              <div className="funnel-row" key={item.label}>
                <span>{item.label}</span>
                <div>
                  <i style={{ width: `${item.width}%` }} />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="collector-panel wide">
          <PanelTitle icon={<Library size={17} />} title="账号表现 / 素材趋势" />
          <div className="account-table">
            {accountRows.map((row) => (
              <div key={row.name}>
                <span>{row.name}</span>
                <strong>{row.exposure}</strong>
                <em>{row.leads}</em>
                <b>{row.engagement}</b>
              </div>
            ))}
          </div>
          <div className="trend-cards">
            {["露营场景互动更高", "本地试驾内容线索更稳定", "参数讲解适合作为第二镜头"].map((item) => (
              <article key={item}>
                <CheckCircle2 size={16} />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
      <ProgressLine isGenerating={isGenerating} progress={progress} />
    </div>
  );
}

function PanelTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="panel-title">
      {icon}
      <span>{title}</span>
    </div>
  );
}
