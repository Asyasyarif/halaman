# Halaman — Dockerfile for Production
# Multi-stage build: Node.js builder → production runner

# ── Build Stage ──
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/database/package.json packages/database/
COPY packages/editor/package.json packages/editor/
COPY packages/docs-renderer/package.json packages/docs-renderer/
COPY packages/github/package.json packages/github/
COPY packages/search/package.json packages/search/
COPY packages/config/package.json packages/config/
COPY packages/ui/package.json packages/ui/
COPY apps/web/package.json apps/web/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# ── Production Stage ──
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/apps/web/.output /app/.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
