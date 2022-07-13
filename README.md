# saleor-checkout

Extensible, checkout and payment integrations powered by Saleor API.

## Setup

This monorepo uses [PNPM](https://pnpm.io/) as a package manager and [Turborepo](https://turborepo.org/) for building packages.

### Monorepo structure

Here's the list of each app and shared package in the monorepo (click to see a README of that project)

#### Apps

- [`apps/checkout`](apps/checkout/README.md): an SPA React 18 checkout app, ready to be extended/modified
- [`apps/checkout-app`](apps/checkout-app/README.md): an Next.js Saleor app with dashboard for managing settings and theme, backend for checkout SPA, ready to be extended/modified

#### Packages

- `packages/ui-kit`: UI kit for checkout and [React Storefront](https://github.com/saleor/react-storefront)
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
pnpm run build:checkout
```

In this example, we'll only build `apps/checkout`

### Develop

Create a tunnel for `checkout-app`:

```bash
cd apps/checkout-app && npx saleor app tunnel 3000
```

> Note: the process needs to be running in the background

Before you start the server, you need to change default environment variables. Create `.env.local` file in each app:

- [`apps/checkout-app`](./apps/checkout-app/README.md#env-variables)
- [`apps/checkout`](./apps/checkout/README.md#local-development)

To run the development server for all the apps, use the following command:

```
pnpm run dev
```

You can also run only a specific app by running this command:

```bash
cd apps/checkout && pnpm dev
```

## Deployment

### GraphQL Schema

To generate GraphQL code based on latest schema from Saleor instance defined in `SALEOR_API_URL` env variable run this command:

```
pnpm run generate
```

You need to run this command after each change in `*.graphql` files

### Env variables

Change environment variables inside `.env` file:

- `SALEOR_API_URL` — GraphQL endpoint of your Saleor

  Example:

  ```
  https://my-env.eu.saleor.cloud/graphql/
  ```

  > To run sandbox Saleor environment in [Saleor Cloud](https://cloud.saleor.io/) use this command:
  >
  > ```bash
  > npx saleor project create && npx saleor environment create
  > ```
  >
  > You can also run Saleor locally. See [Saleor docs](https://docs.saleor.io/docs/3.x/developer/installation) for more instructions

- `CHECKOUT_APP_URL` — URL of deployed Checkout App

  Example:

  ```
  https://saleor-checkout-app.vercel.app
  ```

  > See [guide below](#checkout-app) on how to deploy the Checkout App

There are more environment variables available in each app. Go to their README's to learn more

### Vercel

The repo needs to be hosted on GitHub or some other git repository. Before you start, fork the repo to your account or organization.

- Authenticate the Turborepo CLI with your Vercel account

```
pnpm dlx turbo login
```

- Link the repo to a Vercel scope to enable the Remote Caching feature

```
pnpm dlx turbo link
```

> Remote Caching drastically reduces build times if you work in a team. Learn more about it at [Turborepo documentation](https://turborepo.org/docs/core-concepts/remote-caching) and [Vercel documentation](https://vercel.com/docs/concepts/monorepos/remote-caching)

#### Checkout App

1. Start [creating new project](https://vercel.com/docs/concepts/projects/overview#creating-a-project) on Vercel and select your forked GitHub repo

> Note: Vercel now doesn't support importing the entire monorepo, you will need to set up a project yourself for each app inside `/apps` folder

![Create project on Vercel by selecting your cloned GitHub repository in the menu](./docs/screenshots/screenshots/setup-vercel-1.png)

2. From the configuration page:

- Provide your project name (for example `saleor-checkout-app`)
- Select framework to Next.js
- Choose the root directory to be `apps/checkout-app`
- Override the build command to:

```bash
cd ../.. && pnpm run build:checkout-app
```

- Add environment variables:
  - `SETTINGS_ENCRYPTION_SECRET` — Random string used for encrypting apps configuration (you can generate it using `openssl rand -hex 256`)
  - _Optional_: `NEXT_PUBLIC_SALEOR_API_URL` — if you want to override the value of `SALEOR_API_URL` stored inside `.env` file in the root of the repository

Here's the final result on configuration page:

![Vercel "Configure project" page with all settings filled out](./docs/screenshots/screenshots/setup-vercel-2.png)

Click deploy and wait until the app is deployed

3. Update environment variables in repository

Update `CHECKOUT_APP_URL` in `.env` file located at the root of monorepo to be your deployment URL

Example:

```
https://saleor-checkout-app.vercel.app
```

4. Install the app in Saleor

Grab the deployed app URL from Vercel and add `/api/manifest`. This URL points to the manifest file that is required for installing the app in Saleor

> Example manifest URL:
>
> ```
> https://saleor-checkout-xyz-myusername.vercel.app/api/manifest
> ```

You can install the app by using:

- [Saleor Dashboard](https://github.com/saleor/saleor-dashboard)

```
http://<YOUR_SALEOR_URL>/dashboard/apps/install?manifestUrl=<YOUR_MANIFEST_URL>
```

- [Saleor CLI](https://github.com/saleor/saleor-cli)

```
saleor app install
```

- [Saleor Core manage.py script](https://docs.saleor.io/docs/3.x/developer/extending/apps/installing-apps#installing-third-party-apps)
- [Saleor GraphQL API](https://docs.saleor.io/docs/3.x/developer/extending/apps/installing-apps#installation-using-graphql-api)

> **PROTIP 💡**: If you want your app to automatically update whenever you push changes to the `main` branch, make sure to use **production** domain from Vercel (not deployment domain) for your manifest URL.
>
> ❌ Deployment domain (won't update app after push):
>
> ```
> https://saleor-checkout-app-jluy793b2-myusername.vercel.app/api/manifest
> ```
>
> ✅ Production domain:
>
> ```
> https://saleor-checkout-app.vercel.app/api/manifest
> ```
>
> To see which domain is used for production go to [Vercel Dashboard](https://vercel.com) > Settings > Domains:
> ![Vercel dashboard settings page that shows which domain is connected to production deployment](./docs/screenshots/screenshots/setup-vercel-domain.png)

5. Generate app token

After the app was installed, generate it's `authToken`

- [Saleor CLI](https://github.com/saleor/saleor-cli)

```
saleor app token
```

- [Saleor GraphQL API](https://docs.saleor.io/docs/3.x/developer/api-reference/mutations/app-token-create)

```graphql
mutation {
  appTokenCreate(input: { name: "Vercel", app: "<MY_APP_ID>" }) {
    authToken
  }
}
```

Where `<MY_APP_ID>` is the app `id`. You can retrieve the `id` by using this GraphQL query:

```graphql
query {
  apps(first: 10) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

outputs this:

```jsonc
{
  "data": {
    "apps": {
      "edges": [
        {
          "node": {
            "id": "QXBwOjQ=", // <- this is the app id
            "name": "Checkout"
          }
        }
      ]
    }
  }
}
```

6. Update environment variables in Vercel

You have to add additional environment variables for Checkout App in Vercel:

- `SALEOR_APP_TOKEN` — Token you've just generated

> 🚨 These values are secrets — don't store them inside your git repository

Make sure that you also have "Automatically expose System Environment Variables" selected

Here's how the configuration should look like in the end:
![Vercel env variable final configuration](./docs/screenshots/setup-vercel-3.png)

After you're done, re-deploy the app

> ⚠️ Make sure that you **didn't** select the "Redeploy with existing Build Cache." option

7. 🥳 Congrats! Payment app is now ready to be used!

#### Checkout SPA

1. Start by creating another project on Vercel, just like we did in [Checkout App setup](#checkout-app), select the same repository

2. On the configuration page:

- Provide your project name (for example `saleor-checkout`)
- Select framework to Create React App
- Choose the root directory to be `apps/checkout`
- Override the build command to:

```bash
cd ../.. && pnpm run build:checkout
```

- _Optional_: customise [environment variables](./apps/checkout/README.md#env-variables):
  - `REACT_APP_CHECKOUT_APP_URL` — URL of the deployed [Checkout App](#checkout-app).
  - `REACT_APP_SALEOR_API_URL` — URL of Saleor GraphQL API endpoint

> By default, those environment variables are taken from [`.env`](./.env) file in root of the monorepo. You don't need to provide env variables in Vercel if you want to use the values from `.env` file.

Here's the final result on configuration page:

![Vercel "Configure project" page with all settings filled out for Checkout frontend deployment](./docs/screenshots/setup-vercel-4.png)

Click deploy and wait until the app is deployed

## Payment gateways configuration

Checkout app supports two payment gateways that you can configure:

<a href="https://www.mollie.com/en">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./docs/logos/mollie_light.svg">
    <source media="(prefers-color-scheme: light)" srcset="./docs/logos/mollie_dark.svg">
    <img alt="Mollie" src="./docs/logos/mollie_dark.svg">
  </picture>
</a>

<br>

[![Adyen](./docs/logos/adyen.svg)](https://www.adyen.com/)

Payment gateways can be configured in the Checkout app inside Saleor dashboard.
Go to **Apps > Third party apps > Checkout**.

You can toggle, which payment gateway handles each different payment options per channel:

![Configuration options: Credit Card, Apple Pay, PayPal that are available in checkout app dashboard](./docs/screenshots/config-dashboard-1.png)

To use payment gateway, you need to provide its credentials. You can do that by clicking settings icon in channel configuration page

![Payment gateway configuration in Saleor dashboard](./docs/screenshots/config-dashboard-2.png)

### Mollie

Read setup guide in [docs/mollie.md](./docs/mollie.md)

### Adyen

Read setup guide in [docs/adyen.md](./docs/adyen.md)
