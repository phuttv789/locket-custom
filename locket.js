/*
 * Locket Custom 45s - Remote Config Bypass
 */
let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // Ép thời lượng tối đa thành 45 giây (45)
    if (obj && obj.parameters) {
        for (let key in obj.parameters) {
            let k = key.toLowerCase();
            if (k.includes('duration') || k.includes('video') || k.includes('limit') || k.includes('size')) {
                if (obj.parameters[key].defaultValue) {
                    obj.parameters[key].defaultValue.value = "45"; 
                }
            }
        }
    }
    
    if (obj && obj.config) {
        obj.config.max_video_duration = 45;
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("Locket 45s Error: " + e);
}

$done({ body });
