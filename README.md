# paidar.ai

Cloudflare Pages site with Pages Functions integrations.

## Local Development

Install dependencies from the repo root:

```sh
npm install
```

Create local Cloudflare secrets in `.dev.vars`:

```sh
SHOPIFY_WEBHOOK_SECRET=replace_with_shopify_webhook_secret
TRANSISTOR_API_KEY=replace_with_transistor_api_key
TRANSISTOR_SHOW_ID=replace_with_transistor_show_id
```

Run the Pages dev server:

```sh
npm run dev
```

## Shopify Order-Paid Webhook

Endpoint:

```text
POST /api/shopify/order-paid
```

The Cloudflare Function reads the raw request body with `request.arrayBuffer()`, verifies the `X-Shopify-Hmac-Sha256` header using `SHOPIFY_WEBHOOK_SECRET`, and only parses the Shopify order JSON after HMAC verification succeeds.

Audiobook fulfillment is triggered only when an order line item has one of these SKUs:

- `AAT-AUDIOBOOK`
- `AAT-BUNDLE`

If no audiobook SKU is present, the endpoint returns:

```json
{ "message": "No audiobook fulfillment needed" }
```

Matching audiobook orders create a Transistor.fm private podcast subscriber:

```text
POST https://api.transistor.fm/v1/subscribers
```

Required Cloudflare environment variables:

- `SHOPIFY_WEBHOOK_SECRET`
- `TRANSISTOR_API_KEY`
- `TRANSISTOR_SHOW_ID`

Set production secrets in Cloudflare Pages:

1. Open the Cloudflare dashboard.
2. Go to **Workers & Pages > paidar-ai > Settings > Environment variables**.
3. Add the required variables as encrypted values.

In Shopify Admin:

1. Go to **Settings > Notifications > Webhooks**.
2. Create an **Order payment** / **Order paid** webhook.
3. Set the format to **JSON**.
4. Set the URL to:

```text
https://your-domain.example/api/shopify/order-paid
```

## Health Check

Endpoint:

```text
GET /health
```
