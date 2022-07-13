FROM node:14
WORKDIR /app

RUN npm install -g pnpm@7.2.0

COPY package.json pnpm-*.yaml turbo.json ./
COPY apps/checkout/package.json ./apps/checkout/
COPY apps/checkout-app/package.json ./apps/checkout-app/
COPY packages/env-vars/package.json ./packages/env-vars/
COPY packages/eslint-config-checkout/package.json ./packages/eslint-config-checkout/
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY packages/ui-kit/package.json ./packages/ui-kit/
RUN pnpm install
COPY . .

ARG SALEOR_API_URL
ARG CHECKOUT_APP_URL
ARG REACT_APP_SALEOR_API_URL
ARG REACT_APP_CHECKOUT_APP_URL
ARG NEXT_PUBLIC_SALEOR_API_URL
ARG SALEOR_APP_TOKEN
ARG SETTINGS_ENCRYPTION_SECRET
ENV SALEOR_API_URL ${SALEOR_API_URL:-http://localhost:8000/graphql/}
ENV CHECKOUT_APP_URL ${CHECKOUT_APP_URL:-http://localhost:8001}
ENV REACT_APP_SALEOR_API_URL ${SALEOR_API_URL}
ENV REACT_APP_CHECKOUT_APP_URL ${CHECKOUT_APP_URL}
ENV NEXT_PUBLIC_SALEOR_API_URL ${SALEOR_API_URL}
ENV SALEOR_APP_TOKEN ${SALEOR_APP_TOKEN}
ENV SETTINGS_ENCRYPTION_SECRET ${SETTINGS_ENCRYPTION_SECRET:-development-key}

RUN pnpm build
CMD cd apps/checkout-app && pnpm start -- --port 8001
