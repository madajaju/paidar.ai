export async function onRequestGet(context) {
    return new Response(JSON.stringify({ success: true, message: "Assessment submission endpoint is active." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const zapikey = env.ZOHO_ASSESSMENT_ZAPIKEY;

    if (!zapikey) {
        console.error("Critical Error: ZOHO_ASSESSMENT_ZAPIKEY is not defined in environment variables.");
    }

    const CRM_ENDPOINT = `https://flow.zoho.com/862720724/flow/webhook/incoming?zapikey=${zapikey || "MISSING"}&isdebug=false`;

    try {
        let payload;
        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            payload = await request.json();
        } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            payload = Object.fromEntries(formData.entries());
        } else {
            const text = await request.text();
            try {
                payload = JSON.parse(text);
            } catch (e) {
                payload = { rawBody: text };
            }
        }

        console.log("Submission received. Content-Type:", contentType);
        // console.log("Payload:", payload);
        
        const response = await fetch(CRM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            const errorText = await response.text();
            console.error("Zoho Flow Error:", errorText);
            return new Response(JSON.stringify({ success: false, error: "CRM Submission Failed", details: errorText }), {
                status: 502,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.error("Worker Submission Error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
