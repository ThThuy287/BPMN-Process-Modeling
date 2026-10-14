# Exercise 3.19 – Chuẩn bị hồ sơ cho phiên tòa

## 1. Đề bài

**Exercise 3.19** Model the following business process. Use gateways and data objects where needed.

In a court each morning the files that have yet to be processed are checked to make sure they are in order for the court hearing that day. If some files are missing a search is initiated, otherwise the files can be physically tracked to the intended location. Once all the files are ready, these are handed to the associate. In the meantime the judge's lawlist is distributed to the relevant people. Afterwards, the directions hearings are conducted.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Chuẩn bị đầy đủ hồ sơ cần thiết cho phiên tòa trong ngày, phân phối danh sách công việc của thẩm phán và bảo đảm các hoạt động chuẩn bị hoàn tất trước khi tiến hành phiên điều trần.

### 2.2. Tác nhân tham gia

| Tác nhân | Vai trò |
|---|---|
| Nhân viên tòa án | Kiểm tra, tìm kiếm và theo dõi vị trí hồ sơ |
| Associate | Tiếp nhận hồ sơ đã chuẩn bị |
| Nhân sự phụ trách phân phối danh sách | Gửi danh sách công việc của thẩm phán |
| Thẩm phán và nhân sự liên quan | Thực hiện phiên điều trần |

### 2.3. Đầu vào và đầu ra

| Loại | Đối tượng | Mô tả |
| :--- | :--- | :--- |
| Đầu vào | Files | Được sử dụng làm tài liệu đầu vào cho hoạt động "Check files". |
| Đầu vào | Judge's lawlist | Được sử dụng làm tài liệu đầu vào cho hoạt động "Distribute lawlist". |

### 2.4. Phân tích luồng điều khiển

1. Bắt đầu quy trình bằng sự kiện thời gian vào mỗi buổi sáng.
2. Thực hiện hoạt động kiểm tra hồ sơ dựa trên dữ liệu.
3. Sử dụng cổng song song để tách luồng quy trình thành hai nhánh thực hiện đồng thời:
   - **Nhánh 1 (Xử lý hồ sơ và danh sách án):** Sử dụng cổng rẽ nhánh độc quyền để kiểm tra tình trạng. 
     - Nếu thiếu hồ sơ, tiến hành tìm kiếm. 
     - Nếu không, thực hiện theo dõi vị trí vật lý của hồ sơ. 
     - Sau khi luồng rẽ nhánh này hội tụ lại, tiếp tục thực hiện phân phối danh sách án với dữ liệu "Judge's lawlist".
   - **Nhánh 2 (Bàn giao):** Tiến hành bàn giao cho cộng sự song song với Nhánh 1.
4. Sử dụng cổng song song để đồng bộ, chờ cả hai nhánh công việc hoàn tất.
5. Tiến hành phiên điều trần.
6. Kết thúc quy trình.

### 2.5. Định hướng mô hình hóa BPMN

- **Sự kiện:** Sử dụng Timer Start Event để thể hiện quy trình được kích hoạt định kỳ mỗi sáng.
- **Cổng song song:** Được dùng để tách và gộp hai luồng công việc diễn ra cùng lúc là luồng xử lý/phân phối tài liệu và luồng bàn giao cho cộng sự.
- **Cổng độc quyền:** Được đặt lồng bên trong nhánh song song để xử lý các tình huống loại trừ lẫn nhau (hồ sơ bị thiếu hoặc không thiếu).
- **Đối tượng dữ liệu:** Sử dụng ký hiệu Data Object kèm liên kết dữ liệu để chỉ định rõ "Files" và "Judge's lawlist" cung cấp thông tin cho các hoạt động tương ứng. Không tự ý thêm các bước xử lý lỗi (như hủy phiên tòa) nếu sơ đồ không mô tả.

## 3. Ảnh sơ đồ
<img width="4260" height="1245" alt="Bai3 19_T139" src="https://github.com/user-attachments/assets/7729d8dc-e8f8-481b-967d-870f95dd85c2" />

