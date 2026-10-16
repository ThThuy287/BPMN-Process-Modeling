# BPMN Modeling with Camunda 7

Repository lưu trữ các bài tập và đồ án môn Phân tích thiết kế quy trình nghiệp vụ doanh nghiệp (EC201), tập trung vào mô hình hóa quy trình nghiệp vụ bằng **BPMN 2.0** và thực hành triển khai tự động hóa với **Camunda 7**.

Đây là nơi tổng hợp các sản phẩm học tập, sơ đồ quy trình, tệp BPMN, mã nguồn.

---

## 1. Mục tiêu repository

* Lưu trữ có hệ thống các bài tập và đồ án BPMN trong môn EC201.
* Thực hành chuyển đổi mô tả nghiệp vụ thành sơ đồ quy trình có cấu trúc rõ ràng.
* Sử dụng các thành phần BPMN để biểu diễn hoạt động, sự kiện, điều kiện và luồng xử lý.
* Lưu lại sản phẩm và minh chứng để thuận tiện cho việc xem xét, học tập và tham khảo trong portfolio cá nhân của một Business Analyst.
---

## 2. Nội dung repository

### 2.1. EC201 – Bài tập BPMN

Tổng hợp các bài tập BPMN được thực hiện trong quá trình học môn EC201. Nội dung bao gồm:

* Đề bài và mô tả tình huống nghiệp vụ.
* Phân tích trình tự xử lý và các điều kiện nghiệp vụ.
* Sơ đồ BPMN được xây dựng cho từng bài tập.
* File BPMN gốc và các tệp minh họa liên quan.

### 2.2. Đồ án EC201: Startup "Chợ Nhà" - Dịch vụ Đi Chợ Hộ

Tổng hợp sản phẩm của đồ án cuối kỳ môn EC201. Đây là hệ thống quản trị vận hành đa kênh, số hóa quy trình từ lúc khách hàng đặt đơn đến khi giao nhận và xử lý sau bán. Nội dung bao gồm:

* **Bối cảnh và yêu cầu nghiệp vụ:** Khắc phục điểm nghẽn trong mua sắm thực phẩm online (thông tin mập mờ, kiểm soát chất lượng, đóng gói).
* **Phân tích quy trình:** 6 quy trình lõi (Tiếp nhận đơn, Nhặt hàng, Xử lý ngoại lệ, Thanh toán, Đổi trả, Khiếu nại).
* **Phạm vi cá nhân phụ trách:** **QT01 - Quy trình Tiếp nhận và Phân luồng đơn hàng**.
* **Tài nguyên đính kèm:** Sơ đồ `.bpmn`, biểu mẫu `.form` (Camunda Forms), mã nguồn Node.js (External Task Workers giả lập hệ thống tự động) và kịch bản API mô phỏng.
---

## 3. Kiến thức và kỹ thuật thực hành

### BPMN 2.0

Các thành phần được tìm hiểu và vận dụng linh hoạt tùy theo yêu cầu nghiệp vụ:

* **Events:** Sự kiện bắt đầu (Start Event), sự kiện trung gian (Timer/Message Boundary Event) và sự kiện kết thúc (End Event).
* **Activities:** Các công việc do con người thực hiện (User Task) hoặc hệ thống tự động xử lý (Service Task/External Task).
* **Gateways:** Các điểm rẽ nhánh logic (Exclusive/XOR Gateway) hoặc rẽ nhánh dựa trên sự kiện (Event-based Gateway).
* **Sequence Flows:** Trình tự luân chuyển công việc.
* **Pools và Lanes:** Phân chia trách nhiệm giữa Khách hàng, Hệ thống (BOT) và Nhân viên các phòng ban.

### Camunda 7 & Tự động hóa

* Sử dụng **Camunda Modeler** để thiết kế mô hình BPMN và Camunda Forms.
* Triển khai quy trình lên **Camunda 7 Engine** (REST API).
* Giám sát luồng công việc qua **Camunda Cockpit** và thao tác thủ công qua **Camunda Tasklist**.
* Xây dựng **Node.js Workers** (`camunda-external-task-client-js`) để "bắt" các Service Task.
---

## 4. Thông tin

* **Người thực hiện:** Thạch Thanh Thủy
* **Môn học:** Phân tích thiết kế quy trình nghiệp vụ doanh nghiệp (Mã MH: EC201)
* **Ký pháp mô hình hóa:** BPMN 2.0
* **Công nghệ & Công cụ:** Camunda 7 (Modeler, Cockpit, Tasklist), Node.js
* **Tên Repository:** `BPMN_Camunda7`
