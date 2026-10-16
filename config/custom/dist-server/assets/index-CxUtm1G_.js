import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { NavLink, useParams } from "react-router";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { Text, Group, Menu, Button, SimpleGrid, Paper, Anchor, Table, Badge, NumberInput, Select } from "@mantine/core";
import { IconDotsVertical, IconEye, IconSend, IconTrash } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import { E as EventType, W as WaitlistEntryStatus, Q as QueryFilterOperator } from "./types-CqPWB-a5.js";
import { p as prettyDate, r as relativeDate } from "./dates-CbVpwZeX.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { a as waitlistClient } from "./waitlist.client-Dm8api1T.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { T as TanStackTable } from "./index-D0pbWAZK.js";
import { M as ManageOrderModal } from "./index-DTsqBh8c.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { B as Button$1 } from "./index-hLKQavXc.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useGetEventOccurrences } from "./useGetEventOccurrences-Ch0XNQBq.js";
import { O as OccurrenceSelect } from "./index-DWXPH3HO.js";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "classnames";
import "process";
import "axios";
import "@mantine/notifications";
import "@lingui/react";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "dayjs";
import "dayjs/plugin/relativeTime.js";
import "dayjs/plugin/utc.js";
import "dayjs/plugin/timezone.js";
import "dayjs/plugin/advancedFormat.js";
import "@tanstack/react-table";
import "./index-jHMtuNEo.js";
import "./index-7RPUkRz0.js";
import "./order.client-BmBVeAyF.js";
import "./index-CwjvB_vn.js";
import "@mantine/form";
import "./useFormErrorResponseHandler-Sev5QhLr.js";
import "./index-D4cOjjnu.js";
import "./index-gUnclHYL.js";
import "./useGetAccount-CGfwRfDK.js";
import "./index-IzdRcWBR.js";
import "./currency-Br7a8J7F.js";
import "./index-wMxbqESV.js";
import "./countries-C8-MXWCy.js";
import "./index-CwAoF9NO.js";
import "./addressUtilities-7xIQim0X.js";
import "./useGetEventCounts-BudQN_tQ.js";
import "./download-DP3M_6Yt.js";
import "./withLoadingNotification-6oRbhBHA.js";
import "./urlHelper-CsaWRwIV.js";
import "./index-R0GQzPHn.js";
import "./index-CoMrHZbF.js";
import "./event-occurrence.client-xqTaU2Nv.js";
import "./occurrenceSelectUtils-sehyBEho.js";
const GET_EVENT_WAITLIST_ENTRIES_QUERY_KEY = "getEventWaitlistEntries";
const useGetEventWaitlistEntries = (eventId, pagination) => {
  return useQuery({
    queryKey: [GET_EVENT_WAITLIST_ENTRIES_QUERY_KEY, eventId, pagination],
    queryFn: async () => await waitlistClient.all(eventId, pagination)
  });
};
const GET_WAITLIST_STATS_QUERY_KEY = "getWaitlistStats";
const useGetWaitlistStats = (eventId, eventOccurrenceId) => {
  return useQuery({
    queryKey: [GET_WAITLIST_STATS_QUERY_KEY, eventId, eventOccurrenceId],
    queryFn: async () => {
      return waitlistClient.stats(eventId, eventOccurrenceId);
    }
  });
};
const useRemoveWaitlistEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      entryId
    }) => waitlistClient.remove(eventId, entryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_WAITLIST_ENTRIES_QUERY_KEY, variables.eventId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_WAITLIST_STATS_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const useOfferSpecificWaitlistEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      entryId
    }) => waitlistClient.offerEntry(eventId, entryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_WAITLIST_ENTRIES_QUERY_KEY, variables.eventId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_WAITLIST_STATS_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const contactDetails = "_contactDetails_1jeas_1";
const contactName = "_contactName_1jeas_7";
const contactEmail = "_contactEmail_1jeas_14";
const statusBadge = "_statusBadge_1jeas_24";
const actionsMenu = "_actionsMenu_1jeas_55";
const classes = {
  contactDetails,
  contactName,
  contactEmail,
  statusBadge,
  actionsMenu
};
const statusLabelMap = {
  [WaitlistEntryStatus.Waiting]: () => i18n._(
    /*i18n*/
    {
      id: "uUehLT"
    }
  ),
  [WaitlistEntryStatus.Offered]: () => i18n._(
    /*i18n*/
    {
      id: "1jUg5D"
    }
  ),
  [WaitlistEntryStatus.Purchased]: () => i18n._(
    /*i18n*/
    {
      id: "dsFmM+"
    }
  ),
  [WaitlistEntryStatus.Cancelled]: () => i18n._(
    /*i18n*/
    {
      id: "vv7kpg"
    }
  ),
  [WaitlistEntryStatus.OfferExpired]: () => i18n._(
    /*i18n*/
    {
      id: "M1RnFv"
    }
  )
};
const ActionMenu = ({
  entry,
  onOffer,
  onRemove,
  onViewOrder
}) => {
  const isWaiting = entry.status === WaitlistEntryStatus.Waiting;
  const isOffered = entry.status === WaitlistEntryStatus.Offered;
  const isExpired = entry.status === WaitlistEntryStatus.OfferExpired;
  const isPurchased = entry.status === WaitlistEntryStatus.Purchased;
  const canOffer = isWaiting || isExpired;
  const canCancel = isWaiting || isOffered;
  return /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx("div", { className: classes.actionsMenu, children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "transparent", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "7L01XJ"
        }
      ) }),
      isPurchased && entry.order_id && /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconEye, { size: 14 }), onClick: () => onViewOrder(entry.order_id), children: i18n._(
        /*i18n*/
        {
          id: "67OJ7t"
        }
      ) }),
      canOffer && /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), onClick: () => onOffer(entry.id), children: isExpired ? i18n._(
        /*i18n*/
        {
          id: "t41hVI"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "EfK2O6"
        }
      ) }),
      canCancel && /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => onRemove(entry.id), children: isOffered ? i18n._(
        /*i18n*/
        {
          id: "CfuueU"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "t/YqKh"
        }
      ) })
    ] })
  ] }) });
};
const WaitlistTable = ({
  eventId,
  entries,
  event
}) => {
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const timezone = (event == null ? void 0 : event.timezone) || "UTC";
  const removeMutation = useRemoveWaitlistEntry();
  const offerMutation = useOfferSpecificWaitlistEntry();
  const [isOrderModalOpen, orderModal] = useDisclosure(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    orderModal.open();
  };
  const handleRemove = (entryId) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "8x0pUg"
      }
    ), () => {
      removeMutation.mutate({
        eventId,
        entryId
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "Zi3Sbw"
            }
          ));
        },
        onError: () => {
          showError(i18n._(
            /*i18n*/
            {
              id: "7zyx8a"
            }
          ));
        }
      });
    }, {
      confirm: i18n._(
        /*i18n*/
        {
          id: "t/YqKh"
        }
      ),
      cancel: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      )
    });
  };
  const handleOffer = (entryId) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "EOqL/A"
      }
    ), () => {
      offerMutation.mutate({
        eventId,
        entryId
      }, {
        onSuccess: () => {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "WUOCgI"
            }
          ));
        },
        onError: (error) => {
          var _a, _b;
          const errors = (_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors;
          const message = errors ? Object.values(errors).flat().join(", ") : i18n._(
            /*i18n*/
            {
              id: "ETcU7q"
            }
          );
          showError(message);
        }
      });
    }, {
      confirm: i18n._(
        /*i18n*/
        {
          id: "9h7RDh"
        }
      ),
      cancel: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      )
    });
  };
  const columns = useMemo(() => [{
    id: "position",
    header: "#",
    enableHiding: false,
    cell: (info) => info.row.original.position,
    meta: {
      headerStyle: {
        width: 60
      }
    }
  }, {
    id: "contact",
    header: i18n._(
      /*i18n*/
      {
        id: "jfC/xh"
      }
    ),
    enableHiding: false,
    cell: (info) => {
      const entry = info.row.original;
      return /* @__PURE__ */ jsxs("div", { className: classes.contactDetails, children: [
        /* @__PURE__ */ jsxs(Text, { className: classes.contactName, children: [
          entry.first_name,
          " ",
          entry.last_name
        ] }),
        /* @__PURE__ */ jsx(Text, { className: classes.contactEmail, children: entry.email })
      ] });
    },
    meta: {
      headerStyle: {
        minWidth: 220
      }
    }
  }, {
    id: "product",
    header: i18n._(
      /*i18n*/
      {
        id: "K47k8R"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      var _a, _b;
      const entry = info.row.original;
      const title = ((_a = entry.product) == null ? void 0 : _a.title) || "";
      const label = (_b = entry.product_price) == null ? void 0 : _b.label;
      return label ? `${title} - ${label}` : title;
    }
  }, ...isRecurring ? [{
    id: "occurrence",
    header: i18n._(
      /*i18n*/
      {
        id: "mYGY3B"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const entry = info.row.original;
      const occurrence = entry.event_occurrence;
      if (!occurrence) {
        return /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: "—" });
      }
      const dateText = prettyDate(occurrence.start_date, timezone);
      return /* @__PURE__ */ jsx(Text, { size: "sm", children: occurrence.label ? `${dateText} (${occurrence.label})` : dateText });
    },
    meta: {
      headerStyle: {
        minWidth: 180
      }
    }
  }] : [], {
    id: "status",
    header: i18n._(
      /*i18n*/
      {
        id: "uAQUqI"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const entry = info.row.original;
      return /* @__PURE__ */ jsx("div", { className: classes.statusBadge, "data-status": entry.status, children: entry.status ? statusLabelMap[entry.status]() : "" });
    },
    meta: {
      headerStyle: {
        minWidth: 130
      }
    }
  }, {
    id: "joined",
    header: i18n._(
      /*i18n*/
      {
        id: "2gMuHR"
      }
    ),
    enableHiding: true,
    cell: (info) => {
      const entry = info.row.original;
      return /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: entry.created_at ? relativeDate(String(entry.created_at)) : "" });
    }
  }, {
    id: "actions",
    header: i18n._(
      /*i18n*/
      {
        id: "7L01XJ"
      }
    ),
    enableHiding: false,
    cell: (info) => {
      const entry = info.row.original;
      return /* @__PURE__ */ jsx("div", { className: classes.actionsMenu, children: /* @__PURE__ */ jsx(ActionMenu, { entry, onOffer: handleOffer, onRemove: handleRemove, onViewOrder: handleViewOrder }) });
    },
    meta: {
      sticky: "right"
    }
  }], [eventId, isRecurring, timezone]);
  if (entries.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "Arzxc1"
      }
    ), imageHref: "/blank-slate/waitlist.svg", subHeading: /* @__PURE__ */ jsx("p", { children: i18n._(
      /*i18n*/
      {
        id: "X88/6w"
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TanStackTable, { data: entries, columns }),
    selectedOrderId && isOrderModalOpen && /* @__PURE__ */ jsx(ManageOrderModal, { orderId: selectedOrderId, onClose: orderModal.close })
  ] });
};
const WaitlistStatsCards = ({
  stats
}) => {
  const statItems = [{
    label: i18n._(
      /*i18n*/
      {
        id: "k5CU8c"
      }
    ),
    value: stats.total
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "uUehLT"
      }
    ),
    value: stats.waiting
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "1jUg5D"
      }
    ),
    value: stats.offered
  }, {
    label: i18n._(
      /*i18n*/
      {
        id: "dsFmM+"
      }
    ),
    value: stats.purchased
  }];
  return /* @__PURE__ */ jsx(SimpleGrid, { cols: {
    base: 2,
    sm: 4
  }, mb: "md", visibleFrom: "sm", children: statItems.map((item) => /* @__PURE__ */ jsxs(Paper, { withBorder: true, p: "md", radius: "md", children: [
    /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", tt: "uppercase", fw: 700, children: item.label }),
    /* @__PURE__ */ jsx(Text, { size: "xl", fw: 700, mt: 4, children: item.value })
  ] }, item.label)) });
};
const useOfferWaitlistEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      productPriceId,
      quantity,
      eventOccurrenceId
    }) => waitlistClient.offerNext(eventId, productPriceId, quantity, eventOccurrenceId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_WAITLIST_ENTRIES_QUERY_KEY, variables.eventId]
      });
      queryClient.invalidateQueries({
        queryKey: [GET_WAITLIST_STATS_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const getDefaultQuantity = (product) => {
  if (product.available === 0) return 0;
  if (product.available === null) return product.waiting;
  return Math.min(product.waiting, product.available);
};
const getMaxQuantity = (product) => {
  if (product.available === null) return product.waiting;
  return Math.min(product.waiting, product.available);
};
const OfferWaitlistModal = ({
  onClose,
  eventId,
  eventSettings,
  stats,
  eventOccurrenceId,
  isRecurring
}) => {
  var _a;
  const mutation = useOfferWaitlistEntry();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const productsWithWaiting = ((_a = stats == null ? void 0 : stats.products) == null ? void 0 : _a.filter((p) => p.waiting > 0)) ?? [];
  const isAutoProcess = !!(eventSettings == null ? void 0 : eventSettings.waitlist_auto_process);
  const showAllDatesNote = !!isRecurring && !eventOccurrenceId;
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    productsWithWaiting.forEach((p) => {
      initial[p.product_price_id] = getDefaultQuantity(p);
    });
    return initial;
  });
  const timeoutHours = (eventSettings == null ? void 0 : eventSettings.waitlist_offer_timeout_minutes) ? Math.round(eventSettings.waitlist_offer_timeout_minutes / 60 * 10) / 10 : null;
  const handleOffer = (product) => {
    const qty = quantities[product.product_price_id] ?? 1;
    setLoadingProductId(product.product_price_id);
    mutation.mutate({
      eventId,
      productPriceId: product.product_price_id,
      quantity: qty,
      eventOccurrenceId
    }, {
      onSuccess: (response) => {
        var _a2;
        const count = ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.length) ?? qty;
        showSuccess(count === 1 ? i18n._(
          /*i18n*/
          {
            id: "kKpkzy"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "IvxA4G",
            values: {
              count
            }
          }
        ));
        setLoadingProductId(null);
      },
      onError: (error) => {
        var _a2, _b;
        const message = ((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "5670b9"
          }
        );
        showError(message);
        setLoadingProductId(null);
      }
    });
  };
  const isBusy = loadingProductId !== null;
  if (isAutoProcess) {
    return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
      /*i18n*/
      {
        id: "3sVRey"
      }
    ), children: [
      /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center",
        padding: "20px 0 10px"
      }, children: [
        /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "⚡" }),
        /* @__PURE__ */ jsx(Text, { size: "lg", fw: 600, mb: "xs", children: i18n._(
          /*i18n*/
          {
            id: "JgREph"
          }
        ) }),
        /* @__PURE__ */ jsxs(Text, { size: "sm", c: "dimmed", mb: "md", maw: 380, mx: "auto", children: [
          i18n._(
            /*i18n*/
            {
              id: "OrWHoZ"
            }
          ),
          !!timeoutHours && " " + i18n._(
            /*i18n*/
            {
              id: "l+/HS6",
              values: {
                timeoutHours
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Anchor, { component: NavLink, to: `/manage/event/${eventId}/settings#waitlist-settings`, size: "xs", children: i18n._(
          /*i18n*/
          {
            id: "CIHJJf"
          }
        ) })
      ] }),
      productsWithWaiting.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: "xs", children: i18n._(
          /*i18n*/
          {
            id: "g2npA5"
          }
        ) }),
        /* @__PURE__ */ jsxs(Text, { size: "xs", c: "dimmed", mb: "sm", children: [
          i18n._(
            /*i18n*/
            {
              id: "paWwQ0"
            }
          ),
          showAllDatesNote && " " + i18n._(
            /*i18n*/
            {
              id: "QOIm+S"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ProductOfferTable, { products: productsWithWaiting, quantities, setQuantities, onOffer: handleOffer, loadingProductId, isBusy })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "3sVRey"
    }
  ), children: [
    /* @__PURE__ */ jsxs(Text, { size: "sm", c: "dimmed", mb: "xs", children: [
      i18n._(
        /*i18n*/
        {
          id: "3RQ81z"
        }
      ),
      !!timeoutHours && " " + i18n._(
        /*i18n*/
        {
          id: "l+/HS6",
          values: {
            timeoutHours
          }
        }
      ),
      showAllDatesNote && " " + i18n._(
        /*i18n*/
        {
          id: "QOIm+S"
        }
      )
    ] }),
    productsWithWaiting.length === 0 ? /* @__PURE__ */ jsx(Text, { c: "dimmed", ta: "center", py: "xl", children: i18n._(
      /*i18n*/
      {
        id: "kY7XDn"
      }
    ) }) : /* @__PURE__ */ jsx(ProductOfferTable, { products: productsWithWaiting, quantities, setQuantities, onOffer: handleOffer, loadingProductId, isBusy })
  ] });
};
const ProductOfferTable = ({
  products,
  quantities,
  setQuantities,
  onOffer,
  loadingProductId,
  isBusy
}) => /* @__PURE__ */ jsx(Paper, { withBorder: true, radius: "md", style: {
  overflow: "hidden"
}, children: /* @__PURE__ */ jsxs(Table, { verticalSpacing: "sm", horizontalSpacing: "md", children: [
  /* @__PURE__ */ jsx(Table.Thead, { children: /* @__PURE__ */ jsxs(Table.Tr, { children: [
    /* @__PURE__ */ jsx(Table.Th, { children: i18n._(
      /*i18n*/
      {
        id: "K47k8R"
      }
    ) }),
    /* @__PURE__ */ jsx(Table.Th, { style: {
      textAlign: "center"
    }, children: i18n._(
      /*i18n*/
      {
        id: "uUehLT"
      }
    ) }),
    /* @__PURE__ */ jsx(Table.Th, { style: {
      textAlign: "center"
    }, children: i18n._(
      /*i18n*/
      {
        id: "csDS2L"
      }
    ) }),
    /* @__PURE__ */ jsx(Table.Th, { style: {
      textAlign: "right"
    }, children: i18n._(
      /*i18n*/
      {
        id: "oWXNE5"
      }
    ) }),
    /* @__PURE__ */ jsx(Table.Th, { style: {
      width: 1
    } })
  ] }) }),
  /* @__PURE__ */ jsx(Table.Tbody, { children: products.map((product) => {
    const noCapacity = product.available === 0;
    const isRowLoading = loadingProductId === product.product_price_id;
    const max = getMaxQuantity(product);
    return /* @__PURE__ */ jsxs(Table.Tr, { style: noCapacity ? {
      opacity: 0.5
    } : void 0, children: [
      /* @__PURE__ */ jsx(Table.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: product.product_title }) }),
      /* @__PURE__ */ jsx(Table.Td, { style: {
        textAlign: "center"
      }, children: product.waiting }),
      /* @__PURE__ */ jsx(Table.Td, { style: {
        textAlign: "center"
      }, children: noCapacity ? /* @__PURE__ */ jsx(Badge, { color: "red", variant: "light", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "amMkpL"
        }
      ) }) : product.available === null ? /* @__PURE__ */ jsx(Badge, { color: "teal", variant: "light", size: "sm", children: i18n._(
        /*i18n*/
        {
          id: "NIuIk1"
        }
      ) }) : product.available }),
      /* @__PURE__ */ jsx(Table.Td, { style: {
        textAlign: "right"
      }, children: !noCapacity && /* @__PURE__ */ jsx(NumberInput, { size: "xs", min: 1, max, mb: 0, value: quantities[product.product_price_id] ?? 1, onChange: (val) => setQuantities((prev) => ({
        ...prev,
        [product.product_price_id]: Number(val) || 1
      })), disabled: isBusy, style: {
        width: 70,
        marginLeft: "auto"
      } }) }),
      /* @__PURE__ */ jsx(Table.Td, { children: !noCapacity && /* @__PURE__ */ jsx(Button$1, { size: "xs", variant: "light", leftSection: /* @__PURE__ */ jsx(IconSend, { size: 14 }), onClick: () => onOffer(product), disabled: isBusy && !isRowLoading, loading: isRowLoading, children: i18n._(
        /*i18n*/
        {
          id: "9h7RDh"
        }
      ) }) })
    ] }, product.product_price_id);
  }) })
] }) });
const SoldOutWaitlist = () => {
  var _a, _b, _c, _d, _e, _f;
  const {
    eventId
  } = useParams();
  const {
    data: event
  } = useGetEvent(eventId);
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const entriesQuery = useGetEventWaitlistEntries(eventId, searchParams);
  const entries = (_a = entriesQuery == null ? void 0 : entriesQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = entriesQuery == null ? void 0 : entriesQuery.data) == null ? void 0 : _b.meta;
  const selectedOccurrenceId = ((_d = (_c = searchParams.filterFields) == null ? void 0 : _c.event_occurrence_id) == null ? void 0 : _d.value) || null;
  const {
    data: stats
  } = useGetWaitlistStats(eventId, selectedOccurrenceId);
  const {
    data: eventSettings
  } = useGetEventSettings(eventId);
  const [offerModalOpen, {
    open: openOfferModal,
    close: closeOfferModal
  }] = useDisclosure(false);
  const isRecurring = (event == null ? void 0 : event.type) === EventType.RECURRING;
  const {
    data: occurrencesData
  } = useGetEventOccurrences(eventId, {
    pageNumber: 1,
    perPage: 1200
  }, isRecurring, {
    includeStats: false
  });
  const occurrences = (occurrencesData == null ? void 0 : occurrencesData.data) || [];
  const handleOccurrenceFilter = (value) => {
    setSearchParams({
      pageNumber: 1,
      filterFields: {
        ...searchParams.filterFields || {},
        event_occurrence_id: value ? {
          operator: QueryFilterOperator.Equals,
          value
        } : void 0
      }
    }, true);
  };
  const handleStatusFilter = (value) => {
    setSearchParams({
      pageNumber: 1,
      filterFields: {
        ...searchParams.filterFields || {},
        status: value ? {
          operator: QueryFilterOperator.Equals,
          value
        } : void 0
      }
    }, true);
  };
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "zXuaxY"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "u0n+wz"
      }
    ) }),
    stats && /* @__PURE__ */ jsx(WaitlistStatsCards, { stats }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "VT+urE"
      }
    ), setSearchParams, searchParams }), filterComponent: /* @__PURE__ */ jsxs(Group, { gap: "sm", wrap: "wrap", children: [
      (pagination == null ? void 0 : pagination.allowed_sorts) && /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
        setSearchParams({
          sortBy: key,
          sortDirection
        });
      } }),
      isRecurring && occurrences.length > 0 && /* @__PURE__ */ jsx(OccurrenceSelect, { occurrences, timezone: (event == null ? void 0 : event.timezone) || "UTC", value: selectedOccurrenceId, onChange: handleOccurrenceFilter, placeholder: i18n._(
        /*i18n*/
        {
          id: "e4q4uO"
        }
      ), clearable: true }),
      /* @__PURE__ */ jsx(Select, { placeholder: i18n._(
        /*i18n*/
        {
          id: "Sxm1lO"
        }
      ), clearable: true, size: "sm", mb: 0, value: ((_f = (_e = searchParams.filterFields) == null ? void 0 : _e.status) == null ? void 0 : _f.value) || null, onChange: handleStatusFilter, data: [{
        value: WaitlistEntryStatus.Waiting,
        label: i18n._(
          /*i18n*/
          {
            id: "uUehLT"
          }
        )
      }, {
        value: WaitlistEntryStatus.Offered,
        label: i18n._(
          /*i18n*/
          {
            id: "1jUg5D"
          }
        )
      }, {
        value: WaitlistEntryStatus.Purchased,
        label: i18n._(
          /*i18n*/
          {
            id: "dsFmM+"
          }
        )
      }, {
        value: WaitlistEntryStatus.OfferExpired,
        label: i18n._(
          /*i18n*/
          {
            id: "M1RnFv"
          }
        )
      }, {
        value: WaitlistEntryStatus.Cancelled,
        label: i18n._(
          /*i18n*/
          {
            id: "vv7kpg"
          }
        )
      }] })
    ] }), resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
      /*i18n*/
      {
        id: "o21Y+P"
      }
    ), children: /* @__PURE__ */ jsx(Button, { size: "sm", color: "green", leftSection: /* @__PURE__ */ jsx(IconSend, { size: 16 }), "data-testid": "waitlist-offer-next-button", onClick: openOfferModal, children: i18n._(
      /*i18n*/
      {
        id: "3sVRey"
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !entries || !event }),
    entries && event && /* @__PURE__ */ jsx(WaitlistTable, { eventId, entries, event }),
    !!(entries == null ? void 0 : entries.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) }),
    offerModalOpen && eventId && /* @__PURE__ */ jsx(OfferWaitlistModal, { onClose: closeOfferModal, eventId, eventSettings, stats, eventOccurrenceId: selectedOccurrenceId, isRecurring })
  ] });
};
export {
  SoldOutWaitlist,
  SoldOutWaitlist as default
};
