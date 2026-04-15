import React, { useState, useRef, useEffect, useCallback } from "react";

const THEMES = {
  dark: {
    bg: "#080b19",
    headerBg: "#0d1126",
    footerBg: "#0d1126",
    text: "#c8ffd4",
    accent: "#00ff88",
    accentDim: "#00cc6a",
    prompt: "#00bfff",
    error: "#ff4d6d",
    muted: "#445566",
    border: "rgba(0,255,136,0.12)",
    headerText: "#7effd4",
    buttonBg: "rgba(0,255,136,0.08)",
    buttonHover: "rgba(0,255,136,0.18)",
    link: "#00e5ff",
  },
  light: {
    bg: "#f4f6f0",
    headerBg: "#e8ede2",
    footerBg: "#e8ede2",
    text: "#1a2e1a",
    accent: "#1a7a40",
    accentDim: "#2a9a55",
    prompt: "#1a5a8a",
    error: "#c0392b",
    muted: "#7a8a7a",
    border: "rgba(26,122,64,0.18)",
    headerText: "#2a5a2a",
    buttonBg: "rgba(26,122,64,0.07)",
    buttonHover: "rgba(26,122,64,0.15)",
    link: "#0a6aaa",
  },
};

const COMMANDS = {
  help: {
    output: [
      { text: "┌─ AVAILABLE COMMANDS ─────────────────────────────┐", color: "accent" },
      { text: "│  help          Show this help menu                │", color: "text" },
      { text: "│  about         About Satyam Kumar Verman          │", color: "text" },
      { text: "│  skills        Technical skill set                │", color: "text" },
      { text: "│  projects      Projects with live links           │", color: "text" },
      { text: "│  links         All social & profile links         │", color: "text" },
      { text: "│  achievements  Certs · contests · open source     │", color: "text" },
      { text: "│  contact       Get in touch                       │", color: "text" },
      { text: "│  clear         Clear terminal output              │", color: "text" },
      { text: "│  reset         Reset to initial state             │", color: "text" },
      { text: "│  theme         Toggle dark / light mode           │", color: "text" },
      { text: "│  banner        Show ASCII banner                  │", color: "text" },
      { text: "└───────────────────────────────────────────────────┘", color: "accent" },
    ],
  },

  about: {
    output: [
      { text: "▸ SATYAM KUMAR VERMAN", color: "accent" },
      { text: "  Full-Stack Developer · DSA · Open Source · AI-Augmented Dev", color: "text" },
      { text: "", color: "text" },
      { text: "  Self-taught developer with strong foundations in DS&A, OS,", color: "muted" },
      { text: "  Networking & System Design. Built Omezle — a WebRTC platform", color: "muted" },
      { text: "  handling 20K+ concurrent users. Active open-source contributor", color: "muted" },
      { text: "  to freeCodeCamp & CPython. 500+ DSA problems solved.", color: "muted" },
      { text: "", color: "text" },
      { text: "  Status    →  Available for hire", color: "prompt" },
      { text: "  Location  →  Ramgarh, Jharkhand, India", color: "prompt" },
      { text: "  Phone     →  +91 6200872019", color: "prompt" },
      { type: "link", prefix: "  Email     →  ", label: "satyamkumarverman@gmail.com", url: "mailto:satyamkumarverman@gmail.com", color: "prompt" },
    ],
  },

  skills: {
    output: [
      { text: "▸ TECHNICAL SKILLS", color: "accent" },
      { text: "", color: "text" },
      { text: "  Languages   Python · C++ · JavaScript · Java · C", color: "text" },
      { text: "", color: "text" },
      { text: "  Frontend    React.js · HTML5/CSS3 · ES6+ · WebSockets", color: "text" },
      { text: "              WebRTC · RESTful API · Responsive Design", color: "text" },
      { text: "", color: "text" },
      { text: "  Backend     Node.js · Express.js · Flask · MongoDB", color: "text" },
      { text: "              REST API · System Design (HLD + LLD)", color: "text" },
      { text: "", color: "text" },
      { text: "  DevOps      Linux (Ubuntu/CLI) · Git · Docker", color: "text" },
      { text: "              Vercel · Render · Railway.app", color: "text" },
      { text: "", color: "text" },
      { text: "  CS Core     DSA · OS · Networking · DBMS · OOP", color: "text" },
      { text: "              SDLC · Penetration Testing", color: "text" },
      { text: "", color: "text" },
      { text: "  AI Tools    ChatGPT · Google Gemini · Claude", color: "muted" },
    ],
  },

  projects: {
    output: [
      { text: "▸ PROJECTS", color: "accent" },
      { text: "", color: "text" },
      { text: "  [01] Omezle — Real-Time Random Chat Web App", color: "text" },
      { text: "        MERN + WebRTC · 20K+ concurrent users · Socket.IO", color: "muted" },
      { text: "        Matchmaking · rate limiting · moderation · microservices WIP", color: "muted" },
      { type: "link", prefix: "        → Live: ", label: "omezle.xyz", url: "https://omezle.xyz", color: "accent" },
      { text: "", color: "text" },
      { text: "  [02] Terminal Theme Portfolio", color: "text" },
      { text: "        You're inside it! Interactive terminal-based UI portfolio.", color: "muted" },
      { text: "        Stack: React · Node.js · Express · MongoDB · Vercel", color: "muted" },
      { text: "", color: "text" },
      { text: "  [03] URL Shortener Web App", color: "text" },
      { text: "        Flask REST API · long URLs → short slugs · minimal UI", color: "muted" },
      { text: "        Stack: Python · Flask · REST API · Vercel", color: "muted" },
      { text: "", color: "text" },
      { text: "  [04] Pomodoro Timer Web App", color: "text" },
      { text: "        Real-time WebSocket sync · session tracking · modern UI", color: "muted" },
      { text: "        Stack: Python · Flask · WebSockets · Vercel", color: "muted" },
    ],
  },

  links: {
    output: [
      { text: "▸ LINKS & PROFILES", color: "accent" },
      { text: "", color: "text" },
      { type: "link", prefix: "  ✉  Email      → ", label: "satyamkumarverman@gmail.com", url: "mailto:satyamkumarverman@gmail.com", color: "prompt" },
      { type: "link", prefix: "  ⌥  GitHub     → ", label: "Github", url: "https://github.com/skvprogrammer", color: "accent" },
      { type: "link", prefix: "  ◈  LinkedIn   → ", label: "LinkedIn", url: "https://www.linkedin.com/in/satyam-kumar-verman-b77272190/", color: "accent" },
      { type: "link", prefix: "  ⚡  Portfolio  → ", label: "Live portfolio", url: "#", color: "accent" },
      { type: "link", prefix: "  ⊞  LeetCode   → ", label: "Leetcode", url: "https://leetcode.com/u/skvprogrammer", color: "accentDim" },
      { type: "link", prefix: "  ◉  Omezle     → ", label: "Omezle", url: "https://omezle.xyz", color: "accentDim" },
      { text: "", color: "text" },
      { text: "  → Open to full-time roles & collaborations.", color: "muted" },
    ],
  },

  achievements: {
    output: [
      { text: "▸ ACHIEVEMENTS & CERTIFICATIONS", color: "accent" },
      { text: "", color: "text" },
      { text: "  DSA", color: "accent" },
      { text: "  ⬡  500+ problems solved on LeetCode & HackerRank", color: "text" },
      { text: "  ⬡  LeetCode Rank #125  — Weekly Contest 477", color: "text" },
      { text: "  ⬡  LeetCode Rank #453  — Biweekly Contest 170", color: "text" },
      { text: "", color: "text" },
      { text: "  Open Source", color: "accent" },
      { type: "link", prefix: "  ⬡  freeCodeCamp → ", label: "4–5 PRs merged into main curriculum", url: "https://github.com/freeCodeCamp/freeCodeCamp", color: "text" },
      { type: "link", prefix: "  ⬡  CPython      → ", label: "1 PR merged into official Python interpreter", url: "https://github.com/python/cpython", color: "text" },
      { text: "", color: "text" },
      { text: "  Certifications", color: "accent" },
      { text: "  ⬡  C++ Programming — Beginner to Ultimate Level (Udemy)", color: "muted" },
      { text: "  ⬡  Software Engineer Role Certification", color: "muted" },
      { text: "  ⬡  Penetration Testing Certification", color: "muted" },
      { text: "  ⬡  HackerRank — Java · Python · SQL", color: "muted" },
    ],
  },

  contact: {
    output: [
      { text: "▸ CONTACT SATYAM", color: "accent" },
      { text: "", color: "text" },
      { type: "link", prefix: "  ✉  ", label: "satyamkumarverman@gmail.com", url: "mailto:satyamkumarverman@gmail.com", color: "prompt" },
      { text: "  ☎  +91 6200872019", color: "text" },
      { type: "link", prefix: "  ⌥  GitHub   → ", label: "Github", url: "https://github.com/skvprogrammer", color: "accent" },
      { type: "link", prefix: "  ◈  LinkedIn → ", label: "LinkedIn", url: "https://www.linkedin.com/in/satyam-kumar-verman-b77272190/", color: "accent" },
      { text: "", color: "text" },
      { text: "  → Open to full-time roles & collaborations.", color: "prompt" },
    ],
  },

  banner: {
    output: [
      { text: " ███████╗██╗  ██╗██╗   ██╗", color: "accent" },
      { text: " ██╔════╝██║ ██╔╝██║   ██║", color: "accent" },
      { text: " ███████╗█████╔╝ ██║   ██║", color: "accentDim" },
      { text: " ╚════██║██╔═██╗ ╚██╗ ██╔╝", color: "accentDim" },
      { text: " ███████║██║  ██╗ ╚████╔╝ ", color: "muted" },
      { text: " ╚══════╝╚═╝  ╚═╝  ╚═══╝  ", color: "muted" },
      { text: "", color: "text" },
      { text: "  Full-Stack Dev  ·  DSA  ·  Open Source  ·  AI Dev", color: "prompt" },
      { text: "  Type 'help' to explore  ·  Type 'links' for socials", color: "muted" },
    ],
  },

  reset: {
    output: [
      { text: "Resetting terminal...", color: "muted" },
    ],
  },
};

const BOOT_SEQUENCE = [
  "Initializing system...",
  "Loading profile: satyam@portfolio",
  "Mounting filesystem...",
  "Starting terminal session...",
  "",
  "Session ready. Type 'help' to get started.",
];

function GlowCursor({ theme }) {
  const t = THEMES[theme];
  return (
    <span
      style={{
        display: "inline-block",
        width: "7px",
        height: "12px",
        background: t.accent,
        marginLeft: "2px",
        verticalAlign: "middle",
        borderRadius: "1px",
        animation: "cursorBlink 1.1s step-end infinite",
        boxShadow: `0 0 8px ${t.accent}`,
        flexShrink: 0,
      }}
    />
  );
}

export default function Terminal() {
  const [theme, setTheme] = useState("dark");
  const [output, setOutput] = useState([]);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [, setPersistentOutput] = useState([]); // Stores boot + banner
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const t = THEMES[theme];

  // Detect mobile and listen for resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const outputRef = useRef([]);

useEffect(() => {
  outputRef.current = output;
}, [output]);

useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < BOOT_SEQUENCE.length) {
      const idx = i;
      const line = BOOT_SEQUENCE[idx];
      setOutput((prev) => [
        ...prev,
        {
          type: "boot",
          text: line,
          color:
            idx === BOOT_SEQUENCE.length - 1
              ? "accent"
              : idx < 3
              ? "prompt"
              : "muted",
        },
      ]);
      i++;
    } else {
      clearInterval(interval);

      const bannerOutput = {
        type: "out",
        lines: COMMANDS.banner.output,
      };

      setOutput((prev) => [...prev, bannerOutput]);

      setPersistentOutput((prev) => [
        ...prev,
        ...outputRef.current,
        bannerOutput,
      ]);

      setBooted(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, 150);

  return () => clearInterval(interval);
}, []);
  // Auto-scroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [output]);

  const resolveColor = useCallback(
    (colorKey) => {
      const map = {
        accent: t.accent,
        accentDim: t.accentDim,
        text: t.text,
        muted: t.muted,
        prompt: t.prompt,
        error: t.error,
        link: t.link,
      };
      return map[colorKey] || t.text;
    },
    [t]
  );

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((prev) => [raw, ...prev].slice(0, 50));
    setHistoryIdx(-1);
    setOutput((prev) => [...prev, { type: "cmd", text: raw }]);

    if (cmd === "clear") {
      // Clear command now restores the initial banner and boot sequence
      setTimeout(() => {
        setOutput([
          {
            type: "boot",
            text: "Visit Omezle.xyz! ",
            color: "muted",
          },
          { type: "out", lines: COMMANDS.banner.output },
        ]);
      }, 100);
      return;
    }
    
    if (cmd === "reset") {
      // Reset command shows boot sequence all over again
      setTimeout(() => {
        setOutput([]);
        let i = 0;
        const interval = setInterval(() => {
          if (i < BOOT_SEQUENCE.length) {
            const idx = i;
            const line = BOOT_SEQUENCE[idx];
            setOutput((prev) => [
              ...prev,
              {
                type: "boot",
                text: line,
                color: idx === BOOT_SEQUENCE.length - 1 ? "accent" : idx < 3 ? "prompt" : "muted",
              },
            ]);
            i++;
          } else {
            clearInterval(interval);
            setOutput((prev) => [...prev, { type: "out", lines: COMMANDS.banner.output }]);
          }
        }, 150);
      }, 100);
      return;
    }
    
    if (cmd === "theme") {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      setOutput((prev) => [...prev, { type: "out", lines: [{ text: "Theme toggled.", color: "accent" }] }]);
      return;
    }
    const def = COMMANDS[cmd];
    if (def) {
      setOutput((prev) => [...prev, { type: "out", lines: def.output }]);
    } else {
      setOutput((prev) => [
        ...prev,
        {
          type: "out",
          lines: [
            { text: `bash: ${raw}: command not found`, color: "error" },
            { text: "Type 'help' to see available commands.", color: "muted" },
          ],
        },
      ]);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(command);
      setCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setCommand(history[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setCommand(next === -1 ? "" : history[next] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS).concat(["clear", "theme"]);
      const match = cmds.find((c) => c.startsWith(command.toLowerCase()));
      if (match) setCommand(match);
    }
  };

  const renderLine = (l, j) => {
    if (l.type !== "link" && (l.text === "" || l.text === undefined)) {
      return <div key={j} style={{ height: "4px" }} />;
    }
    if (l.type === "link") {
      return (
        <div
          key={j}
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            wordBreak: "break-word",
            gap: "2px",
          }}
        >
          {l.prefix && (
            <span style={{ color: resolveColor(l.color), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {l.prefix}
            </span>
          )}
          <a
            href={l.url}
            target={l.url.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              color: t.link,
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              textUnderlineOffset: "3px",
              cursor: "pointer",
              transition: "color 0.15s",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = t.link)}
          >
            {l.label}
          </a>
        </div>
      );
    }
    return (
      <div
        key={j}
        style={{
          color: resolveColor(l.color),
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {l.text}
      </div>
    );
  };

  // Responsive font sizes and spacing
  const fontSize = isMobile ? "12px" : "13.5px";
  const padding = isMobile ? "12px 16px" : "18px 24px";
  const inputPadding = isMobile ? "10px 16px" : "11px 24px";
  const headerPadding = isMobile ? "8px 12px" : "10px 18px";
  const lineHeight = isMobile ? "1.6" : "1.75";
  const bottomPadding = isMobile ? "0px" : "12px";
  // const footerGap = isMobile ? "12px" : "20px";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.muted}55; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${t.accent}88; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          input { font-size: 16px !important; }
          button { -webkit-tap-highlight-color: transparent; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: t.bg,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code','Courier New',monospace",
          fontSize: fontSize,
          color: t.text,
          transition: "background 0.3s,color 0.3s",
          overflow: "hidden",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* CRT scanlines */}
        {theme === "dark" && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 50,
              background:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.035) 2px,rgba(0,0,0,0.035) 4px)",
            }}
          />
        )}

        {/* HEADER */}
        <div
          style={{
            flexShrink: 0,
            background: t.headerBg,
            borderBottom: `1px solid ${t.border}`,
            padding: headerPadding,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "8px" : "16px",
            zIndex: 20,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: isMobile ? "10px" : "12px",
                    height: isMobile ? "10px" : "12px",
                    borderRadius: "50%",
                    background: c,
                    boxShadow: `0 0 5px ${c}99`,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                color: t.headerText,
                fontSize: isMobile ? "10px" : "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.85,
                whiteSpace: "nowrap",
              }}
            >
              satyam@portfolio
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTheme((p) => (p === "dark" ? "light" : "dark"));
            }}
            style={{
              background: t.buttonBg,
              border: `1px solid ${t.border}`,
              borderRadius: "6px",
              color: t.accent,
              cursor: "pointer",
              padding: isMobile ? "6px 10px" : "5px 12px",
              fontSize: isMobile ? "9px" : "11px",
              letterSpacing: "0.08em",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = t.buttonHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = t.buttonBg)}
          >
            {theme === "dark" ? "☀ LIGHT" : "☾ DARK"}
          </button>
        </div>

        {/* SCROLLABLE OUTPUT */}
        <div
          ref={bodyRef}
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: `${padding} ${padding.split(" ")[1]}`,
            lineHeight: lineHeight,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {output.map((line, i) => {
            if (line.type === "boot")
              return (
                <div
                  key={i}
                  style={{
                    color: resolveColor(line.color),
                    opacity: 0.85,
                    animation: "fadeSlideIn 0.2s ease",
                    wordBreak: "break-word",
                  }}
                >
                  {line.text === "" ? <br /> : <span>{"› "}{line.text}</span>}
                </div>
              );
            if (line.type === "cmd")
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginTop: "10px",
                    flexWrap: "wrap",
                    animation: "fadeSlideIn 0.15s ease",
                    gap: isMobile ? "2px" : "0px",
                  }}
                >
                  <span style={{ color: t.accent }}>root</span>
                  <span style={{ color: t.muted }}>@</span>
                  <span style={{ color: t.prompt }}>kali</span>
                  <span style={{ color: t.muted }}>:~$&nbsp;</span>
                  <span
                    style={{
                      color: t.text,
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      flex: "1 0 auto",
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              );
            if (line.type === "out")
              return (
                <div
                  key={i}
                  style={{
                    marginTop: "4px",
                    marginBottom: "6px",
                    paddingLeft: isMobile ? "0px" : "2px",
                    animation: "fadeSlideIn 0.2s ease",
                  }}
                >
                  {line.lines.map((l, j) => renderLine(l, j))}
                </div>
              );
            return null;
          })}
          <div style={{ height: bottomPadding }} />
        </div>

        {/* STICKY INPUT */}
        <div
          style={{
            flexShrink: 0,
            background: t.footerBg,
            borderTop: `1px solid ${t.border}`,
            padding: inputPadding,
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "0px",
            boxShadow:
              theme === "dark"
                ? "0 -1px 20px rgba(0,255,136,0.04)"
                : "0 -1px 8px rgba(0,0,0,0.05)",
            flexWrap: isMobile ? "wrap" : "nowrap",
            minHeight: isMobile ? "auto" : "45px",
          }}
        >
          <span
            style={{
              color: t.accent,
              fontWeight: "bold",
              userSelect: "none",
              fontSize: isMobile ? "11px" : "inherit",
            }}
          >
            root
          </span>
          <span style={{ color: t.muted, userSelect: "none", fontSize: isMobile ? "11px" : "inherit" }}>
            @
          </span>
          <span
            style={{
              color: t.prompt,
              fontWeight: "bold",
              userSelect: "none",
              fontSize: isMobile ? "11px" : "inherit",
            }}
          >
            kali
          </span>
          <span
            style={{
              color: t.muted,
              userSelect: "none",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "11px" : "inherit",
            }}
          >
            :~$&nbsp;
          </span>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <input
              ref={inputRef}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={!booted}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: t.text,
                fontFamily: "inherit",
                fontSize: fontSize,
                caretColor: "transparent",
                letterSpacing: "0.02em",
                minWidth: 0,
                padding: 0,
              }}
            />
            {booted && focused && <GlowCursor theme={theme} />}
          </div>
        </div>

        {/* KEYBOARD HINTS - Hidden on mobile, shown on larger screens */}
        {!isMobile && (
          <div
            style={{
              flexShrink: 0,
              background: t.footerBg,
              borderTop: `1px solid ${t.border}`,
              padding: "4px 24px 6px",
              display: "flex",
              gap: "20px",
              fontSize: "10.5px",
              color: t.muted,
              letterSpacing: "0.05em",
            }}
          >
            {[
              ["TAB", "autocomplete"],
              ["↑↓", "history"],
              ["ENTER", "execute"],
            ].map(([key, label]) => (
              <span key={key}>
                <span
                  style={{
                    background: t.buttonBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: "3px",
                    padding: "0 5px",
                    color: t.accent,
                    fontSize: "10px",
                    marginRight: "5px",
                  }}
                >
                  {key}
                </span>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}