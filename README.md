# saleor-checkout

Extensible, powerful checkout powered by Saleor API. WooHOO

## Setup

This monorepo uses [PNPM](https://pnpm.io/) as a package manager.

### Monorepo structure

- [`apps/checkout`](apps/checkout/README.md): a SPA React 18 checkout app, ready to be extended/modified
- [`apps/checkout-app`](apps/checkout-app/README.md): a Next.js checkout dashboard + payments app, ready to be extended/modified
- `packages/ui-kit`: UI kit for checkout and [React Storefront](https://github.com/saleor/react-storefront)
- `packages/config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- [`packages/tsconfig`](packages/tsconfig/README.md): `tsconfig.json`s used throughout the monorepo

### Install

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

### Keep the project up to date

It is important to maintain this repo and keep it update with upstream - saleor checkout open source repo. The guide to achieve this would be the following:

- git remote add upstream [clone ssh of original saleor checkout upstream repo]
- git fetch upstream (To check that you successfully added the upstream - branches from their repo should be displayed)
- git merge upstream/main - This will sync this repo with the main repo. Be careful of merge conflicts and choose wisely what to accept. It is good practice, from this step onwards, to proceed on a seperate branch and double check that the result is what we intend, then merge that to main.
- After updating, run the following commands again: pnpm i, pnpm run build

### Environment variables

Environment variables are found in 1password, At this moment, we have 2 interesting branches:

- Branch wip - Payments are fully paid in 2 quick successions, environment variables are found in one password and should be in monorepo .env file for the project to successfully work the way it was mentioned locally.
- Branch update-fork-upstream - current branch that is being in progress and environment variables differ from branch wip. This should be also found in one password and follow the same procedure as branch wip. This branch does the payment in first trial.

## To Fully understand the project

It is always a good idea to have look at the full architecture that we have in miro, and the sequence diagram found in confluence - checkout section as they both help to explain thoroughly the structure of this repo and its purpose.
