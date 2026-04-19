export function onRequest(context) {
    return new Response(JSON.stringify({
        success: true,
        message: "Cloudflare Functions are active!",
        timestamp: new Date().toISOString()
    }), {
        headers: { "Content-Type": "application/json" }
    });
}
