export async function onRequestGet(context) {
    return new Response(JSON.stringify({ success: true, message: "Contact submission endpoint is active." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const zapikey = env.ZOHO_CONTACT_ZAPIKEY;
    const CRM_ENDPOINT = `https://flow.zoho.com/862720724/flow/webhook/incoming?zapikey=${zapikey}`;

    try {
        const payload = await request.json();
        
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
            return new Response(JSON.stringify({ success: false, error: "CRM Submission Failed" }), {
                status: 502,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error) {
        console.error("Worker Contact Submission Error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
