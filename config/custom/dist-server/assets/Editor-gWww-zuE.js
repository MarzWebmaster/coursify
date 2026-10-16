import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Trans } from "@lingui/react";
import { useRichTextEditorContext, RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { useState, useEffect } from "react";
import { Portal, Modal, Tabs, Stack, TextInput, Button, Loader, Text, Image, Group, FileButton, InputLabel, InputDescription, InputError } from "@mantine/core";
import { a as classes } from "./index-D4cOjjnu.js";
import classNames from "classnames";
import { i18n } from "@lingui/core";
import { IconPhotoPlus } from "@tabler/icons-react";
import { u as useUploadImage, v as validateImageFile, e as extractImageUploadErrors } from "./imageUploadValidation-B-7zi9vz.js";
import { Image as Image$1 } from "@tiptap/extension-image";
import "@tanstack/react-query";
import "../entry.server.js";
import "react-dom/server";
import "react-router";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/notifications";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
const InsertImageControl = () => {
  const editor = useRichTextEditorContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [urlError, setUrlError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadMutation = useUploadImage();
  const checkImageExists = (url) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = url;
    });
  };
  const handleImageInsert = async () => {
    setLoading(true);
    try {
      const finalUrl = uploadedImageUrl || imageUrl;
      if (!finalUrl) {
        setUrlError(i18n._(
          /*i18n*/
          {
            id: "Dvq0wf"
          }
        ));
        return;
      }
      await checkImageExists(finalUrl);
      if (editor) {
        editor.editor.commands.setImage({
          src: finalUrl
        });
      }
      setModalOpen(false);
      resetState();
    } catch (error) {
      console.log(error);
      setUrlError(i18n._(
        /*i18n*/
        {
          id: "x2mjl4"
        }
      ));
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (file) => {
    if (!file) {
      setUploadError(i18n._(
        /*i18n*/
        {
          id: "EFq6EG"
        }
      ));
      return;
    }
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    uploadMutation.mutate({
      image: file
    }, {
      onSuccess: ({
        data
      }) => {
        setUploadedImageUrl(data.url);
        setUploadError(null);
        setIsUploading(false);
      },
      onError: (error) => {
        setUploadError(extractImageUploadErrors(error).join(" "));
        setIsUploading(false);
      }
    });
  };
  const resetState = () => {
    setTab("url");
    setImageUrl("");
    setUploadedImageUrl("");
    setUrlError(null);
    setUploadError(null);
    setIsUploading(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(RichTextEditor.Control, { onClick: () => setModalOpen(true), "aria-label": "Insert image", title: "Insert image", children: /* @__PURE__ */ jsx(IconPhotoPlus, { stroke: 1.5, size: "1rem" }) }),
    /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(Modal, { opened: isModalOpen, onClose: () => {
      setModalOpen(false);
      resetState();
    }, title: i18n._(
      /*i18n*/
      {
        id: "UiAk5P"
      }
    ), children: /* @__PURE__ */ jsxs(Tabs, { value: tab, onChange: (value) => setTab(value ?? "url"), variant: "outline", children: [
      /* @__PURE__ */ jsxs(Tabs.List, { grow: true, children: [
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "url", children: i18n._(
          /*i18n*/
          {
            id: "/l/ckQ"
          }
        ) }),
        /* @__PURE__ */ jsx(Tabs.Tab, { value: "upload", children: i18n._(
          /*i18n*/
          {
            id: "lnCMdg"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "url", pt: "md", children: /* @__PURE__ */ jsxs(Stack, { children: [
        /* @__PURE__ */ jsx(TextInput, { label: i18n._(
          /*i18n*/
          {
            id: "VyUuZb"
          }
        ), placeholder: "https://example.com/image.jpg", value: imageUrl, onChange: (event) => {
          setImageUrl(event.currentTarget.value);
          setUrlError(null);
        }, error: urlError }),
        /* @__PURE__ */ jsx(Button, { onClick: handleImageInsert, loading, children: i18n._(
          /*i18n*/
          {
            id: "UiAk5P"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(Tabs.Panel, { value: "upload", pt: "md", children: /* @__PURE__ */ jsx(Stack, { children: isUploading ? /* @__PURE__ */ jsxs(Stack, { align: "center", py: "xl", children: [
        /* @__PURE__ */ jsx(Loader, { size: "lg" }),
        /* @__PURE__ */ jsx(Text, { size: "sm", c: "dimmed", children: i18n._(
          /*i18n*/
          {
            id: "29w7p6"
          }
        ) })
      ] }) : uploadedImageUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Image, { src: uploadedImageUrl, alt: "Uploaded preview", radius: "md" }),
        /* @__PURE__ */ jsxs(Group, { grow: true, children: [
          /* @__PURE__ */ jsx(Button, { onClick: handleImageInsert, loading, children: i18n._(
            /*i18n*/
            {
              id: "UiAk5P"
            }
          ) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", color: "red", onClick: resetState, children: i18n._(
            /*i18n*/
            {
              id: "t/YqKh"
            }
          ) })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(FileButton, { onChange: (file) => {
          setUploadError(null);
          file && handleFileUpload(file);
        }, accept: "image/*", children: (props) => /* @__PURE__ */ jsx(Button, { ...props, variant: "outline", children: i18n._(
          /*i18n*/
          {
            id: "lnCMdg"
          }
        ) }) }),
        uploadError && /* @__PURE__ */ jsx(Text, { c: "red", size: "sm", children: uploadError })
      ] }) }) })
    ] }) }) })
  ] });
};
const ImageResize = Image$1.extend({
  name: "image",
  addAttributes() {
    var _a;
    return {
      ...(_a = this.parent) == null ? void 0 : _a.call(this),
      style: {
        default: "width: 100%; height: auto; cursor: pointer;",
        parseHTML: (element) => {
          const width = element.getAttribute("width");
          return width ? `width: ${width}px; height: auto; cursor: pointer;` : `${element.style.cssText}`;
        },
        renderHTML: (attributes) => {
          return {
            style: attributes.style
          };
        }
      }
    };
  },
  addNodeView() {
    return ({
      node,
      editor,
      getPos
    }) => {
      const {
        view,
        options: {
          editable
        }
      } = editor;
      const {
        style
      } = node.attrs;
      const $wrapper = document.createElement("div");
      $wrapper.setAttribute("style", "display: flex; align-items: center;");
      const $resizeWrapper = document.createElement("div");
      $resizeWrapper.setAttribute("style", `${style}; position: relative;`);
      const $img = document.createElement("img");
      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          $img.setAttribute(key, value);
        }
      });
      $img.style.marginBottom = "0px";
      $img.style.display = "block";
      $resizeWrapper.appendChild($img);
      $wrapper.appendChild($resizeWrapper);
      if (!editable) return {
        dom: $wrapper
      };
      const isMobile = document.documentElement.clientWidth < 768;
      const dotPosition = isMobile ? "-8px" : "-4px";
      const dotsPosition = [`top: ${dotPosition}; left: ${dotPosition}; cursor: nwse-resize;`, `top: ${dotPosition}; right: ${dotPosition}; cursor: nesw-resize;`, `bottom: ${dotPosition}; left: ${dotPosition}; cursor: nesw-resize;`, `bottom: ${dotPosition}; right: ${dotPosition}; cursor: nwse-resize;`];
      let isResizing = false;
      let startX, startWidth;
      const $sizeIndicator = document.createElement("div");
      $sizeIndicator.setAttribute("style", `
        position: absolute;
        bottom: -24px;
        left: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        font-size: 11px;
        padding: 2px 4px;
        border-radius: 4px;
        pointer-events: none;
        display: none;
      `);
      $resizeWrapper.appendChild($sizeIndicator);
      const updateSizeIndicator = () => {
        $sizeIndicator.innerText = `${$img.width}px × ${$img.height}px`;
        $sizeIndicator.style.display = "block";
      };
      const hideSizeIndicator = () => {
        $sizeIndicator.style.display = "none";
      };
      const dispatchNodeView = () => {
        if (typeof getPos === "function") {
          const pos = getPos();
          if (pos === void 0) return;
          const newAttrs = {
            ...node.attrs,
            style: `${$img.style.cssText}`
          };
          view.dispatch(view.state.tr.setNodeMarkup(pos, null, newAttrs));
        }
      };
      const addResizeDots = () => {
        removeResizeDots();
        $resizeWrapper.style.border = "1px dashed #6C6C6C";
        updateSizeIndicator();
        dotsPosition.forEach((pos, index) => {
          const $dot = document.createElement("div");
          $dot.setAttribute("style", `position: absolute; width: ${isMobile ? 16 : 9}px; height: ${isMobile ? 16 : 9}px; border: 1.5px solid #6C6C6C; border-radius: 50%; background: white; ${pos}`);
          $dot.addEventListener("mousedown", (e) => {
            e.preventDefault();
            isResizing = true;
            startX = e.clientX;
            startWidth = $resizeWrapper.offsetWidth;
            const onMouseMove = (e2) => {
              if (!isResizing) return;
              const deltaX = index % 2 === 0 ? -(e2.clientX - startX) : e2.clientX - startX;
              const newWidth = startWidth + deltaX;
              $resizeWrapper.style.width = newWidth + "px";
              $img.style.width = newWidth + "px";
              updateSizeIndicator();
            };
            const onMouseUp = () => {
              if (isResizing) {
                isResizing = false;
              }
              dispatchNodeView();
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          });
          $resizeWrapper.appendChild($dot);
        });
      };
      const removeResizeDots = () => {
        $resizeWrapper.style.border = "";
        Array.from($resizeWrapper.querySelectorAll("div")).forEach((dot) => {
          if (dot !== $sizeIndicator) dot.remove();
        });
        hideSizeIndicator();
      };
      const outsideClickHandler = (e) => {
        if (!$resizeWrapper.contains(e.target)) {
          removeResizeDots();
        }
      };
      $resizeWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        addResizeDots();
      });
      document.addEventListener("click", outsideClickHandler);
      return {
        dom: $wrapper,
        destroy() {
          document.removeEventListener("click", outsideClickHandler);
        }
      };
    };
  }
});
const Editor = ({
  error,
  onChange,
  value,
  label = "",
  required = false,
  className = "",
  description = "",
  editorType = "full",
  maxLength,
  size = "md",
  additionalExtensions = [],
  additionalToolbarControls
}) => {
  const [charError, setCharError] = useState(null);
  const editor = useEditor({
    extensions: [StarterKit.configure({
      link: false,
      paragraph: {
        HTMLAttributes: {
          style: "margin: 0.5em 0;"
        }
      },
      hardBreak: {
        HTMLAttributes: {
          "data-type": "hard-break"
        }
      }
    }), Link, TextAlign.configure({
      types: ["heading", "paragraph"]
    }), ImageResize, TextStyle, Color, ...additionalExtensions],
    onUpdate: ({
      editor: editor2
    }) => {
      const html = editor2.getHTML();
      const htmlLength = html.length;
      if (maxLength && htmlLength > maxLength) {
        setCharError(`Character limit exceeded: ${htmlLength}/${maxLength}`);
      } else {
        setCharError(null);
      }
      onChange(html);
    }
  });
  useEffect(() => {
    if (value && editor) {
      if (value !== editor.getHTML()) {
        editor.commands.setContent(value, {
          emitUpdate: false,
          parseOptions: {
            preserveWhitespace: "full"
          }
        });
      }
      const htmlLength = value.length;
      if (maxLength && htmlLength > maxLength) {
        setCharError(/* @__PURE__ */ jsx(Trans, { id: "dZsDbK", values: {
          htmlLength,
          maxLength
        } }));
      } else {
        setCharError(null);
      }
    }
  }, [value, editor, maxLength]);
  return /* @__PURE__ */ jsxs("div", { className: classNames([classes.inputWrapper, className]), children: [
    label && /* @__PURE__ */ jsx(InputLabel, { size, required, onClick: () => editor == null ? void 0 : editor.commands.focus(), children: label }),
    description && /* @__PURE__ */ jsx("div", { style: {
      marginBottom: 5
    }, children: /* @__PURE__ */ jsx(InputDescription, { size, children: description }) }),
    /* @__PURE__ */ jsxs(RichTextEditor, { variant: "subtle", editor, children: [
      /* @__PURE__ */ jsxs(RichTextEditor.Toolbar, { sticky: true, className: classes.toolbar, children: [
        editorType === "full" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.Bold, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Italic, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Underline, {}),
            /* @__PURE__ */ jsx(RichTextEditor.ClearFormatting, {}),
            /* @__PURE__ */ jsx(RichTextEditor.ColorPicker, { colors: ["#25262b", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"] })
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.H1, {}),
            /* @__PURE__ */ jsx(RichTextEditor.H2, {}),
            /* @__PURE__ */ jsx(RichTextEditor.H3, {}),
            /* @__PURE__ */ jsx(RichTextEditor.H4, {})
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.BulletList, {}),
            /* @__PURE__ */ jsx(RichTextEditor.OrderedList, {})
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.Link, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Unlink, {})
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.AlignLeft, {}),
            /* @__PURE__ */ jsx(RichTextEditor.AlignCenter, {}),
            /* @__PURE__ */ jsx(RichTextEditor.AlignJustify, {}),
            /* @__PURE__ */ jsx(RichTextEditor.AlignRight, {})
          ] }),
          /* @__PURE__ */ jsx(RichTextEditor.ControlsGroup, { children: /* @__PURE__ */ jsx(InsertImageControl, {}) })
        ] }),
        editorType === "simple" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.Bold, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Italic, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Underline, {}),
            /* @__PURE__ */ jsx(RichTextEditor.ClearFormatting, {}),
            /* @__PURE__ */ jsx(RichTextEditor.ColorPicker, { colors: ["#25262b", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"] })
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.Link, {}),
            /* @__PURE__ */ jsx(RichTextEditor.Unlink, {})
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.AlignLeft, {}),
            /* @__PURE__ */ jsx(RichTextEditor.AlignCenter, {}),
            /* @__PURE__ */ jsx(RichTextEditor.AlignRight, {})
          ] }),
          /* @__PURE__ */ jsxs(RichTextEditor.ControlsGroup, { children: [
            /* @__PURE__ */ jsx(RichTextEditor.BulletList, {}),
            /* @__PURE__ */ jsx(RichTextEditor.OrderedList, {})
          ] }),
          /* @__PURE__ */ jsx(RichTextEditor.ControlsGroup, { children: /* @__PURE__ */ jsx(InsertImageControl, {}) })
        ] }),
        additionalToolbarControls
      ] }),
      /* @__PURE__ */ jsx(RichTextEditor.Content, {})
    ] }),
    (charError || error) && /* @__PURE__ */ jsx("div", { className: classes.error, children: /* @__PURE__ */ jsx(InputError, { children: error || charError }) })
  ] });
};
export {
  Editor
};
