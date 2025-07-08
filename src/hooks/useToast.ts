import { useNotifications } from '@/contexts/NotificationContext';

export const useToast = () => {
  const { showToast, addNotification } = useNotifications();

  const toast = {
    success: (title: string, message: string, duration?: number) => {
      showToast('success', title, message, duration);
    },
    error: (title: string, message: string, duration?: number) => {
      showToast('error', title, message, duration);
    },
    warning: (title: string, message: string, duration?: number) => {
      showToast('warning', title, message, duration);
    },
    info: (title: string, message: string, duration?: number) => {
      showToast('info', title, message, duration);
    },
    // For persistent notifications (won't auto-dismiss)
    persistent: {
      success: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
        addNotification({
          type: 'success',
          title,
          message,
          duration: 0, // Won't auto-dismiss
          action,
        });
      },
      error: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
        addNotification({
          type: 'error',
          title,
          message,
          duration: 0,
          action,
        });
      },
      warning: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
        addNotification({
          type: 'warning',
          title,
          message,
          duration: 0,
          action,
        });
      },
      info: (title: string, message: string, action?: { label: string; onClick: () => void }) => {
        addNotification({
          type: 'info',
          title,
          message,
          duration: 0,
          action,
        });
      },
    }
  };

  return toast;
};
