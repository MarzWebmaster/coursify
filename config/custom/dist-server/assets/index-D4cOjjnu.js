import { jsx, jsxs } from "react/jsx-runtime";
import { InputLabel, Skeleton } from "@mantine/core";
import { useSyncExternalStore, useEffect } from "react";
import classNames from "classnames";
const createLazyModule = (importModule) => {
  let loaded = null;
  let pending = null;
  const listeners = /* @__PURE__ */ new Set();
  const load = () => {
    pending ?? (pending = importModule().then((module) => {
      loaded = module;
      listeners.forEach((listener) => listener());
      return module;
    }, (error2) => {
      pending = null;
      throw error2;
    }));
    return pending;
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  const useModule = () => {
    const module = useSyncExternalStore(subscribe, () => loaded, () => null);
    useEffect(() => {
      if (!module) {
        load();
      }
    }, [module]);
    return module;
  };
  return {
    load,
    useModule
  };
};
const inputWrapper = "_inputWrapper_1osmn_1";
const error = "_error_1osmn_5";
const classes = {
  inputWrapper,
  error
};
const editorModule = createLazyModule(() => import("./Editor-gWww-zuE.js"));
const EditorFallback = ({
  label,
  required,
  size = "md",
  className = ""
}) => /* @__PURE__ */ jsxs("div", { className: classNames([classes.inputWrapper, className]), children: [
  label && /* @__PURE__ */ jsx(InputLabel, { size, required, children: label }),
  /* @__PURE__ */ jsx(Skeleton, { height: 100, radius: "sm" })
] });
const Editor = (props) => {
  const module = editorModule.useModule();
  if (!module) {
    return /* @__PURE__ */ jsx(EditorFallback, { ...props });
  }
  return /* @__PURE__ */ jsx(module.Editor, { ...props });
};
export {
  Editor as E,
  classes as a,
  createLazyModule as c
};
