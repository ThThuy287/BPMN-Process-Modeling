# Exercise 3.20 – Xử lý yêu cầu bồi thường bảo hiểm xe cơ giới

## 1. Đề bài 

**Exercise 3.20** Model the following business process. Use pools and lanes where needed.

The motor claim handling process starts when a customer submits a claim with the relevant documentation. The notification department at the car insurer checks the documents upon completeness and registers the claim. Next, the Handling department picks up the claim and checks the insurance. Then, an assessment is performed. If the assessment is positive, a garage is phoned to authorize the repairs and the payment is scheduled (in this order). Otherwise, the claim is rejected. In any case (whether the outcome is positive or negative), a letter is sent to the customer and the process is considered to be complete.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Tiếp nhận và xử lý yêu cầu bồi thường bảo hiểm xe cơ giới, xác minh bảo hiểm, đánh giá yêu cầu, quyết định chấp thuận hoặc từ chối và thông báo kết quả cho khách hàng.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
|---|---|
| Customer Pool | Khách hàng tương tác và giao tiếp với quy trình bảo hiểm. |
| Insurer Pool | Doanh nghiệp bảo hiểm chứa và thực hiện quy trình bồi thường. |
| Notification department Lane | Bộ phận chịu trách nhiệm kiểm tra hồ sơ và đăng ký yêu cầu. |
| Handling department Lane | Bộ phận tiếp nhận, kiểm tra bảo hiểm, đánh giá và quyết định yêu cầu. |
| Garage Pool | Đối tượng nhận thông báo ủy quyền sửa chữa từ phía doanh nghiệp bảo hiểm. |

### 2.3. Đầu vào và đầu ra

| Loại | Đối tượng |
|---|---|
| Đầu vào | Tài liệu yêu cầu bồi thường liên kết với bước kiểm tra tài liệu. |
| Đầu ra | Thư phê duyệt/Thông báo liên kết với bước gửi thư cho khách hàng. |

### 2.4. Các hoạt động chính

1. Sự kiện bắt đầu khi nhận được thông điệp yêu cầu bồi thường (Claim received) từ khách hàng.
2. Bộ phận Notification thực hiện kiểm tra tính đầy đủ của tài liệu (Check documents for completeness).
3. Đăng ký yêu cầu (Register claim).
4. Quy trình chuyển sang bộ phận Handling để tiếp nhận yêu cầu (Pick up claim).
5. Kiểm tra thông tin bảo hiểm (Check insurance).
6. Thực hiện đánh giá (Perform assessment).
7. Nếu đánh giá tích cực (Positive), gọi điện cho gara để ủy quyền sửa chữa (Phone garage to authorize repairs).
8. Sau khi ủy quyền, lên lịch thanh toán (Schedule payment).
9. Nếu đánh giá tiêu cực (Negative), thực hiện từ chối yêu cầu (Reject claim).
10. Luồng quy trình hội tụ để thực hiện gửi thư thông báo cho khách hàng (Send letter to customer).
11. Quy trình kết thúc tại sự kiện hoàn tất xử lý (Claim handled).

### 2.5. Định hướng mô hình hóa BPMN

- Sử dụng ba Pool riêng biệt đại diện cho "Insurer", "Customer" và "Garage".
- Bên trong Pool "Insurer", sử dụng hai Lane để phân tách công việc: "Notification department" và "Handling department".
- Sử dụng đối tượng dữ liệu (Data Object) để mô tả hồ sơ đầu vào (Claim Documentation) và đầu ra (Approval Letter).
- Sử dụng cổng rẽ nhánh loại trừ sau bước "Perform assessment" để chia luồng "Positive" và "Negative".
- Nhánh "Positive" gồm hai hoạt động tuần tự (gọi gara ủy quyền sửa chữa, sau đó lên lịch thanh toán), trong khi nhánh "Negative" chỉ gồm hoạt động từ chối yêu cầu.
- Sử dụng một Exclusive Gateway thứ hai để hội tụ nhánh tích cực và tiêu cực trước khi tới hoạt động gửi thư.
- Sử dụng luồng thông điệp để minh họa tương tác xuyên Pool: Từ Customer đến sự kiện Bắt đầu, từ hoạt động gửi thư đến Customer, và từ hoạt động gọi điện cấp phép đến Garage.

## 3. Ảnh sơ đồ
<img width="5160" height="2460" alt="Bai3 20_T139" src="https://github.com/user-attachments/assets/d2da45d9-6113-4abc-a235-4172ab16716f" />
