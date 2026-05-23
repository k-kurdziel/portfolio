# ── Stage 1: build static site with Astro + React ─────
FROM node:22-alpine AS build
WORKDIR /app

# Enable corepack for pnpm + native deps support for sharp
RUN corepack enable

# Install deps first (better cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Source + build
COPY . .
RUN pnpm build

# ── Stage 2: serve with nginx ──────────────────────────
FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
