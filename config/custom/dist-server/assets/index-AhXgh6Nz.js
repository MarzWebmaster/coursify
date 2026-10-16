import { jsx } from "react/jsx-runtime";
import { Modal as Modal$1 } from "@mantine/core";
import classNames from "classnames";
const modalTitle = "_modalTitle_ksvfk_1";
const brandedHeader = "_brandedHeader_ksvfk_8";
const brandedTitle = "_brandedTitle_ksvfk_16";
const brandedClose = "_brandedClose_ksvfk_27";
const classes = {
  modalTitle,
  brandedHeader,
  brandedTitle,
  brandedClose
};
const Modal = (props) => {
  const {
    modalHeader = "default",
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(Modal$1, { ...restProps, overlayProps: {
    opacity: 0.55,
    blur: 3
  }, size: "xl", withCloseButton: true, title: props.heading, closeOnClickOutside: false, classNames: {
    title: classNames(classes.modalTitle, modalHeader === "branded" && classes.brandedTitle),
    header: classNames(modalHeader === "branded" && classes.brandedHeader),
    close: classNames(modalHeader === "branded" && classes.brandedClose),
    ...props.classNames
  }, children: /* @__PURE__ */ jsx("div", { style: {
    padding: "15px",
    paddingTop: 0
  }, children: props.children }) });
};
export {
  Modal as M
};
