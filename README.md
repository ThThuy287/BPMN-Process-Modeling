# BPMN Process Modeling

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

---

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

*(Sơ đồ không biểu diễn các đối tượng dữ liệu đầu ra cụ thể bằng ký hiệu Data Object, kết quả cuối cùng chỉ được ghi nhận bằng sự kiện kết thúc "Process completed".)*

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
---

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
---

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
