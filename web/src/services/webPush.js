class WebPushService {
  static hasPermission() {
    return Notification.permission === "granted";
  }

  static async requestPermission() {
    return await Notification.requestPermission();
  }

  static async getSubscription() {
    return await navigator.serviceWorker?.ready?.then(async (registration) => {
      return await registration.pushManager.getSubscription();
    });
  }

  static async subscribe() {
    const registration = await navigator.serviceWorker?.ready;
    const subscription = await registration?.pushManager?.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });
    return subscription;
  }

  static async unsubscribe() {
    const subscription = await this.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
    }
    return subscription;
  }
}

export default WebPushService;
