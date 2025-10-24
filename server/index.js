import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createTheme } from "@mui/material/styles";
import { useState, useMemo, useEffect, createElement } from "react";
import { ThemeProvider as ThemeProvider$1, CssBaseline, useTheme, Box, AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Container, Paper, Alert, TextField, Button, CircularProgress, Autocomplete, Chip } from "@mui/material";
import axios, { AxiosError } from "axios";
import { Menu, Article, ExpandLess, ExpandMore, Widgets, PhotoLibrary, LocalShipping, Sell } from "@mui/icons-material";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const palette = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff"
  },
  secondary: {
    main: "#9c27b0",
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff"
  },
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#ffffff"
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#ffffff"
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#ffffff"
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#ffffff"
  },
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121"
  },
  background: {
    default: "#fafafa",
    paper: "#ffffff"
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  }
};
const typography = {
  fontFamily: [
    "Vazirmatn",
    "Roboto",
    "Arial",
    "sans-serif"
  ].join(","),
  h1: {
    fontSize: "2.125rem",
    fontWeight: 300,
    lineHeight: 1.167
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.2
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: 400,
    lineHeight: 1.167
  },
  h4: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: 1.235
  },
  h5: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.334
  },
  h6: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.6
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "none"
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: "uppercase"
  }
};
const spacing = 8;
const shape = {
  borderRadius: 8
};
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  }
};
const theme = createTheme({
  direction: "rtl",
  palette,
  typography,
  spacing,
  shape,
  breakpoints,
  components: {
    // تنظیمات کامپوننت‌ها
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          direction: "rtl"
        },
        body: {
          direction: "rtl",
          fontFamily: typography.fontFamily
        },
        "*": {
          boxSizing: "border-box"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          textTransform: "none",
          fontWeight: 500
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          elevation: 2
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          margin: "2px 8px",
          "&.Mui-selected": {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
            "&:hover": {
              backgroundColor: palette.primary.dark
            },
            "& .MuiListItemIcon-root": {
              color: palette.primary.contrastText
            }
          }
        }
      }
    }
  }
});
const ThemeProvider = ({ children }) => {
  return (
    // <CacheProvider value={null}>
    //   <MuiThemeProvider theme={theme}>
    //     <CssBaseline />
    //     {children}
    //   </MuiThemeProvider>
    // </CacheProvider>
    /* @__PURE__ */ jsxs(ThemeProvider$1, { theme, children: [
      /* @__PURE__ */ jsx(CssBaseline, {}),
      children
    ] })
  );
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "fa",
    dir: "rtl",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ThemeProvider, {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
var ApiStatus = /* @__PURE__ */ ((ApiStatus2) => {
  ApiStatus2["TRUE"] = "true";
  ApiStatus2["FALSE"] = "false";
  return ApiStatus2;
})(ApiStatus || {});
async function apiUtils(apiCall) {
  try {
    const response = await apiCall();
    if (!response || typeof response !== "object") {
      return {
        status: ApiStatus.FALSE,
        code: 500,
        error: "Invalid response format"
      };
    }
    if (response.status !== ApiStatus.TRUE && response.status !== ApiStatus.FALSE) {
      response.status = response.code >= 200 && response.code < 300 ? ApiStatus.TRUE : ApiStatus.FALSE;
    }
    return response;
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof AxiosError) {
      const responseData = error.response?.data;
      if (responseData && typeof responseData === "object") {
        return {
          status: ApiStatus.FALSE,
          code: error.response?.status || 500,
          error: responseData.error || responseData.message || "Request failed",
          message: responseData.message
        };
      }
      return {
        status: ApiStatus.FALSE,
        code: error.response?.status || 500,
        error: error.message || "Network error occurred"
      };
    }
    return {
      status: ApiStatus.FALSE,
      code: 500,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
const apiUrl$1 = "/api/proxy/api";
const getCategoriesList = async (search, page, limit) => {
  return apiUtils(async () => {
    const response = await axios.get(
      `${apiUrl$1}/v1/categories/list?search=${search}&page=${page}&limit=${limit}`
    );
    return response.data;
  });
};
const getCategories = async (categoryId) => {
  return apiUtils(async () => {
    const response = await axios.get(
      `${apiUrl$1}/v1/categories/get?category_id=${categoryId}&attributes=true&details=true`
    );
    return response.data;
  });
};
const categoriesApi = { getCategories, getCategoriesList };
const Dashboard = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: "HI" }) });
};
const drawerWidth = 280;
const Layout = ({ children }) => {
  const theme2 = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [productTemplatesOpen, setProductTemplatesOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleTemplatesClick = () => {
    setTemplatesOpen(!templatesOpen);
  };
  const handleProductTemplatesClick = () => {
    setProductTemplatesOpen(!productTemplatesOpen);
  };
  const drawer = /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsx(Toolbar, { children: /* @__PURE__ */ jsx(Typography, { variant: "h6", component: "div", sx: { fontWeight: "bold" }, children: "منو" }) }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsxs(List, { children: [
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxs(ListItemButton, { onClick: handleTemplatesClick, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "auto", ml: 1 }, children: /* @__PURE__ */ jsx(Article, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "قالب اطلاعات", sx: { textAlign: "start" } }),
        templatesOpen ? /* @__PURE__ */ jsx(ExpandLess, {}) : /* @__PURE__ */ jsx(ExpandMore, {})
      ] }) }),
      /* @__PURE__ */ jsx(Collapse, { in: templatesOpen, timeout: "auto", unmountOnExit: true, children: /* @__PURE__ */ jsxs(List, { component: "div", disablePadding: true, children: [
        /* @__PURE__ */ jsx(ListItemButton, { sx: { pl: 4 }, children: /* @__PURE__ */ jsx(ListItemText, { primary: "تمام قالب ها" }) }),
        /* @__PURE__ */ jsx(ListItemButton, { sx: { pl: 4 }, children: /* @__PURE__ */ jsx(ListItemText, { primary: "افزودن قالب جدید" }) })
      ] }) }),
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxs(ListItemButton, { onClick: handleProductTemplatesClick, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "auto", ml: 1 }, children: /* @__PURE__ */ jsx(Widgets, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "قالب محصول", sx: { textAlign: "start" } }),
        productTemplatesOpen ? /* @__PURE__ */ jsx(ExpandLess, {}) : /* @__PURE__ */ jsx(ExpandMore, {})
      ] }) }),
      /* @__PURE__ */ jsx(Collapse, { in: productTemplatesOpen, timeout: "auto", unmountOnExit: true, children: /* @__PURE__ */ jsxs(List, { component: "div", disablePadding: true, children: [
        /* @__PURE__ */ jsx(ListItemButton, { sx: { pl: 4 }, children: /* @__PURE__ */ jsx(ListItemText, { primary: "تمام قالب ها" }) }),
        /* @__PURE__ */ jsx(
          ListItemButton,
          {
            sx: { pl: 4 },
            component: Link,
            to: "/templates/attrs/new",
            children: /* @__PURE__ */ jsx(ListItemText, { primary: "افزودن قالب جدید" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxs(ListItemButton, { children: [
        /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "auto", ml: 1 }, children: /* @__PURE__ */ jsx(PhotoLibrary, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "گالری", sx: { textAlign: "start" } })
      ] }) }),
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxs(ListItemButton, { children: [
        /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "auto", ml: 1 }, children: /* @__PURE__ */ jsx(LocalShipping, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "انتقال محصول", sx: { textAlign: "start" } })
      ] }) }),
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxs(ListItemButton, { component: Link, to: "/", children: [
        /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "auto", ml: 1 }, children: /* @__PURE__ */ jsx(Sell, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "محصولات", sx: { textAlign: "start" } })
      ] }) })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(Box, { sx: { display: "flex" }, children: [
    /* @__PURE__ */ jsx(CssBaseline, {}),
    /* @__PURE__ */ jsx(
      AppBar,
      {
        position: "fixed",
        sx: {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` }
        },
        children: /* @__PURE__ */ jsxs(Toolbar, { children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 }, children: "پنل مدیریت" }),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              color: "inherit",
              "aria-label": "open drawer",
              edge: "end",
              onClick: handleDrawerToggle,
              sx: { ml: 2, display: { sm: "none" } },
              children: /* @__PURE__ */ jsx(Menu, {})
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      Box,
      {
        component: "nav",
        sx: { width: { sm: drawerWidth }, flexShrink: { sm: 0 } },
        children: [
          /* @__PURE__ */ jsx(
            Drawer,
            {
              variant: "temporary",
              open: mobileOpen,
              onClose: handleDrawerToggle,
              ModalProps: {
                keepMounted: true
              },
              sx: {
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth
                }
              },
              anchor: "right",
              children: drawer
            }
          ),
          /* @__PURE__ */ jsx(
            Drawer,
            {
              variant: "permanent",
              sx: {
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  right: 0,
                  left: "auto"
                }
              },
              anchor: "right",
              open: true,
              children: drawer
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Box,
      {
        component: "main",
        sx: {
          flexGrow: 1,
          p: 3,
          backgroundColor: theme2.palette.background.default,
          minHeight: "100vh",
          marginLeft: 0
        },
        children: [
          /* @__PURE__ */ jsx(Toolbar, {}),
          children
        ]
      }
    )
  ] });
};
function meta$2() {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  useMemo(() => {
    const fetchCategories = async () => {
      const res = await categoriesApi.getCategories(77);
      if (res.status === ApiStatus.TRUE && res.data) {
        res.data;
      }
    };
    fetchCategories();
  }, []);
  return /* @__PURE__ */ jsx(Layout, {
    children: /* @__PURE__ */ jsx(Dashboard, {})
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const apiUrl = "/api/proxy/api";
const loginApi = async (credentials) => {
  return apiUtils(async () => {
    const response = await axios.post(`${apiUrl}/v1/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  });
};
function meta$1({}) {
  return [{
    title: "Authentication - React Router App"
  }, {
    name: "description",
    content: "Login and register page"
  }];
}
const auth = UNSAFE_withComponentProps(function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");
    const newErrors = {};
    if (!username) {
      newErrors.username = "نام کاربری الزامی است";
    }
    if (!password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (password.length < 3) {
      newErrors.password = "رمز عبور باید حداقل ۳ کاراکتر باشد";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const result = await loginApi({
          username,
          password
        });
        if (result.status === "true") {
          setSuccessMessage("ورود موفقیت آمیز بود!");
          console.log("Login successful:", result.data);
          setUsername("");
          setPassword("");
        } else {
          setApiError(result.error || result.message || "خطایی در ورود رخ داد");
        }
      } catch (error) {
        setApiError("خطای شبکه رخ داد");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return /* @__PURE__ */ jsx(Container, {
    maxWidth: "sm",
    sx: {
      mt: 8
    },
    children: /* @__PURE__ */ jsx(Paper, {
      elevation: 3,
      sx: {
        p: 4
      },
      children: /* @__PURE__ */ jsxs(Box, {
        sx: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        children: [/* @__PURE__ */ jsx(Typography, {
          component: "h1",
          variant: "h4",
          gutterBottom: true,
          children: "ورود به سیستم"
        }), /* @__PURE__ */ jsx(Typography, {
          variant: "body1",
          color: "textSecondary",
          sx: {
            mb: 3
          },
          children: "لطفاً اطلاعات خود را وارد کنید"
        }), successMessage && /* @__PURE__ */ jsx(Alert, {
          severity: "success",
          sx: {
            width: "100%",
            mb: 2
          },
          children: successMessage
        }), apiError && /* @__PURE__ */ jsx(Alert, {
          severity: "error",
          sx: {
            width: "100%",
            mb: 2
          },
          children: apiError
        }), /* @__PURE__ */ jsxs(Box, {
          component: "form",
          onSubmit: handleSubmit,
          sx: {
            width: "100%"
          },
          children: [/* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            margin: "normal",
            id: "username",
            label: "نام کاربری",
            name: "username",
            type: "text",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            error: !!errors.username,
            helperText: errors.username,
            autoComplete: "username",
            autoFocus: true,
            disabled: isLoading
          }), /* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            margin: "normal",
            id: "password",
            label: "رمز عبور",
            name: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            error: !!errors.password,
            helperText: errors.password,
            autoComplete: "current-password",
            disabled: isLoading
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            fullWidth: true,
            variant: "contained",
            sx: {
              mt: 3,
              mb: 2,
              py: 1.5
            },
            disabled: isLoading,
            children: isLoading ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(CircularProgress, {
                size: 20,
                sx: {
                  mr: 1
                }
              }), "در حال ورود..."]
            }) : "ورود"
          })]
        })]
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: auth,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
var AttributeType = /* @__PURE__ */ ((AttributeType2) => {
  AttributeType2["Input"] = "input";
  AttributeType2["Select"] = "select";
  AttributeType2["Checkbox"] = "checkbox";
  AttributeType2["Text"] = "text";
  return AttributeType2;
})(AttributeType || {});
function meta() {
  return [{
    title: "ایجاد قالب محصول جدید"
  }, {
    name: "description",
    content: "صفحه ایجاد قالب محصول جدید"
  }];
}
const _new = UNSAFE_withComponentProps(function NewProductTemplate() {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalCategoryData, setOriginalCategoryData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const filteredAttributes = attributes.filter((attr) => attr.title.toLowerCase().includes(searchTerm.toLowerCase()) || attr.hint.toLowerCase().includes(searchTerm.toLowerCase()));
  const loadCategories = async (search = "") => {
    setLoadingCategories(true);
    try {
      const res = await categoriesApi.getCategoriesList(search, 1, 50);
      if (res.status === ApiStatus.TRUE && res.data) {
        setCategories(res.data.items);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const fetcher = async () => {
    if (!selectedCategory) {
      alert("ابتدا یک دسته‌بندی انتخاب کنید.");
      return;
    }
    setLoading(true);
    try {
      const res = await categoriesApi.getCategories(selectedCategory.id);
      if (res.status === ApiStatus.TRUE && res.data) {
        const data = res.data;
        const categoryGroupAttributes = data.item.attributes.category_group_attributes;
        setOriginalCategoryData(categoryGroupAttributes);
        const allAttributes = [];
        const initialFormData = {};
        Object.values(categoryGroupAttributes).forEach((categoryData) => {
          Object.values(categoryData.attributes).forEach((attr) => {
            allAttributes.push(attr);
            const selectedValues = Object.entries(attr.values).filter(([_, valueData]) => valueData.selected).map(([valueId, _]) => valueId);
            if (selectedValues.length > 0) {
              if (attr.type === AttributeType.Select) {
                initialFormData[attr.id] = selectedValues[0];
              } else if (attr.type === AttributeType.Checkbox) {
                initialFormData[attr.id] = selectedValues;
              }
            }
          });
        });
        setAttributes(allAttributes);
        setFormData((prev) => ({
          ...prev,
          ...initialFormData
        }));
        console.log("Loaded attributes for category:", selectedCategory.title);
        console.log("Attributes:", allAttributes);
        console.log("Initial form data:", initialFormData);
      }
    } catch (error) {
      console.error("Error loading attributes:", error);
      alert("خطا در بارگیری ویژگی‌ها. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (attrId, value) => {
    setFormData((prev) => ({
      ...prev,
      [attrId]: value
    }));
  };
  const isMultiSelect = (attr) => {
    return attr.type === AttributeType.Checkbox;
  };
  const shouldUseAutocomplete = (attr) => {
    const valuesCount = Object.keys(attr.values).length;
    return (attr.type === AttributeType.Select || attr.type === AttributeType.Checkbox) && valuesCount > 0;
  };
  const renderField = (attr) => {
    const fieldId = attr.id.toString();
    switch (attr.type) {
      case AttributeType.Input:
        return /* @__PURE__ */ jsx(TextField, {
          fullWidth: true,
          type: "number",
          label: attr.title + (attr.required ? " *" : ""),
          helperText: attr.hint,
          value: formData[fieldId] || "",
          onChange: (e) => handleInputChange(attr.id, e.target.value),
          required: attr.required,
          InputProps: {
            endAdornment: attr.postfix || attr.unit
          }
        }, attr.id);
      case AttributeType.Select:
      case AttributeType.Checkbox:
        if (shouldUseAutocomplete(attr)) {
          const options = Object.entries(attr.values).map(([valueId, valueData]) => ({
            id: valueId,
            label: valueData.text,
            value: valueId
          }));
          const isMulti = isMultiSelect(attr);
          if (!isMulti) {
            const selectedOption = options.find((option) => option.id === formData[fieldId]) || null;
            return /* @__PURE__ */ jsx(Box, {
              children: /* @__PURE__ */ jsx(Autocomplete, {
                fullWidth: true,
                options,
                getOptionLabel: (option) => option.label,
                value: selectedOption,
                onChange: (_, newValue) => {
                  handleInputChange(attr.id, newValue?.id || "");
                },
                renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
                  ...params,
                  label: attr.title + (attr.required ? " *" : ""),
                  required: attr.required,
                  helperText: attr.hint,
                  placeholder: "انتخاب کنید..."
                }),
                noOptionsText: "گزینه‌ای یافت نشد",
                isOptionEqualToValue: (option, value) => option.id === value.id
              })
            }, attr.id);
          } else {
            const selectedOptions = options.filter((option) => formData[fieldId]?.includes(option.id) || false);
            return /* @__PURE__ */ jsx(Box, {
              children: /* @__PURE__ */ jsx(Autocomplete, {
                multiple: true,
                fullWidth: true,
                options,
                getOptionLabel: (option) => option.label,
                value: selectedOptions,
                onChange: (_, newValues) => {
                  const selectedIds = newValues.map((item) => item.id);
                  handleInputChange(attr.id, selectedIds);
                },
                renderTags: (value, getTagProps) => value.map((option, index) => /* @__PURE__ */ createElement(Chip, {
                  variant: "outlined",
                  label: option.label,
                  ...getTagProps({
                    index
                  }),
                  key: option.id,
                  size: "small"
                })),
                renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
                  ...params,
                  label: attr.title + (attr.required ? " *" : ""),
                  required: attr.required,
                  helperText: attr.hint,
                  placeholder: "انتخاب کنید..."
                }),
                noOptionsText: "گزینه‌ای یافت نشد",
                isOptionEqualToValue: (option, value) => option.id === value.id,
                filterSelectedOptions: true,
                limitTags: 3,
                getLimitTagsText: (more) => `+${more} بیشتر`
              })
            }, attr.id);
          }
        }
        return null;
      case AttributeType.Text:
        return /* @__PURE__ */ jsx(TextField, {
          fullWidth: true,
          multiline: true,
          rows: 3,
          label: attr.title + (attr.required ? " *" : ""),
          helperText: attr.hint,
          value: formData[fieldId] || "",
          onChange: (e) => handleInputChange(attr.id, e.target.value),
          required: attr.required
        }, attr.id);
      default:
        return null;
    }
  };
  const handleSubmit = async () => {
    if (!originalCategoryData) {
      console.error("داده‌های اصلی موجود نیست. ابتدا ویژگی‌ها را لود کنید.");
      alert("ابتدا ویژگی‌ها را لود کنید.");
      return;
    }
    const requiredFields = attributes.filter((attr) => attr.required);
    const missingFields = requiredFields.filter((attr) => {
      const value = formData[attr.id];
      return !value || Array.isArray(value) && value.length === 0;
    });
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map((field) => field.title).join(", ");
      console.error("فیلدهای ضروری خالی:", fieldNames);
      alert(`لطفاً فیلدهای ضروری زیر را تکمیل کنید:
${fieldNames}`);
      return;
    }
    try {
      const postData = JSON.parse(JSON.stringify(originalCategoryData));
      Object.keys(postData).forEach((categoryId) => {
        const categoryData = postData[categoryId];
        Object.keys(categoryData.attributes).forEach((attributeId) => {
          const attr = categoryData.attributes[attributeId];
          const formValue = formData[attr.id];
          if (formValue !== void 0 && formValue !== null && formValue !== "") {
            switch (attr.type) {
              case AttributeType.Input:
              case AttributeType.Text:
                attr.value = formValue.toString();
                break;
              case AttributeType.Select:
                if (formValue && attr.values[formValue]) {
                  const selectedValue = attr.values[formValue];
                  attr.values = {
                    [formValue]: {
                      ...selectedValue,
                      selected: true
                    }
                  };
                }
                break;
              case AttributeType.Checkbox:
                if (Array.isArray(formValue) && formValue.length > 0) {
                  const newValues = {};
                  formValue.forEach((valueId) => {
                    if (attr.values[valueId]) {
                      newValues[valueId] = {
                        ...attr.values[valueId],
                        selected: true
                      };
                    }
                  });
                  attr.values = newValues;
                } else {
                  attr.values = {};
                }
                break;
            }
          } else {
            if (attr.type === AttributeType.Select || attr.type === AttributeType.Checkbox) {
              attr.values = {};
            } else if (attr.type === AttributeType.Input || attr.type === AttributeType.Text) {
              attr.value = "";
            }
          }
        });
      });
      console.log("✅ فرم با موفقیت آماده شد!");
      console.log("📤 داده‌های آماده برای ارسال:");
      console.log(JSON.stringify(postData, null, 2));
      alert("فرم با موفقیت آماده شد! داده‌ها در کنسول قابل مشاهده هستند.");
    } catch (error) {
      console.error("خطا در آماده‌سازی داده‌های فرم:", error);
      alert("خطا در آماده‌سازی فرم. لطفاً دوباره تلاش کنید.");
    }
  };
  return /* @__PURE__ */ jsx(Layout, {
    children: /* @__PURE__ */ jsxs(Box, {
      sx: {
        p: 3
      },
      children: [/* @__PURE__ */ jsx(Typography, {
        variant: "h4",
        gutterBottom: true,
        children: "ایجاد قالب محصول جدید"
      }), /* @__PURE__ */ jsxs(Box, {
        sx: {
          mb: 3
        },
        children: [/* @__PURE__ */ jsx(Typography, {
          variant: "h6",
          gutterBottom: true,
          children: "انتخاب دسته‌بندی محصول"
        }), /* @__PURE__ */ jsx(Box, {
          sx: {
            mb: 2
          },
          children: /* @__PURE__ */ jsx(Autocomplete, {
            fullWidth: true,
            options: categories,
            getOptionLabel: (option) => option.title,
            value: selectedCategory,
            onChange: (_, newValue) => {
              setSelectedCategory(newValue);
              if (newValue !== selectedCategory) {
                setAttributes([]);
                setFormData({});
                setOriginalCategoryData(null);
              }
            },
            onInputChange: (_, newInputValue) => {
              loadCategories(newInputValue);
            },
            loading: loadingCategories,
            renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
              ...params,
              label: "جستجو و انتخاب دسته‌بندی *",
              placeholder: "نام دسته‌بندی را تایپ کنید...",
              helperText: "ابتدا دسته‌بندی مورد نظر را انتخاب کنید"
            }),
            noOptionsText: "دسته‌بندی‌ای یافت نشد",
            loadingText: "در حال جستجو...",
            isOptionEqualToValue: (option, value) => option.id === value.id
          })
        }), /* @__PURE__ */ jsx(Button, {
          variant: "contained",
          color: "primary",
          onClick: fetcher,
          disabled: loading || !selectedCategory,
          fullWidth: true,
          children: loading ? "در حال بارگیری ویژگی‌ها..." : selectedCategory ? `لود ویژگی‌های ${selectedCategory.title}` : "ابتدا دسته‌بندی را انتخاب کنید"
        })]
      }), attributes.length > 0 && /* @__PURE__ */ jsxs(Paper, {
        sx: {
          p: 3
        },
        children: [/* @__PURE__ */ jsxs(Typography, {
          variant: "h6",
          gutterBottom: true,
          children: ["فرم ویژگی‌های محصول (", attributes.length, " مورد)"]
        }), /* @__PURE__ */ jsxs(Box, {
          sx: {
            mb: 3
          },
          children: [/* @__PURE__ */ jsx(TextField, {
            fullWidth: true,
            placeholder: "جستجو در ویژگی‌ها...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            InputProps: {
              startAdornment: "🔍"
            }
          }), searchTerm && /* @__PURE__ */ jsxs(Typography, {
            variant: "caption",
            color: "textSecondary",
            sx: {
              mt: 1,
              display: "block"
            },
            children: [filteredAttributes.length, " نتیجه یافت شد"]
          })]
        }), /* @__PURE__ */ jsx(Box, {
          sx: {
            display: "flex",
            flexDirection: "column",
            gap: 3
          },
          children: filteredAttributes.map((attr) => /* @__PURE__ */ jsx(Box, {
            children: renderField(attr)
          }, attr.id))
        }), filteredAttributes.length === 0 && searchTerm && /* @__PURE__ */ jsx(Box, {
          sx: {
            textAlign: "center",
            py: 4
          },
          children: /* @__PURE__ */ jsxs(Typography, {
            variant: "body2",
            color: "textSecondary",
            children: ['هیچ ویژگی‌ای با عبارت "', searchTerm, '" یافت نشد']
          })
        }), /* @__PURE__ */ jsxs(Box, {
          sx: {
            mt: 3,
            display: "flex",
            gap: 2
          },
          children: [/* @__PURE__ */ jsx(Button, {
            variant: "contained",
            color: "primary",
            onClick: handleSubmit,
            children: "ذخیره فرم"
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outlined",
            onClick: () => setFormData({}),
            children: "پاک کردن فرم"
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outlined",
            onClick: () => setSearchTerm(""),
            disabled: !searchTerm,
            children: "پاک کردن جستجو"
          })]
        })]
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _new,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/djkassets/entry.client-CYUmF4q1.js", "imports": ["/djkassets/chunk-OIYGIGL5-9Mqku_9B.js", "/djkassets/index-BVnVOnvq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/djkassets/root-B08rOfNP.js", "imports": ["/djkassets/chunk-OIYGIGL5-9Mqku_9B.js", "/djkassets/index-BVnVOnvq.js", "/djkassets/DefaultPropsProvider-CJPOi6Xp.js", "/djkassets/CssBaseline-Dhze5Z2K.js"], "css": ["/djkassets/root-Cwph8PAg.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/djkassets/home-DzfUrFYd.js", "imports": ["/djkassets/chunk-OIYGIGL5-9Mqku_9B.js", "/djkassets/AppLayout-DDwbYBiC.js", "/djkassets/apiUtils.api-CQx0T3Pf.js", "/djkassets/CssBaseline-Dhze5Z2K.js", "/djkassets/DefaultPropsProvider-CJPOi6Xp.js", "/djkassets/index-BVnVOnvq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth": { "id": "routes/auth", "parentId": "root", "path": "/auth", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/djkassets/auth-EVLEwMnb.js", "imports": ["/djkassets/chunk-OIYGIGL5-9Mqku_9B.js", "/djkassets/apiUtils.api-CQx0T3Pf.js", "/djkassets/DefaultPropsProvider-CJPOi6Xp.js", "/djkassets/TextField-wn9Em8gP.js", "/djkassets/index-BVnVOnvq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_templates/attrs/new": { "id": "routes/_templates/attrs/new", "parentId": "root", "path": "/templates/attrs/new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/djkassets/new-DUuQGfJ7.js", "imports": ["/djkassets/chunk-OIYGIGL5-9Mqku_9B.js", "/djkassets/AppLayout-DDwbYBiC.js", "/djkassets/apiUtils.api-CQx0T3Pf.js", "/djkassets/DefaultPropsProvider-CJPOi6Xp.js", "/djkassets/TextField-wn9Em8gP.js", "/djkassets/CssBaseline-Dhze5Z2K.js", "/djkassets/index-BVnVOnvq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/djkassets/manifest-f41e50a0.js", "version": "f41e50a0", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/djk";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/auth": {
    id: "routes/auth",
    parentId: "root",
    path: "/auth",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_templates/attrs/new": {
    id: "routes/_templates/attrs/new",
    parentId: "root",
    path: "/templates/attrs/new",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
