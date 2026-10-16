const CAMUNDA_MESSAGE_URL = "http://15.134.208.203:8080/engine-rest/message";

async function guiTinHieuHuy() {
    try {
        console.log("Đang gửi tín hiệu 'Khách hàng hủy đơn' lên Camunda...");
        const response = await fetch(CAMUNDA_MESSAGE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                "messageName": "Msg_KhachHangHuyDon", 
                "all": true, // <--- THÊM DÒNG NÀY ĐỂ HỦY TẤT CẢ CÁC ĐƠN ĐANG CHỜ
                "resultEnabled": true
            })
        });

        if (response.ok) {
            console.log("Khách hàng hủy đơn");
        } else {
            console.log("Có lỗi xảy ra:", await response.text());
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
    }
}

guiTinHieuHuy();