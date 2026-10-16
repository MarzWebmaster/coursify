import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { O as OrganizerCreateForm } from "./index-t-LfUV0_.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { useNavigate } from "react-router";
import { IconInfoCircle } from "@tabler/icons-react";
import { C as Callout } from "./index-CwjvB_vn.js";
const CreateOrganizerModal = ({
  onClose
}) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Modal, { onClose, heading: i18n._(
    /*i18n*/
    {
      id: "kpJAeS"
    }
  ), opened: true, size: "lg", modalHeader: "branded", children: [
    /* @__PURE__ */ jsx(Callout, { icon: /* @__PURE__ */ jsx(IconInfoCircle, {}), variant: "info", children: i18n._(
      /*i18n*/
      {
        id: "j7xZ7J"
      }
    ) }),
    /* @__PURE__ */ jsx(OrganizerCreateForm, { onSuccess: (organizer) => {
      onClose();
      navigate(`/manage/organizer/${organizer.id}`);
    } })
  ] });
};
export {
  CreateOrganizerModal as C
};
