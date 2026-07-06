import reportReducer, {
  setReports,
  addReport,
  updateReport,
  deleteReport,
} from "../../store/slices/reportSlice";

describe("reportSlice", () => {

  const initialState = {
    reports: [],
  };

  test("should return initial state", () => {

    expect(
      reportReducer(undefined, {
        type: undefined,
      })
    ).toEqual(initialState);

  });

  test("should set reports", () => {

    const reports = [
      {
        id: 1,
        title: "Compliance Report",
      },
      {
        id: 2,
        title: "Risk Report",
      },
    ];

    const state = reportReducer(
      initialState,
      setReports(reports)
    );

    expect(state.reports).toEqual(
      reports
    );

  });

  test("should add report", () => {

    const report = {
      id: 3,
      title: "Audit Report",
    };

    const state = reportReducer(
      initialState,
      addReport(report)
    );

    expect(state.reports).toHaveLength(1);

    expect(state.reports[0]).toEqual(
      report
    );

  });

  test("should update report", () => {

    const stateBefore = {

      reports: [

        {
          id: 1,
          title: "Old Report",
        },

      ],

    };

    const updatedReport = {

      id: 1,

      title: "Updated Report",

    };

    const state = reportReducer(
      stateBefore,
      updateReport(updatedReport)
    );

    expect(
      state.reports[0].title
    ).toBe("Updated Report");

  });

  test("should delete report", () => {

    const stateBefore = {

      reports: [

        {
          id: 1,
          title: "Report One",
        },

        {
          id: 2,
          title: "Report Two",
        },

      ],

    };

    const state = reportReducer(
      stateBefore,
      deleteReport(1)
    );

    expect(state.reports).toHaveLength(1);

    expect(state.reports[0].id).toBe(2);

  });

});