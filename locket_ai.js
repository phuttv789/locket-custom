/*
 * Locket AI Unlocker Script
 */
let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    if (obj) {
        if (obj.data) {
            if (typeof obj.data === 'object') {
                obj.data.is_ai_enabled = true;
                obj.data.unlocked = true;
                obj.data.access_level = "premium";
            }
        }
        obj.success = true;
        obj.status = "active";
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("Locket AI Error: " + e);
}

$done({ body });
