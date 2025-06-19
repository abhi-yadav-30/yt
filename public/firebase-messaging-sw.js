// Import Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);

// Initialize Firebase (same config as in your app)
firebase.initializeApp({
  apiKey: "AIzaSyAqj-3jqLIIZVV4aIQzXelIsBmaPTR1Rr4",
  authDomain: "my-36c84.firebaseapp.com",
  projectId: "my-36c84",
  messagingSenderId: "1790671539",
  appId: "1:1790671539:web:0752f0fb56ee955a480ec6",
});

// Get messaging instance
const messaging = firebase.messaging();

// ✅ Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Received background message:", payload);

  const { title, body, icon } = payload.notification;

  self.registration.showNotification(title || "Notification", {
    body: body || "",
    icon: icon || "/icon.png",
    data: {
      url: "/", // URL to open when notification is clicked
    },
  });
});

// ✅ Handle install
self.addEventListener("install", (event) => {
  console.log("[SW] Installed");
  self.skipWaiting(); // Activate immediately
});

// ✅ Handle activation
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated");
  self.clients.claim(); // Take control immediately
});

// ✅ Basic fetch handler (you can add caching later)
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});

// ✅ Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client)
            return client.focus();
        }
        return clients.openWindow(urlToOpen);
      })
  );
});
