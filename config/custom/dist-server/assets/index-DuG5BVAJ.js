import { jsxs, jsx } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Menu, Button, Checkbox } from "@mantine/core";
import { IconColumns } from "@tabler/icons-react";
function ColumnVisibilityToggle({
  table
}) {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  if (columns.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, closeOnItemClick: false, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "light", leftSection: /* @__PURE__ */ jsx(IconColumns, { size: 16 }), children: i18n._(
      /*i18n*/
      {
        id: "jEu4bB"
      }
    ) }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "W428WC"
        }
      ) }),
      columns.map((column) => {
        const columnDef = column.columnDef;
        const label = typeof columnDef.header === "string" ? columnDef.header : columnDef.id || column.id;
        return /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsx(Checkbox, { checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler(), label }) }, column.id);
      })
    ] })
  ] });
}
export {
  ColumnVisibilityToggle as C
};
