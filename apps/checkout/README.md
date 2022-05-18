# Saleor Checkout

## Local development

First, setup necessary environment variables:

```
TSC_COMPILE_ON_ERROR=true
REACT_APP_CHECKOUT_APP_URL=https://your-checkout-app-url.app/api
REACT_APP_SALEOR_API_URL=https://your-saleor-instance.saleor.cloud/graphql/
```

Install packages:

```bash
pnpm i
```

And run the development server:

```bash
pnpm dev
```

You'll need checkout token in order to use the checkout. You can generate new checkout either in your storefront or graphql playground. You can use a preexisting checkout as well.

> ⚠️ Note that if a given checkout has customer already attached, it'll become private and **you won't be able to fetch its data from the api** without the same customer being logged in your current browser. Checkout uses [Saleor SDK](https://github.com/saleor/saleor-sdk) for authentication.

Open [localhost:8001?checkoutToken=yourToken](http://localhost:8001?checkoutToken=) with your browser and add the your token to the url.

##
