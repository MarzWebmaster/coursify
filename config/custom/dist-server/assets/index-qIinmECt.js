import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useCombobox, Combobox, TextInput, Loader, Select, Button as Button$1, Table as Table$1, Text, Group, Menu } from "@mantine/core";
import { IconPlus, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router";
import { G as GET_ORGANIZER_LOCATIONS_QUERY_KEY, c as useGeoAutocomplete, a as useResolveGeoPlace, u as useCreateLocation, b as useGetOrganizerLocations } from "./useCreateLocation-DZ93UmD2.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { T as ToolBar, a as SortSelector, S as SearchBarWrapper } from "./index-D_nIRDTN.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import { useState, useRef } from "react";
import { T as Table, a as TableHead } from "./index-XJu-jVVm.js";
import { N as NoResultsSplash } from "./index-DAgXC5_F.js";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { l as locationClient, u as useGeoStatus } from "./useGeoStatus-GfcfS0IW.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { f as formatAddress } from "./addressUtilities-7xIQim0X.js";
import { r as relativeDate } from "./dates-CbVpwZeX.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useForm } from "@mantine/form";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { B as Button } from "./index-hLKQavXc.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { c as countries } from "./countries-C8-MXWCy.js";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { u as useFilterQueryParamSync } from "./useFilterQueryParamSync-DO7ti9oB.js";
import "classnames";
import "./index-jHMtuNEo.js";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
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
const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      locationId
    }) => locationClient.delete(organizerId, locationId),
    onSuccess: (_, vars) => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_LOCATIONS_QUERY_KEY, vars.organizerId]
    })
  });
};
const AddressAutocomplete = ({
  organizerId,
  label,
  placeholder,
  description,
  country,
  locale,
  onPlaceSelected
}) => {
  var _a, _b, _c;
  const combobox = useCombobox();
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 250);
  const justSelectedRef = useRef(false);
  const geoStatus = useGeoStatus();
  const geoAvailable = ((_b = (_a = geoStatus.data) == null ? void 0 : _a.data) == null ? void 0 : _b.available) === true;
  const suggestionsQuery = useGeoAutocomplete(organizerId, debounced, {
    country,
    locale,
    enabled: geoAvailable && debounced.length >= 3 && !justSelectedRef.current
  });
  const resolvePlace = useResolveGeoPlace();
  if (!geoAvailable) {
    return null;
  }
  const suggestions = ((_c = suggestionsQuery.data) == null ? void 0 : _c.data) ?? [];
  const handleSelect = async (placeId) => {
    const match = suggestions.find((s) => s.provider_place_id === placeId);
    if (!match) return;
    justSelectedRef.current = true;
    combobox.closeDropdown();
    const label2 = match.secondary_text ? `${match.primary_text}, ${match.secondary_text}` : match.primary_text;
    setValue(label2);
    try {
      const response = await resolvePlace.mutateAsync({
        organizerId,
        placeId,
        locale
      });
      onPlaceSelected(response.data);
    } catch (error) {
      showError(i18n._(
        /*i18n*/
        {
          id: "KOavaU"
        }
      ));
    }
  };
  const handleChange = (event) => {
    const next = event.currentTarget.value;
    justSelectedRef.current = false;
    setValue(next);
    if (next.trim().length >= 3) {
      combobox.openDropdown();
    } else {
      combobox.closeDropdown();
    }
  };
  const handleFocus = () => {
    if (!justSelectedRef.current && value.trim().length >= 3 && suggestions.length > 0) {
      combobox.openDropdown();
    }
  };
  return /* @__PURE__ */ jsxs(Combobox, { store: combobox, onOptionSubmit: handleSelect, withinPortal: true, children: [
    /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(TextInput, { label: label ?? i18n._(
      /*i18n*/
      {
        id: "JRM7ao"
      }
    ), placeholder: placeholder ?? i18n._(
      /*i18n*/
      {
        id: "n9ZrDo"
      }
    ), description, value, onChange: handleChange, onFocus: handleFocus, onBlur: () => combobox.closeDropdown(), rightSection: suggestionsQuery.isFetching || resolvePlace.isPending ? /* @__PURE__ */ jsx(Loader, { size: "xs" }) : null }) }),
    /* @__PURE__ */ jsx(Combobox.Dropdown, { children: /* @__PURE__ */ jsxs(Combobox.Options, { children: [
      suggestions.length === 0 && /* @__PURE__ */ jsx(Combobox.Empty, { children: i18n._(
        /*i18n*/
        {
          id: "mPdY6W"
        }
      ) }),
      suggestions.map((s) => /* @__PURE__ */ jsx(Combobox.Option, { value: s.provider_place_id, children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("strong", { children: s.primary_text }),
        s.secondary_text && /* @__PURE__ */ jsx("div", { style: {
          fontSize: 12,
          opacity: 0.7
        }, children: s.secondary_text })
      ] }) }, s.provider_place_id))
    ] }) })
  ] });
};
const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      locationId,
      payload
    }) => locationClient.update(organizerId, locationId, payload),
    onSuccess: (_, vars) => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_LOCATIONS_QUERY_KEY, vars.organizerId]
    })
  });
};
const hasAnyAddressField = (address) => [address.venue_name, address.address_line_1, address.city, address.state_or_region, address.zip_or_postal_code, address.country].some((value) => (value ?? "").trim().length > 0);
const LocationEditModal = ({
  onClose,
  organizerId,
  location
}) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const isEditing = !!(location == null ? void 0 : location.id);
  const createMutation = useCreateLocation();
  const updateMutation = useUpdateLocation();
  const formErrorHandle = useFormErrorResponseHandler();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const [latLng, setLatLng] = useState({
    lat: (location == null ? void 0 : location.latitude) ?? null,
    lng: (location == null ? void 0 : location.longitude) ?? null,
    provider: (location == null ? void 0 : location.provider) ?? null,
    placeId: (location == null ? void 0 : location.provider_place_id) ?? null
  });
  const form = useForm({
    initialValues: {
      name: (location == null ? void 0 : location.name) ?? "",
      structured_address: {
        venue_name: ((_a = location == null ? void 0 : location.structured_address) == null ? void 0 : _a.venue_name) ?? "",
        address_line_1: ((_b = location == null ? void 0 : location.structured_address) == null ? void 0 : _b.address_line_1) ?? "",
        address_line_2: ((_c = location == null ? void 0 : location.structured_address) == null ? void 0 : _c.address_line_2) ?? "",
        city: ((_d = location == null ? void 0 : location.structured_address) == null ? void 0 : _d.city) ?? "",
        state_or_region: ((_e = location == null ? void 0 : location.structured_address) == null ? void 0 : _e.state_or_region) ?? "",
        zip_or_postal_code: ((_f = location == null ? void 0 : location.structured_address) == null ? void 0 : _f.zip_or_postal_code) ?? "",
        country: ((_g = location == null ? void 0 : location.structured_address) == null ? void 0 : _g.country) ?? ""
      }
    },
    validate: {
      structured_address: {
        venue_name: (_, values) => hasAnyAddressField(values.structured_address) ? null : i18n._(
          /*i18n*/
          {
            id: "W0ETyY"
          }
        )
      }
    }
  });
  const handlePlaceSelected = (place) => {
    form.setValues({
      name: place.display_name ?? place.address.venue_name ?? form.values.name,
      structured_address: {
        venue_name: place.address.venue_name ?? "",
        address_line_1: place.address.address_line_1 ?? "",
        address_line_2: place.address.address_line_2 ?? "",
        city: place.address.city ?? "",
        state_or_region: place.address.state_or_region ?? "",
        zip_or_postal_code: place.address.zip_or_postal_code ?? "",
        country: place.address.country ?? ""
      }
    });
    form.clearErrors();
    setLatLng({
      lat: place.latitude ?? null,
      lng: place.longitude ?? null,
      provider: place.provider,
      placeId: place.provider_place_id
    });
  };
  const handleSubmit = async (values) => {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    const payload = {
      name: values.name || null,
      structured_address: values.structured_address,
      latitude: latLng.lat,
      longitude: latLng.lng,
      provider: latLng.provider,
      provider_place_id: latLng.placeId
    };
    try {
      if (isEditing && (location == null ? void 0 : location.id)) {
        await updateMutation.mutateAsync({
          organizerId,
          locationId: location.id,
          payload
        });
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "YsRXDD"
          }
        ));
      } else {
        await createMutation.mutateAsync({
          organizerId,
          payload
        });
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "7w8lJU"
          }
        ));
      }
      onClose();
    } catch (error) {
      if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 409 && ((_c2 = (_b2 = error == null ? void 0 : error.response) == null ? void 0 : _b2.data) == null ? void 0 : _c2.message)) {
        showError(error.response.data.message);
        return;
      }
      formErrorHandle(form, error);
      const addressError = (_f2 = (_e2 = (_d2 = error == null ? void 0 : error.response) == null ? void 0 : _d2.data) == null ? void 0 : _e2.errors) == null ? void 0 : _f2.structured_address;
      if (addressError) {
        form.setFieldError("structured_address.venue_name", Array.isArray(addressError) ? addressError[0] : addressError);
      }
    }
  };
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: isEditing ? i18n._(
    /*i18n*/
    {
      id: "8oivFT"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "VX6WUv"
    }
  ), size: "lg", children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit(handleSubmit), children: [
    /* @__PURE__ */ jsx(AddressAutocomplete, { organizerId, country: form.values.structured_address.country || void 0, onPlaceSelected: handlePlaceSelected }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), label: i18n._(
      /*i18n*/
      {
        id: "pfa8F0"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "cDSdPb"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "yJFu/X"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.venue_name"), label: i18n._(
      /*i18n*/
      {
        id: "E/9LUk"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "ih35UP"
      }
    ) }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.address_line_1"), label: i18n._(
        /*i18n*/
        {
          id: "POdIrN"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.address_line_2"), label: i18n._(
        /*i18n*/
        {
          id: "gwk5gg"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.city"), label: i18n._(
        /*i18n*/
        {
          id: "3wV73y"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.state_or_region"), label: i18n._(
        /*i18n*/
        {
          id: "/2by1f"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("structured_address.zip_or_postal_code"), label: i18n._(
        /*i18n*/
        {
          id: "BM/KQm"
        }
      ) }),
      /* @__PURE__ */ jsx(Select, { searchable: true, data: countries, ...form.getInputProps("structured_address.country"), label: i18n._(
        /*i18n*/
        {
          id: "JNCzPW"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "Mqy/Zy"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", fullWidth: true, mt: "xl", loading: isPending, children: isEditing ? i18n._(
      /*i18n*/
      {
        id: "IUwGEM"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "VX6WUv"
      }
    ) })
  ] }) });
};
const LocationsTable = ({
  locations,
  openCreateModal
}) => {
  const {
    organizerId
  } = useParams();
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const deleteMutation = useDeleteLocation();
  const locationName = (location) => {
    var _a;
    return location.name ?? ((_a = location.structured_address) == null ? void 0 : _a.venue_name) ?? i18n._(
      /*i18n*/
      {
        id: "MEIAzV"
      }
    );
  };
  const handleDelete = (location) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "KpnwJK",
        values: {
          0: locationName(location)
        }
      }
    ), () => deleteMutation.mutate({
      organizerId,
      locationId: location.id
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "E0DoRM"
        }
      )),
      onError: (error) => {
        var _a, _b;
        return showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) ?? i18n._(
          /*i18n*/
          {
            id: "e0f4yB"
          }
        ));
      }
    }), {
      confirm: i18n._(
        /*i18n*/
        {
          id: "cnGeoo"
        }
      )
    });
  };
  const ActionMenu = ({
    location
  }) => /* @__PURE__ */ jsx(Group, { wrap: "nowrap", gap: 0, justify: "flex-end", children: /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(Button$1, { size: "xs", variant: "transparent", children: /* @__PURE__ */ jsx(IconDotsVertical, {}) }) }),
    /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "wckWOP"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: () => {
        setSelectedLocation(location);
        openEditModal();
      }, children: i18n._(
        /*i18n*/
        {
          id: "m0ZqOT"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsx(Menu.Label, { children: i18n._(
        /*i18n*/
        {
          id: "Zz6Cxn"
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => handleDelete(location), children: i18n._(
        /*i18n*/
        {
          id: "xxjZeP"
        }
      ) })
    ] })
  ] }) });
  if (locations.length === 0) {
    return /* @__PURE__ */ jsx(NoResultsSplash, { heading: i18n._(
      /*i18n*/
      {
        id: "59OWd3"
      }
    ), imageHref: "/blank-slate/occurrence-schedule.svg", subHeading: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: i18n._(
        /*i18n*/
        {
          id: "Lf7TCn"
        }
      ) }),
      /* @__PURE__ */ jsx(Button$1, { size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, {}), color: "green", onClick: () => openCreateModal(), children: i18n._(
        /*i18n*/
        {
          id: "VX6WUv"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "6YtxFj"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "Du6bPw"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, { children: i18n._(
          /*i18n*/
          {
            id: "d+F6q9"
          }
        ) }),
        /* @__PURE__ */ jsx(Table$1.Th, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table$1.Tbody, { children: locations.map((location) => /* @__PURE__ */ jsxs(Table$1.Tr, { children: [
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Text, { fw: 500, component: "span", children: /* @__PURE__ */ jsx(Truncate, { text: locationName(location), length: 40 }) }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Truncate, { text: formatAddress(location.structured_address ?? {}), length: 60 }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", title: location.created_at, children: location.created_at ? relativeDate(location.created_at) : "" }) }),
        /* @__PURE__ */ jsx(Table$1.Td, { children: /* @__PURE__ */ jsx(ActionMenu, { location }) })
      ] }, String(location.id))) })
    ] }),
    editModalOpen && selectedLocation && /* @__PURE__ */ jsx(LocationEditModal, { onClose: () => {
      setSelectedLocation(null);
      closeEditModal();
    }, organizerId, location: selectedLocation })
  ] });
};
function Locations() {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const [searchParams, setSearchParams] = useFilterQueryParamSync();
  const locationsQuery = useGetOrganizerLocations(organizerId, searchParams);
  const locations = (_a = locationsQuery.data) == null ? void 0 : _a.data;
  const pagination = (_b = locationsQuery.data) == null ? void 0 : _b.meta;
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "mdQ0zb"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "VppBoU"
      }
    ) }),
    /* @__PURE__ */ jsx(ToolBar, { searchComponent: () => /* @__PURE__ */ jsx(SearchBarWrapper, { placeholder: i18n._(
      /*i18n*/
      {
        id: "YnMfsK"
      }
    ), setSearchParams, searchParams }), filterComponent: (pagination == null ? void 0 : pagination.allowed_sorts) ? /* @__PURE__ */ jsx(SortSelector, { selected: searchParams.sortBy && searchParams.sortDirection ? searchParams.sortBy + ":" + searchParams.sortDirection : pagination.default_sort + ":" + pagination.default_sort_direction, options: pagination.allowed_sorts, onSortSelect: (key, sortDirection) => {
      setSearchParams({
        sortBy: key,
        sortDirection
      });
    } }) : void 0, resultCount: pagination == null ? void 0 : pagination.total, resultLabel: i18n._(
      /*i18n*/
      {
        id: "iyZPPR"
      }
    ), children: /* @__PURE__ */ jsx(Button$1, { color: "green", size: "sm", onClick: openCreateModal, rightSection: /* @__PURE__ */ jsx(IconPlus, {}), children: i18n._(
      /*i18n*/
      {
        id: "VX6WUv"
      }
    ) }) }),
    /* @__PURE__ */ jsx(TableSkeleton, { isVisible: !locations }),
    locations && /* @__PURE__ */ jsx(LocationsTable, { locations, openCreateModal }),
    !!(locations == null ? void 0 : locations.length) && /* @__PURE__ */ jsx(Pagination, { value: searchParams.pageNumber, onChange: (value) => setSearchParams({
      pageNumber: value
    }), total: Number(pagination == null ? void 0 : pagination.last_page) }),
    createModalOpen && /* @__PURE__ */ jsx(LocationEditModal, { onClose: closeCreateModal, organizerId, location: null })
  ] });
}
export {
  Locations as default
};
