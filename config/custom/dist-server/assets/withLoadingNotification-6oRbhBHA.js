import { jsx } from "react/jsx-runtime";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
const withLoadingNotification = async (asyncOperation, messages) => {
  const notificationId = notifications.show({
    loading: true,
    title: messages.loading.title,
    message: messages.loading.message,
    autoClose: false,
    withCloseButton: false,
    position: "top-center"
  });
  try {
    const result = await asyncOperation();
    notifications.update({
      id: notificationId,
      title: messages.success.title,
      message: messages.success.message,
      color: "green",
      icon: /* @__PURE__ */ jsx(IconCheck, { size: "1rem" }),
      autoClose: 2e3,
      loading: false,
      position: "top-center"
    });
    if (messages.success.onRun) {
      messages.success.onRun();
    }
    return result;
  } catch (error) {
    notifications.update({
      id: notificationId,
      title: messages.error.title,
      message: messages.error.message,
      color: "red",
      icon: /* @__PURE__ */ jsx(IconX, { size: "1rem" }),
      autoClose: 2e3,
      loading: false,
      position: "top-center"
    });
    if (messages.error.onRun) {
      messages.error.onRun();
    }
    throw error;
  }
};
export {
  withLoadingNotification as w
};
