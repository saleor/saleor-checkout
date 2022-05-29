FROM node:14
WORKDIR /checkout

RUN npm install -g pnpm@6.32.12

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/checkout/package.json ./apps/checkout/
COPY apps/checkout-app/package.json ./apps/checkout-app/
COPY apps/checkout-app/pnpm-lock.yaml ./apps/checkout-app/
COPY packages/config/package.json ./packages/config/
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY packages/tsconfig/ ./packages/tsconfig/

RUN pnpm install
COPY . .

ARG SALEOR_API_URL
ARG CHECKOUT_API_URL
ENV SALEOR_API_URL ${API_URI}
ENV CHECKOUT_API_URL ${CHECKOUT_API_URL}

ARG REACT_APP_CHECKOUT_APP_URL
ARG REACT_APP_SALEOR_API_URL
ENV REACT_APP_CHECKOUT_APP_URL ${REACT_APP_CHECKOUT_APP_URL}
ENV REACT_APP_SALEOR_API_URL ${REACT_APP_SALEOR_API_URL}

ARG VERCEL_URL
ARG NEXT_PUBLIC_VERCEL_URL
ARG NEXT_PUBLIC_SALEOR_API_URL
ARG SALEOR_APP_TOKEN
ARG SALEOR_APP_ID
ENV VERCEL_URL ${VERCEL_URL}
ENV NEXT_PUBLIC_VERCEL_URL ${NEXT_PUBLIC_VERCEL_URL}
ENV NEXT_PUBLIC_SALEOR_API_URL ${NEXT_PUBLIC_SALEOR_API_URL}
ENV SALEOR_APP_TOKEN ${SALEOR_APP_TOKEN}
ENV SALEOR_APP_ID ${SALEOR_APP_ID}

RUN pnpm build

CMD pnpm dev