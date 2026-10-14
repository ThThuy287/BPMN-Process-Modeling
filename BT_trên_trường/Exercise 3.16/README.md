# Exercise 3.16 – Quy trình bồi thường thiệt hại

## 1. Đề bài

**Exercise 3.16** Model the control flow of the following business process for damage compensation.

If a tenant is evicted because of damages to the premises, a process needs to be started by the tribunal in order to hold a hearing to assess the amount of compensation the tenant owes to the owner of the premises. This process starts when a cashier of the tribunal receives a request for compensation from the owner. The cashier then retrieves the file for those particular premises and checks that the request is both acceptable for filing and compliant with the description of the premises on file. After these checks, the cashier needs to set a hearing date. Setting a hearing date incurs fees to the owner. It may be that the owner has already paid the fees with the request, in which case the cashier allocates a hearing date and the process completes. It may be that additional fees are required, but the owner has already paid also those fees. In this case the cashier generates a receipt for the additional fees and proceeds with allocating the hearing date. Finally, if the owner has not paid the required fees, the cashier produces a fees notice and waits for the owner to pay the fees before reassessing the document compliance.

## 2. Phân tích nghiệp vụ

**2.1. Mục tiêu**
Mô hình hóa luồng kiểm soát (control flow) của quy trình yêu cầu bồi thường thiệt hại tại tòa án, tập trung vào trình tự thực hiện các tác vụ và logic rẽ nhánh dựa trên trạng thái thanh toán án phí của chủ nhà.

**2.2. Các hoạt động và quy tắc nghiệp vụ**

| Hoạt động / Cổng rẽ nhánh | Mục đích sử dụng |
| --- | --- |
| **Receive request** | Tiếp nhận yêu cầu bồi thường từ chủ nhà để khởi tạo luồng xử lý.
| **Check request & Check fee payment** | Kiểm tra tính hợp lệ của hồ sơ và xác minh tình trạng thanh toán lệ phí.
| **Gateway: Fees paid / Fees not paid** | Phân luồng quy trình dựa trên kết quả kiểm tra phí. Chuyển hướng sang đòi nợ (Fees not paid) hoặc tiếp tục quy trình (Fees paid).
| **Produce fees notice & Receive payment** | Phát hành thông báo nợ phí và chờ nhận thanh toán bổ sung từ chủ nhà.
| **Gateway: Phụ phí (Additional fees)** | Kiểm tra xem có phát sinh phụ phí đã được đóng hay không để thực hiện tạo biên lai (Generate receipt for additional fees).
| **Allocate hearing date** | Bố trí lịch xét xử, hoàn tất thủ tục và kết thúc quy trình.

**2.3. Định hướng mô hình hóa**
Sử dụng Sequence Flow và Exclusive Gateway để kiểm soát chặt chẽ đường đi của quy trình theo các điều kiện logic.

* Tạo **vòng lặp** cho nhánh nợ phí: Nhánh "Fees not paid" sau khi đi qua tác vụ "Produce fees notice" và "Receive payment" phải được điều hướng quay ngược trở lại Gateway hội tụ nằm trước bước "Check request". Cấu trúc này đảm bảo hồ sơ phải được đánh giá lại tính hợp lệ sau khi hoàn tất đóng tiền.


* Sử dụng **cổng rẽ nhánh loại trừ** để phân tách luồng: Đảm bảo tại điểm kiểm tra phí, quy trình chỉ đi theo một trong hai hướng duy nhất là "Fees paid" hoặc "Fees not paid".


* Sử dụng **cổng hội tụ**: Gộp nhánh có cấp biên lai phụ phí và nhánh không cần cấp biên lai lại với nhau trước khi đi đến bước chốt cuối cùng là "Allocate hearing date".

**2.5. Bảng quy tắc nghiệp vụ**

| Mã | Tên quy tắc | Mô tả chi tiết |
| --- | --- | --- |
| **BR-01** | Khởi tạo quy trình | Luồng nghiệp vụ được kích hoạt ngay khi nhân viên thu ngân tiếp nhận yêu cầu bồi thường từ chủ nhà. |
| **BR-02** | Truy xuất dữ liệu | Hệ thống/Nhân viên bắt buộc phải truy xuất hồ sơ tài sản (Premises File) hiện hữu để làm cơ sở đối chiếu. |
| **BR-03** | Xác thực hồ sơ | Yêu cầu bồi thường chỉ được chấp nhận nếu hợp lệ về thủ tục hành chính và thông tin khớp với mô tả tài sản lưu trữ trong hồ sơ. |
| **BR-04** | Điều kiện lên lịch | Ngày xét xử (Hearing date) chỉ được ấn định khi hệ thống xác nhận toàn bộ các khoản án phí liên quan đã được thanh toán đầy đủ. |
| **BR-05** | Thanh toán tiêu chuẩn | Nếu khoản phí ban đầu đã được đóng đủ, quy trình tiến thẳng đến bước xếp lịch mà không cần xuất thêm biên lai phụ. |
| **BR-06** | Xử lý phụ phí | Trường hợp phát sinh phụ phí nhưng đã được thanh toán, thu ngân bắt buộc phải lập biên lai (Receipt) cho khoản này trước khi tiến hành lên lịch. |
| **BR-07** | Xử lý nợ phí | Nếu chủ nhà chưa đóng đủ phí, quy trình bị chặn lại. Thu ngân phải phát hành thông báo nợ phí (Fees notice) và đặt hệ thống vào trạng thái chờ thanh toán. |
| **BR-08** | Vòng lặp đối soát | Khi nhận được khoản thanh toán bổ sung, hồ sơ bắt buộc phải quay vòng lại bước kiểm tra (Check request) để thẩm định lại tính hợp lệ trước khi đi tiếp. |

**2.6. Phân tích luồng điều khiển**

Luồng quy trình được thiết kế theo 5 giai đoạn liên kết chặt chẽ với logic rẽ nhánh có điều kiện:

* **Giai đoạn Tiếp nhận & Kiểm tra:** Xử lý đầu vào thông qua việc tiếp nhận yêu cầu, truy xuất hồ sơ gốc và xác minh mức độ phù hợp của dữ liệu.
* **Giai đoạn Rẽ nhánh chi phí:** Logic cốt lõi được kiểm soát bằng cổng rẽ nhánh độc quyền. Các nhánh (Đủ phí / Thiếu phí / Có phụ phí) là các tùy chọn loại trừ lẫn nhau, đòi hỏi phải gán điều kiện luồng rõ ràng để minh bạch hóa quyết định điều hướng.
* **Giai đoạn Trạng thái chờ:** Nhánh "Chưa thanh toán" kích hoạt luồng ngoại lệ, tạo thông báo và đưa quy trình vào trạng thái ngưng đọng để chờ dòng tiền (nhận khoản thanh toán còn thiếu).
* **Giai đoạn Quay lui:** Khởi tạo một vòng lặp nghiệp vụ. Quy trình không đi thẳng đến kết thúc mà phải quay ngược từ bước "Nhận thanh toán" về lại bước "Kiểm tra yêu cầu" ban đầu để đảm bảo tính tuân thủ tuyệt đối.
* **Giai đoạn Hoàn tất:** Hội tụ các luồng đã đáp ứng đủ điều kiện tài chính để thực thi tác vụ cuối cùng (bố trí lịch xét xử) và đóng quy trình.

**2.7. Định hướng ánh xạ mô hình hóa BPMN 2.0**

| Bước nghiệp vụ thực tế | Thành phần BPMN 2.0 tương ứng | Khuyến nghị cấu hình |
| --- | --- | --- |
| Tiếp nhận yêu cầu bồi thường | **Start Event** | Có thể dùng Message Start Event nếu nhận yêu cầu qua hệ thống email/văn bản. |
| Truy xuất & Kiểm tra hồ sơ | **Task** (User Task) | Thể hiện thao tác thủ công hoặc bán tự động của Thu ngân. |
| Rẽ nhánh theo trạng thái phí | **Exclusive Gateway** | Đảm bảo chỉ một luồng duy nhất được kích hoạt (Đã trả / Chưa trả). |
| Lập biên lai / Thông báo nợ | **Task** (Service/User Task) | Sản sinh ra các Data Objects (Biên lai, Thông báo). |
| Nhận khoản phí còn thiếu | **Intermediate Catch Event** hoặc **Receive Task** | Neo hệ thống lại cho đến khi nhận được sự kiện thanh toán từ chủ nhà. |
| Kiểm tra lại tính tuân thủ | **Sequence Flow** (Loop) | Vẽ đường dẫn nối ngược về Gateway hội tụ (Merge Gateway) nằm ngay trước Task Kiểm tra hồ sơ. |
| Bố trí ngày xét xử | **Task** (User Task) | Tác vụ chốt hạ quy trình. |
| Hoàn tất bố trí lịch | **End Event** | Điểm kết thúc thành công của luồng nghiệp vụ. |

## 3. Ảnh sơ đồ
<img width="4536" height="1200" alt="Bai3 16_T139" src="https://github.com/user-attachments/assets/d6d09ee1-8116-4f78-bea5-f3f99e9d9235" />
---

# Exercise 3.17 – Bổ sung đối tượng nghiệp vụ

## 1. Đề bài

**Exercise 3.17** Extend the model of Exercise 3.16 by adding the business objects involved in this process.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu

Mở rộng mô hình của Exercise 3.16 bằng cách thể hiện các tài liệu và thông tin nghiệp vụ được sử dụng hoặc tạo ra trong quy trình.

### 2.2. Các đối tượng nghiệp vụ (Business Objects)

| Đối tượng | Mục đích sử dụng trong quy trình |
| :--- | :--- |
| **Yêu cầu bồi thường** | Là tài liệu đầu vào để khởi tạo quy trình, được sử dụng trực tiếp trong hoạt động tiếp nhận yêu cầu. |
| **Hồ sơ tài sản** | Là tài liệu đầu vào chứa mô tả tài sản, làm cơ sở để đối chiếu và kiểm tra tính hợp lệ của yêu cầu |
| **Biên lai thanh toán** | Là kết quả đầu ra của hoạt động lập biên lai khi chủ sở hữu đã thanh toán các khoản phí bổ sung phát sinh |
| **Thông báo phí** | Là kết quả đầu ra của hoạt động tạo thông báo yêu cầu thanh toán trong trường hợp phí chưa được nộp |
| **Danh sách án của thẩm phán** | Là kho dữ liệu lưu trữ thông tin ngày xét xử, được cập nhật sau khi hoàn tất hoạt động bố trí lịch xét xử |

*(Lưu ý: "Thông tin thanh toán" được xử lý như một điều kiện rẽ nhánh sau bước "Check fee payment" chứ không phải là một đối tượng dữ liệu độc lập trên sơ đồ*

### 2.3. Định hướng mô hình hóa

Mô hình sử dụng các ký hiệu Đối tượng dữ liệu và Liên kết dữ liệu để biểu diễn mối quan hệ tương tác giữa các hoạt động và luồng thông tin:
* **Dữ liệu đầu vào:** Yêu cầu bồi thường và Hồ sơ tài sản được sử dụng làm đầu vào cho các bước tiếp nhận và kiểm tra hồ sơ.
* **Dữ liệu đầu ra:** Biên lai thanh toán và Thông báo phí được tạo ra từ các hoạt động xử lý tài chính tương ứng.
* **Lưu trữ dữ liệu:** Thông tin lịch xét xử được ghi nhận vào kho dữ liệu của thẩm phán ở cuối quy trình.
* **Sự phân biệt luồng:** Sơ đồ thể hiện sự tách biệt rõ ràng giữa **Sequence Flow** (các mũi tên nét liền chỉ định thứ tự thực hiện từ "Receive request" đến "Allocate hearing date") và **Data Association** (các mũi tên nét đứt thể hiện việc truy xuất hoặc tạo mới các tệp tài liệu).

## 3. Ảnh sơ đồ
<img width="4536" height="1482" alt="Bai3 17_T139" src="https://github.com/user-attachments/assets/024c6031-7004-4345-8207-9bb00afa172d" />
---

# Exercise 3.18 – Bổ sung nguồn lực

## 1. Đề bài

**Exercise 3.18** Extend the model of Exercise 3.17 by adding the involved resources. Is there any non-human resource?

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu

Bổ sung nguồn lực thực hiện quy trình và xác định liệu ngoài con người còn có nguồn lực phi con người tham gia hay không.

### 2.2. Các nguồn lực

| Nguồn lực | Phân loại | Vai trò |
|---|---|---|
| Nhân viên thu ngân | Con người | Thực hiện các hoạt động tiếp nhận, kiểm tra và xử lý hồ sơ |
| Chủ sở hữu | Con người | Nộp yêu cầu và thanh toán phí |
| Kho lưu trữ hồ sơ | Phi con người, nếu được giả định | Lưu trữ và cung cấp hồ sơ tài sản |
| Hệ thống xử lý thanh toán | Phi con người, nếu được giả định | Hỗ trợ kiểm tra hoặc xử lý thanh toán |

### 2.3. Trả lời câu hỏi

Có thể có nguồn lực phi con người, chẳng hạn kho lưu trữ hồ sơ hoặc hệ thống xử lý thanh toán. Tuy nhiên, đề bài không xác định cụ thể các hệ thống này.
Vì vậy, khi xây dựng mô hình cần phân biệt rõ nguồn lực được nêu trực tiếp trong đề với nguồn lực được giả định để phục vụ mục đích mô hình hóa.

## 3. Ảnh sơ đồ
<img width="5310" height="2160" alt="Bai3 18_T139" src="https://github.com/user-attachments/assets/618a24bf-963c-46da-ac0b-071a0b7e669b" />
