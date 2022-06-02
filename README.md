# saleor-checkout

Extensible, powerful checkout powered by Saleor API.

## Setup

This monorepo uses [PNPM](https://pnpm.io/) as a package manager and [Turborepo](https://turborepo.org/) for building packages. 

### Monorepo structure

Here's the list of each app and shared package in the monorepo (click to see a README of that project)

#### Apps

- `apps/checkout`: a SPA React 18 checkout app, ready to be extended/modified
- `apps/payments-app`: a Next.js checkout dashboard + payments app, ready to be extended/modified

#### Packages

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

You can also build a specific app or package by running this command:

```bash
pnpm dlx turbo run build --filter=checkout
# or
pnpm run build:checkout
```

In this example we'll only build `apps/checkout`

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

You can also run only a specific app by running this command:

```bash
pnpm dlx turbo run dev --filter=checkout
# or
cd apps/checkout && pnpm dev
```

## Deployment

### Vercel

The repo needs to be hosted on GitHub or some other git repository. Before you start, fork the repo to your account or organization.

1. Authenticate the Turborepo CLI with your Vercel account

```
pnpm dlx turbo login
```

2. Link the repo to a Vercel scope in order to enable the Remote Caching feature

```
pnpm dlx turbo link
```

> Remote Caching drastically reduces build times if you work in a team. Learn more about it at [Turborepo documentation](https://turborepo.org/docs/core-concepts/remote-caching) and [Vercel documentation](https://vercel.com/docs/concepts/monorepos/remote-caching)

#### Payments App

3. Start [creating new project](https://vercel.com/docs/concepts/projects/overview#creating-a-project) on Vercel and select your forked GitHub repo

> Note: Vercel currently doesn't support importing the entire monorepo, you will need to setup a project yourself for each app inside `/apps` folder

![Create project on Vercel by selecting your cloned GitHub repository in the menu](./docs/setup-vercel-1.png)

4. From the configuration page:
  - Provide your project name (for example `saleor-payments-app`)
  - Select framework to Next.js
  - Choose the root directory to be `apps/payments-app`

![Directory `apps/payments-app` chosen inside Vercel configuration modal](./docs/setup-vercel-3.png)

  - Change the build command to:

```bash
cd ../.. && pnpm run build:payments-app
```

Here's the final result on configuration page:

![Vercel "Configure project" page with all settings filled out](./docs/setup-vercel-2.png)


