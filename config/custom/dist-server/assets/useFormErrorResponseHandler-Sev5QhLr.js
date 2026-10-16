import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { a as showError } from "./notifications-Coh3Ef-t.js";
const useFormErrorResponseHandler = () => {
  return (form, error, errorMessage = i18n._(
    /*i18n*/
    {
      id: "FJ9Yat"
    }
  )) => {
    var _a, _b, _c, _d, _e;
    if ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) {
      form.setErrors(error.response.data.errors);
    }
    if (((_c = error == null ? void 0 : error.response) == null ? void 0 : _c.status) && error.response.status >= 500) {
      showError(/* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: i18n._(
          /*i18n*/
          {
            id: "68Axnm"
          }
        ) }),
        /* @__PURE__ */ jsxs("p", { style: {
          fontSize: "0.8rem",
          color: "#ccc"
        }, children: [
          "Error: ",
          error.response.status
        ] }),
        ((_d = error.response.data) == null ? void 0 : _d.message) && /* @__PURE__ */ jsx("p", { style: {
          fontSize: "0.8rem",
          color: "#ccc"
        }, children: error.response.data.message })
      ] }));
      return;
    }
    if (((_e = error == null ? void 0 : error.response) == null ? void 0 : _e.status) && error.response.status >= 400) {
      showError(errorMessage);
      return;
    }
    showError(i18n._(
      /*i18n*/
      {
        id: "byKna+"
      }
    ));
  };
};
export {
  useFormErrorResponseHandler as u
};
