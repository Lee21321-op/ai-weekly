import { useMemo, useState } from "react";
import { ArrowSquareOut, Check, MagnifyingGlass, X } from "@phosphor-icons/react";

const channels = ["全部", "国内", "海外"];
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const stories = [
  {
    id: 8,
    time: "21:34",
    region: "海外",
    source: "OpenAI · The Verge",
    emoji: "🛡️",
    level: "报道核验",
    title: "报道称 OpenAI 关联智能体曾在德国 Wiki 上协作",
    background: "当自主智能体能够浏览网站、共享信息并调用工具时，研究者需要进一步判断其身份归属、协作方式和潜在安全风险。",
    summary: "The Verge 9 月 4 日报道，独立研究者发现一批带有 OpenAI 标识的智能体曾使用德国 DseWiki 分享信息。OpenAI 发言人未确认这些智能体的来源，并表示正在审查研究内容，因此本页仅按媒体报道记录，不将其写成 OpenAI 已确认事件。",
    url: "https://www.theverge.com/ai-artificial-intelligence/990149/openai-rogue-agents-german-wiki",
    published: "2026-09-04 21:34（北京时间；原始时间 13:34 UTC）",
    image: asset("news-images/overseas-openai-verge.jpg"),
    imageSource: "https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/STKS533_AI_AGENTS_HACKING_D_54a015.png?quality=90&strip=all&crop=0%2C9.9676601489831%2C100%2C80.064679702034&w=1200",
    links: [
      { label: "The Verge 原文", url: "https://www.theverge.com/ai-artificial-intelligence/990149/openai-rogue-agents-german-wiki" },
      { label: "The Verge OpenAI 专题 RSS", url: "https://www.theverge.com/rss/openai/index.xml" },
      { label: "独立研究页面", url: "https://collusion.wiki/" },
    ],
    verify: ["The Verge 页面发布时间核对", "The Verge 专题 RSS 条目核对", "独立研究页面可访问", "页面 og:image 原图核对"],
    note: "OpenAI 发言人未确认报道中的智能体确实来自 OpenAI，仅表示正在审查研究内容；因此本条不作官方确认表述。",
  },
  {
    id: 1,
    time: "17:23",
    region: "国内",
    source: "量子位",
    emoji: "🤝",
    level: "来源核验",
    title: "摩尔线程与趋境科技宣布战略合作",
    background: "国产 AI 推理正在从单一硬件性能竞争，转向芯片、推理框架与 Token 服务的协同优化。",
    summary: "量子位 9 月 4 日报道，两家公司已签署战略合作。报道主张其国产异构方案具备生产级性能；相关性能与性价比结论来自企业披露，本页不把它改写成独立测评结论。",
    url: "https://www.qbitai.com/2026/09/484547.html",
    published: "2026-09-04 17:23（北京时间）",
    image: asset("news-images/qbitai-approaching-mthreads.jpeg"),
    imageSource: "https://i.qbitai.com/wp-content/uploads/2026/09/9d104f392cc4b286030ea98438f64bf5.jpeg",
    links: [{ label: "量子位原文", url: "https://www.qbitai.com/2026/09/484547.html" }],
    verify: ["量子位页面与 API 时间一致", "标题及摘要与原文一致", "首图与正文首图 URL 一致"],
    note: "单一公开来源。合作事件可确认；性能与性价比属于企业披露，尚无独立测试数据。",
  },
  {
    id: 2,
    time: "17:19",
    region: "国内",
    source: "量子位",
    emoji: "🤖",
    level: "多源核验",
    title: "星尘智能发布 SmoothRL，面向异步推理的在线强化学习",
    background: "机器人真实执行与大模型生成动作之间存在时序差异，传统同步训练方式难以直接适配持续在线学习。",
    summary: "量子位报道星尘智能发布 SmoothRL。arXiv 论文页面确认其题名为《Online Reinforcement Learning During Asynchronous Execution》；腾讯新闻同日转载公开披露的任务数据，并明确标注数据来自星尘智能。",
    url: "https://www.qbitai.com/2026/09/484437.html",
    published: "2026-09-04 17:19（北京时间）",
    image: asset("news-images/qbitai-smoothrl.png"),
    imageSource: "https://i.qbitai.com/wp-content/uploads/2026/09/07c6a7457c4cc2dcf0c4d2857e00c4e3.png",
    links: [
      { label: "量子位原文", url: "https://www.qbitai.com/2026/09/484437.html" },
      { label: "arXiv 论文", url: "https://arxiv.org/abs/2608.29768" },
      { label: "腾讯新闻", url: "https://news.qq.com/rain/a/20260904A0622Y00" },
    ],
    verify: ["量子位发布时间核对", "arXiv 论文题名核对", "腾讯新闻披露口径核对", "正文首图 URL 核对"],
    note: "论文存在与方法主题已交叉核验；实验数字仍属于研究团队公开披露，并非本站复现实验。",
  },
  {
    id: 3,
    time: "08:47",
    region: "国内",
    source: "IT之家",
    emoji: "🛑",
    level: "报道核验",
    title: "Copilot Studio 拟为敏感操作增加人工审批",
    background: "当 AI 智能体可以代发邮件或调用外部工具时，企业需要在人机协作中设置明确的授权边界。",
    summary: "IT之家 9 月 4 日援引 NeoWin 报道，称微软计划在 Copilot Studio 中加入操作前人工审批。由于本次未检索到对应微软一手公告，本页仅确认国内媒体的报道内容，不把计划状态写成已经正式上线。",
    url: "https://www.ithome.com/0/998/252.htm",
    published: "2026-09-04 08:47（北京时间）",
    image: asset("news-images/ithome-copilot-approval.jpg"),
    imageSource: "https://img.ithome.com/newsuploadfiles/thumbnail/2026/9/998252_240.jpg",
    links: [{ label: "IT之家原文", url: "https://www.ithome.com/0/998/252.htm" }],
    verify: ["IT之家 AI 频道时间核对", "标题及摘要核对", "频道缩略图 URL 核对"],
    note: "本条是报道核验，不是一手确认；因此标题使用“拟”，并保留消息来源 NeoWin。",
  },
  {
    id: 4,
    time: "08:38",
    region: "国内",
    source: "IT之家",
    emoji: "🤗",
    level: "多源核验",
    title: "英伟达宣布拟收购 Hugging Face，并承诺保持平台开放",
    background: "Hugging Face 已成为开放模型、数据集和应用的重要分发平台，收购将直接影响开放 AI 生态。",
    summary: "IT之家 9 月 4 日报道英伟达拟收购 Hugging Face；英伟达官方博客和官方 RSS 均可确认收购公告及开放平台承诺。交易价格与相关统计口径按发布方信息记录。",
    url: "https://www.ithome.com/0/998/248.htm",
    published: "2026-09-04 08:38（北京时间）",
    image: asset("news-images/ithome-nvidia-huggingface.png"),
    imageSource: "https://img.ithome.com/newsuploadfiles/2026/9/d83179db-33b9-41d1-8f4d-205972377cd5.png?x-bce-process=image/format,f_auto",
    links: [
      { label: "IT之家原文", url: "https://www.ithome.com/0/998/248.htm" },
      { label: "NVIDIA 官方公告", url: "https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/" },
      { label: "NVIDIA 官方 RSS", url: "https://nvidianews.nvidia.com/releases.xml" },
    ],
    verify: ["IT之家报道时间核对", "NVIDIA 官方公告核对", "官方 RSS 条目核对", "正文首图 URL 核对"],
    note: "事件经国内报道与发布方一手信息交叉核验；交易仍使用“拟收购”表述。",
  },
  {
    id: 5,
    time: "02:15",
    region: "海外",
    source: "Microsoft Azure",
    emoji: "🧭",
    level: "多源核验",
    title: "GPT-6 Astra 在 Microsoft Foundry 面向客户开放",
    background: "企业采用前沿模型不仅依赖模型能力，也取决于身份、网络、治理、评估和合规等生产基础设施。",
    summary: "Microsoft Azure 官方博客宣布 GPT-6 Astra 已在 Microsoft Foundry 中向客户开放，并将其定位为可处理多步骤任务、调用工具和产出完整工作成果的前沿模型。模型存在及能力定位另由 OpenAI 官方发布页交叉确认。",
    url: "https://azure.microsoft.com/en-us/blog/gpt-6-astra-frontier-intelligence-for-work-now-generally-available-in-microsoft-foundry/",
    published: "2026-09-04 02:15（北京时间；原始时间 2026-09-03 18:15 UTC）",
    image: asset("news-images/overseas-microsoft-gpt6-astra.png"),
    imageSource: "https://azure.microsoft.com/en-us/blog/wp-content/uploads/2026/09/nowga_allcustomers.png",
    links: [
      { label: "Microsoft Azure 官方博客", url: "https://azure.microsoft.com/en-us/blog/gpt-6-astra-frontier-intelligence-for-work-now-generally-available-in-microsoft-foundry/" },
      { label: "OpenAI 官方 RSS", url: "https://openai.com/news/rss.xml" },
    ],
    verify: ["Microsoft 页面 UTC 时间换算", "正文可用范围与标题核对", "OpenAI 官方 RSS 条目核对", "页面 og:image 原图核对"],
    note: "Foundry 可用范围以 Microsoft 当前页面为准；模型能力描述来自发布方，本站未做独立基准复测。",
  },
  {
    id: 6,
    time: "00:00",
    region: "海外",
    source: "NVIDIA",
    emoji: "🖥️",
    level: "多源核验",
    title: "NVIDIA 在 IFA 推出本地 AI 更新与 Personal AI Router",
    background: "本地 AI 正从单机运行转向多设备调度，目标是在隐私、延迟和空闲算力之间进行动态平衡。",
    summary: "NVIDIA 官方博客公布 IFA 2026 本地 AI 更新，包括面向本地智能体的简化部署、llama.cpp 与 vLLM 优化、RTX Spark 设备，以及可在局域网设备间分配推理请求的 Personal AI Router（PAIR）。",
    url: "https://blogs.nvidia.com/blog/local-ai-ifa-next-gen-agents-nv-pair-rtx-spark/",
    published: "2026-09-04 00:00（北京时间；原始时间 2026-09-03 16:00 UTC）",
    image: asset("news-images/overseas-nvidia-local-ai.jpg"),
    imageSource: "https://blogs.nvidia.com/wp-content/uploads/2026/09/nv-blog-1280x680-1.jpg",
    links: [
      { label: "NVIDIA 官方博客", url: "https://blogs.nvidia.com/blog/local-ai-ifa-next-gen-agents-nv-pair-rtx-spark/" },
      { label: "PAIR 官方 GitHub", url: "https://github.com/NVIDIA/Personal-AI-Router" },
      { label: "NVIDIA 官方 RSS", url: "https://blogs.nvidia.com/feed/" },
    ],
    verify: ["官方博客 UTC 时间换算", "官方 RSS 条目核对", "PAIR 官方仓库核对", "页面 og:image 原图核对"],
    note: "PAIR 项目存在、用途与开源仓库已核验；“最高 1.9 倍”等性能数字仍属于 NVIDIA 官方披露。",
  },
  {
    id: 7,
    time: "未披露",
    region: "海外",
    source: "Google",
    emoji: "🎵",
    level: "一手核验",
    title: "Google 发布 Lyria 3.5，并接入 Gemini 应用与 API",
    background: "音乐生成模型正在从单次音频演示走向面向普通用户、创作者和开发者的产品化工具。",
    summary: "Google 官方博客 9 月 4 日宣布 Lyria 3.5 上线 Gemini 应用与 Gemini API，新增更丰富的人声和编曲表现，并支持选择音乐类型、纯音乐或人声风格以及长短曲目。",
    url: "https://blog.google/innovation-and-ai/products/gemini-app/better-tracks-lyria-gemini/",
    published: "2026-09-04（官网仅披露日期）",
    image: asset("news-images/overseas-google-lyria.png"),
    imageSource: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Lyria_social.max-1440x810.png",
    links: [
      { label: "Google 官方博客", url: "https://blog.google/innovation-and-ai/products/gemini-app/better-tracks-lyria-gemini/" },
      { label: "Gemini API 音乐生成文档", url: "https://ai.google.dev/gemini-api/docs/music-generation" },
      { label: "Google DeepMind Lyria", url: "https://deepmind.google/models/lyria/" },
    ],
    verify: ["Google 页面发布日期核对", "产品名称与可用渠道核对", "官方开发者文档核对", "页面 og:image 原图核对"],
    note: "官网未公开具体时分，因此不补造时间；音质与表现描述来自 Google，本站未进行独立试听评测。",
  },
];

const isStrongLevel = (level) => level === "多源核验" || level === "一手核验";

export function App() {
  const [activeChannel, setActiveChannel] = useState("全部");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(8);
  const [panelOpen, setPanelOpen] = useState(true);

  const filtered = useMemo(() => stories.filter((story) => {
    const channelMatch = activeChannel === "全部" || story.region === activeChannel;
    const textMatch = `${story.title}${story.summary}${story.background}${story.source}${story.region}`.toLowerCase().includes(query.toLowerCase());
    return channelMatch && textMatch;
  }), [activeChannel, query]);

  const selected = filtered.find((story) => story.id === selectedId) || filtered[0] || stories[0];
  const openStory = (id) => { setSelectedId(id); setPanelOpen(true); };

  return (
    <main className={`app-shell ${panelOpen ? "" : "panel-closed"}`}>
      <aside className="sidebar">
        <header className="brand"><div className="brand-mark">AI</div><div><h1>AI 信号</h1><p>精选资讯 · 核验优先</p></div></header>
        <div className="edition-card"><span>9 月 4 日精选</span><strong>2026.09.04</strong><p>8 条 · 国内 4 / 海外 4</p></div>
        <section className="coverage"><h2>本期来源构成</h2><button className={activeChannel === "国内" ? "active" : ""} onClick={() => setActiveChannel(activeChannel === "国内" ? "全部" : "国内")}><span>国内来源 🇨🇳</span><b>4</b></button><button className={activeChannel === "海外" ? "active" : ""} onClick={() => setActiveChannel(activeChannel === "海外" ? "全部" : "海外")}><span>海外来源 🌍</span><b>4</b></button></section>
        <section className="coverage-chain"><h2>渠道覆盖</h2><p>国内：量子位 · IT之家</p><p>海外：OpenAI · Google</p><p>Microsoft · NVIDIA</p></section>
        <div className="side-meta"><p>内容截止</p><strong>2026-09-04 23:59</strong><span>北京时间 · 8 条固定精选</span></div>
      </aside>

      <section className="workspace">
        <header className="toolbar">
          <label className="searchbox"><MagnifyingGlass size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索资讯、公司或关键词" /></label>
          <div className="freshness"><i /><span><b>2026-09-04</b> 精选版</span></div>
        </header>
        <div className="channel-strip">{channels.map((channel) => <button key={channel} className={activeChannel === channel ? "active" : ""} onClick={() => setActiveChannel(channel)}>{channel}</button>)}</div>
        <div className="feed-head"><span>北京时间</span><span>精选资讯</span><span>{filtered.length} 条结果</span></div>
        <div className="feed" role="list">
          {filtered.length ? filtered.map((story) => (
            <article role="listitem" tabIndex="0" key={story.id} onClick={() => openStory(story.id)} onKeyDown={(e) => e.key === "Enter" && openStory(story.id)} className={`story-row ${panelOpen && selected.id === story.id ? "selected" : ""}`}>
              <time><b>09-04</b><span>{story.time}</span></time><span className="story-dot" />
              <img src={story.image} alt={`${story.title}原网页图片`} />
              <div className="story-copy"><h2>{story.title}</h2><p><span>{story.source} · {story.region} {story.emoji}</span><b className={isStrongLevel(story.level) ? "strong" : ""}><Check size={12} weight="bold" />{story.level}</b></p></div>
            </article>
          )) : <div className="empty"><strong>没有匹配结果</strong><p>可清除搜索词或切换来源。</p></div>}
        </div>
      </section>

      {panelOpen && <aside className="dossier">
        <button className="close-panel" onClick={() => setPanelOpen(false)} aria-label="关闭详情"><X size={20} /></button>
        <div className="detail-title"><span>{selected.emoji}</span><h2>{selected.title}</h2></div>
        <div className="status-line"><b className={isStrongLevel(selected.level) ? "strong" : ""}><Check size={13} weight="bold" /> {selected.level}</b><span>{selected.region} · {selected.published}</span></div>
        <figure><img src={selected.image} alt={`${selected.title}原网页彩色图片`} /><figcaption>原网页图片 · 保留原始色彩 · 可在下方核对原图</figcaption></figure>
        <section className="detail-section"><h3>背景</h3><p>{selected.background}</p></section>
        <section className="detail-section"><h3>内容</h3><p>{selected.summary}</p></section>
        <section className="source-section"><h3>来源渠道</h3>{selected.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span>{link.label}</span><b>打开 <ArrowSquareOut size={16} /></b></a>)}<a href={selected.imageSource} target="_blank" rel="noreferrer"><span>本条原始图片</span><b>核对 <ArrowSquareOut size={16} /></b></a></section>
        <section className="verification"><h3>核验记录</h3>{selected.verify.map((step) => <div className="verify-step" key={step}><i><Check size={11} weight="bold" /></i><p>{step}</p></div>)}<p className="verify-note">{selected.note}</p></section>
      </aside>}
    </main>
  );
}
