# BPMN Process Modeling

## 1. Introduction

This repository documents the analysis and modeling of business processes using Business Process Model and Notation (BPMN).

Each exercise is organized into two main parts:

1. **Problem Statement:** The original business scenario and modeling requirements.
2. **Business Process Analysis:** A structured analysis of the process, including participants, activities, business rules, decision points, inputs, outputs, and control flow.

The purpose is to translate textual business requirements into structured process models and demonstrate business process analysis skills relevant to Business Analysis (BA).

---

# 2. Exercise 3.16 – Damage Compensation Process

## 2.1. Problem Statement

**Task:** Model the control flow of the following business process for damage compensation.

If a tenant is evicted because of damages to the premises, a process needs to be started by the tribunal in order to hold a hearing to assess the amount of compensation the tenant owes to the owner of the premises.

This process starts when a cashier of the tribunal receives a request for compensation from the owner. The cashier then retrieves the file for those particular premises and checks that the request is both acceptable for filing and compliant with the description of the premises on file.

After these checks, the cashier needs to set a hearing date. Setting a hearing date incurs fees to the owner.

- If the owner has already paid the fees with the request, the cashier allocates a hearing date and the process completes.
- If additional fees are required, but the owner has already paid those fees, the cashier generates a receipt for the additional fees and proceeds with allocating the hearing date.
- If the owner has not paid the required fees, the cashier produces a fees notice and waits for the owner to pay the fees before reassessing the document compliance.

## 2.2. Business Process Analysis

### A. Process Objective

To process a compensation request, verify its compliance with the premises records, ensure that the required fees are paid, and allocate a hearing date.

### B. Process Participants

| Participant | Responsibility |
|---|---|
| Owner | Submits the compensation request and pays the required fees |
| Tribunal Cashier | Retrieves records, checks documents, handles fees, issues receipts or notices, and allocates the hearing date |
| Tribunal | Provides the administrative context in which the process takes place |

For the control-flow model, the owner can be represented as an external participant if interactions with the owner need to be shown explicitly. Otherwise, the model can focus on the cashier's internal workflow.

### C. Process Inputs and Outputs

| Type | Business Object |
|---|---|
| Input | Compensation request |
| Input | Premises file |
| Input | Fee payment information |
| Output | Fee receipt, if additional fees have been paid |
| Output | Fee notice, if payment is outstanding |
| Output | Allocated hearing date |

### D. Main Activities

1. Receive compensation request.
2. Retrieve premises file.
3. Check request acceptability and compliance with the premises description.
4. Determine the required fees and whether payment is sufficient.
5. Generate a receipt if additional fees have already been paid.
6. Issue a fee notice if payment is outstanding.
7. Wait for payment and reassess document compliance when required.
8. Allocate a hearing date.
9. End the process.

### E. Business Rules

| ID | Business Rule |
|---|---|
| BR-01 | The process starts when the tribunal cashier receives a compensation request. |
| BR-02 | The premises file must be retrieved to support the document compliance check. |
| BR-03 | The request must be acceptable for filing and compliant with the premises description on file. |
| BR-04 | A hearing date can be allocated after the applicable fee requirements have been satisfied. |
| BR-05 | If the original payment is sufficient, the cashier allocates a hearing date directly. |
| BR-06 | If additional fees have already been paid, the cashier generates a receipt before allocating the hearing date. |
| BR-07 | If the required fees have not been paid, the cashier issues a fee notice and waits for payment. |
| BR-08 | After the outstanding payment is received, document compliance is reassessed. |

### F. Control Flow Analysis

The process can be divided into the following stages:

1. **Request intake:** Receive the request and retrieve the premises file.
2. **Document verification:** Check acceptability and compliance.
3. **Fee assessment:** Determine whether the initial payment is sufficient, additional fees have been paid, or payment remains outstanding.
4. **Payment handling:** Issue a receipt or fee notice where applicable.
5. **Hearing scheduling:** Allocate the hearing date once the applicable fee requirements have been satisfied.

The model should use an exclusive gateway to represent alternative fee-payment outcomes. The outstanding-payment path includes a wait state and a return flow to the document compliance check after payment.

### G. BPMN Modeling Decisions

| BPMN Element | Application |
|---|---|
| Start Event | Compensation request received |
| Task | Retrieve premises file |
| Task | Check request acceptability and document compliance |
| Exclusive Gateway | Determine the applicable fee-payment outcome |
| Task | Generate receipt for additional fees |
| Task | Produce fee notice |
| Intermediate Catch Event or equivalent waiting representation | Required payment received |
| Task | Reassess document compliance |
| Task | Allocate hearing date |
| End Event | Hearing date allocated and process completed |

**Modeling note:** The exercise explicitly describes the document compliance check and the fee-payment alternatives. The precise gateway conditions and the placement of the compliance loop should be made explicit in the diagram.

---

# 3. Exercise 3.17 – Damage Compensation with Business Objects

## 3.1. Problem Statement

**Task:** Extend the model of Exercise 3.16 by adding the business objects involved in the process.

The business scenario is the same as Exercise 3.16. The extension focuses on the information and documents used or produced by the process.

## 3.2. Business Process Analysis

### A. Business Objects

| Business Object | Role in the Process |
|---|---|
| Compensation Request | Submitted by the owner to initiate the process |
| Premises File | Retrieved by the cashier for verification |
| Premises Description | Used to check consistency with the compensation request |
| Fee Payment Information | Used to determine whether the required fees have been paid |
| Fee Receipt | Generated when additional fees have already been paid |
| Fee Notice | Issued when payment is outstanding |
| Hearing Date Information | Produced when a hearing date is allocated |

### B. Data Associations

The BPMN diagram should show which activities use or produce each business object.

- The compensation request is an input to the intake and verification activities.
- The premises file and premises description support document compliance checks.
- Fee payment information supports the fee assessment decision.
- The fee receipt is an output of the receipt-generation task.
- The fee notice is an output of the fee-notification task.
- Hearing date information is produced by the scheduling task.

### C. Modeling Decisions

Use BPMN Data Objects and Data Associations to represent the relationship between activities and business information. Sequence Flows should continue to represent the order of process execution; data associations should not replace sequence flows.

---

# 4. Exercise 3.18 – Damage Compensation with Resources

## 4.1. Problem Statement

**Task:** Extend the model of Exercise 3.17 by adding the involved resources. Determine whether any non-human resource is involved.

## 4.2. Business Process Analysis

### A. Resources

| Resource | Type | Role |
|---|---|---|
| Tribunal Cashier | Human | Performs the administrative activities |
| Owner | Human | Submits the request and makes payments |
| Tribunal Records System or Filing Repository | Potential non-human resource | Stores or provides access to premises records, if represented as a system or repository |
| Payment Processing System | Potential non-human resource | Supports payment verification, if such a system is assumed or documented |

**Important:** The scenario explicitly identifies the cashier and owner but does not specify particular software systems. A records system or payment system should only be included as an assumed resource when the modeling scope allows such assumptions.

### B. Resource Assignment

Assign the cashier to the relevant tasks, such as retrieving the file, checking documents, generating notices, issuing receipts, and allocating the hearing date.

The owner participates in submitting the request and paying outstanding fees. If the owner is modeled in a separate pool, communication and payment interactions can be represented explicitly.

### C. Answer to the Question

Yes, non-human resources may be involved, such as a records repository or payment processing system. However, the scenario does not explicitly identify these systems. The distinction between resources stated in the requirements and resources introduced as modeling assumptions should be maintained.

---

# 5. Exercise 3.19 – Court Hearing Preparation

## 5.1. Problem Statement

**Task:** Model the following business process. Use gateways and data objects where needed.

In a court each morning the files that have yet to be processed are checked to make sure they are in order for the court hearing that day.

If some files are missing a search is initiated, otherwise the files can be physically tracked to the intended location.

Once all the files are ready, these are handed to the associate. In the meantime the judge's lawlist is distributed to the relevant people. Afterwards, the directions hearings are conducted.

## 5.2. Business Process Analysis

### A. Process Objective

Prepare the required case files and distribute the judge's lawlist so that directions hearings can be conducted.

### B. Participants and Responsibilities

| Participant | Responsibility |
|---|---|
| Court Staff | Check files, initiate searches for missing files, and track files to the intended location |
| Associate | Receives the prepared files |
| Court Administration or Responsible Staff | Distributes the judge's lawlist to relevant people |
| Judge or Hearing Personnel | Conducts directions hearings |

The scenario does not specify all role assignments in detail. Any additional role allocation should be treated as a modeling assumption.

### C. Process Inputs and Outputs

| Type | Business Object |
|---|---|
| Input | Case files requiring processing |
| Input | Judge's lawlist |
| Output | Prepared case files |
| Output | Distributed lawlist |
| Output | Directions hearings conducted |

### D. Control Flow Analysis

1. Start the morning preparation process.
2. Check the case files required for that day's hearings.
3. Use an exclusive gateway to determine whether files are missing.
4. If files are missing, initiate a search.
5. If no files are missing, physically track the files to their intended location.
6. Ensure that all required files are ready.
7. Hand the prepared files to the associate.
8. In parallel with file preparation, distribute the judge's lawlist.
9. Synchronize the relevant branches before conducting directions hearings.
10. End the process.

### E. BPMN Modeling Decisions

- Use an Exclusive Gateway for the missing-file decision.
- Use a Parallel Gateway to represent the independent file-preparation and lawlist-distribution activities.
- Use a synchronization gateway before the directions hearings if both branches must be completed first.
- Represent the case files and lawlist as Data Objects where appropriate.

The file-handling branch must distinguish between the two alternatives described in the scenario. If the search activity requires additional behavior, such as repeatedly checking whether the files have been found, that behavior should only be added if justified by the requirements.

---

# 6. Exercise 3.20 – Motor Claim Handling

## 6.1. Problem Statement

**Task:** Model the following business process. Use pools and lanes where needed.

The motor claim handling process starts when a customer submits a claim with the relevant documentation.

The notification department at the car insurer checks the documents upon completeness and registers the claim. Next, the Handling department picks up the claim and checks the insurance.

Then, an assessment is performed. If the assessment is positive, a garage is phoned to authorize the repairs and the payment is scheduled, in this order. Otherwise, the claim is rejected.

In any case, whether the outcome is positive or negative, a letter is sent to the customer and the process is considered to be complete.

## 6.2. Business Process Analysis

### A. Process Objective

Process motor insurance claims, verify policy coverage, assess the claim, determine the outcome, and notify the customer.

### B. Pools and Lanes

| BPMN Participant | Suggested Representation |
|---|---|
| Customer | Separate pool |
| Car Insurer | Pool containing internal lanes |
| Notification Department | Lane within the insurer pool |
| Handling Department | Lane within the insurer pool |
| Garage | Separate pool if explicit external interaction is modeled |

### C. Process Inputs and Outputs

| Type | Business Object |
|---|---|
| Input | Motor insurance claim |
| Input | Supporting documentation |
| Input | Insurance policy information |
| Output | Registered claim |
| Output | Claim assessment result |
| Output | Repair authorization communication, where approved |
| Output | Scheduled payment, where approved |
| Output | Claim rejection, where not approved |
| Output | Customer notification letter |

### D. Main Activities

1. Customer submits the claim and supporting documentation.
2. Notification Department checks document completeness.
3. Notification Department registers the claim.
4. Handling Department retrieves the claim.
5. Handling Department checks insurance coverage.
6. Assess the claim.
7. Determine whether the assessment is positive.
8. If positive, phone the garage to authorize repairs.
9. Schedule payment after repair authorization.
10. If negative, reject the claim.
11. Send a letter to the customer regardless of the outcome.
12. End the process.

### E. Business Rules

| ID | Business Rule |
|---|---|
| BR-01 | The process starts when a customer submits a claim with supporting documentation. |
| BR-02 | The Notification Department checks document completeness and registers the claim. |
| BR-03 | The Handling Department checks the insurance before the claim assessment. |
| BR-04 | A positive assessment leads to garage authorization followed by payment scheduling. |
| BR-05 | A negative assessment leads to claim rejection. |
| BR-06 | A customer notification letter is sent for both positive and negative outcomes. |

### F. Control Flow Analysis

The insurer's internal workflow can be modeled in a single pool with separate lanes for the Notification Department and Handling Department.

Use an Exclusive Gateway after claim assessment:

- **Positive:** Phone the garage, authorize repairs, then schedule payment.
- **Negative:** Reject the claim.

The alternative paths should merge before the customer letter is sent, ensuring that both outcomes lead to the same final notification activity.

Use Message Flows between separate pools for interactions with the customer and, where appropriate, the garage. Sequence Flows must remain within a pool.

---

# 7. Exercise 3.21 – Insurance Claim Assessment

## 7.1. Problem Statement

**Task:** Model the following business process. Use pools and lanes where needed.

When a claim is received, a claims officer first checks if the claimant is insured.

If not, the claimant is informed that the claim must be rejected by sending an automatic notification via an SAP system.

Otherwise, a senior claims officer evaluates the severity of the claim. Based on the outcome, simple or complex claims, the relevant forms are sent to the claimant, again using the SAP system.

Once the forms are returned, they are checked for completeness by the claims officer. If the forms provide all relevant details, the claim is registered in the claims management system, and the process ends. Otherwise, the claimant is informed to update the forms via the SAP system.

Upon reception of the updated forms, they are checked again by the claims officer to see if the details have been provided.

## 7.2. Business Process Analysis

### A. Process Objective

Determine claimant eligibility, classify claim severity, collect complete claim information, and register eligible claims.

### B. Pools and Lanes

| BPMN Participant | Suggested Representation |
|---|---|
| Claimant | Separate pool |
| Insurance Organization | Pool containing internal lanes |
| Claims Officer | Lane |
| Senior Claims Officer | Lane |
| SAP System | System resource or service task, not necessarily a separate pool |
| Claims Management System | System resource or service task, not necessarily a separate pool |

SAP and the claims management system should not automatically be modeled as independent pools. Use service tasks or other appropriate task types when they support activities performed within the insurance organization's process.

### C. Process Inputs and Outputs

| Type | Business Object |
|---|---|
| Input | Insurance claim |
| Input | Insurance eligibility information |
| Input | Claim severity information |
| Input | Claim forms |
| Output | Automatic rejection notification |
| Output | Simple-claim or complex-claim forms |
| Output | Updated claim forms |
| Output | Registered claim |

### D. Business Rules

| ID | Business Rule |
|---|---|
| BR-01 | The Claims Officer checks insurance eligibility first. |
| BR-02 | If the claimant is not insured, the process sends an automatic notification stating that the claim must be rejected. |
| BR-03 | If the claimant is insured, the Senior Claims Officer evaluates claim severity. |
| BR-04 | The appropriate forms are sent according to whether the claim is simple or complex. |
| BR-05 | The Claims Officer checks returned forms for completeness. |
| BR-06 | Complete forms lead to claim registration. |
| BR-07 | Incomplete forms lead to a request for updated information. |
| BR-08 | Updated forms are checked again for completeness. |

### E. Control Flow Analysis

1. Receive the claim.
2. Check whether the claimant is insured.
3. If not insured, send an automatic notification through SAP and end the process.
4. If insured, evaluate claim severity.
5. Select the relevant forms for a simple or complex claim.
6. Send the forms through SAP.
7. Wait for the claimant to return the forms.
8. Check the forms for completeness.
9. If complete, register the claim in the claims management system and end the process.
10. If incomplete, request updated forms through SAP.
11. Wait for the updated forms.
12. Check the updated forms again.

### F. BPMN Modeling Decisions

- Use an Exclusive Gateway for insurance eligibility.
- Use an Exclusive Gateway for the simple-versus-complex claim classification.
- Use an Exclusive Gateway for form completeness.
- Represent the return of forms and updated forms using appropriate message or intermediate events.
- Model the update-and-recheck path as a loop.
- Use a service task or equivalent system-supported activity for SAP notifications and claim registration, depending on the modeling convention adopted.

**Modeling consideration:** The exercise does not explicitly state what happens if the updated forms are still incomplete. The diagram should show the repeated check without inventing a new rejection outcome. The loop can continue until the required details are provided unless additional requirements specify otherwise.

---

# 8. Exercise 3.23 – Prescription Fulfillment

## 8.1. Problem Statement

**Task 1:** Model the prescription fulfillment process described in Exercise 1.6 (page 30). Use subprocesses where required, and nest them appropriately.

**Task 2:** Determine whether any subprocess can potentially be shared with other business processes of the same pharmacy or with other pharmacies, for example as part of a consortium.

**Source limitation:** The detailed description of Exercise 1.6 is not included in this repository's current problem statement. The complete original scenario must be added before a detailed, evidence-based process analysis can be finalized.

## 8.2. Business Process Analysis

### A. Analysis Objective

Decompose the prescription fulfillment process into manageable subprocesses and identify opportunities for reuse.

### B. Information Required

Before modeling the complete process, identify:

- How a prescription is received.
- Which checks are required before fulfillment.
- Which participants perform the activities.
- How medicines are prepared, dispensed, and handed over.
- Whether payment, insurance, or inventory checks are included.
- How exceptions are handled.
- What conditions define successful completion.

These details must be taken from Exercise 1.6 rather than assumed.

### C. Subprocess Decomposition

The subprocess structure should be determined after reviewing the complete scenario. A candidate structure may include prescription intake, prescription validation, medicine preparation, and dispensing, but these are preliminary modeling possibilities rather than confirmed requirements.

### D. Potentially Reusable Subprocesses

Depending on the original requirements, potentially reusable subprocesses could include:

- Prescription data validation.
- Medicine availability checking.
- Inventory management.
- Payment processing.
- Customer notification.
- Prescription record management.

The reuse analysis should distinguish between subprocesses that are genuinely common across workflows and activities that require pharmacy-specific rules or clinical decisions.

### E. Reuse Across Pharmacies

A shared subprocess could be implemented as a standardized procedure or service used by multiple pharmacies. A consortium might share selected administrative or technical processes, provided that the relevant operational, regulatory, and data-access requirements are satisfied.

The final answer should identify specific reusable subprocesses and justify each choice using the actual Exercise 1.6 scenario.

---

# 9. Overall Learning Outcomes

The exercises develop practical skills in:

- Translating textual requirements into BPMN diagrams.
- Identifying participants, responsibilities, inputs, outputs, and business rules.
- Modeling conditional and parallel control flows.
- Representing data objects and resource assignments.
- Modeling external communications using pools and Message Flows.
- Handling loops, waiting states, and rework.
- Decomposing complex workflows into nested subprocesses.
- Evaluating opportunities for process reuse.

## 10. Repository Scope

This repository is intended for educational purposes and as a practical record of BPMN modeling and business process analysis.

Each exercise should include the problem statement, process analysis, BPMN diagram, and any assumptions made during modeling. The analysis should remain traceable to the original scenario, with assumptions clearly distinguished from stated requirements.
