# Mollie setup guide

In this guide we'll setup [Mollie](https://www.mollie.com/en) payment gateway with Saleor Checkout.

1. [Sign up for Mollie account](https://www.mollie.com/dashboard/signup?lang=en)

2. Make sure you've enabled at least 1 payment provider in Mollie dashboard (Settings > Website profiles > Payment methods):

![Getting to payment providers settings in Mollie dashboard](./screenshots/setup-mollie-1.png)
![At least one payment method is enabled on Payment methods page](./screenshots/setup-mollie-2.png)

> Note: Don't worry about "You need to complete the boarding before this payment method can be activated." message if you only want to test. Enabled payment methods will still work in test mode, even without completing verification of your Mollie account

3. In your Mollie dashboard, select: Developers > API keys and copy **API key** and **Profile ID**

- **Live API key** - for production environment
- **Test API key** - for development environment

4. In Checkout app configuration, enter the data you've just copied

![Mollie config inside Saleor dashboard after env variable and profile id were pasted](./screenshots/config-dashboard-mollie.png)

5. Enable `Payment methods` in your Mollie dashboard, select: Settings -> Website Profiles -> Payment methods
