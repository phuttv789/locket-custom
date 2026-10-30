/*
 * Locket Custom 60s - Bypass Video Duration Limit
 * Trực tiếp chỉnh sửa cấu hình Remote Config của Firebase trả về cho Locket app
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // Kiểm tra và ép thông số giới hạn thời gian quay video lên 60 giây (hoặc cao hơn)
    if (obj && obj.parameters) {
        // Tùy chỉnh các key cấu hình thời lượng video thường gặp trong Locket Remote Config
        // Ví dụ: ép max duration hoặc giới hạn quay thành 60000ms (60 giây)
        for (let key in obj.parameters) {
            if (key.toLowerCase().includes('duration') || key.toLowerCase().includes('video') || key.toLowerCase().includes('limit')) {
                // Thay đổi giá trị thời lượng tối đa thành 60 giây nếu app kiểm tra qua remote config
                if (obj.parameters[key].defaultValue) {
                    obj.parameters[key].defaultValue.value = "60";
                }
            }
        }
    }
    
    // Một số cấu hình bổ sung để ép client gửi video dạng chunk hoặc bỏ qua kiểm tra dung lượng phía client
    // Trả về dữ liệu đã được bùa chú
    body = JSON.stringify(obj);
} catch (e) {
    // Nếu lỗi cú pháp JSON thì giữ nguyên body gốc để tránh crash app
    console.log("Locket 60s Script Error: " + e);
}

$done({ body });
