export type ModuleId = "copy" | "image" | "video" | "batchVideo" | "avatar" | "insights";

export type WorkModule = {
  id: ModuleId;
  title: string;
  navTitle: string;
  kicker: string;
  description: string;
  accent: string;
  defaultBrief: string;
};

export type ChatThread = {
  title: string;
  time: string;
  active?: boolean;
};

export type ProjectAsset = {
  name: string;
  type: string;
  meta: string;
};

export type RecentTask = {
  title: string;
  type: string;
  time: string;
  state: string;
};

export type CollectionJob = {
  name: string;
  source: string;
  cadence: string;
  latest: string;
  status: "运行中" | "已同步" | "待授权";
  progress: number;
};

export const modules: WorkModule[] = [
  {
    id: "copy",
    title: "文案创作",
    navTitle: "文案",
    kicker: "Copy Studio",
    description: "用对话完成脚本、标题、直播话术和平台适配文案。",
    accent: "#6ee7ff",
    defaultBrief:
      "为捷途旅行者生成一组小红书和抖音可用的周末露营种草文案，语气专业但有生活感。"
  },
  {
    id: "image",
    title: "图像生成",
    navTitle: "图像",
    kicker: "Image Flow",
    description: "在创意画布里生成主视觉、封面、参考图和多版本视觉资产。",
    accent: "#8cff64",
    defaultBrief:
      "清晨山地公路，捷途旅行者居中偏下，低饱和高级质感，适合社媒封面。"
  },
  {
    id: "video",
    title: "视频生成",
    navTitle: "视频",
    kicker: "Video Canvas",
    description: "新建画布，编排分镜节点、首尾帧、时间线和生成队列。",
    accent: "#ff755e",
    defaultBrief:
      "城市出发、山路穿越、露营抵达，生成 15 秒高级感汽车短片分镜。"
  },
  {
    id: "batchVideo",
    title: "批量一键AI视频",
    navTitle: "批量",
    kicker: "Batch Video",
    description: "上传素材和经营信息，一键批量生成多平台短视频任务。",
    accent: "#ffcc66",
    defaultBrief:
      "使用 6 段门店素材，为捷途旅行者生成 12 条本地生活和企业营销短视频。"
  },
  {
    id: "avatar",
    title: "数字人直播",
    navTitle: "直播",
    kicker: "Avatar Live",
    description: "配置直播画面、主播脚本、互动问答、商品卡和线索承接。",
    accent: "#b78cff",
    defaultBrief:
      "生成一场 60 分钟捷途旅行者直播流程，重点讲空间、试驾权益和常见问题。"
  },
  {
    id: "insights",
    title: "数据洞察",
    navTitle: "洞察",
    kicker: "Data Collector",
    description: "周期性采集曝光、互动、线索、账号表现、素材表现和转化漏斗。",
    accent: "#66a6ff",
    defaultBrief:
      "每周一自动汇总上周内容表现，输出账号趋势、素材表现和下周选题建议。"
  }
];

export const copyThreads: ChatThread[] = [
  { title: "旅行者周末露营脚本", time: "刚刚", active: true },
  { title: "小红书封面标题 A/B", time: "18 分钟前" },
  { title: "直播间开场话术", time: "昨天" },
  { title: "门店探店短视频脚本", time: "周一" }
];

export const projectAssets: ProjectAsset[] = [
  { name: "旅行者户外主视觉", type: "Image", meta: "4:3 / 高清" },
  { name: "山路穿越首帧", type: "Frame", meta: "16:9 / 视频生成" },
  { name: "周末出行口播稿", type: "Copy", meta: "小红书 / 抖音" },
  { name: "数字人问答库", type: "Live", meta: "36 条问答" }
];

export const recentTasks: RecentTask[] = [
  { title: "城市越野 SUV 15 秒短片", type: "视频生成", time: "刚刚", state: "已完成" },
  { title: "12 条本地门店短视频", type: "批量一键AI视频", time: "9 分钟前", state: "生成中" },
  { title: "户外场景封面套图", type: "图像生成", time: "18 分钟前", state: "生成中" },
  { title: "周末出行直播流程", type: "数字人直播", time: "42 分钟前", state: "已保存" },
  { title: "账号内容周报", type: "数据洞察", time: "今天 09:30", state: "可查看" }
];

export const imageReferences = [
  { name: "车型参考", src: "/assets/ppt-hero.jpg", meta: "车身姿态 / 雨天质感" },
  { name: "场景参考", src: "/assets/ppt-image-studio.jpg", meta: "星空露营 / 户外氛围" },
  { name: "工作台资产", src: "/assets/ppt-workbench.jpg", meta: "素材管理 / 生产流程" }
];

export const imageVersions = [
  { title: "山野清晨主视觉", ratio: "4:3", state: "已生成" },
  { title: "小红书封面裁切", ratio: "3:4", state: "待精修" },
  { title: "信息流横版首图", ratio: "16:9", state: "可导出" }
];

export const videoCanvases = [
  { title: "城市到山野 15s", nodes: 7, duration: "00:15", state: "画布已保存" },
  { title: "门店探店 30s", nodes: 11, duration: "00:30", state: "待生成" },
  { title: "露营装备讲解", nodes: 9, duration: "00:22", state: "生成中" }
];

export const batchMaterials = [
  { name: "轮毂特写", time: "00:12", src: "/assets/ppt-hero.jpg" },
  { name: "前脸灯组", time: "00:07", src: "/assets/ppt-workbench.jpg" },
  { name: "山路行驶", time: "00:09", src: "/assets/ppt-image-studio.jpg" }
];

export const liveComments = [
  "用户1234567890：这车真帅",
  "捷途粉丝团：已经下单了",
  "捷途铁粉：什么时候优惠",
  "捷途FANS：主播讲解很详细"
];

export const collectionJobs: CollectionJob[] = [
  {
    name: "抖音账号内容表现",
    source: "抖音企业号 / 短视频",
    cadence: "每天 09:00",
    latest: "今天 09:02",
    status: "已同步",
    progress: 100
  },
  {
    name: "小红书互动与收藏",
    source: "小红书矩阵账号",
    cadence: "每 6 小时",
    latest: "今天 12:01",
    status: "运行中",
    progress: 68
  },
  {
    name: "直播间评论与线索",
    source: "直播数据 / 表单线索",
    cadence: "每 30 分钟",
    latest: "13 分钟前",
    status: "运行中",
    progress: 52
  },
  {
    name: "门店私域表单",
    source: "CRM / 企微表单",
    cadence: "每天 18:00",
    latest: "等待授权",
    status: "待授权",
    progress: 18
  }
];

export const insightFunnel = [
  { label: "曝光", value: "5,000 万", width: 100 },
  { label: "互动", value: "186 万", width: 74 },
  { label: "有效咨询", value: "12.8 万", width: 46 },
  { label: "线索", value: "3 万", width: 28 },
  { label: "试驾预约", value: "8,640", width: 18 }
];

export const accountRows = [
  { name: "品牌主号", exposure: "1.8 亿", leads: "8,420", engagement: "6.8%" },
  { name: "终端矩阵", exposure: "2.6 亿", leads: "13,600", engagement: "5.4%" },
  { name: "直播矩阵", exposure: "5,000 万", leads: "3,000", engagement: "7.1%" },
  { name: "达人协同", exposure: "2.1 亿", leads: "5,980", engagement: "4.9%" }
];
