import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { useParams, useNavigate, useLocation } from "react-router";
import { useForm } from "@mantine/form";
import { u as useFormErrorResponseHandler } from "./useFormErrorResponseHandler-Sev5QhLr.js";
import { useEffect, useState, useMemo } from "react";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { H as HeadingWithDescription } from "./index-encY-Si0.js";
import { TextInput, Switch, Button, Select, UnstyledButton, Group, Text, Collapse, Stack, Badge, List, ThemeIcon, Radio, Alert, Loader, Box, Title, CopyButton, Tooltip, ActionIcon, Accordion, Divider, Anchor, Checkbox, NavLink } from "@mantine/core";
import { u as useGetOrganizerSettings } from "./useGetOrganizerSettings-oZkWKvDt.js";
import { u as useUpdateOrganizerSettings } from "./useUpdateOrganizerSettings-kVr2AheM.js";
import { G as GET_ORGANIZER_QUERY_KEY, u as useGetOrganizer } from "./useGetOrganizer-DMDsW5DW.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { a as currencies } from "./currencies-wzczGcKi.js";
import { t as timezones } from "./timezones-CsvfI1Rm.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { o as organizerClient, f as api } from "../entry.server.js";
import { G as GET_ORGANIZERS_QUERY_KEY, u as useGetOrganizers } from "./useGetOrganizers-AXXYibKP.js";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandLinkedin, IconBrandYoutube, IconBrandTiktok, IconBrandDiscord, IconBrandSnapchat, IconBrandTwitch, IconBrandReddit, IconBrandPinterest, IconBrandWhatsapp, IconBrandTelegram, IconBrandGithub, IconBrandVimeo, IconBrandVk, IconBrandWeibo, IconChevronUp, IconChevronDown, IconUsers, IconUser, IconAlertCircle, IconClock, IconRefresh, IconCircleCheck, IconCheck, IconCopy, IconExternalLink, IconBrandStripe, IconBolt, IconWorld, IconShieldCheck, IconTrash, IconArrowBackUp, IconArchive, IconBrandGoogle, IconTag, IconInfoCircle, IconCalendarEvent, IconMapPin, IconShare, IconBrandGoogleAnalytics, IconMail, IconChartBar, IconAlertTriangle, IconPercentage } from "@tabler/icons-react";
import { L as LocationPicker } from "./index-iW6667X7.js";
import { u as useCreateLocation } from "./useCreateLocation-DZ93UmD2.js";
import { i as isAddressSet, s as sameAddress } from "./addressUtilities-7xIQim0X.js";
import { u as useGetEmailTemplatesForOrganizer, a as useGetDefaultEmailTemplates, b as useCreateEmailTemplateForOrganizer, c as useUpdateEmailTemplateForOrganizer, d as useDeleteEmailTemplateForOrganizer, e as usePreviewEmailTemplateForOrganizer, E as EmailTemplateSettingsBase, S as SelfServiceSettings, P as PlatformFeesSettings$1, D as DangerZone, f as DangerZoneSection } from "./index-i3GvAOHd.js";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { Trans } from "@lingui/react";
import { C as Callout } from "./index-CwjvB_vn.js";
import { modals } from "@mantine/modals";
import { u as useUpdateOrganizerStatus } from "./useUpdateOrganizerStatus-CAGj3GlG.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { O as OrganizerStatus } from "./types-CqPWB-a5.js";
import { u as useIsCurrentUserAdmin } from "./useIsCurrentUserAdmin-DKXhmYit.js";
import { B as BouncingEmoji } from "./index-Bhmm_OXR.js";
import { u as useGetAccount } from "./useGetAccount-CGfwRfDK.js";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { useMediaQuery } from "@mantine/hooks";
import "@mantine/notifications";
import "classnames";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./countries-C8-MXWCy.js";
import "./useGeoStatus-GfcfS0IW.js";
import "./useGetEvent-DyvalBPE.js";
import "./currency-Br7a8J7F.js";
const SeoSettings = () => {
  const {
    organizerId
  } = useParams();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const form = useForm({
    initialValues: {
      allow_search_engine_indexing: true,
      seo_title: "",
      seo_description: "",
      seo_keywords: ""
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      form.setValues({
        allow_search_engine_indexing: organizerSettingsQuery.data.allow_search_engine_indexing,
        seo_title: organizerSettingsQuery.data.seo_title,
        seo_description: organizerSettingsQuery.data.seo_description,
        seo_keywords: organizerSettingsQuery.data.seo_keywords
      });
    }
  }, [organizerSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      organizerSettings: values,
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "0Dk/l8"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "GfWoKv"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "iJhSxe"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_title"), description: i18n._(
        /*i18n*/
        {
          id: "esY5SG"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "rXngLf"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "vX8/tc"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_description"), description: i18n._(
        /*i18n*/
        {
          id: "h179TP"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "j1VfcT"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "/bhMdO"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("seo_keywords"), description: i18n._(
        /*i18n*/
        {
          id: "yPI7n9"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "/SIY6o"
        }
      ), placeholder: i18n._(
        /*i18n*/
        {
          id: "ApOYO8"
        }
      ) }),
      /* @__PURE__ */ jsx(Switch, { ...form.getInputProps("allow_search_engine_indexing", {
        type: "checkbox"
      }), description: i18n._(
        /*i18n*/
        {
          id: "LRbt6D"
        }
      ), label: i18n._(
        /*i18n*/
        {
          id: "ipYKgM"
        }
      ) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const useUpdateOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      organizerData
    }) => organizerClient.update(organizerId, organizerData),
    onSuccess: (_, variables) => Promise.all([queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_QUERY_KEY, variables.organizerId]
    }), queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZERS_QUERY_KEY]
    })])
  });
};
const Settings$1 = () => {
  const {
    organizerId
  } = useParams();
  const {
    data: organizer
  } = useGetOrganizer(organizerId);
  const organizerMutation = useUpdateOrganizer();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      currency: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });
  const handleSubmit = (values) => {
    organizerMutation.mutate({
      organizerId,
      organizerData: values
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "5n+Wwp"
          }
        ));
      },
      onError: (error) => {
        useFormErrorResponseHandler()(form, error);
      }
    });
  };
  useEffect(() => {
    form.setValues({
      name: String(organizer == null ? void 0 : organizer.name),
      email: String(organizer == null ? void 0 : organizer.email),
      currency: String(organizer == null ? void 0 : organizer.currency),
      timezone: String(organizer == null ? void 0 : organizer.timezone),
      phone: String((organizer == null ? void 0 : organizer.phone) || ""),
      website: String((organizer == null ? void 0 : organizer.website) || ""),
      description: String((organizer == null ? void 0 : organizer.description) || "")
    });
  }, [organizer]);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "jIPNJG"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "3ep0Gx"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerMutation.isPending, children: [
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("name"), required: true, label: i18n._(
          /*i18n*/
          {
            id: "Pa6G7v"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "dFJnia"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "Yrbm6T"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("email"), label: i18n._(
          /*i18n*/
          {
            id: "O3oNi5"
          }
        ), required: true, description: i18n._(
          /*i18n*/
          {
            id: "kvpxIU"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "V7yhws"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Editor, { label: i18n._(
        /*i18n*/
        {
          id: "Nu4oKW"
        }
      ), value: form.values.description || "", editorType: "simple", description: i18n._(
        /*i18n*/
        {
          id: "/z/bH1"
        }
      ), onChange: (value) => form.setFieldValue("description", value), maxLength: 1e3 }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("phone"), label: i18n._(
          /*i18n*/
          {
            id: "zmwvG2"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "zGiMDM"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("website"), label: i18n._(
          /*i18n*/
          {
            id: "On0aF2"
          }
        ), type: "url", placeholder: i18n._(
          /*i18n*/
          {
            id: "FONsLE"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsx(Select, { ...form.getInputProps("currency"), searchable: true, required: true, data: Object.entries(currencies).map(([key, value]) => ({
          value,
          label: key
        })), label: i18n._(
          /*i18n*/
          {
            id: "Q2lUR2"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "5/63nR"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "QXlz+n"
          }
        ) }),
        /* @__PURE__ */ jsx(Select, { ...form.getInputProps("timezone"), searchable: true, required: true, data: timezones, label: i18n._(
          /*i18n*/
          {
            id: "40Gx0U"
          }
        ), placeholder: i18n._(
          /*i18n*/
          {
            id: "vgwVkd"
          }
        ), description: i18n._(
          /*i18n*/
          {
            id: "mnafgQ"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: organizerMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const socialPlatforms = [
  // Primary platforms (always visible)
  {
    name: i18n._(
      /*i18n*/
      {
        id: "DwuoH0"
      }
    ),
    field: "facebook_handle",
    icon: IconBrandFacebook,
    placeholder: "username",
    priority: "primary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "CTWsuc"
      }
    ),
    field: "instagram_handle",
    icon: IconBrandInstagram,
    placeholder: "username",
    priority: "primary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "nhtR6Y"
      }
    ),
    field: "twitter_handle",
    icon: IconBrandX,
    placeholder: "username",
    priority: "primary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "gggTBm"
      }
    ),
    field: "linkedin_handle",
    icon: IconBrandLinkedin,
    placeholder: "username",
    priority: "primary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "9Q6UKX"
      }
    ),
    field: "youtube_handle",
    icon: IconBrandYoutube,
    placeholder: "channel",
    priority: "primary"
  },
  // Secondary platforms (collapsible)
  {
    name: i18n._(
      /*i18n*/
      {
        id: "zyUxcw"
      }
    ),
    field: "tiktok_handle",
    icon: IconBrandTiktok,
    placeholder: "username",
    priority: "primary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "OdPOhy"
      }
    ),
    field: "discord_handle",
    icon: IconBrandDiscord,
    placeholder: "user_id",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "9wu8nm"
      }
    ),
    field: "snapchat_handle",
    icon: IconBrandSnapchat,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "dBeuY2"
      }
    ),
    field: "twitch_handle",
    icon: IconBrandTwitch,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "JjMIKU"
      }
    ),
    field: "reddit_handle",
    icon: IconBrandReddit,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "zFIMat"
      }
    ),
    field: "pinterest_handle",
    icon: IconBrandPinterest,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "2+ExvJ"
      }
    ),
    field: "whatsapp_handle",
    icon: IconBrandWhatsapp,
    placeholder: "phone_number",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "SchpMp"
      }
    ),
    field: "telegram_handle",
    icon: IconBrandTelegram,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "RkXlPZ"
      }
    ),
    field: "github_handle",
    icon: IconBrandGithub,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "6dp/Hz"
      }
    ),
    field: "vimeo_handle",
    icon: IconBrandVimeo,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "SS4mGB"
      }
    ),
    field: "vk_handle",
    icon: IconBrandVk,
    placeholder: "username",
    priority: "secondary"
  },
  {
    name: i18n._(
      /*i18n*/
      {
        id: "vKLEXy"
      }
    ),
    field: "weibo_handle",
    icon: IconBrandWeibo,
    placeholder: "username",
    priority: "secondary"
  }
];
const SocialLinks = () => {
  const {
    organizerId
  } = useParams();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const [showMore, setShowMore] = useState(false);
  const initialValues = socialPlatforms.reduce((acc, platform) => {
    acc[platform.field] = "";
    return acc;
  }, {});
  const form = useForm({
    initialValues
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      const formValues = {};
      if (organizerSettingsQuery.data.website_url) {
        formValues.website_url = organizerSettingsQuery.data.website_url;
      }
      if (organizerSettingsQuery.data.social_media_handles) {
        socialPlatforms.forEach((platform) => {
          if (platform.field !== "website_url") {
            const handle = platform.field.replace("_handle", "");
            if (organizerSettingsQuery.data.social_media_handles[handle]) {
              formValues[platform.field] = organizerSettingsQuery.data.social_media_handles[handle];
            }
          }
        });
      }
      form.setValues(formValues);
    }
  }, [organizerSettingsQuery.isFetched]);
  const hasSecondaryValues = useMemo(() => {
    return socialPlatforms.filter((p) => p.priority === "secondary").some((platform) => form.values[platform.field] && form.values[platform.field].trim() !== "");
  }, [form.values]);
  useEffect(() => {
    if (hasSecondaryValues) {
      setShowMore(true);
    }
  }, [hasSecondaryValues]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      organizerSettings: values,
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "MhOoLQ"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  const primaryPlatforms = socialPlatforms.filter((p) => p.priority === "primary");
  const secondaryPlatforms = socialPlatforms.filter((p) => p.priority === "secondary");
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "j/TOB3"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "NsWqSP"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(InputGroup, { children: primaryPlatforms.map((platform) => {
        const Icon = platform.icon;
        return /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps(platform.field), label: platform.name, placeholder: platform.placeholder, leftSection: /* @__PURE__ */ jsx(Icon, { size: 18 }), type: platform.field === "website_url" ? "url" : "text" }, platform.field);
      }) }),
      /* @__PURE__ */ jsx(UnstyledButton, { onClick: () => setShowMore(!showMore), style: {
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: "8px",
        backgroundColor: "var(--mantine-color-gray-0)",
        border: "1px solid var(--mantine-color-gray-3)",
        transition: "all 0.2s"
      }, onMouseEnter: (e) => {
        e.currentTarget.style.backgroundColor = "var(--mantine-color-gray-1)";
      }, onMouseLeave: (e) => {
        e.currentTarget.style.backgroundColor = "var(--mantine-color-gray-0)";
      }, children: /* @__PURE__ */ jsxs(Group, { justify: "center", gap: "xs", children: [
        showMore ? /* @__PURE__ */ jsx(IconChevronUp, { size: 18 }) : /* @__PURE__ */ jsx(IconChevronDown, { size: 18 }),
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: showMore ? i18n._(
          /*i18n*/
          {
            id: "UVPI5D"
          }
        ) : hasSecondaryValues ? i18n._(
          /*i18n*/
          {
            id: "cMW+gm",
            values: {
              0: secondaryPlatforms.filter((p) => form.values[p.field]).length
            }
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "b33PL9"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(Collapse, { expanded: showMore, children: /* @__PURE__ */ jsx(InputGroup, { children: secondaryPlatforms.map((platform) => {
        const Icon = platform.icon;
        return /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps(platform.field), label: platform.name, placeholder: platform.placeholder, leftSection: /* @__PURE__ */ jsx(Icon, { size: 18 }), type: platform.field === "website_url" ? "url" : "text" }, platform.field);
      }) }) }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", mt: "xl", children: i18n._(
        /*i18n*/
        {
          id: "KZrfYJ"
        }
      ) })
    ] }) })
  ] });
};
const useUpdateOrganizerLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      locationId
    }) => organizerClient.updateLocation(organizerId, locationId),
    onSuccess: (_, vars) => queryClient.invalidateQueries({
      queryKey: [GET_ORGANIZER_QUERY_KEY, vars.organizerId]
    })
  });
};
const AddressSettings = () => {
  const {
    organizerId
  } = useParams();
  const organizerQuery = useGetOrganizer(organizerId);
  const createLocationMutation = useCreateLocation();
  const updateOrganizerLocationMutation = useUpdateOrganizerLocation();
  const form = useForm({
    initialValues: {
      location: null
    },
    validate: {
      location: (value) => {
        if (value && value.kind === "new" && !isAddressSet(value.address)) {
          return i18n._(
            /*i18n*/
            {
              id: "SKx/0u"
            }
          );
        }
        return null;
      }
    }
  });
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((organizerQuery == null ? void 0 : organizerQuery.isFetched) && organizerQuery.data) {
      const organizer = organizerQuery.data;
      form.setValues({
        location: organizer.location_id && organizer.location ? {
          kind: "saved",
          location: {
            ...organizer.location,
            id: organizer.location.id ?? organizer.location_id
          }
        } : null
      });
    }
  }, [organizerQuery.isFetched]);
  const resolveLocationId = async (value) => {
    var _a, _b, _c;
    if (value.kind === "saved") {
      return value.location.id ? Number(value.location.id) : null;
    }
    if (!organizerId || !isAddressSet(value.address)) {
      return null;
    }
    const existingLocationId = ((_a = organizerQuery.data) == null ? void 0 : _a.location_id) ?? null;
    const existingAddress = ((_c = (_b = organizerQuery.data) == null ? void 0 : _b.location) == null ? void 0 : _c.structured_address) ?? null;
    if (existingLocationId !== null && existingAddress !== null && sameAddress(existingAddress, value.address)) {
      return Number(existingLocationId);
    }
    const created = await createLocationMutation.mutateAsync({
      organizerId,
      payload: {
        name: value.address.venue_name || null,
        structured_address: value.address,
        latitude: value.latitude,
        longitude: value.longitude,
        provider: value.provider,
        provider_place_id: value.providerPlaceId
      }
    });
    return created.data.id ?? null;
  };
  const handleSubmit = async (values) => {
    var _a;
    if (!organizerId) {
      return;
    }
    try {
      const locationId = values.location ? await resolveLocationId(values.location) : null;
      const existingLocationId = ((_a = organizerQuery.data) == null ? void 0 : _a.location_id) ?? null;
      if (locationId !== null || existingLocationId !== null) {
        await updateOrganizerLocationMutation.mutateAsync({
          organizerId,
          locationId
        });
      }
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "RuaKfn"
        }
      ));
    } catch (error) {
      formErrorHandle(form, error);
    }
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "Du6bPw"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "Xd1R1a"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerQuery.isLoading || createLocationMutation.isPending || updateOrganizerLocationMutation.isPending, children: [
      organizerId && /* @__PURE__ */ jsx(LocationPicker, { organizerId, value: form.values.location, onChange: (value) => form.setFieldValue("location", value), error: form.errors.location, clearable: true }),
      /* @__PURE__ */ jsx(Button, { loading: createLocationMutation.isPending || updateOrganizerLocationMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const EmailTemplateSettings = ({
  organizerId
}) => {
  const [shouldFetchDefaults, setShouldFetchDefaults] = useState(false);
  const {
    data: templatesData,
    isLoading
  } = useGetEmailTemplatesForOrganizer(organizerId, {
    include_inactive: true
  });
  const {
    data: defaultTemplatesData
  } = useGetDefaultEmailTemplates(shouldFetchDefaults);
  const createMutation = useCreateEmailTemplateForOrganizer();
  const updateMutation = useUpdateEmailTemplateForOrganizer();
  const deleteMutation = useDeleteEmailTemplateForOrganizer();
  const previewMutation = usePreviewEmailTemplateForOrganizer();
  const templates = (templatesData == null ? void 0 : templatesData.data) || [];
  const handleCreateTemplate = (type) => {
    if (!defaultTemplatesData) {
      setShouldFetchDefaults(true);
    }
  };
  return /* @__PURE__ */ jsx(EmailTemplateSettingsBase, { contextId: organizerId, contextType: "organizer", templates, defaultTemplates: defaultTemplatesData, isLoading, createMutation, updateMutation, deleteMutation, previewMutation, onCreateTemplate: handleCreateTemplate });
};
const EventDefaults = () => {
  const {
    organizerId
  } = useParams();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const form = useForm({
    initialValues: {
      default_attendee_details_collection_method: "PER_ORDER",
      default_show_marketing_opt_in: true,
      default_allow_attendee_self_edit: false
    }
  });
  const attendeeCollectionOptions = [{
    icon: /* @__PURE__ */ jsx(IconUsers, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "hauDFf"
      }
    ),
    value: "PER_TICKET",
    description: i18n._(
      /*i18n*/
      {
        id: "4bUH9i"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconUser, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "VlXNyK"
      }
    ),
    value: "PER_ORDER",
    description: i18n._(
      /*i18n*/
      {
        id: "0k4cdb"
      }
    )
  }];
  const formErrorHandle = useFormErrorResponseHandler();
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      form.setValues({
        default_attendee_details_collection_method: organizerSettingsQuery.data.default_attendee_details_collection_method || "PER_ORDER",
        default_show_marketing_opt_in: organizerSettingsQuery.data.default_show_marketing_opt_in ?? true,
        default_allow_attendee_self_edit: organizerSettingsQuery.data.default_allow_attendee_self_edit ?? false
      });
    }
  }, [organizerSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    updateMutation.mutate({
      organizerSettings: values,
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "kzx0uD"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "0Zptey"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "eXssj5"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx(CustomSelect, { optionList: attendeeCollectionOptions, form, name: "default_attendee_details_collection_method", label: i18n._(
        /*i18n*/
        {
          id: "JtI4vj"
        }
      ), required: true }),
      /* @__PURE__ */ jsx(Switch, { mt: "md", label: i18n._(
        /*i18n*/
        {
          id: "SXzpzO"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "blXLKj"
        }
      ), ...form.getInputProps("default_show_marketing_opt_in", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsx(SelfServiceSettings, { value: form.values.default_allow_attendee_self_edit, onChange: (value) => form.setFieldValue("default_allow_attendee_self_edit", value), isDefault: true }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const organizerStripeClient = {
  createOrGetConnectDetails: async (organizerId, platform) => {
    const response = await api.post(`organizers/${organizerId}/stripe/connect`, {
      platform
    });
    return response.data;
  },
  getConnectAccounts: async (organizerId) => {
    const response = await api.get(`organizers/${organizerId}/stripe/connect_accounts`);
    return response.data;
  },
  copyConnection: async (organizerId, sourceOrganizerId) => {
    const response = await api.post(`organizers/${organizerId}/stripe/copy_from/${sourceOrganizerId}`, {});
    return response.data;
  },
  disconnectAccount: async (organizerId, stripeAccountId) => {
    await api.delete(`organizers/${organizerId}/stripe/connect_accounts/${stripeAccountId}`);
  }
};
const GET_ORGANIZER_STRIPE_CONNECT_QUERY_KEY = "getOrganizerStripeConnect";
const useGetOrganizerStripeConnect = (organizerId, options) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_STRIPE_CONNECT_QUERY_KEY, organizerId],
    queryFn: async () => {
      const {
        data
      } = await organizerStripeClient.getConnectAccounts(organizerId);
      return data;
    },
    ...options
  });
};
const GET_ORGANIZER_STRIPE_CONNECT_DETAILS = "getOrganizerStripeConnectDetails";
const useCreateOrGetOrganizerStripeConnect = (organizerId, enabled, platform) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_STRIPE_CONNECT_DETAILS, organizerId, platform],
    queryFn: async () => {
      const {
        data
      } = await organizerStripeClient.createOrGetConnectDetails(organizerId, platform);
      return data;
    },
    enabled,
    retry: false
  });
};
const useCopyStripeConnectFromOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      sourceOrganizerId
    }) => organizerStripeClient.copyConnection(organizerId, sourceOrganizerId),
    onSuccess: (_, variables) => {
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_STRIPE_CONNECT_QUERY_KEY, variables.organizerId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_QUERY_KEY, variables.organizerId]
      })]);
    }
  });
};
const useDisconnectOrganizerStripeConnect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId,
      stripeAccountId
    }) => organizerStripeClient.disconnectAccount(organizerId, stripeAccountId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: [GET_ORGANIZER_STRIPE_CONNECT_DETAILS, variables.organizerId]
      });
      return Promise.all([queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_STRIPE_CONNECT_QUERY_KEY, variables.organizerId]
      }), queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_QUERY_KEY, variables.organizerId]
      })]);
    }
  });
};
const CAPABILITY_LABELS = {
  card_payments: "Card payments",
  transfers: "Transfers",
  link_payments: "Link",
  klarna_payments: "Klarna",
  afterpay_clearpay_payments: "Afterpay / Clearpay",
  affirm_payments: "Affirm",
  bancontact_payments: "Bancontact",
  eps_payments: "EPS",
  ideal_payments: "iDEAL",
  sofort_payments: "SOFORT",
  sepa_debit_payments: "SEPA Direct Debit",
  p24_payments: "Przelewy24",
  blik_payments: "BLIK",
  mb_way_payments: "MB Way",
  revolut_pay_payments: "Revolut Pay",
  pix_payments: "Pix",
  boleto_payments: "Boleto",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  cashapp_payments: "Cash App Pay",
  amazon_pay_payments: "Amazon Pay",
  samsung_pay_payments: "Samsung Pay",
  payco_payments: "Payco",
  kakao_pay_payments: "Kakao Pay",
  naver_pay_payments: "Naver Pay",
  cartes_bancaires_payments: "Cartes Bancaires",
  grabpay_payments: "GrabPay",
  fpx_payments: "FPX",
  promptpay_payments: "PromptPay",
  konbini_payments: "Konbini",
  oxxo_payments: "OXXO",
  us_bank_account_ach_payments: "ACH Direct Debit",
  bacs_debit_payments: "Bacs Direct Debit",
  au_becs_debit_payments: "BECS Direct Debit",
  acss_debit_payments: "Pre-authorized debit (Canada)",
  multibanco_payments: "Multibanco"
};
const humanize = (key) => key.replace(/_payments?$/i, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const labelFor$1 = (key) => CAPABILITY_LABELS[key] ?? humanize(key);
const statusBadge = (status) => {
  if (status === "active") {
    return /* @__PURE__ */ jsx(Badge, { color: "green", variant: "light", children: i18n._(
      /*i18n*/
      {
        id: "F6pfE9"
      }
    ) });
  }
  if (status === "pending") {
    return /* @__PURE__ */ jsx(Badge, { color: "yellow", variant: "light", children: i18n._(
      /*i18n*/
      {
        id: "UbRKMZ"
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Badge, { color: "gray", variant: "light", children: i18n._(
    /*i18n*/
    {
      id: "NoNwIX"
    }
  ) });
};
const CapabilityList = ({
  capabilities
}) => {
  const entries = Object.entries(capabilities ?? {}).sort(([a], [b]) => labelFor$1(a).localeCompare(labelFor$1(b)));
  if (entries.length === 0) {
    return /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
      /*i18n*/
      {
        id: "E2vYsO"
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Stack, { gap: 6, children: entries.map(([key, status]) => /* @__PURE__ */ jsxs(Group, { justify: "space-between", wrap: "nowrap", children: [
    /* @__PURE__ */ jsx(Text, { size: "sm", children: labelFor$1(key) }),
    statusBadge(status)
  ] }, key)) });
};
const REQUIREMENT_LABELS = {
  external_account: "Bank account",
  "individual.verification.document": "Government-issued photo ID",
  "individual.verification.additional_document": "Additional ID verification",
  "individual.address.line1": "Personal address",
  "individual.address.city": "Personal city",
  "individual.address.postal_code": "Personal postal code",
  "individual.dob.day": "Date of birth",
  "individual.email": "Email address",
  "individual.first_name": "First name",
  "individual.last_name": "Last name",
  "individual.phone": "Phone number",
  "individual.ssn_last_4": "Last 4 of SSN",
  "individual.id_number": "Government ID number",
  "business_profile.url": "Business website",
  "business_profile.mcc": "Business category (MCC)",
  "business_profile.product_description": "Business description",
  "business_profile.support_phone": "Customer support phone",
  "company.tax_id": "Business tax ID",
  "company.name": "Legal business name",
  "company.address.line1": "Business address",
  "company.address.city": "Business city",
  "company.address.postal_code": "Business postal code",
  "company.verification.document": "Business verification document",
  "tos_acceptance.date": "Stripe terms acceptance",
  "tos_acceptance.ip": "Stripe terms acceptance"
};
const labelFor = (key) => {
  if (REQUIREMENT_LABELS[key]) return REQUIREMENT_LABELS[key];
  return key.replace(/_/g, " ").replace(/\./g, " ‣ ").replace(/\b\w/g, (c) => c.toUpperCase());
};
const RequirementsList = ({
  items,
  severity = "due"
}) => {
  if (!(items == null ? void 0 : items.length)) return null;
  const color = severity === "due" ? "orange" : "blue";
  const Icon = severity === "due" ? IconAlertCircle : IconClock;
  return /* @__PURE__ */ jsx(List, { spacing: 4, size: "sm", icon: /* @__PURE__ */ jsx(ThemeIcon, { color, variant: "light", size: 20, radius: "xl", children: /* @__PURE__ */ jsx(Icon, { size: 14 }) }), children: items.map((key) => /* @__PURE__ */ jsx(List.Item, { children: labelFor(key) }, key)) });
};
const EU_COUNTRIES = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
const getVatInfo = (stripeCountry) => {
  if (!stripeCountry || !EU_COUNTRIES.includes(stripeCountry.toUpperCase())) {
    return {
      isEU: false,
      isIreland: false,
      showVatForm: false
    };
  }
  const isIreland = stripeCountry.toUpperCase() === "IE";
  return {
    isEU: true,
    isIreland,
    showVatForm: !isIreland
  };
};
const vatClient = {
  getVatSetting: async (organizerId) => {
    const response = await api.get(`organizers/${organizerId}/vat-settings`);
    return response.data;
  },
  upsertVatSetting: async (organizerId, data) => {
    const response = await api.post(`organizers/${organizerId}/vat-settings`, data);
    return response.data;
  }
};
const GET_ORGANIZER_VAT_SETTING_QUERY_KEY = "organizerVatSetting";
const useGetOrganizerVatSetting = (organizerId, options) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_VAT_SETTING_QUERY_KEY, organizerId],
    queryFn: async () => {
      const {
        data
      } = await vatClient.getVatSetting(organizerId);
      return data;
    },
    ...options
  });
};
const useUpsertOrganizerVatSetting = (organizerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await vatClient.upsertVatSetting(organizerId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZER_VAT_SETTING_QUERY_KEY, organizerId]
      });
    }
  });
};
const EU_VAT_REGEX = /^[A-Z]{2}[0-9A-Z]{8,15}$/;
const validateVatNumber = (vatNumber) => {
  const trimmed = vatNumber.trim();
  if (trimmed.includes(" ")) {
    return {
      valid: false,
      error: i18n._(
        /*i18n*/
        {
          id: "CabI04"
        }
      )
    };
  }
  const upperCase = trimmed.toUpperCase();
  if (!EU_VAT_REGEX.test(upperCase)) {
    return {
      valid: false,
      error: i18n._(
        /*i18n*/
        {
          id: "PMhxAR"
        }
      )
    };
  }
  return {
    valid: true
  };
};
const ValidationStatusAlert = ({
  status,
  error,
  businessName,
  attempts
}) => {
  switch (status) {
    case "VALID":
      return /* @__PURE__ */ jsx(Callout, { variant: "success", title: i18n._(
        /*i18n*/
        {
          id: "gPgdNV"
        }
      ), children: businessName && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: businessName }) });
    case "PENDING":
    case "VALIDATING":
      return /* @__PURE__ */ jsxs(Alert, { color: "blue", icon: status === "VALIDATING" ? /* @__PURE__ */ jsx(Loader, { size: "xs" }) : /* @__PURE__ */ jsx(IconClock, {}), children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: status === "VALIDATING" ? i18n._(
          /*i18n*/
          {
            id: "imLQ9Y"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "EmFsMZ"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "ZOmUYW"
          }
        ) })
      ] });
    case "INVALID":
      return /* @__PURE__ */ jsxs(Alert, { color: "red", icon: /* @__PURE__ */ jsx(IconAlertCircle, {}), children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "RUMiLy"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: error || i18n._(
          /*i18n*/
          {
            id: "injXD7"
          }
        ) })
      ] });
    case "FAILED":
      return /* @__PURE__ */ jsxs(Alert, { color: "orange", icon: /* @__PURE__ */ jsx(IconRefresh, {}), children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "516oLj"
          }
        ) }),
        /* @__PURE__ */ jsxs(Text, { size: "xs", c: "dimmed", children: [
          i18n._(
            /*i18n*/
            {
              id: "x8rEDQ"
            }
          ),
          attempts > 0 && ` (${i18n._(
            /*i18n*/
            {
              id: "BCmibk"
            }
          )}: ${attempts})`
        ] })
      ] });
    default:
      return null;
  }
};
const VatSettingsForm = ({
  organizerId,
  onSuccess
}) => {
  var _a;
  const [vatRegistered, setVatRegistered] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [vatError, setVatError] = useState();
  const shouldPoll = vatNumber.trim().length > 0;
  const vatSettingQuery = useGetOrganizerVatSetting(organizerId, {
    refetchInterval: (query) => {
      if (!shouldPoll) {
        return false;
      }
      const data = query.state.data;
      if ((data == null ? void 0 : data.vat_validation_status) === "PENDING" || (data == null ? void 0 : data.vat_validation_status) === "VALIDATING") {
        return 5e3;
      }
      return false;
    }
  });
  const upsertMutation = useUpsertOrganizerVatSetting(organizerId);
  const existingSettings = vatSettingQuery.data;
  useEffect(() => {
    if (existingSettings && !vatRegistered) {
      setVatRegistered(existingSettings.vat_registered ? "yes" : "no");
      setVatNumber(existingSettings.vat_number || "");
    }
  }, [existingSettings, vatRegistered]);
  const handleVatNumberChange = (value) => {
    setVatNumber(value);
    if (vatError) {
      setVatError(void 0);
    }
  };
  const handleSave = async () => {
    if (vatRegistered === "yes" && !vatNumber) {
      showError(i18n._(
        /*i18n*/
        {
          id: "r+lQXT"
        }
      ));
      return;
    }
    if (vatRegistered === "yes") {
      const validation = validateVatNumber(vatNumber);
      if (!validation.valid) {
        setVatError(validation.error);
        showError(validation.error || i18n._(
          /*i18n*/
          {
            id: "N9JsFT"
          }
        ));
        return;
      }
    }
    try {
      const result = await upsertMutation.mutateAsync({
        vat_registered: vatRegistered === "yes",
        vat_number: vatRegistered === "yes" ? vatNumber.toUpperCase().trim() : null
      });
      if (!result.data.vat_registered) {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "Nfbg76"
          }
        ));
      } else if (result.data.vat_validation_status === "VALID") {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "gPgdNV"
          }
        ));
      } else if (result.data.vat_validation_status === "INVALID") {
        showError(i18n._(
          /*i18n*/
          {
            id: "vqji3Y"
          }
        ));
      } else if (result.data.vat_validation_status === "PENDING") {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "UvYql/"
          }
        ));
      } else {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "Nfbg76"
          }
        ));
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch {
      showError(i18n._(
        /*i18n*/
        {
          id: "l6acRV"
        }
      ));
    }
  };
  const canSave = vatRegistered && (vatRegistered === "no" || vatRegistered === "yes" && vatNumber.trim().length >= 10);
  const isCurrentVatNumber = ((_a = existingSettings == null ? void 0 : existingSettings.vat_number) == null ? void 0 : _a.toUpperCase()) === vatNumber.toUpperCase().trim();
  return /* @__PURE__ */ jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsx(Radio.Group, { value: vatRegistered, onChange: setVatRegistered, label: i18n._(
      /*i18n*/
      {
        id: "Uqefyd"
      }
    ), required: true, children: /* @__PURE__ */ jsxs(Group, { mt: "xs", children: [
      /* @__PURE__ */ jsx(Radio, { value: "no", label: i18n._(
        /*i18n*/
        {
          id: "HSw5l3"
        }
      ) }),
      /* @__PURE__ */ jsx(Radio, { value: "yes", label: i18n._(
        /*i18n*/
        {
          id: "X/azM1"
        }
      ) })
    ] }) }),
    vatRegistered === "yes" && /* @__PURE__ */ jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsx(TextInput, { label: i18n._(
        /*i18n*/
        {
          id: "pnVh83"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "IdULhL"
        }
      ), placeholder: "IE1234567A", value: vatNumber, onChange: (e) => handleVatNumberChange(e.target.value), maxLength: 17, required: true, error: vatError }),
      (existingSettings == null ? void 0 : existingSettings.vat_number) && !vatError && isCurrentVatNumber && /* @__PURE__ */ jsx(ValidationStatusAlert, { status: existingSettings.vat_validation_status, error: existingSettings.vat_validation_error, businessName: existingSettings.business_name, attempts: existingSettings.vat_validation_attempts })
    ] }),
    /* @__PURE__ */ jsxs(Group, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: handleSave, loading: upsertMutation.isPending, disabled: !canSave, children: i18n._(
        /*i18n*/
        {
          id: "6/TNCd"
        }
      ) }),
      vatRegistered === "yes" && !isCurrentVatNumber && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "QBlhh4"
        }
      ) })
    ] })
  ] });
};
const VatSettings = ({
  organizerId,
  stripeCountry
}) => {
  const vatSettingQuery = useGetOrganizerVatSetting(organizerId);
  const vatInfo = getVatInfo(stripeCountry);
  if (!vatInfo.isEU) {
    return null;
  }
  const existingSettings = vatSettingQuery.data;
  const needsVatInfo = (existingSettings == null ? void 0 : existingSettings.vat_registered) == null;
  if (vatInfo.isIreland) {
    return /* @__PURE__ */ jsx(Callout, { variant: "info", title: i18n._(
      /*i18n*/
      {
        id: "tJylUv"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "tLf3yJ"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    needsVatInfo && /* @__PURE__ */ jsx(Callout, { variant: "tip", title: i18n._(
      /*i18n*/
      {
        id: "AhwTa1"
      }
    ), style: {
      marginBottom: 24
    }, children: i18n._(
      /*i18n*/
      {
        id: "mXPbwY"
      }
    ) }),
    !needsVatInfo && /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", mb: "lg", lh: 1.6, children: i18n._(
      /*i18n*/
      {
        id: "FlGprQ"
      }
    ) }),
    /* @__PURE__ */ jsx(VatSettingsForm, { organizerId })
  ] });
};
const heroBullets = "_heroBullets_3ugyp_16";
const bullet = "_bullet_3ugyp_25";
const statusGrid = "_statusGrid_3ugyp_31";
const statusCell = "_statusCell_3ugyp_38";
const statusCellLabel = "_statusCellLabel_3ugyp_47";
const statusCellValue = "_statusCellValue_3ugyp_52";
const reuseInlineRow = "_reuseInlineRow_3ugyp_58";
const connectedHeader = "_connectedHeader_3ugyp_64";
const connectedIdentity = "_connectedIdentity_3ugyp_77";
const connectedMeta = "_connectedMeta_3ugyp_87";
const accountIdRow = "_accountIdRow_3ugyp_91";
const accountIdValue = "_accountIdValue_3ugyp_95";
const manageButton = "_manageButton_3ugyp_100";
const classes = {
  heroBullets,
  bullet,
  statusGrid,
  statusCell,
  statusCellLabel,
  statusCellValue,
  reuseInlineRow,
  connectedHeader,
  connectedIdentity,
  connectedMeta,
  accountIdRow,
  accountIdValue,
  manageButton
};
const summarizeActiveCapabilities = (capabilities) => {
  return Object.values(capabilities ?? {}).filter((status) => status === "active").length;
};
const PayoutsSettings = () => {
  var _a, _b;
  const {
    organizerId
  } = useParams();
  const [pendingConnect, setPendingConnect] = useState(false);
  const stripeQuery = useGetOrganizerStripeConnect(organizerId, {
    enabled: !!organizerId
  });
  const connectDetails = useCreateOrGetOrganizerStripeConnect(organizerId, pendingConnect && !!organizerId);
  const copyMutation = useCopyStripeConnectFromOrganizer();
  const disconnectMutation = useDisconnectOrganizerStripeConnect();
  const data = stripeQuery.data;
  const primaryAccount = ((data == null ? void 0 : data.primary_stripe_account_id) ? (_a = data == null ? void 0 : data.stripe_connect_accounts) == null ? void 0 : _a.find((a) => a.stripe_account_id === data.primary_stripe_account_id) : void 0) ?? ((_b = data == null ? void 0 : data.stripe_connect_accounts) == null ? void 0 : _b[0]);
  const hasConnected = !!(data == null ? void 0 : data.has_completed_setup);
  const hasInProgress = !!primaryAccount && !primaryAccount.is_setup_complete;
  const reusable = (data == null ? void 0 : data.reusable_connections) ?? [];
  const [selectedReusable, setSelectedReusable] = useState(null);
  const [reuseExpanded, setReuseExpanded] = useState(false);
  const [requirementsExpanded, setRequirementsExpanded] = useState(false);
  useEffect(() => {
    if (!pendingConnect || connectDetails.isLoading) return;
    if (!connectDetails.data) return;
    const url = connectDetails.data.connect_url;
    if (!url) {
      showError(i18n._(
        /*i18n*/
        {
          id: "v0aRY1"
        }
      ));
      setPendingConnect(false);
      return;
    }
    showSuccess(i18n._(
      /*i18n*/
      {
        id: "HiGkFu"
      }
    ));
    if (typeof window !== "undefined") {
      window.location.href = String(url);
    }
  }, [pendingConnect, connectDetails.isLoading, connectDetails.data]);
  useEffect(() => {
    if (connectDetails.isError) {
      setPendingConnect(false);
      showError(i18n._(
        /*i18n*/
        {
          id: "ADsQ23"
        }
      ));
    }
  }, [connectDetails.isError]);
  const handleConnect = () => {
    setPendingConnect(true);
  };
  const handleDisconnect = (account) => {
    if (!organizerId || !account.stripe_account_id) return;
    const stripeAccountId = account.stripe_account_id;
    modals.openConfirmModal({
      title: i18n._(
        /*i18n*/
        {
          id: "cALvbl"
        }
      ),
      children: /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", children: i18n._(
          /*i18n*/
          {
            id: "n68908",
            values: {
              stripeAccountId
            }
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "o0qzpM"
          }
        ) })
      ] }),
      labels: {
        confirm: i18n._(
          /*i18n*/
          {
            id: "+K0AvT"
          }
        ),
        cancel: i18n._(
          /*i18n*/
          {
            id: "Brhs/U"
          }
        )
      },
      confirmProps: {
        color: "red",
        "data-testid": "stripe-disconnect-confirm-button"
      },
      onConfirm: () => {
        disconnectMutation.mutate({
          organizerId,
          stripeAccountId
        }, {
          onSuccess: () => {
            showSuccess(i18n._(
              /*i18n*/
              {
                id: "S/7MPw"
              }
            ));
          },
          onError: () => {
            showError(i18n._(
              /*i18n*/
              {
                id: "jTee4a"
              }
            ));
          }
        });
      }
    });
  };
  const renderDisconnect = (account, label) => /* @__PURE__ */ jsxs(Box, { mt: "md", children: [
    /* @__PURE__ */ jsx(Divider, { my: "sm" }),
    /* @__PURE__ */ jsx(Anchor, { component: "button", type: "button", size: "xs", c: "dimmed", underline: "hover", onClick: () => handleDisconnect(account), "data-testid": "stripe-disconnect-button", children: label })
  ] });
  const handleReuse = () => {
    if (!selectedReusable || !organizerId) return;
    const source = reusable.find((r) => String(r.stripe_account_id) === selectedReusable);
    if (!source) return;
    copyMutation.mutate({
      organizerId,
      sourceOrganizerId: source.organizer_id
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "akZMv8",
            values: {
              0: source.organizer_name
            }
          }
        ));
        setSelectedReusable(null);
      },
      onError: () => {
        showError(i18n._(
          /*i18n*/
          {
            id: "aT/44s"
          }
        ));
      }
    });
  };
  const renderInlineReuse = () => {
    if (reusable.length === 0) return null;
    const options = reusable.map((r) => ({
      value: String(r.stripe_account_id),
      label: r.country ? `${r.organizer_name} (${r.country})` : r.organizer_name
    }));
    return /* @__PURE__ */ jsxs(Box, { mt: "md", children: [
      /* @__PURE__ */ jsx(Divider, { my: "sm" }),
      !reuseExpanded ? /* @__PURE__ */ jsx(Anchor, { component: "button", type: "button", size: "xs", c: "dimmed", underline: "hover", onClick: () => setReuseExpanded(true), children: i18n._(
        /*i18n*/
        {
          id: "USEpOK"
        }
      ) }) : /* @__PURE__ */ jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "1Zehp4"
          }
        ) }),
        /* @__PURE__ */ jsxs(Group, { gap: "xs", align: "flex-start", wrap: "nowrap", className: classes.reuseInlineRow, children: [
          /* @__PURE__ */ jsx(Select, { placeholder: i18n._(
            /*i18n*/
            {
              id: "Zok1Gx"
            }
          ), data: options, value: selectedReusable, onChange: setSelectedReusable, searchable: true, nothingFoundMessage: i18n._(
            /*i18n*/
            {
              id: "LiLk8u"
            }
          ), size: "xs", style: {
            flex: 1
          } }),
          /* @__PURE__ */ jsx(Button, { variant: "light", size: "xs", disabled: !selectedReusable, loading: copyMutation.isPending, onClick: handleReuse, children: i18n._(
            /*i18n*/
            {
              id: "XFOPle"
            }
          ) })
        ] })
      ] })
    ] });
  };
  const renderHero = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Group, { gap: "md", mb: "sm", wrap: "nowrap", children: [
      /* @__PURE__ */ jsx(ThemeIcon, { size: 48, radius: "md", variant: "light", color: "indigo", children: /* @__PURE__ */ jsx(IconBrandStripe, { size: 28 }) }),
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(Title, { order: 4, children: i18n._(
          /*i18n*/
          {
            id: "lGYzP6"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", mt: 4, children: i18n._(
          /*i18n*/
          {
            id: "jegrvW"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Text, { size: "sm", mb: "md", lh: 1.5, children: i18n._(
      /*i18n*/
      {
        id: "1W5XyZ"
      }
    ) }),
    /* @__PURE__ */ jsxs(Box, { className: classes.heroBullets, children: [
      /* @__PURE__ */ jsxs("span", { className: classes.bullet, children: [
        /* @__PURE__ */ jsx(IconBolt, { size: 16 }),
        i18n._(
          /*i18n*/
          {
            id: "5LO38w"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { className: classes.bullet, children: [
        /* @__PURE__ */ jsx(IconWorld, { size: 16 }),
        i18n._(
          /*i18n*/
          {
            id: "dgKxZ5"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { className: classes.bullet, children: [
        /* @__PURE__ */ jsx(IconShieldCheck, { size: 16 }),
        i18n._(
          /*i18n*/
          {
            id: "4BZj5p"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { size: "md", leftSection: /* @__PURE__ */ jsx(IconBrandStripe, { size: 18 }), onClick: handleConnect, loading: pendingConnect && (connectDetails.isLoading || !connectDetails.data), children: i18n._(
      /*i18n*/
      {
        id: "UMGQOh"
      }
    ) }),
    renderInlineReuse()
  ] });
  const renderInProgress = (account) => {
    const hasRequirements = account.requirements.past_due.length > 0 || account.requirements.currently_due.length > 0;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Group, { gap: "md", mb: "md", wrap: "nowrap", children: [
        /* @__PURE__ */ jsx(ThemeIcon, { size: 40, radius: "md", variant: "light", color: "orange", children: /* @__PURE__ */ jsx(IconAlertCircle, { size: 22 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Title, { order: 4, children: i18n._(
            /*i18n*/
            {
              id: "g+xRXP"
            }
          ) }),
          /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", children: i18n._(
            /*i18n*/
            {
              id: "FzcCHA"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 16 }), onClick: handleConnect, loading: pendingConnect && (connectDetails.isLoading || !connectDetails.data), children: i18n._(
        /*i18n*/
        {
          id: "bUQMpb"
        }
      ) }),
      renderInlineReuse(),
      renderDisconnect(account, i18n._(
        /*i18n*/
        {
          id: "DARj+w"
        }
      )),
      hasRequirements && /* @__PURE__ */ jsxs(Box, { mt: "md", children: [
        /* @__PURE__ */ jsx(Anchor, { component: "button", type: "button", size: "xs", c: "dimmed", underline: "hover", onClick: () => setRequirementsExpanded((v) => !v), children: requirementsExpanded ? i18n._(
          /*i18n*/
          {
            id: "VMlRqi"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "JFap6u"
          }
        ) }),
        requirementsExpanded && /* @__PURE__ */ jsxs(Box, { mt: "sm", children: [
          account.requirements.past_due.length > 0 && /* @__PURE__ */ jsxs(Box, { mb: "sm", children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: 4, children: i18n._(
              /*i18n*/
              {
                id: "BFjW8X"
              }
            ) }),
            /* @__PURE__ */ jsx(RequirementsList, { items: account.requirements.past_due })
          ] }),
          account.requirements.currently_due.length > 0 && /* @__PURE__ */ jsxs(Box, { children: [
            /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: 4, children: i18n._(
              /*i18n*/
              {
                id: "5ia+r6"
              }
            ) }),
            /* @__PURE__ */ jsx(RequirementsList, { items: account.requirements.currently_due })
          ] })
        ] })
      ] })
    ] });
  };
  const renderConnected = (account) => {
    const activeCount = summarizeActiveCapabilities(account.capabilities);
    const stripeAccountId = account.stripe_account_id ?? "";
    const stripeDashboardUrl = stripeAccountId ? `https://dashboard.stripe.com/${stripeAccountId}` : `https://dashboard.stripe.com/`;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Box, { className: classes.connectedHeader, mb: "md", children: [
        /* @__PURE__ */ jsxs(Box, { className: classes.connectedIdentity, children: [
          /* @__PURE__ */ jsx(ThemeIcon, { size: 48, radius: "md", variant: "light", color: "green", children: /* @__PURE__ */ jsx(IconCircleCheck, { size: 26 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Title, { order: 4, children: i18n._(
              /*i18n*/
              {
                id: "s/KaDb"
              }
            ) }),
            /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", className: classes.connectedMeta, children: account.country ? i18n._(
              /*i18n*/
              {
                id: "UqH1Q6",
                values: {
                  0: account.country,
                  1: account.account_type ?? "Standard"
                }
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "jzb4Ep",
                values: {
                  0: account.account_type ?? "Standard"
                }
              }
            ) }),
            stripeAccountId && /* @__PURE__ */ jsxs(Group, { gap: 4, mt: 2, wrap: "nowrap", className: classes.accountIdRow, children: [
              /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", className: classes.accountIdValue, children: stripeAccountId }),
              /* @__PURE__ */ jsx(CopyButton, { value: stripeAccountId, timeout: 1500, children: ({
                copied,
                copy
              }) => /* @__PURE__ */ jsx(Tooltip, { label: copied ? i18n._(
                /*i18n*/
                {
                  id: "6V3Ea3"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "4i7smN"
                }
              ), withArrow: true, position: "right", children: /* @__PURE__ */ jsx(ActionIcon, { size: "xs", variant: "subtle", color: copied ? "green" : "gray", onClick: copy, "aria-label": i18n._(
                /*i18n*/
                {
                  id: "4i7smN"
                }
              ), children: copied ? /* @__PURE__ */ jsx(IconCheck, { size: 12 }) : /* @__PURE__ */ jsx(IconCopy, { size: 12 }) }) }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { component: "a", href: stripeDashboardUrl, target: "_blank", rel: "noreferrer", variant: "subtle", leftSection: /* @__PURE__ */ jsx(IconExternalLink, { size: 16 }), className: classes.manageButton, children: i18n._(
          /*i18n*/
          {
            id: "RlzPUE"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Box, { className: classes.statusGrid, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.statusCell, children: [
          /* @__PURE__ */ jsx("span", { className: classes.statusCellLabel, children: i18n._(
            /*i18n*/
            {
              id: "Kb+0BT"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: classes.statusCellValue, children: account.charges_enabled ? /* @__PURE__ */ jsx(Badge, { color: "green", leftSection: /* @__PURE__ */ jsx(IconCheck, { size: 12 }), children: i18n._(
            /*i18n*/
            {
              id: "RxzN1M"
            }
          ) }) : /* @__PURE__ */ jsx(Badge, { color: "red", children: i18n._(
            /*i18n*/
            {
              id: "E/QGRL"
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.statusCell, children: [
          /* @__PURE__ */ jsx("span", { className: classes.statusCellLabel, children: i18n._(
            /*i18n*/
            {
              id: "C+ylwF"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: classes.statusCellValue, children: account.payouts_enabled ? /* @__PURE__ */ jsx(Badge, { color: "green", leftSection: /* @__PURE__ */ jsx(IconCheck, { size: 12 }), children: i18n._(
            /*i18n*/
            {
              id: "RxzN1M"
            }
          ) }) : /* @__PURE__ */ jsx(Badge, { color: "red", children: i18n._(
            /*i18n*/
            {
              id: "E/QGRL"
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: classes.statusCell, children: [
          /* @__PURE__ */ jsx("span", { className: classes.statusCellLabel, children: i18n._(
            /*i18n*/
            {
              id: "kCl6ja"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: classes.statusCellValue, children: /* @__PURE__ */ jsx(Trans, { id: "30bTiU", values: {
            activeCount
          } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Accordion, { variant: "separated", radius: "md", mt: "md", children: /* @__PURE__ */ jsxs(Accordion.Item, { value: "capabilities", children: [
        /* @__PURE__ */ jsx(Accordion.Control, { children: i18n._(
          /*i18n*/
          {
            id: "6CQ7/B"
          }
        ) }),
        /* @__PURE__ */ jsx(Accordion.Panel, { children: /* @__PURE__ */ jsx(CapabilityList, { capabilities: account.capabilities }) })
      ] }) }),
      account.requirements.eventually_due.length > 0 && /* @__PURE__ */ jsxs(Callout, { variant: "tip", title: i18n._(
        /*i18n*/
        {
          id: "R1lIMV"
        }
      ), style: {
        marginTop: 16
      }, children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", mb: "xs", children: i18n._(
          /*i18n*/
          {
            id: "2W/7Gz"
          }
        ) }),
        /* @__PURE__ */ jsx(RequirementsList, { items: account.requirements.eventually_due, severity: "eventually" })
      ] }),
      organizerId && getVatInfo(account.country).isEU && /* @__PURE__ */ jsxs(Box, { mt: "xl", children: [
        /* @__PURE__ */ jsx(Divider, { mb: "md" }),
        /* @__PURE__ */ jsx(Title, { order: 4, mb: 4, children: i18n._(
          /*i18n*/
          {
            id: "khBZkl"
          }
        ) }),
        /* @__PURE__ */ jsx(Text, { c: "dimmed", size: "sm", mb: "md", children: i18n._(
          /*i18n*/
          {
            id: "cceMns"
          }
        ) }),
        /* @__PURE__ */ jsx(VatSettings, { organizerId, stripeCountry: account.country })
      ] }),
      renderDisconnect(account, i18n._(
        /*i18n*/
        {
          id: "Bst+aq"
        }
      ))
    ] });
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "C+ylwF"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "peBIO+"
      }
    ) }),
    stripeQuery.isLoading ? /* @__PURE__ */ jsx(Group, { justify: "center", p: "xl", children: /* @__PURE__ */ jsx(Loader, {}) }) : hasConnected && primaryAccount ? renderConnected(primaryAccount) : hasInProgress && primaryAccount ? renderInProgress(primaryAccount) : renderHero()
  ] });
};
const PlatformFeesSettings = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const organizerQuery = useGetOrganizer(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const [currentValue, setCurrentValue] = useState(false);
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      setCurrentValue(organizerSettingsQuery.data.default_pass_platform_fee_to_buyer ?? false);
    }
  }, [organizerSettingsQuery.isFetched, organizerSettingsQuery.data]);
  const handleSave = (passToBuyer) => {
    updateMutation.mutate({
      organizerSettings: {
        default_pass_platform_fee_to_buyer: passToBuyer
      },
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "DMCX/I"
          }
        ));
        setCurrentValue(passToBuyer);
      }
    });
  };
  return /* @__PURE__ */ jsx(PlatformFeesSettings$1, { configuration: (_a = organizerQuery.data) == null ? void 0 : _a.configuration, currentValue, onSave: handleSave, isLoading: organizerSettingsQuery.isLoading, isSaving: updateMutation.isPending, heading: i18n._(
    /*i18n*/
    {
      id: "br3Y/y"
    }
  ), description: i18n._(
    /*i18n*/
    {
      id: "89xaFU"
    }
  ), feeHandlingLabel: i18n._(
    /*i18n*/
    {
      id: "3R/Tu2"
    }
  ), feeHandlingDescription: i18n._(
    /*i18n*/
    {
      id: "LAW8Vb"
    }
  ) });
};
const GET_ORGANIZER_DELETION_STATUS_QUERY_KEY = "getOrganizerDeletionStatus";
const useGetOrganizerDeletionStatus = (organizerId) => {
  return useQuery({
    queryKey: [GET_ORGANIZER_DELETION_STATUS_QUERY_KEY, organizerId],
    staleTime: 0,
    queryFn: async () => {
      const {
        data
      } = await organizerClient.getDeletionStatus(organizerId);
      return data;
    }
  });
};
const useDeleteOrganizer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      organizerId
    }) => organizerClient.delete(organizerId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [GET_ORGANIZERS_QUERY_KEY]
      });
    }
  });
};
const DangerZoneSettings = () => {
  var _a;
  const {
    organizerId
  } = useParams();
  const navigate = useNavigate();
  const isAdmin = useIsCurrentUserAdmin();
  const {
    data: deletionStatus,
    isLoading: isDeletionStatusLoading
  } = useGetOrganizerDeletionStatus(organizerId);
  const {
    data: organizer
  } = useGetOrganizer(organizerId);
  const {
    data: organizers
  } = useGetOrganizers();
  const deleteMutation = useDeleteOrganizer();
  const statusMutation = useUpdateOrganizerStatus();
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const isArchived = (organizer == null ? void 0 : organizer.status) === OrganizerStatus.ARCHIVED;
  const deleteConfirmationPhrase = i18n._(
    /*i18n*/
    {
      id: "HNlEFZ"
    }
  );
  const isDeleteConfirmed = deleteConfirmation.trim().toLocaleLowerCase() === deleteConfirmationPhrase.toLocaleLowerCase();
  const activeOrganizerCount = ((_a = organizers == null ? void 0 : organizers.data) == null ? void 0 : _a.filter((org) => org.status !== OrganizerStatus.ARCHIVED).length) ?? 0;
  const isLastActiveOrganizer = !isArchived && activeOrganizerCount <= 1;
  const handleDelete = () => {
    deleteMutation.mutate({
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "GzjTd0"
          }
        ));
        navigate("/manage/events");
      },
      onError: (error) => {
        var _a2, _b;
        showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
          /*i18n*/
          {
            id: "2mkc3c"
          }
        ));
      }
    });
  };
  const handleArchiveToggle = () => {
    const newStatus = isArchived ? OrganizerStatus.LIVE : OrganizerStatus.ARCHIVED;
    const message = isArchived ? i18n._(
      /*i18n*/
      {
        id: "7MjfcR"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "Trnl3E"
      }
    );
    confirmationDialog(message, () => {
      statusMutation.mutate({
        organizerId,
        status: newStatus
      }, {
        onSuccess: () => {
          showSuccess(isArchived ? i18n._(
            /*i18n*/
            {
              id: "HF8Bxa"
            }
          ) : i18n._(
            /*i18n*/
            {
              id: "P/JHA4"
            }
          ));
        },
        onError: (error) => {
          var _a2, _b;
          showError(((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "T2aCOV"
            }
          ));
        }
      });
    }, {
      confirm: isArchived ? i18n._(
        /*i18n*/
        {
          id: "yKu/3Y"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "B495Gs"
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
  if (!isAdmin) {
    return /* @__PURE__ */ jsx(DangerZone, { children: /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      padding: "20px 0"
    }, children: [
      /* @__PURE__ */ jsx(BouncingEmoji, { emoji: "✋" }),
      /* @__PURE__ */ jsx("h3", { children: i18n._(
        /*i18n*/
        {
          id: "MKqSg4"
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
        /*i18n*/
        {
          id: "rnoDMF"
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(DangerZone, { children: [
    /* @__PURE__ */ jsx(DangerZoneSection, { title: i18n._(
      /*i18n*/
      {
        id: "sY3tIw"
      }
    ), description: (deletionStatus == null ? void 0 : deletionStatus.can_delete) ? i18n._(
      /*i18n*/
      {
        id: "nJeeX7"
      }
    ) : (deletionStatus == null ? void 0 : deletionStatus.reason) || i18n._(
      /*i18n*/
      {
        id: "Z3FXyt"
      }
    ), action: /* @__PURE__ */ jsxs(Fragment, { children: [
      !isDeletionStatusLoading && !(deletionStatus == null ? void 0 : deletionStatus.can_delete) && /* @__PURE__ */ jsx(Callout, { variant: "info", style: {
        marginBottom: 8
      }, children: deletionStatus == null ? void 0 : deletionStatus.reason }),
      (deletionStatus == null ? void 0 : deletionStatus.can_delete) && /* @__PURE__ */ jsxs(Stack, { gap: "xs", maw: 400, children: [
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "QytzQr"
          }
        ) }),
        /* @__PURE__ */ jsx(TextInput, { placeholder: deleteConfirmationPhrase, value: deleteConfirmation, onChange: (e) => setDeleteConfirmation(e.currentTarget.value) })
      ] }),
      /* @__PURE__ */ jsx(Button, { mt: "sm", color: "red", variant: "outline", onClick: handleDelete, loading: deleteMutation.isPending, disabled: !(deletionStatus == null ? void 0 : deletionStatus.can_delete) || isDeletionStatusLoading || !isDeleteConfirmed, leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 16 }), children: i18n._(
        /*i18n*/
        {
          id: "sY3tIw"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(DangerZoneSection, { title: isArchived ? i18n._(
      /*i18n*/
      {
        id: "/JyMGh"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "BrwnrJ"
      }
    ), description: isArchived ? i18n._(
      /*i18n*/
      {
        id: "DDIcqy"
      }
    ) : isLastActiveOrganizer ? i18n._(
      /*i18n*/
      {
        id: "jTDzpA"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "eqFkeI"
      }
    ), action: /* @__PURE__ */ jsx(Button, { color: isArchived ? "blue" : "orange", variant: "outline", onClick: handleArchiveToggle, loading: statusMutation.isPending, disabled: !isArchived && isLastActiveOrganizer, leftSection: isArchived ? /* @__PURE__ */ jsx(IconArrowBackUp, { size: 16 }) : /* @__PURE__ */ jsx(IconArchive, { size: 16 }), children: isArchived ? i18n._(
      /*i18n*/
      {
        id: "/JyMGh"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "BrwnrJ"
      }
    ) }) })
  ] });
};
const PROVIDERS = [{
  key: "facebook_pixel",
  label: "Facebook Pixel",
  icon: IconBrandFacebook,
  placeholder: "1234567890",
  description: "Pixel ID (numeric)",
  pattern: /^\d{9,20}$/,
  formatHint: "Must be 9-20 digits"
}, {
  key: "google_analytics_4",
  label: "Google Analytics 4",
  icon: IconBrandGoogle,
  placeholder: "G-XXXXXXXXXX",
  description: "Measurement ID",
  pattern: /^G-[a-zA-Z0-9]{6,20}$/,
  formatHint: "Must start with G- followed by 6-20 characters"
}, {
  key: "google_tag_manager",
  label: "Google Tag Manager",
  icon: IconTag,
  placeholder: "GTM-XXXXXXX",
  description: "Container ID",
  pattern: /^GTM-[a-zA-Z0-9]{4,20}$/,
  formatHint: "Must start with GTM- followed by 4-20 characters"
}, {
  key: "tiktok_pixel",
  label: "TikTok Pixel",
  icon: IconBrandTiktok,
  placeholder: "CXXXXXXXXXX",
  description: "Pixel ID",
  pattern: /^[a-zA-Z0-9]{6,30}$/,
  formatHint: "Must be 6-30 alphanumeric characters"
}];
function pixelsToFormState(pixels) {
  const state = {};
  for (const p of PROVIDERS) {
    state[p.key] = {
      enabled: false,
      pixel_id: ""
    };
  }
  if (pixels) {
    for (const pixel of pixels) {
      if (state[pixel.provider]) {
        state[pixel.provider] = {
          enabled: pixel.enabled,
          pixel_id: pixel.pixel_id
        };
      }
    }
  }
  return state;
}
function formStateToPixels(state) {
  return Object.entries(state).filter(([, v]) => v.pixel_id.trim() !== "").map(([provider, v]) => ({
    provider,
    pixel_id: v.pixel_id.trim(),
    enabled: v.enabled
  }));
}
const GTM_PROVIDER_KEY = "google_tag_manager";
const TrackingPixelSettings = () => {
  const {
    organizerId
  } = useParams();
  const {
    data: account
  } = useGetAccount();
  const isSaasMode = account == null ? void 0 : account.is_saas_mode_enabled;
  const availableProviders = isSaasMode ? PROVIDERS.filter((p) => p.key !== GTM_PROVIDER_KEY) : PROVIDERS;
  const organizerSettingsQuery = useGetOrganizerSettings(organizerId);
  const updateMutation = useUpdateOrganizerSettings();
  const formErrorHandle = useFormErrorResponseHandler();
  const form = useForm({
    initialValues: {
      pixels: pixelsToFormState(void 0),
      tracking_consent_acknowledged: false
    }
  });
  useEffect(() => {
    if ((organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.isFetched) && (organizerSettingsQuery == null ? void 0 : organizerSettingsQuery.data)) {
      form.setValues({
        pixels: pixelsToFormState(organizerSettingsQuery.data.tracking_pixels),
        tracking_consent_acknowledged: organizerSettingsQuery.data.tracking_consent_acknowledged || false
      });
    }
  }, [organizerSettingsQuery.isFetched]);
  const handleSubmit = (values) => {
    var _a;
    let hasErrors = false;
    for (const provider of availableProviders) {
      const pixelId = (_a = values.pixels[provider.key]) == null ? void 0 : _a.pixel_id.trim();
      if (pixelId && !provider.pattern.test(pixelId)) {
        form.setFieldError(`pixels.${provider.key}.pixel_id`, provider.formatHint);
        hasErrors = true;
      }
    }
    let trackingPixels = formStateToPixels(values.pixels);
    if (isSaasMode) {
      trackingPixels = trackingPixels.filter((p) => p.provider !== GTM_PROVIDER_KEY);
    }
    if (trackingPixels.length > 0 && !values.tracking_consent_acknowledged) {
      form.setFieldError("tracking_consent_acknowledged", i18n._(
        /*i18n*/
        {
          id: "9jJNZY"
        }
      ));
      hasErrors = true;
    }
    if (hasErrors) return;
    updateMutation.mutate({
      organizerSettings: {
        tracking_pixels: trackingPixels,
        tracking_consent_acknowledged: values.tracking_consent_acknowledged
      },
      organizerId
    }, {
      onSuccess: () => {
        showSuccess(i18n._(
          /*i18n*/
          {
            id: "CNSSfp"
          }
        ));
      },
      onError: (error) => {
        formErrorHandle(form, error);
      }
    });
  };
  const hasAnyPixels = availableProviders.some((p) => {
    var _a;
    return ((_a = form.values.pixels[p.key]) == null ? void 0 : _a.pixel_id.trim()) !== "";
  });
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
      /*i18n*/
      {
        id: "YwKzpH"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "uIv4Op"
      }
    ) }),
    /* @__PURE__ */ jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxs("fieldset", { disabled: organizerSettingsQuery.isLoading || updateMutation.isPending, children: [
      /* @__PURE__ */ jsx("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }, children: availableProviders.map((provider) => {
        const Icon = provider.icon;
        const pixelState = form.values.pixels[provider.key];
        const hasValue = (pixelState == null ? void 0 : pixelState.pixel_id.trim()) !== "";
        return /* @__PURE__ */ jsxs("div", { style: {
          padding: "14px 16px",
          borderRadius: "8px",
          border: `1px solid var(--mantine-color-${hasValue && (pixelState == null ? void 0 : pixelState.enabled) ? "primary-3" : "gray-3"})`,
          backgroundColor: hasValue && (pixelState == null ? void 0 : pixelState.enabled) ? "var(--mantine-color-primary-0)" : "transparent",
          transition: "all 0.15s ease"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: hasValue ? "10px" : 0
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }, children: [
              /* @__PURE__ */ jsx(Icon, { size: 20, style: {
                opacity: 0.7
              } }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: provider.label }),
                !hasValue && /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", children: provider.description })
              ] })
            ] }),
            hasValue && /* @__PURE__ */ jsx(Switch, { size: "sm", checked: (pixelState == null ? void 0 : pixelState.enabled) ?? false, onChange: (e) => form.setFieldValue(`pixels.${provider.key}.enabled`, e.currentTarget.checked) })
          ] }),
          /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps(`pixels.${provider.key}.pixel_id`), placeholder: provider.placeholder, size: "sm", description: hasValue ? provider.description : void 0, onChange: (e) => {
            form.setFieldValue(`pixels.${provider.key}.pixel_id`, e.currentTarget.value);
            if (e.currentTarget.value.trim() !== "" && !(pixelState == null ? void 0 : pixelState.enabled)) {
              form.setFieldValue(`pixels.${provider.key}.enabled`, true);
            }
          }, styles: {
            input: {
              fontFamily: "monospace",
              fontSize: "13px"
            }
          } })
        ] }, provider.key);
      }) }),
      hasAnyPixels && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Callout, { variant: "tip", style: {
          marginTop: 24
        }, children: i18n._(
          /*i18n*/
          {
            id: "dg05rc"
          }
        ) }),
        /* @__PURE__ */ jsx(Checkbox, { ...form.getInputProps("tracking_consent_acknowledged", {
          type: "checkbox"
        }), label: i18n._(
          /*i18n*/
          {
            id: "8Wgd41"
          }
        ), mb: "md", error: form.errors.tracking_consent_acknowledged })
      ] }),
      /* @__PURE__ */ jsx(Button, { loading: updateMutation.isPending, type: "submit", mt: "md", children: i18n._(
        /*i18n*/
        {
          id: "tfDRzk"
        }
      ) })
    ] }) })
  ] });
};
const Settings = () => {
  const {
    organizerId
  } = useParams();
  const {
    data: account
  } = useGetAccount();
  const isSaasMode = account == null ? void 0 : account.is_saas_mode_enabled;
  const SECTIONS = useMemo(() => {
    const baseSections = [
      {
        id: "basic-settings",
        label: i18n._(
          /*i18n*/
          {
            id: "jIPNJG"
          }
        ),
        icon: IconInfoCircle,
        component: Settings$1
      },
      {
        id: "event-defaults",
        label: i18n._(
          /*i18n*/
          {
            id: "0Zptey"
          }
        ),
        icon: IconCalendarEvent,
        component: EventDefaults
      },
      {
        id: "address-settings",
        label: i18n._(
          /*i18n*/
          {
            id: "Du6bPw"
          }
        ),
        icon: IconMapPin,
        component: AddressSettings
      },
      // {
      //     id: 'image-assets',
      //     label: t`Images & Branding`,
      //     icon: IconPhoto,
      //     component: ImageAssetSettings
      // },
      {
        id: "social-links",
        label: i18n._(
          /*i18n*/
          {
            id: "d0rUsW"
          }
        ),
        icon: IconShare,
        component: SocialLinks
      },
      {
        id: "seo-settings",
        label: i18n._(
          /*i18n*/
          {
            id: "4Ml90q"
          }
        ),
        icon: IconBrandGoogleAnalytics,
        component: SeoSettings
      },
      {
        id: "email-templates",
        label: i18n._(
          /*i18n*/
          {
            id: "6IwNUc"
          }
        ),
        icon: IconMail,
        component: () => /* @__PURE__ */ jsx(EmailTemplateSettings, { organizerId })
      },
      {
        id: "tracking-pixels",
        label: i18n._(
          /*i18n*/
          {
            id: "YwKzpH"
          }
        ),
        icon: IconChartBar,
        component: TrackingPixelSettings
      },
      {
        id: "danger-zone",
        label: i18n._(
          /*i18n*/
          {
            id: "ZQKLI1"
          }
        ),
        icon: IconAlertTriangle,
        component: DangerZoneSettings,
        color: "red"
      }
    ];
    if (isSaasMode) {
      baseSections.splice(2, 0, {
        id: "payouts",
        label: i18n._(
          /*i18n*/
          {
            id: "C+ylwF"
          }
        ),
        icon: IconBrandStripe,
        component: PayoutsSettings
      }, {
        id: "platform-fees",
        label: i18n._(
          /*i18n*/
          {
            id: "br3Y/y"
          }
        ),
        icon: IconPercentage,
        component: PlatformFeesSettings
      });
    }
    return baseSections;
  }, [isSaasMode, organizerId]);
  const isLargeScreen = useMediaQuery("(min-width: 1200px)", true);
  const location = useLocation();
  const targetSectionId = useMemo(() => {
    var _a;
    const raw = ((_a = location.hash) == null ? void 0 : _a.replace(/^#/, "").split("?")[0]) ?? "";
    return raw && SECTIONS.some((s) => s.id === raw) ? raw : null;
  }, [location.hash, SECTIONS]);
  const [activeSection, setActiveSection] = useState(targetSectionId ?? "basic-settings");
  useEffect(() => {
    if (!targetSectionId) return;
    setActiveSection(targetSectionId);
    const retryDelays = [0, 200, 600, 1200, 2e3];
    const timers = retryDelays.map((delay) => window.setTimeout(() => {
      var _a;
      (_a = document.getElementById(targetSectionId)) == null ? void 0 : _a.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
    }, delay));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [targetSectionId]);
  const handleClick = (sectionId) => {
    var _a;
    setActiveSection(sectionId);
    (_a = document.getElementById(sectionId)) == null ? void 0 : _a.scrollIntoView({
      behavior: "smooth"
    });
  };
  const sideMenu = /* @__PURE__ */ jsx(Card, { style: {
    padding: "15px",
    marginBottom: 0
  }, children: /* @__PURE__ */ jsx(Stack, { gap: "xs", children: SECTIONS.map((section) => /* @__PURE__ */ jsx(NavLink, { style: {
    borderRadius: "5px"
  }, active: activeSection === section.id, label: section.label, color: "color" in section ? section.color : void 0, leftSection: /* @__PURE__ */ jsx(section.icon, { size: 16, stroke: 1.5 }), onClick: () => handleClick(section.id) }, section.id)) }) });
  const content = SECTIONS.map(({
    id,
    component: Component
  }) => /* @__PURE__ */ jsx("div", { id, style: {
    scrollMarginTop: "20px"
  }, children: /* @__PURE__ */ jsx(Component, {}) }, id));
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(PageTitle, { children: i18n._(
      /*i18n*/
      {
        id: "wpj63n"
      }
    ) }),
    isLargeScreen ? /* @__PURE__ */ jsxs(Group, { align: "flex-start", gap: "md", children: [
      /* @__PURE__ */ jsx(Box, { w: 240, style: {
        position: "sticky",
        top: 20
      }, children: sideMenu }),
      /* @__PURE__ */ jsx(Box, { style: {
        flex: 1
      }, children: content })
    ] }) : /* @__PURE__ */ jsxs(Stack, { children: [
      sideMenu,
      content
    ] })
  ] });
};
export {
  Settings as default
};
