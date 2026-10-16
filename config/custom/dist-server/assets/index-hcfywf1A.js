import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { TextInput } from "@mantine/core";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { IconWebhook, IconWebhookOff, IconBolt } from "@tabler/icons-react";
const responseBody = "_responseBody_1k4jp_1";
const tooltipContent = "_tooltipContent_1k4jp_14";
const classes$1 = {
  responseBody,
  tooltipContent
};
const EVENT_LEVEL_TYPES = ["event.created", "event.updated", "event.archived"];
const WebhookForm = ({
  form,
  isEventContext = false
}) => {
  const statusOptions = [{
    icon: /* @__PURE__ */ jsx(IconWebhook, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "RxzN1M"
      }
    ),
    value: "ENABLED",
    description: i18n._(
      /*i18n*/
      {
        id: "FSaY52"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconWebhookOff, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "URAE3q"
      }
    ),
    value: "PAUSED",
    description: i18n._(
      /*i18n*/
      {
        id: "8BMPMe"
      }
    )
  }];
  const eventTypeOptions = [{
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "EWCLpZ"
      }
    ),
    value: "product.created",
    description: i18n._(
      /*i18n*/
      {
        id: "dfkQIO"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "1b77ID"
      }
    ),
    value: "event.created",
    description: i18n._(
      /*i18n*/
      {
        id: "zyIyPe"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "+HeiVx"
      }
    ),
    value: "event.updated",
    description: i18n._(
      /*i18n*/
      {
        id: "gtoSzE"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "VCNHvW"
      }
    ),
    value: "event.archived",
    description: i18n._(
      /*i18n*/
      {
        id: "t7cuMp"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "ldVIlB"
      }
    ),
    value: "product.updated",
    description: i18n._(
      /*i18n*/
      {
        id: "tRXdQ9"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "XkFYVB"
      }
    ),
    value: "product.deleted",
    description: i18n._(
      /*i18n*/
      {
        id: "8OhzyY"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "ppuQR4"
      }
    ),
    value: "order.created",
    description: i18n._(
      /*i18n*/
      {
        id: "Lc18qn"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "e7eZuA"
      }
    ),
    value: "order.updated",
    description: i18n._(
      /*i18n*/
      {
        id: "fVPt0F"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "vu6Arl"
      }
    ),
    value: "order.marked_as_paid",
    description: i18n._(
      /*i18n*/
      {
        id: "c9RYbv"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "EZy55F"
      }
    ),
    value: "order.refunded",
    description: i18n._(
      /*i18n*/
      {
        id: "ejMDw1"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "B3gPuX"
      }
    ),
    value: "order.cancelled",
    description: i18n._(
      /*i18n*/
      {
        id: "ny2r8d"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "qvylEK"
      }
    ),
    value: "attendee.created",
    description: i18n._(
      /*i18n*/
      {
        id: "Gmd0hv"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "D2qlBU"
      }
    ),
    value: "attendee.updated",
    description: i18n._(
      /*i18n*/
      {
        id: "nBVOd7"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "AJ4rvK"
      }
    ),
    value: "attendee.cancelled",
    description: i18n._(
      /*i18n*/
      {
        id: "Q7CWxp"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "udRwQs"
      }
    ),
    value: "checkin.created",
    description: i18n._(
      /*i18n*/
      {
        id: "IuUoyV"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "F4SRy3"
      }
    ),
    value: "checkin.deleted",
    description: i18n._(
      /*i18n*/
      {
        id: "cxsKvw"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconBolt, { size: 14 }),
    label: i18n._(
      /*i18n*/
      {
        id: "mmoE62"
      }
    ),
    value: "occurrence.cancelled",
    description: i18n._(
      /*i18n*/
      {
        id: "RPe6bE"
      }
    )
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("url"), required: true, label: i18n._(
      /*i18n*/
      {
        id: "nuh/Wq"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "htoh8N"
      }
    ) }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "YDVUVl"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "Ropvj0"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "j9cPeF"
      }
    ), required: true, form, name: "event_types", dataTestId: "webhook-event-types", optionList: isEventContext ? eventTypeOptions.filter((o) => !EVENT_LEVEL_TYPES.includes(o.value)) : eventTypeOptions, multiple: true }),
    /* @__PURE__ */ jsx(CustomSelect, { label: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ), required: true, form, name: "status", optionList: statusOptions })
  ] });
};
const container = "_container_cexpf_1";
const classes = {
  container
};
const Center = ({
  children
}) => {
  return /* @__PURE__ */ jsx("div", { className: classes.container, children });
};
export {
  Center as C,
  WebhookForm as W,
  classes$1 as c
};
