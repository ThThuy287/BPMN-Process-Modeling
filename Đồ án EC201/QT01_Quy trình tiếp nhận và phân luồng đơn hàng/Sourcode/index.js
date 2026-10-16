const { Client, Variables } = require("camunda-external-task-client-js");

// Cấu hình URL Camunda (thay đổi nếu bạn chạy server khác)
const CAMUNDA_URL = "http://15.134.208.203:8080/engine-rest";
const client = new Client({ baseUrl: CAMUNDA_URL, interval: 2000 });

console.log("Hệ thống Tiếp nhận Đơn hàng QT01 đang chạy...");

// ============================================================
// BOT 1: Rà soát và kiểm tra tính hợp lệ
// ============================================================
client.subscribe("check-validity-task", async function ({ task, taskService }) {
  console.log("\nĐang rà soát tính hợp lệ của đơn hàng...");
  try {
    const maKH = task.variables.get("maKH") || "Khách Vãng Lai";
    const tongTien = task.variables.get("TT") || 0;
    
    console.log(`   - Mã KH: ${maKH} | Tổng tiền: ${tongTien} VNĐ`);
    
    if (tongTien > 10000000) {
      console.log("   => Cảnh báo: Đơn hàng có dấu hiệu đầu cơ (Trên 10 triệu VND)!");
    } else {
      console.log("   => Đơn hàng hợp lệ.");
    } // <-- Đã sửa lỗi thiếu dấu đóng ngoặc } ở đây

    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi [Bot 1]:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 2: Gửi phản hồi từ chối nhận đơn
// BPMN Task: Activity_0v2kd7w
// ============================================================
client.subscribe("send-rejection-task", async function ({ task, taskService }) {
  console.log("\nGửi phản hồi TỪ CHỐI đơn hàng...");
  try {
    const maKH = task.variables.get("maKH");
    console.log(`   - Đã gửi email/SMS từ chối đến khách hàng: ${maKH} do vi phạm chính sách.`);
    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 3: Kiểm tra khách hàng đã thanh toán chưa (Dùng chung cho cả 2 luồng)
// BPMN Task: Activity_0b298fj & Activity_0b5dhce
// ============================================================
client.subscribe("check-payment-task", async function ({ task, taskService }) {
  console.log("\nKiểm tra trạng thái thanh toán...");
  try {
    // Trạng thái này lấy từ Form: "value" = Đã thanh toán, "value2" = Chưa thanh toán
    const trangThai = task.variables.get("TrangThaiThanhToan");
    
    if (trangThai === "value") {
      console.log("   => Khách hàng ĐÃ thanh toán.");
    } else {
      console.log("   => Khách hàng CHƯA thanh toán.");
    }

    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 4: Hoàn tiền theo đúng quy định (Dùng chung cho cả 2 luồng)
// BPMN Task: Activity_0ncull3 & Activity_0dfhmzr
// ============================================================
client.subscribe("refund-task", async function ({ task, taskService }) {
  console.log("\nThực hiện HOÀN TIỀN cho khách...");
  try {
    const tongTien = task.variables.get("TT") || 0;
    console.log(`   - Đang làm lệnh hoàn số tiền ${tongTien} VNĐ về tài khoản khách hàng.`);
    console.log("   - Hoàn tiền thành công!");
    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 5: Ghi nhận "Hủy đơn hàng" khi nhận tín hiệu từ khách
// BPMN Task: Activity_1ei6o7d
// ============================================================
client.subscribe("cancel-order-task", async function ({ task, taskService }) {
  try {
    const maKH = task.variables.get("maKH") || "Khách hàng";
    
    console.log("\nĐÃ NHẬN ĐƯỢC THÔNG BÁO HỦY TỪ KHÁCH HÀNG!");
    console.log(`Khách hàng [${maKH}] đã đã hủy đơn hàng`);

    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 6: Cập nhật trạng thái "Đã xác nhận" sau khi hết thời gian chờ
// BPMN Task: Activity_1sw1diq
// ============================================================
client.subscribe("update-status-confirmed-task", async function ({ task, taskService }) {
  try {
    const maKH = task.variables.get("maKH") || "Khách hàng";
    
    console.log("\nĐÃ HẾT 15 GIÂY CHỜ ĐỢI!");
    console.log(`Gửi mail/SMS XÁC NHẬN đơn hàng.`);

    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});

// ============================================================
// BOT 7: Gửi Email xác nhận đơn hàng
// BPMN Task: Activity_0f4rz8y
// ============================================================
client.subscribe("send-confirmation-email-task", async function ({ task, taskService }) {
  console.log("\nGửi Email xác nhận đơn hàng...");
  try {
    const tongTien = task.variables.get("TT") || 0;
    console.log(`   - Đã gửi email/SMS thông báo xác nhận đơn trị giá ${tongTien} VNĐ cho khách hàng.`);
    await taskService.complete(task);
  } catch (err) {
    console.error("Lỗi:", err.message);
    await taskService.handleFailure(task, { errorMessage: err.message, retries: 0 });
  }
});