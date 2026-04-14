FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json

RUN chown -R nuxt:nodejs /app

USER nuxt

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
