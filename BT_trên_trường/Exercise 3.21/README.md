# Exercise 3.21 – Đánh giá yêu cầu bồi thường bảo hiểm

## 1. Đề bài

**Exercise 3.21** Model the following business process. Use pools and lanes where needed.

When a claim is received, a claims officer first checks if the claimant is insured. If not, the claimant is informed that the claim must be rejected by sending an automatic notification via an SAP system. Otherwise, a senior claims officer evaluates the severity of the claim. Based on the outcome (simple or complex claims), the relevant forms are sent to the claimant, again using the SAP system. Once the forms are returned, they are checked for completeness by the claims officer. If the forms provide all relevant details, the claim is registered in the claims management system, and the process ends. Otherwise, the claimant is informed to update the forms via the SAP system. Upon reception of the updated forms, they are checked again by the claims officer to see if the details have been provided.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Xác minh tư cách bảo hiểm của người yêu cầu, phân loại mức độ phức tạp của yêu cầu, thu thập thông tin đầy đủ và đăng ký yêu cầu hợp lệ vào hệ thống quản lý khiếu nại.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
|---|---|
| Claimant Pool | Người yêu cầu, tương tác với quy trình thông qua các luồng thông điệp. |
| Insurance Company Pool | Tổ chức bảo hiểm, chứa toàn bộ luồng xử lý chính của quy trình khiếu nại. |
| Claims officer Lane | Làn chứa các tác vụ nhận/kiểm tra biểu mẫu, đăng ký yêu cầu, và gửi thông báo từ chối/cập nhật biểu mẫu. |
| Senior claims officer Lane | Làn chứa tác vụ đánh giá mức độ nghiêm trọng của yêu cầu và gửi biểu mẫu liên quan. |

### 2.3. Đầu vào và đầu ra

Sơ đồ không khai báo tường minh các đối tượng dữ liệu (Data Object), mà luồng thông tin được thể hiện trực tiếp qua 5 luồng thông điệp (Message Flow):

| Loại | Đối tượng |
|---|---|
| Đầu vào | Thông điệp bắt đầu yêu cầu từ Claimant. |
| Đầu vào | Biểu mẫu được gửi lại từ Claimant. |
| Đầu ra | Thông báo tự động từ chối gửi đến Claimant. |
| Đầu ra | Biểu mẫu liên quan gửi đến Claimant. |
| Đầu ra | Yêu cầu cập nhật biểu mẫu gửi đến Claimant. |

### 2.4. Quy tắc nghiệp vụ

| Mã | Quy tắc |
|---|---|
| BR-01 | Quy trình thực hiện rẽ nhánh ngay sau tác vụ đầu tiên để kiểm tra tình trạng bảo hiểm. |
| BR-02 | Nếu thuộc nhánh "Not insured", gửi thông báo tự động từ chối yêu cầu và kết thúc quy trình. |
| BR-03 | Nếu thuộc nhánh "Otherwise" (Được bảo hiểm), nhân viên cấp cao sẽ đánh giá mức độ nghiêm trọng. |
| BR-04 | Dựa trên đánh giá, hệ thống tiến hành gửi biểu mẫu liên quan cho người yêu cầu. |
| BR-05 | Khi nhận được biểu mẫu phản hồi, tiến hành kiểm tra tính đầy đủ. |
| BR-06 | Nếu nhánh "All relevant details provided" được thỏa mãn, thực hiện đăng ký yêu cầu và kết thúc quy trình. |
| BR-07 | Nếu rơi vào nhánh "Otherwise", thông báo cho người yêu cầu cập nhật biểu mẫu, tạo thành một vòng lặp quay lại bước tiếp nhận. |

### 2.5. Phân tích luồng điều khiển

1. Quy trình bắt đầu tại sự kiện Message Start Event khi nhận được thông điệp yêu cầu từ Claimant.
2. Tại lane "Claims officer", hệ thống thực hiện tác vụ đầu tiên ("Senior claims officer") để kiểm tra đầu vào.
3. Luồng đi tới Exclusive Gateway thứ nhất:
    - Nhánh "Not insured": Thực hiện tác vụ gửi thông báo tự động từ chối và đi tới sự kiện kết thúc.
    - Nhánh "Otherwise": Luồng điều khiển chuyển xuống lane "Senior claims officer".
4. Nhân viên cấp cao thực hiện tác vụ đánh giá mức độ nghiêm trọng của khiếu nại.
5. Thực hiện gửi biểu mẫu liên quan cho Claimant.
6. Luồng điều khiển đi qua một Exclusive Gateway có vai trò hội tụ.
7. Tại lane "Claims officer", thực hiện tác vụ nhận lại biểu mẫu.
8. Thực hiện tác vụ kiểm tra tính đầy đủ của biểu mẫu.
9. Luồng đi tới Exclusive Gateway thứ hai để kiểm tra kết quả:
    - Nhánh "All relevant details provided": Tiến hành đăng ký yêu cầu và tới sự kiện kết thúc.
    - Nhánh "Otherwise": Thực hiện tác vụ thông báo cập nhật biểu mẫu. Luồng sau đó quay ngược lại Exclusive Gateway hội tụ ở bước 6 để chờ nhận lại biểu mẫu.

### 2.6. Định hướng mô hình hóa BPMN

- Sử dụng hai Pool chính là "Insurance Company" (chứa các lane xử lý) và "Claimant" (thể hiện như một hộp đen).
- Phân chia trách nhiệm nội bộ trong "Insurance Company" bằng hai Lane: "Claims officer" và "Senior claims officer".
- Sự giao tiếp giữa công ty bảo hiểm và khách hàng được định nghĩa bằng 5 luồng thông điệp (Message Flow) cắt ngang các Pool.
- Sử dụng 3 cổng rẽ nhánh Exclusive Gateway: hai cổng để phân nhánh logic xử lý (bảo hiểm và tính đầy đủ hồ sơ) và một cổng để hội tụ vòng lặp tiếp nhận hồ sơ.
- Cấu hình các tác vụ gửi thông tin ra ngoài (từ chối, gửi biểu mẫu, thông báo cập nhật) dưới dạng Send Task.
- Cấu hình bước tiếp nhận biểu mẫu bổ sung từ khách hàng dưới dạng Receive Task.

## 3. Ảnh sơ đồ
<img width="5820" height="1830" alt="Bai3 21_T140" src="https://github.com/user-attachments/assets/d0c6e7ac-9e25-4910-856c-96fcbabaa974" />
---

# Exercise 3.23 – Quy trình cấp phát thuốc theo đơn

## 1. Đề bài

**Exercise 3.23**

1. Model the prescription fulfillment process described in Exercise 1.6 (page 30). Use sub-processes where required, and nest them appropriately.
2. Is there any sub-process that can potentially be shared with other business processes of the same pharmacy, or of other pharmacies, e.g. as part of a consortium?

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu

Mô hình hóa quy trình thực hiện đơn thuốc bằng BPMN, phân rã quy trình thành các subprocess phù hợp và xác định những subprocess có khả năng tái sử dụng.

### 2.2. Thông tin cần xác định từ đề gốc

Đề bài tham chiếu Exercise 1.6 ở trang 30 nhưng chưa bao gồm mô tả chi tiết quy trình. Cần bổ sung nội dung đề gốc trước khi hoàn thiện phân tích.
Các thông tin cần làm rõ gồm:
- Cách tiếp nhận đơn thuốc.
- Các bước xác minh đơn thuốc.
- Các tác nhân tham gia.
- Quy trình chuẩn bị và cấp phát thuốc.
- Các hoạt động kiểm tra hàng tồn kho hoặc thanh toán, nếu có.
- Những trường hợp ngoại lệ.
- Điều kiện kết thúc quy trình.

### 2.3. Phân rã quy trình

Sau khi có đầy đủ đề bài, cần xác định những nhóm hoạt động đủ phức tạp hoặc có ý nghĩa độc lập để đưa vào subprocess.
Các nhóm hoạt động như tiếp nhận đơn thuốc, xác minh thông tin, chuẩn bị thuốc và cấp phát thuốc chỉ là những khả năng cần xem xét, chưa phải cấu trúc đã được xác nhận từ đề gốc.
Repository phục vụ mục đích học tập và xây dựng hồ sơ năng lực về Business Process Modeling và Business Analysis. Các giả định trong quá trình mô hình hóa cần được ghi rõ, tách biệt với yêu cầu được nêu trực tiếp trong đề bài.

## 3. Ảnh sơ đồ
<img width="12900" height="3480" alt="TBai3 23_T58" src="https://github.com/user-attachments/assets/8bb1d406-595a-40fd-979c-e1e9069710f0" />

<img width="4041" height="1197" alt="TBai3 23_T58_DUR" src="https://github.com/user-attachments/assets/92986f0c-d34b-46c9-a511-5732c733b19f" />

<img width="3831" height="1260" alt="TBai3 23_T58_BH" src="https://github.com/user-attachments/assets/08f02f68-a3a3-4b9d-a7ff-472378e98117" />


