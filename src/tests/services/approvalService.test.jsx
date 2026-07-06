import {
  getApprovals,
  searchApprovals,
  filterApprovalStatus,
  addApproval,
  updateApproval,
  deleteApproval,
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
} from "../../services/approvalService";

describe("approvalService", () => {

  test("get approvals", async () => {

    const data =
      await getApprovals();

    expect(Array.isArray(data)).toBe(true);

  });

  test("search approvals", async () => {

    const result =
      await searchApprovals("");

    expect(Array.isArray(result)).toBe(true);

  });

  test("filter status", async () => {

    const result =
      await filterApprovalStatus(
        "All"
      );

    expect(Array.isArray(result)).toBe(true);

  });

  test("add approval", async () => {

    const item =
      await addApproval({

        title: "Demo",

        requester: "Admin",

      });

    expect(item.title).toBe("Demo");

  });

  test("update approval", async () => {

    expect(
      await updateApproval(
        1,
        {
          title: "Updated",
        }
      )
    ).toBe(true);

  });

  test("delete approval", async () => {

    expect(
      await deleteApproval(1)
    ).toBe(true);

  });

  test("approve request", async () => {

    expect(
      await approveRequest(1)
    ).toBe(true);

  });

  test("reject request", async () => {

    expect(
      await rejectRequest(1)
    ).toBe(true);

  });

  test("send back", async () => {

    expect(
      await sendBackRequest(1)
    ).toBe(true);

  });

  test("delegate", async () => {

    expect(
      await delegateRequest(
        1,
        "Manager"
      )
    ).toBe(true);

  });

});