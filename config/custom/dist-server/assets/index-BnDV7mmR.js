import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip as Tooltip$1, Text, Group, ActionIcon, Loader, Button } from "@mantine/core";
import { i18n } from "@lingui/core";
import { useState, useRef, useEffect } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { i as imageClient, u as useUploadImage, I as IMAGE_MAX_UPLOAD_SIZE, v as validateImageFile, e as extractImageUploadErrors } from "./imageUploadValidation-B-7zi9vz.js";
import { useMutation } from "@tanstack/react-query";
import { b as showSuccess, a as showError } from "./notifications-Coh3Ef-t.js";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { IconTrash, IconReplace, IconUpload } from "@tabler/icons-react";
const Tooltip = (props) => {
  return /* @__PURE__ */ jsx(Tooltip$1, { ...props, events: {
    hover: true,
    focus: true,
    touch: true
  }, children: props.children });
};
const useDeleteImage = () => {
  return useMutation({
    mutationFn: ({
      imageId
    }) => imageClient.delete(imageId)
  });
};
const outerContainer = "_outerContainer_g7z1z_1";
const container = "_container_g7z1z_5";
const dropzone = "_dropzone_g7z1z_10";
const dropzoneRoot = "_dropzoneRoot_g7z1z_19";
const dropzoneInner = "_dropzoneInner_g7z1z_26";
const emptyDropzone = "_emptyDropzone_g7z1z_35";
const iconWrapper = "_iconWrapper_g7z1z_39";
const previewContainer = "_previewContainer_g7z1z_50";
const previewImage = "_previewImage_g7z1z_58";
const replaceButton = "_replaceButton_g7z1z_65";
const loadingContainer = "_loadingContainer_g7z1z_69";
const compact = "_compact_g7z1z_77";
const emptyDropzoneCompact = "_emptyDropzoneCompact_g7z1z_92";
const dropzoneError = "_dropzoneError_g7z1z_99";
const errorContainer = "_errorContainer_g7z1z_107";
const classes = {
  outerContainer,
  container,
  dropzone,
  dropzoneRoot,
  dropzoneInner,
  emptyDropzone,
  iconWrapper,
  previewContainer,
  previewImage,
  replaceButton,
  loadingContainer,
  compact,
  emptyDropzoneCompact,
  dropzoneError,
  errorContainer
};
const ImageUploadDropzone = ({
  disabled,
  helpText,
  imageType,
  entityId,
  existingImageData,
  onUploadSuccess,
  onDeleteSuccess,
  displayMode = "normal"
}) => {
  const [loading, setLoading] = useState(false);
  const [previewImage2, setPreviewImage] = useState((existingImageData == null ? void 0 : existingImageData.url) || null);
  const [imageId, setImageId] = useState((existingImageData == null ? void 0 : existingImageData.id) || null);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const uploadImage = useUploadImage();
  const deleteImage = useDeleteImage();
  useEffect(() => {
    if (existingImageData == null ? void 0 : existingImageData.url) {
      setPreviewImage(existingImageData.url);
      setImageId(existingImageData.id || null);
    }
  }, [existingImageData]);
  const handleReject = (fileRejections) => {
    const errorMessages = fileRejections.flatMap((rejection) => rejection.errors.map((error) => {
      if (error.code === "file-too-large") {
        return i18n._(
          /*i18n*/
          {
            id: "pAey+4"
          }
        );
      }
      if (error.code === "file-invalid-type") {
        return i18n._(
          /*i18n*/
          {
            id: "f9WRpE"
          }
        );
      }
      return error.message;
    }));
    setErrors(errorMessages);
  };
  const handleDrop = (files) => {
    const [file] = files;
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      setErrors([validationError]);
      return;
    }
    setErrors([]);
    setLoading(true);
    uploadImage.mutate({
      image: file,
      imageType,
      entityId
    }, {
      onSuccess: (response) => {
        var _a, _b;
        const uploadedUrl = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.url;
        const uploadedId = (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.id;
        if (uploadedUrl && uploadedId) {
          setPreviewImage(uploadedUrl);
          setImageId(uploadedId);
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "AGZmwV"
            }
          ));
          onUploadSuccess == null ? void 0 : onUploadSuccess();
        }
        setLoading(false);
        setErrors([]);
      },
      onError: (error) => {
        console.error(error);
        setLoading(false);
        setErrors(extractImageUploadErrors(error));
      }
    });
  };
  const handleDelete = () => {
    if (!previewImage2 || !imageId) return;
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "RiF/yT"
      }
    ), () => {
      setLoading(true);
      setErrors([]);
      deleteImage.mutate({
        imageId
      }, {
        onSuccess: () => {
          setPreviewImage(null);
          setImageId(null);
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "n/ZDCz"
            }
          ));
          setErrors([]);
          onDeleteSuccess == null ? void 0 : onDeleteSuccess();
        },
        onError: (error) => {
          console.error(error);
          showError(i18n._(
            /*i18n*/
            {
              id: "Dia6iz"
            }
          ));
        },
        onSettled: () => setLoading(false)
      });
    });
  };
  const handleReplace = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const renderDropzoneContent = () => {
    if (loading) {
      return /* @__PURE__ */ jsxs("div", { className: classes.loadingContainer, children: [
        /* @__PURE__ */ jsx(Loader, { size: displayMode === "compact" ? "sm" : "md" }),
        displayMode !== "compact" && /* @__PURE__ */ jsx(Text, { size: "sm", mt: "xs", c: "dimmed", children: "Processing image..." })
      ] });
    }
    if (previewImage2) {
      return /* @__PURE__ */ jsxs("div", { className: classes.previewContainer, children: [
        /* @__PURE__ */ jsx("img", { src: previewImage2, alt: "Uploaded preview", className: classes.previewImage }),
        /* @__PURE__ */ jsx(Button, { variant: "light", color: "blue", size: "xs", leftSection: /* @__PURE__ */ jsx(IconReplace, { size: 14 }), onClick: handleReplace, className: classes.replaceButton, children: "Replace Image" })
      ] });
    }
    if (displayMode === "compact") {
      return /* @__PURE__ */ jsxs("div", { className: classes.emptyDropzoneCompact, children: [
        /* @__PURE__ */ jsxs(Group, { justify: "center", gap: "xs", children: [
          /* @__PURE__ */ jsx(IconUpload, { size: 20, stroke: 1.5 }),
          /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: "Click to upload" })
        ] }),
        helpText && /* @__PURE__ */ jsx(Text, { ta: "center", c: "dimmed", size: "xs", mt: 4, children: helpText })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: classes.emptyDropzone, children: [
      /* @__PURE__ */ jsx(Group, { justify: "center", children: /* @__PURE__ */ jsx("div", { className: classes.iconWrapper, children: /* @__PURE__ */ jsx(IconUpload, { size: 36, stroke: 1.5 }) }) }),
      /* @__PURE__ */ jsx(Text, { ta: "center", fw: 600, size: "md", mt: "md", children: "Drag & drop or click to upload" }),
      helpText && /* @__PURE__ */ jsx(Text, { ta: "center", c: "dimmed", size: "sm", mt: "xs", children: helpText }),
      /* @__PURE__ */ jsx(Text, { ta: "center", c: "dimmed", size: "xs", mt: "xs", children: "Images only · Max 5MB" })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: `${classes.outerContainer} ${displayMode === "compact" ? classes.compact : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: classes.container, children: /* @__PURE__ */ jsxs(Dropzone, { onDrop: handleDrop, onReject: handleReject, accept: IMAGE_MIME_TYPE, maxSize: IMAGE_MAX_UPLOAD_SIZE, disabled: disabled || loading, className: classes.dropzone, classNames: {
      root: `${classes.dropzoneRoot} ${errors.length > 0 ? classes.dropzoneError : ""}`,
      inner: classes.dropzoneInner
    }, children: [
      renderDropzoneContent(),
      /* @__PURE__ */ jsx("input", { type: "file", accept: IMAGE_MIME_TYPE.join(","), style: {
        display: "none"
      }, ref: fileInputRef, onChange: (e) => {
        var _a;
        if ((_a = e.target.files) == null ? void 0 : _a.length) handleDrop(Array.from(e.target.files));
      } })
    ] }) }),
    errors.length > 0 && /* @__PURE__ */ jsx("div", { className: classes.errorContainer, children: errors.map((error, index) => /* @__PURE__ */ jsx(Text, { size: "xs", c: "red", children: error }, index)) }),
    previewImage2 && imageId && /* @__PURE__ */ jsx(Group, { justify: "end", mt: "xs", children: /* @__PURE__ */ jsx(ActionIcon, { variant: "outline", color: "red", title: i18n._(
      /*i18n*/
      {
        id: "+jw/c1"
      }
    ), onClick: handleDelete, disabled: loading, children: /* @__PURE__ */ jsx(IconTrash, { size: 14 }) }) })
  ] });
};
export {
  ImageUploadDropzone as I,
  Tooltip as T
};
