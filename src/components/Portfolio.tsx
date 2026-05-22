import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_LANG,
  PORTFOLIO_I18N,
  PORTFOLIO_STATIC,
  type Lang,
} from "../lib/data";
import { BootIntro } from "./BootIntro";
import { SocialIcon } from "./SocialIcon";

const ABOUT_CMDS = [
  "$ cat ~/role.md",
  "$ cat ~/side-projects.md",
  "$ cat ~/photography.md",
];

function buildVersion() {
  const d = new Date();
  const yy = (d.getFullYear() % 100).toString().padStart(2, "0");
  return `${yy}.${d.getMonth() + 1}.${d.getDate()}`;
}

const GLITCH_CHARS = "▓▒░█▚▞▛▜▟▙■□◆◇✦✧╳╱╲≡⌯#@&%$*";

const LOREM_POOL = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Nisi ut aliquip ex ea commodo consequat duis aute irure.",
  "Dolor in reprehenderit in voluptate velit esse cillum dolore.",
  "Eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
  "Non proident, sunt in culpa qui officia deserunt mollit anim.",
  "Id est laborum nemo enim ipsam voluptatem quia voluptas sit.",
  "Aspernatur aut odit aut fugit, sed quia consequuntur magni.",
  "Dolores eos qui ratione voluptatem sequi nesciunt neque porro.",
  "Quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.",
  "Adipisci velit, sed quia non numquam eius modi tempora incidunt.",
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function makeFakeLorem(): string {
  const count = 2 + Math.floor(Math.random() * 3); // 2–4 sentences
  return pickRandom(LOREM_POOL, count).join(" ");
}

function makeFakeTokens(): string[] {
  const count = 3 + Math.floor(Math.random() * 4); // 3–6 tokens
  const tokens: string[] = [];
  for (let i = 0; i < count; i++) {
    const len = 3 + Math.floor(Math.random() * 6); // 3–8 glitch chars
    let s = "";
    for (let j = 0; j < len; j++) {
      s += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
    tokens.push(s);
  }
  return tokens;
}

function ClassifiedCard({ id, title }: { id: string; title: string }) {
  const [lorem, setLorem] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  useEffect(() => {
    setLorem(makeFakeLorem());
    setTokens(makeFakeTokens());
  }, []);
  return (
    <div className="card classified-card">
      <div className="card-head">
        <span style={{ color: "var(--muted)" }}>
          ./{id.replace(/-/g, "_")}
        </span>
      </div>
      <div className="stamp">CLASSIFIED</div>
      <div style={{ padding: 24 }}>
        <div
          style={{
            color: "var(--ink)",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: ".04em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <p
          className="redacted"
          aria-hidden="true"
          style={{ margin: "14px 0 0", fontSize: 12, lineHeight: 1.65 }}
        >
          {lorem}
        </p>
        <div
          className="redacted"
          aria-hidden="true"
          style={{ marginTop: 16 }}
        >
          {tokens.map((tok, i) => (
            <Tok key={i}>{tok}</Tok>
          ))}
        </div>
      </div>
    </div>
  );
}

function scrambleDigits(template: string) {
  let out = "";
  for (const ch of template) {
    out += ch === "X"
      ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      : ch;
  }
  return out;
}

function GlitchDigits({ template }: { template: string }) {
  // Initial render uses template chars (stable on server + client) to
  // avoid hydration mismatch; scrambling starts after mount.
  const [out, setOut] = useState(template);
  useEffect(() => {
    setOut(scrambleDigits(template));
    const id = setInterval(() => setOut(scrambleDigits(template)), 90);
    return () => clearInterval(id);
  }, [template]);
  return (
    <span className="phone-glitch" data-text={out} aria-hidden="true">
      {out}
    </span>
  );
}

function CopyableEmail({
  email,
  copiedLabel,
  hintLabel,
}: {
  email: string;
  copiedLabel: string;
  hintLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback: select text for manual copy
      const range = document.createRange();
      const sel = window.getSelection();
      const el = document.getElementById("copyable-email");
      if (el && sel) {
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      title={hintLabel}
      className={`contact-email${copied ? " is-copied" : ""}`}
      aria-label={hintLabel}
    >
      <span className="contact-email__stack">
        <span id="copyable-email" className="contact-email__text">
          {email}
        </span>
        <span className="contact-email__text contact-email__text--copied">
          // {copiedLabel}
        </span>
      </span>
      <span className="contact-email__hint" aria-hidden={copied}>
        {hintLabel}
      </span>
    </button>
  );
}

const CODE39: Record<string, string> = {
  "0": "000110100", "1": "100100001", "2": "001100001", "3": "101100000",
  "4": "000110001", "5": "100110000", "6": "001110000", "7": "000100101",
  "8": "100100100", "9": "001100100",
  A: "100001001", B: "001001001", C: "101001000", D: "000011001",
  E: "100011000", F: "001011000", G: "000001101", H: "100001100",
  I: "001001100", J: "000011100", K: "100000011", L: "001000011",
  M: "101000010", N: "000010011", O: "100010010", P: "001010010",
  Q: "000000111", R: "100000110", S: "001000110", T: "000010110",
  U: "110000001", V: "011000001", W: "111000000", X: "010010001",
  Y: "110010000", Z: "011010000",
  "-": "010000101", ".": "110000100", " ": "011000100",
  "*": "010010100",
};

function Code39Barcode({ value, height = 32 }: { value: string; height?: number }) {
  const narrow = 2;
  const wide = 5;
  const gap = narrow;
  const text = `*${value.toUpperCase().replace(/[^0-9A-Z .\-]/g, " ")}*`;
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let c = 0; c < text.length; c++) {
    const pattern = CODE39[text[c]];
    if (!pattern) continue;
    for (let i = 0; i < 9; i++) {
      const w = pattern[i] === "1" ? wide : narrow;
      if (i % 2 === 0) bars.push({ x, w });
      x += w;
    }
    x += gap;
  }
  const totalWidth = x;
  return (
    <svg
      className="badge-barcode-svg"
      viewBox={`0 0 ${totalWidth} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`barcode: ${value}`}
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={height} fill="currentColor" />
      ))}
    </svg>
  );
}

function EventGlitch() {
  return (
    <div className="event-glitch" aria-hidden="true">
      <div className="event-glitch-label">
        <span className="event-glitch-label-main">NO SIGNAL</span>
        <span className="event-glitch-label-sub">// 0xDEADBEEF</span>
      </div>
    </div>
  );
}

function formatEventDate(
  startIso: string,
  endIso: string | undefined,
  lang: Lang,
): string {
  const locale = lang === "pl" ? "pl-PL" : "en-GB";
  const start = new Date(startIso + "T00:00:00");
  const fmtFull = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  if (!endIso) return fmtFull.format(start).toUpperCase();
  const end = new Date(endIso + "T00:00:00");
  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();
  if (sameMonth) {
    const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(start);
    return `${day}–${fmtFull.format(end)}`.toUpperCase();
  }
  return `${fmtFull.format(start)} – ${fmtFull.format(end)}`.toUpperCase();
}

function SecH({ idx, title, right }: { idx: string; title: string; right?: string }) {
  return (
    <h2 className="sec-h">
      <span className="idx">[{idx}]</span>
      <span className="title">{title}</span>
      <span className="spacer" />
      {right && <span className="right">{right}</span>}
    </h2>
  );
}

function Tok({ children }: { children: React.ReactNode }) {
  return <span className="tok">{children}</span>;
}

type PortfolioProps = {
  portraitWebp?: string;
  portraitJpg?: string;
  eventImages?: Record<string, string>;
  initialLang?: Lang;
};

export function Portfolio({
  portraitWebp,
  portraitJpg,
  eventImages,
  initialLang,
}: PortfolioProps = {}) {
  const [lang, setLang] = useState<Lang>(initialLang ?? DEFAULT_LANG);
  const [booting, setBooting] = useState(true);
  const [version, setVersion] = useState("");
  const [asciiLogo, setAsciiLogo] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) setBooting(false);
    const alwaysShow = import.meta.env.PUBLIC_BOOT_INTRO_ALWAYS === "true";
    if (!alwaysShow) {
      try {
        if (localStorage.getItem("bootIntroSeen") === "1") setBooting(false);
      } catch {}
    }
    setVersion(buildVersion());
    setAsciiLogo(
      ` _  _    _  __  __  ___  _\n| |/ /  / \\|  \\/  ||_ _|| |\n| ' /  / _ \\ |\\/| | | | | |\n| . \\ / ___ \\|  | | | | | |___\n|_|\\_/_/   \\_\\_|  |_||___||_____|`,
    );
  }, []);

  const finishBoot = useCallback(() => {
    setBooting(false);
    try {
      localStorage.setItem("bootIntroSeen", "1");
    } catch {}
  }, []);

  const switchLang = useCallback((next: Lang) => {
    setLang((prev) => {
      if (prev === next) return prev;
      const path = `/${next}/`;
      try {
        window.history.pushState({ lang: next }, "", path);
      } catch {}
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(/^\/(pl|en)\//);
      if (m) {
        const next = m[1] as Lang;
        setLang(next);
        document.documentElement.lang = next;
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const t = PORTFOLIO_I18N[lang];
  const s = PORTFOLIO_STATIC;
  const ui = t.ui;

  return (
    <>
      {booting && <BootIntro onDone={finishBoot} />}
      <div
        className={`page-shell ${!booting ? "reveal" : ""}`}
        style={{ visibility: booting ? "hidden" : "visible" }}
      >
        {/* Command bar */}
        <header
          style={{
            padding:
              "calc(12px + env(safe-area-inset-top)) calc(var(--pad-x) + env(safe-area-inset-right)) 12px calc(var(--pad-x) + env(safe-area-inset-left))",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--panel)",
            position: "sticky",
            top: 0,
            zIndex: 20,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            className="hdr-left"
            style={{ display: "flex", gap: 20, alignItems: "center" }}
          >
            <span style={{ color: "var(--accent)" }} className="blink">
              ▮
            </span>
            <span style={{ color: "var(--ink)" }}>kamil@portfolio</span>
            <span style={{ color: "var(--dim)" }}>:~$</span>
            <span
              className="hdr-whoami"
              style={{ color: "var(--muted)" }}
            >
              whoami
            </span>
          </div>
          <nav
            className="nav-mid"
            style={{
              display: "flex",
              gap: 24,
              color: "var(--muted)",
              fontSize: 12,
            }}
          >
            <a href="#about" style={{ textDecoration: "none" }}>
              {t.nav.about}
            </a>
            <a href="#experience" style={{ textDecoration: "none" }}>
              {t.nav.exp}
            </a>
            <a href="#work" style={{ textDecoration: "none" }}>
              {t.nav.work}
            </a>
            <a href="#stack" style={{ textDecoration: "none" }}>
              {t.nav.stack}
            </a>
            <a href="#education" style={{ textDecoration: "none" }}>
              {t.nav.education}
            </a>
            <a href="#events" style={{ textDecoration: "none" }}>
              {t.nav.events}
            </a>
            <a href="#contact" style={{ textDecoration: "none" }}>
              {t.nav.contact}
            </a>
          </nav>
          <div
            style={{
              display: "flex",
              gap: 16,
              color: "var(--muted)",
              fontSize: 12,
              alignItems: "center",
            }}
          >
            <div className="lang-toggle" role="group" aria-label="language">
              <button
                className={lang === "pl" ? "on" : ""}
                onClick={() => switchLang("pl")}
              >
                PL
              </button>
              <button
                className={lang === "en" ? "on" : ""}
                onClick={() => switchLang("en")}
              >
                EN
              </button>
            </div>
            <span className="nav-right" style={{ display: "inline" }}>
              UTC+01:00
            </span>
            <span style={{ color: "var(--accent)" }}>{ui.online}</span>
          </div>
        </header>

        {/* Hero */}
        <section
          className="hero-grid"
          style={{
            position: "relative",
            padding: "var(--hero-pad) var(--pad-x) 48px",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <div
            className="hero-grid-main"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: 48,
              alignItems: "flex-start",
            }}
          >
            <div
              className="hero-left"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Cell 1 — prompt, bottom-aligned */}
              <div
                style={{
                  height: 52,
                  display: "flex",
                  alignItems: "flex-end",
                  paddingBottom: 4,
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                <span style={{ color: "var(--accent)", marginRight: 6 }}>
                  {">"}
                </span>
                {ui.identityCat}
              </div>

              {/* Cell 2 — ASCII KAMIL (1 cell, client-only to avoid SEO indexing) */}
              <pre
                aria-hidden="true"
                data-nosnippet
                style={{
                  margin: 0,
                  height: 52,
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  lineHeight: "10.4px",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {asciiLogo}
              </pre>

              {/* Cell 3 — spacer */}
              <div style={{ height: 52 }} />

              {/* Cells 4-6 — h1 (3 cells = 156px) */}
              <h1
                className="hero"
                style={{
                  margin: 0,
                  height: 156,
                  fontSize: "var(--h1-size)",
                  fontWeight: 700,
                  letterSpacing: -2,
                  color: "var(--ink)",
                  lineHeight: "78px",
                  textTransform: "uppercase",
                }}
              >
                Kamil
                <br />
                Kurdziel
                <span style={{ color: "var(--accent)" }} className="blink">
                  _
                </span>
              </h1>

              {/* Cell 8 — role, centered in 1 cell */}
              <div
                style={{
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 15,
                  color: "var(--ink)",
                  maxWidth: 520,
                }}
              >
                <span style={{ color: "var(--accent)", marginRight: 6 }}>#</span>
                {t.role}
              </div>

              {/* Cells 8-9 — tagline (2 cells = 104px), centered */}
              <p
                className="hero-tagline"
                style={{
                  margin: 0,
                  height: 104,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  color: "var(--muted)",
                  maxWidth: 560,
                  lineHeight: 1.65,
                }}
              >
                {t.tagline}
              </p>

              {/* Cell 10 — buttons (1 cell) */}
              <div
                style={{
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a href="#work" className="cli-btn primary">
                  {ui.seeWork}
                </a>
                <a href="#contact" className="cli-btn ghost">
                  {ui.contact}
                </a>
              </div>
            </div>

            <aside
              className="hero-aside"
              style={{
                border: "1px solid var(--rule)",
                background: "var(--panel)",
              }}
            >
              <div
                style={{
                  padding: "8px 14px",
                  borderBottom: "1px solid var(--rule)",
                  fontSize: 11,
                  color: "var(--muted)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{ui.asset}</span>
                <span style={{ color: "var(--accent)" }}>{ui.rec}</span>
              </div>
              <div
                className="portrait-wrap"
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                  background: "var(--panel2)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={portraitWebp || portraitJpg || ""}
                  alt="Kamil Kurdziel"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {(portraitWebp || portraitJpg) && (
                  <>
                    <div
                      className="glitch-band glitch-band-1"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url(${portraitWebp || portraitJpg})`,
                      }}
                    />
                    <div
                      className="glitch-band glitch-band-2"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url(${portraitWebp || portraitJpg})`,
                      }}
                    />
                    <div
                      className="glitch-band glitch-band-3"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `url(${portraitWebp || portraitJpg})`,
                      }}
                    />
                  </>
                )}
              </div>
              <dl
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  borderTop: "1px solid var(--rule)",
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  rowGap: 6,
                  columnGap: 12,
                  fontSize: 11,
                }}
              >
                <dt style={{ color: "var(--muted)", letterSpacing: ".18em" }}>
                  BASE
                </dt>
                <dd style={{ margin: 0, color: "var(--ink)" }}>Poland</dd>
                <dt style={{ color: "var(--muted)", letterSpacing: ".18em" }}>
                  ROLE
                </dt>
                <dd style={{ margin: 0, color: "var(--ink)" }}>
                  .NET Lead Engineer
                </dd>
                <dt style={{ color: "var(--muted)", letterSpacing: ".18em" }}>
                  ENERGY
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                    overflow: "visible",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>[██████████]</span>
                  <span
                    className="blink"
                    style={{ color: "var(--accent2)" }}
                  >
                    ██▓▒░
                  </span>
                </dd>
              </dl>
            </aside>
          </div>
        </section>

        {/* Vitals / stats */}
        <section style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="00" title="// vitals" right="uptime" />
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            {[
              { value: `${s.years}+`, label: t.statLabels.years },
              { value: s.stats.shipped, label: t.statLabels.shipped },
              { value: s.stats.domains, label: t.statLabels.domains },
              { value: s.stats.tokens, label: t.statLabels.tokens },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--row-pad) 24px",
                  borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: 36,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 11,
                    letterSpacing: ".18em",
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="01" title="// about" right="cat about.md" />
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              padding: "var(--row-pad) 0 32px",
            }}
          >
            {t.about.map((p, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--rule)",
                  background: "var(--panel)",
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: 12,
                    letterSpacing: ".08em",
                  }}
                >
                  {ABOUT_CMDS[i]}
                </div>
                <div
                  style={{
                    color: "var(--ink)",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  {p}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="02" title="// experience.log" right="tail -f" />
          {[...s.experience].reverse().map((role, i) => {
            const originalIdx = s.experience.length - 1 - i;
            const i18n = t.experience.roles[role.id];
            const endLabel = role.endKey
              ? t.experience.endLabels[role.endKey]
              : role.end ?? null;
            const period = endLabel ? `${role.start} — ${endLabel}` : role.start;
            const isFuture = role.endKey === "soon";
            return (
              <div className="exp-row" key={role.id}>
                <div>
                  <div
                    style={{
                      color: isFuture ? "var(--accent2)" : "var(--accent)",
                      fontSize: 13,
                      letterSpacing: ".12em",
                    }}
                  >
                    {period}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 11,
                      marginTop: 4,
                      letterSpacing: ".18em",
                    }}
                  >
                    {role.company}
                  </div>
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--ink)",
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: ".02em",
                      margin: 0,
                    }}
                  >
                    {i18n?.title}
                  </h3>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      marginTop: 8,
                    }}
                  >
                    {i18n?.description}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    {role.stack.map((tok) => (
                      <Tok key={tok}>{tok}</Tok>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textAlign: "right",
                  }}
                >
                  <div>#{String(originalIdx + 1).padStart(2, "0")}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Work — Published */}
        <section id="work" style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="03" title="// projects/published" right="curl -I /" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              padding: "var(--row-pad) 0 32px",
              maxWidth: 640,
            }}
          >
            {s.projects.published.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="card greenguard-card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="card-head">
                  <span style={{ color: "var(--muted)" }}>./{p.id}</span>
                  <span
                    style={{
                      color: "var(--accent)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span className="live-dot" />
                    LIVE ↗
                  </span>
                </div>
                <div
                  style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    flex: 1,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: "var(--ink)",
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-.01em",
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      GREEN<span style={{ color: "var(--accent)" }}>/</span>GUARD
                    </h3>
                    <div
                      style={{
                        marginTop: 6,
                        color: "var(--muted)",
                        fontSize: 10,
                        letterSpacing: ".22em",
                        textTransform: "uppercase",
                      }}
                    >
                      v0.2 · since 2026 · self-hosted
                    </div>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "var(--muted)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {t.projects.publishedNote[p.id]}
                  </p>

                  <div>
                    {p.stack.map((tok) => (
                      <Tok key={tok}>{tok}</Tok>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "auto",
                      borderTop: "1px solid var(--rule)",
                      paddingTop: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--muted)",
                        fontSize: 10,
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                      }}
                    >
                      open preview
                    </span>
                    <span
                      className="gg-cta"
                      style={{
                        color: "var(--accent)",
                        fontSize: 12,
                        letterSpacing: ".14em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      plants.kamilkurdziel.me
                      <span className="gg-arrow">→</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Work — Classified */}
        <section style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="04" title="// projects/classified" right="Y2F0IGNsYXNzaWZpZWQuZ3Bn" />
          <div
            style={{
              padding: "var(--row-pad) 0 16px",
              color: "var(--accent2)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: ".18em",
            }}
          >
            <span>WARN:</span> {t.projects.warn}
          </div>
          <div
            className="three-col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              padding: "0 0 32px",
            }}
          >
            {s.projects.classified.map((id) => (
              <ClassifiedCard
                key={id}
                id={id}
                title={t.projects.classifiedTitle[id]}
              />
            ))}
            <div className="card classified-card">
              <div className="card-head">
                <span style={{ color: "var(--muted)" }}>./...</span>
                <span style={{ color: "var(--accent2)" }}>NDA</span>
              </div>
              <div
                style={{
                  padding: 24,
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 16,
                    fontStyle: "italic",
                    letterSpacing: ".04em",
                    textAlign: "center",
                  }}
                >
                  {t.projects.classifiedMore}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="05" title="// stack.json" right="cat stack.json" />
          <div
            className="three-col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--rule)",
              border: "1px solid var(--rule)",
              margin: "var(--row-pad) 0 32px",
            }}
          >
            {s.stack.map((group) => (
              <div
                key={group.label}
                style={{ background: "var(--panel)", padding: 20 }}
              >
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: 11,
                    letterSpacing: ".22em",
                    marginBottom: 12,
                  }}
                >
                  // {group.label}
                </div>
                <div>
                  {group.items.map((item) => (
                    <Tok key={item}>{item}</Tok>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" style={{ padding: "0 var(--pad-x)" }}>
          <SecH
            idx="06"
            title={t.education.sectionTitle}
            right={t.education.sectionRight}
          />
          {[...s.education].reverse().map((edu, i) => {
            const originalIdx = s.education.length - 1 - i;
            const i18n = t.education.schools[edu.id];
            const endLabel = edu.endKey
              ? t.experience.endLabels[edu.endKey]
              : edu.end ?? null;
            const period = endLabel ? `${edu.start} — ${endLabel}` : edu.start;
            const isOngoing = edu.endKey === "now";
            return (
              <div className="exp-row" key={edu.id}>
                <div>
                  <div
                    style={{
                      color: isOngoing ? "var(--accent2)" : "var(--accent)",
                      fontSize: 13,
                      letterSpacing: ".12em",
                    }}
                  >
                    {period}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: 11,
                      marginTop: 4,
                      letterSpacing: ".18em",
                    }}
                  >
                    {i18n?.field}
                  </div>
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--ink)",
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: ".02em",
                      margin: 0,
                    }}
                  >
                    {i18n?.school}
                  </h3>
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textAlign: "right",
                  }}
                >
                  <div>#{String(originalIdx + 1).padStart(2, "0")}</div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Events */}
        <section id="events" style={{ padding: "0 var(--pad-x)" }}>
          <SecH
            idx="07"
            title={t.events.sectionTitle}
            right={t.events.sectionRight}
          />
          <div
            className="events-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              padding: "var(--row-pad) 0 32px",
            }}
          >
            {[...s.events]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .map((ev) => {
                const i18n = t.events.items[ev.id];
                const img = ev.hasImage ? eventImages?.[ev.id] : undefined;
                const isMentor = ev.role === "mentor";
                return (
                  <article
                    key={ev.id}
                    className={`badge ${isMentor ? "badge--mentor" : "badge--attendee"}`}
                  >
                    <div className="badge-body">
                      <div className="badge-head">
                        <div className="badge-head-meta">
                          <span className="badge-head-event">
                            // {i18n?.name}
                          </span>
                          <span className="badge-head-loc">
                            {i18n?.location}
                          </span>
                        </div>
                        <span className="badge-head-year">
                          {ev.date.slice(0, 4)}
                        </span>
                      </div>

                      <div className="badge-photo">
                        {img ? (
                          <img
                            src={img}
                            alt={i18n?.name ?? ev.id}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <EventGlitch />
                        )}
                      </div>

                      <dl className="badge-fields">
                        <dt>DATE</dt>
                        <dd>{formatEventDate(ev.date, ev.endDate, lang)}</dd>
                        <dt>ROLE</dt>
                        <dd className="badge-fields-role">
                          {isMentor
                            ? t.events.roles.mentor
                            : t.events.roles.attendee}
                        </dd>
                      </dl>

                      <div className="badge-foot">
                        <div className="badge-barcode">
                          <Code39Barcode value={i18n?.name ?? ev.id} />
                          <span className="badge-barcode-label">
                            {(i18n?.name ?? ev.id).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="badge-perf" aria-hidden="true" />
                  </article>
                );
              })}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ padding: "0 var(--pad-x)" }}>
          <SecH idx="08" title={`// ${t.contact.title}`} right="mail -s hello" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 28,
              padding: "64px 16px 56px",
            }}
          >
            <CopyableEmail
              email={s.email}
              copiedLabel={t.contact.copied}
              hintLabel={t.contact.copyHint}
            />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {s.socials.map((soc) => (
                <SocialIcon
                  key={soc.id}
                  kind={soc.id as "github" | "linkedin" | "x" | "mail"}
                  href={soc.href}
                  label={soc.label}
                />
              ))}
            </div>

            <div
              aria-hidden="true"
              className="contact-phone"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: ".04em",
                opacity: 0.55,
                userSelect: "none",
                marginTop: 8,
              }}
            >
              {(() => {
                const m = s.phone.match(/^(\+\d{1,3})\s*(.*)$/);
                const prefix = m?.[1] ?? s.phone;
                const rest = m?.[2] ?? "";
                const template = rest.replace(/\d/g, "X");
                return (
                  <>
                    <span>{prefix}</span>
                    {template && (
                      <>
                        <span>&nbsp;</span>
                        <GlitchDigits template={template} />
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: "20px var(--pad-x)",
            borderTop: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            color: "var(--muted)",
            fontSize: 11,
            letterSpacing: ".14em",
          }}
        >
          <span>// kamil@portfolio{version && ` v${version}`}</span>
        </footer>
      </div>
    </>
  );
}
