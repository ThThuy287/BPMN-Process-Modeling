# Exercise 5.20 – Đăng ký khiếu nại bảo hiểm ô tô

## 1. Đề bài

**Exercise 3.21** Model the current business process for receiving and processing insurance claims based on the information collected. Use appropriate pools and lanes to define responsibilities among the relevant parties.

Exercise 5.20 As a process analyst working for a car insurer, you are engaged in a project that aims at improving the company's insurance claim registration process. The first step is to model the as-is process. You have interviewed a few representatives for three key roles participating in this process: a customer service representative from the customer service department, a claims handler from the claims handling department, and a claims manager. The relevant parts of the interview transcripts for each role are provided below.\
Customer service representative:\
"When I receive a claim from a customer, I first check it for completeness. If it is not complete, I ask the customer to complete the missing information and resubmit the claim. When receiving a complete claim, I register it and send it to the claims handling department. I then wait for a notification from the claims manager that a decision has been taken. After receiving this notification, I send a customer satisfaction survey to the customer. If the customer sends back a completed survey, I first add it to our customer satisfaction database. I then have a closer look at it to evaluate if the overall satisfaction indicated by that customer is at least 5 on a scale from 1 to 10. If it is, my job is done. If it is not, all that is left for me to do is to notify the claims manager. If, after sending out the survey to the customer I do not get a response within two months, I make a no reply entry in the customer satisfaction database".\
Claims handler:\
"When I receive a claim from the customer service department, I first check whether the claimant has a valid insurance policy. If not, I inform the claimant that the claim is rejected due to an invalid policy. Otherwise, I evaluate the severity of the claim. Based on the outcome of this evaluation, I send relevant forms to the claimant. I also check whether the form is complete. Only if the form is complete, I register the claim in the claims management system. Otherwise, I ask the claimant to update and complete the form. Upon receiving the updated form, I check it again for completeness. After the claim is registered, I start evaluating it as either simple (for minor car accidents) or complex (for major car accidents). When a claim is complex, I need to additionally retrieve the corresponding car accident report from a police reports database. Based on the claim, and on the police report if required, I calculate an initial claim estimate and create an action plan. Finally, I send both the initial claim estimate and the action plan to the claims manager".\
Claims manager:\
"After receiving an initial claim estimate and action plan from the claims handling department, I make a final decision. Depending on the outcome of the decision (accept or reject), I notify the customer about my decision. I then update the claim file to record this decision and notify the customer service that a decision has been taken. After that, there are two possibilities:
* I receive a notification from the customer service that the results of a customer satisfaction survey indicate that the overall satisfaction of the customer is very low (i.e., less than 5). In this case, I retrieve the corresponding survey and claim from our databases. I analyze them thoroughly to identify whether our internal operations could have been done differently, or could be improved in the future to better satisfy our customers. Finally, I send a letter to the claimant to apologise and promise to provide better services in the future.
* I do not hear back from the customer service within two months. In this case, no further action is required from me."
Next, you took an active role in observing how this process works by acting as the claimant. Using a fake identity (in agreement with the process owner), you triggered this process several times and came up with the following observations.
Claimant:
The claimant completes a claims form and submit it to the customer service of the car insurer. Then the claimant has to wait for a response, which can be either of the following:
* Notification from customer service of the approval of my claim; in this case the claimant does not have to do anything further.
* Request from customer service to provide missing information on the forms, in which case the claimant updates the form and resends it to claims handling.
* Rejection from claims handling; in this case the claimant does not proceed any further with his or her claim.
After submitting a completed form to the claims handling department, the claimant waits for the claims manager to send him or her the final decision about the claim. After that, the claimant receives a customer satisfaction survey from the customer service. The claimant may choose to simply ignore this form. He or she may also choose to fill it out (typically the claimant does so when he or she is not satisfied with the service) and sends it back to the customer service. In this case, the claimant may receive a letter of apology from the claims manager within two months; otherwise the claimant is done.
Using the information above, create a draft BPMN model of the as-is claim registration process. This draft will then be validated with the people that have been interviewed before sign-off by the process owner. Make appropriate assumptions.
Acknowledgement This exercise is adapted from a similar exercise developed by Wasana Bandara, Queensland University of Technology.

## 2. Phân tích nghiệp vụ

### 2.1. Mục tiêu quy trình

Tiếp nhận, kiểm tra, phân loại và xử lý các yêu cầu bồi thường bảo hiểm ô tô từ khách hàng, đồng thời ra quyết định cuối cùng và đo lường mức độ hài lòng của khách hàng đối với dịch vụ.

### 2.2. Pool và Lane

| Thành phần | Vai trò |
| --- | --- |
| Claimant Pool | Người yêu cầu bồi thường (khách hàng), tương tác với quy trình bằng cách gửi khiếu nại ban đầu, điền biểu mẫu, và thực hiện khảo sát.
| Car Insurer Pool | Công ty bảo hiểm ô tô, chứa toàn bộ luồng xử lý chính của quy trình đăng ký và giải quyết khiếu nại.
| Customer service representative Lane | Làn chứa các tác vụ tiếp nhận khiếu nại, kiểm tra tính đầy đủ ban đầu, gửi khảo sát sự hài lòng và đánh giá kết quả khảo sát.
| Claims handler Lane | Làn chứa các tác vụ kiểm tra hợp đồng bảo hiểm, đánh giá mức độ nghiêm trọng/phức tạp của yêu cầu, thu thập báo cáo cảnh sát, và lập bản ước tính bồi thường.
| Claims manager Lane | Làn chứa các tác vụ ra quyết định cuối cùng về việc chấp nhận/từ chối khiếu nại, và xử lý các trường hợp khách hàng có mức độ hài lòng thấp.

### 2.3. Đầu vào và đầu ra

Sự giao tiếp giữa khách hàng và công ty bảo hiểm được thể hiện thông qua các luồng thông điệp (Message Flow):

| Loại | Đối tượng |
| --- | --- |
| Đầu vào | Khiếu nại (claim) ban đầu từ Claimant gửi đến bộ phận chăm sóc khách hàng.
| Đầu vào | Biểu mẫu đã được hoàn thiện/cập nhật từ Claimant.
| Đầu vào | Phản hồi khảo sát sự hài lòng từ Claimant.
| Đầu ra | Yêu cầu hoàn thiện/cập nhật biểu mẫu gửi đến Claimant.
| Đầu ra | Thông báo từ chối khiếu nại do hợp đồng không hợp lệ gửi đến Claimant.
| Đầu ra | Quyết định cuối cùng (chấp nhận/từ chối) gửi đến Claimant.
| Đầu ra | Biểu mẫu khảo sát sự hài lòng của khách hàng gửi đến Claimant.
| Đầu ra | Thư xin lỗi từ Claims manager gửi đến Claimant (trong trường hợp hài lòng thấp).

### 2.4. Quy tắc nghiệp vụ

| Mã | Quy tắc |
| --- | --- |
| BR-01 | Customer service kiểm tra tính đầy đủ của hồ sơ; nếu thiếu, yêu cầu khách hàng bổ sung; nếu đủ, đăng ký và chuyển cho Claims handler.
| BR-02 | Claims handler kiểm tra hợp đồng bảo hiểm; nếu không hợp lệ, hệ thống sẽ gửi thông báo từ chối và quy trình kết thúc.
| BR-03 | Khi hợp đồng hợp lệ, hệ thống đánh giá mức độ nghiêm trọng để gửi các biểu mẫu liên quan cho Claimant.
| BR-04 | Claims handler tiếp nhận và kiểm tra biểu mẫu từ khách hàng; nếu thiếu, tạo vòng lặp yêu cầu cập nhật cho đến khi đầy đủ thì mới đăng ký yêu cầu.
| BR-05 | Khiếu nại sau khi đăng ký được đánh giá mức độ phức tạp; nếu là tai nạn nghiêm trọng (complex), bắt buộc phải thu thập thêm báo cáo từ cơ sở dữ liệu cảnh sát.
| BR-06 | Dựa trên ước tính ban đầu và kế hoạch hành động từ Claims handler, Claims manager sẽ ra quyết định cuối cùng (chấp nhận/từ chối).
| BR-07 | Điểm đánh giá sự hài lòng của khách hàng được tính trên thang 1-10; nếu điểm >= 5, quy trình kết thúc thành công.
| BR-08 | Nếu điểm đánh giá < 5, Claims manager phải phân tích lại hồ sơ và gửi thư xin lỗi cho khách hàng.
| BR-09 | Nếu không nhận được phản hồi khảo sát trong vòng 2 tháng, hệ thống ghi nhận "no reply" và kết thúc xử lý.

### 2.5. Phân tích luồng điều khiển

1. Quy trình bắt đầu khi Customer service nhận được yêu cầu khiếu nại từ Claimant.
2. Tại lane "Customer service representative", tiến hành kiểm tra tính đầy đủ của khiếu nại. Luồng đi tới Exclusive Gateway: nếu thiếu, yêu cầu bổ sung; nếu đủ, đăng ký và chuyển hồ sơ.
3. Luồng điều khiển chuyển sang lane "Claims handler". Tác vụ đầu tiên là kiểm tra tính hợp lệ của hợp đồng bảo hiểm.
4. Tại Exclusive Gateway tiếp theo: nhánh "No" sẽ gửi thông báo từ chối và kết thúc quy trình; nhánh "Yes" tiếp tục đánh giá mức độ nghiêm trọng và gửi biểu mẫu tương ứng cho Claimant.
5. Claims handler kiểm tra biểu mẫu phản hồi từ Claimant qua một vòng lặp Gateway: nếu biểu mẫu chưa đầy đủ, gửi yêu cầu cập nhật; nếu đã đầy đủ, thực hiện đăng ký khiếu nại vào hệ thống.
6. Khiếu nại được đánh giá tính phức tạp. Qua Exclusive Gateway, nhánh "Complex" thực hiện thêm bước lấy báo cáo từ cảnh sát trước khi gộp chung với nhánh "Simple" để tính toán ước tính bồi thường và lập kế hoạch.
7. Luồng chuyển sang lane "Claims manager". Tại đây, quyết định cuối cùng được đưa ra, hồ sơ được cập nhật và thông báo được gửi cho cả khách hàng lẫn Customer service.
8. Luồng quay lại lane "Customer service representative" để gửi khảo sát sự hài lòng cho khách hàng.
9. Dùng Gateway rẽ nhánh dựa trên sự kiện chờ phản hồi: nếu qua 2 tháng không có phản hồi, tạo bản ghi "no reply" và kết thúc. Nếu nhận được khảo sát, kiểm tra điểm số qua Exclusive Gateway.
10. Nhánh điểm ">= 5" dẫn đến kết thúc quy trình; nhánh điểm "< 5" kích hoạt thông báo cho Claims manager.
11. Tại lane "Claims manager", quản lý phân tích hồ sơ khiếu nại và gửi thư xin lỗi cho khách hàng trước khi quy trình chính thức đóng lại.

### 2.6. Định hướng mô hình hóa BPMN

* Sử dụng hai Pool: "Car Insurer" (chứa luồng quy trình thực thi) và "Claimant" (chứa các điểm chạm tương tác độc lập).
* Tổ chức nội bộ Pool "Car Insurer" thành 3 Lane tương ứng với các bộ phận: Customer service representative, Claims handler, và Claims manager.
* Biểu diễn giao tiếp liên hồ (Inter-pool communication) bằng các Message Flow cắt ngang ranh giới giữa Claimant và Car Insurer.
* Ứng dụng các cổng rẽ nhánh Exclusive Gateway để xử lý logic đa dạng: kiểm tra hợp đồng, vòng lặp bổ sung hồ sơ, định tuyến xử lý khiếu nại phức tạp, và đánh giá ngưỡng điểm khảo sát.
* Tích hợp Gateway/Sự kiện phân nhánh theo thời gian (Event-based hoặc logic chờ) để xử lý kịch bản quá hạn 2 tháng không nhận được khảo sát.
* Các hoạt động giao tiếp hai chiều với khách hàng được cấu hình thông qua các tác vụ gửi thông điệp (gửi quyết định, khảo sát, thư xin lỗi) và nhận thông điệp (nhận hồ sơ bổ sung, nhận phản hồi khảo sát).

## 3. Ảnh sơ đồ
<img width="15000" height="5040" alt="5 20" src="https://github.com/user-attachments/assets/ec768646-782e-4178-a1b9-2a7e6af7b892" />
