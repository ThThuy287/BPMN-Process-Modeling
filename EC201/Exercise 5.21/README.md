# Exercise 3.21 – Quy trình xét duyệt hồ sơ cấp tín dụng

## 1. Đề bài

**Exercise 3.21** Model the following business process. Use pools and lanes where needed.

Exercise 5.21 As a process analyst working for a financial institution, you are engaged in a project that aims at improving the company’s credit application process. The first step is to model the as-is process. You have interviewed a few representatives for three key roles participating in this process: customer service, corporate risk assessor and risk management. The relevant parts of the interview transcripts for each role are provided below.\
Customer service:\
“After I receive a credit application from the customer, I check if the application is complete. If the application is incomplete, I send a request for clarification to the customer. Once I receive this clarification, I check the application again for completeness. When I assess the application as complete, I pass it on to a corporate risk assessor. I then prepare some further marketing material (e.g., a selection of investment options) for the customer. After that, I will eventually receive one of the following:\
a A notification of approval from the corporate risk assessor,\
b A notification of rejection from the corporate risk assessor, or\
c A request for clarification from the risk manager.\
In case of (a), I send a credit approval together with the marketing material to the customer, after which the process is finished for me. In case of (b), I send a credit rejection, after which the process is finished for me. In case of (c), I send a request for clarification to the customer. After receiving the clarification, I pass it on to the risk manager. I will then receive again one of the three documents listed above”.\
Corporate risk assessor:\
“When I receive a credit application from the customer service, I first check it. Afterwards, I send it to the risk manager, from whom I then receive either a notification of approval or a notification of rejection. In both cases, I forward the notification to the customer service, after which the process is finished for me”.\
Risk manager:\
“After receiving a credit application from the corporate risk assessor, I check it for completeness. If it is not complete, I send a request for clarification to the customer service. After the customer service responds with a clarification, I check the credit application again. Once an application successfully passes the completeness check, I assess its content. There are three possible outcomes of this assessment:
* The credit application satisfies our criteria for approval. In this case, I send a notification of approval to the corporate risk assessor. Then I formally authorize the credit in our IT systems, after which the process is finished for me.
* The credit application does not satisfy our criteria for approval. In this case, I send a notification of rejection to the corporate risk assessor, after which the process is finished for me.
* Some information in the application is unclear. In this case, I send a request for clarification to the customer service. After receiving the clarification, I assess the content of the credit application once again. This leads to one of the three outcomes listed here”.

Next, you took an active role in observing how this process works by acting as the customer. Using a fake identity (in agreement with the process owner), you triggered this process several times and came up with the following observations.\
Customer:\
To apply for credit, the customer needs to fill out a credit application and send it to the financial institution. They will eventually get a response, which can be either:\
* A credit approval with additional marketing material or a credit rejection. In these two cases, the process is finished for the customer.
* A request for clarification. In this case, the customer can proceed by preparing a clarification and sending it to the financial institution. After that, he or she will get a response that may be a credit approval with additional marketing material, a credit rejection, or again a request for clarification.

Using the information above, create a draft BPMN model of the as-is credit application process. This draft will then be validated with the people that have been interviewed before sign-off by the process owner. Make appropriate assumptions.\
Acknowledgement This exercise is adapted from a similar exercise developed by Wasana Bandara, Queensland University of Technology.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Tiếp nhận, kiểm tra, đánh giá rủi ro và xét duyệt hồ sơ xin cấp tín dụng của khách hàng, đảm bảo hồ sơ đầy đủ thông tin và đáp ứng các tiêu chí phê duyệt của tổ chức tài chính trước khi ra quyết định cuối cùng.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
| --- | --- |
| Customer Pool | Khách hàng, tương tác với quy trình bằng cách nộp hồ sơ xin cấp tín dụng, cung cấp thông tin làm rõ và nhận kết quả xét duyệt.
| Financial institution Pool | Tổ chức tài chính, chứa toàn bộ luồng xử lý chính của quy trình thẩm định và cấp tín dụng.
| Customer service Lane | Bộ phận chăm sóc khách hàng, tiếp nhận hồ sơ ban đầu, kiểm tra tính đầy đủ, chuẩn bị tài liệu tiếp thị và làm đầu mối giao tiếp với khách hàng.
| Corporate risk assessor Lane | Chuyên viên đánh giá rủi ro doanh nghiệp, kiểm tra bước đầu hồ sơ từ Customer service và làm trung gian chuyển tiếp các thông báo quyết định.
| Risk manager Lane | Quản lý rủi ro, đánh giá nội dung hồ sơ, ra quyết định xét duyệt (chấp thuận/từ chối/yêu cầu làm rõ) và ủy quyền tín dụng trên hệ thống IT.

### 2.3. Đầu vào và đầu ra

Sự tương tác giữa khách hàng và tổ chức tài chính được mô hình hóa qua các luồng thông điệp (Message Flow):

| Loại | Đối tượng |
| --- | --- |
| Đầu vào | Hồ sơ xin cấp tín dụng từ Customer.
| Đầu vào | Thông tin làm rõ, bổ sung từ Customer.
| Đầu ra | Yêu cầu làm rõ hồ sơ gửi đến Customer.
| Đầu ra | Quyết định chấp thuận tín dụng kèm tài liệu tiếp thị gửi đến Customer.
| Đầu ra | Quyết định từ chối tín dụng gửi đến Customer.

### 2.4. Quy tắc nghiệp vụ

| Mã | Quy tắc |
| --- | --- |
| BR-01 | Customer service phải kiểm tra tính đầy đủ của hồ sơ; nếu thiếu, phải yêu cầu khách hàng bổ sung cho đến khi hoàn chỉnh.
| BR-02 | Khi hồ sơ đã đầy đủ, Customer service chuyển hồ sơ cho Corporate risk assessor và bắt đầu chuẩn bị các tài liệu tiếp thị.
| BR-03 | Risk manager thực hiện kiểm tra tính đầy đủ lần hai; nếu phát hiện thiếu sót, thông báo cho Customer service để liên hệ khách hàng.
| BR-04 | Dựa trên nội dung hồ sơ, Risk manager đánh giá và đưa ra 1 trong 3 kết quả: Chấp thuận, Từ chối, hoặc Chưa rõ ràng (cần làm rõ).
| BR-05 | Nếu hồ sơ chưa rõ ràng, quy trình tạo vòng lặp yêu cầu làm rõ thông qua Customer service gửi tới khách hàng, sau đó Risk manager sẽ đánh giá lại.
| BR-06 | Nếu hồ sơ được chấp thuận, Risk manager phải thực hiện ủy quyền tín dụng chính thức vào hệ thống IT.
| BR-07 | Mọi quyết định (chấp thuận/từ chối) từ Risk manager đều được gửi cho Corporate risk assessor để chuyển tiếp.
| BR-08 | Customer service là đầu mối cuối cùng gửi thông báo quyết định (kèm tài liệu tiếp thị nếu được duyệt) cho khách hàng.

### 2.5. Phân tích luồng điều khiển

1. Quy trình bắt đầu khi Customer service nhận được hồ sơ xin cấp tín dụng từ khách hàng.

2. Tại lane "Customer service", hệ thống kiểm tra tính đầy đủ qua một Exclusive Gateway: nhánh "Incomplete" tạo vòng lặp gửi yêu cầu làm rõ; nhánh "Complete" đi tiếp.

3. Sau khi hồ sơ hoàn chỉnh, luồng được chia ra để Customer service chuẩn bị tài liệu tiếp thị, đồng thời hồ sơ được chuyển sang lane "Corporate risk assessor".

4. Corporate risk assessor kiểm tra và chuyển tiếp hồ sơ xuống lane "Risk manager".

5. Risk manager kiểm tra tính đầy đủ lần hai. Nếu chưa đạt, luồng quay ngược lại Customer service để yêu cầu khách hàng bổ sung.

6. Nếu đạt, Risk manager tiến hành đánh giá nội dung. Luồng đi qua Exclusive Gateway với 3 nhánh.

7. Nhánh "Some information is unclear": Gửi yêu cầu làm rõ cho Customer service, tạo vòng lặp quay lại bước đánh giá của Risk manager.

8. Nhánh "Satisfies criteria": Gửi thông báo chấp thuận cho Corporate risk assessor, sau đó Risk manager thực hiện ủy quyền trên hệ thống IT và kết thúc vai trò.

9. Nhánh "Does not satisfy criteria": Gửi thông báo từ chối cho Corporate risk assessor và kết thúc vai trò.

10. Corporate risk assessor nhận thông báo từ Risk manager, chuyển tiếp cho Customer service và kết thúc tác vụ tại lane này.

11. Customer service nhận quyết định cuối cùng, tiến hành gửi thông báo (từ chối hoặc chấp thuận kèm tài liệu tiếp thị) cho khách hàng, kết thúc toàn bộ quy trình.

### 2.6. Định hướng mô hình hóa BPMN

* Tổ chức mô hình thành hai Pool chính: "Financial institution" (chứa luồng thực thi chi tiết) và "Customer" (được mô hình hóa các sự kiện phản hồi).
* Chia Pool "Financial institution" thành 3 Lane: "Customer service", "Corporate risk assessor", và "Risk manager" để phân định rõ trách nhiệm.
* Giao tiếp giữa khách hàng và tổ chức được cấu hình bằng các Message Flow thể hiện việc gửi/nhận đơn, yêu cầu làm rõ và thông báo quyết định.
* Cấu hình Exclusive Gateway tại 3 vị trí trọng yếu: kiểm tra đầy đủ tại Customer service, kiểm tra đầy đủ tại Risk manager, và quyết định đánh giá 3 hướng của Risk manager.
* Tại Pool "Customer", có thể sử dụng Event-Based Gateway để bắt các sự kiện phản hồi khác nhau từ tổ chức tài chính (nhận yêu cầu làm rõ, nhận chấp thuận, nhận từ chối).

## 3. Ảnh sơ đồ
<img width="8970" height="5580" alt="5 21" src="https://github.com/user-attachments/assets/27696bcf-d263-4f5d-b0ea-b2f30cadef4a" />
