type Kind = "github" | "linkedin" | "x" | "mail";

const paths: Record<Kind, React.ReactNode> = {
  github: (
    <path
      d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.2 3.3.9.1-.8.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3 .7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"
      fill="currentColor"
    />
  ),
  linkedin: (
    <path
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"
      fill="currentColor"
    />
  ),
  x: (
    <path
      d="M18.244 2H21l-6.56 7.5L22 22h-6.82l-5.34-6.98L3.7 22H1l7.04-8.04L2 2h6.99l4.83 6.38L18.244 2zm-1.2 18.3h1.88L6.04 3.6H4.04L17.044 20.3z"
      fill="currentColor"
    />
  ),
  mail: (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 6l9 7 9-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </>
  ),
};

type Props = { kind: Kind; href: string; label: string };

export function SocialIcon({ kind, href, label }: Props) {
  return (
    <a
      href={href}
      className="sm-ico"
      aria-label={label}
      target={kind === "mail" ? undefined : "_blank"}
      rel={kind === "mail" ? undefined : "noreferrer"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        {paths[kind]}
      </svg>
    </a>
  );
}
