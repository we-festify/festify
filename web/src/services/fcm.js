import { messaging } from "./../config/firebase";
import { getToken } from "firebase/messaging";

class FCMService {
  static async getToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_PUBLIC_FIREBASE_VAPID_KEY,
      });
      if (token) {
        return token;
      } else {
        throw new Error("FCM token not received");
      }
    } catch (err) {
      throw err;
    }
  }

  static async requestPermission() {
    try {
      const token = await this.getToken();
      return token;
    } catch (err) {
      throw err;
    }
  }

  static async subscribe() {
    try {
      const token = await this.getToken();
      return token;
    } catch (err) {
      throw err;
    }
  }

  static async refreshToken() {
    try {
      const token = await this.subscribe();
      return token;
    } catch (err) {
      throw err;
    }
  }

  static hasGivenNotificationPermission() {
    return Notification.permission === "granted";
  }
}

export default FCMService;
