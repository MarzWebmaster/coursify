import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { C as Card } from "./index-jHMtuNEo.js";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { r as resolveEventLocation } from "./effectiveLocation-BzDgAlu_.js";
const OnlineEventDetails = (props) => {
  if (!props.event) return null;
  const eventLocation = resolveEventLocation(props.event, props.occurrence ?? null);
  if ((eventLocation == null ? void 0 : eventLocation.type) !== LocationType.Online || !eventLocation.online_event_connection_details) {
    return null;
  }
  const details = eventLocation.online_event_connection_details;
  return /* @__PURE__ */ jsxs("div", { style: {
    marginTop: "40px",
    marginBottom: "40px"
  }, children: [
    /* @__PURE__ */ jsx("h2", { children: i18n._(
      /*i18n*/
      {
        id: "WKHW0N"
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
      __html: details
    } }) })
  ] });
};
export {
  OnlineEventDetails as O
};
