const paypal = require("@paypal/checkout-server-sdk");

function environment() {
  return new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET
  );
  // For live, use:
  // return new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
