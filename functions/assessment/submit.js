export async function onRequestGet(context) {
    return new Response(JSON.stringify({ success: true, message: "Assessment submission endpoint is active." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { request } = context;
    
    try {
        const formData = await request.formData();
        const searchParams = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            searchParams.append(key, value);
        }
        
        // Forward the form data exactly as it was received to Zoho CRM
        // Web-to-Lead endpoint expects application/x-www-form-urlencoded
        const response = await fetch("https://crm.zoho.com/crm/WebToLeadForm", {
            method: "POST",
            body: searchParams,
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            const errorText = await response.text();
            console.error("Zoho CRM Error:", errorText);
            return new Response(JSON.stringify({ success: false, error: "CRM Submission Failed" }), {
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
