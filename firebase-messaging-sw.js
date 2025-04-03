// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAp5ar55zWlqiXVqXXfG0jKPBDvrnEP-ng",
  authDomain: "unu-health-stg.firebaseapp.com",
  projectId: "unu-health-stg",
  storageBucket: "unu-health-stg.firebasestorage.app",
  messagingSenderId: "250310309706",
  appId: "1:250310309706:web:203ede8ca60a7a488a73b3",
  measurementId: "G-SXR9J0T1J7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');
});

// Activate the worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activated');
});

messaging.onBackgroundMessage(async(payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  let notificationTitle = 'Background message title';
  let notificationBody = 'Background message body';
  try {
    const messageDetails = JSON.parse(payload.data.payload);
    notificationTitle = messageDetails.title || notificationTitle;
    notificationBody = messageDetails.body || notificationBody;
    console.log(messageDetails);
  } catch(err) {
  }
  // Customize notification here
  const notificationOptions = {
    body: notificationBody,
    icon: '/logo-vertical.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  await fetch('/?source=worker');
});
