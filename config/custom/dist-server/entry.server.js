var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { useQuery, QueryClient, QueryClientProvider, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { useRouteError, NavLink, redirect, Navigate, createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import { i18n } from "@lingui/core";
import { Box, Container, Stack, Image, rem, Title, Text, Button, MantineProvider, v8CssVariablesResolver } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import React, { Component, useMemo, useState, useEffect, useRef, useCallback } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import classNames from "classnames";
import process from "process";
import axios from "axios";
import { Notifications } from "@mantine/notifications";
import { I18nProvider } from "@lingui/react";
import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";
import { generateColors } from "@mantine/colors-generator";
const wrapper = "_wrapper_sud2r_1";
const backgroundOrb1 = "_backgroundOrb1_sud2r_12";
const backgroundOrb2 = "_backgroundOrb2_sud2r_25";
const root = "_root_sud2r_54";
const logo = "_logo_sud2r_64";
const content = "_content_sud2r_69";
const title = "_title_sud2r_80";
const description = "_description_sud2r_94";
const button = "_button_sud2r_99";
const classes$1 = {
  wrapper,
  backgroundOrb1,
  backgroundOrb2,
  root,
  logo,
  content,
  title,
  description,
  button
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title2, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title2);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title2, attributes) => {
  const initProps = {
    key: title2,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title2)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content2 = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content2 };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title: title2 = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title: title2, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title2, attributes) => {
  if (typeof title2 !== "undefined" && document.title !== title2) {
    document.title = flattenArray(title2);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title: title2,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title2, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const poweredBy = "_poweredBy_nsvf1_1";
const poweredByText = "_poweredByText_nsvf1_18";
const classes = {
  poweredBy,
  poweredByText
};
const getConfig = (key, fallback) => {
  {
    const serverEnv = typeof process !== "undefined" && process.env ? process.env : {};
    return serverEnv[key] || fallback;
  }
};
function isNumber(value) {
  return typeof value === "number";
}
const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};
const getInitials = (fullName) => {
  const allNames = fullName.trim().split(" ");
  return allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, "");
};
const getProductsFromEvent = (event) => {
  var _a2;
  return (_a2 = event == null ? void 0 : event.product_categories) == null ? void 0 : _a2.flatMap((category) => category.products).filter((product) => product !== void 0);
};
const getProductFromEvent = (productId, event) => {
  var _a2;
  return (_a2 = getProductsFromEvent(event)) == null ? void 0 : _a2.find((product) => product.id === productId);
};
const addQueryStringToUrl = (key, value) => {
  const currentUrl = new URL(window == null ? void 0 : window.location.href);
  if (!currentUrl.searchParams.has(key)) {
    currentUrl.searchParams.append(key, value);
  }
  window == null ? void 0 : window.history.pushState({}, "", currentUrl.toString());
};
const removeQueryStringFromUrl = (key) => {
  const currentUrl = new URL(window == null ? void 0 : window.location.href);
  if (currentUrl.searchParams.has(key)) {
    currentUrl.searchParams.delete(key);
  }
  window == null ? void 0 : window.history.pushState({}, "", currentUrl.toString());
};
const getStatusColor = (status) => {
  switch (status) {
    case "AWAITING_PAYMENT":
    case "REFUND_PENDING":
    case "PARTIALLY_REFUNDED":
      return "orange";
    case "CANCELLED":
    case "REFUND_FAILED":
    case "REFUNDED":
    case "PAYMENT_FAILED":
      return "red";
    case "COMPLETED":
      return "teal";
    default:
      return "teal";
  }
};
const formatNumber = (number) => {
  if (!isNumber(number)) {
    return 0;
  }
  return new Intl.NumberFormat().format(number);
};
const safeSessionStorageGet = (key) => {
  return null;
};
const safeLocalStorageGet = (key) => {
  return null;
};
const safeLocalStorageSet = (key, value) => {
  return;
};
const safeLocalStorageRemove = (key) => {
  return;
};
const iHavePurchasedALicence = () => {
  return getConfig("VITE_I_HAVE_PURCHASED_A_LICENCE");
};
const isHiEvents = () => {
  var _a2;
  return (_a2 = getConfig("VITE_FRONTEND_URL")) == null ? void 0 : _a2.includes(".coursify.guru");
};
const isEmptyHtml = (content2) => {
  var _a2;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content2;
  const textContent = (_a2 = tempDiv.textContent) == null ? void 0 : _a2.trim();
  return textContent === "" || textContent === null;
};
const PoweredByFooter = (props) => {
  if (iHavePurchasedALicence()) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const link = useMemo(() => {
    let host = getConfig("VITE_FRONTEND_URL") ?? "unknown";
    let medium = "app";
    if (typeof window !== "undefined" && window.location) {
      host = window.location.hostname;
      medium = window.location.pathname.includes("/widget") ? "widget" : "app";
    }
    const url = new URL("https://coursify.guru");
    url.searchParams.set("utm_source", "app-powered-by-footer");
    url.searchParams.set("utm_medium", isHiEvents() ? medium : "self-hosted-" + medium);
    url.searchParams.set("utm_campaign", "powered-by");
    url.searchParams.set("utm_content", isHiEvents() ? "coursify.guru" : host);
    return url.toString();
  }, []);
  const footerContent = isHiEvents() ? /* @__PURE__ */ jsxs(Fragment, { children: [
    i18n._(
      /*i18n*/
      {
        id: "wBJR8i"
      }
    ),
    " ",
    /* @__PURE__ */ jsx("a", { href: `${link}`, target: "_blank", className: classes.ctaLink, title: "Effortlessly manage events and sell tickets online with Coursify", children: i18n._(
      /*i18n*/
      {
        id: "3DZvE7"
      }
    ) })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    i18n._(
      /*i18n*/
      {
        id: "g2UNkE"
      }
    ),
    " ",
    /* @__PURE__ */ jsx("a", { href: link, target: "_blank", title: "Effortlessly manage events and sell tickets online with Coursify", children: "Coursify" }),
    " ",
    "🚀"
  ] });
  return /* @__PURE__ */ jsx("div", { ...props, className: classNames(classes.poweredBy, props.className), children: /* @__PURE__ */ jsx("div", { className: classes.poweredByText, children: footerContent }) });
};
const ErrorDisplay = () => {
  const error = useRouteError();
  const title2 = (error == null ? void 0 : error.status) === 404 ? i18n._(
    /*i18n*/
    {
      id: "8F1i42"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "nwtY4N"
    }
  );
  const description2 = (error == null ? void 0 : error.status) === 404 ? i18n._(
    /*i18n*/
    {
      id: "TSAiPM"
    }
  ) : i18n._(
    /*i18n*/
    {
      id: "V7MwOy"
    }
  );
  console.log("ErrorDisplay error:", error);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { title: title2, meta: [{
      name: "description",
      content: description2
    }] }),
    /* @__PURE__ */ jsxs(Box, { className: classes$1.wrapper, children: [
      /* @__PURE__ */ jsx("div", { className: classes$1.backgroundOrb1 }),
      /* @__PURE__ */ jsx("div", { className: classes$1.backgroundOrb2 }),
      /* @__PURE__ */ jsx(Container, { size: "md", className: classes$1.root, children: /* @__PURE__ */ jsxs(Stack, { gap: "xl", align: "center", children: [
        /* @__PURE__ */ jsx(Image, { src: getConfig("VITE_APP_LOGO_DARK", "/logos/coursify-stacked-light.svg"), alt: getConfig("VITE_APP_NAME", "Coursify") + " Logo", w: rem(140), h: "auto", fit: "contain", className: classes$1.logo }),
        /* @__PURE__ */ jsxs(Stack, { gap: "lg", align: "center", className: classes$1.content, children: [
          /* @__PURE__ */ jsx(Title, { order: 1, className: classes$1.title, children: title2 }),
          /* @__PURE__ */ jsx(Text, { size: "lg", c: "dimmed", className: classes$1.description, children: description2 }),
          /* @__PURE__ */ jsx(Button, { component: NavLink, to: "/", leftSection: /* @__PURE__ */ jsx(IconHome, { size: 18 }), variant: "gradient", gradient: {
            from: "primary",
            to: "secondary"
          }, className: classes$1.button, children: i18n._(
            /*i18n*/
            {
              id: "gHSuV/"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(PoweredByFooter, {})
      ] }) })
    ] })
  ] });
};
const ErrorPage = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorDisplay, {}) });
};
const BASE_URL = getConfig("VITE_API_URL_SERVER");
const LOGIN_PATH = "/auth/login";
const PREVIOUS_URL_KEY = "previous_url";
const ALLOWED_UNAUTHENTICATED_PATHS = ["auth/login", "accept-invitation", "register", "forgot-password", "auth", "account/payment", "checkout", "/event/", "print", "/order/", "widget", "/product/", "check-in", "/events/", "my-tickets"];
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
api.interceptors.response.use((response) => response, (error) => {
  var _a2, _b2, _c, _d, _e;
  if (!error.response) {
    return Promise.reject(error);
  }
  const {
    status
  } = error.response;
  const currentPath = window == null ? void 0 : window.location.pathname;
  const isAllowedUnauthenticatedPath = ALLOWED_UNAUTHENTICATED_PATHS.some((path) => currentPath.includes(path));
  const isManageEventPath = currentPath.startsWith("/manage/event/");
  const isAuthError = status === 401 || status === 403;
  if (status === 403 && ((_a2 = error.response.data) == null ? void 0 : _a2.error_code) === "ACCOUNT_PENDING_DELETION") {
    if (!currentPath.startsWith("/account")) {
      (_b2 = window == null ? void 0 : window.location) == null ? void 0 : _b2.replace("/account/danger-zone");
    }
    return Promise.reject(error);
  }
  if (isAuthError && (!isAllowedUnauthenticatedPath || isManageEventPath)) {
    (_c = window == null ? void 0 : window.localStorage) == null ? void 0 : _c.setItem(PREVIOUS_URL_KEY, window == null ? void 0 : window.location.href);
    const searchParams = ((_d = window == null ? void 0 : window.location) == null ? void 0 : _d.search) || "";
    (_e = window == null ? void 0 : window.location) == null ? void 0 : _e.replace(LOGIN_PATH + searchParams);
  }
  return Promise.reject(error);
});
axios.defaults.withCredentials = true;
const redirectToPreviousUrl = () => {
  var _a2, _b2;
  const previousUrl = ((_a2 = window == null ? void 0 : window.localStorage) == null ? void 0 : _a2.getItem(PREVIOUS_URL_KEY)) || "/manage/events";
  (_b2 = window == null ? void 0 : window.localStorage) == null ? void 0 : _b2.removeItem(PREVIOUS_URL_KEY);
  if (typeof window !== "undefined") {
    window.location.href = previousUrl;
  }
};
const userClient = {
  confirmEmailAddress: async (userId, token) => {
    const response = await api.post(`users/${userId}/confirm-email/${token}`);
    return response.data;
  },
  confirmEmailChange: async (userId, token) => {
    const response = await api.post(`users/${userId}/email-change/${token}`);
    return response.data;
  },
  cancelEmailChange: async (userId) => {
    const response = await api.delete(`users/${userId}/email-change`);
    return response.data;
  },
  updateMe: async (updateParams) => {
    const response = await api.put(`users/me`, updateParams);
    return response.data;
  },
  updateUser: async (userId, updateParams) => {
    const response = await api.put(`users/${userId}`, updateParams);
    return response.data;
  },
  all: async () => {
    const response = await api.get("users");
    return response.data;
  },
  invite: async (userData) => {
    const response = await api.post(`users`, userData);
    return response.data;
  },
  me: async () => {
    const response = await api.get("users/me");
    return response.data;
  },
  resendInvitation: async (userId) => {
    const response = await api.post(`users/${userId}/invitation`);
    return response.data;
  },
  findByID: async (userId) => {
    const response = await api.get(`users/${userId}`);
    return response.data;
  },
  deleteInvitation: async (userId) => {
    const response = await api.delete(`users/${userId}/invitation`);
    return response.data;
  },
  resendConfirmation: async (userId) => {
    const response = await api.post(`users/${userId}/resend-email-confirmation`);
    return response.data;
  },
  confirmEmailAddressWithCode: async (userId, code) => {
    const response = await api.post(`users/${userId}/confirm-email-with-code`, {
      code
    });
    return response.data;
  }
};
const GET_ME_QUERY_KEY = "getGetMe";
const useGetMe = () => {
  return useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: async () => {
      const {
        data
      } = await userClient.me();
      return data;
    },
    retry: false
  });
};
const readSessionIdentifierFromUrl = () => {
  return null;
};
const setCheckoutSessionIdentifier = (orderShortId, token) => {
};
const getCheckoutSessionIdentifier = (orderShortId) => {
  const fromUrl = readSessionIdentifierFromUrl();
  if (fromUrl) {
    return fromUrl;
  }
  return safeSessionStorageGet();
};
const publicApi = axios.create({
  withCredentials: true
});
publicApi.interceptors.request.use((config) => {
  var _a2, _b2, _c;
  const baseUrl = getConfig("VITE_API_URL_SERVER");
  config.baseURL = `${baseUrl}/public`;
  const orderShortId = (_b2 = (_a2 = config.url) == null ? void 0 : _a2.match(/\/order\/([^/?#]+)/)) == null ? void 0 : _b2[1];
  if (orderShortId && !((_c = config.url) == null ? void 0 : _c.includes("session_identifier="))) {
    const token = getCheckoutSessionIdentifier();
    if (token) {
      config.params = {
        ...config.params,
        session_identifier: token
      };
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
axios.defaults.withCredentials = true;
const queryParamsHelper = {
  PER_PAGE_PARAM: "per_page",
  PAGE_PARAM: "page",
  QUERY_PARAM: "query",
  SORT_BY_PARAM: "sort_by",
  SORT_DIRECTION_PARAM: "sort_direction",
  FILTER_FIELDS: "filter_fields",
  DEFAULT_PER_PAGE: 20,
  DEFAULT_PAGE: 1,
  /**
   * Get a param from the URL
   *
   * @param param {string}
   * @param defaultReturn {*}
   */
  getParam: (param, defaultReturn = "") => {
    if (typeof window === "undefined") {
      return defaultReturn;
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || defaultReturn;
  },
  /**
   * Build a query string of filter params
   *
   * @example "?per_page=10&page=1"
   */
  buildQueryString: ({
    pageNumber,
    perPage,
    query,
    sortBy,
    sortDirection,
    filterFields = {},
    additionalParams = {}
  }) => {
    const baseParams = {
      [queryParamsHelper.PAGE_PARAM]: pageNumber || queryParamsHelper.getParam(queryParamsHelper.PAGE_PARAM, queryParamsHelper.DEFAULT_PAGE),
      [queryParamsHelper.PER_PAGE_PARAM]: perPage || queryParamsHelper.getParam(queryParamsHelper.PER_PAGE_PARAM, queryParamsHelper.DEFAULT_PER_PAGE),
      [queryParamsHelper.QUERY_PARAM]: query || queryParamsHelper.getParam(queryParamsHelper.QUERY_PARAM, ""),
      [queryParamsHelper.SORT_BY_PARAM]: sortBy || queryParamsHelper.getParam(queryParamsHelper.SORT_BY_PARAM, ""),
      [queryParamsHelper.SORT_DIRECTION_PARAM]: sortDirection || queryParamsHelper.getParam(queryParamsHelper.SORT_DIRECTION_PARAM, "")
    };
    const filterParams = Object.entries(filterFields).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((condition) => {
          const paramKey = `filter_fields[${key}][${condition.operator}]`;
          acc[paramKey] = String(condition.value);
        });
      } else if (typeof value === "object" && value !== null) {
        const condition = value;
        const paramKey = `filter_fields[${key}][${condition.operator}]`;
        acc[paramKey] = String(condition.value);
      }
      return acc;
    }, {});
    const additionalParamsProcessed = Object.entries(additionalParams).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {});
    const combinedParams = {
      ...baseParams,
      ...filterParams,
      ...additionalParamsProcessed
    };
    return "?" + new URLSearchParams(combinedParams).toString();
  }
};
const promoCodeClient = {
  create: async (eventId, promoCode) => {
    const response = await api.post(`events/${eventId}/promo-codes`, promoCode);
    return response.data;
  },
  update: async (eventId, promoCodeId, promoCode) => {
    const response = await api.put(`events/${eventId}/promo-codes/${promoCodeId}`, promoCode);
    return response.data;
  },
  all: async (eventId, pagination) => {
    const response = await api.get(`events/${eventId}/promo-codes` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  findById: async (eventId, promoCodeId) => {
    const response = await api.get(`events/${eventId}/promo-codes/${promoCodeId}`);
    return response.data;
  },
  delete: async (eventId, promoCodeId) => {
    const response = await api.delete(`events/${eventId}/promo-codes/${promoCodeId}`);
    return response.data;
  }
};
const promoCodeClientPublic = {
  validateCode: async (eventId, promoCode) => {
    const response = await publicApi.get(`events/${eventId}/promo-codes/${promoCode}`);
    return response.data;
  }
};
const eventsClient = {
  create: async (event) => {
    const response = await api.post("events", event);
    return response.data;
  },
  all: async (pagination) => {
    const response = await api.get("events" + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  update: async (eventId, event) => {
    const response = await api.put("events/" + eventId, event);
    return response.data;
  },
  findByID: async (eventId) => {
    const response = await api.get("events/" + eventId);
    return response.data;
  },
  getEventStats: async (eventId, options = {}) => {
    const params = new URLSearchParams();
    if (options.occurrenceId) params.set("occurrence_id", String(options.occurrenceId));
    if (options.dateRange) params.set("date_range", options.dateRange);
    if (options.startDate) params.set("start_date", options.startDate);
    if (options.endDate) params.set("end_date", options.endDate);
    const qs = params.toString();
    const response = await api.get(`events/${eventId}/stats${qs ? "?" + qs : ""}`);
    return response.data;
  },
  getEventCounts: async (eventId) => {
    const response = await api.get("events/" + eventId + "/counts");
    return response.data;
  },
  getEventCheckInStats: async (eventId) => {
    const response = await api.get("events/" + eventId + "/check_in_stats");
    return response.data;
  },
  getEventImages: async (eventId) => {
    const response = await api.get("events/" + eventId + "/images");
    return response.data;
  },
  uploadEventImage: async (eventId, image, type = "EVENT_COVER") => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", type);
    const response = await api.post("events/" + eventId + "/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },
  deleteEventImage: async (eventId, imageId) => {
    const response = await api.delete("events/" + eventId + "/images/" + imageId);
    return response.data;
  },
  delete: async (eventId) => {
    const response = await api.delete("events/" + eventId);
    return response.data;
  },
  getDeletionStatus: async (eventId) => {
    const response = await api.get("events/" + eventId + "/deletion-status");
    return response.data;
  },
  duplicate: async (eventId, event) => {
    const response = await api.post("events/" + eventId + "/duplicate", event);
    return response.data;
  },
  updateEventLocation: async (eventId, payload) => {
    const response = await api.patch("events/" + eventId + "/event-location", payload);
    return response.data;
  },
  updateEventStatus: async (eventId, status) => {
    const response = await api.put("events/" + eventId + "/status", {
      status
    });
    return response.data;
  },
  getEventReport: async (eventId, reportType, startDate, endDate, occurrenceId) => {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (occurrenceId) params.append("occurrence_id", String(occurrenceId));
    const response = await api.get("events/" + eventId + "/reports/" + reportType + "?" + params.toString());
    return response.data;
  }
};
const eventsClientPublic = {
  all: async () => {
    const response = await publicApi.get("events");
    return response.data;
  },
  findByID: async (eventId, promoCode, eventOccurrenceId) => {
    const params = new URLSearchParams();
    if (promoCode) params.set("promo_code", promoCode);
    if (eventOccurrenceId) params.set("event_occurrence_id", String(eventOccurrenceId));
    const queryString = params.toString();
    const response = await publicApi.get("events/" + eventId + (queryString ? "?" + queryString : ""));
    return response.data;
  }
};
const GET_EVENT_PUBLIC_QUERY_KEY = "getEventPublic";
const getEventPublicQuery = (eventId, promoCode, isPromoCodeValid, eventOccurrenceId) => ({
  queryKey: [GET_EVENT_PUBLIC_QUERY_KEY, eventId, promoCode, isPromoCodeValid, eventOccurrenceId],
  queryFn: async () => {
    const {
      data
    } = await eventsClientPublic.findByID(eventId, promoCode, eventOccurrenceId);
    return data;
  },
  refetchOnWindowFocus: false,
  retryOnMount: false,
  staleTime: 0,
  retry: false
});
const useGetEventPublic = (eventId, enabled = true, isPromoCodeValid = false, promoCode = null, eventOccurrenceId = null) => {
  return useQuery({
    ...getEventPublicQuery(eventId, promoCode, isPromoCodeValid, eventOccurrenceId),
    enabled
  });
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60,
      // 1 minute
      refetchOnWindowFocus: false,
      networkMode: "always"
    },
    mutations: {
      networkMode: "always"
    }
  }
});
let ssrQueryClient = null;
function setSsrQueryClient(client) {
  ssrQueryClient = client;
}
function getQueryClient() {
  if (ssrQueryClient) {
    return ssrQueryClient;
  }
  return queryClient;
}
const publicEventRouteLoader = async ({
  params,
  request
}) => {
  var _a2;
  try {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);
    const promoCode = queryParams.get("promo_code") ?? null;
    const occurrenceIdParam = queryParams.get("occurrence_id");
    const occurrenceId = occurrenceIdParam ? Number(occurrenceIdParam) : null;
    let promoCodeValid = void 0;
    if (promoCode) {
      const {
        valid
      } = await promoCodeClientPublic.validateCode(params.eventId, promoCode);
      promoCodeValid = valid;
    }
    const eventQuery = getEventPublicQuery(params.eventId, promoCode, promoCodeValid ?? false, occurrenceId);
    const event = await getQueryClient().fetchQuery(eventQuery);
    if (event && event.slug && params.eventSlug !== event.slug) {
      const searchString = queryParams.toString();
      throw redirect(`/event/${event.id}/${event.slug}${searchString ? `?${searchString}` : ""}`);
    }
    return {
      event,
      promoCodeValid,
      promoCode,
      occurrenceId
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 404) {
      return {
        event: null,
        promoCodeValid: void 0,
        promoCode: null
      };
    }
    console.error(error);
    throw error;
  }
};
const organizerClient = {
  create: async (organizer) => {
    const response = await api.post("organizers", organizer);
    return response.data;
  },
  all: async () => {
    const response = await api.get("organizers");
    return response.data;
  },
  update: async (organizerId, organizer) => {
    const response = await api.post("organizers/" + organizerId, organizer);
    return response.data;
  },
  findByID: async (organizerId) => {
    const response = await api.get("organizers/" + organizerId);
    return response.data;
  },
  delete: async (organizerId) => {
    const response = await api.delete("organizers/" + organizerId);
    return response.data;
  },
  getDeletionStatus: async (organizerId) => {
    const response = await api.get("organizers/" + organizerId + "/deletion-status");
    return response.data;
  },
  updateStatus: async (organizerId, status) => {
    const response = await api.put("organizers/" + organizerId + "/status", {
      status
    });
    return response.data;
  },
  updateLocation: async (organizerId, locationId) => {
    const response = await api.patch("organizers/" + organizerId + "/location", {
      location_id: locationId
    });
    return response.data;
  },
  findEventsByOrganizerId: async (organizerId, pagination) => {
    const response = await api.get("organizers/" + organizerId + "/events" + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  getOrganizerStats: async (organizerId, options) => {
    const params = new URLSearchParams();
    params.append("currency_code", options.currencyCode);
    if (options.startDate) params.append("start_date", options.startDate);
    if (options.endDate) params.append("end_date", options.endDate);
    const response = await api.get(`organizers/${organizerId}/stats?${params.toString()}`);
    return response.data;
  },
  getOrganizerOrders: async (organizerId, pagination) => {
    const response = await api.get(`organizers/${organizerId}/orders` + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  getOrganizerReport: async (organizerId, reportType, startDate, endDate, currency, eventId, page, perPage) => {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (currency) params.append("currency", currency);
    if (eventId) params.append("event_id", String(eventId));
    if (page) params.append("page", String(page));
    if (perPage) params.append("per_page", String(perPage));
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(`organizers/${organizerId}/reports/${reportType}${queryString}`);
    return response.data;
  },
  exportOrganizerReport: async (organizerId, reportType, startDate, endDate, currency, eventId) => {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (currency) params.append("currency", currency);
    if (eventId) params.append("event_id", String(eventId));
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(`organizers/${organizerId}/reports/${reportType}/export${queryString}`, {
      responseType: "blob"
    });
    return new Blob([response.data]);
  }
};
const organizerPublicClient = {
  findByID: async (organizerId) => {
    const response = await publicApi.get("organizers/" + organizerId);
    return response.data;
  },
  findEventsByOrganizerId: async (organizerId, pagination) => {
    const response = await publicApi.get("organizers/" + organizerId + "/events" + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  getEvents: async (organizerId, pagination) => {
    const response = await publicApi.get("organizers/" + organizerId + "/events" + queryParamsHelper.buildQueryString(pagination));
    return response.data;
  },
  contactOrganizer: async (organizerId, contactData) => {
    const response = await publicApi.post(`organizers/${organizerId}/contact`, contactData);
    return response.data;
  }
};
const organizerSettingsClient = {
  partialUpdate: async (organizerId, settings) => {
    const response = await api.patch("organizers/" + organizerId + "/settings", settings);
    return response.data;
  },
  all: async (organizerId) => {
    const response = await api.get("organizers/" + organizerId + "/settings");
    return response.data;
  }
};
const GET_ORGANIZER_PUBLIC_QUERY_KEY = "getOrganizerPublic";
const getOrganizerPublicQuery = (organizerId) => ({
  queryKey: [GET_ORGANIZER_PUBLIC_QUERY_KEY, organizerId],
  queryFn: async () => {
    const {
      data
    } = await organizerPublicClient.findByID(organizerId);
    return data;
  },
  refetchOnWindowFocus: false,
  retryOnMount: false,
  staleTime: 0,
  retry: false
});
const GET_ORGANIZER_EVENTS_PUBLIC_QUERY = "getOrganizerPublicEvents";
const getOrganizerPublicEventsQuery = (organizerId, pagination) => ({
  queryKey: [GET_ORGANIZER_EVENTS_PUBLIC_QUERY, organizerId, pagination],
  queryFn: async () => {
    return await organizerPublicClient.getEvents(organizerId, pagination);
  }
});
const publicOrganizerRouteLoader = async ({
  params,
  request
}) => {
  var _a2;
  const {
    organizerId,
    organizerSlug
  } = params;
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const isPastEvents = url.pathname.endsWith("/past-events");
  const pageNumber = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1;
  if (!organizerId) {
    throw new Error("Organizer ID is required");
  }
  try {
    const organizer = await getQueryClient().fetchQuery(getOrganizerPublicQuery(organizerId));
    if (organizer && organizer.slug && organizerSlug !== organizer.slug) {
      const searchString = queryParams.toString();
      const pathSuffix = isPastEvents ? "/past-events" : "";
      throw redirect(`/events/${organizer.id}/${organizer.slug}${pathSuffix}${searchString ? `?${searchString}` : ""}`);
    }
    let filter = {};
    if (!isPastEvents) {
      filter = {
        additionalParams: {
          eventsStatus: "upcoming"
        },
        filterFields: {}
      };
    } else {
      filter = {
        additionalParams: {
          eventsStatus: "ended"
        },
        filterFields: {}
      };
    }
    const eventsData = await getQueryClient().fetchQuery(getOrganizerPublicEventsQuery(organizerId, {
      pageNumber,
      perPage: 30,
      sortBy: "start_date",
      sortDirection: isPastEvents ? "desc" : "asc",
      ...filter
    }));
    return {
      organizer,
      eventsData,
      isPastEvents
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 404) {
      return {
        organizer: null,
        eventsData: null,
        isPastEvents
      };
    }
    throw error;
  }
};
const organizerPreviewRouteLoader = async ({
  params
}) => {
  var _a2;
  const {
    organizerId
  } = params;
  if (!organizerId) {
    throw new Error("Organizer ID is required");
  }
  try {
    const organizer = await getQueryClient().fetchQuery(getOrganizerPublicQuery(organizerId));
    const eventsData = await getQueryClient().fetchQuery(getOrganizerPublicEventsQuery(organizerId, {
      pageNumber: 1,
      perPage: 30,
      sortBy: "start_date",
      sortDirection: "asc",
      additionalParams: {
        eventsStatus: "upcoming"
      },
      filterFields: {}
    }));
    return {
      organizer,
      eventsData,
      isPastEvents: false
    };
  } catch (error) {
    if (((_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.status) === 404) {
      return {
        organizer: null,
        eventsData: null,
        isPastEvents: false
      };
    }
    throw error;
  }
};
const Root = () => {
  const [redirectPath, setRedirectPath] = useState(null);
  const me = useGetMe();
  useEffect(() => {
    if (me.isFetched) {
      const searchParams = typeof window !== "undefined" ? window.location.search : "";
      const basePath = me.isSuccess ? "/manage/events" : "/auth/login";
      setRedirectPath(basePath + searchParams);
    }
  }, [me.isFetched]);
  if (redirectPath) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirectPath, replace: true });
  }
};
const router = [{
  path: "",
  element: /* @__PURE__ */ jsx(Root, {}),
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "auth",
  async lazy() {
    const AuthLayout = await import("./assets/index-DnBVM19M.js");
    return {
      Component: AuthLayout.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  children: [{
    path: "login",
    async lazy() {
      const Login = await import("./assets/index-DoP3nziB.js");
      return {
        Component: Login.default
      };
    }
  }, {
    path: "register",
    async lazy() {
      const Register = await import("./assets/index-C-qZKZ42.js");
      return {
        Component: Register.default
      };
    }
  }, {
    path: "forgot-password",
    async lazy() {
      const ForgotPassword = await import("./assets/index-CnT1B2FS.js");
      return {
        Component: ForgotPassword.default
      };
    }
  }, {
    path: "reset-password/:token",
    async lazy() {
      const ResetPassword = await import("./assets/index-DePuojH3.js");
      return {
        Component: ResetPassword.default
      };
    }
  }, {
    path: "accept-invitation/:token",
    async lazy() {
      const AcceptInvitation = await import("./assets/index-CZyaaiXQ.js");
      return {
        Component: AcceptInvitation.default
      };
    }
  }]
}, {
  path: "manage",
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  async lazy() {
    const DefaultLayout = await import("./assets/index-BctGMvvQ.js");
    return {
      Component: DefaultLayout.default
    };
  },
  children: [{
    path: "events/:eventsState?",
    async lazy() {
      const Dashboard = await import("./assets/index-D0KSBVPa.js");
      return {
        Component: Dashboard.default
      };
    }
  }, {
    path: "account",
    async lazy() {
      const ManageAccount = await import("./assets/index-OVytrFgb.js");
      return {
        Component: ManageAccount.default
      };
    }
  }, {
    path: "profile",
    async lazy() {
      const ManageProfile = await import("./assets/index-BWeGFRHC.js");
      return {
        Component: ManageProfile.default
      };
    }
  }, {
    path: "profile/confirm-email-change/:token",
    async lazy() {
      const ConfirmEmailChange = await import("./assets/index-B4NpTq1O.js");
      return {
        Component: ConfirmEmailChange.default
      };
    }
  }, {
    path: "profile/confirm-email-address/:token",
    async lazy() {
      const ConfirmEmailAddress = await import("./assets/index-C_a4gwBg.js");
      return {
        Component: ConfirmEmailAddress.default
      };
    }
  }]
}, {
  path: "welcome",
  async lazy() {
    const WelcomeLayout = await import("./assets/index-SP1nOTUo.js");
    return {
      Component: WelcomeLayout.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  children: [{
    path: "",
    async lazy() {
      const Welcome = await import("./assets/index-BSo30Yr0.js");
      return {
        Component: Welcome.default
      };
    }
  }]
}, {
  path: "admin",
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  async lazy() {
    const AdminLayout = await import("./assets/index-g67YLCeX.js");
    return {
      Component: AdminLayout.default
    };
  },
  children: [{
    path: "",
    async lazy() {
      const Dashboard = await import("./assets/index-Bdk8SwGf.js");
      return {
        Component: Dashboard.default
      };
    }
  }, {
    path: "accounts",
    async lazy() {
      const Accounts = await import("./assets/index-Cqta5dsq.js");
      return {
        Component: Accounts.default
      };
    }
  }, {
    path: "accounts/:accountId",
    async lazy() {
      const AccountDetail = await import("./assets/index-CcjmBVsA.js");
      return {
        Component: AccountDetail.default
      };
    }
  }, {
    path: "deletion-requests",
    async lazy() {
      const DeletionRequests = await import("./assets/index-BqOTh9mI.js");
      return {
        Component: DeletionRequests.default
      };
    }
  }, {
    path: "users",
    async lazy() {
      const Users = await import("./assets/index-7rAdqHVP.js");
      return {
        Component: Users.default
      };
    }
  }, {
    path: "events",
    async lazy() {
      const Events = await import("./assets/index-DxMQPoY_.js");
      return {
        Component: Events.default
      };
    }
  }, {
    path: "orders",
    async lazy() {
      const Orders = await import("./assets/index-DFCc3cHG.js");
      return {
        Component: Orders.default
      };
    }
  }, {
    path: "attribution",
    async lazy() {
      const Attribution = await import("./assets/index-DeIcvd9L.js");
      return {
        Component: Attribution.default
      };
    }
  }, {
    path: "configurations",
    async lazy() {
      const Configurations = await import("./assets/index-BOSWYnka.js");
      return {
        Component: Configurations.default
      };
    }
  }, {
    path: "failed-jobs",
    async lazy() {
      const FailedJobs = await import("./assets/index-Cp3ZAp7G.js");
      return {
        Component: FailedJobs.default
      };
    }
  }, {
    path: "messages",
    async lazy() {
      const Messages = await import("./assets/index-CIFjc--i.js");
      return {
        Component: Messages.default
      };
    }
  }, {
    path: "announcements",
    async lazy() {
      const Announcements = await import("./assets/index-Dm4bdsSX.js");
      return {
        Component: Announcements.default
      };
    }
  }]
}, {
  path: "account",
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  async lazy() {
    const DefaultLayout = await import("./assets/index-BctGMvvQ.js");
    return {
      Component: DefaultLayout.default
    };
  },
  children: [{
    path: "",
    async lazy() {
      const ManageAccount = await import("./assets/index-OVytrFgb.js");
      return {
        Component: ManageAccount.default
      };
    },
    children: [{
      path: "settings",
      async lazy() {
        const AccountSettings = await import("./assets/index-D9xbpi7w.js");
        return {
          Component: AccountSettings.default
        };
      }
    }, {
      path: "taxes-and-fees",
      async lazy() {
        const TaxSettings = await import("./assets/index-tzJ1qRom.js");
        return {
          Component: TaxSettings.default
        };
      }
    }, {
      path: "event-defaults",
      async lazy() {
        const EventDefaultsSettings = await import("./assets/index-AMNTWWBw.js");
        return {
          Component: EventDefaultsSettings.default
        };
      }
    }, {
      path: "users",
      async lazy() {
        const Users = await import("./assets/index-CSRAgJDF.js");
        return {
          Component: Users.default
        };
      }
    }, {
      path: "danger-zone",
      async lazy() {
        const DangerZone = await import("./assets/index-mGEeG9CM.js");
        return {
          Component: DangerZone.default
        };
      }
    }]
  }]
}, {
  path: "/manage/organizer/:organizerId?",
  async lazy() {
    const Dashboard = await import("./assets/index-CJ3u95eC.js");
    return {
      Component: Dashboard.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  children: [{
    path: "dashboard?",
    async lazy() {
      const OrganizerDashboard = await import("./assets/index-DTZ4z0BD.js");
      return {
        Component: OrganizerDashboard.default
      };
    }
  }, {
    path: "events/:eventsState?",
    async lazy() {
      const Events = await import("./assets/index-DHVoxh3K.js");
      return {
        Component: Events.default
      };
    }
  }, {
    path: "settings",
    async lazy() {
      const Settings = await import("./assets/index-DsrzG5GY.js");
      return {
        Component: Settings.default
      };
    }
  }, {
    path: "organizer-homepage-designer",
    async lazy() {
      const OrganizerHomepageDesigner = await import("./assets/index-Cvd447-P.js");
      return {
        Component: OrganizerHomepageDesigner.default
      };
    }
  }, {
    path: "webhooks",
    async lazy() {
      const Webhooks = await import("./assets/index-C50dvGpM.js");
      return {
        Component: Webhooks.default
      };
    }
  }, {
    path: "locations",
    async lazy() {
      const Locations = await import("./assets/index-qIinmECt.js");
      return {
        Component: Locations.default
      };
    }
  }, {
    path: "payments",
    async lazy() {
      const PaymentsRedirect = await import("./assets/Redirect-C7QrR2ce.js");
      return {
        Component: PaymentsRedirect.default
      };
    }
  }, {
    path: "reports",
    async lazy() {
      const OrganizerReports = await import("./assets/index-rXkJwQ2b.js");
      return {
        Component: OrganizerReports.default
      };
    }
  }, {
    path: "report/:reportType",
    async lazy() {
      const OrganizerReportLayout = await import("./assets/index-C3XjJsUI.js");
      return {
        Component: OrganizerReportLayout.default
      };
    }
  }]
}, {
  path: "/manage/event/:eventId",
  async lazy() {
    const EventLayout = await import("./assets/index-CYVAbX33.js");
    return {
      Component: EventLayout.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  children: [{
    path: "",
    async lazy() {
      const EventDashboard = await import("./assets/index-pd2DT3E-.js");
      return {
        Component: EventDashboard.default
      };
    }
  }, {
    path: "dashboard",
    async lazy() {
      const EventDashboard = await import("./assets/index-pd2DT3E-.js");
      return {
        Component: EventDashboard.default
      };
    }
  }, {
    path: "getting-started",
    element: /* @__PURE__ */ jsx(Navigate, { to: "../dashboard", replace: true })
  }, {
    path: "reports",
    async lazy() {
      const Reports = await import("./assets/index-D7i82mk4.js");
      return {
        Component: Reports.default
      };
    }
  }, {
    path: "report/:reportType",
    async lazy() {
      const ReportLayout = await import("./assets/index-CMK-Ux2L.js");
      return {
        Component: ReportLayout.default
      };
    }
  }, {
    path: "products",
    async lazy() {
      const Products = await import("./assets/products-CpZYokm7.js");
      return {
        Component: Products.default
      };
    }
  }, {
    path: "attendees",
    async lazy() {
      const Attendees = await import("./assets/attendees-BScqe1fV.js");
      return {
        Component: Attendees.default
      };
    }
  }, {
    path: "questions",
    async lazy() {
      const Questions = await import("./assets/questions-C4ntzHcr.js");
      return {
        Component: Questions.default
      };
    }
  }, {
    path: "orders",
    async lazy() {
      const Orders = await import("./assets/orders-Bia7rA05.js");
      return {
        Component: Orders.default
      };
    }
  }, {
    path: "promo-codes",
    async lazy() {
      const PromoCodes = await import("./assets/promo-codes-BQT8eKiP.js");
      return {
        Component: PromoCodes.default
      };
    }
  }, {
    path: "affiliates",
    async lazy() {
      const Affiliates = await import("./assets/index-DSRJTP1r.js");
      return {
        Component: Affiliates.default
      };
    }
  }, {
    path: "check-in",
    async lazy() {
      const CheckIn = await import("./assets/index-L4_kB8SX.js");
      return {
        Component: CheckIn.default
      };
    }
  }, {
    path: "messages",
    async lazy() {
      const Messages = await import("./assets/messages-BH0cWclp.js");
      return {
        Component: Messages.default
      };
    }
  }, {
    path: "settings",
    async lazy() {
      const Settings = await import("./assets/index-Dl9HSZIq.js");
      return {
        Component: Settings.default
      };
    }
  }, {
    path: "widget",
    async lazy() {
      const Widget = await import("./assets/widget-D8AnqHjV.js");
      return {
        Component: Widget.default
      };
    }
  }, {
    path: "homepage-designer",
    async lazy() {
      const HomepageDesigner = await import("./assets/index-CkYWaz2S.js");
      return {
        Component: HomepageDesigner.default
      };
    }
  }, {
    path: "ticket-designer",
    async lazy() {
      const TicketDesigner = await import("./assets/index-Dv89Ff-N.js");
      return {
        Component: TicketDesigner.default
      };
    }
  }, {
    path: "sold-out-waitlist",
    async lazy() {
      const SoldOutWaitlist = await import("./assets/index-CxUtm1G_.js");
      return {
        Component: SoldOutWaitlist.default
      };
    }
  }, {
    path: "occurrences",
    async lazy() {
      const OccurrencesTab = await import("./assets/index-zDNBFTzy.js");
      return {
        Component: OccurrencesTab.default
      };
    }
  }, {
    path: "occurrences/calendar",
    async lazy() {
      const OccurrencesTab = await import("./assets/index-zDNBFTzy.js");
      return {
        Component: OccurrencesTab.default
      };
    }
  }, {
    path: "occurrences/:occurrenceId",
    async lazy() {
      const OccurrenceDetail = await import("./assets/index-CacZuKXg.js");
      return {
        Component: OccurrenceDetail.default
      };
    }
  }, {
    path: "capacity-assignments",
    async lazy() {
      const CapacityAssignments = await import("./assets/index-Bf6Y9_lG.js");
      return {
        Component: CapacityAssignments.default
      };
    }
  }, {
    path: "webhooks",
    async lazy() {
      const Webhooks = await import("./assets/index-r-WzMx0b.js");
      return {
        Component: Webhooks.default
      };
    }
  }]
}, {
  path: "/events/:organizerId/:organizerSlug",
  loader: publicOrganizerRouteLoader,
  async lazy() {
    const PublicOrganizer = await import("./assets/index-Cgg1tX9X.js");
    return {
      Component: PublicOrganizer.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/events/:organizerId/:organizerSlug/past-events",
  loader: publicOrganizerRouteLoader,
  async lazy() {
    const PublicOrganizer = await import("./assets/index-Cgg1tX9X.js");
    return {
      Component: PublicOrganizer.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/e/:eventId/:eventSlug",
  async lazy() {
    const EventHomepage = await import("./assets/index-Bxtd-eTN.js").then((n) => n.i);
    return {
      Component: EventHomepage.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/event/:eventId/preview",
  async lazy() {
    const EventHomepagePreview = await import("./assets/index-Bf2aOjr6.js");
    return {
      Component: EventHomepagePreview.default
    };
  }
}, {
  path: "/organizer/:organizerId/preview",
  loader: organizerPreviewRouteLoader,
  async lazy() {
    const OrganizerHomepagePreview = await import("./assets/index-B7gsXLkP.js");
    return {
      Component: OrganizerHomepagePreview.default
    };
  }
}, {
  path: "/event/:eventId/:eventSlug",
  loader: publicEventRouteLoader,
  async lazy() {
    const PublicEvent = await import("./assets/index-JjTvNSXK.js");
    return {
      Component: PublicEvent.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/widget/:eventId",
  async lazy() {
    const ProductWidget = await import("./assets/index-B4Zf7tJx.js");
    return {
      Component: ProductWidget.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/checkout/:eventId",
  async lazy() {
    const Checkout = await import("./assets/index-DOoFVpfn.js");
    return {
      Component: Checkout.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {}),
  children: [{
    path: ":orderShortId/details",
    async lazy() {
      const CollectInformation = await import("./assets/index-Crz4LgxU.js");
      return {
        Component: CollectInformation.default
      };
    }
  }, {
    path: ":orderShortId/payment",
    async lazy() {
      const Payment = await import("./assets/index-CffGgyHS.js");
      return {
        Component: Payment.default
      };
    }
  }, {
    path: ":orderShortId/summary",
    async lazy() {
      const OrderSummaryAndProducts = await import("./assets/index-Ct6zegLd.js");
      return {
        Component: OrderSummaryAndProducts.default
      };
    }
  }, {
    path: ":orderShortId/payment_return",
    async lazy() {
      const PaymentReturn = await import("./assets/index-rC-mH9ZO.js");
      return {
        Component: PaymentReturn.default
      };
    }
  }]
}, {
  path: "/order/:eventId/:orderShortId/print",
  async lazy() {
    const PrintOrder = await import("./assets/index-DR7_cPZx.js");
    return {
      Component: PrintOrder.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/product/:eventId/:attendeeShortId/print",
  async lazy() {
    const PrintProduct = await import("./assets/index-CRzFtLe7.js");
    return {
      Component: PrintProduct.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/manage/event/:eventId/ticket-designer/print",
  async lazy() {
    const TicketDesignerPrint = await import("./assets/TicketDesignerPrint-Cl13mm4f.js");
    return {
      Component: TicketDesignerPrint.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/product/:eventId/:attendeeShortId",
  async lazy() {
    const AttendeeProductAndInformation = await import("./assets/index-Bbpw275G.js");
    return {
      Component: AttendeeProductAndInformation.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/check-in/:checkInListShortId",
  async lazy() {
    const CheckIn = await import("./assets/index-DwhsLi3x.js");
    return {
      Component: CheckIn.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}, {
  path: "/my-tickets/:token",
  async lazy() {
    const MyTickets = await import("./assets/index-B3Dd8nM3.js");
    return {
      Component: MyTickets.default
    };
  },
  errorElement: /* @__PURE__ */ jsx(ErrorPage, {})
}];
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const availableLocales = ["en", "de", "fr", "it", "nl", "pt", "es", "zh-cn", "zh-hk", "pt-br", "vi", "tr", "hu", "pl", "se", "sk", "el"];
const localeToFlagEmojiMap = {
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  it: "🇮🇹",
  nl: "🇳🇱",
  pt: "🇵🇹",
  es: "🇪🇸",
  "zh-cn": "🇨🇳",
  "zh-hk": "🇭🇰",
  "pt-br": "🇧🇷",
  vi: "🇻🇳",
  tr: "🇹🇷",
  hu: "🇭🇺",
  pl: "🇵🇱",
  se: "🇸🇪",
  sk: "🇸🇰",
  el: "🇬🇷"
};
const localeToNameMap = {
  en: `English`,
  de: `German`,
  fr: `French`,
  it: `Italian`,
  nl: `Dutch`,
  pt: `Portuguese`,
  es: `Spanish`,
  "zh-cn": `Chinese`,
  "zh-hk": `Cantonese`,
  "pt-br": `Portuguese (Brazil)`,
  vi: `Vietnamese`,
  tr: `Turkish`,
  hu: `Hungarian`,
  pl: `Polish`,
  se: `Swedish`,
  sk: `Slovak`,
  el: `Greek`
};
const getLocaleName = (locale) => {
  return localeToNameMap[locale];
};
const getClientLocale = () => {
  var _a2;
  if (typeof window !== "undefined") {
    const storedLocale = (_a2 = document.cookie.split(";").find((c) => c.includes("locale="))) == null ? void 0 : _a2.split("=")[1];
    if (storedLocale) {
      return getSupportedLocale(storedLocale);
    }
    return getSupportedLocale(window.navigator.language);
  }
  return "en";
};
const dayjsLocaleLoaders = {
  de: () => import("dayjs/locale/de.js"),
  fr: () => import("dayjs/locale/fr.js"),
  it: () => import("dayjs/locale/it.js"),
  nl: () => import("dayjs/locale/nl.js"),
  pt: () => import("dayjs/locale/pt.js"),
  es: () => import("dayjs/locale/es.js"),
  "zh-cn": () => import("dayjs/locale/zh-cn.js"),
  "pt-br": () => import("dayjs/locale/pt-br.js"),
  vi: () => import("dayjs/locale/vi.js"),
  "zh-hk": () => import("dayjs/locale/zh-hk.js"),
  tr: () => import("dayjs/locale/tr.js"),
  hu: () => import("dayjs/locale/hu.js"),
  sk: () => import("dayjs/locale/sk.js"),
  el: () => import("dayjs/locale/el.js")
};
async function dynamicActivateLocale(locale) {
  var _a2;
  try {
    locale = availableLocales.includes(locale) ? locale : "en";
    const [module] = await Promise.all([__variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./locales/de.po": () => import("./assets/de-ggov_xZP.js"), "./locales/el.po": () => import("./assets/el-BWN5BlYU.js"), "./locales/en.po": () => import("./assets/en-DOg7bV1s.js"), "./locales/es.po": () => import("./assets/es-CnZKSHBd.js"), "./locales/fr.po": () => import("./assets/fr-D9RIy1XV.js"), "./locales/hu.po": () => import("./assets/hu-BFWWv2Z3.js"), "./locales/it.po": () => import("./assets/it-DNsTD8mf.js"), "./locales/nl.po": () => import("./assets/nl-D_cEd2uz.js"), "./locales/pl.po": () => import("./assets/pl-4f3D-k5e.js"), "./locales/pt-br.po": () => import("./assets/pt-br-BWfTv63g.js"), "./locales/pt.po": () => import("./assets/pt-CknpWYHf.js"), "./locales/ru.po": () => import("./assets/ru-4Yc60uy9.js"), "./locales/se.po": () => import("./assets/se-BhLhbY0n.js"), "./locales/sk.po": () => import("./assets/sk-DmYHisQu.js"), "./locales/tr.po": () => import("./assets/tr-D_6XhkDx.js"), "./locales/vi.po": () => import("./assets/vi-CICLACi6.js"), "./locales/zh-cn.po": () => import("./assets/zh-cn-DOPpn0ZL.js"), "./locales/zh-hk.po": () => import("./assets/zh-hk-CZdwjPw_.js") }), `./locales/${locale}.po`, 3), (_a2 = dayjsLocaleLoaders[locale]) == null ? void 0 : _a2.call(dayjsLocaleLoaders).catch((error) => console.error("Error loading dayjs locale:", error))]);
    i18n.load(locale, module.messages);
    i18n.activate(locale);
  } catch (error) {
    console.error("Error loading locale:", error);
  }
}
const getSupportedLocale = (userLocale) => {
  const normalizedLocale = userLocale.toLowerCase();
  if (availableLocales.includes(normalizedLocale)) {
    return normalizedLocale;
  }
  const mainLanguage = normalizedLocale.split("-")[0];
  const mainLocale = availableLocales.find((locale) => locale.startsWith(mainLanguage));
  if (mainLocale) {
    return mainLocale;
  }
  return "en";
};
const StartupChecks = () => {
  const meQuery = useGetMe();
  const setLocaleForLoggedInUser = () => {
    var _a2;
    const cookieLocale = getClientLocale();
    if (cookieLocale) {
      return;
    }
    if ((_a2 = meQuery.data) == null ? void 0 : _a2.locale) {
      dynamicActivateLocale(meQuery.data.locale).then(() => {
        console.log("Activated locale from user settings " + meQuery.data.locale);
      });
    }
  };
  useEffect(() => {
    if (!meQuery.isSuccess) {
      return;
    }
    setLocaleForLoggedInUser();
  }, [meQuery.isSuccess]);
  return /* @__PURE__ */ jsx(Fragment, {});
};
const ChatwootWidget = () => {
  useRef(null);
  const {
    data: me,
    isLoading
  } = useGetMe();
  getConfig("VITE_CHATWOOT_WEBSITE_TOKEN");
  getConfig("VITE_CHATWOOT_BASE_URL") || "https://app.chatwoot.com";
  useEffect(() => {
    {
      return;
    }
  }, [isLoading, me]);
  return null;
};
const ThirdPartyScripts = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ChatwootWidget, {}) });
};
const CONSENT_COOKIE = "hi_tracking_consent";
const CONSENT_MAX_AGE = 365 * 24 * 60 * 60;
function getConsentState() {
  if (typeof document === "undefined") return "pending";
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return "pending";
  const value = match[1];
  if (value === "granted" || value === "denied") return value;
  return "pending";
}
function setConsentState(state) {
  var _a2;
  if (typeof document === "undefined") return;
  const secure = ((_a2 = window.location) == null ? void 0 : _a2.protocol) === "https:" ? ";Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${state};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax${secure}`;
}
function isConsentPending() {
  return getConsentState() === "pending";
}
function initGoogleConsentMode(granted = false) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  const state = granted ? "granted" : "denied";
  gtag("consent", "default", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    ...!granted && {
      wait_for_update: 500
    }
  });
}
function updateGoogleConsentMode(granted) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  const state = granted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state
  });
}
const App = (props) => {
  const [isLoadedOnBrowser, setIsLoadedOnBrowser] = React.useState(false);
  const showGlobalConsentBanner = getConfig("VITE_COOKIE_CONSENT_ENABLED") === "true" && false;
  useCallback((granted) => {
    setConsentState(granted ? "granted" : "denied");
    updateGoogleConsentMode(granted);
    window.dispatchEvent(new CustomEvent("hi_consent_change", {
      detail: {
        granted
      }
    }));
  }, []);
  useEffect(() => {
    setIsLoadedOnBrowser(false);
  }, []);
  return /* @__PURE__ */ jsxs(React.StrictMode, { children: [
    /* @__PURE__ */ jsx("div", { className: "ssr-loader", style: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      width: "100vw",
      height: "100vh",
      position: "fixed",
      background: "#ffffff",
      zIndex: 1e3,
      display: isLoadedOnBrowser ? "none" : "block"
    } }),
    /* @__PURE__ */ jsx(MantineProvider, { cssVariablesResolver: v8CssVariablesResolver, theme: {
      colors: props.themeColors,
      primaryColor: "primary",
      fontFamily: "Outfit, sans-serif",
      primaryShade: 8,
      defaultRadius: "sm"
    }, children: /* @__PURE__ */ jsx(HelmetProvider, { context: props.helmetContext, children: /* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsx(DatesProvider, { settings: {
      locale: props.locale
    }, children: /* @__PURE__ */ jsx(QueryClientProvider, { client: props.queryClient, children: /* @__PURE__ */ jsxs(HydrationBoundary, { state: props.dehydratedState, children: [
      /* @__PURE__ */ jsx(StartupChecks, {}),
      /* @__PURE__ */ jsx(ThirdPartyScripts, {}),
      /* @__PURE__ */ jsxs(ModalsProvider, { children: [
        /* @__PURE__ */ jsxs(Helmet, { children: [
          /* @__PURE__ */ jsx("title", { children: getConfig("VITE_APP_NAME", "Coursify") }),
          /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/svg+xml", href: getConfig("VITE_APP_FAVICON", "/favicon.svg") })
        ] }),
        props.children
      ] }),
      /* @__PURE__ */ jsx(Notifications, { pauseResetOnHover: "notification" }),
      showGlobalConsentBanner
    ] }) }) }) }) }) })
  ] });
};
const setAuthToken = (token) => {
  if (!token) {
    delete api.defaults.headers.common["Authorization"];
    delete publicApi.defaults.headers.common["Authorization"];
    return;
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  publicApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const generateThemeColors = () => ({
  primary: generateColors(getConfig("VITE_APP_PRIMARY_COLOR", "#40296C")),
  secondary: generateColors(getConfig("VITE_APP_SECONDARY_COLOR", "#3d0b44"))
});
const themeColors = generateThemeColors();
const getLocale = (req) => {
  if (req.cookies.locale) {
    return req.cookies.locale;
  }
  const acceptLanguage = req.headers["accept-language"];
  return acceptLanguage ? acceptLanguage.split(",")[0].split("-")[0] : "en";
};
async function render(params) {
  setAuthToken(params.req.cookies.token);
  const queryClient2 = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1e3,
        // 60 seconds - prevents immediate refetch on client
        refetchOnWindowFocus: false,
        networkMode: "always"
      },
      mutations: {
        networkMode: "always"
      }
    }
  });
  setSsrQueryClient(queryClient2);
  const helmetContext = {};
  const {
    query,
    dataRoutes
  } = createStaticHandler(router);
  const remixRequest = createFetchRequest(params.req, params.res);
  const context = await query(remixRequest);
  if (context instanceof Response) {
    throw context;
  }
  await dynamicActivateLocale(getLocale(params.req));
  const routerWithContext = createStaticRouter(dataRoutes, context);
  const appHtml = ReactDOMServer.renderToString(/* @__PURE__ */ jsx(App, { queryClient: queryClient2, helmetContext, locale: getLocale(params.req), themeColors, children: /* @__PURE__ */ jsx(StaticRouterProvider, { router: routerWithContext, context }) }));
  const dehydratedState = dehydrate(queryClient2);
  setSsrQueryClient(null);
  return {
    appHtml,
    dehydratedState,
    helmetContext,
    themeColors
  };
}
function createFetchRequest(req, res) {
  const origin = `${req.protocol}://${req.get("host")}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();
  res.on("close", () => controller.abort());
  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }
  return new Request(url.href, init);
}
export {
  promoCodeClientPublic as A,
  eventsClientPublic as B,
  addQueryStringToUrl as C,
  isObjectEmpty as D,
  getProductsFromEvent as E,
  getLocaleName as F,
  GET_ME_QUERY_KEY as G,
  getProductFromEvent as H,
  getStatusColor as I,
  promoCodeClient as J,
  isEmptyHtml as K,
  Helmet as L,
  organizerPublicClient as M,
  getConsentState as N,
  initGoogleConsentMode as O,
  PoweredByFooter as P,
  setConsentState as Q,
  updateGoogleConsentMode as R,
  isConsentPending as S,
  useGetEventPublic as T,
  getCheckoutSessionIdentifier as U,
  getConfig as a,
  userClient as b,
  localeToFlagEmojiMap as c,
  createFetchRequest,
  dynamicActivateLocale as d,
  getInitials as e,
  api as f,
  getClientLocale as g,
  eventsClient as h,
  isHiEvents as i,
  formatNumber as j,
  GET_EVENT_PUBLIC_QUERY_KEY as k,
  localeToNameMap as l,
  GET_ORGANIZER_PUBLIC_QUERY_KEY as m,
  organizerSettingsClient as n,
  organizerClient as o,
  queryClient as p,
  queryParamsHelper as q,
  redirectToPreviousUrl as r,
  render,
  setAuthToken as s,
  publicApi as t,
  useGetMe as u,
  safeLocalStorageSet as v,
  safeLocalStorageGet as w,
  safeLocalStorageRemove as x,
  removeQueryStringFromUrl as y,
  setCheckoutSessionIdentifier as z
};
