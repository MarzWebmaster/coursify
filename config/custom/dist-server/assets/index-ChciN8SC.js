import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React from "react";
import { Menu, Button } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
const DefaultTarget = () => /* @__PURE__ */ jsx(Button, { variant: "transparent", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) });
const ActionMenu = ({
  itemsGroups,
  target = /* @__PURE__ */ jsx(DefaultTarget, {}),
  dataTestId
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx("div", { style: {
      cursor: "pointer"
    }, "data-testid": dataTestId, children: target }) }),
    /* @__PURE__ */ jsx(Menu.Dropdown, { children: itemsGroups.map((group, groupIndex) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      group.showDividerAbove && /* @__PURE__ */ jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsx(Menu.Label, { children: group.label }),
      group.items.map((item, itemIndex) => item.visible !== false && /* @__PURE__ */ jsx(Menu.Item, { color: item.color, leftSection: item.icon, onClick: item.onClick, "data-testid": item.dataTestId, children: item.label }, itemIndex))
    ] }, groupIndex)) })
  ] }) });
};
export {
  ActionMenu as A
};
