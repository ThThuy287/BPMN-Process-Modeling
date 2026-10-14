# BPMN Process Modeling

# Exercise 3.16 – Quy trình bồi thường thiệt hại

## 1. Đề bài (Problem Statement)

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
Sử dụng Sequence Flow và Exclusive Gateway (X) để kiểm soát chặt chẽ đường đi của quy trình theo các điều kiện logic.

* Tạo **vòng lặp (Loop)** cho nhánh nợ phí: Nhánh "Fees not paid" sau khi đi qua tác vụ "Produce fees notice" và "Receive payment" phải được điều hướng quay ngược trở lại Gateway hội tụ nằm trước bước "Check request". Cấu trúc này đảm bảo hồ sơ phải được đánh giá lại tính hợp lệ sau khi hoàn tất đóng tiền.


* Sử dụng **cổng rẽ nhánh loại trừ (Exclusive Gateway)** để phân tách luồng: Đảm bảo tại điểm kiểm tra phí, quy trình chỉ đi theo một trong hai hướng duy nhất là "Fees paid" hoặc "Fees not paid".


* Sử dụng **cổng hội tụ (Merge)**: Gộp nhánh có cấp biên lai phụ phí và nhánh không cần cấp biên lai lại với nhau trước khi đi đến bước chốt cuối cùng là "Allocate hearing date".

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
* **Giai đoạn Rẽ nhánh chi phí (Routing):** Logic cốt lõi được kiểm soát bằng cổng rẽ nhánh độc quyền (Exclusive Gateway). Các nhánh (Đủ phí / Thiếu phí / Có phụ phí) là các tùy chọn loại trừ lẫn nhau, đòi hỏi phải gán điều kiện luồng (Sequence Flow Conditions) rõ ràng để minh bạch hóa quyết định điều hướng.
* **Giai đoạn Trạng thái chờ (Wait-state):** Nhánh "Chưa thanh toán" kích hoạt luồng ngoại lệ, tạo thông báo và đưa quy trình vào trạng thái ngưng đọng để chờ dòng tiền (nhận khoản thanh toán còn thiếu).
* **Giai đoạn Quay lui (Loopback):** Khởi tạo một vòng lặp nghiệp vụ. Quy trình không đi thẳng đến kết thúc mà phải quay ngược từ bước "Nhận thanh toán" về lại bước "Kiểm tra yêu cầu" ban đầu để đảm bảo tính tuân thủ tuyệt đối.
* **Giai đoạn Hoàn tất (Convergence):** Hội tụ các luồng đã đáp ứng đủ điều kiện tài chính để thực thi tác vụ cuối cùng (bố trí lịch xét xử) và đóng quy trình.

**2.7. Định hướng ánh xạ mô hình hóa BPMN 2.0**

| Bước nghiệp vụ thực tế | Thành phần BPMN 2.0 tương ứng | Khuyến nghị cấu hình |
| --- | --- | --- |
| Tiếp nhận yêu cầu bồi thường | **Start Event** | Có thể dùng Message Start Event nếu nhận yêu cầu qua hệ thống email/văn bản. |
| Truy xuất & Kiểm tra hồ sơ | **Task** (User Task) | Thể hiện thao tác thủ công hoặc bán tự động của Thu ngân. |
| Rẽ nhánh theo trạng thái phí | **Exclusive Gateway** (X) | Đảm bảo chỉ một luồng duy nhất được kích hoạt (Đã trả / Chưa trả). |
| Lập biên lai / Thông báo nợ | **Task** (Service/User Task) | Sản sinh ra các Data Objects (Biên lai, Thông báo). |
| Nhận khoản phí còn thiếu | **Intermediate Catch Event** (Message) hoặc **Receive Task** | Neo hệ thống lại cho đến khi nhận được sự kiện thanh toán từ chủ nhà. |
| Kiểm tra lại tính tuân thủ | **Sequence Flow** (Loop) | Vẽ đường dẫn nối ngược về Gateway hội tụ (Merge Gateway) nằm ngay trước Task Kiểm tra hồ sơ. |
| Bố trí ngày xét xử | **Task** (User Task) | Tác vụ chốt hạ quy trình. |
| Hoàn tất bố trí lịch | **End Event** | Điểm kết thúc thành công của luồng nghiệp vụ. |

---

# Exercise 3.17 – Bổ sung đối tượng nghiệp vụ

## 1. Đề bài (Problem Statement)

**Exercise 3.17** Extend the model of Exercise 3.16 by adding the business objects involved in this process.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu

Mở rộng mô hình của Exercise 3.16 bằng cách thể hiện các tài liệu và thông tin nghiệp vụ được sử dụng hoặc tạo ra trong quy trình.

### 2.2. Các đối tượng nghiệp vụ

| Đối tượng | Mục đích sử dụng |
|---|---|
| Yêu cầu bồi thường | Đầu vào để khởi tạo quy trình |
| Hồ sơ tài sản | Cơ sở để kiểm tra thông tin |
| Mô tả tài sản | Dùng để đối chiếu với yêu cầu bồi thường |
| Thông tin thanh toán | Xác định tình trạng thanh toán phí |
| Biên lai | Kết quả của hoạt động lập biên lai phí bổ sung |
| Thông báo phí | Kết quả của hoạt động yêu cầu thanh toán |
| Thông tin ngày xét xử | Kết quả của hoạt động bố trí lịch xét xử |

### 2.3. Định hướng mô hình hóa

Sử dụng Data Object và Data Association để biểu diễn mối quan hệ giữa các hoạt động và dữ liệu.

- Yêu cầu bồi thường được sử dụng trong quá trình tiếp nhận và kiểm tra.
- Hồ sơ tài sản được sử dụng để xác minh thông tin.
- Thông tin thanh toán được sử dụng khi xác định nhánh xử lý phí.
- Biên lai và thông báo phí là đầu ra của các hoạt động tương ứng.
- Thông tin ngày xét xử được tạo ra sau khi bố trí lịch.

Cần phân biệt Sequence Flow, thể hiện thứ tự thực hiện hoạt động, với Data Association, thể hiện quan hệ sử dụng hoặc tạo dữ liệu.

---

# Exercise 3.18 – Bổ sung nguồn lực

## 1. Đề bài (Problem Statement)

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

---

# Exercise 3.19 – Chuẩn bị hồ sơ cho phiên tòa

## 1. Đề bài (Problem Statement)

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

| Loại | Đối tượng |
|---|---|
| Đầu vào | Hồ sơ cần xử lý trong ngày |
| Đầu vào | Danh sách công việc của thẩm phán |
| Đầu ra | Hồ sơ đã sẵn sàng |
| Đầu ra | Danh sách công việc đã được phân phối |
| Đầu ra | Phiên điều trần được thực hiện |

### 2.4. Phân tích luồng điều khiển

1. Bắt đầu quy trình chuẩn bị buổi sáng.
2. Kiểm tra hồ sơ cần sử dụng trong phiên tòa.
3. Sử dụng Exclusive Gateway để xác định có hồ sơ bị thiếu hay không.
4. Nếu có hồ sơ thiếu, khởi động hoạt động tìm kiếm.
5. Nếu không có hồ sơ thiếu, theo dõi và xác định vị trí thực tế của hồ sơ.
6. Khi toàn bộ hồ sơ đã sẵn sàng, bàn giao cho associate.
7. Song song với việc chuẩn bị hồ sơ, phân phối danh sách công việc của thẩm phán.
8. Chờ các nhánh công việc cần thiết hoàn tất.
9. Tiến hành phiên điều trần.
10. Kết thúc quy trình.

### 2.5. Định hướng mô hình hóa BPMN

- Sử dụng Exclusive Gateway để phân nhánh theo tình trạng thiếu hồ sơ.
- Sử dụng Parallel Gateway để thể hiện hai luồng công việc có thể diễn ra đồng thời: chuẩn bị hồ sơ và phân phối danh sách công việc.
- Sử dụng gateway đồng bộ trước phiên điều trần nếu cả hai luồng đều phải hoàn tất.
- Sử dụng Data Object để biểu diễn hồ sơ và danh sách công việc của thẩm phán.

Không nên tự bổ sung các bước xử lý ngoài đề bài nếu chưa có cơ sở, chẳng hạn quy định hủy phiên tòa hoặc chuyển lịch khi không tìm thấy hồ sơ.

---

# Exercise 3.20 – Xử lý yêu cầu bồi thường bảo hiểm xe cơ giới

## 1. Đề bài (Problem Statement)

**Exercise 3.20** Model the following business process. Use pools and lanes where needed.

The motor claim handling process starts when a customer submits a claim with the relevant documentation. The notification department at the car insurer checks the documents upon completeness and registers the claim. Next, the Handling department picks up the claim and checks the insurance. Then, an assessment is performed. If the assessment is positive, a garage is phoned to authorize the repairs and the payment is scheduled (in this order). Otherwise, the claim is rejected. In any case (whether the outcome is positive or negative), a letter is sent to the customer and the process is considered to be complete.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Tiếp nhận và xử lý yêu cầu bồi thường bảo hiểm xe cơ giới, xác minh bảo hiểm, đánh giá yêu cầu, quyết định chấp thuận hoặc từ chối và thông báo kết quả cho khách hàng.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
|---|---|
| Customer Pool | Khách hàng gửi yêu cầu và nhận thông báo |
| Car Insurer Pool | Doanh nghiệp bảo hiểm thực hiện quy trình |
| Notification Department Lane | Kiểm tra tính đầy đủ của hồ sơ và đăng ký yêu cầu |
| Handling Department Lane | Kiểm tra bảo hiểm và đánh giá yêu cầu |
| Garage Pool | Gara nhận liên hệ để xác nhận việc sửa chữa, nếu cần thể hiện tương tác bên ngoài |

### 2.3. Đầu vào và đầu ra

| Loại | Đối tượng |
|---|---|
| Đầu vào | Yêu cầu bồi thường |
| Đầu vào | Tài liệu liên quan |
| Đầu vào | Thông tin hợp đồng bảo hiểm |
| Đầu ra | Yêu cầu đã đăng ký |
| Đầu ra | Kết quả đánh giá |
| Đầu ra | Xác nhận cho phép sửa chữa |
| Đầu ra | Lịch thanh toán |
| Đầu ra | Kết quả từ chối yêu cầu, nếu không được chấp thuận |
| Đầu ra | Thư thông báo gửi khách hàng |

### 2.4. Các hoạt động chính

1. Khách hàng gửi yêu cầu bồi thường kèm tài liệu.
2. Bộ phận Notification kiểm tra tính đầy đủ của tài liệu.
3. Đăng ký yêu cầu bồi thường.
4. Bộ phận Handling tiếp nhận yêu cầu.
5. Kiểm tra thông tin bảo hiểm.
6. Đánh giá yêu cầu bồi thường.
7. Nếu kết quả tích cực, gọi điện cho gara để cho phép sửa chữa.
8. Sau đó lên lịch thanh toán.
9. Nếu kết quả tiêu cực, từ chối yêu cầu.
10. Trong cả hai trường hợp, gửi thư thông báo cho khách hàng.
11. Kết thúc quy trình.

### 2.5. Quy tắc nghiệp vụ

| Mã | Quy tắc |
|---|---|
| BR-01 | Quy trình bắt đầu khi khách hàng gửi yêu cầu kèm tài liệu liên quan. |
| BR-02 | Bộ phận Notification kiểm tra tính đầy đủ và đăng ký yêu cầu. |
| BR-03 | Bộ phận Handling kiểm tra bảo hiểm trước khi đánh giá yêu cầu. |
| BR-04 | Nếu đánh giá tích cực, phải liên hệ gara để cho phép sửa chữa trước khi lên lịch thanh toán. |
| BR-05 | Nếu đánh giá tiêu cực, yêu cầu bị từ chối. |
| BR-06 | Khách hàng luôn nhận được thư thông báo kết quả. |

### 2.6. Định hướng mô hình hóa BPMN

- Sử dụng một pool cho doanh nghiệp bảo hiểm và các lane cho những bộ phận nội bộ.
- Có thể dùng pool riêng cho khách hàng và gara để thể hiện giao tiếp giữa các tổ chức.
- Dùng Exclusive Gateway sau hoạt động đánh giá.
- Nhánh tích cực gồm hai hoạt động tuần tự: cho phép sửa chữa, sau đó lên lịch thanh toán.
- Nhánh tiêu cực thực hiện hoạt động từ chối yêu cầu.
- Hai nhánh hội tụ trước hoạt động gửi thư thông báo khách hàng.
- Sử dụng Message Flow cho giao tiếp giữa các pool và Sequence Flow cho luồng bên trong cùng một pool.

---

# Exercise 3.21 – Đánh giá yêu cầu bồi thường bảo hiểm

## 1. Đề bài (Problem Statement)

**Exercise 3.21** Model the following business process. Use pools and lanes where needed.

When a claim is received, a claims officer first checks if the claimant is insured. If not, the claimant is informed that the claim must be rejected by sending an automatic notification via an SAP system. Otherwise, a senior claims officer evaluates the severity of the claim. Based on the outcome (simple or complex claims), the relevant forms are sent to the claimant, again using the SAP system. Once the forms are returned, they are checked for completeness by the claims officer. If the forms provide all relevant details, the claim is registered in the claims management system, and the process ends. Otherwise, the claimant is informed to update the forms via the SAP system. Upon reception of the updated forms, they are checked again by the claims officer to see if the details have been provided.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Xác minh tư cách bảo hiểm của người yêu cầu, phân loại mức độ phức tạp của yêu cầu, thu thập thông tin đầy đủ và đăng ký yêu cầu hợp lệ vào hệ thống quản lý khiếu nại.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
|---|---|
| Claimant Pool | Người gửi yêu cầu và cung cấp biểu mẫu |
| Insurance Organization Pool | Tổ chức bảo hiểm xử lý yêu cầu |
| Claims Officer Lane | Kiểm tra tư cách bảo hiểm và tính đầy đủ của biểu mẫu |
| Senior Claims Officer Lane | Đánh giá mức độ nghiêm trọng của yêu cầu |
| SAP System | Hệ thống hỗ trợ gửi thông báo và biểu mẫu |
| Claims Management System | Hệ thống lưu trữ và đăng ký yêu cầu |

SAP và hệ thống quản lý khiếu nại có thể được thể hiện dưới dạng nguồn lực hệ thống hoặc các tác vụ dịch vụ trong quy trình. Không nhất thiết phải tạo pool riêng cho từng hệ thống.

### 2.3. Đầu vào và đầu ra

| Loại | Đối tượng |
|---|---|
| Đầu vào | Yêu cầu bồi thường |
| Đầu vào | Thông tin xác minh bảo hiểm |
| Đầu vào | Thông tin đánh giá mức độ nghiêm trọng |
| Đầu vào | Biểu mẫu đã điền |
| Đầu ra | Thông báo yêu cầu bị từ chối |
| Đầu ra | Biểu mẫu tương ứng với yêu cầu đơn giản hoặc phức tạp |
| Đầu ra | Yêu cầu cập nhật biểu mẫu |
| Đầu ra | Yêu cầu đã được đăng ký trong hệ thống |

### 2.4. Quy tắc nghiệp vụ

| Mã | Quy tắc |
|---|---|
| BR-01 | Phải kiểm tra tư cách bảo hiểm trước khi thực hiện các bước tiếp theo. |
| BR-02 | Nếu người yêu cầu không được bảo hiểm, gửi thông báo tự động về việc yêu cầu phải bị từ chối. |
| BR-03 | Nếu người yêu cầu được bảo hiểm, nhân viên cấp cao đánh giá mức độ nghiêm trọng. |
| BR-04 | Biểu mẫu được gửi dựa trên phân loại yêu cầu đơn giản hoặc phức tạp. |
| BR-05 | Nhân viên kiểm tra tính đầy đủ của biểu mẫu sau khi nhận lại. |
| BR-06 | Nếu biểu mẫu đầy đủ, đăng ký yêu cầu vào hệ thống quản lý khiếu nại. |
| BR-07 | Nếu biểu mẫu chưa đầy đủ, yêu cầu người nộp cập nhật. |
| BR-08 | Biểu mẫu cập nhật được kiểm tra lại. |

### 2.5. Phân tích luồng điều khiển

1. Nhận yêu cầu bồi thường.
2. Nhân viên kiểm tra người yêu cầu có được bảo hiểm hay không.
3. Nếu không được bảo hiểm, gửi thông báo tự động qua SAP và kết thúc.
4. Nếu được bảo hiểm, nhân viên cấp cao đánh giá mức độ nghiêm trọng.
5. Phân loại yêu cầu thành đơn giản hoặc phức tạp.
6. Gửi biểu mẫu phù hợp qua SAP.
7. Chờ người yêu cầu gửi lại biểu mẫu.
8. Kiểm tra tính đầy đủ của biểu mẫu.
9. Nếu đầy đủ, đăng ký yêu cầu vào hệ thống quản lý khiếu nại và kết thúc.
10. Nếu chưa đầy đủ, gửi yêu cầu cập nhật biểu mẫu qua SAP.
11. Chờ nhận biểu mẫu cập nhật.
12. Kiểm tra lại biểu mẫu.

### 2.6. Định hướng mô hình hóa BPMN

- Sử dụng Exclusive Gateway để kiểm tra tư cách bảo hiểm.
- Sử dụng Exclusive Gateway để phân loại yêu cầu đơn giản hoặc phức tạp.
- Sử dụng Exclusive Gateway để kiểm tra tính đầy đủ của biểu mẫu.
- Thể hiện việc gửi và nhận biểu mẫu bằng các tác vụ và sự kiện phù hợp.
- Dùng luồng quay lại để mô tả vòng lặp cập nhật biểu mẫu.
- Dùng tác vụ dịch vụ cho hoạt động được hỗ trợ bởi SAP và hệ thống quản lý khiếu nại, tùy quy ước mô hình hóa.

**Lưu ý:** Đề bài chưa nêu kết quả cụ thể nếu biểu mẫu vẫn thiếu thông tin sau lần cập nhật. Không nên tự bổ sung nhánh từ chối yêu cầu. Có thể thể hiện vòng lặp kiểm tra lại cho đến khi đủ thông tin, đồng thời ghi rõ đây là cách diễn giải quy trình từ mô tả hiện có.

---

# Exercise 3.23 – Quy trình cấp phát thuốc theo đơn

## 1. Đề bài (Problem Statement)

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

### 2.4. Khả năng tái sử dụng subprocess

Tùy theo nội dung thực tế của Exercise 1.6, các subprocess có thể được xem xét để tái sử dụng bao gồm:

- Xác minh dữ liệu đơn thuốc.
- Kiểm tra tình trạng thuốc trong kho.
- Quản lý tồn kho.
- Xử lý thanh toán.
- Thông báo cho khách hàng.
- Quản lý hồ sơ đơn thuốc.

Việc tái sử dụng cần dựa trên sự tương đồng thực sự về quy trình và quy tắc nghiệp vụ, không chỉ vì các hoạt động có tên gọi giống nhau.

### 2.5. Khả năng dùng chung giữa các nhà thuốc

Một subprocess có thể được chuẩn hóa để sử dụng tại nhiều quy trình trong cùng nhà thuốc hoặc giữa các nhà thuốc trong một liên minh.

Tuy nhiên, cần phân biệt các hoạt động hành chính có thể dùng chung với những hoạt động đòi hỏi quy tắc chuyên môn, dữ liệu và điều kiện vận hành riêng.

Kết luận cuối cùng về các subprocess có thể dùng chung cần được đưa ra sau khi phân tích đầy đủ đề bài Exercise 1.6.

---

# Tổng kết

Thông qua các bài tập, repository tập trung rèn luyện những kỹ năng sau:

- Phân tích yêu cầu nghiệp vụ từ mô tả bằng văn bản.
- Xác định tác nhân, hoạt động, đầu vào, đầu ra và quy tắc nghiệp vụ.
- Mô hình hóa luồng tuần tự, luồng song song và luồng điều kiện.
- Sử dụng Gateway để thể hiện các điểm quyết định.
- Thể hiện dữ liệu nghiệp vụ bằng Data Objects và Data Associations.
- Phân chia trách nhiệm bằng Pools và Lanes.
- Mô hình hóa vòng lặp xử lý và các hoạt động chờ.
- Phân rã quy trình bằng Subprocesses.
- Xác định cơ hội chuẩn hóa và tái sử dụng quy trình.

Repository phục vụ mục đích học tập và xây dựng hồ sơ năng lực về Business Process Modeling và Business Analysis. Các giả định trong quá trình mô hình hóa cần được ghi rõ, tách biệt với yêu cầu được nêu trực tiếp trong đề bài.
