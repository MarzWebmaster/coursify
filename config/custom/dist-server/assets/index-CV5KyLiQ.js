import { jsx, jsxs } from "react/jsx-runtime";
import { useCombobox, Combobox, Stack, Input, Text, InputBase, ScrollArea, Group, Badge } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
const SelectOption = ({
  icon,
  description,
  label,
  selected
}) => /* @__PURE__ */ jsxs(Group, { wrap: "nowrap", align: "center", justify: "space-between", w: "100%", children: [
  /* @__PURE__ */ jsxs(Group, { wrap: "nowrap", align: "center", children: [
    /* @__PURE__ */ jsx("div", { style: {
      marginTop: "5px"
    }, children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Text, { fz: "sm", fw: 500, children: label }),
      /* @__PURE__ */ jsx(Text, { fz: "xs", opacity: 0.6, children: description })
    ] })
  ] }),
  selected && /* @__PURE__ */ jsx(IconCheck, { size: 16, style: {
    opacity: 0.6
  } })
] });
const MultiValueDisplay = ({
  selectedOptions
}) => /* @__PURE__ */ jsx(Group, { gap: "xs", wrap: "wrap", children: selectedOptions.map((option, index) => /* @__PURE__ */ jsx(Badge, { variant: "light", rightSection: /* @__PURE__ */ jsx(IconCheck, { size: 12 }), children: option.label }, index)) });
const CustomSelect = ({
  optionList,
  form,
  name,
  label,
  description,
  placeholder,
  required = false,
  disabled = false,
  multiple = false,
  value: controlledValue,
  onChange: controlledOnChange,
  dataTestId
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });
  const currentValue = controlledValue !== void 0 ? controlledValue : form ? form.values[name] : void 0;
  const selectedValues = multiple ? currentValue || [] : [currentValue];
  const error = form == null ? void 0 : form.errors[name];
  const options = optionList.map((item) => /* @__PURE__ */ jsx(Combobox.Option, { value: String(item.value), disabled: item.disabled, active: selectedValues.includes(item.value), "data-testid": dataTestId ? `${dataTestId}-option-${item.value}` : void 0, children: /* @__PURE__ */ jsx(SelectOption, { ...item, selected: selectedValues.includes(item.value) }) }, item.value));
  const handleOptionSubmit = (val) => {
    if (multiple) {
      const currentValues = currentValue || [];
      const newValues = currentValues.includes(val) ? currentValues.filter((v) => v !== val) : [...currentValues, val];
      if (controlledOnChange) {
        controlledOnChange(newValues);
      } else if (form) {
        form.setFieldValue(name, newValues);
      }
    } else {
      if (controlledOnChange) {
        controlledOnChange(val);
      } else if (form) {
        form.setFieldValue(name, val);
      }
      combobox.closeDropdown();
    }
  };
  const getSelectedContent = () => {
    if (multiple) {
      const vals = currentValue || [];
      const selectedOptions = optionList.filter((item) => vals.includes(item.value));
      return selectedOptions.length > 0 ? /* @__PURE__ */ jsx(MultiValueDisplay, { selectedOptions }) : /* @__PURE__ */ jsx(Text, { c: "dimmed", fz: "sm", children: placeholder || "Select options..." });
    }
    const selectedOption = optionList.find((item) => item.value === currentValue);
    return selectedOption ? /* @__PURE__ */ jsx(SelectOption, { ...selectedOption }) : /* @__PURE__ */ jsx(Text, { c: "dimmed", fz: "sm", children: placeholder || "Select an option..." });
  };
  return /* @__PURE__ */ jsxs(Stack, { style: {
    opacity: disabled ? 0.6 : 1
  }, gap: 4, children: [
    label && /* @__PURE__ */ jsx(Input.Label, { required, children: label }),
    description && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: description }),
    /* @__PURE__ */ jsxs(Combobox, { disabled, store: combobox, withinPortal: true, position: "bottom-start", onOptionSubmit: handleOptionSubmit, children: [
      /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(InputBase, { component: "div", pointer: true, error, rightSection: /* @__PURE__ */ jsx(Combobox.Chevron, {}), onClick: () => combobox.toggleDropdown(), rightSectionPointerEvents: "none", multiline: true, "data-testid": dataTestId, children: getSelectedContent() }) }),
      /* @__PURE__ */ jsx(Combobox.Dropdown, { children: /* @__PURE__ */ jsx(ScrollArea.Autosize, { mah: 400, children: /* @__PURE__ */ jsx(Combobox.Options, { children: options }) }) })
    ] })
  ] });
};
export {
  CustomSelect as C
};
