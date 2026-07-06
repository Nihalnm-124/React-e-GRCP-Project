import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApprovalTable from "../../components/approval/ApprovalTable";

jest.mock("../../services/approvalService", () => ({
  approveRequest: jest.fn(() => Promise.resolve()),
  rejectRequest: jest.fn(() => Promise.resolve()),
  sendBackRequest: jest.fn(() => Promise.resolve()),
  delegateRequest: jest.fn(() => Promise.resolve()),
}));

import {
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
} from "../../services/approvalService";

jest.mock("../../components/approval/ApproveDialog", () => (props) =>
  props.open ? (
    <button onClick={props.onConfirm}>Approve Confirm</button>
  ) : null
);

jest.mock("../../components/approval/RejectDialog", () => (props) =>
  props.open ? (
    <button onClick={props.onConfirm}>Reject Confirm</button>
  ) : null
);

jest.mock("../../components/approval/SendBackDialog", () => (props) =>
  props.open ? (
    <button onClick={props.onConfirm}>SendBack Confirm</button>
  ) : null
);

jest.mock("../../components/approval/DelegateDialog", () => (props) =>
  props.open ? (
    <button onClick={() => props.onConfirm("Manager")}>
      Delegate Confirm
    </button>
  ) : null
);

const refresh = jest.fn();

const rows = [
  {
    id: 1,
    title: "Laptop Purchase",
    requester: "John",
    department: "IT",
    amount: 50000,
    priority: "High",
    status: "Pending",
    date: "2026-07-01",
  },
  {
    id: 2,
    title: "Software License",
    requester: "Alice",
    department: "Finance",
    amount: 25000,
    priority: "Low",
    status: "Approved",
    date: "2026-07-02",
  },
];

describe("ApprovalTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table", () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);
    expect(screen.getByText("Laptop Purchase")).toBeInTheDocument();
    expect(screen.getByText("Software License")).toBeInTheDocument();
  });

  test("opens and closes view dialog", () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(
      screen.getByText(/Approval Details/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(
      screen.queryByText(/Approval Details/i)
    ).not.toBeInTheDocument();
  });

  test("sort works", () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);
    fireEvent.click(screen.getByText("Title"));
    fireEvent.click(screen.getByText("Title"));
  });

  test("approve request", async () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);
    fireEvent.click(screen.getByText("Approve Confirm"));

    await waitFor(() => {
      expect(approveRequest).toHaveBeenCalledWith(1);
      expect(refresh).toHaveBeenCalled();
    });
  });

  test("reject request", async () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[2]);
    fireEvent.click(screen.getByText("Reject Confirm"));

    await waitFor(() => {
      expect(rejectRequest).toHaveBeenCalledWith(1);
      expect(refresh).toHaveBeenCalled();
    });
  });

  test("send back request", async () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[3]);
    fireEvent.click(screen.getByText("SendBack Confirm"));

    await waitFor(() => {
      expect(sendBackRequest).toHaveBeenCalledWith(1);
      expect(refresh).toHaveBeenCalled();
    });
  });

  test("delegate request", async () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[4]);
    fireEvent.click(screen.getByText("Delegate Confirm"));

    await waitFor(() => {
      expect(delegateRequest).toHaveBeenCalledWith(
        1,
        "Manager"
      );
      expect(refresh).toHaveBeenCalled();
    });
  });

  test("renders priority chips", () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  test("renders status chips", () => {
    render(<ApprovalTable rows={rows} refresh={refresh} />);

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });
});