"use client";

import { useState, type CSSProperties } from "react";
import { FileZip, Pause, Play, PlugsConnected, RocketLaunch } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const toolkits = [
  {
    kind: "interface", title: "Interface", description: "Design & interaction",
    tools: [
      { name: "React", logos: ["react"], href: "https://react.dev" },
      { name: "TypeScript", logos: ["typescript"], href: "https://www.typescriptlang.org" },
      { name: "Vite", logos: ["vite"], href: "https://vite.dev" },
      { name: "JavaScript", logos: ["javascript"], href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "HTML / CSS", logos: ["html5", "css"], href: "https://developer.mozilla.org/en-US/docs/Web" },
      { name: "Tailwind CSS", logos: ["tailwindcss"], href: "https://tailwindcss.com" },
      { name: "Bootstrap", logos: ["bootstrap"], href: "https://getbootstrap.com" },
    ],
  },
  {
    kind: "systems", title: "Systems", description: "Data & APIs",
    tools: [
      { name: "Node.js", logos: ["nodedotjs"], href: "https://nodejs.org" },
      { name: "Express", logos: ["express"], href: "https://expressjs.com" },
      { name: "REST APIs", icon: PlugsConnected },
      { name: "PostgreSQL", logos: ["postgresql"], href: "https://www.postgresql.org" },
      { name: "Supabase", logos: ["supabase"], href: "https://supabase.com" },
      { name: "File workflows", icon: FileZip },
    ],
  },
  {
    kind: "delivery", title: "Delivery", description: "State & shipping",
    tools: [
      { name: "Zustand", logos: ["zustand"], href: "https://zustand.docs.pmnd.rs" },
      { name: "Redux", logos: ["redux"], href: "https://redux.js.org" },
      { name: "Git / GitHub", logos: ["git", "github"], href: "https://github.com" },
      { name: "Dokploy", icon: RocketLaunch, href: "https://dokploy.com" },
      { name: "n8n", logos: ["n8n"], href: "https://n8n.io" },
      { name: "Jira", logos: ["jira"], href: "https://www.atlassian.com/software/jira" },
    ],
  },
  {
    kind: "creative", title: "Creative Tools", description: "Ideas & experiments",
    tools: [
      { name: "Figma", logos: ["figma"], href: "https://www.figma.com" },
      { name: "VS Code", logos: ["vscode"], href: "https://code.visualstudio.com" },
      { name: "Claude Code", logos: ["claude"], href: "https://claude.com/product/claude-code" },
      { name: "Codex", logos: ["codex"], href: "https://openai.com/codex" },
      { name: "Antigravity", logos: ["antigravity"], href: "https://antigravity.google" },
      { name: "Lovable", logos: ["lovable"], href: "https://lovable.dev" },
      { name: "Google Stitch", logos: ["google"], href: "https://stitch.withgoogle.com" },
      { name: "Google Flow", logos: ["google"], href: "https://labs.google/flow/about" },
    ],
  },
];

type Tool = {
  name: string;
  logos?: string[];
  icon?: typeof FileZip;
  href?: string;
};

function ToolItem({ tool, reduced, duplicate = false }: { tool: Tool; reduced: boolean; duplicate?: boolean }) {
  const Icon = tool.icon;
  const contents = <>
    <motion.span className="toolkit-tool__marks" aria-hidden="true"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: reduced ? 0 : -2, scale: reduced ? 1 : 1.06 } }}
      transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
      {tool.logos?.map(logo => <span key={logo} className="toolkit-tool__logo"
        style={{ "--tool-logo": `url("/icons/tools/${logo}.svg")` } as CSSProperties} />)}
      {Icon && <Icon size={18} weight="regular" />}
    </motion.span>
    <span className="toolkit-tool__name">{tool.name}</span>
  </>;

  return <li>
    {tool.href ? <motion.a className="toolkit-tool" href={tool.href} target="_blank" rel="noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={`${tool.name} website (opens in a new tab)`}
      initial="rest" animate="rest" whileHover="hover" whileFocus="hover">{contents}</motion.a>
      : <motion.span className="toolkit-tool" initial="rest" animate="rest" whileHover="hover">{contents}</motion.span>}
  </li>;
}

export default function ToolkitCards() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return <div className="toolkit-compact" data-paused={paused}>
    <div className="toolkit-marquee-controls">
      <button type="button" className="toolkit-marquee-toggle" aria-controls="toolkit-marquees"
        onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume tool scrolling" : "Pause tool scrolling"}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>{paused ? "Resume" : "Pause"} motion</span>
      </button>
    </div>
    <div id="toolkit-marquees">
    {toolkits.map(({ kind, title, description, tools }, index) => (
      <div className="toolkit-row" key={kind} data-reveal>
        <div className="toolkit-category">
          <span className="toolkit-category__number" aria-hidden="true">0{index + 1}</span>
          <div>
            <h4 id={`toolkit-${kind}`}>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className="toolkit-marquee">
          <div className="toolkit-marquee__track" style={{
            "--marquee-duration": `${tools.length * 12}s`,
            "--marquee-direction": index % 2 === 0 ? "normal" : "reverse",
          } as CSSProperties}>
            {/* Four identical copies cover the widest row without stretching gaps.
                Moving by half the track loops over two complete copies. */}
            {[0, 1, 2, 3].map(copy => (
              <ul className="toolkit-tools" key={copy} aria-hidden={copy > 0 || undefined}
                aria-labelledby={copy === 0 ? `toolkit-${kind}` : undefined}>
                {tools.map(tool => <ToolItem key={tool.name} tool={tool} reduced={Boolean(reduced)} duplicate={copy > 0} />)}
              </ul>
            ))}
          </div>
        </div>
      </div>
    ))}
    </div>
  </div>;
}
