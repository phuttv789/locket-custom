/********************************
 * Locket Gold & 60s Video Script
 ********************************/

let body = $response.body;
try {
    let obj = JSON.parse(body);

    // Mở rộng giới hạn thời gian quay video lên 60 giây (60000 ms hoặc tương đương tùy theo cấu trúc config)
    if (obj.remote_config) {
        // Ví dụ điều chỉnh biến thời lượng video trong Remote Config
        obj.remote_config.video_duration_limit = 60; 
    }
    
    // Nếu là dạng cấu hình features thông thường
    if (obj.data && obj.data.values) {
        // Tùy chỉnh các thông số tính năng nếu có
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log("Lỗi chỉnh sửa Locket Script: " + e);
}

$done({ body });
