const AUDIOBOOK_SKUS = new Set(["AAT-AUDIOBOOK", "AAT-AUDIO", "AAT-BUNDLE"]);
const TRANSISTOR_SUBSCRIBERS_URL = "https://api.transistor.fm/v1/subscribers";

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}

function base64ToBytes(value) {
    try {
        const binary = atob(value);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
        }

        return bytes;
    } catch {
        return null;
    }
}

function timingSafeEqual(left, right) {
    if (!left || !right || left.length !== right.length) {
        return false;
    }

    let difference = 0;
    for (let i = 0; i < left.length; i += 1) {
        difference |= left[i] ^ right[i];
    }

    return difference === 0;
}

async function verifyShopifyHmac(rawBody, hmacHeader, secret) {
    if (!hmacHeader || !secret) {
        return false;
    }

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, rawBody));
    const receivedSignature = base64ToBytes(hmacHeader);

    return timingSafeEqual(signature, receivedSignature);
}

function hasAudiobookSku(order) {
    return (order.line_items || []).some((item) => AUDIOBOOK_SKUS.has(item.sku));
}

async function createTransistorSubscriber(env, customerEmail) {
    const response = await fetch(TRANSISTOR_SUBSCRIBERS_URL, {
        method: "POST",
        headers: {
            "x-api-key": env.TRANSISTOR_API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            show_id: env.TRANSISTOR_SHOW_ID,
            email: customerEmail,
            skip_welcome_email: false
        })
    });

    if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Transistor API returned ${response.status}: ${responseText}`);
    }

    return response.json();
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const rawBody = await request.arrayBuffer();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
    const isVerified = await verifyShopifyHmac(rawBody, hmacHeader, env.SHOPIFY_WEBHOOK_SECRET);

    if (!isVerified) {
        console.warn("Rejected Shopify order-paid webhook with invalid HMAC.");
        return jsonResponse({ error: "Invalid Shopify HMAC" }, 401);
    }

    let order;
    try {
        order = JSON.parse(new TextDecoder().decode(rawBody));
    } catch (error) {
        console.error("Verified Shopify webhook contained invalid JSON.", error);
        return jsonResponse({ error: "Invalid JSON payload" }, 400);
    }

    console.log("Shopify line items:", order.line_items?.map((item) => ({
        title: item.title,
        variant_title: item.variant_title,
        sku: item.sku,
        product_id: item.product_id,
        variant_id: item.variant_id
    })));

    if (!hasAudiobookSku(order)) {
        console.log("Shopify order paid webhook received with no audiobook SKU.", {
            orderId: order.id,
            orderName: order.name
        });
        return jsonResponse({ message: "No audiobook fulfillment needed" });
    }

    const customerEmail = order.email || order.customer?.email;
    if (!customerEmail) {
        console.error("Audiobook order paid webhook is missing customer email.", {
            orderId: order.id,
            orderName: order.name
        });
        return jsonResponse({ error: "No customer email found" }, 400);
    }

    try {
        const subscriber = await createTransistorSubscriber(env, customerEmail);
        console.log("Provisioned Transistor private podcast subscriber.", {
            orderId: order.id,
            orderName: order.name,
            customerEmail,
            subscriberId: subscriber?.data?.id
        });

        return jsonResponse({ success: true });
    } catch (error) {
        console.error("Failed to provision Transistor subscriber.", {
            orderId: order.id,
            orderName: order.name,
            customerEmail,
            error: error.message
        });

        return jsonResponse({ error: "Transistor provisioning failed" }, 500);
    }
}
