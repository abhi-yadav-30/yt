import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey:
          "BLizvlW03-EEBV9MnkJv1geySzQTcrddM8ySkQ3efX9vBRvilpvsrN-8KMJUslefGC_1Y12npV1new8t-EHC4P8",
        serviceWorkerRegistration: await navigator.serviceWorker.ready,
      });

      console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.warn("❌ Notification permission not granted.");
    }
  } catch (err) {
    console.error("🔥 Error while getting FCM token:", err);
  }
};
