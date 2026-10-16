import { jsx, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useCombobox, Input, Group, ThemeIcon, Text, Badge, Button, TextInput, Select, Combobox, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import { IconMapPin, IconPencil, IconSearch, IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { c as countries } from "./countries-C8-MXWCy.js";
import { a as useResolveGeoPlace, b as useGetOrganizerLocations, c as useGeoAutocomplete } from "./useCreateLocation-DZ93UmD2.js";
import { u as useGeoStatus } from "./useGeoStatus-GfcfS0IW.js";
import { f as formatAddress, i as isAddressSet } from "./addressUtilities-7xIQim0X.js";
import { a as showError } from "./notifications-Coh3Ef-t.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
const panel = "_panel_ulwgv_1";
const card = "_card_ulwgv_8";
const cardDetails = "_cardDetails_ulwgv_16";
const cardText = "_cardText_ulwgv_21";
const cardTitle = "_cardTitle_ulwgv_27";
const cardBadge = "_cardBadge_ulwgv_31";
const cardActions = "_cardActions_ulwgv_35";
const classes = {
  panel,
  card,
  cardDetails,
  cardText,
  cardTitle,
  cardBadge,
  cardActions
};
const emptyAddress = () => ({
  venue_name: "",
  address_line_1: "",
  address_line_2: "",
  city: "",
  state_or_region: "",
  zip_or_postal_code: "",
  country: ""
});
const placeToValue = (place) => ({
  kind: "new",
  address: {
    venue_name: place.address.venue_name ?? "",
    address_line_1: place.address.address_line_1 ?? "",
    address_line_2: place.address.address_line_2 ?? "",
    city: place.address.city ?? "",
    state_or_region: place.address.state_or_region ?? "",
    zip_or_postal_code: place.address.zip_or_postal_code ?? "",
    country: place.address.country ?? ""
  },
  latitude: place.latitude ?? null,
  longitude: place.longitude ?? null,
  provider: place.provider,
  providerPlaceId: place.provider_place_id
});
const locationLabel = (location) => {
  var _a;
  return location.name || ((_a = location.structured_address) == null ? void 0 : _a.venue_name) || formatAddress(location.structured_address ?? {}) || i18n._(
    /*i18n*/
    {
      id: "K6L5Mx"
    }
  );
};
const matchesQuery = (location, query) => {
  var _a, _b, _c;
  const needle = query.trim().toLowerCase();
  if (needle === "") {
    return true;
  }
  return [location.name, (_a = location.structured_address) == null ? void 0 : _a.venue_name, (_b = location.structured_address) == null ? void 0 : _b.address_line_1, (_c = location.structured_address) == null ? void 0 : _c.city].some((field) => field == null ? void 0 : field.toLowerCase().includes(needle));
};
const LocationPicker = ({
  organizerId,
  value,
  onChange,
  error,
  clearable = false
}) => {
  var _a, _b, _c, _d;
  const [view, setView] = useState(value ? "card" : "search");
  const touchedRef = useRef(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 250);
  const combobox = useCombobox();
  const geoStatus = useGeoStatus();
  const geoAvailable = ((_b = (_a = geoStatus.data) == null ? void 0 : _a.data) == null ? void 0 : _b.available) === true;
  const resolvePlace = useResolveGeoPlace();
  const savedLocationsQuery = useGetOrganizerLocations(organizerId, {
    perPage: 100,
    sortBy: "name",
    sortDirection: "asc"
  }, !!organizerId);
  const savedLocations = ((_c = savedLocationsQuery.data) == null ? void 0 : _c.data) ?? [];
  const suggestionsQuery = useGeoAutocomplete(organizerId, debouncedQuery, {
    enabled: geoAvailable && view === "search" && debouncedQuery.trim().length >= 3
  });
  const suggestions = ((_d = suggestionsQuery.data) == null ? void 0 : _d.data) ?? [];
  useEffect(() => {
    if (value && !touchedRef.current && view === "search") {
      setView("card");
    }
  }, [value === null]);
  const savedMatches = savedLocations.filter((location) => matchesQuery(location, query)).slice(0, 5);
  const startSearch = () => {
    touchedRef.current = true;
    setQuery("");
    setView("search");
  };
  const startManual = () => {
    touchedRef.current = true;
    if ((value == null ? void 0 : value.kind) !== "new") {
      onChange({
        kind: "new",
        address: emptyAddress(),
        latitude: null,
        longitude: null,
        provider: null,
        providerPlaceId: null
      });
    }
    setView("manual");
  };
  const handleOptionSubmit = async (optionValue) => {
    touchedRef.current = true;
    combobox.closeDropdown();
    if (optionValue.startsWith("saved-")) {
      const location = savedLocations.find((candidate) => String(candidate.id) === optionValue.slice("saved-".length));
      if (location) {
        onChange({
          kind: "saved",
          location
        });
        setView("card");
      }
      return;
    }
    try {
      const response = await resolvePlace.mutateAsync({
        organizerId,
        placeId: optionValue
      });
      onChange(placeToValue(response.data));
      setView("card");
    } catch {
      showError(i18n._(
        /*i18n*/
        {
          id: "KOavaU"
        }
      ));
    }
  };
  const updateAddress = (field, fieldValue) => {
    if ((value == null ? void 0 : value.kind) !== "new") {
      return;
    }
    onChange({
      ...value,
      address: {
        ...value.address,
        [field]: fieldValue ?? ""
      }
    });
  };
  if (view === "card" && value) {
    const isSaved = value.kind === "saved";
    const address = isSaved ? value.location.structured_address ?? {} : value.address;
    const title = isSaved ? locationLabel(value.location) : value.address.venue_name || value.address.address_line_1 || formatAddress(value.address) || i18n._(
      /*i18n*/
      {
        id: "y0Fcpd"
      }
    );
    const addressLine = isAddressSet(address) ? formatAddress(address) : null;
    return /* @__PURE__ */ jsx(Input.Wrapper, { label: i18n._(
      /*i18n*/
      {
        id: "wJijgU"
      }
    ), error, children: /* @__PURE__ */ jsxs("div", { className: `${classes.panel} ${classes.card}`, children: [
      /* @__PURE__ */ jsxs(Group, { gap: "sm", wrap: "nowrap", className: classes.cardDetails, children: [
        /* @__PURE__ */ jsx(ThemeIcon, { variant: "light", radius: "xl", children: /* @__PURE__ */ jsx(IconMapPin, { size: 16 }) }),
        /* @__PURE__ */ jsxs("div", { className: classes.cardText, children: [
          /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
            /* @__PURE__ */ jsx(Text, { fw: 600, truncate: true, className: classes.cardTitle, children: title }),
            /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", color: isSaved ? "blue" : "green", className: classes.cardBadge, children: isSaved ? i18n._(
              /*i18n*/
              {
                id: "4RvD9q"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "y0Fcpd"
              }
            ) })
          ] }),
          addressLine && /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", truncate: true, children: addressLine })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Group, { gap: 6, className: classes.cardActions, children: [
        value.kind === "new" && /* @__PURE__ */ jsx(Button, { variant: "default", size: "xs", leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: () => {
          touchedRef.current = true;
          setView("manual");
        }, children: i18n._(
          /*i18n*/
          {
            id: "ePK91l"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { variant: "default", size: "xs", leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 14 }), onClick: startSearch, children: i18n._(
          /*i18n*/
          {
            id: "o+XJ9D"
          }
        ) }),
        clearable && /* @__PURE__ */ jsx(Button, { variant: "light", color: "red", size: "xs", onClick: () => {
          touchedRef.current = true;
          onChange(null);
          setQuery("");
          setView("search");
        }, children: i18n._(
          /*i18n*/
          {
            id: "t/YqKh"
          }
        ) })
      ] })
    ] }) });
  }
  if (view === "manual" && (value == null ? void 0 : value.kind) === "new") {
    return /* @__PURE__ */ jsx(Input.Wrapper, { label: i18n._(
      /*i18n*/
      {
        id: "wJijgU"
      }
    ), error, children: /* @__PURE__ */ jsxs("div", { className: classes.panel, children: [
      /* @__PURE__ */ jsxs(Group, { gap: "xs", mb: "sm", children: [
        /* @__PURE__ */ jsx(ThemeIcon, { variant: "light", size: "sm", radius: "xl", children: /* @__PURE__ */ jsx(IconMapPin, { size: 13 }) }),
        /* @__PURE__ */ jsx(Text, { fw: 600, size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "y0Fcpd"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "E/9LUk"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "ih35UP"
        }
      ), value: value.address.venue_name ?? "", onChange: (event) => updateAddress("venue_name", event.currentTarget.value) }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "POdIrN"
          }
        ), value: value.address.address_line_1 ?? "", onChange: (event) => updateAddress("address_line_1", event.currentTarget.value) }),
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "gwk5gg"
          }
        ), value: value.address.address_line_2 ?? "", onChange: (event) => updateAddress("address_line_2", event.currentTarget.value) })
      ] }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "3wV73y"
          }
        ), value: value.address.city ?? "", onChange: (event) => updateAddress("city", event.currentTarget.value) }),
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "/2by1f"
          }
        ), value: value.address.state_or_region ?? "", onChange: (event) => updateAddress("state_or_region", event.currentTarget.value) })
      ] }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "BM/KQm"
          }
        ), value: value.address.zip_or_postal_code ?? "", onChange: (event) => updateAddress("zip_or_postal_code", event.currentTarget.value) }),
        /* @__PURE__ */ jsx(Select, { searchable: true, data: countries, label: i18n._(
          /*i18n*/
          {
            id: "JNCzPW"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "Mqy/Zy"
          }
        ), value: value.address.country || null, onChange: (country) => updateAddress("country", country) })
      ] }),
      /* @__PURE__ */ jsxs(Group, { justify: "space-between", mt: "sm", children: [
        /* @__PURE__ */ jsx(Button, { variant: "default", size: "xs", leftSection: /* @__PURE__ */ jsx(IconArrowLeft, { size: 14 }), onClick: startSearch, children: i18n._(
          /*i18n*/
          {
            id: "nsm7BA"
          }
        ) }),
        /* @__PURE__ */ jsx(Button, { variant: "light", size: "xs", leftSection: /* @__PURE__ */ jsx(IconCheck, { size: 14 }), disabled: !isAddressSet(value.address), onClick: () => setView("card"), children: i18n._(
          /*i18n*/
          {
            id: "PpgtnC"
          }
        ) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Input.Wrapper, { label: i18n._(
    /*i18n*/
    {
      id: "wJijgU"
    }
  ), error, children: [
    /* @__PURE__ */ jsxs(Combobox, { store: combobox, onOptionSubmit: handleOptionSubmit, withinPortal: true, children: [
      /* @__PURE__ */ jsx(Combobox.Target, { children: /* @__PURE__ */ jsx(TextInput, { placeholder: i18n._(
        /*i18n*/
        {
          id: "IG85fV"
        }
      ), value: query, leftSection: /* @__PURE__ */ jsx(IconSearch, { size: 16 }), rightSection: suggestionsQuery.isFetching || resolvePlace.isPending ? /* @__PURE__ */ jsx(Loader, { size: "xs" }) : null, onChange: (event) => {
        touchedRef.current = true;
        setQuery(event.currentTarget.value);
        combobox.openDropdown();
      }, onFocus: () => combobox.openDropdown(), onBlur: () => combobox.closeDropdown() }) }),
      /* @__PURE__ */ jsx(Combobox.Dropdown, { children: /* @__PURE__ */ jsxs(Combobox.Options, { children: [
        savedMatches.length > 0 && /* @__PURE__ */ jsx(Combobox.Group, { label: i18n._(
          /*i18n*/
          {
            id: "cgw0cL"
          }
        ), children: savedMatches.map((location) => /* @__PURE__ */ jsxs(Combobox.Option, { value: `saved-${location.id}`, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: locationLabel(location) }),
          location.structured_address && isAddressSet(location.structured_address) && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: formatAddress(location.structured_address) })
        ] }, String(location.id))) }),
        suggestions.length > 0 && /* @__PURE__ */ jsx(Combobox.Group, { label: i18n._(
          /*i18n*/
          {
            id: "5WYZKZ"
          }
        ), children: suggestions.map((suggestion) => /* @__PURE__ */ jsxs(Combobox.Option, { value: suggestion.provider_place_id, children: [
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: suggestion.primary_text }),
          suggestion.secondary_text && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: suggestion.secondary_text })
        ] }, suggestion.provider_place_id)) }),
        savedMatches.length === 0 && suggestions.length === 0 && /* @__PURE__ */ jsx(Combobox.Empty, { children: i18n._(
          /*i18n*/
          {
            id: "mPdY6W"
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Group, { justify: "space-between", mt: "xs", children: [
      /* @__PURE__ */ jsx(Button, { variant: "default", size: "xs", leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: startManual, children: i18n._(
        /*i18n*/
        {
          id: "j+eCIq"
        }
      ) }),
      value && /* @__PURE__ */ jsx(Button, { variant: "default", size: "xs", onClick: () => {
        touchedRef.current = true;
        setView("card");
      }, children: i18n._(
        /*i18n*/
        {
          id: "dEgA5A"
        }
      ) })
    ] })
  ] });
};
export {
  LocationPicker as L
};
