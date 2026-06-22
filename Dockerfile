# Build both locale bundles (en + vi).
FROM node:22-alpine AS build
WORKDIR /app
# Husky's prepare script must not run outside a git checkout.
ENV HUSKY=0
# node 22 ships npm 10; pin npm 11 to match the locally generated lockfile resolver.
RUN npm i -g npm@11
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime: server bundles are self-contained; the proxy uses Node stdlib only.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=4000
COPY --from=build /app/dist ./dist
COPY --from=build /app/tools ./tools
EXPOSE 4000
USER node
CMD ["node", "tools/serve-ssr.mjs"]
