import { jsx, jsxs } from "react/jsx-runtime";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table } from "@mantine/core";
import { useState, useRef, useCallback, useEffect } from "react";
import { C as Card } from "./index-jHMtuNEo.js";
const tableWrapper = "_tableWrapper_1ilt9_1";
const toolbar = "_toolbar_1ilt9_7";
const tableHead = "_tableHead_1ilt9_14";
const card = "_card_1ilt9_28";
const table = "_table_1ilt9_1";
const stickyLeft = "_stickyLeft_1ilt9_55";
const stickyRight = "_stickyRight_1ilt9_74";
const showStartShadow = "_showStartShadow_1ilt9_93";
const showEndShadow = "_showEndShadow_1ilt9_94";
const classes = {
  tableWrapper,
  toolbar,
  tableHead,
  card,
  table,
  stickyLeft,
  stickyRight,
  showStartShadow,
  showEndShadow
};
function TanStackTable({
  data,
  columns,
  storageKey,
  enableColumnVisibility = false,
  renderColumnVisibilityToggle,
  hideHeader = false,
  noCard = false,
  rowStyle
}) {
  const [columnVisibility, setColumnVisibility] = useState(() => {
    if (storageKey && enableColumnVisibility) {
      const stored = localStorage.getItem(`${storageKey}-column-visibility`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return {};
        }
      }
    }
    return {};
  });
  const viewportRef = useRef(null);
  const [showStartShadow2, setShowStartShadow] = useState(false);
  const [showEndShadow2, setShowEndShadow] = useState(false);
  const updateStickyShadows = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const {
      scrollLeft,
      clientWidth,
      scrollWidth
    } = viewport;
    setShowStartShadow(scrollLeft > 1);
    setShowEndShadow(scrollWidth - clientWidth - scrollLeft > 1);
  }, []);
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    updateStickyShadows();
    const resizeObserver = new ResizeObserver(updateStickyShadows);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }
    return () => resizeObserver.disconnect();
  }, [updateStickyShadows]);
  const table2 = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableHiding: enableColumnVisibility
  });
  useEffect(() => {
    if (storageKey && enableColumnVisibility) {
      localStorage.setItem(`${storageKey}-column-visibility`, JSON.stringify(columnVisibility));
    }
  }, [columnVisibility, storageKey, enableColumnVisibility]);
  const tableContent = /* @__PURE__ */ jsx(Table.ScrollContainer, { minWidth: 200, scrollAreaProps: {
    type: "hover",
    viewportRef,
    onScrollPositionChange: updateStickyShadows
  }, children: /* @__PURE__ */ jsxs(Table, { className: `${classes.table} ${showStartShadow2 ? classes.showStartShadow : ""} ${showEndShadow2 ? classes.showEndShadow : ""}`, children: [
    !hideHeader && /* @__PURE__ */ jsx(Table.Thead, { className: classes.tableHead, children: table2.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(Table.Tr, { children: headerGroup.headers.map((header) => {
      const columnMeta = header.column.columnDef.meta;
      const stickyClass = (columnMeta == null ? void 0 : columnMeta.sticky) === "left" ? classes.stickyLeft : (columnMeta == null ? void 0 : columnMeta.sticky) === "right" ? classes.stickyRight : "";
      return /* @__PURE__ */ jsx(Table.Th, { className: stickyClass, style: {
        ...columnMeta == null ? void 0 : columnMeta.headerStyle
      }, children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
    }) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx(Table.Tbody, { children: table2.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(Table.Tr, { style: rowStyle == null ? void 0 : rowStyle(row.original), children: row.getVisibleCells().map((cell) => {
      const columnMeta = cell.column.columnDef.meta;
      const stickyClass = (columnMeta == null ? void 0 : columnMeta.sticky) === "left" ? classes.stickyLeft : (columnMeta == null ? void 0 : columnMeta.sticky) === "right" ? classes.stickyRight : "";
      return /* @__PURE__ */ jsx(Table.Td, { className: stickyClass, style: {
        ...columnMeta == null ? void 0 : columnMeta.cellStyle
      }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id);
    }) }, row.id)) })
  ] }) });
  return /* @__PURE__ */ jsxs("div", { className: classes.tableWrapper, children: [
    enableColumnVisibility && renderColumnVisibilityToggle && /* @__PURE__ */ jsx("div", { className: classes.toolbar, children: renderColumnVisibilityToggle(table2) }),
    noCard ? tableContent : /* @__PURE__ */ jsx(Card, { className: classes.card, children: tableContent })
  ] });
}
export {
  TanStackTable as T
};
