import { i18n } from "@lingui/core";
import { modals } from "@mantine/modals";
const confirmationDialog = (message, onConfirm, options) => {
  const labels = {
    confirm: (options == null ? void 0 : options.confirm) || i18n._(
      /*i18n*/
      {
        id: "7VpPHA"
      }
    ),
    cancel: (options == null ? void 0 : options.cancel) || i18n._(
      /*i18n*/
      {
        id: "dEgA5A"
      }
    )
  };
  const checkoutStyles = (options == null ? void 0 : options.useCheckoutColors) ? {
    header: {
      backgroundColor: "var(--checkout-surface, #FFFFFF)"
    },
    title: {
      color: "var(--checkout-text-primary, #1a1a1a)"
    },
    content: {
      backgroundColor: "var(--checkout-surface, #FFFFFF)"
    },
    body: {
      color: "var(--checkout-text-primary, #1a1a1a)"
    }
  } : void 0;
  modals.openConfirmModal({
    title: message,
    labels,
    styles: checkoutStyles,
    onConfirm: () => onConfirm()
  });
};
export {
  confirmationDialog as c
};
