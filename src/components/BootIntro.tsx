import { useCallback, useEffect, useRef, useState } from "react";

type BootLine =
  | { kind: "sys"; text: string }
  | { kind: "blank"; text: string }
  | { kind: "login"; text: string };

const BOOT_LINES: BootLine[] = [
  { kind: "sys", text: "KAMIL-OS v4.1 · boot sequence" },
  { kind: "sys", text: "mem check ............ OK" },
  { kind: "sys", text: "mount /home/kamil .... OK" },
  { kind: "sys", text: "load .NET runtime .... OK" },
  { kind: "blank", text: "" },
  { kind: "login", text: "login: kamil" },
  { kind: "blank", text: "" },
];

const BOOT_CMD = "cat ./identity.txt";

type Phase = "preamble" | "typing" | "entered" | "fading";

export function BootIntro({ onDone }: { onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("preamble");
  const skippedRef = useRef(false);

  useEffect(() => {
    if (phase !== "preamble") return;
    if (lineIdx >= BOOT_LINES.length) {
      setPhase("typing");
      return;
    }
    const delay = BOOT_LINES[lineIdx].kind === "blank" ? 60 : 120;
    const t = setTimeout(() => setLineIdx((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [phase, lineIdx]);

  useEffect(() => {
    if (phase !== "typing") return;
    if (typed.length >= BOOT_CMD.length) {
      const t = setTimeout(() => setPhase("entered"), 360);
      return () => clearTimeout(t);
    }
    const jitter = 40 + Math.random() * 60;
    const t = setTimeout(
      () => setTyped(BOOT_CMD.slice(0, typed.length + 1)),
      jitter,
    );
    return () => clearTimeout(t);
  }, [phase, typed]);

  useEffect(() => {
    if (phase !== "entered") return;
    const t = setTimeout(() => setPhase("fading"), 380);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => onDone(), 500);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setPhase("fading");
    setTimeout(() => onDone(), 200);
  }, [onDone]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " "].includes(e.key)) skip();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [skip]);

  const renderLine = (l: BootLine, i: number) => {
    const cls = "boot-line show";
    if (l.kind === "blank")
      return (
        <div key={i} className={cls}>
          &nbsp;
        </div>
      );
    if (l.kind === "login")
      return (
        <div key={i} className={cls}>
          <span className="boot-accent">{l.text}</span>
        </div>
      );
    return (
      <div key={i} className={cls}>
        <span className="boot-muted">[ok]</span> <span>{l.text}</span>
      </div>
    );
  };

  const preamble = BOOT_LINES.slice(0, lineIdx).map(renderLine);
  const showPrompt = phase !== "preamble";
  const commandEntered = phase === "entered" || phase === "fading";

  return (
    <div
      className={`boot-intro ${phase === "fading" ? "fade-out" : ""}`}
      onClick={skip}
    >
      <button
        className="boot-skip"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
      >
        skip ⏎
      </button>
      <div
        className="boot-muted"
        style={{
          fontSize: 11,
          letterSpacing: ".18em",
          textTransform: "uppercase",
        }}
      >
        kamil@portfolio — 80×24
      </div>
      <div style={{ marginTop: 10 }}>
        {preamble}
        {showPrompt && (
          <>
            <div className="boot-line show boot-prompt">
              <span className="user">kamil@portfolio</span>
              <span className="path">:~$</span>
              <span className="cmd">
                {typed}
                {phase === "typing" && <span className="boot-caret" />}
                {phase !== "typing" && <span className="boot-caret blink" />}
              </span>
            </div>
            {commandEntered && (
              <div className="boot-line show" style={{ marginTop: 10 }}>
                <span className="boot-dim">loading identity …</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
