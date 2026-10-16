import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { Link, useNavigate, useLocation } from "react-router";
import { isLightColor, ActionIcon, Anchor } from "@mantine/core";
import { L as LocationType } from "./types-CqPWB-a5.js";
import { f as formatDateWithLocale, c as isSameDayInTimezone } from "./dates-CbVpwZeX.js";
import { f as formatCurrency } from "./currency-Br7a8J7F.js";
import { a as eventHomepagePath, e as eventHomepageUrl, o as organizerHomepageUrl, f as organizerHomepagePath } from "./urlHelper-CsaWRwIV.js";
import { E as getProductsFromEvent, L as Helmet, a as getConfig, P as PoweredByFooter } from "../entry.server.js";
import { S as ShareComponent, u as useOrganizerTrackingPixels, C as CookieConsentBanner } from "./useOrganizerTrackingPixels-DLUPSyWr.js";
import dayjs from "dayjs";
import { IconCalendar, IconClock, IconWifi, IconMapPin, IconTicket, IconExternalLink, IconWorld, IconMail } from "@tabler/icons-react";
import { s as summariseEventLocations } from "./effectiveLocation-BzDgAlu_.js";
import { f as formatAddress, g as getShortLocationDisplay } from "./addressUtilities-7xIQim0X.js";
import { useState, useEffect } from "react";
import { s as socialMediaConfig, e as ensureHomepageFontLoaded, S as StatusToggle, r as removeTransparency, C as ContactOrganizerModal } from "./index-LOby0isD.js";
import { P as Pagination } from "./index-CvuK1rzK.js";
import { v as validateThemeSettings, c as computeThemeVariables } from "./themeUtils-B--ztbrW.js";
const eventCardLink = "_eventCardLink_1wxfm_1";
const eventCard = "_eventCard_1wxfm_1";
const imageWrapper = "_imageWrapper_1wxfm_9";
const placeholderContent = "_placeholderContent_1wxfm_12";
const shareButton = "_shareButton_1wxfm_15";
const dateBadge = "_dateBadge_1wxfm_19";
const eventImage = "_eventImage_1wxfm_55";
const placeholderImage = "_placeholderImage_1wxfm_91";
const placeholderIcon = "_placeholderIcon_1wxfm_107";
const sparkles = "_sparkles_1wxfm_130";
const sparkle = "_sparkle_1wxfm_130";
const imageOverlay = "_imageOverlay_1wxfm_168";
const shareIcon = "_shareIcon_1wxfm_195";
const liveIndicator = "_liveIndicator_1wxfm_204";
const liveText = "_liveText_1wxfm_215";
const liveDot = "_liveDot_1wxfm_223";
const eventContent = "_eventContent_1wxfm_270";
const eventHeader = "_eventHeader_1wxfm_289";
const eventTitle = "_eventTitle_1wxfm_295";
const eventDateTime = "_eventDateTime_1wxfm_310";
const timezone = "_timezone_1wxfm_323";
const eventDescription = "_eventDescription_1wxfm_328";
const eventFooter = "_eventFooter_1wxfm_340";
const eventMeta = "_eventMeta_1wxfm_355";
const location = "_location_1wxfm_362";
const priceSection = "_priceSection_1wxfm_375";
const price = "_price_1wxfm_375";
const free = "_free_1wxfm_395";
const classes$1 = {
  eventCardLink,
  eventCard,
  imageWrapper,
  placeholderContent,
  shareButton,
  dateBadge,
  eventImage,
  placeholderImage,
  placeholderIcon,
  sparkles,
  sparkle,
  imageOverlay,
  shareIcon,
  liveIndicator,
  liveText,
  liveDot,
  eventContent,
  eventHeader,
  eventTitle,
  eventDateTime,
  timezone,
  eventDescription,
  eventFooter,
  eventMeta,
  location,
  priceSection,
  price,
  free
};
const placeholderEmojis = ["🎉", "🎪", "🎸", "🎨", "🌟"];
const EventCard = ({
  event,
  primaryColor = "#8b5cf6"
}) => {
  var _a;
  const dateTextColor = isLightColor(primaryColor) ? "#000000" : "#ffffff";
  const emojiIndex = event.id ? Number(event.id) % placeholderEmojis.length : 0;
  const placeholderEmoji = placeholderEmojis[emojiIndex];
  const startMonth = formatDateWithLocale(event.start_date, "monthShort", event.timezone);
  const startDay = formatDateWithLocale(event.start_date, "dayOfMonth", event.timezone);
  const startTime = formatDateWithLocale(event.start_date, "timeOnly", event.timezone);
  const endTime = event.end_date ? formatDateWithLocale(event.end_date, "timeOnly", event.timezone) : null;
  const prettyTimezone = formatDateWithLocale(event.start_date, "timezone", event.timezone);
  const isSameDay = !!event.end_date && isSameDayInTimezone(event.start_date, event.end_date, event.timezone);
  const endMonth = event.end_date ? formatDateWithLocale(event.end_date, "monthShort", event.timezone) : null;
  const endDay = event.end_date ? formatDateWithLocale(event.end_date, "dayOfMonth", event.timezone) : null;
  const coverImage2 = (_a = event.images) == null ? void 0 : _a.find((img) => img.type === "EVENT_COVER");
  const locationSummary = summariseEventLocations(event);
  const isOnlineEvent = locationSummary.kind === "single" && locationSummary.eventLocation.type === LocationType.Online;
  const locationLabel = (() => {
    var _a2, _b, _c, _d, _e, _f;
    if (locationSummary.kind === "none") return null;
    if (locationSummary.kind === "varied") {
      return locationSummary.types.length > 1 ? i18n._(
        /*i18n*/
        {
          id: "LuZBbx"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "3DIpY0"
        }
      );
    }
    const eventLocation = locationSummary.eventLocation;
    if (eventLocation.type === LocationType.Online) return i18n._(
      /*i18n*/
      {
        id: "oXOSPE"
      }
    );
    const city = (_b = (_a2 = eventLocation.location) == null ? void 0 : _a2.structured_address) == null ? void 0 : _b.city;
    const venueName = ((_c = eventLocation.location) == null ? void 0 : _c.name) || ((_e = (_d = eventLocation.location) == null ? void 0 : _d.structured_address) == null ? void 0 : _e.venue_name);
    const formatted = ((_f = eventLocation.location) == null ? void 0 : _f.structured_address) ? formatAddress(eventLocation.location.structured_address) : "";
    return venueName ?? city ?? (formatted ? formatted : null);
  })();
  const location2 = !isOnlineEvent ? locationLabel : null;
  const now = dayjs();
  const startDate = dayjs(event.start_date);
  const endDate = event.end_date ? dayjs(event.end_date) : startDate.add(2, "hour");
  const isLive = now.isAfter(startDate) && now.isBefore(endDate);
  const products = getProductsFromEvent(event) || [];
  let lowestPrice = null;
  let highestPrice = null;
  products.forEach((product) => {
    if (product.prices && product.prices.length > 0) {
      product.prices.forEach((price2) => {
        const priceValue = price2.price || 0;
        if (lowestPrice === null || priceValue < lowestPrice) {
          lowestPrice = priceValue;
        }
        if (highestPrice === null || priceValue > highestPrice) {
          highestPrice = priceValue;
        }
      });
    } else {
      const priceValue = product.price || 0;
      if (lowestPrice === null || priceValue < lowestPrice) {
        lowestPrice = priceValue;
      }
      if (highestPrice === null || priceValue > highestPrice) {
        highestPrice = priceValue;
      }
    }
  });
  const eventPath = eventHomepagePath(event);
  return /* @__PURE__ */ jsx(Link, { to: eventPath, className: classes$1.eventCardLink, children: /* @__PURE__ */ jsxs("article", { className: classes$1.eventCard, children: [
    /* @__PURE__ */ jsxs("div", { className: classes$1.eventImage, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.imageWrapper, children: [
        coverImage2 ? /* @__PURE__ */ jsx("img", { src: coverImage2.url, alt: event.title, loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: classes$1.placeholderImage, style: {
          "--date-text-color": dateTextColor
        }, children: /* @__PURE__ */ jsxs("div", { className: classes$1.placeholderContent, children: [
          /* @__PURE__ */ jsx("span", { className: classes$1.placeholderIcon, children: placeholderEmoji }),
          /* @__PURE__ */ jsxs("div", { className: classes$1.sparkles, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.sparkle, children: "✨" }),
            /* @__PURE__ */ jsx("span", { className: classes$1.sparkle, children: "✨" }),
            /* @__PURE__ */ jsx("span", { className: classes$1.sparkle, children: "✨" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.imageOverlay, children: [
          isLive && /* @__PURE__ */ jsxs("div", { className: classes$1.liveIndicator, children: [
            /* @__PURE__ */ jsx("span", { className: classes$1.liveDot }),
            /* @__PURE__ */ jsx("span", { className: classes$1.liveText, children: i18n._(
              /*i18n*/
              {
                id: "fpMs2Z"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: classes$1.shareButton, onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx(ShareComponent, { title: event.title, text: event.description_preview || "", url: eventHomepageUrl(event), hideShareButtonText: true, className: classes$1.shareIcon }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.dateBadge, children: [
        /* @__PURE__ */ jsx(IconCalendar, { size: 16 }),
        /* @__PURE__ */ jsxs("span", { children: [
          startMonth,
          " ",
          startDay
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.eventContent, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.eventHeader, children: [
        /* @__PURE__ */ jsx("h3", { className: classes$1.eventTitle, children: event.title }),
        /* @__PURE__ */ jsxs("div", { className: classes$1.eventDateTime, children: [
          /* @__PURE__ */ jsx(IconClock, { size: 14 }),
          /* @__PURE__ */ jsxs("span", { children: [
            startTime,
            endTime && /* @__PURE__ */ jsx(Fragment, { children: !isSameDay ? ` - ${endMonth} ${endDay}, ${endTime}` : ` - ${endTime}` }),
            prettyTimezone && /* @__PURE__ */ jsxs("span", { title: event.timezone, className: classes$1.timezone, children: [
              " (",
              prettyTimezone,
              ")"
            ] })
          ] })
        ] })
      ] }),
      event.description_preview && /* @__PURE__ */ jsx("p", { className: classes$1.eventDescription, children: event.description_preview }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.eventFooter, children: [
        /* @__PURE__ */ jsx("div", { className: classes$1.eventMeta, children: (location2 || isOnlineEvent) && /* @__PURE__ */ jsx("div", { className: classes$1.location, children: isOnlineEvent ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconWifi, { size: 14 }),
          /* @__PURE__ */ jsx("span", { children: i18n._(
            /*i18n*/
            {
              id: "WjSpu5"
            }
          ) })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(IconMapPin, { size: 14 }),
          /* @__PURE__ */ jsx("span", { children: location2 })
        ] }) }) }),
        lowestPrice !== null && /* @__PURE__ */ jsxs("div", { className: classes$1.priceSection, children: [
          /* @__PURE__ */ jsx(IconTicket, { size: 14 }),
          /* @__PURE__ */ jsx("span", { className: lowestPrice === 0 && highestPrice === 0 ? classes$1.free : classes$1.price, children: lowestPrice === 0 && highestPrice === 0 ? i18n._(
            /*i18n*/
            {
              id: "2POOFK"
            }
          ) : highestPrice !== null && highestPrice !== lowestPrice ? `${formatCurrency(lowestPrice, event.currency)} - ${formatCurrency(highestPrice, event.currency)}` : formatCurrency(lowestPrice, event.currency) })
        ] })
      ] })
    ] })
  ] }) });
};
const background = "_background_1slnr_1";
const backgroundOverlay = "_backgroundOverlay_1slnr_23";
const pageWrapper = "_pageWrapper_1slnr_45";
const container = "_container_1slnr_53";
const wrapper = "_wrapper_1slnr_68";
const heroSection = "_heroSection_1slnr_79";
const coverWrapper = "_coverWrapper_1slnr_99";
const coverLqip = "_coverLqip_1slnr_114";
const coverImage = "_coverImage_1slnr_125";
const organizerContentWrapper = "_organizerContentWrapper_1slnr_138";
const organizerContent = "_organizerContent_1slnr_138";
const organizerProfile = "_organizerProfile_1slnr_151";
const profileMain = "_profileMain_1slnr_155";
const logoWrapper = "_logoWrapper_1slnr_167";
const logo = "_logo_1slnr_167";
const organizerInfo = "_organizerInfo_1slnr_194";
const nameSection = "_nameSection_1slnr_202";
const organizerMeta = "_organizerMeta_1slnr_212";
const metaItem = "_metaItem_1slnr_223";
const mapLink = "_mapLink_1slnr_240";
const metaIcon = "_metaIcon_1slnr_246";
const profileActions = "_profileActions_1slnr_251";
const socialLinks = "_socialLinks_1slnr_259";
const socialIcon = "_socialIcon_1slnr_265";
const contactButton = "_contactButton_1slnr_283";
const description = "_description_1slnr_303";
const eventsSection = "_eventsSection_1slnr_359";
const eventsHeader = "_eventsHeader_1slnr_379";
const eventsTitle = "_eventsTitle_1slnr_400";
const filterToggle = "_filterToggle_1slnr_415";
const filterButton = "_filterButton_1slnr_427";
const filterButtonActive = "_filterButtonActive_1slnr_438";
const eventsList = "_eventsList_1slnr_454";
const eventsContainer = "_eventsContainer_1slnr_463";
const noEvents = "_noEvents_1slnr_469";
const paginationWrapper = "_paginationWrapper_1slnr_476";
const paginationComponent = "_paginationComponent_1slnr_488";
const footerSection = "_footerSection_1slnr_513";
const footerLinks = "_footerLinks_1slnr_529";
const footerLink = "_footerLink_1slnr_529";
const footerSeparator = "_footerSeparator_1slnr_547";
const poweredByFooter = "_poweredByFooter_1slnr_552";
const classes = {
  background,
  backgroundOverlay,
  pageWrapper,
  container,
  wrapper,
  heroSection,
  coverWrapper,
  coverLqip,
  coverImage,
  organizerContentWrapper,
  organizerContent,
  organizerProfile,
  profileMain,
  logoWrapper,
  logo,
  organizerInfo,
  nameSection,
  organizerMeta,
  metaItem,
  mapLink,
  metaIcon,
  profileActions,
  socialLinks,
  socialIcon,
  contactButton,
  description,
  eventsSection,
  eventsHeader,
  eventsTitle,
  filterToggle,
  filterButton,
  filterButtonActive,
  eventsList,
  eventsContainer,
  noEvents,
  paginationWrapper,
  paginationComponent,
  footerSection,
  footerLinks,
  footerLink,
  footerSeparator,
  poweredByFooter
};
const OrganizerDocumentHead = ({
  organizer
}) => {
  var _a, _b, _c, _d, _e, _f;
  const organizerSettings = organizer.settings;
  const title = (organizerSettings == null ? void 0 : organizerSettings.seo_title) || `${organizer.name} - Events`;
  const description2 = (organizerSettings == null ? void 0 : organizerSettings.seo_description) || `Discover upcoming events by ${organizer.name}.`;
  const keywords = (organizerSettings == null ? void 0 : organizerSettings.seo_keywords) || `${organizer.name}, events, tickets, concerts, sell tickets online`;
  const logoImage = (_b = (_a = organizer.images) == null ? void 0 : _a.find((img) => img.type === "ORGANIZER_LOGO")) == null ? void 0 : _b.url;
  const coverImage2 = (_d = (_c = organizer.images) == null ? void 0 : _c.find((img) => img.type === "ORGANIZER_COVER")) == null ? void 0 : _d.url;
  const image = coverImage2 || logoImage;
  const url = organizerHomepageUrl(organizer);
  const structuredAddress = (_e = organizer.location) == null ? void 0 : _e.structured_address;
  const address = structuredAddress ? {
    "@type": "http://schema.org/PostalAddress",
    streetAddress: structuredAddress.address_line_1,
    addressLocality: structuredAddress.city,
    addressRegion: structuredAddress.state_or_region,
    postalCode: structuredAddress.zip_or_postal_code,
    addressCountry: structuredAddress.country
  } : void 0;
  if (address) {
    Object.keys(address).forEach((key) => {
      if (address[key] === void 0) {
        delete address[key];
      }
    });
  }
  const location2 = address && Object.keys(address).length > 1 ? {
    "@type": "http://schema.org/Place",
    name: ((_f = organizer.location) == null ? void 0 : _f.name) ?? (structuredAddress == null ? void 0 : structuredAddress.venue_name),
    address
  } : void 0;
  const sameAs = [];
  if (organizerSettings == null ? void 0 : organizerSettings.website_url) {
    sameAs.push(organizerSettings.website_url);
  }
  if (organizerSettings == null ? void 0 : organizerSettings.social_media_handles) {
    const socialHandles = organizerSettings.social_media_handles;
    if (socialHandles.facebook) sameAs.push(`https://facebook.com/${socialHandles.facebook}`);
    if (socialHandles.twitter) sameAs.push(`https://twitter.com/${socialHandles.twitter}`);
    if (socialHandles.instagram) sameAs.push(`https://instagram.com/${socialHandles.instagram}`);
    if (socialHandles.linkedin) sameAs.push(`https://linkedin.com/company/${socialHandles.linkedin}`);
    if (socialHandles.youtube) sameAs.push(`https://youtube.com/@${socialHandles.youtube}`);
    if (socialHandles.github) sameAs.push(`https://github.com/${socialHandles.github}`);
  }
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "http://schema.org/Organization",
    name: organizer.name,
    description: description2,
    url,
    logo: logoImage,
    image,
    location: location2,
    sameAs: sameAs.length > 0 ? sameAs : void 0
  };
  Object.keys(schemaOrgJSONLD).forEach((key) => {
    if (schemaOrgJSONLD[key] === void 0) {
      delete schemaOrgJSONLD[key];
    }
  });
  const allowIndexing = (organizerSettings == null ? void 0 : organizerSettings.allow_search_engine_indexing) !== false;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description2 }),
    keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description2 }),
    image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: organizer.name }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description2 }),
    image && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: allowIndexing ? "index, follow" : "noindex, nofollow" }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaOrgJSONLD) })
  ] });
};
const ScrollToTop = () => {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [pathname]);
  return null;
};
const OrganizerHomepage = ({
  organizer,
  eventsData,
  isPastEvents = false
}) => {
  var _a, _b, _c, _d, _e, _f;
  const navigate = useNavigate();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const {
    consentPending,
    onConsent
  } = useOrganizerTrackingPixels((_a = organizer == null ? void 0 : organizer.settings) == null ? void 0 : _a.tracking_pixels);
  if (!organizer) {
    return null;
  }
  const handleFilterChange = (showPastEvents) => {
    if (showPastEvents) {
      navigate(`${organizerHomepagePath(organizer)}/past-events`);
    } else {
      navigate(organizerHomepagePath(organizer));
    }
  };
  const socialLinks2 = ((_b = organizer.settings) == null ? void 0 : _b.social_media_handles) ? Object.entries(organizer.settings.social_media_handles).filter(([platform, handle]) => handle && socialMediaConfig[platform]).map(([platform, handle]) => ({
    platform,
    handle,
    config: socialMediaConfig[platform]
  })) : [];
  const websiteUrl = organizer.website;
  const getGoogleMapsUrl = (locationDetails) => {
    if (!locationDetails) return "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(locationDetails))}`;
  };
  const organizerLogo = (_c = organizer.images) == null ? void 0 : _c.find((img) => img.type === "ORGANIZER_LOGO");
  const organizerCover = (_d = organizer.images) == null ? void 0 : _d.find((img) => img.type === "ORGANIZER_COVER");
  const events = (eventsData == null ? void 0 : eventsData.data) || [];
  const rawThemeSettings = (_e = organizer == null ? void 0 : organizer.settings) == null ? void 0 : _e.homepage_theme_settings;
  const themeSettings = validateThemeSettings(rawThemeSettings);
  const cssVars = computeThemeVariables(themeSettings);
  const backgroundType = themeSettings.background_type;
  useEffect(() => {
    ensureHomepageFontLoaded(themeSettings.font_family);
  }, [themeSettings.font_family]);
  const themeStyles = {
    "--organizer-bg-color": themeSettings.background,
    "--organizer-content-bg-color": cssVars["--theme-surface"],
    "--organizer-primary-color": themeSettings.accent,
    "--organizer-primary-text-color": cssVars["--theme-text-primary"],
    "--organizer-secondary-color": cssVars["--theme-text-secondary"],
    "--organizer-secondary-text-color": cssVars["--theme-text-tertiary"],
    "--organizer-accent-contrast": cssVars["--theme-accent-contrast"],
    "--organizer-accent-soft": cssVars["--theme-accent-soft"],
    "--organizer-accent-muted": cssVars["--theme-accent-muted"],
    "--organizer-border-color": cssVars["--theme-border"],
    "--theme-font-family": cssVars["--theme-font-family"],
    fontFamily: cssVars["--theme-font-family"]
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    (organizer == null ? void 0 : organizer.status) && (organizer == null ? void 0 : organizer.id) && /* @__PURE__ */ jsx(StatusToggle, { entityType: "organizer", entityId: organizer.id, currentStatus: organizer.status, entityName: organizer.name, onSuccess: () => setTimeout(() => {
      window.location.reload();
    }, 1e3) }),
    organizer && /* @__PURE__ */ jsx(OrganizerDocumentHead, { organizer }),
    /* @__PURE__ */ jsxs("main", { className: classes.pageWrapper, style: themeStyles, "data-mode": themeSettings.mode, children: [
      /* @__PURE__ */ jsx("style", { children: `
                        body, .ssr-loader {
                            background-color: ${removeTransparency(themeSettings.background)} !important;
                        }
                    ` }),
      organizerCover && backgroundType === "MIRROR_COVER_IMAGE" ? /* @__PURE__ */ jsx("div", { className: classes.background, style: {
        backgroundImage: `url(${organizerCover.url})`
      } }) : /* @__PURE__ */ jsx("div", { className: classes.background, style: {
        backgroundColor: "var(--organizer-bg-color)"
      } }),
      /* @__PURE__ */ jsx("div", { className: classes.backgroundOverlay, style: backgroundType === "MIRROR_COVER_IMAGE" ? {
        "--overlay-color": themeSettings.background
      } : void 0 }),
      /* @__PURE__ */ jsxs("div", { className: classes.container, children: [
        /* @__PURE__ */ jsxs("div", { className: classes.wrapper, children: [
          /* @__PURE__ */ jsxs("div", { className: classes.heroSection, children: [
            organizerCover && /* @__PURE__ */ jsxs("div", { className: classes.coverWrapper, style: (organizerCover == null ? void 0 : organizerCover.width) && (organizerCover == null ? void 0 : organizerCover.height) ? {
              "--cover-aspect-ratio": `${organizerCover.width} / ${organizerCover.height}`
            } : void 0, children: [
              (organizerCover == null ? void 0 : organizerCover.lqip_base64) && /* @__PURE__ */ jsx("img", { src: organizerCover.lqip_base64, alt: "", "aria-hidden": "true", className: classes.coverLqip }),
              /* @__PURE__ */ jsx("img", { src: organizerCover.url, alt: "Cover", className: classes.coverImage })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes.organizerContentWrapper, children: /* @__PURE__ */ jsxs("div", { className: classes.organizerContent, children: [
              /* @__PURE__ */ jsx("div", { className: classes.organizerProfile, children: /* @__PURE__ */ jsxs("div", { className: classes.profileMain, children: [
                organizerLogo && /* @__PURE__ */ jsx("div", { className: classes.logoWrapper, children: /* @__PURE__ */ jsx("img", { src: organizerLogo.url, alt: "Logo", className: classes.logo }) }),
                /* @__PURE__ */ jsxs("div", { className: classes.organizerInfo, children: [
                  /* @__PURE__ */ jsxs("div", { className: classes.nameSection, children: [
                    /* @__PURE__ */ jsx("h1", { children: organizer == null ? void 0 : organizer.name }),
                    /* @__PURE__ */ jsxs("div", { className: classes.organizerMeta, children: [
                      getShortLocationDisplay((_f = organizer == null ? void 0 : organizer.location) == null ? void 0 : _f.structured_address) && /* @__PURE__ */ jsxs("div", { className: classes.metaItem, children: [
                        /* @__PURE__ */ jsx(IconMapPin, { size: 15, className: classes.metaIcon }),
                        /* @__PURE__ */ jsxs("a", { href: getGoogleMapsUrl(organizer.location.structured_address), target: "_blank", rel: "noopener noreferrer", className: classes.mapLink, children: [
                          /* @__PURE__ */ jsx("span", { children: getShortLocationDisplay(organizer.location.structured_address) }),
                          /* @__PURE__ */ jsx(IconExternalLink, { size: 12 })
                        ] })
                      ] }),
                      websiteUrl && /* @__PURE__ */ jsxs("div", { className: classes.metaItem, children: [
                        /* @__PURE__ */ jsx(IconWorld, { size: 15, className: classes.metaIcon }),
                        /* @__PURE__ */ jsx("a", { href: websiteUrl, target: "_blank", rel: "noopener noreferrer", children: new URL(websiteUrl).hostname })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: classes.profileActions, children: [
                    socialLinks2.length > 0 && /* @__PURE__ */ jsx("div", { className: classes.socialLinks, children: socialLinks2.map(({
                      platform,
                      handle,
                      config
                    }) => {
                      const IconComponent = config.icon;
                      const url = config.baseUrl + handle;
                      return /* @__PURE__ */ jsx(ActionIcon, { component: "a", href: url, target: "_blank", rel: "noopener noreferrer", className: classes.socialIcon, variant: "subtle", size: "md", children: /* @__PURE__ */ jsx(IconComponent, { size: 16 }) }, platform);
                    }) }),
                    /* @__PURE__ */ jsxs("button", { onClick: () => setContactModalOpen(true), className: classes.contactButton, children: [
                      /* @__PURE__ */ jsx(IconMail, { size: 14, style: {
                        marginRight: 6
                      } }),
                      i18n._(
                        /*i18n*/
                        {
                          id: "jfC/xh"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) }),
              (organizer == null ? void 0 : organizer.description) && /* @__PURE__ */ jsx("div", { className: classes.description, dangerouslySetInnerHTML: {
                __html: organizer.description
              } })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.eventsSection, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.eventsHeader, children: [
              /* @__PURE__ */ jsx("h2", { className: classes.eventsTitle, children: isPastEvents ? i18n._(
                /*i18n*/
                {
                  id: "xTPjSy"
                }
              ) : i18n._(
                /*i18n*/
                {
                  id: "TlEeFv"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: classes.filterToggle, children: [
                /* @__PURE__ */ jsx("button", { className: `${classes.filterButton} ${!isPastEvents ? classes.filterButtonActive : ""}`, onClick: () => handleFilterChange(false), children: i18n._(
                  /*i18n*/
                  {
                    id: "ia8YsC"
                  }
                ) }),
                /* @__PURE__ */ jsx("button", { className: `${classes.filterButton} ${isPastEvents ? classes.filterButtonActive : ""}`, onClick: () => handleFilterChange(true), children: i18n._(
                  /*i18n*/
                  {
                    id: "Ff0Dor"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: classes.eventsList, children: events.length === 0 ? /* @__PURE__ */ jsx("div", { className: classes.noEvents, children: /* @__PURE__ */ jsx("p", { children: isPastEvents ? i18n._(
              /*i18n*/
              {
                id: "6jYQGG"
              }
            ) : i18n._(
              /*i18n*/
              {
                id: "yM5c0q"
              }
            ) }) }) : /* @__PURE__ */ jsx("div", { className: classes.eventsContainer, children: events.map((event) => /* @__PURE__ */ jsx(EventCard, { event, primaryColor: themeSettings.accent }, event.id)) }) }),
            eventsData && eventsData.meta.total > eventsData.meta.per_page && /* @__PURE__ */ jsx("div", { className: classes.paginationWrapper, children: /* @__PURE__ */ jsx(Pagination, { size: "sm", siblings: 1, marginTop: 0, total: eventsData.meta.last_page, value: eventsData.meta.current_page, onChange: (page) => {
              const newPath = isPastEvents ? `${organizerHomepagePath(organizer)}/past-events?page=${page}` : `${organizerHomepagePath(organizer)}?page=${page}`;
              navigate(newPath);
            }, className: classes.paginationComponent }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: classes.footerSection, children: [
            /* @__PURE__ */ jsxs("div", { className: classes.footerLinks, children: [
              /* @__PURE__ */ jsx(Anchor, { href: getConfig("VITE_PRIVACY_URL", "https://coursify.guru/privacy-policy?utm_source=app-organizer-footer"), className: classes.footerLink, children: i18n._(
                /*i18n*/
                {
                  id: "LcET2C"
                }
              ) }),
              /* @__PURE__ */ jsx("span", { className: classes.footerSeparator, children: "•" }),
              /* @__PURE__ */ jsx(Anchor, { href: getConfig("VITE_TOS_URL", "https://coursify.guru/terms-of-service?utm_source=app-organizer-footer"), className: classes.footerLink, children: i18n._(
                /*i18n*/
                {
                  id: "xowcRf"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(PoweredByFooter, { className: classes.poweredByFooter })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ContactOrganizerModal, { opened: contactModalOpen, onClose: () => setContactModalOpen(false), organizer })
      ] }),
      consentPending && /* @__PURE__ */ jsx(CookieConsentBanner, { onConsent })
    ] })
  ] });
};
export {
  OrganizerHomepage as O
};
