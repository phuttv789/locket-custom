/*
 * Locket Custom 60s - Fix Upload Payload & Remote Config
 */
let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // Nâng giới hạn thời lượng và cấu hình phân giải/dung lượng cho phép từ Remote Config
    if (obj && obj.parameters) {
        for (let key in obj.parameters) {
            let k = key.toLowerCase();
            if (k.includes('duration') || k.includes('video') || k.includes('limit') || k.includes('size')) {
                if (obj.parameters[key].defaultValue) {
                    obj.parameters[key].defaultValue.value = "60"; // Ép thời gian tối đa
                }
            }
        }
    }
    
    // Bổ sung tùy chỉnh cấu hình nếu app check qua các trường giá trị JSON khác
    if (obj && obj.config) {
        obj.config.max_video_duration = 60;
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("Locket 60s Error: " + e);
}

$done({ body });
