import type { toast as sonnerToast } from "sonner";

let toastRef: typeof sonnerToast | null = null;

export const toast = async (...props: any[]) => {
  if (!toastRef) {
    toastRef = await import("sonner").then((m) => m.toast);
  }

  // @ts-ignore TODO: Fix this
  return toastRef!.apply(null, props);
};
