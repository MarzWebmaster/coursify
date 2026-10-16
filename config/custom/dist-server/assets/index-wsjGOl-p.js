import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useState } from "react";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { u as useGetOrganizers } from "./useGetOrganizers-AXXYibKP.js";
import { IconBuilding, IconArrowsHorizontal, IconPlus, IconChevronDown, IconChevronRight, IconArchive } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { L as LoadingMask } from "./index-CYsdl7UG.js";
import { O as OrganizerStatus } from "./types-CqPWB-a5.js";
const organizerList = "_organizerList_135gh_1";
const organizerItem = "_organizerItem_135gh_8";
const selectIcon = "_selectIcon_135gh_28";
const organizerLogo = "_organizerLogo_135gh_35";
const logoPlaceholder = "_logoPlaceholder_135gh_49";
const organizerInfo = "_organizerInfo_135gh_59";
const organizerName = "_organizerName_135gh_64";
const emptyState = "_emptyState_135gh_80";
const createButton = "_createButton_135gh_94";
const archivedToggle = "_archivedToggle_135gh_116";
const archivedCount = "_archivedCount_135gh_134";
const archivedItem = "_archivedItem_135gh_139 _organizerItem_135gh_8";
const archiveBadge = "_archiveBadge_135gh_148";
const classes = {
  organizerList,
  organizerItem,
  selectIcon,
  organizerLogo,
  logoPlaceholder,
  organizerInfo,
  organizerName,
  emptyState,
  createButton,
  archivedToggle,
  archivedCount,
  archivedItem,
  archiveBadge
};
const SwitchOrganizerModal = ({
  opened,
  onClose,
  onCreateOrganizer,
  heading,
  excludeCurrentOrganizer = true
}) => {
  var _a;
  const navigate = useNavigate();
  const {
    organizerId: currentOrganizerId
  } = useParams();
  const {
    data: organizers,
    isLoading
  } = useGetOrganizers();
  const [showArchived, setShowArchived] = useState(false);
  const handleOrganizerSelect = (organizerId) => {
    navigate(`/manage/organizer/${organizerId}/dashboard`);
    onClose();
  };
  const allOrganizers = excludeCurrentOrganizer ? ((_a = organizers == null ? void 0 : organizers.data) == null ? void 0 : _a.filter((org) => String(org.id) !== String(currentOrganizerId))) || [] : (organizers == null ? void 0 : organizers.data) || [];
  const activeOrganizers = allOrganizers.filter((org) => org.status !== OrganizerStatus.ARCHIVED);
  const archivedOrganizers = allOrganizers.filter((org) => org.status === OrganizerStatus.ARCHIVED);
  return /* @__PURE__ */ jsx(Modal, { opened, onClose, heading: heading || i18n._(
    /*i18n*/
    {
      id: "JZTQI0"
    }
  ), modalHeader: "branded", size: "md", children: isLoading ? /* @__PURE__ */ jsx(LoadingMask, {}) : /* @__PURE__ */ jsxs("div", { className: classes.organizerList, children: [
    activeOrganizers.length === 0 && archivedOrganizers.length === 0 ? /* @__PURE__ */ jsxs("div", { className: classes.emptyState, children: [
      /* @__PURE__ */ jsx(IconBuilding, { size: 48, stroke: 1.5 }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "B7w4KY" }) })
    ] }) : /* @__PURE__ */ jsx(Fragment, { children: activeOrganizers.map((organizer) => {
      var _a2, _b;
      return /* @__PURE__ */ jsxs("button", { className: classes.organizerItem, onClick: () => handleOrganizerSelect(organizer.id), children: [
        /* @__PURE__ */ jsx("div", { className: classes.organizerLogo, children: ((_a2 = organizer.images) == null ? void 0 : _a2.find((image) => image.type === "ORGANIZER_LOGO")) ? /* @__PURE__ */ jsx("img", { src: (_b = organizer.images.find((image) => image.type === "ORGANIZER_LOGO")) == null ? void 0 : _b.url, alt: organizer.name }) : /* @__PURE__ */ jsx("div", { className: classes.logoPlaceholder, children: /* @__PURE__ */ jsx(IconBuilding, { size: 20, stroke: 1.5 }) }) }),
        /* @__PURE__ */ jsx("div", { className: classes.organizerInfo, children: /* @__PURE__ */ jsx("h4", { className: classes.organizerName, children: organizer.name }) }),
        /* @__PURE__ */ jsx(IconArrowsHorizontal, { size: 20, className: classes.selectIcon })
      ] }, organizer.id);
    }) }),
    /* @__PURE__ */ jsxs("button", { className: classes.createButton, onClick: () => {
      onClose();
      onCreateOrganizer == null ? void 0 : onCreateOrganizer();
    }, children: [
      /* @__PURE__ */ jsx(IconPlus, { size: 18 }),
      /* @__PURE__ */ jsx(Trans, { id: "kpJAeS" })
    ] }),
    archivedOrganizers.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("button", { className: classes.archivedToggle, onClick: () => setShowArchived(!showArchived), children: [
        showArchived ? /* @__PURE__ */ jsx(IconChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(IconChevronRight, { size: 16 }),
        /* @__PURE__ */ jsx(Trans, { id: "BzcxWv" }),
        /* @__PURE__ */ jsxs("span", { className: classes.archivedCount, children: [
          "(",
          archivedOrganizers.length,
          ")"
        ] })
      ] }),
      showArchived && archivedOrganizers.map((organizer) => {
        var _a2, _b;
        return /* @__PURE__ */ jsxs("button", { className: classes.archivedItem, onClick: () => handleOrganizerSelect(organizer.id), children: [
          /* @__PURE__ */ jsx("div", { className: classes.organizerLogo, children: ((_a2 = organizer.images) == null ? void 0 : _a2.find((image) => image.type === "ORGANIZER_LOGO")) ? /* @__PURE__ */ jsx("img", { src: (_b = organizer.images.find((image) => image.type === "ORGANIZER_LOGO")) == null ? void 0 : _b.url, alt: organizer.name }) : /* @__PURE__ */ jsx("div", { className: classes.logoPlaceholder, children: /* @__PURE__ */ jsx(IconBuilding, { size: 20, stroke: 1.5 }) }) }),
          /* @__PURE__ */ jsx("div", { className: classes.organizerInfo, children: /* @__PURE__ */ jsx("h4", { className: classes.organizerName, children: organizer.name }) }),
          /* @__PURE__ */ jsx("span", { className: classes.archiveBadge, children: /* @__PURE__ */ jsx(IconArchive, { size: 14 }) })
        ] }, organizer.id);
      })
    ] })
  ] }) });
};
export {
  SwitchOrganizerModal as S
};
