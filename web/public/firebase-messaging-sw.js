importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Public keys
firebase.initializeApp({
  apiKey: "AIzaSyC2KJnpeM-g85CsbUjLTxVMzljXtfEC_nE",
  authDomain: "festify-c3d37.firebaseapp.com",
  projectId: "festify-c3d37",
  storageBucket: "festify-c3d37.appspot.com",
  messagingSenderId: "326278664776",
  appId: "1:326278664776:web:446934260d36842f3bfe7d",
  measurementId: "G-9XSZDN9SKW",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  // Customize notification here
  const notification = {
    title: payload.notification?.title,
    body: payload.notification?.body,
    icon: payload.data?.icon || "/logo192.png",
  };

  self.registration.showNotification(notification.title, notification);
});
