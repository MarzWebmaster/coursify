import { jsx } from "react/jsx-runtime";
import { C as Card } from "./index-jHMtuNEo.js";
import { Table as Table$1 } from "@mantine/core";
const tableHead = "_tableHead_cj69k_1";
const card = "_card_cj69k_10";
const table = "_table_cj69k_1";
const classes = {
  tableHead,
  card,
  table
};
const TableHead = ({
  children
}) => {
  return /* @__PURE__ */ jsx(Table$1.Thead, { className: classes.tableHead, children });
};
const Table = ({
  children
}) => {
  return /* @__PURE__ */ jsx(Card, { className: classes.card, children: /* @__PURE__ */ jsx(Table$1.ScrollContainer, { minWidth: 200, children: /* @__PURE__ */ jsx(Table$1, { className: classes.table, children }) }) });
};
export {
  Table as T,
  TableHead as a
};
