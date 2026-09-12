import { useMemo, useState } from "react";
import { ArrowSquareOut, Check, MagnifyingGlass, X } from "@phosphor-icons/react";
import { createStories, edition } from "./stories";

const channels = ["全部", "国内", "海外"];
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
const stories = createStories(asset);
const isStrongLevel = (level) => level === "多源核验" || level === "一手核验";

export function App() {
  const [activeChannel, setActiveChannel] = useState("全部");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(1);
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
        <div className="edition-card"><span>{edition.label}精选</span><strong>{edition.displayDate}</strong><p>8 条 · 国内 4 / 海外 4</p></div>
        <section className="coverage"><h2>本期来源构成</h2><button className={activeChannel === "国内" ? "active" : ""} onClick={() => setActiveChannel(activeChannel === "国内" ? "全部" : "国内")}><span>国内来源 🇨🇳</span><b>4</b></button><button className={activeChannel === "海外" ? "active" : ""} onClick={() => setActiveChannel(activeChannel === "海外" ? "全部" : "海外")}><span>海外来源 🌍</span><b>4</b></button></section>
        <section className="coverage-chain"><h2>渠道覆盖</h2><p>{edition.domesticSources}</p><p>{edition.overseasSources}</p><p>{edition.verificationSources}</p></section>
        <div className="side-meta"><p>内容截止</p><strong>{edition.cutoff}</strong><span>北京时间 · 完整日版</span></div>
      </aside>

      <section className="workspace">
        <header className="toolbar">
          <label className="searchbox"><MagnifyingGlass size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索资讯、公司或关键词" /></label>
          <div className="freshness"><i /><span><b>{edition.isoDate}</b> 精选版</span></div>
        </header>
        <div className="channel-strip">{channels.map((channel) => <button key={channel} className={activeChannel === channel ? "active" : ""} onClick={() => setActiveChannel(channel)}>{channel}</button>)}</div>
        <div className="feed-head"><span>北京时间</span><span>精选资讯</span><span>{filtered.length} 条结果</span></div>
        <div className="feed" role="list">
          {filtered.length ? filtered.map((story) => (
            <article role="listitem" tabIndex="0" key={story.id} onClick={() => openStory(story.id)} onKeyDown={(e) => e.key === "Enter" && openStory(story.id)} className={`story-row ${panelOpen && selected.id === story.id ? "selected" : ""}`}>
              <time><b>{edition.shortDate}</b><span>{story.time}</span></time><span className="story-dot" />
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
