import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#2563eb",
      },

      secondary: {
        main: "#7c3aed",
      },

      success: {
        main: "#16a34a",
      },

      warning: {
        main: "#f59e0b",
      },

      error: {
        main: "#dc2626",
      },

      info: {
        main: "#0284c7",
      },

      background: {
        default:
          mode === "light"
            ? "#f8fafc"
            : "#0f172a",

        paper:
          mode === "light"
            ? "#ffffff"
            : "#1e293b",
      },

      text: {
        primary:
          mode === "light"
            ? "#1e293b"
            : "#f8fafc",

        secondary:
          mode === "light"
            ? "#64748b"
            : "#cbd5e1",
      },
    },

    shape: {
      borderRadius: 14,
    },

    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "sans-serif",
      ].join(","),

      h4: {
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },

      h5: {
        fontWeight: 700,
      },

      h6: {
        fontWeight: 600,
      },

      subtitle1: {
        fontWeight: 600,
      },

      button: {
        fontWeight: 600,
        textTransform: "none",
      },

      body1: {
        fontSize: "0.95rem",
      },

      body2: {
        fontSize: "0.85rem",
      },
    },

    components: {

      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              "0 8px 24px rgba(15,23,42,0.08)",
            transition: "0.25s",

            "&:hover": {
              boxShadow:
                "0 12px 30px rgba(15,23,42,0.12)",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              "0 4px 18px rgba(15,23,42,0.06)",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {

          root: {
            borderRadius: 10,
            paddingLeft: 18,
            paddingRight: 18,
            textTransform: "none",
            fontWeight: 600,
          },

          contained: {
            boxShadow: "none",

            "&:hover": {
              boxShadow:
                "0 6px 16px rgba(37,99,235,.25)",
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },

      // ⭐ Fixed Table Header
      MuiTableHead: {
  styleOverrides: {
    root: {
      backgroundColor: "#059669",

      "& .MuiTableCell-head": {
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "15px",
      },
    },
  },
},

      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "15px",
            borderBottom: "none",
          },

          body: {
            fontSize: "14px",
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 18,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: "none",
            boxShadow:
              "4px 0 16px rgba(0,0,0,.06)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? "#ffffff"
                : "#1e293b",

            color:
              mode === "light"
                ? "#1e293b"
                : "#ffffff",

            boxShadow:
              "0 2px 12px rgba(0,0,0,.06)",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: 12,
          },
        },
      },

      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  });