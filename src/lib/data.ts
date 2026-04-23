export type Lang = "pl" | "en";

export const DEFAULT_LANG: Lang = "pl";

const START_YEAR = 2022;
const yearsOfExp = new Date().getFullYear() - START_YEAR;

export type EndKey = "now" | "soon" | null;

export type ExpRole = {
  id: string;
  start: string;
  end: string | null;
  endKey: EndKey;
  company: string;
  stack: string[];
};

export type Project = {
  id: string;
  title: string;
  industry: string;
  href?: string;
  stack: string[];
  note: string;
  classified?: boolean;
};

export type StackGroup = {
  label: string;
  items: string[];
};

export type Social = {
  id: string;
  href: string;
  label: string;
};

export type StaticData = {
  startYear: number;
  years: number;
  phone: string;
  email: string;
  stats: { shipped: string; domains: string; tokens: string };
  socials: Social[];
  experience: ExpRole[];
  projects: {
    published: { id: string; href: string; stack: string[] }[];
    classified: string[];
  };
  stack: StackGroup[];
};

export const PORTFOLIO_STATIC: StaticData = {
  startYear: START_YEAR,
  years: yearsOfExp,
  phone: "+48 123 456 789",
  email: "contact@kamilkurdziel.me",
  stats: {
    shipped: "10+",
    domains: "6+",
    tokens: "∞",
  },
  socials: [
    { id: "github", href: "https://github.com/k-kurdziel", label: "GitHub" },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/kamil-kurdziel-9485ba267/?skipRedirect=true",
      label: "LinkedIn",
    },
    {
      id: "mail",
      href: "mailto:contact@kamilkurdziel.me",
      label: "Email",
    },
  ],
  experience: [
    {
      id: "cetus-intern",
      start: "2022",
      end: null,
      endKey: null,
      company: "CetusPro",
      stack: [".NET", "EF Core", "Postgres"],
    },
    {
      id: "cetus-dev",
      start: "2022",
      end: null,
      endKey: null,
      company: "CetusPro",
      stack: [".NET", "Postgres", "MassTransit", "EF Core"],
    },
    {
      id: "devcodi-lead",
      start: "2024",
      end: null,
      endKey: "now",
      company: "DevCodi",
      stack: ["AWS", ".NET", "Postgres", "MassTransit", "RabbitMQ"],
    },
    {
      id: "neuromentor-cto",
      start: "2025",
      end: null,
      endKey: "now",
      company: "NeuroMentor",
      stack: [".NET", "AI", "RAG"],
    },
    {
      id: "cetus-mentor",
      start: "2025",
      end: null,
      endKey: "soon",
      company: "CetusPro Elevate",
      stack: ["Mentoring", "IT Projects", "Leadership"],
    },
  ],
  projects: {
    published: [
      {
        id: "greenguard",
        href: "https://plants.kamilkurdziel.me/",
        stack: ["ESP32", "Rust", "Astro", "TimescaleDB", "IoT"],
      },
    ],
    classified: [
      "car-rental",
      "fleet-mgmt",
      "football-stats",
      "ai-ml-platform",
      "iot-monitoring",
    ],
  },
  stack: [
    {
      label: "BACKEND",
      items: [
        "C# / .NET",
        "ASP.NET Core",
        "Entity Framework",
        "PostgreSQL",
        "TimescaleDB",
        "MassTransit",
        "RabbitMQ",
        "SignalR",
        "REST API",
      ],
    },
    {
      label: "ARCHITECTURE",
      items: ["Modular Monolith", "DDD", "CQRS", "Clean Architecture"],
    },
    {
      label: "AI",
      items: ["RAG", "LLM Integration", "Prompt Engineering", "Vector DB"],
    },
    {
      label: "TESTING",
      items: ["xUnit", "Unit", "Integration", "E2E"],
    },
    {
      label: "OBSERVABILITY",
      items: ["Serilog", "OpenTelemetry"],
    },
    {
      label: "FRONTEND",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      label: "DEVOPS & CLOUD",
      items: ["AWS", "Docker", "CI/CD", "Git", "GitHub Actions"],
    },
    {
      label: "IOT / HARDWARE",
      items: ["MQTT", "ESP32", "STM32"],
    },
    {
      label: "LEADERSHIP",
      items: ["Lead Engineer", "Code Review", "Mentoring"],
    },
  ],
};

type I18NContent = {
  nav: {
    about: string;
    exp: string;
    work: string;
    stack: string;
    contact: string;
  };
  role: string;
  tagline: string;
  about: string[];
  experience: {
    endLabels: { now: string; soon: string };
    roles: Record<string, { title: string; description: string }>;
  };
  projects: {
    publishedNote: Record<string, string>;
    classifiedTitle: Record<string, string>;
    classifiedMore: string;
    warn: string;
  };
  contact: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    copied: string;
    copyHint: string;
  };
  statLabels: { years: string; shipped: string; domains: string; tokens: string };
  ui: {
    online: string;
    seeWork: string;
    contact: string;
    identityCat: string;
    asset: string;
    rec: string;
  };
};

export const PORTFOLIO_I18N: Record<Lang, I18NContent> = {
  pl: {
    nav: {
      about: "--about",
      exp: "--experience",
      work: "--work",
      stack: "--stack",
      contact: "--contact",
    },
    role: ".NET Lead Engineer | Mentor & CTO",
    tagline:
      "Buduję skalowalne systemy backendowe i prowadzę zespoły inżynierskie — " +
      "od architektury po wdrożenie produkcyjne. Eksploruję też możliwości AI " +
      "zarówno w samym produkcie, jak i w codziennym procesie tworzenia oprogramowania.",
    about: [
      "Lead Engineer z zapleczem w .NET. Na co dzień pracuję z dużymi systemami, " +
        "projektuję architekturę, prowadzę zespół developerów i odpowiadam za " +
        "wdrożenia na produkcję.",
      "Po godzinach buduję własne projekty (np. GreenGuard) i eksperymentuję z AI, " +
        "IoT i hardware. Lubię wyzwania w projektach — próbowanie różnych podejść, " +
        "bawienie się kodem i architekturą.",
      "W wolnym czasie uwielbiam spędzać czas robiąc zdjęcia. Najmocniej ciągnie mnie do natury — lasy, góry, zwierzęta.",
    ],
    experience: {
      endLabels: { now: "Obecnie", soon: "Wkrótce" },
      roles: {
        "cetus-intern": {
          title: "Praktykant / Programista .NET",
          description:
            "Pierwszy kontakt z komercyjnym kodem i architekturą Modular Monolith. " +
            "Solidne fundamenty w ekosystemie .NET, pierwsze code review od seniorów " +
            "i nauka jak wygląda kod, który ma przeżyć dłużej niż tydzień.",
        },
        "cetus-dev": {
          title: "Programista .NET",
          description:
            "Budowanie MVP od zera, kontakt z klientami i przekładanie wymagań " +
            "biznesowych na kod. Szybki rozwój od juniora do samodzielnego developera " +
            "— pierwsze produkcyjne wdrożenia i ownership kluczowych modułów.",
        },
        "devcodi-lead": {
          title: "Lead Engineer",
          description:
            "Prowadzę zespół 2–3 developerów, dbam o jakość kodu, code review i " +
            "standardy techniczne. Odpowiadam za architekturę, wdrożenia na produkcję " +
            "oraz bezpośrednią współpracę z klientami — od zbierania wymagań po " +
            "tłumaczenie trade-offów technicznych na język biznesu.",
        },
        "neuromentor-cto": {
          title: "Dyrektor ds. Technologii",
          description:
            "Kieruję technologią w NeuroMentor — platformie AI, która pomaga przyszłym " +
            "psychologom ćwiczyć rozmowy z pacjentami w bezpiecznym środowisku. " +
            "Odpowiadam za wybór stacku, architekturę systemu i kierunek rozwoju " +
            "produktu — od pierwszych prototypów po produkcyjną platformę.",
        },
        "cetus-mentor": {
          title: "Mentor",
          description:
            "Prowadzenie podopiecznego przez pełny cykl życia projektu IT — " +
            "od pomysłu, przez architekturę, po implementację. " +
            "Dzielę się doświadczeniem z komercyjnych projektów, uczę myślenia " +
            "o jakości kodu, decyzjach technicznych i ich trade-offach, oraz " +
            "współpracy z biznesem.",
        },
      },
    },
    projects: {
      publishedNote: {
        greenguard:
          "GreenGuard nie powstał z miłości do technologii, ale z instynktu " +
          "przetrwania. Moja dziewczyna miała już dość patrzenia na mój pokój, " +
          "który powoli zmieniał się w cmentarzysko paproci i wystawę suchych " +
          "badyli. Po kolejnym „Kochanie, znowu go zamordowałeś\", zrozumiałem, " +
          "że albo zbuduję system monitorowania wilgotności, albo moje rośliny " +
          "(i ja) będziemy mieć poważne kłopoty. Tak narodził się GreenGuard — " +
          "bo życie z dziewczyną jest lepsze, gdy kwiatki są zielone.",
      },
      classifiedTitle: {
        "car-rental": "Wypożyczalnia aut",
        "fleet-mgmt": "Zarządzanie flotą",
        "football-stats": "Statystyki piłkarskie",
        "ai-ml-platform": "Platforma AI / ML",
        "iot-monitoring": "Monitoring IoT",
      },
      classifiedMore: "I wiele więcej...",
      warn: "ŚCIŚLE TAJNE!!!!!!!",
    },
    contact: {
      title: "let's talk",
      phoneLabel: "zadzwoń",
      emailLabel: "napisz",
      copied: "skopiowane",
      copyHint: "kliknij aby skopiować",
    },
    statLabels: {
      years: "YEARS",
      shipped: "SHIPPED",
      domains: "DOMAINS",
      tokens: "TOKENS",
    },
    ui: {
      online: "● ONLINE",
      seeWork: "./see-work.sh",
      contact: "./contact.sh",
      identityCat: "cat ./identity.txt",
      asset: "FILE: kk.bmp",
      rec: "● REC",
    },
  },
  en: {
    nav: {
      about: "--about",
      exp: "--experience",
      work: "--work",
      stack: "--stack",
      contact: "--contact",
    },
    role: ".NET Lead Engineer | Mentor & CTO",
    tagline:
      "I build scalable backend systems and lead engineering teams — from " +
      "architecture through production deployment. I also explore AI both in " +
      "the product and in the day-to-day process of building software.",
    about: [
      "Lead Engineer with a .NET backbone. Day-to-day I design architecture, " +
        "own large systems, lead a team of developers, and carry production " +
        "deployments across the line.",
      "After hours I build side projects (e.g. GreenGuard) and play with AI, " +
        "IoT, and hardware. I like a challenge — trying different approaches, " +
        "playing with code and with architecture.",
      "In my free time, I love spending hours behind a camera. Nature pulls me the most — forests, mountains, wildlife.",
    ],
    experience: {
      endLabels: { now: "Present", soon: "Coming soon" },
      roles: {
        "cetus-intern": {
          title: "Intern / .NET Developer",
          description:
            "First touch with commercial code and Modular Monolith architecture. " +
            "Solid fundamentals in the .NET ecosystem, first code reviews from senior " +
            "engineers, and learning what code looks like when it has to survive longer than a week.",
        },
        "cetus-dev": {
          title: ".NET Developer",
          description:
            "Building MVPs from scratch, client contact, and translating business " +
            "requirements into code. Rapid growth from junior to independent developer " +
            "— first production deployments and ownership of key modules.",
        },
        "devcodi-lead": {
          title: "Lead Engineer",
          description:
            "Leading a 2–3 developer team, owning code quality, code reviews, and " +
            "technical standards. Responsible for architecture, production deployments, " +
            "and direct client collaboration — from gathering requirements to " +
            "translating technical trade-offs into business language.",
        },
        "neuromentor-cto": {
          title: "Chief Technology Officer",
          description:
            "Leading technology at NeuroMentor — an AI platform helping future " +
            "psychologists practice patient conversations in a safe environment. " +
            "Responsible for stack selection, system architecture, and product " +
            "direction — from early prototypes to a production platform.",
        },
        "cetus-mentor": {
          title: "Mentor",
          description:
            "Guiding a mentee through the full lifecycle of an IT project — " +
            "from idea through architecture to implementation. " +
            "Sharing experience from commercial projects, teaching how to think " +
            "about code quality, technical decisions and their trade-offs, and " +
            "collaboration with the business side.",
        },
      },
    },
    projects: {
      publishedNote: {
        greenguard:
          "GreenGuard wasn't born out of love for technology — it was pure " +
          "survival instinct. My girlfriend had had enough of staring at my room " +
          "slowly turning into a graveyard of ferns and a museum of dry sticks. " +
          "After yet another \"Babe, you killed it again,\" I realized I either " +
          "build a soil-moisture monitoring system, or my plants (and I) are in " +
          "serious trouble. That's how GreenGuard was born — because life with " +
          "your girlfriend is just better when the plants stay green.",
      },
      classifiedTitle: {
        "car-rental": "Car Rental",
        "fleet-mgmt": "Fleet Management",
        "football-stats": "Football Statistics",
        "ai-ml-platform": "AI / ML Platform",
        "iot-monitoring": "IoT Monitoring",
      },
      classifiedMore: "And many more...",
      warn: "TOP SECRET!!!!!!!",
    },
    contact: {
      title: "let's talk",
      phoneLabel: "call",
      emailLabel: "mail",
      copied: "copied",
      copyHint: "click to copy",
    },
    statLabels: {
      years: "YEARS",
      shipped: "SHIPPED",
      domains: "DOMAINS",
      tokens: "TOKENS",
    },
    ui: {
      online: "● ONLINE",
      seeWork: "./see-work.sh",
      contact: "./contact.sh",
      identityCat: "cat ./identity.txt",
      asset: "FILE: kk.bmp",
      rec: "● REC",
    },
  },
};
