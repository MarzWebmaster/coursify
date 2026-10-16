import { useMutation } from "@tanstack/react-query";
import { f as api } from "../entry.server.js";
import { i18n } from "@lingui/core";
const imageClient = {
  uploadImage: async (image, imageType, entityId) => {
    const formData = new FormData();
    formData.append("image", image);
    if (imageType) {
      formData.append("image_type", imageType);
    }
    if (entityId) {
      formData.append("entity_id", entityId);
    }
    const response = await api.post("images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },
  delete: async (imageId) => {
    const response = await api.delete(`images/${imageId}`);
    return response.data;
  }
};
const useUploadImage = () => {
  return useMutation({
    mutationFn: ({
      image,
      imageType = void 0,
      entityId = void 0
    }) => imageClient.uploadImage(image, imageType, entityId)
  });
};
const IMAGE_MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const validateImageFile = (file) => {
  if (file.size > IMAGE_MAX_UPLOAD_SIZE) {
    return i18n._(
      /*i18n*/
      {
        id: "pAey+4"
      }
    );
  }
  if (!file.type.startsWith("image/")) {
    return i18n._(
      /*i18n*/
      {
        id: "f9WRpE"
      }
    );
  }
  return null;
};
const extractImageUploadErrors = (error) => {
  var _a, _b, _c, _d, _e, _f;
  if ((_c = (_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.errors) == null ? void 0 : _c.image) {
    return error.response.data.errors.image;
  }
  if (((_d = error == null ? void 0 : error.response) == null ? void 0 : _d.status) === 413) {
    return [i18n._(
      /*i18n*/
      {
        id: "pAey+4"
      }
    )];
  }
  if (typeof ((_f = (_e = error == null ? void 0 : error.response) == null ? void 0 : _e.data) == null ? void 0 : _f.message) === "string" && error.response.data.message) {
    return [error.response.data.message];
  }
  if (!(error == null ? void 0 : error.response)) {
    return [i18n._(
      /*i18n*/
      {
        id: "N3VfVA"
      }
    )];
  }
  return [i18n._(
    /*i18n*/
    {
      id: "nkNfWu"
    }
  )];
};
export {
  IMAGE_MAX_UPLOAD_SIZE as I,
  extractImageUploadErrors as e,
  imageClient as i,
  useUploadImage as u,
  validateImageFile as v
};
