# saleor-checkout

Extensible, powerful checkout powered by Saleor API.

## Setup

This monorepo uses [PNPM](https://pnpm.io/) as a package manager and [Turborepo](https://turborepo.org/) for building packages. 

### Monorepo structure

Here's the list of each app and shared package in the monorepo (click to see a README of that project)

- `apps/checkout`: a SPA React 18 checkout app, ready to be extended/modified
- `apps/payments-app`: a Next.js checkout dashboard + payments app, ready to be extended/modified
- `packages/ui-kit`: UI kit for checkout and (React Storefront)[https://github.com/saleor/react-storefront]
- `packages/config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

### Install dependencies
```
pnpm i
```

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```
