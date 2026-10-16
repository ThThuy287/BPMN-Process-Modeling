# Phân tích & Thiết kế Quy trình Nghiệp vụ cho Dịch vụ Đi Chợ Hộ

**Đồ án môn Phân tích thiết kế quy trình nghiệp vụ doanh nghiệp**

Đồ án tập trung phân tích, mô hình hóa và triển khai các quy trình nghiệp vụ lõi cho một startup cung cấp dịch vụ "đi chợ hộ" các mặt hàng nhu yếu phẩm và bách hóa tổng hợp dành cho người tiêu dùng thành thị. Dự án thể hiện khả năng chuyển đổi các "nút thắt" vận hành thực tế thành mô hình tự động hóa có thể thực thi được bằng chuẩn BPMN 2.0.

* **Môn học:** Phân tích thiết kế quy trình nghiệp vụ doanh nghiệp
* **Vai trò cá nhân:** Business Analyst (BA) & System Implementer
* **Công cụ thực hiện:** Camunda Modeler, Camunda 7 Engine, Node.js, REST API.

---

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Mục tiêu dự án](#2-mục-tiêu-dự-án)
3. [Danh sách quy trình toàn hệ thống](#3-danh-sách-quy-trình-toàn-hệ-thống)
4. [Phương pháp phân tích và mô hình hóa](#4-phương-pháp-phân-tích-và-mô-hình-hóa)
5. [Quy trình phụ trách: QT01 - Tiếp nhận và phân luồng đơn hàng](#5-quy-trình-phụ-trách-qt01---tiếp-nhận-và-phân-luồng-đơn-hàng)
6. [Kiểm thử](#6-kiểm-thử)
7. [Công cụ và tài nguyên](#7-công-cụ-và-tài-nguyên)
8. [Cấu trúc repository](#8-cấu-trúc-repository)

---

## 1. Tổng quan dự án

"Chợ Nhà" là một ý tưởng startup siêu thị đa kênh với mô hình "đi chợ hộ" B2C, phục vụ đối tượng cư dân đô thị bận rộn. Trong mô hình e-grocery, việc nhặt đúng hàng (đặc biệt là đồ tươi sống) và xử lý ngoại lệ đóng vai trò sống còn.

Dự án này không phát triển một ứng dụng bán hàng thông thường mà tập trung vào **Quản trị quy trình (BPM)** nội bộ: chuẩn hóa việc tiếp nhận, rà soát rủi ro, phân loại, nhặt hàng, đóng gói và xử lý sau bán. Quy trình được mô hình hóa bằng chuẩn **BPMN 2.0** và cấu hình chạy thực tế trên nền tảng **Camunda 7**, kết nối với các Node.js Workers để xử lý logic tự động.

## 2. Mục tiêu dự án

* **Chuẩn hóa luồng vận hành:** Khắc phục điểm nghẽn thực tế như thông tin đơn mập mờ, thiếu tiêu chuẩn đánh giá hàng tươi sống, và rủi ro trong đóng gói.
* **Mô hình hóa chuẩn quốc tế:** Ứng dụng ký pháp BPMN 2.0 để biểu diễn các điểm rẽ nhánh, cổng sự kiện và luồng thông tin giữa Khách hàng, Hệ thống và Nhân viên.
* **Tự động hóa tác vụ (BPMS):** Thay vì chỉ vẽ sơ đồ lý thuyết, đồ án thực thi quy trình trên Camunda 7, biến sơ đồ thành một cỗ máy luân chuyển công việc thực tế, ứng dụng Worker backend để tự động gửi email, kiểm tra tồn kho và hoàn tiền.
* **Kiểm chứng bằng dữ liệu:** Chạy thử nghiệm các ca ngoại lệ (khách hủy đơn, quá hạn SLA) để đảm bảo hệ thống phản ứng chính xác.

## 3. Danh sách quy trình toàn hệ thống

Hệ thống được thiết kế với 6 quy trình cốt lõi, bao phủ toàn bộ vòng đời đơn hàng:

| Mã | Tên quy trình | Vai trò trong hệ thống |
| --- | --- | --- |
| **QT01** | **Tiếp nhận & phân luồng đơn hàng** | **(Phạm vi cá nhân)** Rà soát rủi ro đầu cơ, gọi điện xác minh, xử lý hoàn tiền tự động và chốt đơn. |
| QT02 | Nhặt hàng & đóng gói tại cửa hàng | Hướng dẫn luồng di chuyển, quét mã QA sản phẩm và đóng gói tách biệt. |
| QT03 | Xử lý ngoại lệ | Xử lý kịch bản lỗi thanh toán, lỗi hệ thống. |
| QT04 | Thanh toán | Đồng bộ giao dịch trực tuyến và COD, xử lý sự cố thiếu hàng. |
| QT05 | Đổi trả hàng hóa | Quy trình thu hồi, kiểm kho và cấp voucher đền bù. |
| QT06 | Xử lý khiếu nại | Phân loại lỗi (Frontend, Vận hành, Shipper) và phản hồi. |

*Lưu ý: Repository này chỉ tập trung đi sâu vào QT01 do tôi trực tiếp đảm nhiệm.*

## 4. Phương pháp phân tích và mô hình hóa

Dự án áp dụng phương pháp luận BPM với vòng đời tinh gọn:

1. **Thiết kế & Phân tích:** Xác định các điểm nghẽn (Pain points) qua Benchmark các mô hình siêu thị thực tế (WinMart, Co.opmart). Xác định rõ Khách hàng, Nhân viên và Hệ thống (BOT).
2. **Mô hình hóa (BPMN):** Vẽ sơ đồ phân rẽ (Lanes) bằng Camunda Modeler. Quy định rõ Start Event, End Event, Gateway (XOR, Event-Based) và Timer Event để quản lý SLA.
3. **Cấu hình biểu mẫu & Dữ liệu:** Sử dụng Camunda Forms tạo biểu mẫu nhập liệu đầu vào (`Form_DH`) và biểu mẫu cho người dùng (`Form_TTLienHe`), truyền và lưu dữ liệu dưới dạng Process Variables (`${TT}`, `${isLienHe}`).
4. **Thực thi Backend (Node.js):** Viết mã nguồn lắng nghe các `Topic` từ Camunda để xử lý logic (ví dụ: tự động hoàn tiền, gửi email).
5. **Kiểm thử (Execution):** Đưa sơ đồ lên Engine và chạy test case trực tiếp trên Tasklist & Cockpit.

## 5. Quy trình phụ trách: QT01 - Tiếp nhận và phân luồng đơn hàng

### Bối cảnh nghiệp vụ

Đây là "chốt chặn" đầu tiên. Đơn hàng cần được kiểm duyệt tự động để tránh rủi ro đầu cơ (ví dụ: tận dụng bug giá). Nếu hợp lệ, nhân viên gọi xác minh; nếu khách hàng thay đổi ý định, hệ thống cho phép "cửa sổ 1 giờ" để hủy đơn và hoàn tiền tự động trước khi chuyển lệnh xuống kho đóng gói.

### Phân tích nghiệp vụ

* **Tác nhân tham gia (Pool/Lanes):** Khách hàng, Hệ thống (BOT), Nhân viên xác nhận.
* **Điều kiện bắt đầu:** Đơn đặt hàng được tiếp nhận thông qua Form hệ thống.
* **Luồng xử lý chính:** Rà soát tự động -> Gọi điện xác nhận -> Chờ 1 giờ (SLA) -> Gửi email chốt đơn -> Bàn giao quy trình QT02.
* **Điểm quyết định (Gateways):**
* Tổng tiền có hợp lệ không? (`${TT} > 10.000.000` -> Không hợp lệ).
* Nhân viên có liên hệ được khách không? (`${isLienHe} == 'true' / 'false'`).
* Trạng thái thanh toán là gì? (Đã thanh toán -> Rẽ nhánh hoàn tiền; Chưa thanh toán -> Kết thúc hủy).


* **Luồng ngoại lệ (Event-based):** Đang trong 1 giờ chờ mà nhận được tín hiệu "Khách Hủy Đơn", hệ thống ngắt luồng đếm giờ và rẽ sang nhánh Hủy/Hoàn tiền.

### Sơ đồ BPMN

<img width="7710" height="3210" alt="QT01-TiepNhanVaPhanLuongDH" src="https://github.com/user-attachments/assets/4dd78a2b-6c52-4dde-955b-b5c231059128" />

### Giải thích mô hình & Cấu hình kỹ thuật

* **Service Tasks:** Được cấu hình `Implementation: External` với các Topic cụ thể (vd: `check-validity-task`, `refund-task`). File `index.js` bằng Node.js sẽ lắng nghe và tự động xử lý các task này.
* **User Tasks:** Được gắn `Form Ref` (vd: `Form_TTLienHe`) để nhân viên nhập liệu trên giao diện Camunda Tasklist.
* **Event-based Gateway & Boundary Timer:** Dùng để rẽ nhánh quá trình chờ. Nhánh 1 gắn Timer `PT15S` (demo 15 giây thay vì 1 giờ). Nhánh 2 gắn Message Catch Event `Msg_KhachHangHuyDon` (được trigger bởi script API `huydon.js`).

## 6. Kiểm thử

### Video chạy thử

* **Video Demo QT01:** [https://youtu.be/IsKzIppY2qs?si=uZQi-J849uwtVI29](https://youtu.be/IsKzIppY2qs?si=uZQi-J849uwtVI29)
* **Nội dung:** Mô phỏng 2 kịch bản. (1) Đơn hợp lệ đi thẳng đến bước xác nhận thành công sau thời gian chờ. (2) Đơn hợp lệ nhưng bị ngắt bởi tín hiệu khách hàng xin hủy đơn giữa chừng.
* **Kết quả:** Log terminal chạy đúng logic Node.js, Camunda Cockpit hiển thị dòng chảy chính xác.

## 7. Công cụ và tài nguyên

| Công cụ | Mục đích sử dụng |
| --- | --- |
| **Camunda Modeler** (v5.44) | Thiết kế sơ đồ BPMN 2.0 và xây dựng giao diện biểu mẫu Camunda Forms. |
| **Camunda 7 Engine** | Bộ máy lõi thực thi quy trình (được cấu hình chạy trên địa chỉ IP public thực tế). |
| **Node.js & camunda-external-task-client-js** | Xây dựng các Worker backend để bắt sự kiện từ sơ đồ và thực thi logic lập trình (gửi email, báo lỗi, tính toán). |
| **REST API / `fetch**` | Script ngoại vi gửi tín hiệu (Message Event) tác động vào quy trình đang chạy. |

## 8. Cấu trúc repository

```text
/
├── README.md                           # Tài liệu mô tả dự án (bạn đang đọc)
├── QT01-TiepNhanVaPhanLuongDH.bpmn     # Tệp sơ đồ quy trình chính (Camunda)
├── forms/
│   ├── Form_Đơn hàng.form              # Biểu mẫu tạo đơn
│   └── Form_Trạng thái liên hệ.form    # Biểu mẫu nhân viên tương tác
├── src/
│   ├── index.js                        # File nguồn Node.js xử lý External Tasks
│   ├── huydon.js                       # File script giả lập HTTP Request khách hủy đơn
│   ├── package.json                    # Cấu hình môi trường Node
│   └── package-lock.json
|
